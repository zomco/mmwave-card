/**
 * Shared types used across the card, all panels, and model adapters.
 * Model-specific types live in src/models/<model>/types.ts.
 */

import type { LovelaceCardConfig, ActionConfig } from 'custom-card-helpers';

// ── Geometry ──────────────────────────────────────────────────────────────────

export interface Vec2 {
  x: number;
  y: number;
}

// ── Calibration ───────────────────────────────────────────────────────────────

export interface CalibrationConfig {
  /** Room width override (cm). Falls back to card config if undefined. */
  room_w?: number;
  /** Room depth override (cm). Falls back to card config if undefined. */
  room_d?: number;
  /** Radar installation position in room coordinate system (cm). */
  radar_x: number;
  radar_y: number;
  /** Radar installation height above floor (cm). */
  radar_z: number;
  /** Yaw angle: deviation of radar forward axis from room Y-axis, clockwise positive (°). */
  yaw: number;
  /** Pitch angle: forward tilt, positive = tilted forward (°). */
  pitch: number;
  /** Roll angle: sideways tilt, positive = tilted right (°). */
  roll: number;
  /** Room boundary polygon in room coordinate system (cm). Empty = no filtering. */
  polygon: Vec2[];
}

export const DEFAULT_CALIBRATION: CalibrationConfig = {
  radar_x: 0,
  radar_y: 0,
  radar_z: 220,
  yaw: 0,
  pitch: 0,
  roll: 0,
  polygon: [],
};

// ── Coordinate transform result ───────────────────────────────────────────────

export interface TransformResult {
  roomX: number;
  roomY: number;
  /** Target height above floor (cm). Only meaningful when radar has Z axis. */
  roomZ: number;
  /** Whether the target is inside the room boundary polygon. */
  inBoundary: boolean;
}

// ── Radar reading (model-agnostic) ────────────────────────────────────────────

export interface RadarTarget {
  /** Zero-based index (always 0 for single-target models). */
  index: number;
  /** Raw coordinates in radar local coordinate system (cm). */
  rawX: number;
  rawY: number;
  /** Raw Z; 0 when the model has no Z axis. */
  rawZ: number;
  /** Radial speed (cm/s); undefined when not reported. */
  speed?: number;
  /** Transformed room coordinates (populated by the card after calibration). */
  room?: TransformResult;
}

export interface RadarReading {
  present: boolean;
  targets: RadarTarget[];
  maxRangeM?: number;
}

// ── Multi-radar fusion ─────────────────────────────────────────────────────

/** One independently calibrated radar placed on the shared floor plan. */
export interface RadarSourceConfig {
  id: string;
  radar_model: string;
  device_id?: string;
  calibration?: Partial<CalibrationConfig>;
  /** Relative trust used when overlapping observations are combined. */
  measurement_weight?: number;
  /** Override the adapter/backend model coordinate conversion. */
  coordinate_scale?: number;
  /** Optional versioned atomic frame entity; preferred over split X/Y entities. */
  frame_entity?: string;
  /** Atomic frame coordinate-to-centimetre conversion; v1 defaults to cm (1). */
  frame_coordinate_scale?: number;
  /** Atomic frame sources older than this are reported offline. */
  frame_stale_after_s?: number;
  /** Model-specific HA entity mappings. */
  [key: string]: unknown;
}

export interface FusionZoneConfig {
  id: string;
  name?: string;
  polygon: Vec2[];
  dwell_s?: number;
}

export interface FusionCameraConfig {
  entity_id: string;
  zones?: string[];
  event_types?: Array<'enter' | 'exit' | 'dwell'>;
  lookback?: number;
  duration?: number;
  /** Minimum interval between clips for the same camera, zone and event type. */
  cooldown_s?: number;
  /** ha_live uses camera.record; Hikvision providers read an already-recorded interval. */
  recording_source?: 'ha_live' | 'hikvision_sd' | 'hikvision_nvr';
  track_id?: number;
  archive_host?: string;
  http_port?: number;
  rtsp_port?: number;
  archive_settle_s?: number;
  archive_retry_interval_s?: number;
  archive_retries?: number;
}

export interface FusionSettings {
  rate_hz?: number;
  association_gate_cm?: number;
  merge_gate_cm?: number;
  track_ttl_s?: number;
  confirm_hits?: number;
}

export interface FusionTarget {
  track_id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  confidence: number;
  sources: string[];
  started_at: number;
  last_seen: number;
}

export interface FusionUpdate {
  fusion_id: string;
  timestamp: number;
  tracks: FusionTarget[];
  events: FusionEvent[];
  radars: Array<{ id: string; available: boolean; last_updated?: number; age_s?: number; stale?: boolean }>;
}

export interface FusionEvent {
  event_id: string;
  fusion_id: string;
  track_id: string;
  event_type: 'enter' | 'exit' | 'dwell';
  zone_id: string;
  timestamp: number;
  x: number;
  y: number;
  clip_path?: string;
  camera_entity_id?: string;
  clip_status?: 'requested' | 'waiting' | 'extracting' | 'ready' | 'failed';
  clip_provider?: 'ha_live' | 'hikvision_sd' | 'hikvision_nvr';
  clip_file_size?: number;
}

export interface FusionHistoryPoint {
  ts: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  confidence: number;
  sources: string;
}

// ── Model capabilities ────────────────────────────────────────────────────────

export interface RadarModelInfo {
  /** Unique identifier used in the card YAML config. */
  id: string;
  /** Human-readable name shown in the editor drop-down. */
  displayName: string;
  /** Horizontal field-of-view (degrees). */
  fovDegrees: number;
  /**
   * Vertical field-of-view (degrees). Omit when the manual does not publish
   * a separate vertical beam angle; the 3-D preview will use a conservative
   * visual estimate and label it as such.
   */
  verticalFovDegrees?: number;
  /** Maximum detection range (m). */
  maxRangeM: number;
  /**
   * Minimum detection range (m) — blind zone, targets closer are not detected.
   * R60ABD1: 0.4 m (§5.1).
   */
  minRangeM: number;
  /**
   * Inner boundary for vital-sign (breath / heart rate) detection (m).
   * Targets beyond this but within maxRangeM can still be detected for
   * presence/sleep. Set to undefined if the model has only one range.
   * R60ABD1: 1.5 m breath/HR vs 2.5 m presence/sleep (§6.2).
   */
  vitalRangeM?: number;
  /** Effective position update rate (Hz). Used for trail sizing. */
  updateRateHz: number;
  /** Maximum simultaneous targets reported. */
  maxTargets: number;
  /** Whether the model outputs a Z coordinate. */
  hasZAxis: boolean;
  /** Whether the model outputs breathing rate. */
  hasBreathing: boolean;
  /** Whether the model outputs heart rate. */
  hasHeartRate: boolean;
  /** Whether the model outputs sleep monitoring data. */
  hasSleep: boolean;
  /**
   * When true, this model only reports 1-D ranging (distance) without horizontal angle/X coordinates.
   * Targets are rendered as concentric circular arcs across the FOV sector instead of point dots.
   */
  is1DRanging?: boolean;
}

// ── Entity schema (for the visual editor) ────────────────────────────────────

export interface EntitySchemaField {
  /** Config key (e.g. "presence_entity"). */
  key: string;
  /** i18n key for the label (e.g. "editor.presence_entity"). */
  labelKey: string;
  required: boolean;
  /** HA entity domain hint for the picker. */
  domain?: string;
}

// ── Card-level Lovelace config ────────────────────────────────────────────────

export interface MMWaveCardConfig extends LovelaceCardConfig {
  /**
   * Radar model identifier.
   * Must match a key in the model registry (src/models/index.ts).
   */
  radar_model?: string;
  /** HA Device ID for auto-population */
  device_id?: string;
  sleep_state_entity?: string;
  polygon_entity?: string;
  /** Room width for canvas scaling (cm). */
  room_w: number;
  /** Room depth for canvas scaling (cm). */
  room_d: number;
  /** Stable backend system id. Presence of radars[] enables fusion mode. */
  fusion_id?: string;
  radars?: RadarSourceConfig[];
  zones?: FusionZoneConfig[];
  cameras?: FusionCameraConfig[];
  fusion?: FusionSettings;
  /** Let an administrator opening the card persist this layout to the backend. */
  sync_backend?: boolean;
  /** Any entity IDs needed by the selected model. */
  [key: string]: unknown;
  tap_action?: ActionConfig;
}

export const DEFAULT_CARD_CONFIG: Partial<MMWaveCardConfig> = {
  room_w: 400,
  room_d: 600,
  device_id: '',
  presence_entity: 'binary_sensor.r60abd1_presence',
  x_entity: 'sensor.r60abd1_x',
  y_entity: 'sensor.r60abd1_y',
  z_entity: 'sensor.r60abd1_z',
  polygon_entity: 'text.r60abd1_polygon_config',
};

// ── Yaw calibration sub-state ─────────────────────────────────────────────────

export interface RefPoint {
  canvasPt: Vec2;
  /** 捕获时雷达输出的原始坐标（cm，雷达局部坐标系） */
  detPt?: Vec2;
  /** 点击时对应的房间坐标（cm），用于在 UI 中显示给用户 */
  roomPt?: Vec2;
}

export interface YawCalibState {
  /**
   * 0   = waiting to mark A on canvas
   * 0.5 = A marked, waiting to capture
   * 1   = A captured, waiting to mark B
   * 1.5 = B marked, waiting to capture
   * 2   = complete
   */
  sub: number;
  refA?: RefPoint;
  refB?: RefPoint;
  capturing: boolean;
  residual?: number;
}
