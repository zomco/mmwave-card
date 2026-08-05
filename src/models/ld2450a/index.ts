/**
 * Hi-Link LD2450A 24 GHz presence and gesture recognition radar adapter
 *
 * Protocol reference: Hi-Link LD2450A
 *
 * Key characteristics:
 *   - 1-D ranging radar with gesture recognition
 *   - Coordinate unit: cm
 *   - Position update rate: ~10 Hz (continuous)
 *   - Maximum Range: ~2m (presence), ~0.3m (gesture)
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
  id: 'ld2450a',
  displayName: 'Hi-Link LD2450A (24 GHz Gesture)',
  fovDegrees: 120, // ±60° horizontal coverage
  verticalFovDegrees: 70, // Manual: 70° elevation coverage
  maxRangeM: 2.0, // 200 cm presence max range
  minRangeM: 0.2, // 20 cm min range
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
];

// ── Adapter implementation ────────────────────────────────────────────────────

export const ld2450aAdapter: RadarModelAdapter = {
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
    // For LD2450A, distance may be invalid (255) causing it to be unknown/0.
    // If we have presence, we must push a target (even at distance 0) 
    // so the UI shows "Present" instead of "Outside Boundary" and draws the sector.
    const effectiveDistance = distance > 0 ? distance : 0;

    const targets: RadarTarget[] = [];

    // Map the 1-D distance onto the Y-axis (forward) so the card's native
    // yaw/pitch/roll calibration transforms it into 2D room space.
    targets.push({
      index: 0,
      rawX: 0,
      rawY: effectiveDistance,
      rawZ: 0,
    });

    return { present: true, targets };
  },

  getDefaultCalibration(): CalibrationConfig {
    return {
      ...DEFAULT_CALIBRATION,
      radar_z: 150, // Typical desktop or gesture-height mounting (cm)
      pitch: 0,
      roll: 0,
    };
  },
};
