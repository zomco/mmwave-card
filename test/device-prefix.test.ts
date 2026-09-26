import { describe, expect, it } from 'vitest';
import { resolveDevicePrefix } from '../src/utils/device-prefix';
import { ld2450Adapter } from '../src/models/ld2450';
import { r60abd1Adapter } from '../src/models/r60abd1';
import { ld2410Adapter } from '../src/models/ld2410';
import type { MMWaveCardConfig } from '../src/types';

describe('resolveDevicePrefix', () => {
  it('returns empty string when config is undefined', () => {
    expect(resolveDevicePrefix(ld2450Adapter, undefined)).toBe('');
  });

  it('resolves prefix from target_1_x_entity for multi-target radar', () => {
    const config = {
      radar_model: 'ld2450',
      target_1_x_entity: 'sensor.predny_radar_target_1_x',
      target_1_y_entity: 'sensor.predny_radar_target_1_y',
    } as MMWaveCardConfig;

    expect(resolveDevicePrefix(ld2450Adapter, config)).toBe('predny_radar');
  });

  it('prioritizes target_1_x_entity over stale r60abd1 x_entity for multi-target radars', () => {
    const config = {
      radar_model: 'ld2450',
      target_1_x_entity: 'sensor.predny_radar_target_1_x',
      target_1_y_entity: 'sensor.predny_radar_target_1_y',
      x_entity: 'sensor.r60abd1_x', // Stale default
      polygon_entity: 'text.r60abd1_polygon_config',
    } as MMWaveCardConfig;

    expect(resolveDevicePrefix(ld2450Adapter, config)).toBe('predny_radar');
  });

  it('resolves prefix from frame_entity for multi-target radars when split entities are absent', () => {
    const config = {
      radar_model: 'ld2450',
      frame_entity: 'sensor.kitchen_radar_target_frame',
      presence_entity: 'binary_sensor.kitchen_radar_presence',
      x_entity: 'sensor.r60abd1_x', // Stale default
    } as MMWaveCardConfig;

    expect(resolveDevicePrefix(ld2450Adapter, config)).toBe('kitchen_radar');
  });

  it('resolves prefix from presence_entity for 1-D ranging radars', () => {
    const config = {
      radar_model: 'ld2410',
      presence_entity: 'binary_sensor.hallway_radar_presence',
    } as MMWaveCardConfig;

    expect(resolveDevicePrefix(ld2410Adapter, config)).toBe('hallway_radar');
  });

  it('resolves prefix from x_entity for single-target radars like R60ABD1', () => {
    const config = {
      radar_model: 'r60abd1',
      x_entity: 'sensor.bedroom_x',
    } as MMWaveCardConfig;

    expect(resolveDevicePrefix(r60abd1Adapter, config)).toBe('bedroom');
  });
});
