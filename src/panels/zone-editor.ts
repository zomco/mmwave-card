import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { FusionZoneConfig, RadarSourceConfig, Vec2 } from '../types';

const COLORS = ['#0b825c', '#03a9f4', '#e91e63', '#ff9800', '#8bc34a', '#9c27b0'];

@customElement('mmwave-zone-editor')
export class ZoneEditor extends LitElement {
  @property({ type: Number }) roomW = 400;
  @property({ type: Number }) roomD = 600;
  @property({ attribute: false }) zones: FusionZoneConfig[] = [];
  @property({ attribute: false }) radars: RadarSourceConfig[] = [];
  @property({ attribute: false }) lang = 'en';

  @state() private draft?: FusionZoneConfig;
  @state() private originalId = '';
  @state() private error = '';

  private ui(zh: string, en: string) {
    return this.lang.toLowerCase().startsWith('zh') ? zh : en;
  }

  private beginNew() {
    let number = this.zones.length + 1;
    while (this.zones.some((zone) => zone.id === `zone_${number}`)) number++;
    this.originalId = '';
    this.draft = { id: `zone_${number}`, name: this.ui(`区域 ${number}`, `Zone ${number}`), dwell_s: 0, polygon: [] };
    this.error = '';
  }

  private select(zone: FusionZoneConfig) {
    this.originalId = zone.id;
    this.draft = { ...zone, polygon: zone.polygon.map((point) => ({ ...point })) };
    this.error = '';
  }

  private patch(patch: Partial<FusionZoneConfig>) {
    if (this.draft) this.draft = { ...this.draft, ...patch };
  }

  private addPoint(event: MouseEvent) {
    if (!this.draft) return;
    const rect = (event.currentTarget as SVGSVGElement).getBoundingClientRect();
    const point: Vec2 = {
      x: Math.round(Math.min(Math.max(((event.clientX - rect.left) / rect.width) * this.roomW, 0), this.roomW)),
      y: Math.round(Math.min(Math.max(((event.clientY - rect.top) / rect.height) * this.roomD, 0), this.roomD)),
    };
    this.patch({ polygon: [...this.draft.polygon, point] });
  }

  private undoPoint() {
    if (this.draft?.polygon.length) this.patch({ polygon: this.draft.polygon.slice(0, -1) });
  }

  private save() {
    if (!this.draft) return;
    const id = this.draft.id.trim();
    if (!id) return void (this.error = this.ui('区域 ID 不能为空', 'Zone ID cannot be empty'));
    if (this.zones.some((zone) => zone.id === id && zone.id !== this.originalId))
      return void (this.error = this.ui('区域 ID 必须唯一', 'Zone ID must be unique'));
    if (this.draft.polygon.length < 3)
      return void (this.error = this.ui('至少需要 3 个顶点', 'At least three vertices are required'));
    const saved = { ...this.draft, id, name: this.draft.name?.trim() || id };
    const next = this.originalId
      ? this.zones.map((zone) => (zone.id === this.originalId ? saved : zone))
      : [...this.zones, saved];
    this.originalId = id;
    this.draft = saved;
    this.error = '';
    this.emit(next);
  }

  private removeZone() {
    if (this.originalId) this.emit(this.zones.filter((zone) => zone.id !== this.originalId));
    this.draft = undefined;
    this.originalId = '';
    this.error = '';
  }

  private emit(zones: FusionZoneConfig[]) {
    this.dispatchEvent(new CustomEvent('zones-changed', { detail: zones, bubbles: true, composed: true }));
  }

  private pointString(points: Vec2[]) {
    return points.map((point) => `${point.x},${point.y}`).join(' ');
  }

  protected render() {
    const visibleZones = this.draft
      ? [...this.zones.filter((zone) => zone.id !== this.originalId), this.draft]
      : this.zones;
    return html`
      <div class="toolbar">
        <div class="zone-tabs">
          ${this.zones.map(
            (zone, index) =>
              html`<button
                type="button"
                class=${this.originalId === zone.id ? 'active' : ''}
                style="--zone-color:${COLORS[index % COLORS.length]}"
                @click=${() => this.select(zone)}
              >
                ${zone.name || zone.id}
              </button>`,
          )}
        </div>
        <button type="button" class="new" @click=${this.beginNew}>＋ ${this.ui('新建区域', 'New zone')}</button>
      </div>
      <svg
        class=${this.draft ? 'floor active' : 'floor'}
        viewBox=${`0 0 ${this.roomW} ${this.roomD}`}
        style=${`aspect-ratio:${this.roomW}/${this.roomD}`}
        @click=${this.addPoint}
        role="img"
        aria-label=${this.ui('事件区域户型编辑器', 'Floor-plan event zone editor')}
      >
        <defs>
          <pattern id="zone-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-opacity=".08" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" class="background" />
        ${visibleZones.map((zone, index) => {
          const selected = this.draft === zone;
          const color = COLORS[index % COLORS.length];
          return html`
            ${zone.polygon.length >= 3
              ? html`<polygon
                  points=${this.pointString(zone.polygon)}
                  fill=${color}
                  fill-opacity=${selected ? '.20' : '.09'}
                  stroke=${color}
                  stroke-width=${selected ? '3' : '2'}
                  vector-effect="non-scaling-stroke"
                />`
              : html`<polyline
                  points=${this.pointString(zone.polygon)}
                  fill="none"
                  stroke=${color}
                  stroke-width="3"
                  vector-effect="non-scaling-stroke"
                />`}
            ${zone.polygon.map(
              (point, pointIndex) => html`
                <circle
                  cx=${point.x}
                  cy=${point.y}
                  r="7"
                  fill=${color}
                  stroke="white"
                  stroke-width="2"
                  vector-effect="non-scaling-stroke"
                />
                ${selected
                  ? html`<text x=${point.x} y=${point.y - 12} class="point-label">${pointIndex + 1}</text>`
                  : nothing}
              `,
            )}
          `;
        })}
        ${this.radars.map((radar) => {
          const calibration = radar.calibration ?? {};
          return html`<g
            class="radar"
            transform=${`translate(${Number(calibration.radar_x ?? 0)} ${Number(calibration.radar_y ?? 0)}) rotate(${Number(calibration.yaw ?? 0)})`}
          >
            <circle r="11" /><path d="M 0 0 L -12 25 M 0 0 L 12 25" /><text y="-17">${radar.id}</text>
          </g>`;
        })}
        <text x="8" y="18" class="axis">0</text>
        <text x=${this.roomW - 8} y="18" text-anchor="end" class="axis">X → ${this.roomW}cm</text>
        <text x="8" y=${this.roomD - 9} class="axis">Y ↓ ${this.roomD}cm</text>
      </svg>
      ${this.draft
        ? html`
            <div class="form-grid">
              <label
                >ID<input
                  .value=${this.draft.id}
                  @input=${(event: Event) => this.patch({ id: (event.target as HTMLInputElement).value })}
              /></label>
              <label
                >${this.ui('名称', 'Name')}<input
                  .value=${this.draft.name ?? ''}
                  @input=${(event: Event) => this.patch({ name: (event.target as HTMLInputElement).value })}
              /></label>
              <label
                >${this.ui('驻留秒数', 'Dwell seconds')}<input
                  type="number"
                  min="0"
                  step="1"
                  .value=${String(this.draft.dwell_s ?? 0)}
                  @input=${(event: Event) => this.patch({ dwell_s: Number((event.target as HTMLInputElement).value) })}
              /></label>
              <div class="vertex-count">${this.draft.polygon.length} ${this.ui('个顶点', 'vertices')}</div>
            </div>
            <div class="actions">
              <button type="button" @click=${this.undoPoint} ?disabled=${!this.draft.polygon.length}>
                ↶ ${this.ui('撤销顶点', 'Undo point')}
              </button>
              <button type="button" @click=${() => this.patch({ polygon: [] })} ?disabled=${!this.draft.polygon.length}>
                ${this.ui('清空', 'Clear')}
              </button>
              <button type="button" class="danger" @click=${this.removeZone}>
                ${this.originalId ? this.ui('删除区域', 'Delete zone') : this.ui('取消', 'Cancel')}
              </button>
              <button type="button" class="save" @click=${this.save}>${this.ui('保存区域', 'Save zone')}</button>
            </div>
            ${this.error ? html`<div class="error">${this.error}</div>` : nothing}
          `
        : html`<p class="hint">
            ${this.ui(
              '选择已有区域或新建区域，然后在户型图上依次点击顶点。',
              'Select or create a zone, then click its vertices on the floor plan.',
            )}
          </p>`}
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .toolbar,
    .actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .toolbar {
      justify-content: space-between;
      margin-bottom: 7px;
    }
    .zone-tabs {
      display: flex;
      gap: 5px;
      min-width: 0;
      overflow-x: auto;
    }
    button {
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.2));
      border-radius: 7px;
      padding: 7px 9px;
      color: var(--secondary-text-color);
      background: var(--card-background-color, #fff);
      font-size: 9px;
      cursor: pointer;
    }
    .zone-tabs button {
      border-left: 4px solid var(--zone-color);
      white-space: nowrap;
    }
    .zone-tabs button.active,
    button.save {
      color: white;
      background: #0b825c;
    }
    button.new {
      color: #0b825c;
      white-space: nowrap;
    }
    button.danger {
      color: var(--error-color, #e53935);
    }
    button:disabled {
      opacity: 0.35;
      cursor: default;
    }
    .floor {
      box-sizing: border-box;
      width: 100%;
      min-height: 180px;
      max-height: 520px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.2));
      border-radius: 10px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.035);
    }
    .floor.active {
      cursor: crosshair;
    }
    .background {
      fill: url(#zone-grid);
    }
    .point-label,
    .axis,
    .radar text {
      fill: var(--secondary-text-color);
      font: 700 10px system-ui;
      text-anchor: middle;
      pointer-events: none;
    }
    .axis {
      font-size: 9px;
      text-anchor: start;
    }
    .radar {
      pointer-events: none;
    }
    .radar circle {
      fill: rgba(3, 169, 244, 0.15);
      stroke: #03a9f4;
      stroke-width: 2;
      vector-effect: non-scaling-stroke;
    }
    .radar path {
      fill: none;
      stroke: #03a9f4;
      stroke-width: 2;
      stroke-dasharray: 4 3;
      vector-effect: non-scaling-stroke;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
      margin-top: 8px;
    }
    .form-grid label {
      display: grid;
      gap: 4px;
      color: var(--secondary-text-color);
      font-size: 9px;
    }
    .form-grid input {
      min-width: 0;
      padding: 6px 7px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.2));
      border-radius: 7px;
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
      font-size: 10px;
    }
    .vertex-count {
      display: grid;
      place-items: center;
      align-self: end;
      min-height: 29px;
      border-radius: 7px;
      color: #0b825c;
      background: rgba(11, 130, 92, 0.08);
      font-size: 9px;
      font-weight: 700;
    }
    .actions {
      justify-content: flex-end;
      flex-wrap: wrap;
      margin-top: 8px;
    }
    .hint,
    .error {
      margin: 7px 1px 0;
      font-size: 9px;
    }
    .hint {
      color: var(--secondary-text-color);
    }
    .error {
      color: var(--error-color, #e53935);
    }
    @media (max-width: 500px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'mmwave-zone-editor': ZoneEditor;
  }
}
