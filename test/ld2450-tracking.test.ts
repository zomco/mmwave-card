import { describe, expect, it } from 'vitest';
import type { HomeAssistant } from 'custom-card-helpers';
import type { MMWaveCardConfig } from '../src/types';
import { ld2450Adapter } from '../src/models/ld2450';
import { parseAtomicTargetFrame } from '../src/fusion/frame';
import { continuesTrail } from '../src/utils/trail-continuity';

const config = {
  type: 'custom:mmwave-card',
  radar_model: 'ld2450',
  presence_entity: 'binary_sensor.presence',
  frame_entity: 'sensor.frame',
  target_1_x_entity: 'sensor.x',
  target_1_y_entity: 'sensor.y',
} as MMWaveCardConfig;
function hass(value: string): HomeAssistant {
  return {
    states: {
      'binary_sensor.presence': { state: 'on', attributes: {} },
      'sensor.frame': { state: value, attributes: {} },
      'sensor.x': { state: '0', attributes: { unit_of_measurement: 'cm' } },
      'sensor.y': { state: '769.5', attributes: { unit_of_measurement: 'cm' } },
    },
  } as unknown as HomeAssistant;
}
const frame = (t: number[][], s?: number[]) => JSON.stringify({ v: 1, f: 5, ts: 1000, t, ...(s ? { s } : {}) });

describe('LD2450 coherent target readings', () => {
  it('ignores mixed per-axis coordinates when the atomic frame is configured', () => {
    const r = ld2450Adapter.readFromHass(hass(frame([[95.5, 98.7, 0]], [0])), config);
    expect(r.targets).toMatchObject([{ index: 0, rawX: 95.5, rawY: 98.7 }]);
  });
  it('keeps slot 1 when slot 0 disappears (recorded 6.9 m apparent jump)', () => {
    const before = ld2450Adapter.readFromHass(
      hass(
        frame(
          [
            [95.5, 98.7, 0],
            [-83.7, 769.5, 0],
          ],
          [0, 1],
        ),
      ),
      config,
    );
    const after = ld2450Adapter.readFromHass(hass(frame([[-82.5, 769.7, 0]], [1])), config);
    expect(before.targets.map((t) => t.index)).toEqual([0, 1]);
    expect(after.targets.map((t) => t.index)).toEqual([1]);
    expect(
      Math.hypot(after.targets[0].rawX - before.targets[1].rawX, after.targets[0].rawY - before.targets[1].rawY),
    ).toBeLessThan(2);
  });
  it('does not resurrect stale coordinates on empty or invalid frames', () => {
    for (const value of [frame([]), 'unknown', 'unavailable', 'broken']) {
      expect(ld2450Adapter.readFromHass(hass(value), config).targets).toEqual([]);
    }
  });
  it('supports older frames and legacy per-axis configurations', () => {
    expect(ld2450Adapter.readFromHass(hass(frame([[50, 100, 0]])), config).targets[0].rawY).toBe(100);
    expect(ld2450Adapter.readFromHass(hass('unknown'), { ...config, frame_entity: undefined }).targets[0].rawY).toBe(
      769.5,
    );
  });
  it('validates slot metadata without changing old frame semantics', () => {
    for (const slots of [[0, 0], [0], [-1, 2], [0, 1.5], [0, 32]]) {
      expect(
        parseAtomicTargetFrame(
          frame(
            [
              [1, 2, 0],
              [3, 4, 0],
            ],
            slots,
          ),
        ),
      ).toBeUndefined();
    }
    expect(
      parseAtomicTargetFrame(
        frame(
          [
            [0, 0, 0],
            [3, 4, 0],
          ],
          [0, 2],
        ),
      )?.targets[0].slot,
    ).toBe(2);
  });
});

describe('live trail continuity', () => {
  it('breaks the recorded jump without suppressing the destination measurement', () => {
    expect(continuesTrail({ x: 95.5, y: 98.7 }, { x: -82.5, y: 769.7 }, 179)).toBe(false);
  });
  it('keeps normal walking and jitter continuous', () => {
    expect(continuesTrail({ x: 10, y: 100 }, { x: 30, y: 110 }, 100)).toBe(true);
  });
  it('breaks across missing updates or reversed time', () => {
    expect(continuesTrail({ x: 10, y: 100 }, { x: 10, y: 100 }, 1100)).toBe(false);
    expect(continuesTrail({ x: 10, y: 100 }, { x: 10, y: 100 }, -1)).toBe(false);
  });
});
