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

@customElement('mmwave-geo-panel')
export class GeoPanel extends LitElement {
  @property({ attribute: false }) adapter!: RadarModelAdapter;
  @property({ attribute: false }) calibration!: CalibrationConfig;
  @property({ attribute: false }) lang = 'en';
  @property({ type: Number }) roomW = 400;
  @property({ type: Number }) roomD = 350;

  @query('#poly-cv') private _cv?: HTMLCanvasElement;
  private _rafId = 0;

  private _L(k: string) {
    return localize(k, this.lang);
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
          this.adapter.info.maxRangeM,
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
      ${this._numField(this._L('geo.radar_x'), 'radar_x', c.radar_x, 5, 0, roomW)}
      ${this._numField(this._L('geo.radar_y'), 'radar_y', c.radar_y, 5, 0, roomD)}
      ${this._numField(this._L('geo.radar_z'), 'radar_z', c.radar_z, 5, 0, 400)}
      ${this._degField(this._L('geo.yaw_rough'), 'yaw', c.yaw)}
      ${this._degField(this._L('geo.pitch'), 'pitch', c.pitch, -90, 90)}
      ${this._degField(this._L('geo.roll'), 'roll', c.roll, -90, 90)}
      <p class="note">${this._L('geo.geo_note')}</p>

      <p class="sec-title" style="margin-top:14px">${this._L('geo.boundary')}</p>
      <div class="poly-bar">
        <span class="poly-hint ${pn >= 3 ? 'ok' : ''}">${hint}</span>
        <div class="poly-btns">
          <button class="pbtn" @click=${this._undo}>${this._L('geo.poly_undo')}</button>
          <button class="pbtn" @click=${this._clear}>${this._L('geo.poly_clear')}</button>
        </div>
      </div>
      <canvas id="poly-cv" @click=${this._onCanvasClick}></canvas>
      
      ${pn > 0 ? html`
        <div class="warning-box">
          <p>⚠️ 多边形边界无法断电保存，设备重启后会恢复为固件初始值。若要永久保存，请将以下代码复制并替换至 <code>r60abd1-device.yaml</code> 中：</p>
          <pre class="yaml-code">polygon:
${c.polygon.map(p => `  - { x: ${Math.round(p.x)}, y: ${Math.round(p.y)} }`).join('\n')}</pre>
        </div>
      ` : html`<p class="note">${this._L('geo.boundary_note')}</p>`}
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .sec-title {
      font-size: 10px;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      margin: 0 0 8px;
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
      border-color: var(--primary-color);
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
      accent-color: var(--primary-color);
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
    .pbtn:hover {
      background: rgba(128, 128, 128, 0.2);
    }
    canvas {
      display: block;
      width: 100%;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      background: rgba(0, 0, 0, 0.15);
      touch-action: none;
      cursor: crosshair;
    }
    .warning-box {
      margin-top: 10px;
      padding: 10px;
      background: rgba(255, 152, 0, 0.1);
      border: 1px solid rgba(255, 152, 0, 0.3);
      border-radius: 8px;
    }
    .warning-box p {
      margin: 0 0 8px;
      font-size: 11px;
      color: var(--primary-text-color);
      line-height: 1.5;
    }
    .warning-box code {
      background: rgba(0,0,0,0.1);
      padding: 2px 4px;
      border-radius: 4px;
    }
    .yaml-code {
      margin: 0;
      padding: 8px;
      background: #1e1e1e;
      color: #d4d4d4;
      font-family: monospace;
      font-size: 11px;
      border-radius: 6px;
      overflow-x: auto;
      white-space: pre;
    }
  `;
}
declare global {
  interface HTMLElementTagNameMap {
    'mmwave-geo-panel': GeoPanel;
  }
}
