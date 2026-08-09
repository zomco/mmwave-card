import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { getModelList, getAdapter } from './models';
import { localize } from './localize/localize';
import type {
  CalibrationConfig,
  CalibrationProfile,
  FusionSettings,
  MMWaveCardConfig,
  RadarSourceConfig,
  TrajectoryQualitySettings,
} from './types';
import type { RadarCalibrationSolution } from './fusion/calibration';
import { DEFAULT_CALIBRATION, DEFAULT_CARD_CONFIG } from './types';
import { EDITOR_TAG } from './const';
import './panels/zone-editor';
import './panels/installation-3d';
import './panels/fusion-calibration';

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
  @state() private _fusionJsonError = '';
  @state() private _calibrationProfiles: CalibrationProfile[] = [];
  @state() private _selectedFusionRadar = 0;
  @state() private _profileStatus = '';
  private _profilesLoaded = false;

  protected updated(changedProps: Map<string, unknown>) {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass && this._devices.length === 0) {
      this._loadDevices();
    }
    if (changedProps.has('hass') && this.hass && !this._profilesLoaded) {
      this._profilesLoaded = true;
      this._loadCalibrationProfiles();
    }
  }

  private async _loadDevices() {
    try {
      this._devices = await this.hass.callWS<DeviceRegistryEntry[]>({ type: 'config/device_registry/list' });
    } catch (e) {
      console.warn('Failed to load devices', e);
    }
  }

  private async _loadCalibrationProfiles() {
    try {
      this._calibrationProfiles = await this.hass.callWS<CalibrationProfile[]>({
        type: 'mmwave_fusion/list_calibration_profiles',
      });
    } catch (error) {
      console.info('Calibration profiles are not available', error);
      this._calibrationProfiles = [];
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

  private _setMode(mode: 'single' | 'fusion') {
    if (mode === 'fusion') {
      const first: RadarSourceConfig = {
        id: 'radar_1',
        radar_model: 'ld2450',
        device_id: '',
        calibration: { radar_x: 100, radar_y: 100, radar_z: 220, yaw: 0, pitch: 0, roll: 0, polygon: [] },
      };
      this._config = {
        ...this._config,
        fusion_id: this._config.fusion_id || 'home',
        sync_backend: true,
        radars: this._config.radars?.length ? this._config.radars : [first],
      };
    } else {
      this._config = { ...this._config, radars: undefined };
    }
    this._emitConfig();
  }

  private _emitConfig() {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }

  private _updateFusionRadar(index: number, patch: Partial<RadarSourceConfig>) {
    const radars = [...(this._config.radars ?? [])];
    radars[index] = { ...radars[index], ...patch };
    this._config = { ...this._config, radars };
    this._emitConfig();
  }

  private _updateRadarCalibration(index: number, key: keyof CalibrationConfig, value: number) {
    const radar = this._config.radars?.[index];
    if (!radar) return;
    this._updateFusionRadar(index, {
      calibration: { ...radar.calibration, [key]: value },
      calibration_profile_id: undefined,
      calibration_profile_revision: undefined,
    });
  }

  private _fusionInstallationChanged(index: number, event: CustomEvent<CalibrationConfig>) {
    this._updateFusionRadar(index, {
      calibration: event.detail,
      calibration_profile_id: undefined,
      calibration_profile_revision: undefined,
    });
  }

  private _addFusionRadar() {
    const radars = [...(this._config.radars ?? [])];
    const index = radars.length + 1;
    radars.push({
      id: `radar_${index}`,
      radar_model: 'ld2450',
      device_id: '',
      calibration: {
        radar_x: Math.round((Number(this._config.room_w) * index) / (index + 1)),
        radar_y: Math.round(Number(this._config.room_d) * 0.2),
        radar_z: 220,
        yaw: 0,
        pitch: 0,
        roll: 0,
        polygon: [],
      },
    });
    this._config = { ...this._config, radars };
    this._emitConfig();
  }

  private _removeFusionRadar(index: number) {
    const radars = (this._config.radars ?? []).filter((_, itemIndex) => itemIndex !== index);
    this._config = { ...this._config, radars };
    this._selectedFusionRadar = Math.max(0, Math.min(this._selectedFusionRadar, radars.length - 1));
    this._emitConfig();
  }

  private _profileChanged(index: number, event: Event) {
    const profileId = (event.target as HTMLSelectElement).value;
    if (!profileId) {
      this._updateFusionRadar(index, {
        calibration_profile_id: undefined,
        calibration_profile_revision: undefined,
      });
      return;
    }
    const profile = this._calibrationProfiles.find((item) => item.profile_id === profileId);
    if (!profile) return;
    this._updateFusionRadar(index, {
      device_id: profile.device_id,
      radar_model: profile.radar_model,
      calibration: structuredClone(profile.calibration),
      calibration_profile_id: profile.profile_id,
      calibration_profile_revision: profile.revision,
    });
    this._profileStatus = this._ui(
      `已导入 ${profile.name}（版本 ${profile.revision}）`,
      `Imported ${profile.name} (revision ${profile.revision})`,
    );
  }

  private async _fusionDeviceChanged(index: number, event: Event) {
    const deviceId = (event.target as HTMLSelectElement).value;
    this._updateFusionRadar(index, { device_id: deviceId });
    if (!deviceId) return;
    try {
      const entities = await this.hass.callWS<EntityRegistryEntry[]>({ type: 'config/entity_registry/list' });
      const patch: Partial<RadarSourceConfig> = {};
      for (const entity of entities.filter((item) => item.device_id === deviceId)) {
        const id = entity.entity_id;
        const name = (entity.original_name || id).toLowerCase();
        const x = id.match(/target_(\d+)_x/);
        const y = id.match(/target_(\d+)_y/);
        const speed = id.match(/target_(\d+)_speed/);
        if (id.startsWith('binary_sensor.') && (id.includes('presence') || name.includes('presence')))
          patch.presence_entity = id;
        else if (id.startsWith('sensor.') && (id.includes('target_frame') || name.includes('target frame')))
          patch.frame_entity = id;
        else if (x) patch[`target_${x[1]}_x_entity`] = id;
        else if (y) patch[`target_${y[1]}_y_entity`] = id;
        else if (speed) patch[`target_${speed[1]}_speed_entity`] = id;
        else if (id.startsWith('sensor.') && (id.endsWith('_x') || name.endsWith(' x'))) patch.x_entity = id;
        else if (id.startsWith('sensor.') && (id.endsWith('_y') || name.endsWith(' y'))) patch.y_entity = id;
        else if (id.startsWith('sensor.') && (id.endsWith('_z') || name.endsWith(' z'))) patch.z_entity = id;
      }
      const profile = this._calibrationProfiles.find((item) => item.device_id === deviceId);
      if (profile) {
        patch.calibration = structuredClone(profile.calibration);
        patch.calibration_profile_id = profile.profile_id;
        patch.calibration_profile_revision = profile.revision;
        this._profileStatus = this._ui(
          `已自动导入设备校准档案：${profile.name}`,
          `Imported device calibration profile: ${profile.name}`,
        );
      }
      this._updateFusionRadar(index, patch);
    } catch (error) {
      console.warn('Failed to match fusion radar entities', error);
    }
  }

  private _updateFusionJson(key: 'zones' | 'cameras', event: Event) {
    try {
      const value = JSON.parse((event.target as HTMLTextAreaElement).value) as unknown;
      if (!Array.isArray(value)) throw new Error('Value must be a JSON array');
      this._fusionJsonError = '';
      this._changed(key, value);
    } catch (error) {
      this._fusionJsonError = error instanceof Error ? error.message : String(error);
    }
  }

  private _updateFusionSetting(key: keyof FusionSettings, value: number) {
    this._changed('fusion', { ...(this._config.fusion ?? {}), [key]: value });
  }

  private _updateQualitySetting(key: keyof TrajectoryQualitySettings, value: number | boolean) {
    this._changed('quality', { ...(this._config.quality ?? {}), [key]: value });
  }

  private _fusionZonesChanged(event: CustomEvent<MMWaveCardConfig['zones']>) {
    this._changed('zones', event.detail ?? []);
  }

  private async _fusionCalibrationApplied(event: CustomEvent<{ solutions: RadarCalibrationSolution[] }>) {
    const solutionByRadar = new Map(event.detail.solutions.map((solution) => [solution.radarId, solution]));
    const radars = (this._config.radars ?? []).map((radar) => {
      const solution = solutionByRadar.get(radar.id);
      return solution ? { ...radar, calibration: solution.calibration } : radar;
    });
    this._config = { ...this._config, radars };
    this._emitConfig();
    this._profileStatus = this._ui('正在保存设备校准档案…', 'Saving device calibration profiles…');
    const saved = await Promise.all(
      radars.map(async (radar) => {
        const solution = solutionByRadar.get(radar.id);
        if (!solution || !radar.device_id) return radar;
        try {
          const profile = await this.hass.callWS<CalibrationProfile>({
            type: 'mmwave_fusion/upsert_calibration_profile',
            profile: {
              profile_id: `device:${radar.device_id}`,
              device_id: radar.device_id,
              radar_model: radar.radar_model,
              name: this._devices.find((device) => device.id === radar.device_id)?.name_by_user || radar.id,
              calibration: solution.calibration,
              residual_cm: solution.residualAfterCm,
            },
          });
          return {
            ...radar,
            calibration_profile_id: profile.profile_id,
            calibration_profile_revision: profile.revision,
          };
        } catch (error) {
          console.warn(`Failed to save calibration profile for ${radar.id}`, error);
          return radar;
        }
      }),
    );
    this._config = { ...this._config, radars: saved };
    this._emitConfig();
    await this._loadCalibrationProfiles();
    this._profileStatus = this._ui('全部校准已应用并保存。', 'All calibrations were applied and saved.');
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

  private _modeSelector(mode: 'single' | 'fusion') {
    return html`
      <div class="mode-switch" role="group" aria-label=${this._ui('运行模式', 'Operating mode')}>
        <button type="button" class=${mode === 'single' ? 'active' : ''} @click=${() => this._setMode('single')}>
          ${this._ui('单雷达', 'Single radar')}
        </button>
        <button type="button" class=${mode === 'fusion' ? 'active' : ''} @click=${() => this._setMode('fusion')}>
          ${this._ui('多雷达融合', 'Multi-radar fusion')}
        </button>
      </div>
    `;
  }

  private _renderFusionEditor() {
    const spatialModels = getModelList().filter((model) => !getAdapter(model.id)?.info.is1DRanging);
    const radars = this._config.radars ?? [];
    const selectedIndex = Math.max(0, Math.min(this._selectedFusionRadar, radars.length - 1));
    const selectedRadar = radars[selectedIndex];
    const selectedAdapter = selectedRadar ? getAdapter(selectedRadar.radar_model) : undefined;
    const selectedCalibration = selectedRadar
      ? {
          ...DEFAULT_CALIBRATION,
          ...(selectedAdapter?.getDefaultCalibration() ?? {}),
          ...(selectedRadar.calibration ?? {}),
          polygon: selectedRadar.calibration?.polygon ?? [],
        }
      : undefined;
    const peerCalibrations = radars
      .map((radar, index) => ({
        index,
        id: radar.id,
        calibration: {
          ...DEFAULT_CALIBRATION,
          ...(getAdapter(radar.radar_model)?.getDefaultCalibration() ?? {}),
          ...(radar.calibration ?? {}),
          polygon: radar.calibration?.polygon ?? [],
        },
      }))
      .filter((peer) => peer.index !== selectedIndex);
    return html`
      <div class="card-config">
        <div class="editor-hero">
          <span class="hero-icon">◎</span>
          <div>
            <strong>${this._ui('多雷达融合', 'Multi-radar fusion')}</strong>
            <p>
              ${this._ui(
                '把多台二维定位雷达放入统一户型坐标系，并同步到持续运行的 HA 后端。',
                'Place multiple 2-D radars in one floor-plan coordinate system and sync them to the persistent HA backend.',
              )}
            </p>
          </div>
        </div>
        ${this._modeSelector('fusion')}

        <h3><span>1</span>${this._ui('户型与后端', 'Floor plan and backend')}</h3>
        <div class="field">
          <label>${this._ui('卡片标题', 'Card title')}</label>
          <input
            type="text"
            .value=${this._config.name ?? ''}
            @change=${(event: Event) => this._changed('name', (event.target as HTMLInputElement).value)}
          />
        </div>
        <div class="field">
          <label>Fusion ID</label>
          <input
            type="text"
            .value=${this._config.fusion_id ?? 'home'}
            @change=${(event: Event) => this._changed('fusion_id', (event.target as HTMLInputElement).value)}
          />
        </div>
        <div class="room-grid">
          <div class="field compact">
            <label>${this._L('editor.room_w')}</label>
            <input
              type="number"
              min="50"
              step="10"
              .value=${String(this._config.room_w ?? 400)}
              @change=${(event: Event) => this._changed('room_w', Number((event.target as HTMLInputElement).value))}
            />
          </div>
          <div class="field compact">
            <label>${this._L('editor.room_d')}</label>
            <input
              type="number"
              min="50"
              step="10"
              .value=${String(this._config.room_d ?? 600)}
              @change=${(event: Event) => this._changed('room_d', Number((event.target as HTMLInputElement).value))}
            />
          </div>
        </div>
        <label class="check-row">
          <input
            type="checkbox"
            .checked=${this._config.sync_backend !== false}
            @change=${(event: Event) => this._changed('sync_backend', (event.target as HTMLInputElement).checked)}
          />
          <span
            >${this._ui(
              '管理员打开卡片时自动同步配置到后端',
              'Sync configuration to the backend when an administrator opens the card',
            )}</span
          >
        </label>

        <h3><span>2</span>${this._ui('雷达设备', 'Radar devices')}</h3>
        <p class="section-help">
          ${this._ui(
            '只显示可输出二维或三维位置的雷达型号。每台雷达必须使用唯一 ID。',
            'Only radar models with 2-D or 3-D positions are shown. Every radar needs a unique ID.',
          )}
        </p>
        <div class="radar-list">
          ${(this._config.radars ?? []).map((radar, index) => {
            const adapter = getAdapter(radar.radar_model);
            const calibration = radar.calibration ?? {};
            return html`
              <section class="radar-editor">
                <header>
                  <strong>${this._ui('雷达', 'Radar')} ${index + 1}</strong>
                  <button
                    type="button"
                    class="remove-button"
                    ?disabled=${(this._config.radars?.length ?? 0) <= 1}
                    @click=${() => this._removeFusionRadar(index)}
                  >
                    ×
                  </button>
                </header>
                <div class="two-col">
                  <div class="field compact">
                    <label>ID</label>
                    <input
                      type="text"
                      .value=${radar.id}
                      @change=${(event: Event) =>
                        this._updateFusionRadar(index, { id: (event.target as HTMLInputElement).value })}
                    />
                  </div>
                  <div class="field compact">
                    <label>${this._L('editor.model')}</label>
                    <select
                      .value=${radar.radar_model}
                      @change=${(event: Event) =>
                        this._updateFusionRadar(index, { radar_model: (event.target as HTMLSelectElement).value })}
                    >
                      ${spatialModels.map(
                        (model) =>
                          html`<option value=${model.id} ?selected=${model.id === radar.radar_model}>
                            ${model.label}
                          </option>`,
                      )}
                    </select>
                  </div>
                </div>
                <div class="field">
                  <label>${this._ui('雷达设备', 'Radar device')}</label>
                  <select
                    .value=${radar.device_id ?? ''}
                    @change=${(event: Event) => this._fusionDeviceChanged(index, event)}
                  >
                    <option value="">-- ${this._ui('选择设备', 'Select device')} --</option>
                    ${this._devices.map(
                      (device) =>
                        html`<option value=${device.id} ?selected=${device.id === radar.device_id}>
                          ${device.name_by_user || device.name || 'Unknown device'}
                        </option>`,
                    )}
                  </select>
                </div>
                <div class="field profile-field">
                  <label>${this._ui('校准档案', 'Calibration profile')}</label>
                  <select
                    .value=${radar.calibration_profile_id ?? ''}
                    @change=${(event: Event) => this._profileChanged(index, event)}
                  >
                    <option value="">${this._ui('手工配置 / 未绑定', 'Manual / not linked')}</option>
                    ${this._calibrationProfiles.map(
                      (profile) => html`
                        <option
                          value=${profile.profile_id}
                          ?selected=${profile.profile_id === radar.calibration_profile_id}
                        >
                          ${profile.name} · ${profile.radar_model} · v${profile.revision}
                        </option>
                      `,
                    )}
                  </select>
                  ${radar.calibration_profile_id
                    ? html`<small class="profile-badge">
                        ${this._ui('设备档案快照', 'Device profile snapshot')} ·
                        v${radar.calibration_profile_revision ?? '?'}
                      </small>`
                    : nothing}
                </div>
                <div class="cal-grid">
                  ${(['radar_x', 'radar_y', 'radar_z', 'yaw', 'pitch', 'roll'] as const).map(
                    (key) => html`
                      <div class="field compact">
                        <label>${key}</label>
                        <input
                          type="number"
                          step=${key === 'yaw' || key === 'pitch' || key === 'roll' ? '1' : '10'}
                          .value=${String(calibration[key] ?? (key === 'radar_z' ? 220 : 0))}
                          @change=${(event: Event) =>
                            this._updateRadarCalibration(index, key, Number((event.target as HTMLInputElement).value))}
                        />
                      </div>
                    `,
                  )}
                </div>
                ${adapter
                  ? html`
                      <details class="advanced">
                        <summary>${this._ui('实体映射', 'Entity mapping')}</summary>
                        <div class="advanced-fields">
                          ${adapter.getEntitySchema().map(
                            (field) => html`
                              <div class="field">
                                <label>${this._L(field.labelKey)}${field.required ? '' : ' *'}</label>
                                <input
                                  type="text"
                                  list="entities-list"
                                  .value=${String(radar[field.key] ?? '')}
                                  @change=${(event: Event) =>
                                    this._updateFusionRadar(index, {
                                      [field.key]: (event.target as HTMLInputElement).value,
                                    })}
                                />
                              </div>
                            `,
                          )}
                        </div>
                      </details>
                    `
                  : nothing}
              </section>
            `;
          })}
        </div>
        <button class="add-button" type="button" @click=${this._addFusionRadar}>
          ＋ ${this._ui('添加雷达', 'Add radar')}
        </button>
        ${this._profileStatus ? html`<div class="profile-status">${this._profileStatus}</div>` : nothing}

        <h3><span>3</span>${this._ui('交互式安装定位', 'Interactive installation')}</h3>
        <p class="section-help">
          ${this._ui(
            '在同一房间模型中选择雷达，并拖动彩色控制柄调整位置、高度和姿态。其他雷达会作为灰色参照保留。',
            'Select a radar in the shared room model, then drag the handles to adjust its position, height and orientation. Other radars remain as gray landmarks.',
          )}
        </p>
        <div class="radar-selector">
          ${radars.map(
            (radar, index) => html`
              <button
                type="button"
                class=${index === selectedIndex ? 'active' : ''}
                @click=${() => (this._selectedFusionRadar = index)}
              >
                ${radar.id}<small>${radar.radar_model}</small>
              </button>
            `,
          )}
        </div>
        ${selectedRadar && selectedAdapter && selectedCalibration
          ? html`
              <mmwave-installation-3d
                .adapter=${selectedAdapter}
                .calibration=${selectedCalibration}
                .peerCalibrations=${peerCalibrations}
                .lang=${this.hass.language}
                .roomW=${Number(this._config.room_w ?? 400)}
                .roomD=${Number(this._config.room_d ?? 600)}
                .maxRangeM=${selectedAdapter.info.maxRangeM}
                @calibration-changed=${(event: CustomEvent<CalibrationConfig>) =>
                  this._fusionInstallationChanged(selectedIndex, event)}
              ></mmwave-installation-3d>
            `
          : nothing}

        <h3><span>4</span>${this._ui('多雷达联合方向校准', 'Joint multi-radar calibration')}</h3>
        <p class="section-help">
          ${this._ui(
            '同一个参考位置会同步采集全部雷达，并为每台设备独立计算 yaw 与 X/Y 修正。',
            'Each shared reference position captures every radar and independently solves yaw and X/Y corrections for each device.',
          )}
        </p>
        <mmwave-fusion-calibration
          .hass=${this.hass}
          .radars=${radars}
          .roomW=${Number(this._config.room_w ?? 400)}
          .roomD=${Number(this._config.room_d ?? 600)}
          .lang=${this.hass.language}
          @fusion-calibration-applied=${this._fusionCalibrationApplied}
        ></mmwave-fusion-calibration>

        <h3><span>5</span>${this._ui('融合与录像规则', 'Fusion and recording rules')}</h3>
        <p class="section-help">
          ${this._ui(
            '过滤单雷达误报，并在轨迹结束后只为完整、连续的穿越轨迹保存录像。',
            'Filter single-radar false alarms and save recordings only for complete, continuous crossings after a track ends.',
          )}
        </p>
        <div class="rules-grid">
          <div class="field compact">
            <label>${this._ui('最少支持雷达数', 'Minimum supporting radars')}</label>
            <input
              type="number"
              min="1"
              max=${String(Math.max(1, this._config.radars?.length ?? 1))}
              step="1"
              .value=${String(
                this._config.fusion?.min_confirm_sources ?? Math.min(2, this._config.radars?.length ?? 1),
              )}
              @change=${(event: Event) =>
                this._updateFusionSetting('min_confirm_sources', Number((event.target as HTMLInputElement).value))}
            />
          </div>
          <div class="field compact">
            <label>${this._ui('融合距离 (cm)', 'Merge distance (cm)')}</label>
            <input
              type="number"
              min="20"
              step="5"
              .value=${String(this._config.fusion?.merge_gate_cm ?? 70)}
              @change=${(event: Event) =>
                this._updateFusionSetting('merge_gate_cm', Number((event.target as HTMLInputElement).value))}
            />
          </div>
          <div class="field compact">
            <label>${this._ui('轨迹结束等待 (s)', 'Track end delay (s)')}</label>
            <input
              type="number"
              min="0.5"
              step="0.1"
              .value=${String(this._config.fusion?.track_ttl_s ?? 1.8)}
              @change=${(event: Event) =>
                this._updateFusionSetting('track_ttl_s', Number((event.target as HTMLInputElement).value))}
            />
          </div>
          <div class="field compact">
            <label>${this._ui('录像最低评分', 'Recording score')}</label>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              .value=${String(this._config.quality?.min_score ?? 70)}
              @change=${(event: Event) =>
                this._updateQualitySetting('min_score', Number((event.target as HTMLInputElement).value))}
            />
          </div>
          <div class="field compact">
            <label>${this._ui('最短持续时间 (s)', 'Minimum duration (s)')}</label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              .value=${String(this._config.quality?.min_duration_s ?? 3)}
              @change=${(event: Event) =>
                this._updateQualitySetting('min_duration_s', Number((event.target as HTMLInputElement).value))}
            />
          </div>
          <div class="field compact">
            <label>${this._ui('最短位移 (cm)', 'Minimum displacement (cm)')}</label>
            <input
              type="number"
              min="20"
              step="10"
              .value=${String(this._config.quality?.min_displacement_cm ?? 120)}
              @change=${(event: Event) =>
                this._updateQualitySetting('min_displacement_cm', Number((event.target as HTMLInputElement).value))}
            />
          </div>
          <div class="field compact">
            <label>${this._ui('边界判定范围 (cm)', 'Boundary margin (cm)')}</label>
            <input
              type="number"
              min="10"
              step="10"
              .value=${String(this._config.quality?.boundary_margin_cm ?? 60)}
              @change=${(event: Event) =>
                this._updateQualitySetting('boundary_margin_cm', Number((event.target as HTMLInputElement).value))}
            />
          </div>
        </div>
        <label class="check-row">
          <input
            type="checkbox"
            .checked=${this._config.quality?.require_enter_exit !== false}
            @change=${(event: Event) =>
              this._updateQualitySetting('require_enter_exit', (event.target as HTMLInputElement).checked)}
          />
          <span>${this._ui('只保存完整穿越轨迹', 'Record complete crossings only')}</span>
        </label>
        <div class="test-hint">
          <strong>${this._ui('录像测试方法', 'Recording test')}</strong>
          <span>
            ${this._ui(
              `从房间一侧边缘进入，连续行走至少 ${this._config.quality?.min_displacement_cm ?? 120} cm 并从另一侧边缘离开；离开雷达范围后等待 ${this._config.fusion?.track_ttl_s ?? 1.8} 秒。合格事件会由 TRAJECTORY 变为 TRAVERSE 并触发摄像头。`,
              `Enter near one room edge, walk continuously for at least ${this._config.quality?.min_displacement_cm ?? 120} cm, and leave at another edge. Wait ${this._config.fusion?.track_ttl_s ?? 1.8} seconds after leaving radar coverage. A qualified event becomes TRAVERSE and triggers the camera.`,
            )}
          </span>
        </div>

        <h3><span>6</span>${this._ui('事件区域与摄像头', 'Event zones and cameras')}</h3>
        <p class="section-help">
          ${this._ui(
            '在户型图上点击添加区域顶点，保存后同步到融合后端。',
            'Draw polygon vertices on the floor plan. Saved zones are synchronized to the fusion backend.',
          )}
        </p>
        <mmwave-zone-editor
          .roomW=${Number(this._config.room_w ?? 400)}
          .roomD=${Number(this._config.room_d ?? 600)}
          .zones=${this._config.zones ?? []}
          .radars=${this._config.radars ?? []}
          .lang=${this.hass.language}
          @zones-changed=${this._fusionZonesChanged}
        ></mmwave-zone-editor>
        <div class="json-field">
          <label>Cameras JSON</label>
          <textarea
            rows="7"
            .value=${JSON.stringify(this._config.cameras ?? [], null, 2)}
            @change=${(event: Event) => this._updateFusionJson('cameras', event)}
          ></textarea>
        </div>
        ${this._fusionJsonError ? html`<div class="json-error">${this._fusionJsonError}</div>` : nothing}

        <datalist id="entities-list">
          ${Object.keys(this.hass.states).map((id) => html`<option value=${id}></option>`)}
        </datalist>
      </div>
    `;
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const modelId = (this._config.radar_model ?? '') as string;
    const adapter = getAdapter(modelId);
    const models = getModelList();

    if (this._config.radars?.length) return this._renderFusionEditor();

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
      ${this._modeSelector('single')}

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
      max-width: 100%;
      overflow-x: hidden;
    }
    .card-config {
      box-sizing: border-box;
      max-width: 100%;
      min-width: 0;
      padding: 4px 2px 12px;
    }
    .mode-switch {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
      margin: 10px 0 2px;
      padding: 4px;
      border: 1px solid var(--mmwave-line);
      border-radius: 10px;
      background: rgba(128, 128, 128, 0.045);
    }
    .mode-switch button,
    .add-button,
    .remove-button {
      border: 0;
      border-radius: 7px;
      color: var(--secondary-text-color);
      background: transparent;
      font-size: 10px;
      cursor: pointer;
    }
    .mode-switch button {
      padding: 7px;
    }
    .mode-switch button.active {
      color: #fff;
      background: var(--mmwave-primary);
      font-weight: 700;
    }
    .check-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 9px;
      padding: 9px 10px;
      border-radius: 9px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.045);
      font-size: 10px;
    }
    .check-row input {
      accent-color: var(--mmwave-primary);
    }
    .radar-list {
      display: grid;
      gap: 10px;
      min-width: 0;
    }
    .radar-editor {
      box-sizing: border-box;
      max-width: 100%;
      min-width: 0;
      overflow: hidden;
      padding: 10px;
      border: 1px solid var(--mmwave-line);
      border-radius: 12px;
      background: rgba(128, 128, 128, 0.025);
    }
    .radar-editor > header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      color: var(--primary-text-color);
      font-size: 11px;
    }
    .remove-button {
      width: 24px;
      height: 24px;
      color: var(--error-color, #e53935);
      background: rgba(229, 57, 53, 0.08);
      font-size: 16px;
    }
    .remove-button:disabled {
      opacity: 0.35;
      cursor: default;
    }
    .two-col,
    .cal-grid,
    .rules-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 7px;
      min-width: 0;
    }
    .cal-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .radar-editor .field {
      margin-bottom: 7px;
    }
    .profile-field {
      position: relative;
    }
    .profile-badge {
      flex: none;
      padding: 3px 6px;
      border-radius: 999px;
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.08);
      font-size: 8px;
      white-space: nowrap;
    }
    .add-button {
      width: 100%;
      margin-top: 9px;
      padding: 9px;
      border: 1px dashed rgba(11, 130, 92, 0.4);
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.05);
      font-weight: 700;
    }
    .profile-status {
      margin-top: 7px;
      padding: 8px 10px;
      border-radius: 8px;
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.07);
      font-size: 10px;
    }
    .radar-selector {
      display: flex;
      gap: 6px;
      margin-bottom: 8px;
      overflow-x: auto;
      scrollbar-width: thin;
    }
    .radar-selector button {
      display: grid;
      gap: 1px;
      min-width: 78px;
      padding: 7px 10px;
      border: 1px solid var(--mmwave-line);
      border-radius: 9px;
      color: var(--primary-text-color);
      background: rgba(128, 128, 128, 0.035);
      font: inherit;
      font-size: 10px;
      font-weight: 700;
      cursor: pointer;
    }
    .radar-selector button.active {
      border-color: rgba(11, 130, 92, 0.5);
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.08);
    }
    .radar-selector small {
      color: var(--secondary-text-color);
      font-size: 8px;
      font-weight: 500;
    }
    mmwave-installation-3d,
    mmwave-fusion-calibration {
      display: block;
      max-width: 100%;
      min-width: 0;
    }
    .json-field {
      display: grid;
      gap: 5px;
      margin-bottom: 9px;
    }
    .json-field label {
      color: var(--primary-text-color);
      font-size: 10px;
      font-weight: 700;
    }
    .json-field textarea {
      box-sizing: border-box;
      width: 100%;
      padding: 8px;
      border: 1px solid var(--mmwave-line);
      border-radius: 9px;
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
      font:
        9px ui-monospace,
        monospace;
      resize: vertical;
    }
    .json-error {
      padding: 7px 9px;
      border-radius: 8px;
      color: var(--error-color, #e53935);
      background: rgba(229, 57, 53, 0.08);
      font-size: 9px;
    }
    .test-hint {
      display: grid;
      gap: 4px;
      margin-top: 9px;
      padding: 10px 12px;
      border-left: 3px solid var(--mmwave-primary);
      border-radius: 8px;
      color: var(--secondary-text-color);
      background: rgba(11, 130, 92, 0.065);
      font-size: 10px;
      line-height: 1.5;
    }
    .test-hint strong {
      color: var(--primary-text-color);
      font-size: 11px;
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
      box-sizing: border-box;
      display: flex;
      max-width: 100%;
      min-width: 0;
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
      box-sizing: border-box;
      flex: 1;
      max-width: 100%;
      min-width: 0;
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
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      min-width: 0;
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
      .cal-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .rules-grid {
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
