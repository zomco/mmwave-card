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
  id: 'ld2411s',
  displayName: 'Hi-Link LD2411S (24 GHz 1-D)',
  fovDegrees: 45,
  verticalFovDegrees: 20,
  maxRangeM: 6.0,
  minRangeM: 0.3,
  updateRateHz: 20,
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

export const ld2411sAdapter: RadarModelAdapter = {
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

    const targets: RadarTarget[] = [];

    const distState = get('distance_entity');
    if (distState && distState.state !== 'unavailable') {
      const rawDist = parseFloat(distState.state) || 0;
      if (rawDist > 0) {
        targets.push({ index: 0, rawX: 0, rawY: rawDist, rawZ: 0 });
      }
    }

    return { present: true, targets };
  },

  getDefaultCalibration(): CalibrationConfig {
    return {
      ...DEFAULT_CALIBRATION,
      radar_z: 100,
      pitch: 0,
      roll: 0,
    };
  },
};
