import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { CalibrationConfig } from '../types';
import type { RadarModelAdapter } from '../models';
import {
  setupCanvas,
  drawBase,
  drawPolygon,
  drawRadarFov,
  roomToCanvas,
  canvasToRoom,
  eventToCanvasCssPt,
  type CanvasMetrics,
} from '../utils/canvas';
import { localize } from '../localize/localize';
import './installation-3d';

@customElement('mmwave-geo-panel')
export class GeoPanel extends LitElement {
  @property({ attribute: false }) adapter!: RadarModelAdapter;
  @property({ attribute: false }) calibration!: CalibrationConfig;
  @property({ attribute: false }) lang = 'en';
  @property({ type: Number }) roomW = 400;
  @property({ type: Number }) roomD = 350;
  @property({ type: Number }) maxRangeM?: number;

  @query('#poly-cv') private _cv?: HTMLCanvasElement;
  private _rafId = 0;

  private _L(k: string) {
    return localize(k, this.lang);
  }

  private _ui(zh: string, en: string) {
    return this.lang.toLowerCase().startsWith('zh') ? zh : en;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loop();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    cancelAnimationFrame(this._rafId);
  }

  // ── aspect-ratio canvas height ─────────────────────────────────────────────

  private _cssH(): number {
    const W = this._cv?.offsetWidth;
    if (!W || W === 0) return 280; // not yet laid out
    const ratio = this.roomD / this.roomW;
    return Math.max(140, Math.min(280, Math.round(W * ratio)));
  }

  // ── metrics (CSS-pixel space) ──────────────────────────────────────────────

  private _m(): CanvasMetrics {
    return {
      W: this._cv?.offsetWidth || 400,
      H: this._cssH(),
      roomW: this.roomW,
      roomD: this.roomD,
    };
  }

  // ── event handlers ─────────────────────────────────────────────────────────

  private _onCanvasClick(e: MouseEvent) {
    const cv = this._cv;
    if (!cv) return;
    const cssPt = eventToCanvasCssPt(e, cv);
    const roomPt = canvasToRoom(cssPt.x, cssPt.y, this._m());
    this._emit({ polygon: [...this.calibration.polygon, roomPt] });
  }

  private _undo() {
    const p = [...this.calibration.polygon];
    p.pop();
    this._emit({ polygon: p });
  }
  private _clear() {
    this._emit({ polygon: [] });
  }

  private _emit(patch: Partial<CalibrationConfig>) {
    this.dispatchEvent(
      new CustomEvent('calibration-changed', {
        detail: { ...this.calibration, ...patch },
        bubbles: true,
        composed: true,
      }),
    );
  }

  // ── rAF draw loop ──────────────────────────────────────────────────────────

  private _loop() {
    const cv = this._cv;
    if (cv && cv.offsetWidth > 0) {
      const cssH = this._cssH();
      const ctx = setupCanvas(cv, cssH);
      const m = this._m();
      drawBase(ctx, m);
      // Draw radar FOV first (underneath polygon)
      if (this.adapter) {
        const rp = roomToCanvas(this.calibration.radar_x, this.calibration.radar_y, m);
        drawRadarFov(
          ctx,
          rp.cx,
          rp.cy,
          this.calibration.yaw,
          this.calibration.pitch,
          this.adapter.info.fovDegrees,
          this.adapter.info.minRangeM,
          this.maxRangeM ?? this.adapter.info.maxRangeM,
          m,
          this.adapter.info.vitalRangeM,
        );
      }
      drawPolygon(ctx, this.calibration.polygon, m);
    }
    this._rafId = requestAnimationFrame(() => this._loop());
  }

  // ── form helpers ───────────────────────────────────────────────────────────

  private _numField(label: string, key: keyof CalibrationConfig, value: number, step = 5, min = -9999, max = 9999) {
    const handleInput = (e: Event) => {
      let _v = parseFloat((e.target as HTMLInputElement).value) || 0;
      if (_v > max) _v = max;
      if (_v < min) _v = min;
      this._emit({ [key]: _v });
    };
    return html` <div class="field">
      <label>${label}</label>
      <input
        class="slider"
        type="range"
        .value=${String(value)}
        step=${step}
        min=${min}
        max=${max}
        @input=${handleInput}
      />
      <input
        class="num-input"
        type="number"
        .value=${String(value)}
        step=${step}
        min=${min}
        max=${max}
        @change=${handleInput}
      />
      <span class="unit">cm</span>
    </div>`;
  }

  private _degField(label: string, key: keyof CalibrationConfig, value: number, min = -180, max = 180) {
    const handleInput = (e: Event) => {
      const _v = parseFloat((e.target as HTMLInputElement).value) || 0;
      this._emit({ [key]: _v });
    };
    return html` <div class="field">
      <label>${label}</label>
      <input
        class="slider"
        type="range"
        .value=${String(value)}
        step="0.5"
        min=${min}
        max=${max}
        @input=${handleInput}
      />
      <input
        class="num-input"
        type="number"
        .value=${String(value)}
        step="0.5"
        min=${min}
        max=${max}
        @change=${handleInput}
      />
      <span class="unit">°</span>
    </div>`;
  }

  // ── render ─────────────────────────────────────────────────────────────────

  protected render() {
    const c = this.calibration;
    const pn = c.polygon.length;
    const hint = pn >= 3 ? this._L('geo.poly_hint_ok').replace('{n}', String(pn)) : this._L('geo.poly_hint_none');

    const roomW = c.room_w ?? this.roomW;
    const roomD = c.room_d ?? this.roomD;
    return html`
      <div class="panel-heading">
        <span class="eyebrow">${this._ui('步骤 1 · 安装定位', 'Step 1 · Installation')}</span>
        <h2>${this._ui('在房间中放置雷达', 'Place the radar in the room')}</h2>
        <p>
          ${this._ui(
            '拖拽 3D 模型上的彩色控制柄，直观调整安装位置、高度和朝向。',
            'Drag the colored handles to set position, height and orientation.',
          )}
        </p>
      </div>

      <mmwave-installation-3d
        .adapter=${this.adapter}
        .calibration=${c}
        .lang=${this.lang}
        .roomW=${roomW}
        .roomD=${roomD}
        .maxRangeM=${this.maxRangeM}
      ></mmwave-installation-3d>

      <details class="precision">
        <summary>
          <span>${this._ui('精确数值调整', 'Precise numeric adjustment')}</span>
          <small>${this._ui('可选', 'Optional')}</small>
        </summary>
        <div class="precision-fields">
          ${this._numField(this._L('geo.radar_x'), 'radar_x', c.radar_x, 5, 0, roomW)}
          ${this._numField(this._L('geo.radar_y'), 'radar_y', c.radar_y, 5, 0, roomD)}
          ${this._numField(this._L('geo.radar_z'), 'radar_z', c.radar_z, 5, 0, 400)}
          ${this._degField(this._L('geo.yaw_rough'), 'yaw', c.yaw)}
          ${this._degField(this._L('geo.pitch'), 'pitch', c.pitch, -90, 90)}
          ${this._degField(this._L('geo.roll'), 'roll', c.roll, -90, 90)}
          <p class="note">${this._L('geo.geo_note')}</p>
        </div>
      </details>

      <section class="boundary-card">
        <div class="section-heading">
          <div>
            <span class="eyebrow">${this._ui('可选设置', 'Optional')}</span>
            <h3>${this._L('geo.boundary')}</h3>
            <p>
              ${this._ui(
                '在俯视图中点击，依次勾画实际有效检测区域。',
                'Click the top-down map to outline the active detection area.',
              )}
            </p>
          </div>
          <span class="boundary-badge ${pn >= 3 ? 'active' : ''}"
            >${pn >= 3 ? `${pn} ${this._ui('个点', 'points')}` : this._ui('未启用', 'Off')}</span
          >
        </div>
        <div class="poly-bar">
          <span class="poly-hint ${pn >= 3 ? 'ok' : ''}">${hint}</span>
          <div class="poly-btns">
            <button class="pbtn" type="button" ?disabled=${pn === 0} @click=${this._undo}>
              ${this._ui('撤销一点', 'Undo point')}
            </button>
            <button class="pbtn danger" type="button" ?disabled=${pn === 0} @click=${this._clear}>
              ${this._L('geo.poly_clear')}
            </button>
          </div>
        </div>
        <div class="map-shell">
          <canvas id="poly-cv" @click=${this._onCanvasClick}></canvas>
          ${pn === 0
            ? html`<span class="map-empty"
                >${this._ui('点击地图添加第一个边界点', 'Click the map to add the first point')}</span
              >`
            : ''}
        </div>
        <p class="note">${this._L('geo.boundary_note')}</p>
      </section>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .panel-heading {
      margin-bottom: 12px;
    }
    .eyebrow {
      color: var(--mmwave-primary);
      font-size: 9px;
      font-weight: 750;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .panel-heading h2,
    .section-heading h3 {
      margin: 4px 0;
      color: var(--primary-text-color);
      font-size: 16px;
      font-weight: 700;
    }
    .panel-heading p,
    .section-heading p {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 1.5;
    }
    .sec-title {
      font-size: 10px;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      margin: 0 0 8px;
    }
    .precision {
      margin: 5px 0 16px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      border-radius: 11px;
      background: rgba(128, 128, 128, 0.035);
    }
    .precision summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      color: var(--secondary-text-color);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
    }
    .precision summary small {
      padding: 2px 6px;
      border-radius: 999px;
      background: rgba(128, 128, 128, 0.1);
      font-size: 8px;
    }
    .precision-fields {
      padding: 0 6px 6px;
    }
    .field {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      margin-bottom: 5px;
      background: rgba(128, 128, 128, 0.06);
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      border-radius: 8px;
      transition: border-color 0.15s;
    }
    .field:focus-within {
      border-color: var(--mmwave-primary);
    }
    .field label {
      font-size: 12px;
      color: var(--secondary-text-color);
      width: 90px;
      flex-shrink: 0;
    }
    .field input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      font-size: 13px;
      font-weight: 500;
      text-align: right;
      color: var(--primary-text-color);
    }
    .field input.slider {
      accent-color: var(--mmwave-primary);
      margin: 0 8px;
    }
    .field input.num-input {
      width: 45px;
      flex: none;
    }
    .unit {
      font-size: 11px;
      color: var(--secondary-text-color);
      min-width: 18px;
      text-align: right;
    }
    .note {
      font-size: 10px;
      color: var(--secondary-text-color);
      line-height: 1.6;
      margin: 5px 0;
      padding: 7px 9px;
      white-space: pre-line;
      background: rgba(128, 128, 128, 0.04);
      border-left: 2px solid var(--divider-color);
      border-radius: 0 5px 5px 0;
    }
    .boundary-card {
      padding: 12px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.16));
      border-radius: 13px;
      background: color-mix(in srgb, var(--card-background-color, #fff) 96%, var(--mmwave-primary));
    }
    .section-heading {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }
    .section-heading h3 {
      font-size: 13px;
    }
    .boundary-badge {
      flex: none;
      padding: 4px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--secondary-text-color);
      font-size: 9px;
      font-weight: 700;
    }
    .boundary-badge.active {
      border-color: rgba(11, 130, 92, 0.25);
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.09);
    }
    .poly-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    .poly-hint {
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .poly-hint.ok {
      color: var(--success-color, #4caf50);
    }
    .poly-btns {
      display: flex;
      gap: 4px;
    }
    .pbtn {
      background: rgba(128, 128, 128, 0.1);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 3px 9px;
      font-size: 11px;
      color: var(--secondary-text-color);
      cursor: pointer;
    }
    .pbtn:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
    .pbtn.danger:not(:disabled):hover {
      color: var(--error-color, #e53935);
      background: rgba(229, 57, 53, 0.08);
    }
    .pbtn:hover {
      background: rgba(128, 128, 128, 0.2);
    }
    .map-shell {
      position: relative;
    }
    .map-empty {
      position: absolute;
      left: 50%;
      bottom: 14px;
      padding: 4px 8px;
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--card-background-color, #fff) 88%, transparent);
      font-size: 9px;
      pointer-events: none;
      transform: translateX(-50%);
      white-space: nowrap;
    }
    canvas {
      display: block;
      width: 100%;
      border-radius: 10px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      background: rgba(0, 0, 0, 0.15);
      touch-action: none;
      cursor: crosshair;
    }
  `;
}
declare global {
  interface HTMLElementTagNameMap {
    'mmwave-geo-panel': GeoPanel;
  }
}
