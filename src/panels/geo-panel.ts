import { tracePoint } from '../utils/floorplan-trace';
import type { FloorplanConfig } from '../types';
import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { CalibrationConfig } from '../types';
import type { RadarModelAdapter } from '../models';
import {
  setupCanvas,
  drawBase,
  fitRoomMetrics,
  drawPolygon,
  drawRadarFov,
  roomToCanvas,
  canvasToRoom,
  eventToCanvasCssPt,
  type CanvasMetrics,
} from '../utils/canvas';
import { localize } from '../localize/localize';
import './installation-3d';
import './range-status';

@customElement('mmwave-geo-panel')
export class GeoPanel extends LitElement {
  @state() private trace = true;
  @state() private traceStatus = '';
  @property({ attribute: false }) floorplan?: FloorplanConfig;
  @property({ attribute: false }) adapter!: RadarModelAdapter;
  @property({ attribute: false }) calibration!: CalibrationConfig;
  @property({ attribute: false }) lang = 'en';
  @property({ type: Number }) roomW = 400;
  @property({ type: Number }) roomD = 350;
  @property({ type: Number }) maxRangeM?: number;
  @property({ attribute: false }) peerCalibrations: Array<{ id: string; calibration: CalibrationConfig }> = [];
  @property({ type: Boolean }) showBoundary = true;

  @query('#poly-cv') private _cv?: HTMLCanvasElement;
  private _rafId = 0;

  private _L(k: string) {
    return localize(k, this.lang);
  }

  /**
   * Translate through the shared i18n system.
   *
   * Replaced a `_ui(zh, en)` helper that inlined both languages at every
   * call site. Seven files each carried their own copy, which is why the
   * card's strings were not reachable by a translator.
   */
  private _t(key: string, params?: Record<string, unknown>) {
    return localize(key, this.lang, params);
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
    return fitRoomMetrics({
      W: this._cv?.offsetWidth || 400,
      H: this._cssH(),
      roomW: this.roomW,
      roomD: this.roomD,
    });
  }

  // ── event handlers ─────────────────────────────────────────────────────────

  private _onCanvasClick(e: MouseEvent) {
    const cv = this._cv;
    if (!cv) return;
    const cssPt = eventToCanvasCssPt(e, cv);
    let roomPt = canvasToRoom(cssPt.x, cssPt.y, this._m());
    if (this.trace) {
      const result = tracePoint(roomPt, this.floorplan, this.roomW, (12 * this._m().roomW) / this._m().W);
      roomPt = result.point;
      this.traceStatus = result.unavailable ? 'trace_unavailable' : result.snapped ? 'trace_snapped' : 'trace_hint';
    }
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
      drawBase(
        ctx,
        m,
        this.floorplan ? { ...this.floorplan, width_cm: this.floorplan.width_cm ?? this.roomW } : undefined,
      );
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
        <span class="eyebrow">${this._t('geo.step_1_installation')}</span>
        <h2>${this._t('geo.place_the_radar_in_the_room')}</h2>
        <p>${this._t('geo.drag_the_colored_handles_to_set')}</p>
      </div>

      <mmwave-installation-3d
        .floorplan=${this.floorplan}
        .adapter=${this.adapter}
        .calibration=${c}
        .peerCalibrations=${this.peerCalibrations}
        .lang=${this.lang}
        .roomW=${roomW}
        .roomD=${roomD}
        .maxRangeM=${this.maxRangeM}
      ></mmwave-installation-3d>

      <details class="precision">
        <summary>
          <span>${this._t('geo.precise_numeric_adjustment')}</span>
          <small>${this._t('geo.optional')}</small>
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

      ${this.adapter.info.is1DRanging
        ? html`<section class="boundary-card">
            <h3>${this._L('range.title')}</h3>
            <p class="note">${this._L('range.explanation')}</p>
            ${this._numField(this._L('range.min'), 'distance_min', c.distance_min ?? 0, 10, 0, 1000)}
            ${this._numField(this._L('range.max'), 'distance_max', c.distance_max ?? 0, 10, 0, 1000)}
            <p class="note">${this._L('range.zero')}</p>
            <mmwave-range-status
              .calibration=${c}
              .maxRangeM=${this.maxRangeM}
              .lang=${this.lang}
              .model=${this.adapter.info.id}
            ></mmwave-range-status>
          </section>`
        : ''}
      <section class="boundary-card" ?hidden=${!this.showBoundary || this.adapter.info.is1DRanging}>
        <div class="section-heading">
          <div>
            <span class="eyebrow">${this._t('geo.optional_2')}</span>
            <h3>${this._L('geo.boundary')}</h3>
            <p>${this._t('geo.click_the_top_down_map_to')}</p>
          </div>
          <span class="boundary-badge ${pn >= 3 ? 'active' : ''}"
            >${pn >= 3 ? `${pn} ${this._t('geo.points')}` : this._t('geo.off')}</span
          >
        </div>
        <div class="poly-bar">
          <span class="poly-hint ${pn >= 3 ? 'ok' : ''}">${hint}</span>
          <div class="poly-btns">
            <button class="pbtn" type="button" ?disabled=${pn === 0} @click=${this._undo}>
              ${this._t('geo.undo_point')}
            </button>
            <button class="pbtn danger" type="button" ?disabled=${pn === 0} @click=${this._clear}>
              ${this._L('geo.poly_clear')}
            </button>
          </div>
        </div>
        ${this.floorplan?.url && this.floorplan.visible !== false
          ? html`<div class="trace-controls">
              <label
                ><input
                  type="checkbox"
                  .checked=${this.trace}
                  @change=${(e: Event) => {
                    this.trace = (e.target as HTMLInputElement).checked;
                    this.traceStatus = '';
                  }}
                />${this._t('floorplan.trace')}</label
              >
              <small role="status">${this._t('floorplan.' + (this.traceStatus || 'trace_hint'))}</small>
            </div>`
          : ''}
        <div class="map-shell">
          <canvas id="poly-cv" @click=${this._onCanvasClick}></canvas>
          ${pn === 0 ? html`<span class="map-empty">${this._t('geo.click_the_map_to_add_the')}</span>` : ''}
        </div>
        <p class="note">${this._L('geo.boundary_note')}</p>
      </section>
    `;
  }

  static styles = css`
    .trace-controls {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin: 8px 0;
      font-size: 12px;
    }
    .trace-controls label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .trace-controls input {
      width: auto;
      accent-color: var(--mmwave-primary, #408564);
    }
    .trace-controls small {
      color: var(--secondary-text-color);
    }

    :host {
      container-type: inline-size;
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
      display: grid;
      grid-template-columns: minmax(0, 90px) minmax(0, 1fr) 8ch 2.5ch;
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
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .field input {
      box-sizing: border-box;
      min-width: 0;
      width: 100%;
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
      margin: 0;
    }
    .field input.num-input {
      font-size: 16px;
      padding: 2px 0;
    }
    .unit {
      font-size: 11px;
      color: var(--secondary-text-color);
      min-width: 18px;
      text-align: right;
    }
    @container (max-width: 400px) {
      .field {
        grid-template-columns: minmax(0, 1fr) 8ch 2.5ch;
        grid-template-areas: 'label value unit' 'slider slider slider';
        row-gap: 6px;
      }
      .field label {
        grid-area: label;
      }
      .field input.num-input {
        grid-area: value;
      }
      .field .unit {
        grid-area: unit;
      }
      .field input.slider {
        grid-area: slider;
        min-height: 28px;
      }
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
