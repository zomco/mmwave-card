import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { CalibrationConfig, YawCalibState } from '../types';
import type { RadarModelAdapter } from '../models';
import {
  setupCanvas,
  drawBase,
  drawPolygon,
  drawRadarFov,
  drawDot,
  roomToCanvas,
  canvasToRoom,
  eventToCanvasCssPt,
  type CanvasMetrics,
} from '../utils/canvas';
import { applyTransform, calcYawFromTwoPoints, calcCalibrationResidual } from '../utils/transform';
import { localize } from '../localize/localize';

@customElement('mmwave-yaw-panel')
export class YawPanel extends LitElement {
  @property({ attribute: false }) adapter!: RadarModelAdapter;
  @property({ attribute: false }) calibration!: CalibrationConfig;
  @property({ attribute: false }) lang = 'en';
  @property({ type: Number }) roomW = 400;
  @property({ type: Number }) roomD = 350;
  @property({ type: Number }) maxRangeM?: number;

  @state() private _yw: YawCalibState = { sub: 0, capturing: false };

  @query('#yaw-cv') private _cv?: HTMLCanvasElement;
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

  // ── public API ─────────────────────────────────────────────────────────────

  public offerReading(rawX: number, rawY: number): void {
    if (!this._yw.capturing) return;
    this._capture(rawX, rawY);
    this._yw = { ...this._yw, capturing: false };
  }

  // ── canvas metrics ─────────────────────────────────────────────────────────

  private _cssH(): number {
    const W = this._cv?.offsetWidth;
    if (!W || W === 0) return 280; // not yet laid out
    const ratio = this.roomD / this.roomW;
    return Math.max(140, Math.min(280, Math.round(W * ratio)));
  }

  private _m(): CanvasMetrics {
    return {
      W: this._cv?.offsetWidth || 400,
      H: this._cssH(),
      roomW: this.roomW,
      roomD: this.roomD,
    };
  }

  // ── canvas click → room coordinates ───────────────────────────────────────

  private _onCanvasClick(e: MouseEvent) {
    const cv = this._cv;
    if (!cv) return;
    const yw = this._yw;
    if (yw.sub !== 0 && yw.sub !== 1) return;

    // Use CSS-pixel coordinates directly (no DPR division needed)
    const cssPt = eventToCanvasCssPt(e, cv);
    const roomPt = canvasToRoom(cssPt.x, cssPt.y, this._m());

    if (yw.sub === 0) {
      this._yw = { ...yw, refA: { canvasPt: cssPt, roomPt }, sub: 0.5 };
    } else {
      this._yw = { ...yw, refB: { canvasPt: cssPt, roomPt }, sub: 1.5 };
    }
    this.requestUpdate();
  }

  private _onCapture() {
    this._yw = { ...this._yw, capturing: true };
    this.dispatchEvent(new CustomEvent('capture-requested', { bubbles: true, composed: true }));
  }

  private _capture(rawX: number, rawY: number) {
    const yw = this._yw;
    if (yw.sub === 0.5 && yw.refA) {
      this._yw = { ...yw, refA: { ...yw.refA, detPt: { x: rawX, y: rawY } }, sub: 1 };
    } else if (yw.sub === 1.5 && yw.refB) {
      this._yw = { ...yw, refB: { ...yw.refB, detPt: { x: rawX, y: rawY } }, sub: 2 };
      this._computeYaw();
    }
  }

  private _computeYaw() {
    const yw = this._yw;
    if (!yw.refA?.detPt || !yw.refB?.detPt) return;
    const m = this._m();
    // Use stored canvasPt to derive mapA/mapB (same as what user clicked)
    const mapA = canvasToRoom(yw.refA.canvasPt.x, yw.refA.canvasPt.y, m);
    const mapB = canvasToRoom(yw.refB.canvasPt.x, yw.refB.canvasPt.y, m);
    const detA = yw.refA.detPt,
      detB = yw.refB.detPt;
    const newYaw = calcYawFromTwoPoints(mapA, mapB, detA, detB);
    const updCal = { ...this.calibration, yaw: newYaw };
    const residual = calcCalibrationResidual(mapA, mapB, detA, detB, updCal);
    this._yw = { ...this._yw, residual };
    this.dispatchEvent(new CustomEvent('calibration-changed', { detail: updCal, bubbles: true, composed: true }));
  }

  // ── rAF draw loop ──────────────────────────────────────────────────────────

  private _loop() {
    const cv = this._cv;
    if (cv && cv.offsetWidth > 0 && this.adapter) {
      const cssH = this._cssH();
      const ctx = setupCanvas(cv, cssH);
      const m = this._m();

      drawBase(ctx, m);
      drawPolygon(ctx, this.calibration.polygon, m, true);

      const rp = roomToCanvas(this.calibration.radar_x, this.calibration.radar_y, m);
      // Pass adapter.info.fovDegrees explicitly — R60ABD1 = 40°
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

      const drawRef = (ref: typeof this._yw.refA, label: string) => {
        if (!ref) return;
        // canvasPt is in CSS pixels; draw at those coordinates
        drawDot(ctx, ref.canvasPt.x, ref.canvasPt.y, label, '#64b5f6');
        if (ref.detPt) {
          const tr = applyTransform(ref.detPt.x, ref.detPt.y, 0, this.calibration);
          const det = roomToCanvas(tr.roomX, tr.roomY, m);
          ctx.beginPath();
          ctx.moveTo(ref.canvasPt.x, ref.canvasPt.y);
          ctx.lineTo(det.cx, det.cy);
          ctx.strokeStyle = 'rgba(244,99,99,.4)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
          drawDot(ctx, det.cx, det.cy, label, 'rgba(244,99,99,.85)', true);
        }
      };
      drawRef(this._yw.refA, 'A');
      drawRef(this._yw.refB, 'B');
    }
    this._rafId = requestAnimationFrame(() => this._loop());
  }

  // ── step description with coordinates ─────────────────────────────────────

  private _refStep(step: 0 | 1) {
    const yw = this._yw;
    const rel = step === 0 ? yw.sub : yw.sub - 1;
    const cls = rel >= 1 ? 'done' : rel >= 0 ? 'act' : '';
    const isA = step === 0;
    const ref = isA ? yw.refA : yw.refB;

    let sub: string;
    if (rel >= 1) {
      sub = this._L(isA ? 'yaw.ref_a_done' : 'yaw.ref_b_done');
    } else if (rel === 0.5) {
      // Show room coordinates inline — no dependency on localization template format
      if (ref?.roomPt != null) {
        const px = Math.round(ref.roomPt.x);
        const py = Math.round(ref.roomPt.y);
        const baseMsg = this._L(isA ? 'yaw.ref_a_marked' : 'yaw.ref_b_marked');
        // Replace {x}/{y} if present; otherwise append coordinates
        if (baseMsg.includes('{x}')) {
          sub = baseMsg.replace('{x}', String(px)).replace('{y}', String(py));
        } else {
          sub = `(X=${px}, Y=${py} cm) — ${this._L(isA ? 'yaw.ref_a_idle' : 'yaw.ref_b_step')}`;
        }
      } else {
        sub = this._L(isA ? 'yaw.ref_a_marked' : 'yaw.ref_b_marked')
          .replace('{x}', '?')
          .replace('{y}', '?');
      }
    } else if (rel === 0) {
      sub = this._L(isA ? 'yaw.ref_a_idle' : 'yaw.ref_b_step');
    } else {
      sub = this._L('yaw.ref_b_idle');
    }

    return html` <div class="ref-step ${cls}">
      <div class="ref-num">${rel >= 1 ? '✓' : isA ? 'A' : 'B'}</div>
      <div>
        <div class="ref-title">${this._L(isA ? 'yaw.ref_a_title' : 'yaw.ref_b_title')}</div>
        <div class="ref-sub">${sub}</div>
      </div>
    </div>`;
  }

  // ── render ─────────────────────────────────────────────────────────────────

  protected render() {
    const yw = this._yw;
    const canCap = yw.sub === 0.5 || yw.sub === 1.5;
    const ok = yw.sub >= 2;
    const resText = ok
      ? this._L('yaw.result_ok')
          .replace('{yaw}', String(this.calibration.yaw))
          .replace('{residual}', String((yw.residual ?? 0).toFixed(1)))
      : this._L('yaw.result_idle');

    return html`
      ${this._refStep(0)} ${this._refStep(1)}
      <canvas id="yaw-cv" @click=${this._onCanvasClick}></canvas>
      <button class="cap-btn" ?disabled=${!canCap || yw.capturing} @click=${this._onCapture}>
        ${yw.capturing ? this._L('yaw.capture_wait') : this._L('yaw.capture_btn')}
      </button>
      <div class="result-line ${ok ? 'ok' : ''}">${resText}</div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    canvas {
      display: block;
      width: 100%;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      background: rgba(0, 0, 0, 0.15);
      touch-action: none;
      cursor: crosshair;
      margin: 8px 0;
    }
    .ref-step {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      margin-bottom: 5px;
      transition: all 0.22s;
    }
    .ref-step.act {
      border-color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.07);
    }
    .ref-step .ref-num {
      width: 20px;
      height: 20px;
      border-radius: 10px;
      background: rgba(128, 128, 128, 0.2);
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      flex-shrink: 0;
    }
    .ref-step.act .ref-num {
      background: var(--mmwave-primary);
      color: #fff;
    }
    .ref-step .ref-txt {
      flex: 1;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .ref-step.act .ref-txt {
      color: var(--primary-text-color);
      font-weight: 500;
    }
    .ref-step.done .ref-txt {
      text-decoration: line-through;
      opacity: 0.6;
    }

    .cap-btn {
      width: 100%;
      margin-top: 9px;
      padding: 9px;
      background: rgba(11, 130, 92, 0.12);
      border: 1px solid rgba(11, 130, 92, 0.35);
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      color: var(--mmwave-primary);
      transition: background 0.15s;
    }
    .cap-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .cap-btn:not(:disabled):hover {
      background: rgba(11, 130, 92, 0.22);
    }
    .result-line {
      font-size: 11px;
      text-align: center;
      min-height: 15px;
      margin-top: 5px;
      color: var(--secondary-text-color);
    }
    .result-line.ok {
      color: var(--success-color, #4caf50);
    }
  `;
}
declare global {
  interface HTMLElementTagNameMap {
    'mmwave-yaw-panel': YawPanel;
  }
}
