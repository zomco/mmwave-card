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

import { LitElement, html, css, nothing } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";

import { getAdapter, type RadarModelAdapter } from "./models";
import { applyTransform } from "./utils/transform";
import { canvasToRoom, type CanvasMetrics } from "./utils/canvas";
import { localize } from "./localize/localize";
import {
  type MMWaveCardConfig,
  type CalibrationConfig,
  type RadarTarget,
  DEFAULT_CARD_CONFIG,
} from "./types";
import { CARD_TAG, EDITOR_TAG, STORAGE_KEY, CARD_VERSION } from "./const";

// Sub-elements (register them)
import "./panels/geo-panel";
import "./panels/yaw-panel";
import "./panels/live-panel";
import type { YawPanel }  from "./panels/yaw-panel";
import type { LivePanel } from "./panels/live-panel";

// ── Card registration ────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards ??= [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards.push({
  type:             CARD_TAG,
  name:             "MMWave Radar HA Card",
  description:      "Multi-model mmWave radar calibration & live visualization",
  preview:          true,
  documentationURL: "https://github.com/YOUR_GITHUB_USERNAME/lovelace-mmwave-card",
});

console.info(
  `%c MMWAVE-CARD %c v${CARD_VERSION} `,
  "background:#03a9f4;color:#fff;font-weight:700",
  "background:#1c1c2e;color:#03a9f4;font-weight:700",
);

// ── Tab indices ──────────────────────────────────────────────────────────────

const TAB_GEO  = 0;
const TAB_YAW  = 1;
const TAB_LIVE = 2;

// ── Component ────────────────────────────────────────────────────────────────

@customElement(CARD_TAG)
export class MMWaveCard extends LitElement {

  // ── Lovelace public API ───────────────────────────────────────────────────

  public setConfig(config: MMWaveCardConfig): void {
    if (!config.radar_model) throw new Error("radar_model is required");

    const adapter = getAdapter(config.radar_model as string);
    if (!adapter)  throw new Error(`Unknown radar_model: "${config.radar_model}". Check src/models/index.ts.`);

    const errors = adapter.validateConfig(config);
    if (errors.length) throw new Error(errors.join("; "));

    this._config  = { ...DEFAULT_CARD_CONFIG, ...config } as MMWaveCardConfig;
    this._adapter = adapter;
    this._cal     = this._loadCal(config.radar_model as string, adapter);
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./editor");
    return document.createElement(EDITOR_TAG) as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<MMWaveCardConfig> {
    return {
      ...DEFAULT_CARD_CONFIG,
      radar_model:      "r60abd1",
      presence_entity:  "binary_sensor.r60abd1_presence",
      x_entity:         "sensor.r60abd1_x",
      y_entity:         "sensor.r60abd1_y",
      z_entity:         "sensor.r60abd1_z",
    };
  }

  public getCardSize(): number { return 7; }

  // ── State ────────────────────────────────────────────────────────────────

  @state() private _config!: MMWaveCardConfig;
  @state() private _adapter!: RadarModelAdapter;
  @state() private _cal!: CalibrationConfig;
  @state() private _tab = TAB_GEO;

  private _targets: RadarTarget[] = [];
  private _present = false;

  // ── Panel refs (for imperative calls) ────────────────────────────────────

  @query("mmwave-yaw-panel")  private _yawPanel?:  YawPanel;
  @query("mmwave-live-panel") private _livePanel?: LivePanel;

  // ── Hass ─────────────────────────────────────────────────────────────────

  // Use getter/setter pattern so we can react to every state push.
  private _hass!: HomeAssistant;

  public set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (!this._adapter || !this._config) return;

    const reading = this._adapter.readFromHass(hass, this._config);
    this._present = reading.present;

    // Apply transform to every target
    this._targets = reading.targets.map(t => ({
      ...t,
      room: applyTransform(t.rawX, t.rawY, t.rawZ, this._cal),
    }));

    // Push data into panels imperatively (avoids re-rendering the entire card)
    if (this._tab === TAB_LIVE && this._livePanel) {
      this._livePanel.present = this._present;
      this._livePanel.targets = this._targets;
      this._livePanel.addTrailPoints(this._targets);
    }

    // Yaw panel: if it's waiting for a capture reading, offer it
    if (this._tab === TAB_YAW && this._yawPanel) {
      const first = reading.targets[0];
      if (first) this._yawPanel.offerReading(first.rawX, first.rawY);
    }
  }

  // ── Localisation helper ──────────────────────────────────────────────────

  private _L(k: string) { return localize(k, this._hass?.language); }

  // ── Tab management ───────────────────────────────────────────────────────

  private _gotoTab(tab: number) {
    this._tab = tab;
    this._livePanel?.clearTrail();
    this.requestUpdate();
  }

  // ── Event handlers from panels ───────────────────────────────────────────

  /** GeoPanel fires this when the user clicks the polygon canvas. */
  private _onPolygonPointAdded(e: CustomEvent<{ canvasX: number; canvasY: number }>) {
    const cv = this.shadowRoot?.querySelector<HTMLCanvasElement>("#poly-cv");
    const W  = cv?.offsetWidth ?? 400;
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

  // ── Persistence ─────────────────────────────────────────────────────────

  private _storageKey(modelId: string) { return `${STORAGE_KEY}_${modelId}`; }

  private _loadCal(modelId: string, adapter: RadarModelAdapter): CalibrationConfig {
    const defaultCal = adapter.getDefaultCalibration();
    const roomW = this._config.room_w as number;
    const roomD = this._config.room_d as number;
    defaultCal.radar_x = Math.round(roomW * 0.382);
    defaultCal.radar_y = Math.round(roomD * 0.382);

    let loaded = defaultCal;
    try {
      const s = localStorage.getItem(this._storageKey(modelId));
      if (s) loaded = { ...defaultCal, ...JSON.parse(s) };
    } catch {
      // ignore parse error
    }

    // Clamp to boundaries
    const lRoomW = loaded.room_w ?? roomW;
    const lRoomD = loaded.room_d ?? roomD;
    if (loaded.radar_x > lRoomW) loaded.radar_x = lRoomW;
    if (loaded.radar_y > lRoomD) loaded.radar_y = lRoomD;

    return loaded;
  }

  private _save() {
    const key = this._storageKey(this._config.radar_model as string);
    localStorage.setItem(key, JSON.stringify(this._cal));

    const btn = this.shadowRoot?.getElementById("btn-save") as HTMLButtonElement | null;
    if (btn) {
      const orig = btn.textContent!;
      btn.textContent   = this._L("actions.saved");
      btn.style.opacity = "0.65";
      setTimeout(() => { btn.textContent = orig; btn.style.opacity = ""; }, 2000);
    }
  }

  private async _sync() {
    const xEntity = (this._config.x_entity as string) || "";
    if (!xEntity) {
      alert("Error: x_entity is not configured.");
      return;
    }
    
    // Extract device prefix from x_entity (e.g., sensor.r60abd1_test_x -> r60abd1_test)
    const match = xEntity.match(/^sensor\.(.+?)(_radar_x|_x)$/);
    let prefix = "";
    if (match) {
      prefix = match[1];
    } else {
      const parts = xEntity.split(".")[1]?.split("_") || [];
      prefix = parts.slice(0, parts.length - 1).join("_");
    }

    const btn = this.shadowRoot?.getElementById("btn-sync") as HTMLButtonElement | null;
    if (btn) {
      btn.style.opacity = "0.5";
      btn.textContent = "Syncing...";
    }

    try {
      const params: Record<string, number> = {
        radar_x: this._cal.radar_x,
        radar_y: this._cal.radar_y,
        radar_z: this._cal.radar_z,
        yaw: this._cal.yaw,
        pitch: this._cal.pitch,
        roll: this._cal.roll
      };
      
      for (const [key, val] of Object.entries(params)) {
        const entityId = `number.${prefix}_${key}`;
        try {
          await this._hass.callService("number", "set_value", {
            entity_id: entityId,
            value: val
          });
        } catch (err) {
          console.warn(`Failed to sync ${entityId}`, err);
        }
      }

      const polyStr = this._cal.polygon.map(p => `${p.x},${p.y}`).join(";");
      try {
        await this._hass.callService("text", "set_value", {
          entity_id: `text.${prefix}_polygon_config`,
          value: polyStr
        });
      } catch (err) {
        console.warn(`Failed to sync text.${prefix}_polygon_config`, err);
      }

      if (btn) btn.textContent = "Synced!";
    } catch (e) {
      if (btn) btn.textContent = "Error";
      console.error(e);
    } finally {
      if (btn) {
        setTimeout(() => {
          btn.textContent = this._L("actions.sync") || "Sync Device";
          btn.style.opacity = "";
        }, 2000);
      }
    }
  }

  private _reset() {
    if (!confirm(this._L("actions.reset_confirm"))) return;
    localStorage.removeItem(this._storageKey(this._config.radar_model as string));
    this._cal = this._adapter.getDefaultCalibration();
    this._gotoTab(TAB_GEO);
  }

  // ── Render ───────────────────────────────────────────────────────────────

  protected render() {
    if (!this._config || !this._adapter) return nothing;

    const tabs = [
      this._L("tabs.geo"),
      this._L("tabs.yaw"),
      this._L("tabs.live"),
    ];

    const roomW = (this._cal.room_w ?? this._config.room_w) as number;
    const roomD = (this._cal.room_d ?? this._config.room_d) as number;
    const lang  = this._hass?.language ?? "en";

    return html`
      <ha-card>
        <!-- Tab bar -->
        <div id="tabs">
          ${tabs.map((label, i) => html`
            <button class="tab ${this._tab === i ? "act" : ""}"
              @click=${() => this._gotoTab(i)}>${label}</button>`)}
        </div>

        <!-- Body -->
        <div id="body"
          @calibration-changed=${this._onCalibrationChanged}
          @polygon-point-added=${this._onPolygonPointAdded}
          @capture-requested=${this._onCaptureRequested}>

          ${this._tab === TAB_GEO ? html`
            <mmwave-geo-panel
              .adapter=${this._adapter}
              .calibration=${this._cal}
              .lang=${lang}
              .roomW=${roomW}
              .roomD=${roomD}>
            </mmwave-geo-panel>` : nothing}

          ${this._tab === TAB_YAW ? html`
            <mmwave-yaw-panel
              .adapter=${this._adapter}
              .calibration=${this._cal}
              .lang=${lang}
              .roomW=${roomW}
              .roomD=${roomD}>
            </mmwave-yaw-panel>` : nothing}

          ${this._tab === TAB_LIVE ? html`
            <mmwave-live-panel
              .adapter=${this._adapter}
              .calibration=${this._cal}
              .lang=${lang}
              .roomW=${roomW}
              .roomD=${roomD}
              .targets=${this._targets}
              .present=${this._present}>
            </mmwave-live-panel>` : nothing}
        </div>

        <!-- Footer -->
        <div id="foot">
          <button class="btn-rst"  @click=${this._reset}>${this._L("actions.reset")}</button>
          <div style="flex:1"></div>
          <button class="btn-sync" id="btn-sync" @click=${this._sync}>${this._L("actions.sync") || "Sync Device"}</button>
          <button class="btn-save" id="btn-save" @click=${this._save}>${this._L("actions.save")}</button>
        </div>
      </ha-card>
    `;
  }

  // ── Styles ───────────────────────────────────────────────────────────────

  static styles = css`
    :host { display: block; }
    ha-card {
      background: var(--card-background-color);
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: hidden;
      color: var(--primary-text-color);
      font-family: var(--primary-font-family, system-ui, sans-serif);
    }
    #tabs {
      display: flex;
      background: rgba(0,0,0,.12);
      border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.15));
    }
    .tab {
      flex: 1; padding: 12px 6px 10px;
      font-size: 11px; font-weight: 600;
      letter-spacing: .05em; text-transform: uppercase;
      text-align: center; border: none; background: none;
      color: var(--secondary-text-color);
      cursor: pointer; position: relative; transition: color .2s;
    }
    .tab.act { color: var(--primary-color); }
    .tab.act::after {
      content: ""; position: absolute;
      bottom: 0; left: 15%; right: 15%; height: 2px;
      background: var(--primary-color);
      border-radius: 2px 2px 0 0;
    }
    #body { padding: 14px 16px 10px; min-height: 270px; }
    #foot {
      padding: 9px 16px 14px;
      border-top: 1px solid var(--divider-color, rgba(128,128,128,.15));
      display: flex; gap: 8px; justify-content: flex-end;
    }
    .btn-save {
      background: var(--primary-color); color: #fff;
      border: none; border-radius: 8px; padding: 8px 20px;
      font-size: 13px; font-weight: 600; cursor: pointer; transition: opacity .15s;
    }
    .btn-sync {
      background: #4caf50; color: #fff;
      border: none; border-radius: 8px; padding: 8px 20px;
      font-size: 13px; font-weight: 600; cursor: pointer; transition: opacity .15s;
    }
    .btn-rst {
      background: rgba(128,128,128,.1);
      border: 1px solid var(--divider-color, rgba(128,128,128,.15));
      border-radius: 8px; padding: 8px 14px;
      font-size: 13px; color: var(--secondary-text-color); cursor: pointer;
    }
  `;
}

declare global { interface HTMLElementTagNameMap { [CARD_TAG]: MMWaveCard } }
