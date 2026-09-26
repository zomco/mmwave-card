/**
 * HLK-LD2460 24 GHz multi-target tracking radar adapter
 *
 * Protocol reference: Hi-Link LD2460 manual & protocol
 *
 * Key characteristics:
 *   - Up to 5 simultaneous targets (sports body up to 5, stationary at least 3)
 *   - 2-D coordinates (x, y) — no Z axis
 *   - Coordinate unit: cm in ESPHome / mmwave-component (raw protocol reports in 0.1 m / dm)
 *   - Position update rate: ~10 Hz
 *   - Horizontal FOV: ±60° (120° total)
 *   - Vertical FOV: ±45° (90° total)
 *   - Max range: 6 m
 *
 * Implementation status:
 *   readFromHass() reads the entity convention used by the ESPHome
 *   LD2460 component (target_N_x / target_N_y for N=1..5, or atomic target frame).
 */

import type { HomeAssistant } from 'custom-card-helpers';
import type { RadarModelAdapter } from '../base';
import type {
  RadarModelInfo,
  EntitySchemaField,
  RadarReading,
  RadarTarget,
  MMWaveCardConfig,
  CalibrationConfig,
} from '../../types';
import { DEFAULT_CALIBRATION } from '../../types';
import { parseAtomicTargetFrame } from '../../fusion/frame';

// ── Model info ────────────────────────────────────────────────────────────────

const INFO: RadarModelInfo = {
  id: 'ld2460',
  displayName: 'Hi-Link LD2460 (24 GHz)',
  fovDegrees: 120, // Manual: horizontal detection angle 120° (azimuth ±60°)
  verticalFovDegrees: 90, // Manual: vertical detection angle 90° (elevation ±45°)
  maxRangeM: 6,
  minRangeM: 0.2, // Typical blind zone ~20 cm
  updateRateHz: 10,
  maxTargets: 5,
  hasZAxis: false,
  hasBreathing: false,
  hasHeartRate: false,
  hasSleep: false,
};

// ── Entity schema ─────────────────────────────────────────────────────────────

const ENTITY_SCHEMA: EntitySchemaField[] = [
  { key: 'presence_entity', labelKey: 'editor.presence_entity', required: true, domain: 'binary_sensor' },
  { key: 'frame_entity', labelKey: 'editor.target_frame', required: false, domain: 'sensor' },
  { key: 'target_1_x_entity', labelKey: 'editor.target_1_x', required: true, domain: 'sensor' },
  { key: 'target_1_y_entity', labelKey: 'editor.target_1_y', required: true, domain: 'sensor' },
  { key: 'target_1_speed_entity', labelKey: 'editor.target_1_speed', required: false, domain: 'sensor' },
  { key: 'target_2_x_entity', labelKey: 'editor.target_2_x', required: false, domain: 'sensor' },
  { key: 'target_2_y_entity', labelKey: 'editor.target_2_y', required: false, domain: 'sensor' },
  { key: 'target_2_speed_entity', labelKey: 'editor.target_2_speed', required: false, domain: 'sensor' },
  { key: 'target_3_x_entity', labelKey: 'editor.target_3_x', required: false, domain: 'sensor' },
  { key: 'target_3_y_entity', labelKey: 'editor.target_3_y', required: false, domain: 'sensor' },
  { key: 'target_3_speed_entity', labelKey: 'editor.target_3_speed', required: false, domain: 'sensor' },
  { key: 'target_4_x_entity', labelKey: 'editor.target_4_x', required: false, domain: 'sensor' },
  { key: 'target_4_y_entity', labelKey: 'editor.target_4_y', required: false, domain: 'sensor' },
  { key: 'target_4_speed_entity', labelKey: 'editor.target_4_speed', required: false, domain: 'sensor' },
  { key: 'target_5_x_entity', labelKey: 'editor.target_5_x', required: false, domain: 'sensor' },
  { key: 'target_5_y_entity', labelKey: 'editor.target_5_y', required: false, domain: 'sensor' },
  { key: 'target_5_speed_entity', labelKey: 'editor.target_5_speed', required: false, domain: 'sensor' },
  { key: 'polygon_entity', labelKey: 'editor.polygon_entity', required: false, domain: 'text' },
];

/**
 * Convert an entity state to centimetres, or null when it does not hold a number.
 *
 * `parseFloat(s) || 0` must not be used here: it turns "unknown" into 0, and
 * the component publishes x and y as two separate state updates, so there is
 * always a moment where one has gone unknown while the other still carries its
 * last coordinate. Coerced to 0 that reads as a target on the boresight, and
 * the marker jumps to the centre line for a frame every single time a track is lost.
 */
function centimetres(state: { state: string; attributes?: Record<string, unknown> } | undefined): number | null {
  if (!state) return null;
  const value = parseFloat(state.state);
  if (!Number.isFinite(value)) return null;
  const unit = String(state.attributes?.unit_of_measurement ?? '').toLowerCase();
  if (unit === 'cm') return value;
  if (unit === 'm') return value * 100;
  if (unit === 'mm') return value / 10;
  if (unit === 'dm') return value * 10;
  return value;
}

// ── Adapter implementation ────────────────────────────────────────────────────

export const ld2460Adapter: RadarModelAdapter = {
  info: INFO,

  getEntitySchema: () => ENTITY_SCHEMA,

  validateConfig(config: MMWaveCardConfig): string[] {
    const errors: string[] = config.presence_entity ? [] : ['Missing required entity: presence_entity'];
    if (!config.frame_entity && (!config.target_1_x_entity || !config.target_1_y_entity)) {
      errors.push('Missing frame_entity or target_1 X/Y entities');
    }
    return errors;
  },

  readFromHass(hass: HomeAssistant, config: MMWaveCardConfig): RadarReading {
    const get = (key: string) => {
      const eid = config[key] as string | undefined;
      return eid ? hass.states[eid] : undefined;
    };

    const pres = get('presence_entity');
    if (!pres || pres.state === 'unavailable') {
      return { present: false, targets: [] };
    }
    const present = pres.state === 'on';
    if (!present) return { present: false, targets: [] };

    // Never mix separate X/Y updates when an atomic frame source is configured.
    // Empty/invalid frames must not fall back to stale per-axis entities.
    if (config.frame_entity) {
      const frame = parseAtomicTargetFrame(get('frame_entity')?.state ?? '');
      return {
        present,
        targets:
          frame?.targets.map((target, index) => ({
            index: target.slot ?? index,
            rawX: target.x,
            rawY: target.y,
            rawZ: target.z,
            speed: target.speed,
          })) ?? [],
      };
    }

    const targets: RadarTarget[] = [];

    // Filter empty slots (0, 0) and unlocatable coordinates
    for (let i = 1; i <= INFO.maxTargets; i++) {
      const xs = get(`target_${i}_x_entity`);
      const ys = get(`target_${i}_y_entity`);
      if (!xs || !ys) continue;

      const rawX = centimetres(xs);
      const rawY = centimetres(ys);
      if (rawX === null || rawY === null) continue; // slot unknown/unavailable
      if (rawX === 0 && rawY === 0) continue; // slot empty

      const speedState = get(`target_${i}_speed_entity`);
      const speed = speedState ? Math.abs(parseFloat(speedState.state) || 0) : undefined;

      targets.push({ index: i - 1, rawX, rawY, rawZ: 0, speed });
    }

    return { present: true, targets };
  },

  getDefaultCalibration(): CalibrationConfig {
    return {
      ...DEFAULT_CALIBRATION,
      radar_z: 250, // Recommended installation height 2.2-2.7 m
      pitch: 0,
      roll: 0,
    };
  },
};
