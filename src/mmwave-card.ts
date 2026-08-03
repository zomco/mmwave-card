/**
 * MMWave Radar HA Card  —  main orchestrator
 *
 * Responsibilities:
 *   1. Read radar_model from config, look up the adapter in the registry
 *   2. On every hass update: call adapter.readFromHass(), apply transform,
 *      push results into the active panel
 *   3. Own the CalibrationConfig state and persist it to localStorage
 *   4. Route polygon-point-added events from GeoPanel using the room
 *      dimensions to convert canvas px → room cm
 *   5. Route capture-requested events to YawPanel via offerReading()
 *
 * Panels are pure Lit elements that receive data and fire events.
 * They contain zero model-specific logic.
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';

import { getAdapter, type RadarModelAdapter } from './models';
import { applyTransform } from './utils/transform';
import { canvasToRoom, type CanvasMetrics } from './utils/canvas';
import { localize } from './localize/localize';
import { logoSvg } from './logo';
import { type MMWaveCardConfig, type CalibrationConfig, type RadarTarget, DEFAULT_CARD_CONFIG } from './types';
import { CARD_TAG, EDITOR_TAG, CARD_VERSION } from './const';

// Sub-elements (register them)
import './panels/geo-panel';
import './panels/yaw-panel';
import './panels/live-panel';
import type { YawPanel } from './panels/yaw-panel';
import type { LivePanel } from './panels/live-panel';

// ── Card registration ────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards ??= [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards.push({
  type: CARD_TAG,
  name: 'MMWave Radar HA Card',
  description: 'Multi-model mmWave radar calibration & live visualization',
  preview: true,
  documentationURL: 'https://github.com/YOUR_GITHUB_USERNAME/lovelace-mmwave-card',
});

console.info(
  `%c MMWAVE-CARD %c v${CARD_VERSION} `,
  'background:#03a9f4;color:#fff;font-weight:700',
  'background:#1c1c2e;color:#03a9f4;font-weight:700',
);

// ── Tab indices ──────────────────────────────────────────────────────────────

const TAB_GEO = 0;
const TAB_YAW = 1;
const TAB_LIVE = 2;

// ── Component ────────────────────────────────────────────────────────────────

@customElement(CARD_TAG)
export class MMWaveCard extends LitElement {
  // ── Lovelace public API ───────────────────────────────────────────────────

  public setConfig(config: MMWaveCardConfig): void {
    if (!config.radar_model) throw new Error('radar_model is required');

    const adapter = getAdapter(config.radar_model as string);
    if (!adapter) throw new Error(`Unknown radar_model: "${config.radar_model}". Check src/models/index.ts.`);

    const errors = adapter.validateConfig(config);
    if (errors.length) throw new Error(errors.join('; '));

    this._config = { ...DEFAULT_CARD_CONFIG, ...config } as MMWaveCardConfig;
    this._adapter = adapter;

    // Set initial defaults before loading from device
    const defaultCal = adapter.getDefaultCalibration();
    const roomW = this._config.room_w as number;
    const roomD = this._config.room_d as number;
    defaultCal.radar_x = Math.round(roomW * 0.382);
    defaultCal.radar_y = Math.round(roomD * 0.382);
    this._cal = defaultCal;
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement(EDITOR_TAG) as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<MMWaveCardConfig> {
    return {
      ...DEFAULT_CARD_CONFIG,
      radar_model: 'r60abd1',
      presence_entity: 'binary_sensor.r60abd1_presence',
      x_entity: 'sensor.r60abd1_x',
      y_entity: 'sensor.r60abd1_y',
      z_entity: 'sensor.r60abd1_z',
    };
  }

  public getCardSize(): number {
    return 7;
  }

  // ── State ────────────────────────────────────────────────────────────────

  @state() private _config!: MMWaveCardConfig;
  @state() private _adapter!: RadarModelAdapter;
  @state() private _cal!: CalibrationConfig;
  @state() private _tab = TAB_GEO;
  @state() private _isCalibrating = false;

  @state() private _targets: RadarTarget[] = [];
  @state() private _present = false;
  @state() private _maxRangeM?: number;
  @state() private _syncState: 'idle' | 'syncing' | 'success' | 'error' = 'idle';
  private _deviceLoaded = false;
  private _syncResetTimer?: number;

  // ── Panel refs (for imperative calls) ────────────────────────────────────

  @query('mmwave-yaw-panel') private _yawPanel?: YawPanel;
  @query('mmwave-live-panel') private _livePanel?: LivePanel;

  // ── Hass ─────────────────────────────────────────────────────────────────

  // Use getter/setter pattern so we can react to every state push.
  private _hass!: HomeAssistant;

  public set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (!this._adapter || !this._config) return;

    if (!this._deviceLoaded) {
      this._deviceLoaded = true;
      this._loadFromDevice();
    }

    const reading = this._adapter.readFromHass(hass, this._config);
    this._present = reading.present;
    this._maxRangeM = reading.maxRangeM;

    // Apply transform to every target
    this._targets = reading.targets.map((t) => ({
      ...t,
      room: applyTransform(t.rawX, t.rawY, t.rawZ, this._cal),
    }));

    // Trigger Lit update naturally
    this.requestUpdate();

    // Yaw panel: if it's waiting for a capture reading, offer it
    if (this._tab === TAB_YAW && this._yawPanel) {
      const first = reading.targets[0];
      if (first) this._yawPanel.offerReading(first.rawX, first.rawY);
    }
  }

  // ── Localisation helper ──────────────────────────────────────────────────

  private _L(k: string) {
    return localize(k, this._hass?.language);
  }

  private _ui(zh: string, en: string) {
    return (this._hass?.language ?? 'en').toLowerCase().startsWith('zh') ? zh : en;
  }

  private _insideTargetCount() {
    return this._targets.filter((target) => target.room?.inBoundary).length;
  }

  private _syncLabel() {
    if (this._syncState === 'syncing') return this._ui('正在同步…', 'Syncing…');
    if (this._syncState === 'success') return this._ui('已同步', 'Synced');
    if (this._syncState === 'error') return this._ui('同步失败', 'Sync failed');
    return this._ui('同步到设备', 'Sync to device');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._syncResetTimer != null) clearTimeout(this._syncResetTimer);
  }

  // ── Tab management ───────────────────────────────────────────────────────

  private _gotoTab(tab: number) {
    this._tab = tab;
    this._livePanel?.clearTrail();
    this.requestUpdate();
  }

  // ── Event handlers from panels ───────────────────────────────────────────

  /** GeoPanel fires this when the user clicks the polygon canvas. */
  private _onPolygonPointAdded(e: CustomEvent<{ canvasX: number; canvasY: number }>) {
    const cv = this.shadowRoot?.querySelector<HTMLCanvasElement>('#poly-cv');
    const W = cv?.offsetWidth ?? 400;
    const m: CanvasMetrics = {
      W,
      H: 165,
      roomW: (this._cal?.room_w ?? this._config.room_w) as number,
      roomD: (this._cal?.room_d ?? this._config.room_d) as number,
    };
    const room = canvasToRoom(e.detail.canvasX, e.detail.canvasY, m);
    const updated: CalibrationConfig = {
      ...this._cal,
      polygon: [...this._cal.polygon, room],
    };
    this._cal = updated;
    this.requestUpdate();
  }

  /** All panels fire this when calibration values change. */
  private _onCalibrationChanged(e: CustomEvent<CalibrationConfig>) {
    let cal = e.detail;
    const roomW = (cal.room_w ?? this._config.room_w) as number;
    const roomD = (cal.room_d ?? this._config.room_d) as number;

    if (cal.radar_x > roomW) cal = { ...cal, radar_x: roomW };
    if (cal.radar_y > roomD) cal = { ...cal, radar_y: roomD };

    this._cal = cal;
    this.requestUpdate();
  }

  /** YawPanel fires this when user clicks "Capture". */
  private _onCaptureRequested() {
    // Nothing extra — the hass setter already calls offerReading() on the panel.
    // This event is here in case we need to add a visual indicator in future.
  }

  // ── Device Sync ─────────────────────────────────────────────────────────

  private _loadFromDevice() {
    if (!this._hass || !this._config) return;

    const xEntity = (this._config.x_entity as string) || '';
    if (!xEntity) return;

    const match = xEntity.match(/^sensor\.(.+?)(_radar_x|_x)$/);
    let prefix = '';
    if (match) {
      prefix = match[1];
    } else {
      const parts = xEntity.split('.')[1]?.split('_') || [];
      prefix = parts.slice(0, parts.length - 1).join('_');
    }

    const cal = { ...this._cal };

    // Read numbers
    const params: Array<'radar_x' | 'radar_y' | 'radar_z' | 'yaw' | 'pitch' | 'roll'> = [
      'radar_x',
      'radar_y',
      'radar_z',
      'yaw',
      'pitch',
      'roll',
    ];
    for (const key of params) {
      const stateObj = this._hass.states[`number.${prefix}_${key}`];
      if (stateObj && stateObj.state && !isNaN(Number(stateObj.state))) {
        cal[key] = Number(stateObj.state);
      }
    }

    // Read polygon
    const polyEntity = this._config.polygon_entity || `text.${prefix}_polygon_config`;
    const polyObj = this._hass.states[polyEntity];
    if (polyObj && polyObj.state) {
      const s = polyObj.state;
      const pts = s
        .split(';')
        .filter((x) => x.includes(','))
        .map((pt) => {
          const [x, y] = pt.split(',');
          return { x: parseFloat(x), y: parseFloat(y) };
        });
      if (pts.length > 0) cal.polygon = pts;
      else cal.polygon = [];
    } else if (polyObj && polyObj.state === '') {
      cal.polygon = [];
    }

    // Clamp to boundaries
    const roomW = (cal.room_w ?? this._config.room_w) as number;
    const roomD = (cal.room_d ?? this._config.room_d) as number;
    if (cal.radar_x > roomW) cal.radar_x = roomW;
    if (cal.radar_y > roomD) cal.radar_y = roomD;

    this._cal = cal;
    this.requestUpdate();
  }

  private async _sync() {
    const xEntity = (this._config.x_entity as string) || '';
    if (!xEntity) {
      alert('Error: x_entity is not configured.');
      return;
    }

    // Extract device prefix from x_entity (e.g., sensor.r60abd1_test_x -> r60abd1_test)
    const match = xEntity.match(/^sensor\.(.+?)(_radar_x|_x)$/);
    let prefix = '';
    if (match) {
      prefix = match[1];
    } else {
      const parts = xEntity.split('.')[1]?.split('_') || [];
      prefix = parts.slice(0, parts.length - 1).join('_');
    }

    this._syncState = 'syncing';

    try {
      const params: Record<string, number> = {
        radar_x: this._cal.radar_x,
        radar_y: this._cal.radar_y,
        radar_z: this._cal.radar_z,
        yaw: this._cal.yaw,
        pitch: this._cal.pitch,
        roll: this._cal.roll,
      };

      for (const [key, val] of Object.entries(params)) {
        const entityId = `number.${prefix}_${key}`;
        try {
          await this._hass.callService('number', 'set_value', {
            entity_id: entityId,
            value: val,
          });
        } catch (err) {
          console.warn(`Failed to sync ${entityId}`, err);
        }
      }

      const polyStr = this._cal.polygon.map((p) => `${p.x},${p.y}`).join(';');
      const polyEntity = this._config.polygon_entity || `text.${prefix}_polygon_config`;
      if (this._hass.states[polyEntity] !== undefined) {
        try {
          await this._hass.callService('text', 'set_value', {
            entity_id: polyEntity,
            value: polyStr,
          });
        } catch (err) {
          console.warn(`Failed to sync ${polyEntity}`, err);
        }
      }

      this._syncState = 'success';
    } catch (e) {
      this._syncState = 'error';
      console.error(e);
    } finally {
      if (this._syncResetTimer != null) clearTimeout(this._syncResetTimer);
      this._syncResetTimer = window.setTimeout(() => (this._syncState = 'idle'), 2200);
    }
  }

  private _reset() {
    if (!confirm(this._L('actions.reset_confirm') || 'Reset to factory defaults?')) return;
    const defaultCal = this._adapter.getDefaultCalibration();
    const roomW = this._config.room_w as number;
    const roomD = this._config.room_d as number;
    defaultCal.radar_x = Math.round(roomW * 0.382);
    defaultCal.radar_y = Math.round(roomD * 0.382);
    this._cal = defaultCal;
    this._gotoTab(TAB_GEO);
  }

  // ── Render ───────────────────────────────────────────────────────────────

  protected render() {
    if (!this._config || !this._adapter) return nothing;

    const roomW = (this._cal.room_w ?? this._config.room_w) as number;
    const roomD = (this._cal.room_d ?? this._config.room_d) as number;
    const lang = this._hass?.language ?? 'en';
    const insideTargets = this._insideTargetCount();
    const steps = [
      {
        icon: 'mdi:cube-scan',
        title: this._ui('安装定位', 'Installation'),
        description: this._ui('在 3D 房间中放置雷达', 'Place the radar in the 3D room'),
      },
      {
        icon: 'mdi:compass-outline',
        title: this._ui('方向校准', 'Direction'),
        description: this._ui('通过两个参考点校准偏航', 'Calibrate yaw with two reference points'),
      },
      {
        icon: 'mdi:radar',
        title: this._ui('实时验证', 'Live test'),
        description: this._ui('检查目标、边界和运动轨迹', 'Verify targets, boundary and trails'),
      },
    ];

    // --- Everyday Live View ---
    if (!this._isCalibrating) {
      return html`
        <ha-card class="live-card">
          <header class="live-header">
            <div class="identity">
              <div class="logo-tile ${this._present ? 'online' : ''}">${logoSvg}</div>
              <div class="identity-copy">
                <div class="card-title">${this._config.name || this._ui('人体存在雷达', 'Presence radar')}</div>
                <div class="card-subtitle">${this._adapter.info.displayName}</div>
              </div>
            </div>
            <div class="header-actions">
              <span class="presence-chip ${insideTargets > 0 ? 'active' : this._present ? 'filtered' : ''}">
                <i></i>
                ${insideTargets > 0
                  ? this._ui(`${insideTargets} 个目标`, `${insideTargets} target${insideTargets === 1 ? '' : 's'}`)
                  : this._present
                    ? this._ui('边界外', 'Outside')
                    : this._ui('无人', 'Clear')}
              </span>
              <button
                class="icon-button"
                type="button"
                title=${this._ui('打开校准', 'Open calibration')}
                aria-label=${this._ui('打开校准', 'Open calibration')}
                @click=${() => {
                  this._isCalibrating = true;
                  this._tab = TAB_GEO;
                }}
              >
                <ha-icon icon="mdi:tune-variant"></ha-icon>
              </button>
            </div>
          </header>
          <div class="live-body">
            <mmwave-live-panel
              .adapter=${this._adapter}
              .calibration=${this._cal}
              .lang=${lang}
              .roomW=${roomW}
              .roomD=${roomD}
              .targets=${this._targets}
              .present=${this._present}
              .maxRangeM=${this._maxRangeM}
            >
            </mmwave-live-panel>
          </div>
        </ha-card>
      `;
    }

    // --- Advanced Calibration Mode ---
    return html`
      <ha-card>
        <header class="workflow-header">
          <button
            class="icon-button"
            type="button"
            title=${this._ui('返回雷达视图', 'Back to radar view')}
            aria-label=${this._ui('返回雷达视图', 'Back to radar view')}
            @click=${() => (this._isCalibrating = false)}
          >
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <div class="workflow-title">
            <strong>${this._ui('雷达空间校准', 'Radar spatial calibration')}</strong>
            <span>${this._adapter.info.displayName}</span>
          </div>
          <span class="step-count">${this._tab + 1} / ${steps.length}</span>
        </header>

        <nav class="workflow-steps" aria-label=${this._ui('校准步骤', 'Calibration steps')}>
          ${steps.map(
            (step, index) => html`
              <button
                type="button"
                class="workflow-step ${this._tab === index ? 'current' : ''} ${this._tab > index ? 'complete' : ''}"
                aria-current=${this._tab === index ? 'step' : nothing}
                @click=${() => this._gotoTab(index)}
              >
                <span class="step-icon">
                  ${this._tab > index
                    ? html`<ha-icon icon="mdi:check"></ha-icon>`
                    : html`<ha-icon icon=${step.icon}></ha-icon>`}
                </span>
                <span class="step-copy"><strong>${step.title}</strong><small>${step.description}</small></span>
              </button>
            `,
          )}
        </nav>

        <div
          class="workflow-body"
          @calibration-changed=${this._onCalibrationChanged}
          @polygon-point-added=${this._onPolygonPointAdded}
          @capture-requested=${this._onCaptureRequested}
        >
          ${this._tab === TAB_GEO
            ? html` <mmwave-geo-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${lang}
                .roomW=${roomW}
                .roomD=${roomD}
                .maxRangeM=${this._maxRangeM}
              >
              </mmwave-geo-panel>`
            : nothing}
          ${this._tab === TAB_YAW
            ? html` <mmwave-yaw-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${lang}
                .roomW=${roomW}
                .roomD=${roomD}
                .maxRangeM=${this._maxRangeM}
              >
              </mmwave-yaw-panel>`
            : nothing}
          ${this._tab === TAB_LIVE
            ? html` <mmwave-live-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${lang}
                .roomW=${roomW}
                .roomD=${roomD}
                .targets=${this._targets}
                .present=${this._present}
                .maxRangeM=${this._maxRangeM}
                .showStatus=${true}
              >
              </mmwave-live-panel>`
            : nothing}
        </div>

        <footer class="workflow-footer">
          <div class="footer-tools">
            <button class="text-button" type="button" @click=${this._loadFromDevice}>
              <ha-icon icon="mdi:backup-restore"></ha-icon><span>${this._ui('撤销修改', 'Revert')}</span>
            </button>
            <button class="text-button danger" type="button" @click=${this._reset}>
              <ha-icon icon="mdi:restore-alert"></ha-icon><span>${this._ui('恢复默认', 'Reset')}</span>
            </button>
          </div>
          <div class="footer-actions">
            ${this._tab > TAB_GEO
              ? html`<button class="secondary-button" type="button" @click=${() => this._gotoTab(this._tab - 1)}>
                  <ha-icon icon="mdi:chevron-left"></ha-icon>${this._ui('上一步', 'Back')}
                </button>`
              : nothing}
            ${this._tab < TAB_LIVE
              ? html`<button class="primary-button" type="button" @click=${() => this._gotoTab(this._tab + 1)}>
                  ${this._ui('下一步', 'Continue')}<ha-icon icon="mdi:chevron-right"></ha-icon>
                </button>`
              : html`<button
                  class="primary-button sync ${this._syncState}"
                  type="button"
                  ?disabled=${this._syncState === 'syncing'}
                  @click=${this._sync}
                >
                  <ha-icon
                    icon=${this._syncState === 'success'
                      ? 'mdi:check-circle'
                      : this._syncState === 'error'
                        ? 'mdi:alert-circle'
                        : 'mdi:cloud-upload-outline'}
                  ></ha-icon>
                  ${this._syncLabel()}
                </button>`}
          </div>
        </footer>
      </ha-card>
    `;
  }

  // ── Styles ───────────────────────────────────────────────────────────────

  static styles = css`
    :host {
      display: block;
      --mmwave-primary: #0b825c;
      --mmwave-primary-soft: rgba(11, 130, 92, 0.1);
      --mmwave-surface: color-mix(in srgb, var(--card-background-color, #fff) 94%, var(--mmwave-primary));
      --mmwave-line: var(--divider-color, rgba(128, 128, 128, 0.18));
      --mmwave-secondary: #4b5563;
    }
    ha-card {
      background: var(--ha-card-background, var(--card-background-color, #fff));
      border-radius: var(--ha-card-border-radius, 16px);
      box-shadow: var(--ha-card-box-shadow, 0 8px 28px rgba(0, 0, 0, 0.08));
      border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, #e0e0e0));
      overflow: hidden;
      color: var(--primary-text-color);
      font-family: var(--primary-font-family, system-ui, sans-serif);
      transition: all 0.3s ease-out;
    }

    /* Header styles */
    .ha-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 16px 12px 16px;
    }
    .ha-header.calib {
      padding: 4px 8px 4px 4px;
      border-bottom: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      background: rgba(128, 128, 128, 0.05);
    }
    .ha-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .ha-title ha-icon {
      --mdc-icon-size: 24px;
    }

    #tabs {
      display: flex;
      border-bottom: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
    }
    .tab {
      flex: 1;
      padding: 12px 6px 10px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      text-align: center;
      border: none;
      background: none;
      color: var(--secondary-text-color);
      cursor: pointer;
      position: relative;
      transition: color 0.2s;
    }
    .tab:hover {
      background: rgba(128, 128, 128, 0.05);
    }
    .tab.act {
      color: var(--mmwave-primary);
    }
    .tab.act::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 15%;
      right: 15%;
      height: 2px;
      background: var(--mmwave-primary);
      border-radius: 2px 2px 0 0;
    }
    #body {
      padding: 16px;
      min-height: 270px;
    }
    #foot {
      padding: 12px 16px 16px;
      border-top: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(128, 128, 128, 0.02);
    }
    .left-btns {
      display: flex;
      gap: 8px;
    }
    .btn-sync {
      background: var(--mmwave-primary);
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.15s;
    }
    .btn-sync:hover {
      opacity: 0.9;
    }
    .btn-rst {
      background: transparent;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.3));
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .btn-rst:hover {
      background: rgba(128, 128, 128, 0.05);
    }

    .live-header,
    .workflow-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 16px;
    }
    .identity,
    .header-actions,
    .footer-tools,
    .footer-actions {
      display: flex;
      align-items: center;
    }
    .identity {
      min-width: 0;
      gap: 11px;
    }
    .logo-tile {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      flex: none;
      border: 1px solid var(--mmwave-line);
      border-radius: 12px;
      background: var(--mmwave-surface);
      opacity: 0.62;
      transition: 0.25s ease;
    }
    .logo-tile.online {
      border-color: rgba(11, 130, 92, 0.3);
      box-shadow: 0 0 0 4px rgba(11, 130, 92, 0.08);
      opacity: 1;
    }
    .identity-copy,
    .workflow-title {
      display: flex;
      min-width: 0;
      flex-direction: column;
      gap: 2px;
    }
    .card-title,
    .workflow-title strong {
      overflow: hidden;
      color: var(--primary-text-color);
      font-size: 15px;
      font-weight: 650;
      line-height: 1.25;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .card-subtitle,
    .workflow-title span {
      overflow: hidden;
      color: var(--secondary-text-color);
      font-size: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .header-actions {
      flex: none;
      gap: 8px;
    }
    .presence-chip,
    .step-count {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 9px;
      border: 1px solid var(--mmwave-line);
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.05);
      font-size: 10px;
      font-weight: 650;
      white-space: nowrap;
    }
    .presence-chip i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #9ca3af;
    }
    .presence-chip.active {
      border-color: rgba(11, 130, 92, 0.24);
      color: var(--mmwave-primary);
      background: var(--mmwave-primary-soft);
    }
    .presence-chip.active i {
      background: var(--mmwave-primary);
      box-shadow: 0 0 0 3px rgba(11, 130, 92, 0.13);
    }
    .presence-chip.filtered i {
      background: var(--warning-color, #ff9800);
    }
    .icon-button {
      width: 36px;
      height: 36px;
      display: inline-grid;
      place-items: center;
      flex: none;
      padding: 0;
      border: 1px solid var(--mmwave-line);
      border-radius: 11px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.04);
      cursor: pointer;
      transition: 0.18s ease;
    }
    .icon-button:hover {
      border-color: rgba(11, 130, 92, 0.35);
      color: var(--mmwave-primary);
      background: var(--mmwave-primary-soft);
    }
    .icon-button ha-icon {
      --mdc-icon-size: 20px;
    }
    .live-body {
      padding: 0 12px 12px;
    }
    .workflow-header {
      justify-content: flex-start;
      border-bottom: 1px solid var(--mmwave-line);
      background: linear-gradient(135deg, rgba(11, 130, 92, 0.065), transparent 65%);
    }
    .workflow-title {
      flex: 1;
    }
    .workflow-steps {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--mmwave-line);
    }
    .workflow-step {
      display: flex;
      min-width: 0;
      align-items: center;
      gap: 8px;
      padding: 9px;
      border: 1px solid transparent;
      border-radius: 11px;
      color: var(--secondary-text-color);
      background: transparent;
      text-align: left;
      cursor: pointer;
      transition: 0.18s ease;
    }
    .workflow-step:hover {
      background: rgba(128, 128, 128, 0.06);
    }
    .workflow-step.current {
      border-color: rgba(11, 130, 92, 0.22);
      color: var(--mmwave-primary);
      background: var(--mmwave-primary-soft);
    }
    .workflow-step.complete {
      color: var(--mmwave-primary);
    }
    .step-icon {
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      flex: none;
      border-radius: 9px;
      background: rgba(128, 128, 128, 0.1);
    }
    .workflow-step.current .step-icon,
    .workflow-step.complete .step-icon {
      color: #fff;
      background: var(--mmwave-primary);
    }
    .step-icon ha-icon {
      --mdc-icon-size: 17px;
    }
    .step-copy {
      display: flex;
      min-width: 0;
      flex-direction: column;
      gap: 2px;
    }
    .step-copy strong {
      font-size: 11px;
      font-weight: 700;
    }
    .step-copy small {
      overflow: hidden;
      font-size: 9px;
      font-weight: 400;
      line-height: 1.25;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .workflow-body {
      min-height: 320px;
      padding: 16px;
    }
    .workflow-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 12px 16px 16px;
      border-top: 1px solid var(--mmwave-line);
      background: rgba(128, 128, 128, 0.025);
    }
    .footer-tools,
    .footer-actions {
      gap: 7px;
    }
    .text-button,
    .secondary-button,
    .primary-button {
      display: inline-flex;
      min-height: 36px;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 7px 11px;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 650;
      cursor: pointer;
      transition: 0.18s ease;
    }
    .text-button {
      padding-inline: 7px;
      border: 1px solid transparent;
      color: var(--secondary-text-color);
      background: transparent;
    }
    .text-button:hover,
    .secondary-button:hover {
      background: rgba(128, 128, 128, 0.08);
    }
    .text-button.danger:hover {
      color: var(--error-color, #ef5350);
      background: rgba(239, 83, 80, 0.08);
    }
    .secondary-button {
      border: 1px solid var(--mmwave-line);
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
    }
    .primary-button {
      border: 1px solid var(--mmwave-primary);
      color: #fff;
      background: var(--mmwave-primary);
      box-shadow: 0 5px 14px rgba(11, 130, 92, 0.2);
    }
    .primary-button:hover {
      filter: brightness(1.06);
      transform: translateY(-1px);
    }
    .primary-button:disabled {
      cursor: wait;
      opacity: 0.65;
      transform: none;
    }
    .primary-button.success {
      border-color: var(--success-color, #43a047);
      background: var(--success-color, #43a047);
    }
    .primary-button.error {
      border-color: var(--error-color, #e53935);
      background: var(--error-color, #e53935);
    }
    .text-button ha-icon,
    .secondary-button ha-icon,
    .primary-button ha-icon {
      --mdc-icon-size: 17px;
    }
    @media (max-width: 520px) {
      .workflow-steps {
        gap: 4px;
        padding-inline: 10px;
      }
      .workflow-step {
        flex-direction: column;
        gap: 4px;
        text-align: center;
      }
      .step-copy small {
        display: none;
      }
      .workflow-body {
        padding: 12px;
      }
      .workflow-footer {
        align-items: stretch;
        padding: 10px 12px 12px;
      }
      .footer-tools span {
        display: none;
      }
      .footer-actions {
        margin-left: auto;
      }
      .presence-chip {
        display: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: MMWaveCard;
  }
}
