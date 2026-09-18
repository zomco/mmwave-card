import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { FloorplanConfig, Vec2 } from '../types';
import { localize } from '../localize/localize';
import { canvasToRoom, roomToCanvas, fitRoomMetrics, setupCanvas, drawBase, type CanvasMetrics } from '../utils/canvas';
import {
  floorplanImage,
  floorplanValues,
  imagePointToRoom,
  roomPointToImage,
  calibratedImageWidth,
} from '../utils/floorplan';

@customElement('mmwave-floorplan-editor')
export class FloorplanEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private uploading = false;
  @state() private uploadError = false;
  @property({ attribute: false }) config?: FloorplanConfig;
  @property({ type: Number }) roomW = 400;
  @property({ type: Number }) roomD = 600;
  @property() lang = 'en';
  @state() private mode: 'move' | 'scale' | 'origin' = 'move';
  @state() private points: Vec2[] = [];
  @state() private length = 100;
  @state() private draft?: FloorplanConfig;
  @query('canvas') private canvas?: HTMLCanvasElement;
  private observer?: ResizeObserver;
  private drag?: { start: Vec2; config: FloorplanConfig; pointer: number };
  private loaded = () => {
    if (this.isConnected) {
      this.requestUpdate();
      this.draw();
    }
  };
  private t(key: string) {
    return localize('floorplan.' + key, this.lang);
  }
  private get current(): FloorplanConfig {
    return this.draft ?? this.config ?? { url: '' };
  }
  private get normalized(): FloorplanConfig {
    return { ...this.current, width_cm: this.current.width_cm ?? this.roomW };
  }
  private metrics(): CanvasMetrics {
    const W = this.canvas?.clientWidth || 400;
    return fitRoomMetrics({
      W,
      H: Math.min(420, Math.max(240, (W * this.roomD) / this.roomW)),
      roomW: this.roomW,
      roomD: this.roomD,
    });
  }
  protected firstUpdated() {
    this.observer = new ResizeObserver(() => this.draw());
    if (this.canvas) this.observer.observe(this.canvas);
  }
  protected updated(changed: PropertyValues) {
    if (changed.has('config')) {
      this.draft = undefined;
      this.drag = undefined;
    }
    this.draw();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer?.disconnect();
  }
  private change(patch: Partial<FloorplanConfig>) {
    const config = { ...this.normalized, ...patch };
    this.draft = config;
    this.dispatchEvent(new CustomEvent('floorplan-changed', { detail: config, bubbles: true, composed: true }));
  }
  private draw() {
    if (!this.canvas?.clientWidth) return;
    const m = this.metrics(),
      ctx = setupCanvas(this.canvas, m.H);
    drawBase(ctx, m, this.normalized, this.loaded);
    ctx.strokeStyle = '#408564';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, (this.roomW * m.W) / m.roomW, (this.roomD * m.H) / m.roomD);
    this.points.forEach((point, index) => {
      const room = imagePointToRoom(point, this.normalized, this.roomW);
      const p = roomToCanvas(room.x, room.y, m);
      ctx.beginPath();
      ctx.arc(p.cx, p.cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ff9800';
      ctx.fill();
      ctx.fillStyle = '#222';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(String(index + 1), p.cx + 9, p.cy);
    });
  }
  private roomPoint(event: PointerEvent): Vec2 {
    const rect = this.canvas!.getBoundingClientRect();
    return canvasToRoom(event.clientX - rect.left, event.clientY - rect.top, this.metrics());
  }
  private down(event: PointerEvent) {
    if (
      this.current.locked !== false ||
      this.current.visible === false ||
      floorplanImage(this.current.url)?.status !== 'ready'
    )
      return;
    const room = this.roomPoint(event);
    if (this.mode === 'move') {
      this.drag = { start: room, config: { ...this.normalized }, pointer: event.pointerId };
      this.canvas!.setPointerCapture(event.pointerId);
    } else {
      const point = roomPointToImage(room, this.normalized, this.roomW);
      const image = floorplanImage(this.current.url)!.image;
      if (point.x < 0 || point.x > 1 || point.y < 0 || point.y > image.naturalHeight / image.naturalWidth) return;
      if (this.mode === 'scale') this.points = this.points.length === 2 ? [point] : [...this.points, point];
      else {
        const anchored = imagePointToRoom(point, { ...this.normalized, offset_x_cm: 0, offset_y_cm: 0 }, this.roomW);
        this.change({ offset_x_cm: -anchored.x, offset_y_cm: -anchored.y });
        this.mode = 'move';
      }
    }
  }
  private move(event: PointerEvent) {
    if (!this.drag || event.pointerId !== this.drag.pointer) return;
    const p = this.roomPoint(event),
      v = floorplanValues(this.drag.config, this.roomW);
    this.draft = {
      ...this.drag.config,
      offset_x_cm: v.x + p.x - this.drag.start.x,
      offset_y_cm: v.y + p.y - this.drag.start.y,
    };
  }
  private up(event: PointerEvent) {
    if (!this.drag || event.pointerId !== this.drag.pointer) return;
    this.move(event);
    this.drag = undefined;
    this.change({});
  }
  private cancel() {
    this.drag = undefined;
    this.draft = undefined;
  }
  private calibrate() {
    if (this.points.length !== 2) return;
    const width = calibratedImageWidth(this.points[0], this.points[1], this.length);
    if (width === undefined) return;
    // Preserve the first endpoint in room space when changing the scale.
    const anchor = imagePointToRoom(this.points[0], this.normalized, this.roomW);
    const resized = imagePointToRoom(
      this.points[0],
      { ...this.normalized, width_cm: width, offset_x_cm: 0, offset_y_cm: 0 },
      this.roomW,
    );
    this.change({ width_cm: width, offset_x_cm: anchor.x - resized.x, offset_y_cm: anchor.y - resized.y });
    this.points = [];
    this.mode = 'move';
  }
  private async upload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file || this.uploading) return;
    this.uploadError = false;
    if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type) || file.size > 9 * 1024 * 1024) {
      this.uploadError = true;
      input.value = '';
      return;
    }
    this.uploading = true;
    try {
      const body = new FormData();
      body.append('file', file);
      if (!this.hass?.fetchWithAuth) throw new Error('Upload unavailable');
      const response = await this.hass.fetchWithAuth('/api/image/upload', { method: 'POST', body });
      if (!response.ok) throw new Error('Upload failed');
      const result: unknown = await response.json();
      const id = (result as { id?: unknown })?.id;
      if (typeof id !== 'string' || !/^[a-f0-9]{32}$/.test(id)) throw new Error('Invalid image ID');
      this.points = [];
      this.mode = 'move';
      this.change({ url: `/api/image/serve/${id}/original`, visible: true, locked: false });
    } catch {
      this.uploadError = true;
    } finally {
      this.uploading = false;
      input.value = '';
    }
  }
  protected render() {
    const c = this.current,
      v = floorplanValues(c, this.roomW),
      locked = c.locked !== false;
    const image = c.url ? floorplanImage(c.url, this.loaded) : undefined;
    return html`<details @toggle=${() => this.draw()}>
      <summary>${this.t('title')}</summary>
      <label
        >${this.t('upload')}<input
          type="file"
          accept="image/png,image/jpeg,image/gif"
          ?disabled=${this.uploading}
          @change=${this.upload}
      /></label>
      ${this.uploading ? html`<p role="status">${this.t('uploading')}</p>` : nothing}
      ${this.uploadError ? html`<p role="alert">${this.t('upload_error')}</p>` : nothing}
      <label
        >${this.t('url')}<input
          type="text"
          placeholder="/local/floorplans/room.png"
          .value=${c.url}
          @change=${(e: Event) => {
            this.points = [];
            this.change({ url: (e.target as HTMLInputElement).value.trim() });
          }}
      /></label>
      <p>${this.t('source_hint')}</p>
      <div class="options">
        <label
          ><input
            type="checkbox"
            .checked=${c.visible !== false}
            @change=${(e: Event) => this.change({ visible: (e.target as HTMLInputElement).checked })}
          />${this.t('visible')}</label
        >
        <label
          ><input
            type="checkbox"
            .checked=${locked}
            @change=${(e: Event) => {
              this.mode = 'move';
              this.points = [];
              this.change({ locked: (e.target as HTMLInputElement).checked });
            }}
          />${this.t('locked')}</label
        >
      </div>
      ${c.url && image?.status !== 'ready'
        ? html`<p role="status">${this.t(image?.status === 'loading' ? 'loading' : 'error')}</p>`
        : nothing}
      <canvas
        aria-label=${this.t('preview')}
        @pointerdown=${this.down}
        @pointermove=${this.move}
        @pointerup=${this.up}
        @pointercancel=${this.cancel}
      ></canvas>
      <p>
        ${this.t(
          locked
            ? 'unlock_hint'
            : this.mode === 'move'
              ? 'drag_hint'
              : this.mode === 'scale'
                ? 'scale_hint'
                : 'origin_hint',
        )}
      </p>
      <div class="options">
        <button
          type="button"
          ?disabled=${locked || image?.status !== 'ready'}
          @click=${() => {
            this.mode = 'scale';
            this.points = [];
          }}
        >
          ${this.t('scale')}
        </button>
        <button
          type="button"
          ?disabled=${locked || image?.status !== 'ready'}
          @click=${() => {
            this.mode = 'origin';
            this.points = [];
          }}
        >
          ${this.t('origin')}
        </button>
        <button
          type="button"
          ?disabled=${locked}
          @click=${() => {
            this.mode = 'move';
            this.points = [];
          }}
        >
          ${this.t('move')}
        </button>
      </div>
      ${this.mode === 'scale'
        ? html`<label
              >${this.t('length')}<input
                type="number"
                min="1"
                .value=${String(this.length)}
                @input=${(e: Event) => (this.length = Number((e.target as HTMLInputElement).value))}
            /></label>
            <button
              type="button"
              ?disabled=${this.points.length !== 2 ||
              !calibratedImageWidth(this.points[0], this.points[1], this.length)}
              @click=${this.calibrate}
            >
              ${this.t('apply_scale')}
            </button>`
        : nothing}
      <div class="numbers">
        ${(
          [
            ['width_cm', v.width, 'width'],
            ['offset_x_cm', v.x, 'x'],
            ['offset_y_cm', v.y, 'y'],
            ['rotation', c.rotation ?? 0, 'rotation'],
          ] as const
        ).map(
          ([key, value, label]) =>
            html` <label
              >${this.t(label)}<input
                type="number"
                ?disabled=${locked}
                step="0.1"
                .value=${String(Math.round(value * 10) / 10)}
                @change=${(e: Event) => {
                  const n = Number((e.target as HTMLInputElement).value);
                  if (Number.isFinite(n) && (key !== 'width_cm' || n > 0)) this.change({ [key]: n });
                }}
            /></label>`,
        )}
      </div>
      <label
        >${this.t('opacity')}<input
          type="range"
          min="0"
          max="1"
          step="0.05"
          .value=${String(v.opacity)}
          @input=${(e: Event) => this.change({ opacity: Number((e.target as HTMLInputElement).value) })}
      /></label>
    </details>`;
  }
  static styles = css`
    :host {
      display: block;
      min-width: 0;
    }
    details {
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 12px;
      padding: 12px;
      margin: 12px 0;
    }
    summary {
      cursor: pointer;
      font-weight: 600;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin: 10px 0;
      font-size: 12px;
      min-width: 0;
    }
    input {
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
      font: inherit;
      font-size: 16px;
      padding: 7px;
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 6px;
    }
    input[type='checkbox'] {
      width: auto;
    }
    input[type='range'] {
      padding: 0;
      accent-color: var(--mmwave-primary, #408564);
    }
    .options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .options label {
      flex-direction: row;
      align-items: center;
    }
    .numbers {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 10px;
    }
    canvas {
      display: block;
      width: 100%;
      touch-action: none;
      box-shadow: inset 0 0 0 1px var(--divider-color, #ddd);
      box-sizing: border-box;
      border-radius: 8px;
    }
    button {
      font: inherit;
      font-size: 12px;
      min-height: 36px;
      padding: 6px 10px;
      cursor: pointer;
      border-radius: 7px;
      border: 1px solid var(--divider-color, #ddd);
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
    }
    button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    p {
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1.5;
    }
  `;
}
