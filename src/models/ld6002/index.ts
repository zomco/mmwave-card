/**
 * HLK-LD6002 60 GHz biological sensing radar adapter
 *
 * Protocol reference: Hi-Link LD6002
 *
 * Key characteristics:
 *   - 60GHz single-target radar
 *   - Coordinate unit: cm
 *   - Can act as either a 1-D radar (using `distance_entity`) or
 *     a 2-D radar (using `x_entity` mapped to ESPHome's `room_x_entity`
 *     and `y_entity` mapped to `room_y_entity`).
 *   - Position update rate: ~1 Hz
 *   - Maximum Range: ~6m
 *
 * Implementation status:
 *   readFromHass() uses a hybrid approach. It prefers X/Y coordinate
 *   sensors if they are provided, but gracefully falls back to just
 *   the distance sensor mapped to the forward Y-axis.
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
  id: 'ld6002',
  displayName: 'Hi-Link LD6002 (60 GHz)',
  fovDegrees: 120, // Nominal horizontal FOV
  verticalFovDegrees: 120, // Manual: -3 dB vertical beam -60° to +60°
  maxRangeM: 6.0, // 600 cm maximum
  minRangeM: 0.4,
  vitalRangeM: 1.5,
  updateRateHz: 1, // Update is slightly slower, around 1 Hz
  maxTargets: 1,
  hasZAxis: false,
  hasBreathing: true,
  hasHeartRate: true,
  hasSleep: false,
  // The ESPHome component publishes distance, presence and vitals - there is
  // no x/y output - so this is a ranging-only radar. Without this flag the
  // fusion editor offered LD6002 as a spatial source while the backend's
  // SPATIAL_MODELS refused it, so the radar was accepted into a fusion config
  // and then silently ignored. The x/y entities below remain as an escape
  // hatch for user-supplied template sensors.
  is1DRanging: true,
};

// ── Entity schema ─────────────────────────────────────────────────────────────

const ENTITY_SCHEMA: EntitySchemaField[] = [
  { key: 'presence_entity', labelKey: 'editor.presence_entity', required: true, domain: 'binary_sensor' },
  { key: 'x_entity', labelKey: 'editor.x_entity', required: false, domain: 'sensor' },
  { key: 'y_entity', labelKey: 'editor.y_entity', required: false, domain: 'sensor' },
  { key: 'distance_entity', labelKey: 'editor.distance_entity', required: false, domain: 'sensor' },
  { key: 'breath_entity', labelKey: 'editor.breath_entity', required: false, domain: 'sensor' },
  { key: 'heart_entity', labelKey: 'editor.heart_entity', required: false, domain: 'sensor' },
];

// ── Adapter implementation ────────────────────────────────────────────────────

export const ld6002Adapter: RadarModelAdapter = {
  info: INFO,

  getEntitySchema: () => ENTITY_SCHEMA,

  validateConfig(config: MMWaveCardConfig): string[] {
    const errors: string[] = [];
    if (!config.presence_entity) {
      errors.push('Missing required entity: presence_entity');
    }
    if (!config.distance_entity && (!config.x_entity || !config.y_entity)) {
      errors.push('You must provide either distance_entity OR both x_entity and y_entity.');
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

    const xState = get('x_entity');
    const yState = get('y_entity');
    const distState = get('distance_entity');

    let rawX = 0;
    let rawY = 0;

    // Hybrid preference: use X/Y if available, otherwise fallback to distance (1D)
    if (xState && yState) {
      rawX = parseFloat(xState.state) || 0;
      rawY = parseFloat(yState.state) || 0;
    } else if (distState) {
      rawY = parseFloat(distState.state) || 0;
    }

    if (rawX === 0 && rawY <= 0) {
      return { present: true, targets: [] };
    }

    const targets: RadarTarget[] = [
      {
        index: 0,
        rawX,
        rawY,
        rawZ: 0,
      },
    ];

    return { present: true, targets };
  },

  getDefaultCalibration(): CalibrationConfig {
    return {
      ...DEFAULT_CALIBRATION,
      radar_z: 240,
      pitch: 0,
      roll: 0,
    };
  },
};
