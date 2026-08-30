/**
 * MMWave Radar HA Card  —  main orchestrator
 *
 * Responsibilities:
 *   1. Read radar_model from config, look up the adapter in the registry
 *   2. On every hass update: call adapter.readFromHass(), apply transform,
 *      push results into the active panel
 *   3. Own the CalibrationConfig state and persist it to localStorage
 *   4. Route polygon-point-added events from GeoPanel using the room
 *      dimensions to convert canvas px → room cm
 *   5. Route capture-requested events to YawPanel via offerReading()
 *
 * Panels are pure Lit elements that receive data and fire events.
 * They contain zero model-specific logic.
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';

import { getAdapter, type RadarModelAdapter } from './models';
import { applyTransform } from './utils/transform';
import { LocalFusionTracker, type FusionObservation } from './fusion/tracker';
import { parseAtomicTargetFrame } from './fusion/frame';
import { canvasToRoom, type CanvasMetrics } from './utils/canvas';
import { localize } from './localize/localize';
import { logoSvg } from './logo';
import {
  type MMWaveCardConfig,
  type CalibrationConfig,
  type RadarTarget,
  type FusionTarget,
  type FusionUpdate,
  type FusionEvent,
  type FusionHistoryPoint,
  type FusionHeatmap,
  type FusionReplay,
  type RadarSourceConfig,
  DEFAULT_CARD_CONFIG,
} from './types';
import { CARD_TAG, EDITOR_TAG, CARD_VERSION, REQUIRED_FUSION_API_VERSION } from './const';

// Sub-elements (register them)
import './panels/geo-panel';
import './panels/yaw-panel';
import './panels/live-panel';
import './panels/fusion-panel';
import type { YawPanel } from './panels/yaw-panel';
import type { LivePanel } from './panels/live-panel';
import type { FusionRadarVisual } from './panels/fusion-panel';

// ── Card registration ────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards ??= [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards.push({
  type: CARD_TAG,
  name: 'MMWave Radar HA Card',
  description: 'Multi-model mmWave radar calibration & live visualization',
  preview: true,
  documentationURL: 'https://github.com/YOUR_GITHUB_USERNAME/lovelace-mmwave-card',
});

console.info(
  `%c MMWAVE-CARD %c v${CARD_VERSION} `,
  'background:#03a9f4;color:#fff;font-weight:700',
  'background:#1c1c2e;color:#03a9f4;font-weight:700',
);

// ── Tab indices ──────────────────────────────────────────────────────────────

const TAB_GEO = 0;
const TAB_YAW = 1;
const TAB_LIVE = 2;

function configuredEntityIds(value: unknown, result = new Set<string>()): Set<string> {
  if (typeof value === 'string' && /^[a-z_]+\.[a-z0-9_]+$/.test(value)) result.add(value);
  else if (Array.isArray(value)) value.forEach((item) => configuredEntityIds(item, result));
  else if (value && typeof value === 'object')
    Object.values(value).forEach((item) => configuredEntityIds(item, result));
  return result;
}

function entitySignature(hass: HomeAssistant, source: RadarSourceConfig): string {
  const frameState = source.frame_entity ? hass.states[source.frame_entity] : undefined;
  const ids =
    frameState && parseAtomicTargetFrame(frameState.state) ? [source.frame_entity!] : [...configuredEntityIds(source)];
  return ids
    .sort()
    .map((entityId) => `${entityId}:${hass.states[entityId]?.last_updated ?? 'missing'}`)
    .join('|');
}

function sourceAvailable(hass: HomeAssistant, source: RadarSourceConfig): boolean {
  const entityIds = [...configuredEntityIds(source)];
  return entityIds.some((entityId) => {
    const state = hass.states[entityId];
    return state && state.state !== 'unavailable' && state.state !== 'unknown';
  });
}

// ── Component ────────────────────────────────────────────────────────────────

/**
 * Card config key -> the entity_id suffix the firmware publishes.
 *
 * These stopped being the same string when the component moved its own
 * settings behind `Mount …` / `Zone …` prefixes, to keep them distinguishable
 * from the radar's native ones. The config keys are the card's public schema
 * and deliberately did not change, so the two have to be mapped rather than
 * interpolated.
 */
const CALIBRATION_ENTITY_SUFFIX = {
  radar_x: 'mount_x',
  radar_y: 'mount_y',
  radar_z: 'mount_z',
  yaw: 'mount_yaw',
  pitch: 'mount_pitch',
  roll: 'mount_roll',
} as const;

@customElement(CARD_TAG)
export class MMWaveCard extends LitElement {
  // ── Lovelace public API ───────────────────────────────────────────────────

  public setConfig(config: MMWaveCardConfig): void {
    this._disconnectFusionBackend();
    if (config.radars?.length) {
      this._config = { ...DEFAULT_CARD_CONFIG, ...config } as MMWaveCardConfig;
      const roomW = this._config.room_w as number;
      const roomD = this._config.room_d as number;
      this._fusionRadars = config.radars.map((source, index) => {
        const adapter = getAdapter(source.radar_model);
        if (!adapter) throw new Error(`Unknown radar_model for radars[${index}]: "${source.radar_model}"`);
        if (adapter.info.is1DRanging) {
          throw new Error(`Radar "${source.id}" uses a ranging-only model and cannot participate in 2-D fusion.`);
        }
        const sourceConfig = { ...source, type: this._config.type, room_w: roomW, room_d: roomD } as MMWaveCardConfig;
        const errors = adapter.validateConfig(sourceConfig);
        if (errors.length) console.warn(`Radar "${source.id}" is not fully configured: ${errors.join('; ')}`);
        const defaults = adapter.getDefaultCalibration();
        const calibration: CalibrationConfig = {
          ...defaults,
          radar_x: Math.round((roomW * (index + 1)) / (config.radars!.length + 1)),
          radar_y: Math.round(roomD * 0.2),
          ...source.calibration,
          polygon: source.calibration?.polygon ?? [],
        };
        return { config: source, adapter, calibration, available: false };
      });
      this._adapter = this._fusionRadars[0].adapter;
      this._cal = this._fusionRadars[0].calibration;
      this._localFusion = new LocalFusionTracker({
        ...config.fusion,
        min_confirm_sources: config.fusion?.min_confirm_sources ?? (config.radars.length > 1 ? 2 : 1),
        track_ttl_s:
          config.fusion?.track_ttl_s ?? (config.radars.some((radar) => radar.radar_model === 'r60abd1') ? 3 : 1.2),
      });
      this._fusionTargets = [];
      this._fusionEvents = [];
      this._fusionHistoryTrack = [];
      this._selectedFusionEvent = undefined;
      this._fusionHeatmap = undefined;
      this._fusionHeatmapError = '';
      this._fusionReplay = undefined;
      this._fusionReplayError = '';
      this._fusionVideoUrl = '';
      this._localObservationBuffer = [];
      this._sourceSignatures.clear();
      this._fusionBackendState = 'connecting';
      return;
    }

    if (!config.radar_model) throw new Error('radar_model is required');

    const adapter = getAdapter(config.radar_model as string);
    if (!adapter) throw new Error(`Unknown radar_model: "${config.radar_model}". Check src/models/index.ts.`);

    const errors = adapter.validateConfig(config);
    if (errors.length) throw new Error(errors.join('; '));

    this._config = { ...DEFAULT_CARD_CONFIG, ...config } as MMWaveCardConfig;
    this._adapter = adapter;

    // Set initial defaults before loading from device
    const defaultCal = adapter.getDefaultCalibration();
    const roomW = this._config.room_w as number;
    const roomD = this._config.room_d as number;
    defaultCal.radar_x = Math.round(roomW * 0.382);
    defaultCal.radar_y = Math.round(roomD * 0.382);
    this._cal = defaultCal;
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./editor');
    return document.createElement(EDITOR_TAG) as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<MMWaveCardConfig> {
    return {
      ...DEFAULT_CARD_CONFIG,
      radar_model: 'r60abd1',
      presence_entity: 'binary_sensor.r60abd1_presence',
      x_entity: 'sensor.r60abd1_x',
      y_entity: 'sensor.r60abd1_y',
      z_entity: 'sensor.r60abd1_z',
    };
  }

  public getCardSize(): number {
    return 7;
  }

  // ── State ────────────────────────────────────────────────────────────────

  @state() private _config!: MMWaveCardConfig;
  @state() private _adapter!: RadarModelAdapter;
  @state() private _cal!: CalibrationConfig;
  @state() private _tab = TAB_GEO;
  @state() private _isCalibrating = false;

  @state() private _targets: RadarTarget[] = [];
  @state() private _present = false;
  @state() private _maxRangeM?: number;
  @state() private _syncState: 'idle' | 'syncing' | 'success' | 'error' = 'idle';
  @state() private _fusionTargets: FusionTarget[] = [];
  @state() private _fusionRadars: FusionRadarVisual[] = [];
  @state() private _fusionBackendState: 'connecting' | 'online' | 'fallback' | 'missing' | 'outdated' | 'error' =
    'connecting';
  @state() private _fusionEvents: FusionEvent[] = [];
  @state() private _fusionHistoryTrack: FusionHistoryPoint[] = [];
  @state() private _selectedFusionEvent?: FusionEvent;
  @state() private _fusionVideoUrl = '';
  @state() private _fusionHeatmap?: FusionHeatmap;
  @state() private _fusionHeatmapLoading = false;
  @state() private _fusionHeatmapError: '' | 'unsupported' | 'failed' = '';
  @state() private _fusionReplay?: FusionReplay;
  @state() private _fusionReplayLoading = false;
  @state() private _fusionReplayError: '' | 'unsupported' | 'failed' = '';
  private _deviceLoaded = false;
  private _syncResetTimer?: number;
  private _localFusion = new LocalFusionTracker();
  private _localObservationBuffer: FusionObservation[] = [];
  private _sourceSignatures = new Map<string, string>();
  private _fusionUnsubscribe?: () => void;
  private _fusionConnecting = false;

  // ── Panel refs (for imperative calls) ────────────────────────────────────

  @query('mmwave-yaw-panel') private _yawPanel?: YawPanel;
  @query('mmwave-live-panel') private _livePanel?: LivePanel;

  // ── Hass ─────────────────────────────────────────────────────────────────

  // Use getter/setter pattern so we can react to every state push.
  private _hass!: HomeAssistant;

  public set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (!this._adapter || !this._config) return;

    if (this._config.radars?.length) {
      this._updateFusionMode(hass);
      void this._connectFusionBackend();
      return;
    }

    if (!this._deviceLoaded) {
      this._deviceLoaded = true;
      this._loadFromDevice();
    }

    const reading = this._adapter.readFromHass(hass, this._config);
    this._present = reading.present;
    this._maxRangeM = reading.maxRangeM;

    // Apply transform to every target
    this._targets = reading.targets.map((t) => ({
      ...t,
      room: applyTransform(t.rawX, t.rawY, t.rawZ, this._cal),
    }));

    // Trigger Lit update naturally
    this.requestUpdate();

    // Yaw panel: if it's waiting for a capture reading, offer it
    if (this._tab === TAB_YAW && this._yawPanel) {
      const first = reading.targets[0];
      if (first) this._yawPanel.offerReading(first.rawX, first.rawY);
    }
  }

  // ── Localisation helper ──────────────────────────────────────────────────

  private _L(k: string) {
    return localize(k, this._hass?.language);
  }

  /**
   * Translate through the shared i18n system.
   *
   * Replaced a `_ui(zh, en)` helper that inlined both languages at every
   * call site. Seven files each carried their own copy, which is why the
   * card's strings were not reachable by a translator.
   */
  private _t(key: string, params?: Record<string, unknown>) {
    return localize(key, this._hass?.language, params);
  }

  private _insideTargetCount() {
    return this._targets.filter((target) => target.room?.inBoundary).length;
  }

  private _syncLabel() {
    if (this._syncState === 'syncing') return this._t('card.syncing');
    if (this._syncState === 'success') return this._t('card.synced');
    if (this._syncState === 'error') return this._t('card.sync_failed');
    return this._t('card.sync_to_device');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._syncResetTimer != null) clearTimeout(this._syncResetTimer);
    this._disconnectFusionBackend();
  }

  private _updateFusionMode(hass: HomeAssistant) {
    const now = Date.now();
    const observations: FusionObservation[] = [];
    this._fusionRadars = this._fusionRadars.map((runtime) => {
      const sourceConfig = {
        ...runtime.config,
        type: this._config.type,
        room_w: this._config.room_w,
        room_d: this._config.room_d,
      } as MMWaveCardConfig;
      const atomicState = runtime.config.frame_entity ? hass.states[runtime.config.frame_entity] : undefined;
      const atomicFrame = atomicState ? parseAtomicTargetFrame(atomicState.state) : undefined;
      const reading = atomicFrame
        ? {
            present: atomicFrame.targets.length > 0,
            targets: atomicFrame.targets.map((target, index) => {
              const scale = Number(runtime.config.frame_coordinate_scale ?? 1);
              return {
                index,
                rawX: target.x * scale,
                rawY: target.y * scale,
                rawZ: target.z * scale,
                speed: target.speed == null ? undefined : target.speed * scale,
              };
            }),
          }
        : runtime.adapter.readFromHass(hass, sourceConfig);
      const signature = entitySignature(hass, runtime.config);
      const changed = signature !== this._sourceSignatures.get(runtime.config.id);
      this._sourceSignatures.set(runtime.config.id, signature);
      if (changed) {
        for (const target of reading.targets) {
          const room = applyTransform(target.rawX, target.rawY, target.rawZ, runtime.calibration);
          observations.push({
            radarId: runtime.config.id,
            slot: target.index,
            timestamp: now,
            x: room.roomX,
            y: room.roomY,
            weight: Math.max(Number(runtime.config.measurement_weight ?? 1), 0.01),
          });
        }
      }
      return {
        ...runtime,
        available: sourceAvailable(hass, runtime.config),
      };
    });

    const inRoomObservations = observations.filter(
      (observation) =>
        observation.x >= 0 &&
        observation.x <= Number(this._config.room_w) &&
        observation.y >= 0 &&
        observation.y <= Number(this._config.room_d),
    );
    if (inRoomObservations.length) this._localObservationBuffer.push(...inRoomObservations);
    this._localObservationBuffer = this._localObservationBuffer.filter(
      (observation) => now - observation.timestamp <= 250,
    );
    const localTargets = this._localFusion.step(this._localObservationBuffer, now);
    if (this._fusionBackendState !== 'online') {
      // Still render locally so the room is not blank, but never downgrade
      // 'missing' to 'fallback': that would hide the one message telling the
      // user why persistence, events and recording are absent.
      this._fusionTargets = localTargets;
      if (this._fusionBackendState === 'connecting' && localTargets.length) this._fusionBackendState = 'fallback';
    }
    this.requestUpdate();
  }

  private async _connectFusionBackend() {
    if (this._fusionConnecting || this._fusionUnsubscribe || !this._config.radars?.length || !this._hass) return;
    this._fusionConnecting = true;
    const fusionId = this._config.fusion_id || 'home';
    try {
      if (this._config.sync_backend !== false) {
        try {
          await this._hass.callWS({
            type: 'mmwave_fusion/configure',
            config: {
              fusion_id: fusionId,
              room_w: this._config.room_w,
              room_d: this._config.room_d,
              radars: this._config.radars,
              zones: this._config.zones ?? [],
              cameras: this._config.cameras ?? [],
              fusion: this._config.fusion ?? {},
              quality: this._config.quality ?? {},
            },
          });
        } catch (error) {
          // Non-admin viewers cannot configure the backend, but may still
          // subscribe to a configuration previously saved by an administrator.
          console.info('MMWave Fusion backend configuration was not updated', error);
        }
      }
      this._fusionUnsubscribe = await this._hass.connection.subscribeMessage<FusionUpdate>(
        (update) => {
          if (update.fusion_id !== fusionId) return;
          // The backend stamps every push. A backend older than this card
          // needs is reported plainly instead of failing later on a command
          // or field it does not have.
          const backendApi = (update as { api_version?: number }).api_version ?? 0;
          if (backendApi < REQUIRED_FUSION_API_VERSION) {
            if (this._fusionBackendState !== 'outdated') {
              console.warn(
                `MMWave Fusion backend speaks api_version ${backendApi}, this card needs ` +
                  `${REQUIRED_FUSION_API_VERSION}; please update the mmwave-fusion integration`,
              );
            }
            this._fusionBackendState = 'outdated';
            this.requestUpdate();
            return;
          }
          this._fusionTargets = update.tracks;
          if (update.events.length) this._fusionEvents = [...update.events, ...this._fusionEvents].slice(0, 100);
          const health = new Map(update.radars.map((radar) => [radar.id, radar]));
          this._fusionRadars = this._fusionRadars.map((radar) => ({
            ...radar,
            available: health.get(radar.config.id)?.available ?? radar.available,
            observations: health.get(radar.config.id)?.observations,
            inRoomRatio: health.get(radar.config.id)?.in_room_ratio,
            calibrationWarning: health.get(radar.config.id)?.calibration_warning,
          }));
          this._fusionBackendState = 'online';
          this.requestUpdate();
        },
        { type: 'mmwave_fusion/subscribe', fusion_id: fusionId },
      );
      await this._loadFusionEvents();
    } catch (error) {
      // Home Assistant answers an unregistered command with unknown_command,
      // which is precisely the "integration not installed" case and is worth
      // telling the user about explicitly. Anything else is a backend that is
      // present but unhappy, where the browser fallback is the right answer.
      const code = (error as { code?: string } | undefined)?.code;
      if (code === 'unknown_command') {
        console.info('MMWave Fusion integration is not installed; multi-radar fusion needs it');
        this._fusionBackendState = 'missing';
      } else {
        console.warn('MMWave Fusion backend unavailable; using browser fallback', error);
        this._fusionBackendState = 'fallback';
      }
    } finally {
      this._fusionConnecting = false;
    }
  }

  private _disconnectFusionBackend() {
    this._fusionUnsubscribe?.();
    this._fusionUnsubscribe = undefined;
    this._fusionConnecting = false;
  }

  private async _loadFusionEvents() {
    if (!this._hass || !this._config.radars?.length) return;
    try {
      const rows = await this._hass.callWS<Array<Record<string, unknown>>>({
        type: 'mmwave_fusion/query_events',
        fusion_id: this._config.fusion_id || 'home',
        limit: 100,
      });
      this._fusionEvents = rows.map((row) => ({
        event_id: String(row.event_id),
        fusion_id: String(row.fusion_id),
        track_id: String(row.track_id),
        event_type: row.event_type as FusionEvent['event_type'],
        zone_id: String(row.zone_id),
        timestamp: Number(row.ts),
        x: Number(row.x),
        y: Number(row.y),
        clip_path: row.clip_path ? String(row.clip_path) : undefined,
        camera_entity_id: row.camera_entity_id ? String(row.camera_entity_id) : undefined,
        clip_status: row.clip_status ? (String(row.clip_status) as FusionEvent['clip_status']) : undefined,
        clip_provider: row.clip_provider ? (String(row.clip_provider) as FusionEvent['clip_provider']) : undefined,
        clip_file_size: row.clip_file_size ? Number(row.clip_file_size) : undefined,
        clip_error: row.clip_error ? String(row.clip_error) : undefined,
        metadata:
          row.metadata && typeof row.metadata === 'object' ? (row.metadata as Record<string, unknown>) : undefined,
        quality_score: row.quality_score == null ? undefined : Number(row.quality_score),
        quality_reason: row.quality_reason ? String(row.quality_reason) : undefined,
        recording_decision: row.recording_decision
          ? (String(row.recording_decision) as FusionEvent['recording_decision'])
          : undefined,
        recording_decisions: Array.isArray(row.recording_decisions)
          ? (row.recording_decisions as FusionEvent['recording_decisions'])
          : undefined,
      }));
    } catch (error) {
      console.info('MMWave Fusion history is not available', error);
    }
  }

  private async _loadFusionHeatmap(event: CustomEvent<{ hours: number; binCm: number }>) {
    if (!this._hass) return;
    this._fusionHeatmapLoading = true;
    this._fusionHeatmapError = '';
    try {
      this._fusionHeatmap = await this._hass.callWS<FusionHeatmap>({
        type: 'mmwave_fusion/query_heatmap',
        fusion_id: this._config.fusion_id || 'home',
        hours: event.detail.hours,
        bin_cm: event.detail.binCm,
      });
    } catch (error) {
      // The heatmap is the one thing this card asks of api_version 2. Rather
      // than raise the version floor and declare a working backend outdated
      // over an optional overlay, the feature alone reports that it needs a
      // newer integration and everything else keeps working.
      const code = (error as { code?: string } | undefined)?.code;
      this._fusionHeatmapError = code === 'unknown_command' ? 'unsupported' : 'failed';
      if (code !== 'unknown_command') console.warn('MMWave Fusion heatmap query failed', error);
    } finally {
      this._fusionHeatmapLoading = false;
    }
  }

  private async _loadFusionReplay(event: CustomEvent<{ since: number; until: number }>) {
    if (!this._hass) return;
    this._fusionReplayLoading = true;
    this._fusionReplayError = '';
    try {
      this._fusionReplay = await this._hass.callWS<FusionReplay>({
        type: 'mmwave_fusion/query_replay',
        fusion_id: this._config.fusion_id || 'home',
        since: event.detail.since,
        until: event.detail.until,
      });
    } catch (error) {
      // Same reasoning as the heatmap: an optional overlay does not get to
      // declare a working backend outdated, so the feature reports its own
      // requirement and the rest of the card carries on.
      const code = (error as { code?: string } | undefined)?.code;
      this._fusionReplayError = code === 'unknown_command' ? 'unsupported' : 'failed';
      if (code !== 'unknown_command') console.warn('MMWave Fusion replay query failed', error);
    } finally {
      this._fusionReplayLoading = false;
    }
  }

  private async _selectFusionEvent(event: CustomEvent<FusionEvent>) {
    this._selectedFusionEvent = event.detail;
    this._fusionVideoUrl = '';
    try {
      await this._loadFusionEvents();
      const selected = this._fusionEvents.find((item) => item.event_id === event.detail.event_id) ?? event.detail;
      this._selectedFusionEvent = selected;
      this._fusionHistoryTrack = await this._hass.callWS<FusionHistoryPoint[]>({
        type: 'mmwave_fusion/query_track',
        track_id: selected.track_id,
        limit: 10000,
      });
      if (selected.clip_path) {
        const media = await this._hass.callWS<{ url: string }>({
          type: 'media_source/resolve_media',
          media_content_id: `media-source://media_source/local/${selected.clip_path}`,
        });
        this._fusionVideoUrl = media.url;
      }
    } catch (error) {
      console.warn('Failed to load fused trajectory event', error);
    }
  }

  // ── Tab management ───────────────────────────────────────────────────────

  private _gotoTab(tab: number) {
    this._tab = tab;
    this._livePanel?.clearTrail();
    this.requestUpdate();
  }

  // ── Event handlers from panels ───────────────────────────────────────────

  /** GeoPanel fires this when the user clicks the polygon canvas. */
  private _onPolygonPointAdded(e: CustomEvent<{ canvasX: number; canvasY: number }>) {
    const cv = this.shadowRoot?.querySelector<HTMLCanvasElement>('#poly-cv');
    const W = cv?.offsetWidth ?? 400;
    const m: CanvasMetrics = {
      W,
      H: 165,
      roomW: (this._cal?.room_w ?? this._config.room_w) as number,
      roomD: (this._cal?.room_d ?? this._config.room_d) as number,
    };
    const room = canvasToRoom(e.detail.canvasX, e.detail.canvasY, m);
    const updated: CalibrationConfig = {
      ...this._cal,
      polygon: [...this._cal.polygon, room],
    };
    this._cal = updated;
    this.requestUpdate();
  }

  /** All panels fire this when calibration values change. */
  private _onCalibrationChanged(e: CustomEvent<CalibrationConfig>) {
    let cal = e.detail;
    const roomW = (cal.room_w ?? this._config.room_w) as number;
    const roomD = (cal.room_d ?? this._config.room_d) as number;

    if (cal.radar_x > roomW) cal = { ...cal, radar_x: roomW };
    if (cal.radar_y > roomD) cal = { ...cal, radar_y: roomD };

    this._cal = cal;
    this.requestUpdate();
  }

  /** YawPanel fires this when user clicks "Capture". */
  private _onCaptureRequested() {
    // Nothing extra — the hass setter already calls offerReading() on the panel.
    // This event is here in case we need to add a visual indicator in future.
  }

  // ── Device Sync ─────────────────────────────────────────────────────────

  /**
   * Derive the device's entity prefix, e.g. `ld2453_test_device`, so the
   * `number.<prefix>_yaw` calibration entities can be found.
   *
   * Both callers used to read `x_entity` alone and give up when it was unset.
   * Only ld6002 and r60abd1 declare `x_entity`; every multi-target model uses
   * `target_1_x_entity`, so for eleven of the sixteen models the card silently
   * never loaded the device's calibration and fell back to the placeholder
   * pose set in setConfig(). The `_x` branch of the single-target regex cannot
   * be reused for those: against `sensor.dev_target_1_x` it yields
   * `dev_target_1`.
   */
  private _devicePrefix(): string {
    const xEntity = (this._config?.x_entity as string) || '';
    if (xEntity) {
      const match = xEntity.match(/^sensor\.(.+?)(_radar_x|_x)$/);
      if (match) return match[1];
      const parts = xEntity.split('.')[1]?.split('_') || [];
      return parts.slice(0, parts.length - 1).join('_');
    }

    const targetEntity = (this._config?.target_1_x_entity as string) || '';
    const targetMatch = targetEntity.match(/^sensor\.(.+?)_target_\d+_x$/);
    return targetMatch ? targetMatch[1] : '';
  }

  private _loadFromDevice() {
    if (!this._hass || !this._config) return;

    const prefix = this._devicePrefix();
    if (!prefix) return;

    const cal = { ...this._cal };

    // Read numbers
    for (const [key, suffix] of Object.entries(CALIBRATION_ENTITY_SUFFIX)) {
      const stateObj = this._hass.states[`number.${prefix}_${suffix}`];
      if (stateObj && stateObj.state && !isNaN(Number(stateObj.state))) {
        cal[key as keyof typeof CALIBRATION_ENTITY_SUFFIX] = Number(stateObj.state);
      }
    }

    // Read polygon
    const polyEntity = this._config.polygon_entity || `text.${prefix}_zone_polygon`;
    const polyObj = this._hass.states[polyEntity];
    if (polyObj && polyObj.state) {
      const s = polyObj.state;
      const pts = s
        .split(';')
        .filter((x) => x.includes(','))
        .map((pt) => {
          const [x, y] = pt.split(',');
          return { x: parseFloat(x), y: parseFloat(y) };
        });
      if (pts.length > 0) cal.polygon = pts;
      else cal.polygon = [];
    } else if (polyObj && polyObj.state === '') {
      cal.polygon = [];
    }

    // Clamp to boundaries
    const roomW = (cal.room_w ?? this._config.room_w) as number;
    const roomD = (cal.room_d ?? this._config.room_d) as number;
    if (cal.radar_x > roomW) cal.radar_x = roomW;
    if (cal.radar_y > roomD) cal.radar_y = roomD;

    this._cal = cal;
    this.requestUpdate();
  }

  private async _sync() {
    const prefix = this._devicePrefix();
    if (!prefix) {
      alert('Error: neither x_entity nor target_1_x_entity is configured.');
      return;
    }

    this._syncState = 'syncing';

    try {
      // Same mapping as _loadFromDevice: the config key is not the entity
      // suffix any more, so writing back has to go through it too.
      for (const [key, suffix] of Object.entries(CALIBRATION_ENTITY_SUFFIX)) {
        const val = this._cal[key as keyof typeof CALIBRATION_ENTITY_SUFFIX];
        const entityId = `number.${prefix}_${suffix}`;
        try {
          await this._hass.callService('number', 'set_value', {
            entity_id: entityId,
            value: val,
          });
        } catch (err) {
          console.warn(`Failed to sync ${entityId}`, err);
        }
      }

      const polyStr = this._cal.polygon.map((p) => `${p.x},${p.y}`).join(';');
      const polyEntity = this._config.polygon_entity || `text.${prefix}_zone_polygon`;
      if (this._hass.states[polyEntity] !== undefined) {
        try {
          await this._hass.callService('text', 'set_value', {
            entity_id: polyEntity,
            value: polyStr,
          });
        } catch (err) {
          console.warn(`Failed to sync ${polyEntity}`, err);
        }
      }

      // Persist the same snapshot in HA so fusion cards can import this
      // device's calibration without depending on another Lovelace card.
      if (this._config.device_id && this._config.radar_model) {
        try {
          await this._hass.callWS({
            type: 'mmwave_fusion/upsert_calibration_profile',
            profile: {
              profile_id: `device:${this._config.device_id}`,
              device_id: this._config.device_id,
              radar_model: this._config.radar_model,
              name: this._adapter.info.displayName,
              calibration: this._cal,
            },
          });
        } catch (error) {
          console.info('Shared calibration profile is not available', error);
        }
      }

      this._syncState = 'success';
    } catch (e) {
      this._syncState = 'error';
      console.error(e);
    } finally {
      if (this._syncResetTimer != null) clearTimeout(this._syncResetTimer);
      this._syncResetTimer = window.setTimeout(() => (this._syncState = 'idle'), 2200);
    }
  }

  private _reset() {
    if (!confirm(this._L('actions.reset_confirm') || 'Reset to factory defaults?')) return;
    const defaultCal = this._adapter.getDefaultCalibration();
    const roomW = this._config.room_w as number;
    const roomD = this._config.room_d as number;
    defaultCal.radar_x = Math.round(roomW * 0.382);
    defaultCal.radar_y = Math.round(roomD * 0.382);
    this._cal = defaultCal;
    this._gotoTab(TAB_GEO);
  }

  // ── Render ───────────────────────────────────────────────────────────────

  protected render() {
    if (!this._config || !this._adapter) return nothing;

    if (this._config.radars?.length) return this._renderFusionMode();

    const roomW = (this._cal.room_w ?? this._config.room_w) as number;
    const roomD = (this._cal.room_d ?? this._config.room_d) as number;
    const lang = this._hass?.language ?? 'en';
    const insideTargets = this._insideTargetCount();
    const steps = [
      {
        icon: 'mdi:cube-scan',
        title: this._t('card.installation'),
        description: this._t('card.place_the_radar_in_the_3d'),
      },
      {
        icon: 'mdi:compass-outline',
        title: this._t('card.direction'),
        description: this._t('card.calibrate_yaw_with_two_reference_points'),
      },
      {
        icon: 'mdi:radar',
        title: this._t('card.live_test'),
        description: this._t('card.verify_targets_boundary_and_trails'),
      },
    ];

    // --- Everyday Live View ---
    if (!this._isCalibrating) {
      return html`
        <ha-card class="live-card">
          <header class="live-header">
            <div class="identity">
              <div class="logo-tile ${this._present ? 'online' : ''}">${logoSvg}</div>
              <div class="identity-copy">
                <div class="card-title">${this._config.name || this._t('card.presence_radar')}</div>
                <div class="card-subtitle">${this._adapter.info.displayName}</div>
              </div>
            </div>
            <div class="header-actions">
              <span class="presence-chip ${insideTargets > 0 ? 'active' : this._present ? 'filtered' : ''}">
                <i></i>
                ${insideTargets > 0
                  ? this._t('card.p0_target_p1', { p0: insideTargets, p1: insideTargets === 1 ? '' : 's' })
                  : this._present
                    ? this._t('card.outside')
                    : this._t('card.clear')}
              </span>
              <button
                class="icon-button"
                type="button"
                title=${this._t('card.open_calibration')}
                aria-label=${this._t('card.open_calibration_2')}
                @click=${() => {
                  this._isCalibrating = true;
                  this._tab = TAB_GEO;
                }}
              >
                <ha-icon icon="mdi:tune-variant"></ha-icon>
              </button>
            </div>
          </header>
          <div class="live-body">
            <mmwave-live-panel
              .adapter=${this._adapter}
              .calibration=${this._cal}
              .lang=${lang}
              .roomW=${roomW}
              .roomD=${roomD}
              .targets=${this._targets}
              .present=${this._present}
              .maxRangeM=${this._maxRangeM}
            >
            </mmwave-live-panel>
          </div>
        </ha-card>
      `;
    }

    // --- Advanced Calibration Mode ---
    return html`
      <ha-card>
        <header class="workflow-header">
          <button
            class="icon-button"
            type="button"
            title=${this._t('card.back_to_radar_view')}
            aria-label=${this._t('card.back_to_radar_view_2')}
            @click=${() => (this._isCalibrating = false)}
          >
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <div class="workflow-title">
            <strong>${this._t('card.radar_spatial_calibration')}</strong>
            <span>${this._adapter.info.displayName}</span>
          </div>
          <span class="step-count">${this._tab + 1} / ${steps.length}</span>
        </header>

        <nav class="workflow-steps" aria-label=${this._t('card.calibration_steps')}>
          ${steps.map(
            (step, index) => html`
              <button
                type="button"
                class="workflow-step ${this._tab === index ? 'current' : ''} ${this._tab > index ? 'complete' : ''}"
                aria-current=${this._tab === index ? 'step' : nothing}
                @click=${() => this._gotoTab(index)}
              >
                <span class="step-icon">
                  ${this._tab > index
                    ? html`<ha-icon icon="mdi:check"></ha-icon>`
                    : html`<ha-icon icon=${step.icon}></ha-icon>`}
                </span>
                <span class="step-copy"><strong>${step.title}</strong><small>${step.description}</small></span>
              </button>
            `,
          )}
        </nav>

        <div
          class="workflow-body"
          @calibration-changed=${this._onCalibrationChanged}
          @polygon-point-added=${this._onPolygonPointAdded}
          @capture-requested=${this._onCaptureRequested}
        >
          ${this._tab === TAB_GEO
            ? html` <mmwave-geo-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${lang}
                .roomW=${roomW}
                .roomD=${roomD}
                .maxRangeM=${this._maxRangeM}
              >
              </mmwave-geo-panel>`
            : nothing}
          ${this._tab === TAB_YAW
            ? html` <mmwave-yaw-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${lang}
                .roomW=${roomW}
                .roomD=${roomD}
                .maxRangeM=${this._maxRangeM}
              >
              </mmwave-yaw-panel>`
            : nothing}
          ${this._tab === TAB_LIVE
            ? html` <mmwave-live-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${lang}
                .roomW=${roomW}
                .roomD=${roomD}
                .targets=${this._targets}
                .present=${this._present}
                .maxRangeM=${this._maxRangeM}
                .showStatus=${true}
              >
              </mmwave-live-panel>`
            : nothing}
        </div>

        <footer class="workflow-footer">
          <div class="footer-tools">
            <button class="text-button" type="button" @click=${this._loadFromDevice}>
              <ha-icon icon="mdi:backup-restore"></ha-icon><span>${this._t('card.revert')}</span>
            </button>
            <button class="text-button danger" type="button" @click=${this._reset}>
              <ha-icon icon="mdi:restore-alert"></ha-icon><span>${this._t('card.reset')}</span>
            </button>
          </div>
          <div class="footer-actions">
            ${this._tab > TAB_GEO
              ? html`<button class="secondary-button" type="button" @click=${() => this._gotoTab(this._tab - 1)}>
                  <ha-icon icon="mdi:chevron-left"></ha-icon>${this._t('card.back')}
                </button>`
              : nothing}
            ${this._tab < TAB_LIVE
              ? html`<button class="primary-button" type="button" @click=${() => this._gotoTab(this._tab + 1)}>
                  ${this._t('card.continue')}<ha-icon icon="mdi:chevron-right"></ha-icon>
                </button>`
              : html`<button
                  class="primary-button sync ${this._syncState}"
                  type="button"
                  ?disabled=${this._syncState === 'syncing'}
                  @click=${this._sync}
                >
                  <ha-icon
                    icon=${this._syncState === 'success'
                      ? 'mdi:check-circle'
                      : this._syncState === 'error'
                        ? 'mdi:alert-circle'
                        : 'mdi:cloud-upload-outline'}
                  ></ha-icon>
                  ${this._syncLabel()}
                </button>`}
          </div>
        </footer>
      </ha-card>
    `;
  }

  private _renderFusionMode() {
    const lang = this._hass?.language ?? 'en';
    const online = this._fusionRadars.filter((radar) => radar.available).length;
    return html`
      <ha-card class="live-card fusion-card">
        <header class="live-header">
          <div class="identity">
            <div class="logo-tile ${this._fusionTargets.length ? 'online' : ''}">${logoSvg}</div>
            <div class="identity-copy">
              <div class="card-title">${this._config.name || this._t('card.multi_radar_fusion')}</div>
              <div class="card-subtitle">
                ${this._t('card.p0_p1_radars_p2', {
                  p0: online,
                  p1: this._fusionRadars.length,
                  p2: this._config.fusion_id || 'home',
                })}
              </div>
            </div>
          </div>
          <span class="presence-chip ${this._fusionTargets.length ? 'active' : ''}">
            <i></i>
            ${this._fusionTargets.length
              ? this._t('card.p0_targets', { p0: this._fusionTargets.length })
              : this._t('card.clear_2')}
          </span>
        </header>
        <div class="live-body">
          <mmwave-fusion-panel
            .roomW=${this._config.room_w}
            .roomD=${this._config.room_d}
            .radars=${this._fusionRadars}
            .targets=${this._fusionTargets}
            .zones=${this._config.zones ?? []}
            .events=${this._fusionEvents}
            .historyTrack=${this._fusionHistoryTrack}
            .selectedEventId=${this._selectedFusionEvent?.event_id ?? ''}
            .lang=${lang}
            .backendState=${this._fusionBackendState}
            .heatmap=${this._fusionHeatmap}
            .heatmapLoading=${this._fusionHeatmapLoading}
            .heatmapError=${this._fusionHeatmapError}
            @fusion-event-selected=${this._selectFusionEvent}
            @fusion-heatmap-requested=${this._loadFusionHeatmap}
            .replay=${this._fusionReplay}
            .replayLoading=${this._fusionReplayLoading}
            .replayError=${this._fusionReplayError}
            @fusion-replay-requested=${this._loadFusionReplay}
          ></mmwave-fusion-panel>
          ${this._selectedFusionEvent
            ? html`
                <section class="fusion-playback">
                  <header>
                    <strong
                      >${this._selectedFusionEvent.event_type.toUpperCase()} ·
                      ${this._selectedFusionEvent.zone_id}</strong
                    >
                    <span>${new Date(this._selectedFusionEvent.timestamp * 1000).toLocaleString()}</span>
                  </header>
                  ${this._selectedFusionEvent.quality_score != null
                    ? html`<p class="quality-detail">
                        ${this._t('card.trajectory_quality')}:
                        <strong>${this._selectedFusionEvent.quality_score}/100</strong>
                        ${this._selectedFusionEvent.quality_reason
                          ? html` · ${this._selectedFusionEvent.quality_reason}`
                          : nothing}
                      </p>`
                    : nothing}
                  ${this._fusionVideoUrl
                    ? html`<video controls preload="metadata" .src=${this._fusionVideoUrl}></video>`
                    : html`<p>
                        ${this._t('card.no_playable_clip_is_available_yet')}
                        ${this._selectedFusionEvent.clip_status
                          ? html` (${this._selectedFusionEvent.clip_status})`
                          : nothing}
                        ${this._selectedFusionEvent.clip_error
                          ? html`<br /><span class="clip-error">${this._selectedFusionEvent.clip_error}</span>`
                          : nothing}
                      </p>`}
                </section>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  // ── Styles ───────────────────────────────────────────────────────────────

  static styles = css`
    :host {
      display: block;
      --mmwave-primary: #0b825c;
      --mmwave-primary-soft: rgba(11, 130, 92, 0.1);
      --mmwave-surface: color-mix(in srgb, var(--card-background-color, #fff) 94%, var(--mmwave-primary));
      --mmwave-line: var(--divider-color, rgba(128, 128, 128, 0.18));
      --mmwave-secondary: #4b5563;
    }
    ha-card {
      background: var(--ha-card-background, var(--card-background-color, #fff));
      border-radius: var(--ha-card-border-radius, 16px);
      box-shadow: var(--ha-card-box-shadow, 0 8px 28px rgba(0, 0, 0, 0.08));
      border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, #e0e0e0));
      overflow: hidden;
      color: var(--primary-text-color);
      font-family: var(--primary-font-family, system-ui, sans-serif);
      transition: all 0.3s ease-out;
    }

    /* Header styles */
    .ha-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 16px 12px 16px;
    }
    .ha-header.calib {
      padding: 4px 8px 4px 4px;
      border-bottom: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      background: rgba(128, 128, 128, 0.05);
    }
    .ha-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .ha-title ha-icon {
      --mdc-icon-size: 24px;
    }

    #tabs {
      display: flex;
      border-bottom: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
    }
    .tab {
      flex: 1;
      padding: 12px 6px 10px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      text-align: center;
      border: none;
      background: none;
      color: var(--secondary-text-color);
      cursor: pointer;
      position: relative;
      transition: color 0.2s;
    }
    .tab:hover {
      background: rgba(128, 128, 128, 0.05);
    }
    .tab.act {
      color: var(--mmwave-primary);
    }
    .tab.act::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 15%;
      right: 15%;
      height: 2px;
      background: var(--mmwave-primary);
      border-radius: 2px 2px 0 0;
    }
    #body {
      padding: 16px;
      min-height: 270px;
    }
    #foot {
      padding: 12px 16px 16px;
      border-top: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(128, 128, 128, 0.02);
    }
    .left-btns {
      display: flex;
      gap: 8px;
    }
    .btn-sync {
      background: var(--mmwave-primary);
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.15s;
    }
    .btn-sync:hover {
      opacity: 0.9;
    }
    .btn-rst {
      background: transparent;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.3));
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .btn-rst:hover {
      background: rgba(128, 128, 128, 0.05);
    }

    .live-header,
    .workflow-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 16px;
    }
    .identity,
    .header-actions,
    .footer-tools,
    .footer-actions {
      display: flex;
      align-items: center;
    }
    .identity {
      min-width: 0;
      gap: 11px;
    }
    .logo-tile {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      flex: none;
      border: 1px solid var(--mmwave-line);
      border-radius: 12px;
      background: var(--mmwave-surface);
      opacity: 0.62;
      transition: 0.25s ease;
    }
    .logo-tile.online {
      border-color: rgba(11, 130, 92, 0.3);
      box-shadow: 0 0 0 4px rgba(11, 130, 92, 0.08);
      opacity: 1;
    }
    .identity-copy,
    .workflow-title {
      display: flex;
      min-width: 0;
      flex-direction: column;
      gap: 2px;
    }
    .card-title,
    .workflow-title strong {
      overflow: hidden;
      color: var(--primary-text-color);
      font-size: 15px;
      font-weight: 650;
      line-height: 1.25;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .card-subtitle,
    .workflow-title span {
      overflow: hidden;
      color: var(--secondary-text-color);
      font-size: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .header-actions {
      flex: none;
      gap: 8px;
    }
    .presence-chip,
    .step-count {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 9px;
      border: 1px solid var(--mmwave-line);
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.05);
      font-size: 10px;
      font-weight: 650;
      white-space: nowrap;
    }
    .presence-chip i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #9ca3af;
    }
    .presence-chip.active {
      border-color: rgba(11, 130, 92, 0.24);
      color: var(--mmwave-primary);
      background: var(--mmwave-primary-soft);
    }
    .presence-chip.active i {
      background: var(--mmwave-primary);
      box-shadow: 0 0 0 3px rgba(11, 130, 92, 0.13);
    }
    .presence-chip.filtered i {
      background: var(--warning-color, #ff9800);
    }
    .icon-button {
      width: 36px;
      height: 36px;
      display: inline-grid;
      place-items: center;
      flex: none;
      padding: 0;
      border: 1px solid var(--mmwave-line);
      border-radius: 11px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.04);
      cursor: pointer;
      transition: 0.18s ease;
    }
    .icon-button:hover {
      border-color: rgba(11, 130, 92, 0.35);
      color: var(--mmwave-primary);
      background: var(--mmwave-primary-soft);
    }
    .icon-button ha-icon {
      --mdc-icon-size: 20px;
    }
    .live-body {
      padding: 0 12px 12px;
    }
    .fusion-playback {
      margin-top: 10px;
      padding: 10px;
      border: 1px solid var(--divider-color);
      border-radius: 11px;
      background: rgba(128, 128, 128, 0.035);
    }
    .fusion-playback header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
      color: var(--primary-text-color);
      font-size: 10px;
    }
    .fusion-playback header span,
    .fusion-playback p {
      color: var(--secondary-text-color);
      font-size: 9px;
    }
    .fusion-playback .quality-detail strong {
      color: var(--primary-text-color);
    }
    .fusion-playback .clip-error {
      color: var(--error-color, #e53935);
      overflow-wrap: anywhere;
    }
    .fusion-playback video {
      display: block;
      width: 100%;
      max-height: 360px;
      border-radius: 8px;
      background: #000;
    }
    .workflow-header {
      justify-content: flex-start;
      border-bottom: 1px solid var(--mmwave-line);
      background: linear-gradient(135deg, rgba(11, 130, 92, 0.065), transparent 65%);
    }
    .workflow-title {
      flex: 1;
    }
    .workflow-steps {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--mmwave-line);
    }
    .workflow-step {
      display: flex;
      min-width: 0;
      align-items: center;
      gap: 8px;
      padding: 9px;
      border: 1px solid transparent;
      border-radius: 11px;
      color: var(--secondary-text-color);
      background: transparent;
      text-align: left;
      cursor: pointer;
      transition: 0.18s ease;
    }
    .workflow-step:hover {
      background: rgba(128, 128, 128, 0.06);
    }
    .workflow-step.current {
      border-color: rgba(11, 130, 92, 0.22);
      color: var(--mmwave-primary);
      background: var(--mmwave-primary-soft);
    }
    .workflow-step.complete {
      color: var(--mmwave-primary);
    }
    .step-icon {
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      flex: none;
      border-radius: 9px;
      background: rgba(128, 128, 128, 0.1);
    }
    .workflow-step.current .step-icon,
    .workflow-step.complete .step-icon {
      color: #fff;
      background: var(--mmwave-primary);
    }
    .step-icon ha-icon {
      --mdc-icon-size: 17px;
    }
    .step-copy {
      display: flex;
      min-width: 0;
      flex-direction: column;
      gap: 2px;
    }
    .step-copy strong {
      font-size: 11px;
      font-weight: 700;
    }
    .step-copy small {
      overflow: hidden;
      font-size: 9px;
      font-weight: 400;
      line-height: 1.25;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .workflow-body {
      min-height: 320px;
      padding: 16px;
    }
    .workflow-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 12px 16px 16px;
      border-top: 1px solid var(--mmwave-line);
      background: rgba(128, 128, 128, 0.025);
    }
    .footer-tools,
    .footer-actions {
      gap: 7px;
    }
    .text-button,
    .secondary-button,
    .primary-button {
      display: inline-flex;
      min-height: 36px;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 7px 11px;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 650;
      cursor: pointer;
      transition: 0.18s ease;
    }
    .text-button {
      padding-inline: 7px;
      border: 1px solid transparent;
      color: var(--secondary-text-color);
      background: transparent;
    }
    .text-button:hover,
    .secondary-button:hover {
      background: rgba(128, 128, 128, 0.08);
    }
    .text-button.danger:hover {
      color: var(--error-color, #ef5350);
      background: rgba(239, 83, 80, 0.08);
    }
    .secondary-button {
      border: 1px solid var(--mmwave-line);
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
    }
    .primary-button {
      border: 1px solid var(--mmwave-primary);
      color: #fff;
      background: var(--mmwave-primary);
      box-shadow: 0 5px 14px rgba(11, 130, 92, 0.2);
    }
    .primary-button:hover {
      filter: brightness(1.06);
      transform: translateY(-1px);
    }
    .primary-button:disabled {
      cursor: wait;
      opacity: 0.65;
      transform: none;
    }
    .primary-button.success {
      border-color: var(--success-color, #43a047);
      background: var(--success-color, #43a047);
    }
    .primary-button.error {
      border-color: var(--error-color, #e53935);
      background: var(--error-color, #e53935);
    }
    .text-button ha-icon,
    .secondary-button ha-icon,
    .primary-button ha-icon {
      --mdc-icon-size: 17px;
    }
    @media (max-width: 520px) {
      .workflow-steps {
        gap: 4px;
        padding-inline: 10px;
      }
      .workflow-step {
        flex-direction: column;
        gap: 4px;
        text-align: center;
      }
      .step-copy small {
        display: none;
      }
      .workflow-body {
        padding: 12px;
      }
      .workflow-footer {
        align-items: stretch;
        padding: 10px 12px 12px;
      }
      .footer-tools span {
        display: none;
      }
      .footer-actions {
        margin-left: auto;
      }
      .presence-chip {
        display: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: MMWaveCard;
  }
}
