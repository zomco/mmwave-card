import { describe, expect, it } from 'vitest';
import type { HomeAssistant } from 'custom-card-helpers';
import type { MMWaveCardConfig } from '../src/types';
import { ld2460Adapter } from '../src/models/ld2460';

describe('ld2460Adapter', () => {
  const baseConfig: MMWaveCardConfig = {
    type: 'custom:mmwave-card',
    radar_model: 'ld2460',
    presence_entity: 'binary_sensor.ld2460_presence',
    target_1_x_entity: 'sensor.ld2460_target_1_x',
    target_1_y_entity: 'sensor.ld2460_target_1_y',
    target_2_x_entity: 'sensor.ld2460_target_2_x',
    target_2_y_entity: 'sensor.ld2460_target_2_y',
    target_3_x_entity: 'sensor.ld2460_target_3_x',
    target_3_y_entity: 'sensor.ld2460_target_3_y',
    target_4_x_entity: 'sensor.ld2460_target_4_x',
    target_4_y_entity: 'sensor.ld2460_target_4_y',
    target_5_x_entity: 'sensor.ld2460_target_5_x',
    target_5_y_entity: 'sensor.ld2460_target_5_y',
    target_1_speed_entity: 'sensor.ld2460_target_1_speed',
    room_w: 400,
    room_d: 600,
  };

  it('exposes correct model capabilities', () => {
    const { info } = ld2460Adapter;
    expect(info.id).toBe('ld2460');
    expect(info.displayName).toContain('LD2460');
    expect(info.fovDegrees).toBe(120);
    expect(info.verticalFovDegrees).toBe(90);
    expect(info.maxRangeM).toBe(6);
    expect(info.maxTargets).toBe(5);
    expect(info.hasZAxis).toBe(false);
  });

  it('declares schema for 5 targets', () => {
    const schema = ld2460Adapter.getEntitySchema();
    for (let i = 1; i <= 5; i++) {
      expect(schema.some((f) => f.key === `target_${i}_x_entity`)).toBe(true);
      expect(schema.some((f) => f.key === `target_${i}_y_entity`)).toBe(true);
      expect(schema.some((f) => f.key === `target_${i}_speed_entity`)).toBe(true);
    }
  });

  it('validates required entities', () => {
    expect(ld2460Adapter.validateConfig(baseConfig)).toEqual([]);
    expect(ld2460Adapter.validateConfig({ ...baseConfig, presence_entity: '' })).toContain(
      'Missing required entity: presence_entity',
    );
    expect(
      ld2460Adapter.validateConfig({
        ...baseConfig,
        target_1_x_entity: undefined,
        frame_entity: undefined,
      }),
    ).toContain('Missing frame_entity or target_1 X/Y entities');
    // Valid with frame_entity alone
    expect(
      ld2460Adapter.validateConfig({
        type: 'custom:mmwave-card',
        radar_model: 'ld2460',
        presence_entity: 'binary_sensor.presence',
        frame_entity: 'sensor.frame',
        room_w: 400,
        room_d: 600,
      }),
    ).toEqual([]);
  });

  it('reads all 5 targets with unit conversions', () => {
    const hass = {
      states: {
        'binary_sensor.ld2460_presence': { state: 'on', attributes: {} },
        'sensor.ld2460_target_1_x': { state: '150', attributes: { unit_of_measurement: 'cm' } },
        'sensor.ld2460_target_1_y': { state: '230', attributes: { unit_of_measurement: 'cm' } },
        'sensor.ld2460_target_1_speed': { state: '-15.5', attributes: {} },
        'sensor.ld2460_target_2_x': { state: '1.2', attributes: { unit_of_measurement: 'm' } },
        'sensor.ld2460_target_2_y': { state: '3.4', attributes: { unit_of_measurement: 'm' } },
        'sensor.ld2460_target_3_x': { state: '-500', attributes: { unit_of_measurement: 'mm' } },
        'sensor.ld2460_target_3_y': { state: '4000', attributes: { unit_of_measurement: 'mm' } },
        'sensor.ld2460_target_4_x': { state: '8', attributes: { unit_of_measurement: 'dm' } },
        'sensor.ld2460_target_4_y': { state: '25', attributes: { unit_of_measurement: 'dm' } },
        'sensor.ld2460_target_5_x': { state: '-75', attributes: {} },
        'sensor.ld2460_target_5_y': { state: '180', attributes: {} },
      },
    } as unknown as HomeAssistant;

    const reading = ld2460Adapter.readFromHass(hass, baseConfig);
    expect(reading.present).toBe(true);
    expect(reading.targets).toHaveLength(5);
    expect(reading.targets[0]).toEqual({ index: 0, rawX: 150, rawY: 230, rawZ: 0, speed: 15.5 });
    expect(reading.targets[1]).toEqual({ index: 1, rawX: 120, rawY: 340, rawZ: 0, speed: undefined });
    expect(reading.targets[2]).toEqual({ index: 2, rawX: -50, rawY: 400, rawZ: 0, speed: undefined });
    expect(reading.targets[3]).toEqual({ index: 3, rawX: 80, rawY: 250, rawZ: 0, speed: undefined });
    expect(reading.targets[4]).toEqual({ index: 4, rawX: -75, rawY: 180, rawZ: 0, speed: undefined });
  });

  it('filters empty (0, 0) slots and unknown coordinates', () => {
    const hass = {
      states: {
        'binary_sensor.ld2460_presence': { state: 'on', attributes: {} },
        'sensor.ld2460_target_1_x': { state: '100', attributes: {} },
        'sensor.ld2460_target_1_y': { state: '200', attributes: {} },
        'sensor.ld2460_target_2_x': { state: '0', attributes: {} },
        'sensor.ld2460_target_2_y': { state: '0', attributes: {} },
        'sensor.ld2460_target_3_x': { state: 'unknown', attributes: {} },
        'sensor.ld2460_target_3_y': { state: '300', attributes: {} },
        'sensor.ld2460_target_4_x': { state: '50', attributes: {} },
        'sensor.ld2460_target_4_y': { state: 'unavailable', attributes: {} },
      },
    } as unknown as HomeAssistant;

    const reading = ld2460Adapter.readFromHass(hass, baseConfig);
    expect(reading.present).toBe(true);
    expect(reading.targets).toHaveLength(1);
    expect(reading.targets[0]).toEqual({ index: 0, rawX: 100, rawY: 200, rawZ: 0, speed: undefined });
  });

  it('parses atomic target frame when configured', () => {
    const frameConfig: MMWaveCardConfig = {
      ...baseConfig,
      frame_entity: 'sensor.ld2460_target_frame',
    };
    const payload = JSON.stringify({
      v: 1,
      f: 12,
      ts: Date.now(),
      t: [
        [10, 20, 5],
        [30, 40, 10],
        [50, 60],
      ],
      s: [0, 2, 4],
    });
    const hass = {
      states: {
        'binary_sensor.ld2460_presence': { state: 'on', attributes: {} },
        'sensor.ld2460_target_frame': { state: payload, attributes: {} },
      },
    } as unknown as HomeAssistant;

    const reading = ld2460Adapter.readFromHass(hass, frameConfig);
    expect(reading.present).toBe(true);
    expect(reading.targets).toEqual([
      { index: 0, rawX: 10, rawY: 20, rawZ: 0, speed: 5 },
      { index: 2, rawX: 30, rawY: 40, rawZ: 0, speed: 10 },
      { index: 4, rawX: 50, rawY: 60, rawZ: 0, speed: undefined },
    ]);
  });
});
