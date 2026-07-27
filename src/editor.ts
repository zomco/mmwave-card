import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { getModelList, getAdapter } from './models';
import { localize } from './localize/localize';
import type { MMWaveCardConfig } from './types';
import { DEFAULT_CARD_CONFIG } from './types';
import { EDITOR_TAG } from './const';

@customElement(EDITOR_TAG)
export class MMWaveCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) private _config!: MMWaveCardConfig;

  @state() private _devices: any[] = [];
  @state() private _advOpen = false;

  protected updated(changedProps: Map<string, any>) {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass && this._devices.length === 0) {
      this._loadDevices();
    }
  }

  private async _loadDevices() {
    try {
      this._devices = await this.hass.callWS({ type: 'config/device_registry/list' });
    } catch (e) {
      console.warn('Failed to load devices', e);
    }
  }

  public setConfig(config: MMWaveCardConfig): void {
    this._config = { ...DEFAULT_CARD_CONFIG, ...config } as MMWaveCardConfig;
  }

  private _L(k: string) {
    return localize(k, this.hass?.language);
  }

  private _changed(key: string, value: unknown) {
    this._config = { ...this._config, [key]: value };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }

  private async _deviceDropdownChanged(e: Event) {
    const deviceId = (e.target as HTMLSelectElement).value;
    this._changed('device_id', deviceId);
    if (!deviceId) return;

    try {
      const entities: any[] = await this.hass.callWS({ type: 'config/entity_registry/list' });
      const deviceEntities = entities.filter((ent) => ent.device_id === deviceId);

      const configPatch: Partial<MMWaveCardConfig> = {};

      for (const ent of deviceEntities) {
        const id = ent.entity_id;
        const name = (ent.original_name || id).toLowerCase();

        const matchTargetX = id.match(/target_(\d+)_x/);
        const matchTargetY = id.match(/target_(\d+)_y/);
        const matchTargetSpeed = id.match(/target_(\d+)_speed/);

        if (id.startsWith('binary_sensor.') && (name.includes('presence') || id.includes('presence'))) {
          configPatch.presence_entity = id;
        } else if (id.startsWith('sensor.') && (name.includes('distance') || id.includes('distance') || name.includes('距离'))) {
          configPatch.distance_entity = id;
        } else if (matchTargetX) {
          configPatch[`target_${matchTargetX[1]}_x_entity` as keyof MMWaveCardConfig] = id;
        } else if (matchTargetY) {
          configPatch[`target_${matchTargetY[1]}_y_entity` as keyof MMWaveCardConfig] = id;
        } else if (matchTargetSpeed) {
          configPatch[`target_${matchTargetSpeed[1]}_speed_entity` as keyof MMWaveCardConfig] = id;
        } else if (
          id.startsWith('sensor.') &&
          (name.endsWith(' x') || id.endsWith('_x') || id.endsWith('radar_x')) &&
          !id.includes('room_x') &&
          !name.includes('room x')
        ) {
          configPatch.x_entity = id;
        } else if (
          id.startsWith('sensor.') &&
          (name.endsWith(' y') || id.endsWith('_y') || id.endsWith('radar_y')) &&
          !id.includes('room_y') &&
          !name.includes('room y')
        ) {
          configPatch.y_entity = id;
        } else if (
          id.startsWith('sensor.') &&
          (name.endsWith(' z') || id.endsWith('_z') || id.endsWith('radar_z')) &&
          !id.includes('room_z') &&
          !name.includes('room z')
        ) {
          configPatch.z_entity = id;
        } else if (id.startsWith('sensor.') && (id.includes('breath') || id.includes('respiration'))) {
          configPatch.breath_entity = id;
        } else if (id.startsWith('sensor.') && id.includes('heart')) {
          configPatch.heart_entity = id;
        } else if (id.startsWith('sensor.') && id.includes('sleep')) {
          configPatch.sleep_entity = id;
        } else if (
          id.startsWith('text.') &&
          (id.includes('polygon') ||
            name.toLowerCase().includes('polygon') ||
            name.includes('多边形') ||
            name.includes('边界'))
        ) {
          configPatch.polygon_entity = id;
        }
      }

      if (Object.keys(configPatch).length > 0) {
        this._config = { ...this._config, ...configPatch };
        this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
      }
    } catch (err) {
      console.warn('Failed to auto-populate entities from device', err);
    }
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const modelId = (this._config.radar_model ?? '') as string;
    const adapter = getAdapter(modelId);
    const models = getModelList();

    return html` <div class="card-config">
      <!-- Basic settings -->
      <h3>基础设置 (Basic Settings)</h3>
      <div class="field">
        <label>卡片标题 (Title)</label>
        <input
          type="text"
          .value=${this._config.name ?? ''}
          placeholder="人体存在雷达"
          @change=${(e: Event) => this._changed('name', (e.target as HTMLInputElement).value)}
        />
      </div>

      <!-- Model selector -->
      <h3>${this._L('editor.model')}</h3>
      <div class="field">
        <label>${this._L('editor.model')}</label>
        <select
          .value=${modelId}
          @change=${(e: Event) => this._changed('radar_model', (e.target as HTMLSelectElement).value)}
        >
          <option value="" disabled>${this._L('editor.model')}…</option>
          ${models.map((m) => html` <option value=${m.id} ?selected=${m.id === modelId}>${m.label}</option>`)}
        </select>
      </div>

      <!-- Device selector -->
      <h3>雷达设备 (Radar Device)</h3>
      <p style="font-size:12px; color:var(--secondary-text-color); margin-top:-4px;">
        一键选择设备，自动匹配下方所有实体配置
      </p>
      <div class="field">
        <label>设备</label>
        <select .value=${this._config.device_id ?? ''} @change=${this._deviceDropdownChanged}>
          <option value="">-- 选择设备 (Select Device) --</option>
          ${this._devices.map(
            (d) =>
              html` <option value=${d.id} ?selected=${d.id === this._config.device_id}>
                ${d.name_by_user || d.name || 'Unknown Device'}
              </option>`,
          )}
        </select>
      </div>

      <!-- Entity fields (model-specific) -->
      ${adapter
        ? html` <details
            style="margin-top:16px;"
            ?open=${this._advOpen}
            @toggle=${(e: Event) => (this._advOpen = (e.target as HTMLDetailsElement).open)}
          >
            <summary style="cursor:pointer; font-size:12px; color:var(--mmwave-primary); outline:none;">
              高级选项：手动指定实体 (Advanced Entities)
            </summary>
            <div style="margin-top:10px;">
              ${adapter.getEntitySchema().map(
                (f) =>
                  html` <div class="field">
                    <label>${this._L(f.labelKey)}${f.required ? '' : ' *'}</label>
                    <input
                      type="text"
                      list="entities-list"
                      .value=${(this._config[f.key] ?? '') as string}
                      @change=${(e: Event) => this._changed(f.key, (e.target as HTMLInputElement).value)}
                    />
                  </div>`,
              )}
            </div>
          </details>`
        : nothing}

      <datalist id="entities-list">
        ${(this.hass ? Object.keys(this.hass.states) : []).map((id) => html`<option value=${id}></option>`)}
      </datalist>

      <!-- Room dimensions -->
      <h3>${this._L('editor.room_dimensions')}</h3>
      <div class="field">
        <label>${this._L('editor.room_w')}</label>
        <input
          type="number"
          .value=${String(this._config.room_w ?? 400)}
          min="50"
          step="10"
          @change=${(e: Event) => this._changed('room_w', Number((e.target as HTMLInputElement).value))}
        />
      </div>
      <div class="field">
        <label>${this._L('editor.room_d')}</label>
        <input
          type="number"
          .value=${String(this._config.room_d ?? 600)}
          min="50"
          step="10"
          @change=${(e: Event) => this._changed('room_d', Number((e.target as HTMLInputElement).value))}
        />
      </div>
    </div>`;
  }

  static styles = css`
    .card-config {
      padding: 4px 0;
    }
    h3 {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      margin: 16px 0 8px;
    }
    .field {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 7px;
    }
    .field label {
      font-size: 13px;
      min-width: 150px;
      color: var(--primary-text-color);
    }
    .field ha-entity-picker,
    .field select,
    .field input {
      flex: 1;
    }
    .field select,
    .field input {
      padding: 6px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 13px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG]: MMWaveCardEditor;
  }
}
