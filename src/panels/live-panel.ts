import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { CalibrationConfig, RadarTarget } from '../types';
import type { RadarModelAdapter } from '../models';
import {
  setupCanvas,
  drawBase,
  drawPolygon,
  drawRadarFov,
  drawTarget,
  drawTargetArc,
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

interface AnimatedTarget {
  x: number;
  y: number;
  rangeM: number;
  goalX: number;
  goalY: number;
  goalRangeM: number;
  velocityX: number;
  velocityY: number;
  velocityRange: number;
  lastSeen: number;
  lastTrailAt: number;
}

const TARGET_COLORS = ['#ff9800', '#03a9f4', '#e91e63'] as const;
const TRAIL_SAMPLE_MS = 75;
const TRAIL_MIN_DISTANCE_CM = 0.5;
const ANIMATED_TARGET_TTL_MS = 1000;

function targetColor(index: number): string {
  return TARGET_COLORS[((index % TARGET_COLORS.length) + TARGET_COLORS.length) % TARGET_COLORS.length];
}

/** Critically damped motion that converges quickly without spring overshoot. */
function smoothDamp(
  current: number,
  target: number,
  velocity: number,
  smoothTime: number,
  deltaTime: number,
): [value: number, velocity: number] {
  const omega = 2 / Math.max(0.0001, smoothTime);
  const x = omega * deltaTime;
  const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = current - target;
  const temp = (velocity + omega * change) * deltaTime;
  let nextVelocity = (velocity - omega * temp) * decay;
  let value = target + (change + temp) * decay;

  // A changing radar goal can reverse direction abruptly. Do not let the
  // accumulated velocity carry the marker beyond the newest measurement.
  if (Math.abs(target - current) < 0.000001 || (target - current) * (value - target) > 0) {
    value = target;
    nextVelocity = 0;
  }

  return [value, nextVelocity];
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
  @property({ type: Boolean }) showStatus = false;
  @property({ type: Number }) maxRangeM?: number;

  private _trails = new Map<number, TrailPoint[]>();
  private _animatedTargets = new Map<number, AnimatedTarget>();
  @query('#live-cv') private _cv?: HTMLCanvasElement;
  private _rafId = 0;
  private _lastFrameAt = 0;
  private _lastTrailPruneAt = 0;

  connectedCallback() {
    super.connectedCallback();
    this._lastFrameAt = Date.now();
    this._loop();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    cancelAnimationFrame(this._rafId);
  }

  protected willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('targets')) {
      this._setTargetGoals(this.targets);
    }
  }

  private _setTargetGoals(targets: RadarTarget[]) {
    const now = Date.now();
    for (const t of targets) {
      if (!t.room) continue;

      const goalX = t.room.roomX;
      const goalY = t.room.roomY;
      const goalRangeM = Math.hypot(t.rawX, t.rawY) / 100;
      const animated = this._animatedTargets.get(t.index);
      if (animated && now - animated.lastSeen <= ANIMATED_TARGET_TTL_MS) {
        animated.goalX = goalX;
        animated.goalY = goalY;
        animated.goalRangeM = goalRangeM;
        animated.lastSeen = now;
      } else {
        // A reused radar slot represents a new track. Do not connect it to the
        // previous occupant's last known position.
        this._trails.delete(t.index);
        this._animatedTargets.set(t.index, {
          x: goalX,
          y: goalY,
          rangeM: goalRangeM,
          goalX,
          goalY,
          goalRangeM,
          velocityX: 0,
          velocityY: 0,
          velocityRange: 0,
          lastSeen: now,
          lastTrailAt: 0,
        });
      }
    }
  }

  private _advanceTargets(now: number) {
    const deltaTime = Math.min(Math.max((now - this._lastFrameAt) / 1000, 0), 0.05);
    this._lastFrameAt = now;
    const updateRate = Math.max(this.adapter.info.updateRateHz, 1);
    const smoothTime = Math.min(0.22, Math.max(0.12, 1.25 / updateRate));

    for (const [targetIndex, target] of this._animatedTargets) {
      if (now - target.lastSeen > ANIMATED_TARGET_TTL_MS) {
        this._animatedTargets.delete(targetIndex);
        continue;
      }

      [target.x, target.velocityX] = smoothDamp(target.x, target.goalX, target.velocityX, smoothTime, deltaTime);
      [target.y, target.velocityY] = smoothDamp(target.y, target.goalY, target.velocityY, smoothTime, deltaTime);
      [target.rangeM, target.velocityRange] = smoothDamp(
        target.rangeM,
        target.goalRangeM,
        target.velocityRange,
        smoothTime,
        deltaTime,
      );
    }
  }

  private _sampleTrails(targets: RadarTarget[], now: number) {
    for (const t of targets) {
      const animated = this._animatedTargets.get(t.index);
      if (!animated || !t.room?.inBoundary || now - animated.lastTrailAt < TRAIL_SAMPLE_MS) continue;

      animated.lastTrailAt = now;
      const trail = this._trails.get(t.index) ?? [];
      const previous = trail.at(-1);
      if (!previous || Math.hypot(animated.x - previous.x, animated.y - previous.y) >= TRAIL_MIN_DISTANCE_CM) {
        trail.push({ x: animated.x, y: animated.y, t: now });
        this._trails.set(t.index, trail);
      }
    }

    if (now - this._lastTrailPruneAt >= 1000) {
      this._lastTrailPruneAt = now;
      const cutoff = now - TRAIL_MAX_MS;
      for (const [targetIndex, trail] of this._trails) {
        const recentPoints = trail.filter((point) => point.t > cutoff);
        if (recentPoints.length > 0) {
          this._trails.set(targetIndex, recentPoints);
        } else {
          this._trails.delete(targetIndex);
        }
      }
    }
  }

  public clearTrail() {
    this._trails.clear();
    for (const target of this._animatedTargets.values()) target.lastTrailAt = 0;
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
      const now = Date.now();

      this._advanceTargets(now);
      this._sampleTrails(this.targets, now);

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
        this.maxRangeM ?? this.adapter.info.maxRangeM,
        m,
        this.adapter.info.vitalRangeM,
      );

      // Time-faded trail
      for (const [targetIndex, trail] of this._trails) {
        if (trail.length < 2) continue;

        ctx.save();
        ctx.strokeStyle = targetColor(targetIndex);
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        for (let i = 1; i < trail.length; i++) {
          const prev = trail[i - 1];
          const cur = trail[i];
          const age = (now - cur.t) / TRAIL_MAX_MS;
          ctx.globalAlpha = Math.max(0, 0.5 - age * 0.5);
          const pa = roomToCanvas(prev.x, prev.y, m);
          const pb = roomToCanvas(cur.x, cur.y, m);
          ctx.beginPath();
          ctx.moveTo(pa.cx, pa.cy);
          ctx.lineTo(pb.cx, pb.cy);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Targets
      for (const t of this.targets) {
        if (!t.room) continue;
        const animated = this._animatedTargets.get(t.index);
        if (this.adapter.info.is1DRanging) {
          drawTargetArc(
            ctx,
            rp.cx,
            rp.cy,
            this.calibration.yaw,
            this.calibration.pitch,
            this.adapter.info.fovDegrees,
            animated?.rangeM ?? Math.hypot(t.rawX, t.rawY) / 100,
            m,
            t.room.inBoundary,
          );
        } else {
          const cp = roomToCanvas(animated?.x ?? t.room.roomX, animated?.y ?? t.room.roomY, m);
          const color = targetColor(t.index);
          drawTarget(ctx, cp.cx, cp.cy, t.room.inBoundary, color);
          if (this.adapter.info.maxTargets > 1) {
            ctx.fillStyle = color;
            ctx.font = 'bold 10px system-ui';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(t.index + 1), cp.cx, cp.cy - 14);
            ctx.textBaseline = 'alphabetic';
          }
        }
      }
    }
    this._rafId = requestAnimationFrame(() => this._loop());
  }

  // ── status ─────────────────────────────────────────────────────────────────

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

  private _badgeText() {
    if (!this.present) return this._L('live.badge_none');
    const inside = this.targets.filter((t) => t.room?.inBoundary).length;
    return inside > 0 ? this._L('live.badge_present') : this._L('live.badge_filtered');
  }

  private _badgeCls() {
    if (!this.present) return '';
    return this.targets.some((t) => t.room?.inBoundary) ? 'on' : 'filtered';
  }

  // ── render ─────────────────────────────────────────────────────────────────

  protected render() {
    return html`
      ${this.showStatus
        ? html`<div class="panel-heading">
            <span class="eyebrow">${this._t('live.step_3_live_test')}</span>
            <h2>${this._t('live.verify_coverage_and_target_trails')}</h2>
            <p>${this._t('live.walk_through_the_room_and_confirm')}</p>
          </div>`
        : ''}
      <div class="scene-shell">
        <canvas id="live-cv"></canvas>
        <div class="scene-toolbar">
          <div class="badge ${this._badgeCls()}"><i></i>${this._badgeText()}</div>
          ${this.showStatus
            ? html`<button type="button" @click=${this.clearTrail}>${this._t('live.clear_trails')}</button>`
            : ''}
        </div>
        ${!this.present
          ? html`<div class="idle-hint"><span>◎</span>${this._t('live.waiting_for_a_radar_target')}</div>`
          : ''}
      </div>
      ${this.showStatus
        ? html`
            <div class="target-summary">
              <div class="summary-head">
                <strong>${this._t('live.detected_targets')}</strong>
                <span
                  >${this.targets.filter((target) => target.room?.inBoundary).length} /
                  ${this.adapter.info.maxTargets}</span
                >
              </div>
              <div class="target-list">
                ${this.targets.length > 0
                  ? this.targets.map(
                      (target) => html`
                        <div
                          class="target-row ${target.room?.inBoundary ? '' : 'outside'}"
                          style="--target-color:${targetColor(target.index)}"
                        >
                          <span class="target-id"><i></i>${this._t('live.target')} ${target.index + 1}</span>
                          <span class="target-coord">
                            ${target.room
                              ? `X ${Math.round(target.room.roomX)} · Y ${Math.round(target.room.roomY)}${this.adapter.info.hasZAxis ? ` · Z ${Math.round(target.room.roomZ)}` : ''} cm`
                              : '—'}
                          </span>
                          <span class="target-state"
                            >${target.room?.inBoundary ? this._t('live.inside') : this._t('live.outside')}</span
                          >
                        </div>
                      `,
                    )
                  : html`<div class="target-empty">${this._t('live.no_target_data_yet')}</div>`}
              </div>
            </div>
          `
        : ''}
    `;
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
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
    .panel-heading h2 {
      margin: 4px 0;
      color: var(--primary-text-color);
      font-size: 16px;
      font-weight: 700;
    }
    .panel-heading p {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 1.5;
    }
    .scene-shell {
      position: relative;
      overflow: hidden;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.16));
      border-radius: 12px;
      background:
        radial-gradient(circle at 50% 20%, rgba(3, 169, 244, 0.055), transparent 48%),
        var(--ha-card-background, rgba(128, 128, 128, 0.04));
    }
    .scene-toolbar {
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      pointer-events: none;
    }
    .scene-toolbar button {
      padding: 4px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--card-background-color, #fff) 88%, transparent);
      font-size: 9px;
      cursor: pointer;
      pointer-events: auto;
      backdrop-filter: blur(6px);
    }
    .idle-hint {
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--card-background-color, #fff) 82%, transparent);
      font-size: 10px;
      pointer-events: none;
      transform: translate(-50%, -50%);
      backdrop-filter: blur(7px);
    }
    .status {
      position: absolute;
      bottom: 12px;
      right: 12px;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      gap: 6px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--card-background-color, #fff) 86%, transparent);
      border: 1px solid var(--divider-color);
      backdrop-filter: blur(4px);
      width: fit-content;
    }
    .badge i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #9ca3af;
    }
    .badge.on {
      background: rgba(11, 130, 92, 0.15);
      color: var(--mmwave-primary);
      border: 1px solid rgba(11, 130, 92, 0.3);
    }
    .badge.on i {
      background: var(--mmwave-primary);
      box-shadow: 0 0 0 3px rgba(11, 130, 92, 0.12);
    }
    .badge.filtered {
      border-color: rgba(255, 152, 0, 0.28);
      color: var(--warning-color, #f57c00);
      background: rgba(255, 152, 0, 0.09);
    }
    .badge.filtered i {
      background: var(--warning-color, #ff9800);
    }

    .coords {
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(4px);
      border-radius: 8px;
      padding: 6px 10px;
      color: #fff;
      font-size: 11px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: fit-content;
    }
    .coords div {
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }
    .coords span:first-child {
      opacity: 0.7;
    }
    .coords span:last-child {
      font-weight: 600;
      font-family: monospace;
    }
    canvas {
      display: block;
      width: 100%;
      border: none;
      background: transparent;
      touch-action: none;
    }
    .target-summary {
      margin-top: 9px;
      padding: 10px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.16));
      border-radius: 11px;
      background: rgba(128, 128, 128, 0.035);
    }
    .summary-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 7px;
      color: var(--primary-text-color);
      font-size: 10px;
    }
    .summary-head span {
      padding: 2px 6px;
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.09);
      font-size: 9px;
    }
    .target-list {
      display: grid;
      gap: 5px;
    }
    .target-row {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 8px;
      padding: 7px 8px;
      border-radius: 8px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--target-color) 7%, transparent);
      font-size: 9px;
    }
    .target-row.outside {
      opacity: 0.55;
    }
    .target-id {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-weight: 700;
    }
    .target-id i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--target-color);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--target-color) 18%, transparent);
    }
    .target-coord {
      overflow: hidden;
      color: var(--secondary-text-color);
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .target-state {
      padding: 2px 5px;
      border-radius: 999px;
      color: var(--target-color);
      background: color-mix(in srgb, var(--target-color) 10%, transparent);
      font-weight: 700;
    }
    .target-empty {
      padding: 8px;
      color: var(--secondary-text-color);
      font-size: 10px;
      text-align: center;
    }
    @media (max-width: 440px) {
      .target-row {
        grid-template-columns: auto 1fr;
      }
      .target-coord {
        text-align: left;
      }
      .target-state {
        display: none;
      }
    }
  `;
}
declare global {
  interface HTMLElementTagNameMap {
    'mmwave-live-panel': LivePanel;
  }
}
