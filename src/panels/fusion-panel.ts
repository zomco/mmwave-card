import { LitElement, css, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { RadarModelAdapter } from '../models';
import type {
  CalibrationConfig,
  FusionEvent,
  FusionHistoryPoint,
  FusionTarget,
  FusionZoneConfig,
  RadarSourceConfig,
} from '../types';
import { drawBase, drawRadarFov, drawTarget, roomToCanvas, setupCanvas, type CanvasMetrics } from '../utils/canvas';
import { TRAIL_MAX_MS } from '../const';

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
  @property({ attribute: false }) backendState: 'connecting' | 'online' | 'fallback' | 'error' = 'connecting';

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
        trail.filter((point) => point.timestamp >= now - TRAIL_MAX_MS),
      );
    }
    const active = new Set(this.targets.map((target) => target.track_id));
    for (const trackId of this.trails.keys()) {
      const trail = this.trails.get(trackId) ?? [];
      if (!active.has(trackId) && (trail.at(-1)?.timestamp ?? 0) < now - TRAIL_MAX_MS) this.trails.delete(trackId);
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
      context.save();
      context.globalAlpha = radar.available ? 0.45 : 0.12;
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
      context.fillStyle = radar.available ? 'var(--primary-text-color, #fff)' : 'var(--error-color, #e53935)';
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
        context.globalAlpha = Math.max(0.05, 0.65 - ((now - trail[index].timestamp) / TRAIL_MAX_MS) * 0.65);
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

  private ui(zh: string, en: string) {
    return this.lang.toLowerCase().startsWith('zh') ? zh : en;
  }

  protected render() {
    const onlineRadars = this.radars.filter((radar) => radar.available).length;
    return html`
      <div class="scene">
        <canvas id="fusion-cv"></canvas>
        <div class="overlay">
          <span class="status ${this.backendState}">
            <i></i>
            ${this.backendState === 'online'
              ? this.ui('后端融合', 'Backend fusion')
              : this.backendState === 'fallback'
                ? this.ui('本地降级', 'Local fallback')
                : this.backendState === 'error'
                  ? this.ui('后端异常', 'Backend error')
                  : this.ui('正在连接', 'Connecting')}
          </span>
          <span class="radar-count">${onlineRadars}/${this.radars.length} ${this.ui('雷达在线', 'radars online')}</span>
        </div>
      </div>
      <div class="summary">
        <div><strong>${this.targets.length}</strong><span>${this.ui('融合目标', 'Fused targets')}</span></div>
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
      ${this.events.length
        ? html`
            <div class="events">
              <strong>${this.ui('最近事件', 'Recent events')}</strong>
              ${this.events.slice(0, 8).map(
                (event) => html`
                  <button
                    type="button"
                    class=${event.event_id === this.selectedEventId ? 'selected' : ''}
                    @click=${() => this.selectEvent(event)}
                  >
                    <span>${event.event_type.toUpperCase()} · ${event.zone_id}</span>
                    <small>${new Date(event.timestamp * 1000).toLocaleString()}</small>
                    ${event.clip_path ? html`<em>▶</em>` : ''}
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'mmwave-fusion-panel': FusionPanel;
  }
}
