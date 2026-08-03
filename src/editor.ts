import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { getModelList, getAdapter } from './models';
import { localize } from './localize/localize';
import type { MMWaveCardConfig } from './types';
import { DEFAULT_CARD_CONFIG } from './types';
import { EDITOR_TAG } from './const';

interface DeviceRegistryEntry {
  id: string;
  name?: string;
  name_by_user?: string;
}

interface EntityRegistryEntry {
  device_id?: string;
  entity_id: string;
  original_name?: string;
}

@customElement(EDITOR_TAG)
export class MMWaveCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) private _config!: MMWaveCardConfig;

  @state() private _devices: DeviceRegistryEntry[] = [];
  @state() private _advOpen = false;
  @state() private _deviceStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  @state() private _matchedEntities = 0;

  protected updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass && this._devices.length === 0) {
      this._loadDevices();
    }
  }

  private async _loadDevices() {
    try {
      this._devices = await this.hass.callWS<DeviceRegistryEntry[]>({ type: 'config/device_registry/list' });
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

  private _ui(zh: string, en: string) {
    return (this.hass?.language ?? 'en').toLowerCase().startsWith('zh') ? zh : en;
  }

  private _changed(key: string, value: unknown) {
    this._config = { ...this._config, [key]: value };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }

  private async _deviceDropdownChanged(e: Event) {
    const deviceId = (e.target as HTMLSelectElement).value;
    this._changed('device_id', deviceId);
    if (!deviceId) {
      this._deviceStatus = 'idle';
      this._matchedEntities = 0;
      return;
    }

    this._deviceStatus = 'loading';

    try {
      const entities = await this.hass.callWS<EntityRegistryEntry[]>({ type: 'config/entity_registry/list' });
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
        } else if (
          id.startsWith('sensor.') &&
          (name.includes('distance') || id.includes('distance') || name.includes('距离'))
        ) {
          configPatch.distance_entity = id;
        } else if (
          id.startsWith('sensor.') &&
          (name.includes('motion_state') ||
            id.includes('motion_state') ||
            name.includes('运动状态') ||
            name.includes('target_state') ||
            id.includes('target_state') ||
            name.includes('目标状态'))
        ) {
          configPatch.motion_state_entity = id;
          configPatch.target_state_entity = id;
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
      this._matchedEntities = Object.keys(configPatch).length;
      this._deviceStatus = this._matchedEntities > 0 ? 'success' : 'error';
    } catch (err) {
      this._deviceStatus = 'error';
      console.warn('Failed to auto-populate entities from device', err);
    }
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const modelId = (this._config.radar_model ?? '') as string;
    const adapter = getAdapter(modelId);
    const models = getModelList();

    return html` <div class="card-config">
      <div class="editor-hero">
        <span class="hero-icon">◎</span>
        <div>
          <strong>${this._ui('毫米波雷达卡片', 'MMWave radar card')}</strong>
          <p>
            ${this._ui(
              '选择雷达设备后自动完成实体匹配，只需确认房间尺寸即可开始。',
              'Choose a radar device to match entities automatically, then confirm the room size.',
            )}
          </p>
        </div>
      </div>

      <!-- Basic settings -->
      <h3><span>1</span>${this._ui('基本信息', 'Basics')}</h3>
      <div class="field">
        <label>${this._ui('卡片标题', 'Card title')}</label>
        <input
          type="text"
          .value=${this._config.name ?? ''}
          placeholder=${this._ui('人体存在雷达', 'Presence radar')}
          @change=${(e: Event) => this._changed('name', (e.target as HTMLInputElement).value)}
        />
      </div>

      <!-- Model selector -->
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
      <h3><span>2</span>${this._ui('连接雷达设备', 'Connect radar device')}</h3>
      <p class="section-help">
        ${this._ui(
          '从 Home Assistant 设备列表中选择雷达，卡片会自动识别所需实体。',
          'Select the radar from Home Assistant and the card will identify the required entities.',
        )}
      </p>
      <div class="field">
        <label>${this._ui('雷达设备', 'Radar device')}</label>
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
      ${this._deviceStatus !== 'idle'
        ? html`<div class="match-status ${this._deviceStatus}">
            <span>${this._deviceStatus === 'loading' ? '···' : this._deviceStatus === 'success' ? '✓' : '!'}</span>
            ${this._deviceStatus === 'loading'
              ? this._ui('正在识别设备实体…', 'Detecting device entities…')
              : this._deviceStatus === 'success'
                ? this._ui(
                    `已自动匹配 ${this._matchedEntities} 个配置项`,
                    `Matched ${this._matchedEntities} configuration fields`,
                  )
                : this._ui(
                    '自动识别失败，请展开高级选项手动配置。',
                    'Automatic detection failed. Configure entities manually below.',
                  )}
          </div>`
        : ''}

      <!-- Room dimensions -->
      <h3><span>3</span>${this._L('editor.room_dimensions')}</h3>
      <p class="section-help">
        ${this._ui(
          '填写房间实际尺寸，后续 3D 安装定位和轨迹显示会使用此比例。',
          'Enter the room dimensions used by the 3D placement and target map.',
        )}
      </p>
      <div class="room-grid">
        <div class="field compact">
          <label>${this._L('editor.room_w')}</label>
          <input
            type="number"
            .value=${String(this._config.room_w ?? 400)}
            min="50"
            step="10"
            @change=${(e: Event) => this._changed('room_w', Number((e.target as HTMLInputElement).value))}
          />
        </div>
        <div class="field compact">
          <label>${this._L('editor.room_d')}</label>
          <input
            type="number"
            .value=${String(this._config.room_d ?? 600)}
            min="50"
            step="10"
            @change=${(e: Event) => this._changed('room_d', Number((e.target as HTMLInputElement).value))}
          />
        </div>
      </div>

      <!-- Entity fields (model-specific) -->
      ${adapter
        ? html` <details
            class="advanced"
            ?open=${this._advOpen}
            @toggle=${(e: Event) => (this._advOpen = (e.target as HTMLDetailsElement).open)}
          >
            <summary>
              <span>${this._ui('高级选项：手动指定实体', 'Advanced: assign entities manually')}</span>
              <small>${this._ui('故障排查', 'Troubleshooting')}</small>
            </summary>
            <div class="advanced-fields">
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
    </div>`;
  }

  static styles = css`
    :host {
      --mmwave-primary: #0b825c;
      --mmwave-line: var(--divider-color, rgba(128, 128, 128, 0.18));
      display: block;
    }
    .card-config {
      padding: 4px 2px 12px;
    }
    .editor-hero {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px;
      border: 1px solid rgba(11, 130, 92, 0.2);
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(11, 130, 92, 0.1), rgba(3, 169, 244, 0.04));
    }
    .hero-icon {
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      flex: none;
      border-radius: 10px;
      color: #fff;
      background: var(--mmwave-primary);
      font-size: 18px;
    }
    .editor-hero strong {
      color: var(--primary-text-color);
      font-size: 13px;
    }
    .editor-hero p,
    .section-help {
      margin: 3px 0 0;
      color: var(--secondary-text-color);
      font-size: 10px;
      line-height: 1.5;
    }
    h3 {
      display: flex;
      align-items: center;
      gap: 7px;
      margin: 18px 0 8px;
      color: var(--primary-text-color);
      font-size: 12px;
      font-weight: 700;
    }
    h3 span {
      width: 20px;
      height: 20px;
      display: grid;
      place-items: center;
      border-radius: 7px;
      color: #fff;
      background: var(--mmwave-primary);
      font-size: 10px;
    }
    .section-help {
      margin: -3px 0 9px 27px;
    }
    .field {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
      padding: 9px 10px;
      border: 1px solid var(--mmwave-line);
      border-radius: 10px;
      background: rgba(128, 128, 128, 0.035);
      transition: 0.18s ease;
    }
    .field:focus-within {
      border-color: rgba(11, 130, 92, 0.45);
      box-shadow: 0 0 0 3px rgba(11, 130, 92, 0.07);
    }
    .field label {
      min-width: 130px;
      color: var(--primary-text-color);
      font-size: 11px;
      font-weight: 600;
    }
    .field ha-entity-picker,
    .field select,
    .field input {
      flex: 1;
    }
    .field select,
    .field input {
      min-width: 0;
      padding: 7px 8px;
      border: 1px solid var(--mmwave-line);
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 11px;
      outline: none;
    }
    .match-status {
      display: flex;
      align-items: center;
      gap: 7px;
      margin: 3px 0 10px;
      padding: 8px 10px;
      border-radius: 9px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.06);
      font-size: 10px;
    }
    .match-status > span {
      width: 18px;
      height: 18px;
      display: grid;
      place-items: center;
      flex: none;
      border-radius: 50%;
      color: #fff;
      background: #9ca3af;
      font-weight: 750;
    }
    .match-status.success {
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.08);
    }
    .match-status.success > span {
      background: var(--mmwave-primary);
    }
    .match-status.error {
      color: var(--error-color, #e53935);
      background: rgba(229, 57, 53, 0.07);
    }
    .match-status.error > span {
      background: var(--error-color, #e53935);
    }
    .room-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .room-grid .field {
      margin: 0;
    }
    .field.compact {
      align-items: stretch;
      flex-direction: column;
      gap: 6px;
    }
    .field.compact label {
      min-width: 0;
    }
    .advanced {
      margin-top: 16px;
      overflow: hidden;
      border: 1px solid var(--mmwave-line);
      border-radius: 11px;
      background: rgba(128, 128, 128, 0.025);
    }
    .advanced summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 10px 12px;
      color: var(--secondary-text-color);
      font-size: 10px;
      font-weight: 650;
      cursor: pointer;
    }
    .advanced summary small {
      padding: 2px 6px;
      border-radius: 999px;
      background: rgba(128, 128, 128, 0.09);
      font-size: 8px;
    }
    .advanced-fields {
      padding: 0 7px 7px;
    }
    @media (max-width: 500px) {
      .field:not(.compact) {
        align-items: stretch;
        flex-direction: column;
        gap: 6px;
      }
      .field label {
        min-width: 0;
      }
      .room-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG]: MMWaveCardEditor;
  }
}
