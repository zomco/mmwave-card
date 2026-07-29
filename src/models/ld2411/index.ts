/**
 * Hi-Link LD2411 24 GHz ranging radar adapter
 *
 * Protocol reference: Hi-Link LD2411
 *
 * Key characteristics:
 *   - 1-D ranging radar (outputs distance only)
 *   - Coordinate unit: cm
 *   - Position update rate: ~10 Hz (continuous)
 *   - Maximum Range: ~6m
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
  id: 'ld2411',
  displayName: 'Hi-Link LD2411 (24 GHz)',
  fovDegrees: 120, // ±60° horizontal coverage
  maxRangeM: 6.0, // 600 cm
  minRangeM: 0.3, // 30 cm minimum configured by default
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
  { key: 'motion_state_entity', labelKey: 'editor.motion_state_entity', required: false, domain: 'sensor' },
];

// ── Adapter implementation ────────────────────────────────────────────────────

export const ld2411Adapter: RadarModelAdapter = {
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

    const pres = get('presence_entity');
    if (!pres || pres.state === 'unavailable') {
      return { present: false, targets: [] };
    }
    const present = pres.state === 'on';
    if (!present) return { present: false, targets: [] };

    const distState = get('distance_entity');
    if (!distState) return { present: true, targets: [] };

    const distance = parseFloat(distState.state) || 0;
    if (distance <= 0) return { present: true, targets: [] };

    const targets: RadarTarget[] = [];

    // Map the 1-D distance onto the Y-axis (forward) so the card's native
    // yaw/pitch/roll calibration transforms it into 2D room space.
    targets.push({
      index: 0,
      rawX: 0,
      rawY: distance,
      rawZ: 0,
    });

    return { present: true, targets };
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
