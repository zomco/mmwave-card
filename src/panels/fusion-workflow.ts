import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import { getAdapter } from '../models';
import { localize } from '../localize/localize';
import {
  DEFAULT_CALIBRATION,
  type CalibrationConfig,
  type MMWaveCardConfig,
  type RadarSourceConfig,
  type FusionTarget,
} from '../types';
import { LocalFusionTracker, type FusionObservation } from '../fusion/tracker';
import { parseAtomicTargetFrame } from '../fusion/frame';
import { applyTransform } from '../utils/transform';
import type { RadarCalibrationSolution } from '../fusion/calibration';
import './geo-panel';
import './fusion-calibration';
import './fusion-panel';

@customElement('mmwave-fusion-workflow')
export class FusionWorkflow extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: MMWaveCardConfig;
  @state() private draft: RadarSourceConfig[] = [];
  @state() private step = 0;
  @state() private selected = 0;
  @state() private saving = false;
  @state() private message = '';
  @state() private failures: string[] = [];
  @state() private targets: FusionTarget[] = [];
  @state() private hasCapture = false;
  @state() private pendingRadars: string[] = [];
  private saved: RadarSourceConfig[] = [];
  private revision = 0;
  private tracker = new LocalFusionTracker();
  private observations: FusionObservation[] = [];
  private signatures = new Map<string, string>();

  private t(key: string, params?: Record<string, unknown>) {
    return localize(key, this.hass?.language, params);
  }

  protected willUpdate(changed: PropertyValues) {
    if (changed.has('config') && this.config) {
      this.draft = structuredClone(this.config.radars ?? []);
      this.saved = structuredClone(this.draft);
      this.revision = Number(this.config.calibration_revision ?? 0);
      this.resetPreview();
    }
    if ((changed.has('hass') || changed.has('draft')) && this.hass) this.updatePreview();
  }

  private calibration(radar: RadarSourceConfig): CalibrationConfig {
    return { ...DEFAULT_CALIBRATION, ...radar.calibration };
  }

  private get dirty() {
    return JSON.stringify(this.draft) !== JSON.stringify(this.saved);
  }

  private close() {
    if (this.saving) return;
    if ((this.dirty || this.hasCapture) && !confirm(this.t('workflow.discard_confirm'))) return;
    this.dispatchEvent(new CustomEvent('calibration-closed', { bubbles: true, composed: true }));
  }

  private changePose(event: CustomEvent<CalibrationConfig>) {
    event.stopPropagation();
    this.draft = this.draft.map((radar, index) =>
      index === this.selected ? { ...radar, calibration: event.detail } : radar,
    );
    this.message = '';
    this.resetPreview();
  }

  private useSolutions(event: CustomEvent<{ solutions: RadarCalibrationSolution[] }>) {
    event.stopPropagation();
    this.pendingRadars = this.draft
      .filter((radar) => !event.detail.solutions.some((solution) => solution.radarId === radar.id))
      .map((radar) => radar.id);
    this.draft = this.draft.map((radar) => {
      const solution = event.detail.solutions.find((item) => item.radarId === radar.id);
      return solution ? { ...radar, calibration: solution.calibration, residual_cm: solution.residualAfterCm } : radar;
    });
    this.resetPreview();
    this.step = 2;
  }

  private resetPreview() {
    this.tracker = new LocalFusionTracker(this.config.fusion);
    this.observations = [];
    this.signatures.clear();
    this.targets = [];
  }

  private updatePreview() {
    const now = Date.now();
    for (const radar of this.draft) {
      const adapter = getAdapter(radar.radar_model);
      if (!adapter) continue;
      const frameState = radar.frame_entity ? this.hass.states[radar.frame_entity] : undefined;
      const frame = frameState ? parseAtomicTargetFrame(frameState.state) : undefined;
      const signature = frame
        ? `${frame.frameId}:${frame.sourceTimestamp}`
        : Object.entries(radar)
            .filter(([key]) => key.endsWith('_entity'))
            .map(([, id]) => this.hass.states[String(id)]?.last_updated ?? '')
            .join('|');
      if (signature === this.signatures.get(radar.id)) continue;
      this.signatures.set(radar.id, signature);
      const scale = Number(radar.frame_coordinate_scale ?? 1);
      const rawTargets = frame
        ? frame.targets.map((target, index) => ({
            index,
            rawX: target.x * scale,
            rawY: target.y * scale,
            rawZ: target.z * scale,
          }))
        : adapter.readFromHass(this.hass, { ...this.config, ...radar } as MMWaveCardConfig).targets;
      for (const target of rawTargets) {
        const room = applyTransform(target.rawX, target.rawY, target.rawZ, this.calibration(radar));
        if (
          room.roomX < 0 ||
          room.roomY < 0 ||
          room.roomX > Number(this.config.room_w) ||
          room.roomY > Number(this.config.room_d)
        )
          continue;
        this.observations.push({
          radarId: radar.id,
          slot: target.index,
          timestamp: now,
          x: room.roomX,
          y: room.roomY,
          weight: Number(radar.measurement_weight ?? 1),
        });
      }
    }
    this.observations = this.observations.filter((point) => now - point.timestamp <= 250);
    this.targets = this.tracker.step(this.observations, now);
  }

  private async save() {
    if (this.saving || !this.hass.user?.is_admin) return;
    this.saving = true;
    this.message = this.t('workflow.saving');
    this.failures = [];
    try {
      const result = await this.hass.callWS<{
        config: MMWaveCardConfig;
        devices: Array<{ id: string; failures: string[] }>;
      }>({
        type: 'mmwave_fusion/apply_calibrations',
        fusion_id: this.config.fusion_id || 'home',
        expected_revision: this.revision,
        radars: this.draft,
        sync_devices: true,
      });
      this.draft = structuredClone(result.config.radars ?? []);
      this.saved = structuredClone(this.draft);
      this.revision = Number(result.config.calibration_revision ?? 0);
      this.hasCapture = false;
      this.failures = result.devices.flatMap((device) => device.failures.map((failure) => `${device.id}: ${failure}`));
      this.message = this.t(this.failures.length ? 'workflow.saved_partial' : 'workflow.saved');
      this.dispatchEvent(
        new CustomEvent('calibration-saved', { detail: result.config, bubbles: true, composed: true }),
      );
    } catch (error) {
      this.message = this.t('workflow.save_failed');
      this.failures = [String((error as { message?: string }).message ?? error)];
    } finally {
      this.saving = false;
    }
  }

  protected render() {
    if (!this.config || !this.draft.length) return nothing;
    const radar = this.draft[this.selected] ?? this.draft[0];
    const adapter = getAdapter(radar.radar_model);
    const peers = this.draft
      .filter((item) => item.id !== radar.id)
      .map((item) => ({ id: item.id, calibration: this.calibration(item) }));
    const visuals = this.draft.flatMap((item) => {
      const model = getAdapter(item.radar_model);
      return model
        ? [
            {
              config: item,
              adapter: model,
              calibration: this.calibration(item),
              available: Object.entries(item).some(
                ([key, id]) =>
                  key.endsWith('_entity') &&
                  this.hass.states[String(id)] &&
                  !['unavailable', 'unknown'].includes(this.hass.states[String(id)].state),
              ),
            },
          ]
        : [];
    });
    return html` <header>
        <button
          type="button"
          class="back"
          aria-label=${this.t('card.back_to_radar_view')}
          ?disabled=${this.saving}
          @click=${this.close}
        >
          ←
        </button>
        <span
          ><strong>${this.t('card.radar_spatial_calibration')}</strong
          ><small>${this.config.name ?? this.config.fusion_id}</small></span
        ><b>${this.step + 1} / 3</b>
      </header>
      <nav aria-label=${this.t('card.calibration_steps')}>
        ${['card.installation', 'card.direction', 'card.live_test'].map(
          (key, index) =>
            html`<button
              type="button"
              aria-current=${this.step === index ? 'step' : nothing}
              ?disabled=${this.saving}
              @click=${() => (this.step = index)}
            >
              ${index + 1} · ${this.t(key)}
            </button>`,
        )}
      </nav>
      <div class="body" ?inert=${this.saving}>
        <section ?hidden=${this.step !== 0}>
          <div class="radar-tabs" role="tablist" aria-label=${this.t('editor.radar_installation_tabs')}>
            ${this.draft.map(
              (item, index) =>
                html`<button
                  type="button"
                  role="tab"
                  aria-selected=${index === this.selected ? 'true' : 'false'}
                  @click=${() => (this.selected = index)}
                >
                  ${item.id}<small>${item.radar_model}</small>
                </button>`,
            )}
          </div>
          ${adapter
            ? html`<mmwave-geo-panel
                .adapter=${adapter}
                .calibration=${this.calibration(radar)}
                .peerCalibrations=${peers}
                .showBoundary=${false}
                .roomW=${Number(this.config.room_w)}
                .roomD=${Number(this.config.room_d)}
                .lang=${this.hass.language}
                .maxRangeM=${adapter.info.maxRangeM}
                @calibration-changed=${this.changePose}
              ></mmwave-geo-panel>`
            : nothing}
        </section>
        <section ?hidden=${this.step !== 1}>
          <mmwave-fusion-calibration
            .hass=${this.hass}
            .radars=${this.draft}
            .roomW=${Number(this.config.room_w)}
            .roomD=${Number(this.config.room_d)}
            .lang=${this.hass.language}
            .applyLabel=${this.t('workflow.use_results')}
            @fusion-calibration-applied=${this.useSolutions}
            @calibration-capture-started=${() => (this.hasCapture = true)}
          ></mmwave-fusion-calibration>
        </section>
        <section ?hidden=${this.step !== 2}>
          <p>${this.t('workflow.verify_hint')}</p>
          ${this.pendingRadars.length
            ? html`<p class="pending-calibration">
                ${this.t('fusioncal.pending_names', { p0: this.pendingRadars.join(', ') })}
              </p>`
            : nothing}
          <mmwave-fusion-panel
            .roomW=${Number(this.config.room_w)}
            .roomD=${Number(this.config.room_d)}
            .radars=${visuals}
            .targets=${this.targets}
            .lang=${this.hass.language}
            .backendState=${'preview'}
          ></mmwave-fusion-panel>
        </section>
        ${this.message ? html`<p role="status">${this.message}</p>` : nothing}
        ${this.failures.length
          ? html`<ul role="alert">
              ${this.failures.map((failure) => html`<li>${failure}</li>`)}
            </ul>`
          : nothing}
      </div>
      <footer>
        <small>${this.dirty ? this.t('workflow.unsaved') : this.t('workflow.draft_hint')}</small>
        ${this.step > 0
          ? html`<button type="button" ?disabled=${this.saving} @click=${() => this.step--}>
              ${this.t('workflow.previous')}
            </button>`
          : nothing}
        ${this.step < 2
          ? html`<button type="button" class="primary" ?disabled=${this.saving} @click=${() => this.step++}>
              ${this.t('workflow.next')}
            </button>`
          : html`<button type="button" class="primary" ?disabled=${this.saving} @click=${this.save}>
              ${this.t(this.saving ? 'workflow.saving' : 'workflow.apply_sync')}
            </button>`}
      </footer>`;
  }

  static styles = css`
    :host {
      --primary-color: var(--mmwave-primary, #0b825c);
      display: block;
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
      border-radius: 16px;
      overflow: hidden;
    }
    * {
      box-sizing: border-box;
    }
    [hidden] {
      display: none !important;
    }
    header,
    nav,
    footer {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px;
      border-bottom: 1px solid var(--divider-color);
    }
    header > span {
      display: grid;
      gap: 4px;
      flex: 1;
    }
    small {
      color: var(--secondary-text-color);
      font-size: 11px;
    }
    header > b {
      font-size: 12px;
    }
    button {
      min-height: 44px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      padding: 8px 12px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      cursor: pointer;
      font: inherit;
      font-size: 12px;
    }
    button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    button[aria-current='step'],
    button[aria-selected='true'] {
      color: var(--primary-color);
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 9%, transparent);
    }
    nav > button {
      flex: 1;
    }
    .body {
      padding: 12px;
      min-width: 0;
    }
    .radar-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }
    .radar-tabs button {
      display: grid;
      gap: 3px;
      min-width: 76px;
    }
    p,
    li {
      font-size: 12px;
      line-height: 1.5;
      overflow-wrap: anywhere;
    }
    ul {
      padding-left: 20px;
      color: var(--error-color);
    }
    footer {
      position: sticky;
      bottom: 0;
      background: var(--card-background-color, #fff);
      border-top: 1px solid var(--divider-color);
      border-bottom: 0;
      flex-wrap: wrap;
      padding-bottom: calc(12px + env(safe-area-inset-bottom));
      z-index: 2;
    }
    footer > small {
      flex: 1;
      min-width: 100px;
    }
    .primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    @media (max-width: 600px) {
      :host {
        position: fixed;
        inset: 0;
        z-index: 1000;
        height: 100dvh;
        overflow-y: auto;
        border-radius: 0;
        overscroll-behavior: contain;
      }
      header {
        position: sticky;
        top: 0;
        background: var(--card-background-color, #fff);
        z-index: 3;
        padding-top: calc(12px + env(safe-area-inset-top));
      }
      footer {
        position: sticky;
        bottom: 0;
      }
      .body {
        min-height: calc(100dvh - 240px);
      }
      footer > small {
        flex-basis: 100%;
      }
    }
  `;
}
