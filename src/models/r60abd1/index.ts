/**
 * R60ABD1  60 GHz breathing / sleep radar adapter
 *
 * Protocol reference: MicRadar R60ABD1 User Manual v3.4
 *
 * Key characteristics:
 *   - Single target, 3-D coordinates (x, y, z)
 *   - Coordinate unit: cm
 *   - Position update rate: 2 s (0.5 Hz)
 *   - Coordinate encoding: bit15 = sign (0=positive, 1=negative),
 *     bit14-0 = 15-bit magnitude  [v2.5 errata]
 *   - Internal DSP already handles filtering — no external EMA needed
 */

import type { HomeAssistant } from 'custom-card-helpers';
import type { RadarModelAdapter } from '../base';
import type { RadarModelInfo, EntitySchemaField, RadarReading, MMWaveCardConfig, CalibrationConfig } from '../../types';
import { DEFAULT_CALIBRATION } from '../../types';

// ── Model info ────────────────────────────────────────────────────────────────

const INFO: RadarModelInfo = {
  id: 'r60abd1',
  displayName: 'MicRadar R60ABD1 (60 GHz)',
  fovDegrees: 40, // 手册 §5.4：±20°
  maxRangeM: 2.5, // 手册 §6.2：存在/睡眠探测最大距离
  minRangeM: 0.4, // 手册 §5.1：最小探测距离（盲区）
  vitalRangeM: 1.5, // 手册 §6.2：呼吸/心率探测最大距离
  updateRateHz: 0.5, // 2 s between position frames
  maxTargets: 1,
  hasZAxis: true,
  hasBreathing: true,
  hasHeartRate: true,
  hasSleep: true,
};

// ── Entity schema ─────────────────────────────────────────────────────────────

const ENTITY_SCHEMA: EntitySchemaField[] = [
  { key: 'presence_entity', labelKey: 'editor.presence_entity', required: true, domain: 'binary_sensor' },
  // Atomic v1 target frame. Preferred over the split x/y/z entities for
  // multi-radar fusion: those arrive as three independent state changes, so
  // the backend can pair a fresh X with a stale Y.
  { key: 'frame_entity', labelKey: 'editor.target_frame', required: false, domain: 'sensor' },
  { key: 'x_entity', labelKey: 'editor.x_entity', required: true, domain: 'sensor' },
  { key: 'y_entity', labelKey: 'editor.y_entity', required: true, domain: 'sensor' },
  { key: 'z_entity', labelKey: 'editor.z_entity', required: false, domain: 'sensor' },
  { key: 'breath_entity', labelKey: 'editor.breath_entity', required: false, domain: 'sensor' },
  { key: 'heart_entity', labelKey: 'editor.heart_entity', required: false, domain: 'sensor' },
  { key: 'sleep_entity', labelKey: 'editor.sleep_entity', required: false, domain: 'sensor' },
  { key: 'polygon_entity', labelKey: 'editor.polygon_entity', required: false, domain: 'text' },
];

// ── Adapter implementation ────────────────────────────────────────────────────

export const r60abd1Adapter: RadarModelAdapter = {
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

    const xs = get('x_entity');
    const ys = get('y_entity');
    const zs = get('z_entity');
    if (!xs || !ys) return { present: true, targets: [] };

    const rawX = parseFloat(xs.state) || 0;
    const rawY = parseFloat(ys.state) || 0;
    const rawZ = zs ? parseFloat(zs.state) || 0 : 0;

    // (0,0,0) means "no valid position" for R60ABD1
    if (rawX === 0 && rawY === 0 && rawZ === 0) {
      return { present: true, targets: [] };
    }

    return {
      present: true,
      targets: [{ index: 0, rawX, rawY, rawZ }],
    };
  },

  getDefaultCalibration(): CalibrationConfig {
    return {
      ...DEFAULT_CALIBRATION,
      radar_z: 220, // typical ceiling mount (cm)
      pitch: 0,
      roll: 0,
    };
  },
};
