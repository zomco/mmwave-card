import { LitElement, css, html, nothing, type PropertyValues } from 'lit';
import { localize } from '../localize/localize';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import { getAdapter } from '../models';
import type { CalibrationConfig, MMWaveCardConfig, RadarSourceConfig, RadarTarget, Vec2 } from '../types';
import { DEFAULT_CALIBRATION } from '../types';
import { parseAtomicTargetFrame } from '../fusion/frame';
import {
  calculateCalibrationAdjustment,
  solveRadarCalibration,
  type FusionCalibrationReference,
  type RadarCalibrationSolution,
} from '../fusion/calibration';
import { applyTransform } from '../utils/transform';
import {
  canvasToRoom,
  drawBase,
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

interface GuidedRegion {
  id: string;
  label: string;
  room: Vec2;
}

const CAPTURE_MS = 3000;
const MIN_CAPTURE_SAMPLES = 3;
const MIN_REFERENCE_SPAN_CM = 120;
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
  @state() private selectedRegionId = 'region_a';
  @state() private capturing = false;
  @state() private captureProgress = 0;
  @state() private captureMessage = '';
  @state() private captureCounts: Record<string, number> = {};
  @state() private mobileFocus = false;
  @state() private detailsExpanded = false;

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
    if (
      changed.has('radars') ||
      changed.has('roomW') ||
      changed.has('roomD') ||
      changed.has('references') ||
      changed.has('selectedRegionId') ||
      changed.has('captureCounts') ||
      changed.has('mobileFocus')
    ) {
      this.scheduleDraw();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearCaptureTimers();
    cancelAnimationFrame(this.drawFrame);
  }

  private async toggleMobileFocus() {
    this.mobileFocus = !this.mobileFocus;
    if (this.mobileFocus) this.detailsExpanded = false;
    await this.updateComplete;
    if (this.mobileFocus) this.renderRoot.querySelector<HTMLElement>('.calibration-shell')?.scrollTo({ top: 0 });
    this.scheduleDraw();
  }

  private toggleDetails() {
    this.detailsExpanded = !this.detailsExpanded;
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

  private get guidedRegions(): GuidedRegion[] {
    const point = (id: string, label: string, xRatio: number, yRatio: number): GuidedRegion => ({
      id,
      label,
      room: { x: Math.round(this.roomW * xRatio), y: Math.round(this.roomD * yRatio) },
    });
    // The first three recommendations deliberately form a wide triangle so
    // calibration reaches a useful baseline without asking users to plan it.
    return [
      point('region_a', 'A', 0.23, 0.22),
      point('region_b', 'B', 0.77, 0.78),
      point('region_c', 'C', 0.77, 0.22),
      point('region_d', 'D', 0.23, 0.78),
      point('region_e', 'E', 0.5, 0.5),
      point('region_f', 'F', 0.23, 0.5),
      point('region_g', 'G', 0.77, 0.5),
    ];
  }

  private get selectedRegion(): GuidedRegion {
    return this.guidedRegions.find((region) => region.id === this.selectedRegionId) ?? this.guidedRegions[0];
  }

  private get regionRadiusCm() {
    return Math.max(32, Math.min(60, Math.min(this.roomW, this.roomD) * 0.09));
  }

  private drawGuidedRegion(context: CanvasRenderingContext2D, metrics: CanvasMetrics, region: GuidedRegion) {
    const point = roomToCanvas(region.room.x, region.room.y, metrics);
    const edge = roomToCanvas(region.room.x + this.regionRadiusCm, region.room.y, metrics);
    const radius = Math.max(18, Math.min(34, Math.abs(edge.cx - point.cx)));
    const reference = this.references.find((item) => item.id === region.id);
    const captured = new Set(Object.keys(reference?.readings ?? {}));
    if (this.capturing && region.id === this.selectedRegionId) {
      this.radars.forEach((radar) => {
        if ((this.captureCounts[radar.id] ?? 0) >= MIN_CAPTURE_SAMPLES) captured.add(radar.id);
      });
    }
    const complete = this.radars.length > 0 && captured.size === this.radars.length;

    context.save();
    context.fillStyle = 'rgba(100, 116, 139, 0.18)';
    context.beginPath();
    context.arc(point.cx, point.cy, radius, 0, Math.PI * 2);
    context.fill();
    const segmentAngle = (Math.PI * 2) / Math.max(1, this.radars.length);
    this.radars.forEach((radar, radarIndex) => {
      if (!captured.has(radar.id)) return;
      const start = -Math.PI / 2 + radarIndex * segmentAngle;
      context.fillStyle = COLORS[radarIndex % COLORS.length];
      context.globalAlpha = 0.82;
      context.beginPath();
      context.moveTo(point.cx, point.cy);
      context.arc(point.cx, point.cy, radius, start, start + segmentAngle);
      context.closePath();
      context.fill();
    });
    context.globalAlpha = 1;
    context.strokeStyle = complete
      ? '#0b825c'
      : region.id === this.selectedRegionId
        ? '#0284c7'
        : 'rgba(100, 116, 139, 0.45)';
    context.lineWidth = region.id === this.selectedRegionId ? 3 : 1.5;
    context.setLineDash(region.id === this.selectedRegionId && !complete ? [5, 4] : []);
    context.beginPath();
    context.arc(point.cx, point.cy, radius + 2, 0, Math.PI * 2);
    context.stroke();
    context.setLineDash([]);
    context.fillStyle = 'rgba(255, 255, 255, 0.92)';
    context.beginPath();
    context.arc(point.cx, point.cy, 9, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = complete ? '#0b825c' : region.id === this.selectedRegionId ? '#0284c7' : '#64748b';
    context.font = 'bold 10px system-ui';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(region.label, point.cx, point.cy + 0.5);
    context.restore();
  }

  private draw() {
    const canvas = this.canvas;
    if (!canvas || !canvas.offsetWidth) return;
    const metrics = this.metrics();
    const context = setupCanvas(canvas, metrics.H);
    drawBase(context, metrics);
    const solutions = new Map(this.solutions.map((solution) => [solution.radarId, solution]));
    this.radars.forEach((radar) => {
      const adapter = getAdapter(radar.radar_model);
      if (!adapter) return;
      const calibration = completeCalibration(radar);
      const point = roomToCanvas(calibration.radar_x, calibration.radar_y, metrics);
      context.save();
      context.globalAlpha = 0.045;
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
    });
    this.guidedRegions.forEach((region) => this.drawGuidedRegion(context, metrics, region));
    this.radars.forEach((radar, index) => {
      const calibration = completeCalibration(radar);
      const point = roomToCanvas(calibration.radar_x, calibration.radar_y, metrics);
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
  }

  private onCanvasClick(event: MouseEvent) {
    if (this.capturing || !this.canvas) return;
    const point = eventToCanvasCssPt(event, this.canvas);
    const room = canvasToRoom(point.x, point.y, this.metrics());
    const nearest = this.guidedRegions
      .map((region) => ({ region, distance: Math.hypot(region.room.x - room.x, region.room.y - room.y) }))
      .sort((left, right) => left.distance - right.distance)[0];
    if (!nearest || nearest.distance > this.regionRadiusCm * 1.55) {
      this.captureMessage = this._t('fusioncal.tap_a_guided_region');
      return;
    }
    this.selectedRegionId = nearest.region.id;
    this.captureMessage = this._t('fusioncal.move_to_region_p0', { p0: nearest.region.label });
  }

  private beginCapture() {
    if (this.capturing) return;
    this.capturing = true;
    this.captureProgress = 0;
    this.captureMessage = this._t('fusioncal.capturing_region_p0', { p0: this.selectedRegion.label });
    this.sampleBuffers = new Map(this.radars.map((radar) => [radar.id, []]));
    this.captureCounts = Object.fromEntries(this.radars.map((radar) => [radar.id, 0]));
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
    if (!this.hass) return;
    const room = this.selectedRegion.room;
    let changed = false;
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
            distance: Math.hypot(transformed.roomX - room.x, transformed.roomY - room.y),
          };
        })
        .sort((left, right) => left.distance - right.distance)[0];
      if (!closest) continue;
      this.sampleBuffers.get(radar.id)?.push({
        x: closest.target.rawX,
        y: closest.target.rawY,
        z: closest.target.rawZ,
      });
      changed = true;
    }
    if (changed) {
      this.captureCounts = Object.fromEntries(
        this.radars.map((radar) => [radar.id, this.sampleBuffers.get(radar.id)?.length ?? 0]),
      );
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
    const region = this.selectedRegion;
    this.clearCaptureTimers();
    this.capturing = false;
    this.captureProgress = 1;
    const existing = this.references.find((reference) => reference.id === region.id);
    const readings: FusionCalibrationReference['readings'] = { ...(existing?.readings ?? {}) };
    let newlyCaptured = 0;
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
      newlyCaptured += 1;
    }
    if (!newlyCaptured) {
      this.captureMessage = this._t('fusioncal.no_radar_produced_enough_stable_samples');
      this.captureCounts = {};
      return;
    }
    const nextReference: FusionCalibrationReference = { id: region.id, room: region.room, readings };
    const order = new Map(this.guidedRegions.map((item, index) => [item.id, index]));
    const nextReferences = [...this.references.filter((reference) => reference.id !== region.id), nextReference].sort(
      (left, right) => (order.get(left.id) ?? 99) - (order.get(right.id) ?? 99),
    );
    this.references = nextReferences;
    this.captureCounts = {};
    if (nextReferences.length === this.guidedRegions.length) this.detailsExpanded = true;
    this.captureMessage = this._t('fusioncal.region_p0_captured_p1_p2_radars', {
      p0: region.label,
      p1: Object.keys(readings).length,
      p2: this.radars.length,
    });
    this.selectedRegionId = this.recommendNextRegion(nextReferences, region.id);
  }

  private recommendNextRegion(references: FusionCalibrationReference[], currentId: string) {
    const capturedCount = (region: GuidedRegion) =>
      Object.keys(references.find((reference) => reference.id === region.id)?.readings ?? {}).length;
    const unvisited = this.guidedRegions.find((region) => region.id !== currentId && capturedCount(region) === 0);
    if (unvisited) return unvisited.id;
    const incomplete = this.guidedRegions
      .filter((region) => region.id !== currentId && capturedCount(region) < this.radars.length)
      .sort((left, right) => capturedCount(left) - capturedCount(right))[0];
    return incomplete?.id ?? currentId;
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

  private removeReference(id: string) {
    this.references = this.references.filter((reference) => reference.id !== id);
    this.selectedRegionId = id;
    this.captureMessage = '';
  }

  private reset() {
    if (this.capturing) return;
    this.references = [];
    this.selectedRegionId = this.guidedRegions[0].id;
    this.captureCounts = {};
    this.captureMessage = '';
    this.detailsExpanded = false;
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

  private applySolutionsAndExitMobile() {
    this.applySolutions();
    this.mobileFocus = false;
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

  private solutionMeetsQuality(solution: RadarCalibrationSolution) {
    return (
      solution.pointCount >= 3 &&
      solution.referenceSpanCm >= MIN_REFERENCE_SPAN_CM &&
      solution.residualAfterCm <= ACCEPTABLE_RESIDUAL_CM &&
      solution.calibration.radar_x >= -50 &&
      solution.calibration.radar_x <= this.roomW + 50 &&
      solution.calibration.radar_y >= -50 &&
      solution.calibration.radar_y <= this.roomD + 50
    );
  }

  private qualityMessage(solution: RadarCalibrationSolution) {
    if (solution.pointCount < 3) {
      return this._t('fusioncal.quality_not_enough_points', { p0: solution.pointCount });
    }
    if (solution.referenceSpanCm < MIN_REFERENCE_SPAN_CM) {
      return this._t('fusioncal.quality_span_too_small', { p0: solution.referenceSpanCm });
    }
    if (solution.residualAfterCm > ACCEPTABLE_RESIDUAL_CM) {
      return this._t('fusioncal.quality_residual_too_high', {
        p0: solution.residualAfterCm,
        p1: ACCEPTABLE_RESIDUAL_CM,
      });
    }
    if (
      solution.calibration.radar_x < -50 ||
      solution.calibration.radar_x > this.roomW + 50 ||
      solution.calibration.radar_y < -50 ||
      solution.calibration.radar_y > this.roomD + 50
    ) {
      return this._t('fusioncal.quality_reference_outside_room');
    }
    return this._t('fusioncal.quality_reference_accepted', { p0: solution.residualAfterCm });
  }

  private formatParameter(value: number) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  private formatAdjustment(value: number) {
    const formatted = this.formatParameter(value);
    return value > 0 ? `+${formatted}` : formatted;
  }

  private solutionsReady(solutions: RadarCalibrationSolution[]) {
    return (
      this.references.length >= 3 &&
      this.referenceSpanCm >= MIN_REFERENCE_SPAN_CM &&
      solutions.length === this.radars.length &&
      solutions.every((solution) => this.solutionMeetsQuality(solution))
    );
  }

  protected render() {
    const solutions = this.solutions;
    const ready = this.solutionsReady(solutions);
    const selectedRegion = this.selectedRegion;
    const selectedReference = this.references.find((reference) => reference.id === selectedRegion.id);
    const selectedCaptured = Object.keys(selectedReference?.readings ?? {}).length;
    const calibratedRadars = solutions.filter((solution) => this.solutionMeetsQuality(solution)).length;
    const liveReadyRadars = this.radars.filter(
      (radar) => (this.captureCounts[radar.id] ?? 0) >= MIN_CAPTURE_SAMPLES,
    ).length;
    const reviewRadars =
      this.references.length >= 3
        ? this.radars.filter((radar) => {
            const solution = solutions.find((item) => item.radarId === radar.id);
            return !solution || !this.solutionMeetsQuality(solution);
          })
        : [];
    return html`
      <section
        class=${`calibration-shell ${this.mobileFocus ? 'mobile-focus' : ''}`}
        aria-busy=${this.capturing ? 'true' : 'false'}
      >
        <div class="mobile-mode-bar">
          <span>
            <strong>${this._t('fusioncal.mobile_calibration')}</strong>
            <small>${this._t('fusioncal.mobile_calibration_hint')}</small>
          </span>
          <button
            type="button"
            class="mobile-mode-toggle"
            aria-pressed=${this.mobileFocus ? 'true' : 'false'}
            @click=${this.toggleMobileFocus}
          >
            ${this.mobileFocus
              ? this._t('fusioncal.exit_mobile_calibration')
              : this._t('fusioncal.enter_mobile_calibration')}
          </button>
        </div>
        <div class="intro">
          <span class="eyebrow">${this._t('fusioncal.joint_direction_calibration')}</span>
          <strong>${this._t('fusioncal.calibrate_every_radar_from_shared_positions')}</strong>
          <p>${this._t('fusioncal.keep_only_one_test_person_in')}</p>
        </div>
        <div class="guide-card" role="status" aria-live="polite">
          <b>${selectedRegion.label}</b>
          <span>
            <strong>${this._t('fusioncal.move_to_region_p0', { p0: selectedRegion.label })}</strong>
            <small>
              ${this.capturing
                ? this._t('fusioncal.capturing_p0_percent_p1_p2_radars_ready', {
                    p0: Math.round(this.captureProgress * 100),
                    p1: liveReadyRadars,
                    p2: this.radars.length,
                  })
                : this._t('fusioncal.stand_near_center_then_hold_still', {
                    p0: selectedRegion.room.x,
                    p1: selectedRegion.room.y,
                    p2: selectedCaptured,
                    p3: this.radars.length,
                  })}
            </small>
          </span>
        </div>
        <canvas
          id="fusion-calibration-canvas"
          aria-label=${this._t('fusioncal.guided_capture_floor_plan')}
          @click=${this.onCanvasClick}
        ></canvas>
        <div class=${`capture-dock ${ready ? 'ready' : ''} ${this.capturing ? 'capturing' : ''}`}>
          <div class="capture-bar">
            <span>${this._t('fusioncal.tap_another_region_or_follow_recommendation')}</span>
            <button class="capture-action" type="button" ?disabled=${this.capturing} @click=${this.beginCapture}>
              ${this.capturing
                ? this._t('fusioncal.capturing_p0_percent', { p0: Math.round(this.captureProgress * 100) })
                : this._t('fusioncal.i_am_ready_capture_all')}
            </button>
            <button class="mobile-apply" type="button" @click=${this.applySolutionsAndExitMobile}>
              ${this._t('fusioncal.apply_all_calibrations')}
            </button>
          </div>
          ${this.capturing
            ? html`<div class="progress"><i style=${`width:${Math.round(this.captureProgress * 100)}%`}></i></div>`
            : nothing}
        </div>
        <div class=${`radar-sample-status ${this.capturing ? 'capturing' : ''}`}>
          ${this.radars.map((radar) => {
            const liveSamples = this.captureCounts[radar.id] ?? 0;
            const pointCount = this.references.filter((reference) => reference.readings[radar.id]).length;
            return html`
              <span class=${this.capturing && liveSamples >= MIN_CAPTURE_SAMPLES ? 'live-ready' : ''}>
                <i style=${`background:${COLORS[this.radars.indexOf(radar) % COLORS.length]}`}></i>
                ${radar.id} ·
                ${this.capturing
                  ? this._t('fusioncal.p0_p1_samples', {
                      p0: Math.min(liveSamples, MIN_CAPTURE_SAMPLES),
                      p1: MIN_CAPTURE_SAMPLES,
                    })
                  : this._t('fusioncal.p0_reference_points', { p0: pointCount })}
              </span>
            `;
          })}
        </div>
        ${this.captureMessage
          ? html`<div class="message" role="status" aria-live="polite">${this.captureMessage}</div>`
          : nothing}
        <button
          type="button"
          class="details-toggle"
          aria-expanded=${this.detailsExpanded ? 'true' : 'false'}
          @click=${this.toggleDetails}
        >
          <span>
            <strong>
              ${this._t('fusioncal.p0_p1_regions_captured', {
                p0: this.references.length,
                p1: this.guidedRegions.length,
              })}
            </strong>
            <small>
              ${this._t('fusioncal.p0_p1_radars_ready_short', {
                p0: calibratedRadars,
                p1: this.radars.length,
              })}
            </small>
          </span>
          <b>
            ${this.detailsExpanded
              ? this._t('fusioncal.hide_capture_details')
              : this._t('fusioncal.show_capture_details')}
          </b>
        </button>
        <div class=${`calibration-details ${this.detailsExpanded ? 'expanded' : ''}`}>
          <div class="reference-list">
            ${this.references.map((reference) => {
              const region = this.guidedRegions.find((item) => item.id === reference.id);
              const count = Object.keys(reference.readings).length;
              return html`
                <div class="reference">
                  <b class=${count === this.radars.length ? 'complete' : ''}>${region?.label ?? '?'}</b>
                  <span>X ${reference.room.x} · Y ${reference.room.y} cm</span>
                  <small>${count}/${this.radars.length} ${this._t('fusioncal.radars')}</small>
                  <button type="button" @click=${() => this.removeReference(reference.id)}>×</button>
                </div>
              `;
            })}
          </div>
          ${reviewRadars.length
            ? html`
                <div class="installation-review">
                  <strong>${this._t('fusioncal.review_installation_parameters')}</strong>
                  <span>
                    ${this._t('fusioncal.review_p0_radars_before_retrying', {
                      p0: reviewRadars.map((radar) => radar.id).join(', '),
                    })}
                  </span>
                  <small>${this._t('fusioncal.xy_yaw_only_manual_note')}</small>
                </div>
              `
            : nothing}
          ${solutions.length
            ? html`
                <div class="results">
                  ${this.radars.map((radar) => {
                    const solution = solutions.find((item) => item.radarId === radar.id);
                    const current = completeCalibration(radar);
                    const accepted = Boolean(solution && this.solutionMeetsQuality(solution));
                    const adjustment = solution
                      ? calculateCalibrationAdjustment(current, solution.calibration)
                      : undefined;
                    return html`
                      <div class="result ${accepted ? '' : 'bad'}">
                        <header>
                          <span><strong>${radar.id}</strong><small>${radar.radar_model}</small></span>
                          <b class="status ${accepted ? 'accepted' : 'review'}">
                            ${accepted
                              ? this._t('fusioncal.calibration_reference_accepted')
                              : this._t('fusioncal.installation_needs_review')}
                          </b>
                        </header>
                        ${solution
                          ? html`
                              <div class="residual">
                                <strong>${solution.residualBeforeCm} → ${solution.residualAfterCm} cm</strong>
                                <small class=${accepted ? '' : 'warning'}>${this.qualityMessage(solution)}</small>
                              </div>
                              <div class="parameter-grid">
                                <div>
                                  <small>${this._t('fusioncal.current_installation')}</small>
                                  <span>
                                    X ${this.formatParameter(current.radar_x)} · Y
                                    ${this.formatParameter(current.radar_y)} · yaw ${this.formatParameter(current.yaw)}°
                                  </span>
                                </div>
                                <div>
                                  <small>${this._t('fusioncal.fitted_reference')}</small>
                                  <span>
                                    X ${this.formatParameter(solution.calibration.radar_x)} · Y
                                    ${this.formatParameter(solution.calibration.radar_y)} · yaw
                                    ${this.formatParameter(solution.calibration.yaw)}°
                                  </span>
                                </div>
                                <div class="adjustment">
                                  <small>${this._t('fusioncal.suggested_manual_adjustment')}</small>
                                  <span>
                                    ΔX ${this.formatAdjustment(adjustment?.radarX ?? 0)} · ΔY
                                    ${this.formatAdjustment(adjustment?.radarY ?? 0)} · Δyaw
                                    ${this.formatAdjustment(adjustment?.yaw ?? 0)}°
                                  </span>
                                </div>
                              </div>
                              <small class="solution-meta">
                                ${solution.pointCount} ${this._t('fusioncal.points')} · yaw ${solution.calibration.yaw}°
                                · ${this._t('fusioncal.span_p0_cm', { p0: solution.referenceSpanCm })} · max
                                ${solution.maxResidualCm} cm
                              </small>
                            `
                          : html`<span class="missing">${this._t('fusioncal.not_enough_references')}</span>`}
                      </div>
                    `;
                  })}
                </div>
              `
            : nothing}
        </div>
        <div class="calibration-progress">
          ${this._t('fusioncal.p0_p1_radars_ready', { p0: calibratedRadars, p1: this.radars.length })}
        </div>
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
    .mobile-mode-bar,
    .details-toggle,
    .mobile-apply {
      display: none;
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
    .guide-card {
      display: flex;
      align-items: center;
      gap: 9px;
      margin: 0 11px 9px;
      padding: 9px 10px;
      border: 1px solid color-mix(in srgb, #0284c7 38%, var(--divider-color, transparent));
      border-radius: 10px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, #0284c7 8%, transparent);
    }
    .guide-card > b {
      width: 30px;
      height: 30px;
      display: grid;
      flex: 0 0 30px;
      place-items: center;
      border-radius: 50%;
      color: #fff;
      background: #0284c7;
      font-size: 14px;
    }
    .guide-card span {
      display: grid;
      gap: 2px;
      min-width: 0;
    }
    .guide-card strong {
      font-size: 11px;
    }
    .guide-card small {
      color: var(--secondary-text-color);
      font-size: 9px;
      line-height: 1.45;
    }
    canvas {
      display: block;
      max-width: 100%;
      width: 100%;
      cursor: pointer;
      touch-action: manipulation;
    }
    .capture-dock {
      background: var(--card-background-color, #fff);
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
    .radar-sample-status {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      padding: 8px 11px 0;
    }
    .radar-sample-status span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 7px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.04);
      font-size: 9px;
    }
    .radar-sample-status span.live-ready {
      border-color: color-mix(in srgb, var(--primary-color, #0b825c) 48%, transparent);
      color: var(--primary-color, #0b825c);
      background: color-mix(in srgb, var(--primary-color, #0b825c) 8%, transparent);
    }
    .radar-sample-status i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
    .message {
      padding: 7px 11px;
      color: var(--primary-color, #0b825c);
      background: color-mix(in srgb, var(--primary-color, #0b825c) 7%, transparent);
      font-size: 10px;
    }
    .calibration-details {
      min-width: 0;
    }
    .reference-list,
    .results {
      display: grid;
      gap: 5px;
      padding: 8px 11px;
    }
    .installation-review {
      display: grid;
      gap: 4px;
      margin: 8px 11px 0;
      padding: 9px 10px;
      border: 1px solid color-mix(in srgb, var(--warning-color, #f59e0b) 45%, transparent);
      border-radius: 9px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--warning-color, #f59e0b) 9%, transparent);
      font-size: 10px;
      line-height: 1.45;
    }
    .installation-review strong {
      color: var(--warning-color, #b45309);
      font-size: 11px;
    }
    .installation-review small {
      color: var(--secondary-text-color);
      font-size: 9px;
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
      background: #64748b;
    }
    .reference b.complete {
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
      gap: 7px;
      min-width: 0;
      padding: 9px;
      border-radius: 8px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-color, #0b825c) 7%, transparent);
      font-size: 10px;
    }
    .result.bad {
      background: color-mix(in srgb, var(--error-color, #e53935) 7%, transparent);
    }
    .result header,
    .result header > span {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .result header {
      justify-content: space-between;
    }
    .result header > span small,
    .solution-meta {
      color: var(--secondary-text-color);
    }
    .status {
      flex: 0 0 auto;
      padding: 3px 6px;
      border-radius: 999px;
      font-size: 8px;
    }
    .status.accepted {
      color: var(--primary-color, #0b825c);
      background: color-mix(in srgb, var(--primary-color, #0b825c) 12%, transparent);
    }
    .status.review {
      color: var(--error-color, #c62828);
      background: color-mix(in srgb, var(--error-color, #e53935) 12%, transparent);
    }
    .residual {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
    }
    .residual small {
      color: var(--secondary-text-color);
      text-align: right;
    }
    .residual small.warning {
      color: var(--error-color, #c62828);
    }
    .parameter-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 5px;
      min-width: 0;
    }
    .parameter-grid > div {
      display: grid;
      gap: 3px;
      min-width: 0;
      padding: 6px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.14));
      border-radius: 7px;
      background: color-mix(in srgb, var(--card-background-color, #fff) 72%, transparent);
    }
    .parameter-grid small {
      color: var(--secondary-text-color);
      font-size: 8px;
    }
    .parameter-grid span {
      overflow-wrap: anywhere;
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      line-height: 1.45;
    }
    .parameter-grid .adjustment {
      border-color: color-mix(in srgb, var(--primary-color, #0b825c) 24%, transparent);
    }
    .solution-meta {
      font-size: 8px;
    }
    .missing {
      color: var(--error-color, #c62828);
    }
    .calibration-progress {
      padding: 5px 11px 0;
      color: var(--secondary-text-color);
      font-size: 9px;
      text-align: right;
    }
    .actions {
      justify-content: flex-end;
    }
    .actions .secondary {
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.08);
    }
    @media (max-width: 600px) {
      .calibration-shell {
        border-radius: 10px;
      }
      .mobile-mode-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 10px 11px;
        border-bottom: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
        color: var(--primary-text-color);
        background: color-mix(in srgb, var(--primary-color, #0b825c) 7%, var(--card-background-color, #fff));
      }
      .mobile-mode-bar > span {
        display: grid;
        gap: 2px;
        min-width: 0;
      }
      .mobile-mode-bar strong {
        font-size: 12px;
      }
      .mobile-mode-bar small {
        color: var(--secondary-text-color);
        font-size: 9px;
        line-height: 1.35;
      }
      .mobile-mode-toggle {
        flex: 0 0 auto;
        min-height: 44px;
      }
      .capture-bar,
      .actions {
        align-items: stretch;
        flex-direction: column;
      }
      .capture-bar button,
      .actions button {
        width: 100%;
      }
      .parameter-grid {
        grid-template-columns: 1fr;
      }
      .residual {
        align-items: flex-start;
        flex-direction: column;
      }
      .residual small {
        text-align: left;
      }
      button {
        min-height: 44px;
      }
      .details-toggle {
        display: flex;
        width: calc(100% - 22px);
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin: 9px 11px 0;
        padding: 9px 10px;
        border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
        color: var(--primary-text-color);
        background: rgba(128, 128, 128, 0.05);
        text-align: left;
      }
      .details-toggle > span {
        display: grid;
        gap: 2px;
      }
      .details-toggle small {
        color: var(--secondary-text-color);
        font-size: 9px;
      }
      .details-toggle > b {
        flex: 0 0 auto;
        color: var(--primary-color, #0b825c);
        font-size: 9px;
      }
      .calibration-details:not(.expanded) {
        display: none;
      }
      .reference {
        grid-template-columns: 24px minmax(0, 1fr) auto 44px;
      }
      .reference button {
        width: 44px;
        height: 44px;
      }
      .mobile-focus {
        position: fixed;
        z-index: 10000;
        inset: 0;
        box-sizing: border-box;
        width: 100vw;
        height: 100dvh;
        padding-bottom: calc(94px + env(safe-area-inset-bottom));
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: contain;
        border: 0;
        border-radius: 0;
      }
      .mobile-focus .mobile-mode-bar {
        position: sticky;
        z-index: 12;
        top: 0;
        min-height: 52px;
        box-sizing: border-box;
        padding-top: calc(8px + env(safe-area-inset-top));
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
      }
      .mobile-focus .mobile-mode-bar small {
        display: none;
      }
      .mobile-focus .intro {
        display: none;
      }
      .mobile-focus .guide-card {
        position: sticky;
        z-index: 11;
        top: calc(52px + env(safe-area-inset-top));
        margin: 0;
        padding: 10px 12px;
        border-right: 0;
        border-left: 0;
        border-radius: 0;
        background: color-mix(in srgb, #0284c7 11%, var(--card-background-color, #fff));
        box-shadow: 0 5px 13px rgba(15, 23, 42, 0.07);
      }
      .mobile-focus .guide-card > b {
        width: 36px;
        height: 36px;
        flex-basis: 36px;
      }
      .mobile-focus .guide-card strong {
        font-size: 13px;
      }
      .mobile-focus .guide-card small {
        font-size: 10px;
      }
      .mobile-focus .capture-dock {
        position: fixed;
        z-index: 10020;
        right: 8px;
        bottom: calc(8px + env(safe-area-inset-bottom));
        left: 8px;
        overflow: hidden;
        border: 1px solid color-mix(in srgb, var(--primary-color, #0b825c) 22%, var(--divider-color, transparent));
        border-radius: 16px;
        box-shadow: 0 12px 32px rgba(15, 23, 42, 0.24);
      }
      .mobile-focus .capture-bar {
        padding: 8px;
        border-top: 0;
      }
      .mobile-focus .capture-bar > span {
        display: none;
      }
      .mobile-focus .capture-bar button {
        min-height: 54px;
        border-radius: 11px;
        font-size: 14px;
      }
      .mobile-focus .radar-sample-status:not(.capturing) {
        display: none;
      }
      .mobile-focus .capture-dock.ready:not(.capturing) .capture-action {
        display: none;
      }
      .mobile-focus .capture-dock.ready:not(.capturing) .mobile-apply {
        display: block;
      }
      .mobile-focus .calibration-progress,
      .mobile-focus .actions {
        margin-right: 8px;
        margin-left: 8px;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'mmwave-fusion-calibration': FusionCalibrationPanel;
  }
}
