import { LitElement, css, html, svg, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { localize } from '../localize/localize';
import type { FloorplanConfig, OccupancyArea, Vec2 } from '../types';
import { floorplanImage, floorplanValues } from '../utils/floorplan';
import {
  AREA_COLORS,
  areaWarnings,
  defaultAreaPolygon,
  MIN_AREA_CENTROID_GAP_CM,
  MIN_AREA_SHORT_SIDE_CM,
} from '../utils/area-geometry';

@customElement('mmwave-area-editor')
export class AreaEditor extends LitElement {
  @property({ attribute: false }) floorplan?: FloorplanConfig;
  @property({ type: Number }) roomW = 400;
  @property({ type: Number }) roomD = 600;
  @property({ attribute: false }) areas: OccupancyArea[] = [{ polygon: [] }, { polygon: [] }, { polygon: [] }];
  @property({ attribute: false }) radar?: { x: number; y: number; yaw: number };
  @property({ attribute: false }) standPoint?: Vec2;
  @property({ attribute: false }) lang = 'en';
  @state() private selected = 0;
  private floorplanLoaded = () => {
    if (this.isConnected) this.requestUpdate();
  };

  private t(key: string, params?: Record<string, unknown>) {
    return localize(key, this.lang, params);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.floorplan?.url) floorplanImage(this.floorplan.url, this.floorplanLoaded);
  }

  private emit(areas: OccupancyArea[]) {
    this.dispatchEvent(new CustomEvent('areas-changed', { detail: areas, bubbles: true, composed: true }));
  }

  private patchSelected(polygon: Vec2[]) {
    const next = this.areas.map((area, index) => (index === this.selected ? { polygon } : area));
    this.emit(next);
  }

  private addPoint(event: MouseEvent) {
    const rect = (event.currentTarget as SVGSVGElement).getBoundingClientRect();
    const point: Vec2 = {
      x: Math.round(Math.min(Math.max(((event.clientX - rect.left) / rect.width) * this.roomW, 0), this.roomW)),
      y: Math.round(Math.min(Math.max(((event.clientY - rect.top) / rect.height) * this.roomD, 0), this.roomD)),
    };
    this.patchSelected([...(this.areas[this.selected]?.polygon ?? []), point]);
  }

  private undo() {
    const polygon = this.areas[this.selected]?.polygon ?? [];
    if (polygon.length) this.patchSelected(polygon.slice(0, -1));
  }

  private clear() {
    this.patchSelected([]);
  }

  private standHere() {
    if (!this.standPoint) return;
    this.patchSelected(defaultAreaPolygon(this.standPoint, this.roomW, this.roomD));
  }

  private pointString(polygon: Vec2[]) {
    return polygon.map((point) => `${point.x},${point.y}`).join(' ');
  }

  render() {
    const background =
      this.floorplan?.visible !== false && this.floorplan
        ? floorplanImage(this.floorplan.url, this.floorplanLoaded)
        : undefined;
    const placement = floorplanValues(this.floorplan ?? { url: '' }, this.roomW);
    const warnings = areaWarnings(this.areas.map((area) => area.polygon));
    return html`
      <p class="hint">${this.t('area.hint')}</p>
      ${this.standPoint ? nothing : html`<p class="need">${this.t('area.stand_need_target')}</p>`}
      <div class="picks">
        ${[0, 1, 2].map(
          (index) =>
            html`<button
              type="button"
              class=${this.selected === index ? 'on' : ''}
              style=${`--c:${AREA_COLORS[index]}`}
              @click=${() => (this.selected = index)}
            >
              ${this.t('area.area_n', { n: index + 1 })}
              <small>${this.areas[index]?.polygon.length ?? 0}</small>
            </button>`,
        )}
      </div>
      <svg
        class="floor"
        viewBox=${`0 0 ${this.roomW} ${this.roomD}`}
        style=${`aspect-ratio:${this.roomW}/${this.roomD}`}
        @click=${this.addPoint}
      >
        ${
          background?.status === 'ready'
            ? svg`<image
              href=${background.image.src}
              width=${placement.width}
              height=${(placement.width * background.image.naturalHeight) / background.image.naturalWidth}
              opacity=${placement.opacity}
              transform=${`translate(${placement.x} ${placement.y}) rotate(${(placement.angle * 180) / Math.PI})`}
              pointer-events="none"
            />`
            : nothing
        }
        <rect width="100%" height="100%" fill="transparent" />
        ${this.areas.map((area, index) => {
          const color = AREA_COLORS[index];
          const selected = this.selected === index;
          if (!area.polygon.length) return nothing;
          return svg`
            ${
              area.polygon.length >= 3
                ? svg`<polygon points=${this.pointString(area.polygon)} fill=${color} fill-opacity=${selected ? '.22' : '.08'} stroke=${color} stroke-width=${selected ? 3 : 2} vector-effect="non-scaling-stroke" />`
                : svg`<polyline points=${this.pointString(area.polygon)} fill="none" stroke=${color} stroke-width="3" vector-effect="non-scaling-stroke" />`
            }
            ${area.polygon.map((point) => svg`<circle cx=${point.x} cy=${point.y} r="7" fill=${color} stroke="white" stroke-width="2" vector-effect="non-scaling-stroke" />`)}
          `;
        })}
        ${
          this.standPoint
            ? svg`<circle cx=${this.standPoint.x} cy=${this.standPoint.y} r="14" fill="none" stroke="white" stroke-width="2" stroke-dasharray="4 3" vector-effect="non-scaling-stroke" />`
            : nothing
        }
        ${
          this.radar
            ? svg`<g transform=${`translate(${this.radar.x} ${this.radar.y}) rotate(${-this.radar.yaw})`}><circle r="10" fill="#111" /><path d="M 0 0 L -10 22 M 0 0 L 10 22" stroke="#111" fill="none" /></g>`
            : nothing
        }
      </svg>
      <div class="actions">
        <button type="button" ?disabled=${!this.standPoint} @click=${this.standHere}>
          ${this.t('area.stand_here')}
        </button>
        <button type="button" @click=${this.undo}>${this.t('geo.poly_undo')}</button>
        <button type="button" @click=${this.clear}>${this.t('geo.poly_clear')}</button>
      </div>
      ${
        warnings.length
          ? html`<div class="warn">
              ${warnings.some((w) => w.startsWith('small')) ? html`<p>${this.t('area.warn_small', { cm: MIN_AREA_SHORT_SIDE_CM })}</p>` : nothing}
              ${warnings.some((w) => w.startsWith('close')) ? html`<p>${this.t('area.warn_close', { cm: MIN_AREA_CENTROID_GAP_CM })}</p>` : nothing}
              ${warnings.some((w) => w.startsWith('overlap')) ? html`<p>${this.t('area.warn_overlap')}</p>` : nothing}
            </div>`
          : html`<p class="ok">${this.t('area.ok')}</p>`
      }
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .hint,
    .ok,
    .need {
      margin: 0 0 0.6rem;
      font-size: 0.85rem;
      opacity: 0.75;
    }
    .actions button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .picks {
      display: flex;
      gap: 0.4rem;
      margin-bottom: 0.6rem;
    }
    .picks button {
      flex: 1;
      border: 1px solid var(--c);
      background: transparent;
      color: inherit;
      border-radius: 8px;
      padding: 0.4rem;
      cursor: pointer;
    }
    .picks button.on {
      background: color-mix(in srgb, var(--c) 18%, transparent);
    }
    .picks small {
      display: block;
      opacity: 0.6;
    }
    .floor {
      width: 100%;
      background: var(--secondary-background-color, #111);
      border-radius: 12px;
      cursor: crosshair;
    }
    .actions {
      display: flex;
      gap: 0.4rem;
      margin: 0.5rem 0;
    }
    .warn {
      color: var(--warning-color, #f59e0b);
      font-size: 0.85rem;
    }
  `;
}
