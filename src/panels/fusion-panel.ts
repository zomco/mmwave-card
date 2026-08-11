import { LitElement, css, html, PropertyValues } from 'lit';
import { localize } from '../localize/localize';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { RadarModelAdapter } from '../models';
import type {
  CalibrationConfig,
  FusionEvent,
  FusionHeatmap,
  FusionHistoryPoint,
  FusionTarget,
  FusionZoneConfig,
  RadarSourceConfig,
} from '../types';
import {
  drawBase,
  drawHeatmap,
  drawRadarFov,
  drawTarget,
  heatmapLegendColors,
  roomToCanvas,
  setupCanvas,
  type CanvasMetrics,
} from '../utils/canvas';
import { FUSION_TRAIL_MAX_MS } from '../const';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

export interface FusionRadarVisual {
  config: RadarSourceConfig;
  adapter: RadarModelAdapter;
  calibration: CalibrationConfig;
  available: boolean;
  observations?: number;
  inRoomRatio?: number;
  calibrationWarning?: boolean;
}

const PALETTE = ['#ff9800', '#03a9f4', '#e91e63', '#8bc34a', '#9c27b0', '#00bcd4'];

function colorForId(id: string): string {
  let hash = 0;
  for (const character of id) hash = (hash * 31 + character.charCodeAt(0)) | 0;
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

@customElement('mmwave-fusion-panel')
export class FusionPanel extends LitElement {
  @property({ type: Number }) roomW = 400;
  @property({ type: Number }) roomD = 600;
  @property({ attribute: false }) radars: FusionRadarVisual[] = [];
  @property({ attribute: false }) targets: FusionTarget[] = [];
  @property({ attribute: false }) zones: FusionZoneConfig[] = [];
  @property({ attribute: false }) events: FusionEvent[] = [];
  @property({ attribute: false }) historyTrack: FusionHistoryPoint[] = [];
  @property({ attribute: false }) selectedEventId = '';
  @property({ attribute: false }) lang = 'en';
  @property({ attribute: false }) backendState:
    | 'connecting'
    | 'online'
    | 'fallback'
    | 'missing'
    | 'outdated'
    | 'error' = 'connecting';
  @property({ attribute: false }) heatmap?: FusionHeatmap;
  @property({ type: Boolean }) heatmapLoading = false;
  /** '' when fine, 'unsupported' when the backend predates the command. */
  @property({ attribute: false }) heatmapError: '' | 'unsupported' | 'failed' = '';
  @state() private showCoverage = false;
  @state() private showHeatmap = false;
  @state() private heatmapHours = 24;

  @query('#fusion-cv') private canvas?: HTMLCanvasElement;
  private trails = new Map<string, TrailPoint[]>();
  private animationFrame = 0;

  connectedCallback() {
    super.connectedCallback();
    this.loop();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    cancelAnimationFrame(this.animationFrame);
  }

  protected willUpdate(changed: PropertyValues) {
    if (!changed.has('targets')) return;
    const now = Date.now();
    for (const target of this.targets) {
      const trail = this.trails.get(target.track_id) ?? [];
      const previous = trail.at(-1);
      if (!previous || Math.hypot(previous.x - target.x, previous.y - target.y) >= 0.5) {
        trail.push({ x: target.x, y: target.y, timestamp: now });
      }
      this.trails.set(
        target.track_id,
        trail.filter((point) => point.timestamp >= now - FUSION_TRAIL_MAX_MS),
      );
    }
    const active = new Set(this.targets.map((target) => target.track_id));
    for (const trackId of this.trails.keys()) {
      const trail = this.trails.get(trackId) ?? [];
      if (!active.has(trackId) && (trail.at(-1)?.timestamp ?? 0) < now - FUSION_TRAIL_MAX_MS) {
        this.trails.delete(trackId);
      }
    }
  }

  private metrics(): CanvasMetrics {
    const width = this.canvas?.offsetWidth || 500;
    const height = Math.max(220, Math.min(520, Math.round((width * this.roomD) / this.roomW)));
    return { W: width, H: height, roomW: this.roomW, roomD: this.roomD };
  }

  private loop() {
    const canvas = this.canvas;
    if (canvas && canvas.offsetWidth > 0) {
      const metrics = this.metrics();
      const context = setupCanvas(canvas, metrics.H);
      const now = Date.now();
      drawBase(context, metrics);
      if (this.showHeatmap && this.heatmap) {
        drawHeatmap(context, this.heatmap.cells, this.heatmap.bin_cm, this.heatmap.max_visits, metrics);
      }
      this.drawZones(context, metrics);
      this.drawRadars(context, metrics);
      this.drawTrails(context, metrics, now);
      this.drawHistory(context, metrics);
      this.drawTargets(context, metrics);
    }
    this.animationFrame = requestAnimationFrame(() => this.loop());
  }

  private drawZones(context: CanvasRenderingContext2D, metrics: CanvasMetrics) {
    this.zones.forEach((zone, index) => {
      if (zone.polygon.length < 3) return;
      const color = PALETTE[(index + 3) % PALETTE.length];
      const points = zone.polygon.map((point) => roomToCanvas(point.x, point.y, metrics));
      context.beginPath();
      points.forEach((point, pointIndex) =>
        pointIndex === 0 ? context.moveTo(point.cx, point.cy) : context.lineTo(point.cx, point.cy),
      );
      context.closePath();
      context.globalAlpha = 0.08;
      context.fillStyle = color;
      context.fill();
      context.globalAlpha = 0.6;
      context.strokeStyle = color;
      context.lineWidth = 1.5;
      context.setLineDash([5, 4]);
      context.stroke();
      context.setLineDash([]);
      context.globalAlpha = 1;
      context.fillStyle = color;
      context.font = 'bold 10px system-ui';
      context.textAlign = 'left';
      context.fillText(zone.name || zone.id, points[0].cx + 5, points[0].cy + 13);
    });
  }

  private drawRadars(context: CanvasRenderingContext2D, metrics: CanvasMetrics) {
    for (const radar of this.radars) {
      const point = roomToCanvas(radar.calibration.radar_x, radar.calibration.radar_y, metrics);
      const color = radar.calibrationWarning ? '#ff9800' : radar.available ? '#0b825c' : '#9ca3af';
      if (this.showCoverage) {
        context.save();
        context.globalAlpha = radar.available ? 0.14 : 0.06;
        drawRadarFov(
          context,
          point.cx,
          point.cy,
          radar.calibration.yaw,
          radar.calibration.pitch,
          radar.adapter.info.fovDegrees,
          radar.adapter.info.minRangeM,
          radar.adapter.info.maxRangeM,
          metrics,
          radar.adapter.info.vitalRangeM,
        );
        context.restore();
      }
      const heading = Math.PI / 2 - radar.calibration.yaw * (Math.PI / 180);
      context.save();
      context.strokeStyle = color;
      context.fillStyle = color;
      context.lineWidth = 1.5;
      context.globalAlpha = radar.available ? 0.9 : 0.4;
      context.beginPath();
      context.arc(point.cx, point.cy, 4, 0, Math.PI * 2);
      context.fill();
      context.beginPath();
      context.moveTo(point.cx, point.cy);
      context.lineTo(point.cx + Math.cos(heading) * 18, point.cy + Math.sin(heading) * 18);
      context.stroke();
      context.restore();
      context.fillStyle = color;
      context.font = 'bold 9px system-ui';
      context.textAlign = 'center';
      context.fillText(radar.config.id, point.cx, point.cy - 14);
    }
  }

  private drawTrails(context: CanvasRenderingContext2D, metrics: CanvasMetrics, now: number) {
    for (const [trackId, trail] of this.trails) {
      if (trail.length < 2) continue;
      context.save();
      context.strokeStyle = colorForId(trackId);
      context.lineWidth = 2.2;
      context.lineCap = 'round';
      for (let index = 1; index < trail.length; index++) {
        const from = roomToCanvas(trail[index - 1].x, trail[index - 1].y, metrics);
        const to = roomToCanvas(trail[index].x, trail[index].y, metrics);
        context.globalAlpha = Math.max(0.05, 0.65 - ((now - trail[index].timestamp) / FUSION_TRAIL_MAX_MS) * 0.65);
        context.beginPath();
        context.moveTo(from.cx, from.cy);
        context.lineTo(to.cx, to.cy);
        context.stroke();
      }
      context.restore();
    }
  }

  private drawTargets(context: CanvasRenderingContext2D, metrics: CanvasMetrics) {
    for (const target of this.targets) {
      const point = roomToCanvas(target.x, target.y, metrics);
      const color = colorForId(target.track_id);
      drawTarget(context, point.cx, point.cy, true, color);
      context.fillStyle = color;
      context.font = 'bold 9px ui-monospace, monospace';
      context.textAlign = 'center';
      context.fillText(target.track_id.slice(0, 6), point.cx, point.cy - 14);
    }
  }

  private drawHistory(context: CanvasRenderingContext2D, metrics: CanvasMetrics) {
    if (this.historyTrack.length < 2) return;
    context.save();
    context.strokeStyle = '#ffffff';
    context.lineWidth = 2.5;
    context.globalAlpha = 0.75;
    context.setLineDash([6, 4]);
    context.beginPath();
    this.historyTrack.forEach((point, index) => {
      const canvasPoint = roomToCanvas(point.x, point.y, metrics);
      if (index === 0) context.moveTo(canvasPoint.cx, canvasPoint.cy);
      else context.lineTo(canvasPoint.cx, canvasPoint.cy);
    });
    context.stroke();
    context.restore();
  }

  private selectEvent(event: FusionEvent) {
    this.dispatchEvent(
      new CustomEvent('fusion-event-selected', {
        detail: event,
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Cell size for the requested grid.
   *
   * Derived from the room rather than exposed as another control: about forty
   * cells across the longer wall reads as a heatmap in a bedroom and in a
   * warehouse alike, and a person is roughly one cell wide either way. Clamped
   * to the range the backend accepts.
   */
  private binCm(): number {
    const target = Math.max(this.roomW, this.roomD) / 40;
    return Math.min(200, Math.max(5, Math.round(target / 5) * 5));
  }

  private requestHeatmap() {
    this.dispatchEvent(
      new CustomEvent('fusion-heatmap-requested', {
        detail: { hours: this.heatmapHours, binCm: this.binCm() },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private toggleHeatmap() {
    this.showHeatmap = !this.showHeatmap;
    // Only fetch on the way in, and only once per window: this is a scan over
    // stored points, not something to re-run on every frame or every re-render.
    if (this.showHeatmap && !this.heatmap) this.requestHeatmap();
  }

  private setHeatmapHours(hours: number) {
    if (hours === this.heatmapHours) return;
    this.heatmapHours = hours;
    this.requestHeatmap();
  }

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

  private qualityReason(reason?: string): string {
    // The reason codes come from the backend's quality engine; their labels
    // live in the language files so a translator can reach them and so adding
    // a reason does not mean editing this panel.
    return reason ? this._t(`fusion_reason.${reason}`) : this._t('fusion.filtered');
  }

  private eventStatus(event: FusionEvent): string {
    if (event.clip_path) return '▶';
    if (event.clip_status === 'failed') return this._t('fusion.clip_failed');
    if (event.clip_status === 'waiting' || event.clip_status === 'extracting') {
      return this._t('fusion.recording');
    }
    if (event.recording_decision === 'rejected_quality' || event.event_type === 'trajectory') {
      return this.qualityReason(event.quality_reason);
    }
    if (event.event_type === 'traverse') return this._t('fusion.key_track');
    return '';
  }

  private renderHeatmapLegend() {
    const windows: [number, string][] = [
      [1, this._t('fusion.window_hour')],
      [24, this._t('fusion.window_day')],
      [168, this._t('fusion.window_week')],
    ];
    return html`
      <div class="heatmap-bar">
        <div class="windows">
          ${windows.map(
            ([hours, label]) => html`
              <button
                type="button"
                class=${this.heatmapHours === hours ? 'selected' : ''}
                ?disabled=${this.heatmapLoading}
                @click=${() => this.setHeatmapHours(hours)}
              >
                ${label}
              </button>
            `,
          )}
        </div>
        ${this.heatmapError === 'unsupported'
          ? html`<span class="heatmap-note">${this._t('fusion.heatmap_needs_newer_backend')}</span>`
          : this.heatmapError === 'failed'
            ? html`<span class="heatmap-note">${this._t('fusion.heatmap_failed')}</span>`
            : this.heatmapLoading
              ? html`<span class="heatmap-note">${this._t('fusion.heatmap_loading')}</span>`
              : this.heatmap
                ? html`
                    <span class="ramp">
                      <small>${this._t('fusion.heatmap_rare')}</small>
                      ${heatmapLegendColors().map((color) => html`<i style="background:${color}"></i>`)}
                      <small>${this._t('fusion.heatmap_frequent')}</small>
                    </span>
                    <span class="heatmap-note">
                      ${this._t('fusion.heatmap_summary', {
                        points: this.heatmap.total_points.toLocaleString(),
                        bin: this.heatmap.bin_cm,
                      })}
                      ${this.heatmap.truncated ? ` · ${this._t('fusion.heatmap_truncated')}` : ''}
                    </span>
                  `
                : ''}
      </div>
    `;
  }

  protected render() {
    const onlineRadars = this.radars.filter((radar) => radar.available).length;
    const calibrationWarnings = this.radars.filter((radar) => radar.calibrationWarning);
    const scoredEvents = this.events.filter(
      (event) => event.event_type === 'trajectory' || event.event_type === 'traverse',
    );
    const recentEvents = scoredEvents.length ? scoredEvents : this.events;
    return html`
      <div class="scene">
        <canvas id="fusion-cv"></canvas>
        <div class="overlay">
          <span class="status ${this.backendState}">
            <i></i>
            ${this.backendState === 'online'
              ? this._t('fusion.backend_fusion')
              : this.backendState === 'missing'
                ? this._t('fusion.integration_missing')
                : this.backendState === 'outdated'
                  ? this._t('fusion.integration_outdated')
                  : this.backendState === 'fallback'
                    ? this._t('fusion.local_fallback')
                    : this.backendState === 'error'
                      ? this._t('fusion.backend_error')
                      : this._t('fusion.connecting')}
          </span>
          <span class="overlay-actions">
            <button
              type="button"
              class="coverage-toggle ${this.showHeatmap ? 'active' : ''}"
              @click=${this.toggleHeatmap}
            >
              ${this.showHeatmap ? this._t('fusion.hide_heatmap') : this._t('fusion.show_heatmap')}
            </button>
            <button type="button" class="coverage-toggle" @click=${() => (this.showCoverage = !this.showCoverage)}>
              ${this.showCoverage ? this._t('fusion.hide_coverage') : this._t('fusion.show_coverage')}
            </button>
            <span class="radar-count">${onlineRadars}/${this.radars.length} ${this._t('fusion.radars_online')}</span>
          </span>
        </div>
      </div>
      ${this.showHeatmap ? this.renderHeatmapLegend() : ''}
      ${calibrationWarnings.length
        ? html`<div class="calibration-warning">
            ${this._t('fusion.calibration_warning')}:
            ${calibrationWarnings
              .map((radar) => {
                const ratio = radar.inRoomRatio == null ? '?' : `${Math.round(radar.inRoomRatio * 100)}%`;
                return `${radar.config.id} (${ratio})`;
              })
              .join(', ')}
          </div>`
        : ''}
      <div class="summary">
        <div><strong>${this.targets.length}</strong><span>${this._t('fusion.fused_targets')}</span></div>
        ${this.targets.map(
          (target) => html`
            <div class="track" style="--track-color:${colorForId(target.track_id)}">
              <i></i>
              <span>${target.track_id.slice(0, 6)}</span>
              <small>X ${Math.round(target.x)} · Y ${Math.round(target.y)} cm</small>
              <em>${Math.round(target.confidence * 100)}%</em>
            </div>
          `,
        )}
      </div>
      ${recentEvents.length
        ? html`
            <div class="events">
              <strong>${this._t('fusion.recent_events')}</strong>
              ${recentEvents.slice(0, 8).map(
                (event) => html`
                  <button
                    type="button"
                    class=${event.event_id === this.selectedEventId ? 'selected' : ''}
                    @click=${() => this.selectEvent(event)}
                  >
                    <span>
                      ${event.event_type.toUpperCase()} · ${event.zone_id}
                      ${event.quality_score == null ? '' : ` · ${event.quality_score}/100`}
                    </span>
                    <small>${new Date(event.timestamp * 1000).toLocaleString()}</small>
                    <em class=${event.clip_status === 'failed' ? 'failed' : ''}>${this.eventStatus(event)}</em>
                  </button>
                `,
              )}
            </div>
          `
        : ''}
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .scene {
      position: relative;
      overflow: hidden;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: rgba(128, 128, 128, 0.035);
    }
    canvas {
      display: block;
      width: 100%;
    }
    .overlay {
      position: absolute;
      inset: 8px 8px auto;
      display: flex;
      justify-content: space-between;
      gap: 8px;
      pointer-events: none;
    }
    .overlay-actions {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .coverage-toggle {
      pointer-events: auto;
      padding: 4px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--card-background-color, #fff) 88%, transparent);
      font: inherit;
      font-size: 9px;
      cursor: pointer;
      backdrop-filter: blur(6px);
    }
    .coverage-toggle.active {
      border-color: #0b825c;
      color: #0b825c;
      background: color-mix(in srgb, #0b825c 12%, var(--card-background-color, #fff));
    }
    .heatmap-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
    .windows {
      display: inline-flex;
      overflow: hidden;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
    }
    .windows button {
      padding: 3px 10px;
      border: none;
      color: var(--secondary-text-color);
      background: transparent;
      font: inherit;
      font-size: 9px;
      cursor: pointer;
    }
    .windows button + button {
      border-left: 1px solid var(--divider-color);
    }
    .windows button.selected {
      color: #fff;
      background: #0b825c;
    }
    .windows button[disabled] {
      cursor: progress;
      opacity: 0.5;
    }
    .ramp {
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    .ramp i {
      width: 14px;
      height: 8px;
      border-radius: 2px;
    }
    .ramp small,
    .heatmap-note {
      color: var(--secondary-text-color);
      font-size: 9px;
    }
    .status,
    .radar-count {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--card-background-color, #fff) 88%, transparent);
      font-size: 9px;
      backdrop-filter: blur(6px);
    }
    .status i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #9ca3af;
    }
    .status.online {
      color: #0b825c;
    }
    .status.online i {
      background: #0b825c;
      box-shadow: 0 0 0 3px rgba(11, 130, 92, 0.14);
    }
    .status.fallback {
      color: var(--warning-color, #ff9800);
    }
    .status.fallback i {
      background: var(--warning-color, #ff9800);
    }
    .status.error {
      color: var(--error-color, #e53935);
    }
    .status.error i {
      background: var(--error-color, #e53935);
    }
    .summary {
      display: grid;
      gap: 6px;
      margin-top: 8px;
    }
    .calibration-warning {
      margin-top: 8px;
      padding: 7px 9px;
      border: 1px solid color-mix(in srgb, var(--warning-color, #ff9800) 45%, transparent);
      border-radius: 8px;
      color: var(--warning-color, #ff9800);
      background: color-mix(in srgb, var(--warning-color, #ff9800) 8%, transparent);
      font-size: 9px;
    }
    .summary > div:first-child {
      display: flex;
      align-items: baseline;
      gap: 6px;
      color: var(--secondary-text-color);
      font-size: 10px;
    }
    .summary > div:first-child strong {
      color: var(--primary-text-color);
      font-size: 18px;
    }
    .track {
      display: grid;
      grid-template-columns: auto auto 1fr auto;
      align-items: center;
      gap: 7px;
      padding: 7px 9px;
      border-radius: 9px;
      background: color-mix(in srgb, var(--track-color) 7%, transparent);
      color: var(--primary-text-color);
      font:
        10px ui-monospace,
        monospace;
    }
    .track i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--track-color);
    }
    .track small {
      overflow: hidden;
      color: var(--secondary-text-color);
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .track em {
      color: var(--track-color);
      font-style: normal;
      font-weight: 700;
    }
    .events {
      display: grid;
      gap: 5px;
      margin-top: 12px;
    }
    .events > strong {
      color: var(--primary-text-color);
      font-size: 10px;
    }
    .events button {
      display: grid;
      grid-template-columns: 1fr auto auto;
      align-items: center;
      gap: 8px;
      padding: 7px 9px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      color: var(--primary-text-color);
      background: rgba(128, 128, 128, 0.035);
      font-size: 9px;
      text-align: left;
      cursor: pointer;
    }
    .events button.selected {
      border-color: #0b825c;
      background: rgba(11, 130, 92, 0.08);
    }
    .events small {
      color: var(--secondary-text-color);
    }
    .events em {
      color: #0b825c;
      font-style: normal;
    }
    .events em.failed {
      color: var(--error-color, #e53935);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'mmwave-fusion-panel': FusionPanel;
  }
}
