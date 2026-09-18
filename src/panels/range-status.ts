import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { CalibrationConfig } from '../types';
import { localize } from '../localize/localize';
import { nativeRangeLimited } from '../utils/range-filter';
@customElement('mmwave-range-status')
export class RangeStatus extends LitElement {
  @property({ attribute: false }) calibration!: CalibrationConfig;
  @property({ type: Number }) maxRangeM?: number;
  @property() lang = 'en';
  @property() model = '';
  protected render() {
    const t = (key: string) => localize(`range.${key}`, this.lang);
    const max = this.calibration.distance_max ?? 0;
    const tunable = ['ld2410', 'ld2410b', 'ld2410c', 'ld2412', 'ld2420', 'rd03e'].includes(this.model);
    return html`<div>
      <p>
        ${t('software')}: ${(this.calibration.distance_min ?? 0) / 100}–${max > 0 ? `${max / 100} m` : t('unlimited')}
      </p>
      <p>${t('native_max')}: ${this.maxRangeM !== undefined ? `${this.maxRangeM} m` : t('unknown')}</p>
      <p>${t('native_min_unknown')}</p>
      ${
        nativeRangeLimited(this.maxRangeM, this.calibration)
          ? html`<p class="warning" role="status">${t('limited')}</p>`
          : ''
      }
      <p>${t(tunable ? 'noise_preserved' : 'noise_unknown')}</p>
    </div>`;
  }
  static styles = css`
    :host {
      display: block;
      color: var(--secondary-text-color);
      font-size: 11px;
    }
    p {
      margin: 5px 0;
    }
    .warning {
      color: var(--warning-color, #b26a00);
    }
  `;
}
