/**
 * HLK-LD2412 24 GHz presence radar adapter
 *
 * Protocol reference: Hi-Link LD2412
 *
 * Key characteristics:
 *   - 1-D ranging radar (outputs distance only)
 *   - Coordinate unit: cm
 *   - Position update rate: ~10 Hz (continuous)
 *   - Maximum Range: 9.0m (14 gates * 0.75m max, but specs say 9m max)
 *
 * Implementation status:
 *   readFromHass() maps the measured distance to the Y-axis (forward) of
 *   the radar's local coordinate system. This allows the HA Card's native
 *   calibration (yaw, pitch, roll) to project the target correctly into
 *   2D room space.
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
  id: 'ld2412',
  displayName: 'Hi-Link LD2412 (24 GHz)',
  fovDegrees: 150, // ±75° horizontal coverage
  maxRangeM: 9.0, // 900 cm maximum
  minRangeM: 0.0,
  updateRateHz: 10,
  maxTargets: 1,
  hasZAxis: false,
  hasBreathing: false,
  hasHeartRate: false,
  hasSleep: false,
  is1DRanging: true,
};

// ── Entity schema ─────────────────────────────────────────────────────────────

const ENTITY_SCHEMA: EntitySchemaField[] = [
  { key: 'presence_entity', labelKey: 'editor.presence_entity', required: true, domain: 'binary_sensor' },
  { key: 'distance_entity', labelKey: 'editor.distance_entity', required: true, domain: 'sensor' },
  { key: 'target_state_entity', labelKey: 'editor.target_state_entity', required: false, domain: 'sensor' },
  { key: 'max_distance_entity', labelKey: 'editor.max_distance_entity', required: false, domain: 'sensor' },
];

// ── Adapter implementation ────────────────────────────────────────────────────

export const ld2412Adapter: RadarModelAdapter = {
  info: INFO,

  getEntitySchema: () => ENTITY_SCHEMA,

  validateConfig(config: MMWaveCardConfig): string[] {
    const errors: string[] = [];
    for (const field of ENTITY_SCHEMA) {
      if (field.required && !config[field.key]) {
        errors.push(`Missing required entity: ${field.key}`);
      }
    }
    return errors;
  },

  readFromHass(hass: HomeAssistant, config: MMWaveCardConfig): RadarReading {
    const get = (key: string) => {
      const eid = config[key] as string | undefined;
      return eid ? hass.states[eid] : undefined;
    };

    let maxRangeM: number | undefined;
    const maxDistState = get('max_distance_entity');
    if (maxDistState && maxDistState.state && maxDistState.state !== 'unavailable') {
      const maxDistCm = parseFloat(maxDistState.state);
      if (!isNaN(maxDistCm) && maxDistCm > 0) {
        maxRangeM = maxDistCm / 100.0;
      }
    }

    const pres = get('presence_entity');
    if (!pres || pres.state === 'unavailable') {
      return { present: false, targets: [], maxRangeM };
    }
    const present = pres.state === 'on';
    if (!present) return { present: false, targets: [], maxRangeM };

    const distState = get('distance_entity');
    if (!distState) return { present: true, targets: [], maxRangeM };

    const distance = parseFloat(distState.state) || 0;
    if (distance <= 0) return { present: true, targets: [], maxRangeM };

    const targets: RadarTarget[] = [];

    // Map the 1-D distance onto the Y-axis (forward) so the card's native
    // yaw/pitch/roll calibration transforms it into 2D room space.
    targets.push({
      index: 0,
      rawX: 0,
      rawY: distance,
      rawZ: 0,
    });

    return { present: true, targets, maxRangeM };
  },

  getDefaultCalibration(): CalibrationConfig {
    return {
      ...DEFAULT_CALIBRATION,
      radar_z: 240, // Typical top-down or wall-mount height (cm)
      pitch: 0,
      roll: 0,
    };
  },
};
