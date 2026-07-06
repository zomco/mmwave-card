import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import { getModelList, getAdapter } from "./models";
import { localize } from "./localize/localize";
import type { MMWaveCardConfig } from "./types";
import { DEFAULT_CARD_CONFIG } from "./types";
import { EDITOR_TAG } from "./const";

@customElement(EDITOR_TAG)
export class MMWaveCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) private _config!: MMWaveCardConfig;

  public setConfig(config: MMWaveCardConfig): void {
    this._config = { ...DEFAULT_CARD_CONFIG, ...config } as MMWaveCardConfig;
  }

  private _L(k: string) { return localize(k, this.hass?.language); }

  private _changed(key: string, value: unknown) {
    this._config = { ...this._config, [key]: value };
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const modelId  = (this._config.radar_model ?? "") as string;
    const adapter  = getAdapter(modelId);
    const models   = getModelList();

    return html`
      <div class="card-config">
        <!-- Model selector -->
        <h3>${this._L("editor.model")}</h3>
        <div class="field">
          <label>${this._L("editor.model")}</label>
          <select .value=${modelId} @change=${(e: Event) =>
              this._changed("radar_model", (e.target as HTMLSelectElement).value)}>
            <option value="" disabled>${this._L("editor.model")}…</option>
            ${models.map(m => html`
              <option value=${m.id} ?selected=${m.id === modelId}>${m.label}</option>`)}
          </select>
        </div>

        <!-- Entity fields (model-specific) -->
        ${adapter ? html`
          <h3>${this._L("editor.entities")}</h3>
          ${adapter.getEntitySchema().map(f => html`
            <div class="field">
              <label>${this._L(f.labelKey)}${f.required ? "" : " *"}</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${(this._config[f.key] ?? "") as string}
                .includeDomains=${f.domain ? [f.domain] : undefined}
                @value-changed=${(e: CustomEvent) => this._changed(f.key, e.detail.value)}
                allow-custom-entity
              ></ha-entity-picker>
            </div>`)}` : nothing}

        <!-- Room dimensions -->
        <h3>${this._L("editor.room_dimensions")}</h3>
        <div class="field">
          <label>${this._L("editor.room_w")}</label>
          <input type="number" .value=${String(this._config.room_w ?? 400)} min="50" step="10"
            @change=${(e: Event) => this._changed("room_w", Number((e.target as HTMLInputElement).value))}>
        </div>
        <div class="field">
          <label>${this._L("editor.room_d")}</label>
          <input type="number" .value=${String(this._config.room_d ?? 600)} min="50" step="10"
            @change=${(e: Event) => this._changed("room_d", Number((e.target as HTMLInputElement).value))}>
        </div>
      </div>`;
  }

  static styles = css`
    .card-config { padding: 4px 0; }
    h3 {
      font-size: 11px; font-weight: 600; letter-spacing: .06em;
      text-transform: uppercase; color: var(--secondary-text-color);
      margin: 16px 0 8px;
    }
    .field { display: flex; align-items: center; gap: 12px; margin-bottom: 7px; }
    .field label { font-size: 13px; min-width: 150px; color: var(--primary-text-color); }
    .field ha-entity-picker, .field select, .field input { flex: 1; }
    .field select, .field input {
      padding: 6px 8px; border: 1px solid var(--divider-color);
      border-radius: 6px; background: var(--card-background-color);
      color: var(--primary-text-color); font-size: 13px;
    }
  `;
}

declare global { interface HTMLElementTagNameMap { [EDITOR_TAG]: MMWaveCardEditor } }
