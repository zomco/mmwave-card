/**
 * HLK-LD2454  24 GHz presence radar adapter  (skeleton)
 *
 * Protocol reference: Hi-Link LD2454 datasheet
 *
 * Key characteristics:
 *   - Up to 3 simultaneous targets
 *   - 2-D coordinates (x, y) — no Z axis
 *   - Coordinate unit: mm  →  converted to cm here
 *   - Position update rate: ~20 Hz
 *   - Horizontal FOV: ±60° (120° total)
 *
 * Implementation status:
 *   readFromHass() reads the entity convention used by the ESPHome
 *   community LD2454 component (target_N_x / target_N_y).
 *   Extend getEntitySchema() if your component uses different names.
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

// ── Model info ────────────────────────────────────────────────────────────────

const INFO: RadarModelInfo = {
  id: 'ld2454',
  displayName: 'Hi-Link LD2454 (24 GHz)',
  fovDegrees: 120, // Manual: azimuth ±60°
  verticalFovDegrees: 70, // Manual: elevation ±35°
  maxRangeM: 6,
  minRangeM: 0.2, // LD2454 typical blind zone ~20 cm
  updateRateHz: 10,
  maxTargets: 3,
  hasZAxis: false,
  hasBreathing: false,
  hasHeartRate: false,
  hasSleep: false,
};

// ── Entity schema ─────────────────────────────────────────────────────────────
// Convention: target_1_x / target_1_y  …  target_3_x / target_3_y
// plus a presence binary sensor from the ESPHome component.

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
  { key: 'polygon_entity', labelKey: 'editor.polygon_entity', required: false, domain: 'text' },
];

/**
 * Convert an entity state to centimetres, or null when it does not hold a
 * number.
 *
 * The null case matters: `parseFloat(s) || 0` turned "unknown" into 0, and the
 * component publishes x and y as two separate state updates, so there is
 * always a moment where one has gone unknown while the other still carries its
 * last coordinate. Coerced to 0 that reads as a target on the boresight, and
 * the marker jumps to the centre line for a frame every time a track is lost.
 */
function centimetres(state: { state: string; attributes: Record<string, unknown> }): number | null {
  const value = parseFloat(state.state);
  if (!Number.isFinite(value)) return null;
  const unit = String(state.attributes.unit_of_measurement ?? '').toLowerCase();
  if (unit === 'cm') return value;
  if (unit === 'm') return value * 100;
  return value / 10;
}

// ── Adapter implementation ────────────────────────────────────────────────────

export const ld2454Adapter: RadarModelAdapter = {
  info: INFO,

  getEntitySchema: () => ENTITY_SCHEMA,

  validateConfig(config: MMWaveCardConfig): string[] {
    const errors: string[] = config.presence_entity ? [] : ['Missing required entity: presence_entity'];
    if (!config.frame_entity && (!config.target_1_x_entity || !config.target_1_y_entity))
      errors.push('Missing frame_entity or target_1 X/Y entities');
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

    const targets: RadarTarget[] = [];

    // LD2454 reports (0,0) for "slot empty"; filter those out.
    for (let i = 1; i <= INFO.maxTargets; i++) {
      const xs = get(`target_${i}_x_entity`);
      const ys = get(`target_${i}_y_entity`);
      if (!xs || !ys) continue;

      // This workspace's component publishes cm; common third-party variants
      // publish mm. Respect the HA unit attribute and default to legacy mm.
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
      radar_z: 250, // LD2454 is often wall-mounted higher (cm)
      pitch: 0,
      roll: 0,
    };
  },
};
