import { LitElement, css, html, nothing, type PropertyValues } from 'lit';
import { localize } from '../localize/localize';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import { getAdapter } from '../models';
import type { CalibrationConfig, MMWaveCardConfig, RadarSourceConfig, RadarTarget, Vec2 } from '../types';
import { DEFAULT_CALIBRATION } from '../types';
import { parseAtomicTargetFrame } from '../fusion/frame';
import {
  solveRadarCalibration,
  type FusionCalibrationReference,
  type RadarCalibrationSolution,
} from '../fusion/calibration';
import { applyTransform } from '../utils/transform';
import {
  canvasToRoom,
  drawBase,
  drawDot,
  drawRadarFov,
  eventToCanvasCssPt,
  roomToCanvas,
  setupCanvas,
  type CanvasMetrics,
} from '../utils/canvas';

interface RawSample {
  x: number;
  y: number;
  z: number;
}

const CAPTURE_MS = 2000;
const MIN_CAPTURE_SAMPLES = 3;
const ACCEPTABLE_RESIDUAL_CM = 40;
const COLORS = ['#03a9f4', '#9c27b0', '#ff9800', '#e91e63', '#4caf50', '#795548'];

const median = (values: number[]) => {
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};

const completeCalibration = (radar: RadarSourceConfig): CalibrationConfig => ({
  ...DEFAULT_CALIBRATION,
  ...(radar.calibration ?? {}),
  polygon: radar.calibration?.polygon ?? [],
});

@customElement('mmwave-fusion-calibration')
export class FusionCalibrationPanel extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) radars: RadarSourceConfig[] = [];
  @property({ type: Number }) roomW = 400;
  @property({ type: Number }) roomD = 600;
  @property({ attribute: false }) lang = 'en';

  @state() private references: FusionCalibrationReference[] = [];
  @state() private pendingPoint?: Vec2;
  @state() private capturing = false;
  @state() private captureProgress = 0;
  @state() private captureMessage = '';

  @query('#fusion-calibration-canvas') private canvas?: HTMLCanvasElement;
  private sampleBuffers = new Map<string, RawSample[]>();
  private signatures = new Map<string, string>();
  private captureInterval?: number;
  private captureTimer?: number;
  private drawFrame = 0;

  /**
   * Translate through the shared i18n system.
   *
   * Replaced a `ui(zh, en)` helper that inlined both languages at every
   * call site. Seven files each carried their own copy, which is why the
   * card's strings were not reachable by a translator.
   */
  private _t(key: string, params?: Record<string, unknown>) {
    return localize(key, this.lang, params);
  }

  protected firstUpdated() {
    this.scheduleDraw();
  }

  protected updated(changed: PropertyValues) {
    if (changed.has('radars') || changed.has('roomW') || changed.has('roomD') || changed.has('references')) {
      this.scheduleDraw();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearCaptureTimers();
    cancelAnimationFrame(this.drawFrame);
  }

  private metrics(): CanvasMetrics {
    const width = this.canvas?.offsetWidth || 520;
    return {
      W: width,
      H: Math.max(240, Math.min(420, Math.round((width * this.roomD) / this.roomW))),
      roomW: this.roomW,
      roomD: this.roomD,
    };
  }

  private scheduleDraw() {
    cancelAnimationFrame(this.drawFrame);
    this.drawFrame = requestAnimationFrame(() => this.draw());
  }

  private draw() {
    const canvas = this.canvas;
    if (!canvas || !canvas.offsetWidth) return;
    const metrics = this.metrics();
    const context = setupCanvas(canvas, metrics.H);
    drawBase(context, metrics);
    const solutions = new Map(this.solutions.map((solution) => [solution.radarId, solution]));
    this.radars.forEach((radar, index) => {
      const adapter = getAdapter(radar.radar_model);
      if (!adapter) return;
      const calibration = completeCalibration(radar);
      const point = roomToCanvas(calibration.radar_x, calibration.radar_y, metrics);
      context.save();
      context.globalAlpha = 0.11;
      drawRadarFov(
        context,
        point.cx,
        point.cy,
        calibration.yaw,
        calibration.pitch,
        adapter.info.fovDegrees,
        adapter.info.minRangeM,
        adapter.info.maxRangeM,
        metrics,
        adapter.info.vitalRangeM,
      );
      context.restore();
      context.fillStyle = COLORS[index % COLORS.length];
      context.beginPath();
      context.arc(point.cx, point.cy, 4, 0, Math.PI * 2);
      context.fill();
      context.font = 'bold 9px system-ui';
      context.textAlign = 'center';
      context.fillText(radar.id, point.cx, point.cy - 10);

      const solution = solutions.get(radar.id);
      if (!solution) return;
      for (const reference of this.references) {
        const reading = reference.readings[radar.id];
        if (!reading) continue;
        const transformed = applyTransform(reading.rawX, reading.rawY, reading.rawZ, solution.calibration);
        const result = roomToCanvas(transformed.roomX, transformed.roomY, metrics);
        context.save();
        context.globalAlpha = 0.75;
        context.fillStyle = COLORS[index % COLORS.length];
        context.beginPath();
        context.arc(result.cx, result.cy, 3, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    });
    this.references.forEach((reference, index) => {
      const point = roomToCanvas(reference.room.x, reference.room.y, metrics);
      drawDot(context, point.cx, point.cy, String.fromCharCode(65 + index), '#0b825c');
    });
    if (this.pendingPoint) {
      const point = roomToCanvas(this.pendingPoint.x, this.pendingPoint.y, metrics);
      drawDot(context, point.cx, point.cy, '+', '#ff9800');
    }
  }

  private onCanvasClick(event: MouseEvent) {
    if (this.capturing || this.references.length >= 8 || !this.canvas) return;
    const point = eventToCanvasCssPt(event, this.canvas);
    const room = canvasToRoom(point.x, point.y, this.metrics());
    this.pendingPoint = {
      x: Math.round(Math.max(0, Math.min(this.roomW, room.x))),
      y: Math.round(Math.max(0, Math.min(this.roomD, room.y))),
    };
    this.captureMessage = '';
    this.scheduleDraw();
  }

  private beginCapture() {
    if (!this.pendingPoint || this.capturing) return;
    this.capturing = true;
    this.captureProgress = 0;
    this.captureMessage = this._t('fusioncal.capturing_all_radars_synchronously');
    this.sampleBuffers = new Map(this.radars.map((radar) => [radar.id, []]));
    this.signatures.clear();
    const startedAt = Date.now();
    this.collectSamples();
    this.captureInterval = window.setInterval(() => {
      this.collectSamples();
      this.captureProgress = Math.min(1, (Date.now() - startedAt) / CAPTURE_MS);
    }, 100);
    this.captureTimer = window.setTimeout(() => this.finishCapture(), CAPTURE_MS);
  }

  private collectSamples() {
    if (!this.pendingPoint || !this.hass) return;
    for (const radar of this.radars) {
      const reading = this.readRadarTargets(radar);
      if (!reading || reading.signature === this.signatures.get(radar.id) || !reading.targets.length) continue;
      this.signatures.set(radar.id, reading.signature);
      const calibration = completeCalibration(radar);
      const closest = reading.targets
        .map((target) => {
          const transformed = applyTransform(target.rawX, target.rawY, target.rawZ, calibration);
          return {
            target,
            distance: Math.hypot(transformed.roomX - this.pendingPoint!.x, transformed.roomY - this.pendingPoint!.y),
          };
        })
        .sort((left, right) => left.distance - right.distance)[0];
      if (!closest) continue;
      this.sampleBuffers.get(radar.id)?.push({
        x: closest.target.rawX,
        y: closest.target.rawY,
        z: closest.target.rawZ,
      });
    }
  }

  private readRadarTargets(radar: RadarSourceConfig): { signature: string; targets: RadarTarget[] } | undefined {
    const frameState = radar.frame_entity ? this.hass.states[radar.frame_entity] : undefined;
    const frame = frameState ? parseAtomicTargetFrame(frameState.state) : undefined;
    if (frame) {
      const scale = Number(radar.frame_coordinate_scale ?? 1);
      return {
        signature: `${frame.frameId}:${frame.sourceTimestamp}`,
        targets: frame.targets.map((target, index) => ({
          index,
          rawX: target.x * scale,
          rawY: target.y * scale,
          rawZ: target.z * scale,
          speed: target.speed == null ? undefined : target.speed * scale,
        })),
      };
    }
    const adapter = getAdapter(radar.radar_model);
    if (!adapter) return undefined;
    const config = {
      ...radar,
      type: 'custom:mmwave-card',
      room_w: this.roomW,
      room_d: this.roomD,
    } as MMWaveCardConfig;
    const signature = Object.entries(radar)
      .filter(([key, value]) => key.endsWith('_entity') && typeof value === 'string')
      .map(([, value]) => this.hass.states[String(value)]?.last_updated ?? 'missing')
      .join('|');
    return { signature, targets: adapter.readFromHass(this.hass, config).targets };
  }

  private finishCapture() {
    const room = this.pendingPoint;
    this.clearCaptureTimers();
    this.capturing = false;
    this.captureProgress = 1;
    if (!room) return;
    const readings: FusionCalibrationReference['readings'] = {};
    for (const radar of this.radars) {
      const samples = this.sampleBuffers.get(radar.id) ?? [];
      if (samples.length < MIN_CAPTURE_SAMPLES) continue;
      const rawX = median(samples.map((sample) => sample.x));
      const rawY = median(samples.map((sample) => sample.y));
      const rawZ = median(samples.map((sample) => sample.z));
      const spreadCm = median(samples.map((sample) => Math.hypot(sample.x - rawX, sample.y - rawY)));
      readings[radar.id] = {
        rawX: Math.round(rawX * 10) / 10,
        rawY: Math.round(rawY * 10) / 10,
        rawZ: Math.round(rawZ * 10) / 10,
        samples: samples.length,
        spreadCm: Math.round(spreadCm * 10) / 10,
      };
    }
    const capturedCount = Object.keys(readings).length;
    if (!capturedCount) {
      this.captureMessage = this._t('fusioncal.no_radar_produced_enough_stable_samples');
      return;
    }
    this.references = [
      ...this.references,
      {
        id: `ref_${this.references.length + 1}`,
        room,
        readings,
      },
    ];
    this.pendingPoint = undefined;
    this.captureMessage = this._t('fusioncal.captured_p0_p1_radars', { p0: capturedCount, p1: this.radars.length });
    this.scheduleDraw();
  }

  private clearCaptureTimers() {
    if (this.captureInterval != null) window.clearInterval(this.captureInterval);
    if (this.captureTimer != null) window.clearTimeout(this.captureTimer);
    this.captureInterval = undefined;
    this.captureTimer = undefined;
  }

  private get solutions(): RadarCalibrationSolution[] {
    return this.radars
      .map((radar) => solveRadarCalibration(radar.id, completeCalibration(radar), this.references))
      .filter((solution): solution is RadarCalibrationSolution => Boolean(solution));
  }

  private removeReference(index: number) {
    this.references = this.references.filter((_, referenceIndex) => referenceIndex !== index);
    this.captureMessage = '';
    this.scheduleDraw();
  }

  private reset() {
    if (this.capturing) return;
    this.references = [];
    this.pendingPoint = undefined;
    this.captureMessage = '';
    this.scheduleDraw();
  }

  private applySolutions() {
    const solutions = this.solutions;
    const ready = this.solutionsReady(solutions);
    if (!ready) return;
    this.dispatchEvent(
      new CustomEvent<{ solutions: RadarCalibrationSolution[] }>('fusion-calibration-applied', {
        detail: { solutions },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private get referenceSpanCm() {
    let span = 0;
    for (let left = 0; left < this.references.length; left += 1) {
      for (let right = left + 1; right < this.references.length; right += 1) {
        span = Math.max(
          span,
          Math.hypot(
            this.references[left].room.x - this.references[right].room.x,
            this.references[left].room.y - this.references[right].room.y,
          ),
        );
      }
    }
    return span;
  }

  private solutionsReady(solutions: RadarCalibrationSolution[]) {
    return (
      this.references.length >= 3 &&
      this.referenceSpanCm >= 120 &&
      solutions.length === this.radars.length &&
      solutions.every(
        (solution) =>
          solution.pointCount >= 3 &&
          solution.residualAfterCm <= ACCEPTABLE_RESIDUAL_CM &&
          solution.calibration.radar_x >= -50 &&
          solution.calibration.radar_x <= this.roomW + 50 &&
          solution.calibration.radar_y >= -50 &&
          solution.calibration.radar_y <= this.roomD + 50,
      )
    );
  }

  protected render() {
    const solutions = this.solutions;
    const ready = this.solutionsReady(solutions);
    return html`
      <section class="calibration-shell">
        <div class="intro">
          <span class="eyebrow">${this._t('fusioncal.joint_direction_calibration')}</span>
          <strong>${this._t('fusioncal.calibrate_every_radar_from_shared_positions')}</strong>
          <p>${this._t('fusioncal.keep_only_one_test_person_in')}</p>
        </div>
        <canvas id="fusion-calibration-canvas" @click=${this.onCanvasClick}></canvas>
        <div class="capture-bar">
          <span>
            ${this.pendingPoint
              ? this._t('fusioncal.pending_x_p0_y_p1_cm', { p0: this.pendingPoint.x, p1: this.pendingPoint.y })
              : this._t('fusioncal.click_the_floor_plan_to_choose')}
          </span>
          <button type="button" ?disabled=${!this.pendingPoint || this.capturing} @click=${this.beginCapture}>
            ${this.capturing ? this._t('fusioncal.capturing') : this._t('fusioncal.i_am_ready_capture_all')}
          </button>
        </div>
        ${this.capturing
          ? html`<div class="progress"><i style=${`width:${Math.round(this.captureProgress * 100)}%`}></i></div>`
          : nothing}
        ${this.captureMessage ? html`<div class="message">${this.captureMessage}</div>` : nothing}
        <div class="reference-list">
          ${this.references.map(
            (reference, index) => html`
              <div class="reference">
                <b>${String.fromCharCode(65 + index)}</b>
                <span>X ${reference.room.x} · Y ${reference.room.y} cm</span>
                <small
                  >${Object.keys(reference.readings).length}/${this.radars.length} ${this._t('fusioncal.radars')}</small
                >
                <button type="button" @click=${() => this.removeReference(index)}>×</button>
              </div>
            `,
          )}
        </div>
        ${solutions.length
          ? html`
              <div class="results">
                ${this.radars.map((radar) => {
                  const solution = solutions.find((item) => item.radarId === radar.id);
                  return html`
                    <div class="result ${!solution || solution.residualAfterCm > ACCEPTABLE_RESIDUAL_CM ? 'bad' : ''}">
                      <strong>${radar.id}</strong>
                      ${solution
                        ? html`
                            <span>${solution.residualBeforeCm} → ${solution.residualAfterCm} cm</span>
                            <small>
                              ${solution.pointCount} ${this._t('fusioncal.points')} · yaw ${solution.calibration.yaw}° ·
                              X ${solution.calibration.radar_x} · Y ${solution.calibration.radar_y}
                            </small>
                          `
                        : html`<span>${this._t('fusioncal.not_enough_references')}</span>`}
                    </div>
                  `;
                })}
              </div>
            `
          : nothing}
        <div class="actions">
          <button
            type="button"
            class="secondary"
            ?disabled=${this.capturing || !this.references.length}
            @click=${this.reset}
          >
            ${this._t('fusioncal.start_over')}
          </button>
          <button type="button" class="primary" ?disabled=${!ready} @click=${this.applySolutions}>
            ${ready ? this._t('fusioncal.apply_all_calibrations') : this._t('fusioncal.need_3_points_120_cm_span')}
          </button>
        </div>
      </section>
    `;
  }

  static styles = css`
    :host {
      display: block;
      min-width: 0;
    }
    .calibration-shell {
      overflow: hidden;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.2));
      border-radius: 13px;
      background: var(--card-background-color, #fff);
    }
    .intro {
      display: grid;
      gap: 3px;
      padding: 12px 13px 9px;
    }
    .eyebrow {
      color: var(--primary-color, #0b825c);
      font-size: 9px;
      font-weight: 750;
      text-transform: uppercase;
    }
    .intro strong {
      color: var(--primary-text-color);
      font-size: 13px;
    }
    .intro p {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 10px;
      line-height: 1.5;
    }
    canvas {
      display: block;
      width: 100%;
      cursor: crosshair;
    }
    .capture-bar,
    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 9px 11px;
      border-top: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      color: var(--secondary-text-color);
      font-size: 10px;
    }
    button {
      min-width: 0;
      padding: 7px 10px;
      border: 0;
      border-radius: 8px;
      color: #fff;
      background: var(--primary-color, #0b825c);
      font: inherit;
      font-weight: 700;
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.45;
      cursor: default;
    }
    .progress {
      height: 3px;
      background: rgba(128, 128, 128, 0.12);
    }
    .progress i {
      display: block;
      height: 100%;
      background: var(--primary-color, #0b825c);
      transition: width 0.1s linear;
    }
    .message {
      padding: 7px 11px;
      color: var(--primary-color, #0b825c);
      background: color-mix(in srgb, var(--primary-color, #0b825c) 7%, transparent);
      font-size: 10px;
    }
    .reference-list,
    .results {
      display: grid;
      gap: 5px;
      padding: 8px 11px;
    }
    .reference {
      display: grid;
      grid-template-columns: 22px minmax(0, 1fr) auto 24px;
      align-items: center;
      gap: 6px;
      color: var(--secondary-text-color);
      font-size: 10px;
    }
    .reference b {
      width: 20px;
      height: 20px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: #fff;
      background: var(--primary-color, #0b825c);
    }
    .reference button {
      padding: 2px;
      color: var(--error-color, #e53935);
      background: transparent;
      font-size: 15px;
    }
    .result {
      display: grid;
      grid-template-columns: 70px minmax(0, 1fr);
      gap: 2px 8px;
      padding: 7px 9px;
      border-radius: 8px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-color, #0b825c) 7%, transparent);
      font-size: 10px;
    }
    .result.bad {
      background: color-mix(in srgb, var(--error-color, #e53935) 7%, transparent);
    }
    .result small {
      grid-column: 2;
      color: var(--secondary-text-color);
    }
    .actions {
      justify-content: flex-end;
    }
    .actions .secondary {
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.08);
    }
    @media (max-width: 500px) {
      .capture-bar,
      .actions {
        align-items: stretch;
        flex-direction: column;
      }
      .capture-bar button,
      .actions button {
        width: 100%;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'mmwave-fusion-calibration': FusionCalibrationPanel;
  }
}
