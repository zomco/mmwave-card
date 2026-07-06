import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { CalibrationConfig, RadarTarget, TransformResult } from '../types';
import type { RadarModelAdapter } from '../models';
import {
  setupCanvas,
  drawBase,
  drawPolygon,
  drawRadarFov,
  drawTarget,
  roomToCanvas,
  type CanvasMetrics,
} from '../utils/canvas';
import { TRAIL_MAX_MS } from '../const';
import { localize } from '../localize/localize';

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

@customElement('mmwave-live-panel')
export class LivePanel extends LitElement {
  @property({ attribute: false }) adapter!: RadarModelAdapter;
  @property({ attribute: false }) calibration!: CalibrationConfig;
  @property({ attribute: false }) lang = 'en';
  @property({ type: Number }) roomW = 400;
  @property({ type: Number }) roomD = 350;
  @property({ attribute: false }) targets: RadarTarget[] = [];
  @property({ type: Boolean }) present = false;

  private _trail: TrailPoint[] = [];
  @query('#live-cv') private _cv?: HTMLCanvasElement;
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

  public addTrailPoints(targets: RadarTarget[]) {
    const now = Date.now();
    for (const t of targets) {
      if (t.room?.inBoundary) {
        this._trail.push({ x: t.room.roomX, y: t.room.roomY, t: now });
      }
    }
    const cutoff = now - TRAIL_MAX_MS;
    this._trail = this._trail.filter((p) => p.t > cutoff);
  }

  public clearTrail() {
    this._trail = [];
  }

  // ── canvas metrics ─────────────────────────────────────────────────────────

  private _cssH(): number {
    const W = this._cv?.offsetWidth;
    if (!W || W === 0) return 340; // not yet laid out
    const ratio = this.roomD / this.roomW;
    return Math.max(140, Math.min(340, Math.round(W * ratio)));
  }

  private _m(): CanvasMetrics {
    return {
      W: this._cv?.offsetWidth || 400,
      H: this._cssH(),
      roomW: this.roomW,
      roomD: this.roomD,
    };
  }

  // ── rAF draw loop ──────────────────────────────────────────────────────────

  private _loop() {
    const cv = this._cv;
    if (cv && cv.offsetWidth > 0 && this.adapter) {
      const cssH = this._cssH();
      const ctx = setupCanvas(cv, cssH);
      const m = this._m();

      drawBase(ctx, m);
      drawPolygon(ctx, this.calibration.polygon, m);

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

      // Time-faded trail
      if (this._trail.length > 1) {
        const now = Date.now();
        for (let i = 1; i < this._trail.length; i++) {
          const prev = this._trail[i - 1],
            cur = this._trail[i];
          const age = (now - cur.t) / TRAIL_MAX_MS;
          const a = Math.max(0, 0.5 - age * 0.5);
          const pa = roomToCanvas(prev.x, prev.y, m);
          const pb = roomToCanvas(cur.x, cur.y, m);
          ctx.beginPath();
          ctx.moveTo(pa.cx, pa.cy);
          ctx.lineTo(pb.cx, pb.cy);
          ctx.strokeStyle = `rgba(255,152,0,${a})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Targets
      for (const t of this.targets) {
        if (!t.room) continue;
        const cp = roomToCanvas(t.room.roomX, t.room.roomY, m);
        drawTarget(ctx, cp.cx, cp.cy, t.room.inBoundary);
        if (this.adapter.info.maxTargets > 1) {
          ctx.fillStyle = 'rgba(255,255,255,.7)';
          ctx.font = '9px system-ui';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(t.index + 1), cp.cx, cp.cy - 14);
          ctx.textBaseline = 'alphabetic';
        }
      }
    }
    this._rafId = requestAnimationFrame(() => this._loop());
  }

  // ── status ─────────────────────────────────────────────────────────────────

  private _badgeText() {
    if (!this.present) return this._L('live.badge_none');
    const inside = this.targets.filter((t) => t.room?.inBoundary).length;
    return inside > 0 ? this._L('live.badge_present') : this._L('live.badge_filtered');
  }

  private _badgeCls() {
    if (!this.present) return '';
    return this.targets.some((t) => t.room?.inBoundary) ? 'on' : 'filtered';
  }

  private _primaryTarget(): TransformResult | undefined {
    return this.targets.find((t) => t.room?.inBoundary)?.room;
  }

  // ── render ─────────────────────────────────────────────────────────────────

  protected render() {
    return html`<canvas id="live-cv"></canvas>`;
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
      background: var(--ha-card-background, rgba(128, 128, 128, 0.05));
      touch-action: none;
    }
  `;
}
declare global {
  interface HTMLElementTagNameMap {
    'mmwave-live-panel': LivePanel;
  }
}
