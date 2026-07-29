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
}

// ── Model capabilities ────────────────────────────────────────────────────────

export interface RadarModelInfo {
  /** Unique identifier used in the card YAML config. */
  id: string;
  /** Human-readable name shown in the editor drop-down. */
  displayName: string;
  /** Horizontal field-of-view (degrees). */
  fovDegrees: number;
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
  radar_model: string;
  /** HA Device ID for auto-population */
  device_id?: string;
  sleep_state_entity?: string;
  polygon_entity?: string;
  /** Room width for canvas scaling (cm). */
  room_w: number;
  /** Room depth for canvas scaling (cm). */
  room_d: number;
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
