import { describe, expect, it } from 'vitest';

import {
  calculateCalibrationAdjustment,
  solveRadarCalibration,
  type FusionCalibrationReference,
} from '../src/fusion/calibration';
import { DEFAULT_CALIBRATION, type CalibrationConfig } from '../src/types';
import { applyTransform } from '../src/utils/transform';

const calibration = (overrides: Partial<CalibrationConfig> = {}): CalibrationConfig => ({
  ...DEFAULT_CALIBRATION,
  radar_x: 0,
  radar_y: 0,
  radar_z: 220,
  yaw: 0,
  pitch: 0,
  roll: 0,
  polygon: [],
  ...overrides,
});

describe('solveRadarCalibration', () => {
  it('reports the per-radar reference span used by guided calibration readiness', () => {
    const truth = calibration({ radar_x: 85, radar_y: 40, yaw: 32 });
    const rawPoints = [
      { x: 0, y: 100 },
      { x: 0, y: 310 },
      { x: 190, y: 120 },
    ];
    const references: FusionCalibrationReference[] = rawPoints.map((raw, index) => {
      const room = applyTransform(raw.x, raw.y, 0, truth);
      return {
        id: `region_${index}`,
        room: { x: room.roomX, y: room.roomY },
        readings: {
          radar_1: { rawX: raw.x, rawY: raw.y, rawZ: 0, samples: 4, spreadCm: 1 },
        },
      };
    });

    const solution = solveRadarCalibration('radar_1', calibration(), references);

    expect(solution).toBeDefined();
    expect(solution?.pointCount).toBe(3);
    expect(solution?.referenceSpanCm).toBeGreaterThan(120);
    expect(solution?.residualAfterCm).toBeLessThan(0.1);
    expect(solution?.calibration.yaw).toBeCloseTo(truth.yaw, 1);
    expect(solution?.calibration.radar_x).toBeCloseTo(truth.radar_x, 1);
    expect(solution?.calibration.radar_y).toBeCloseTo(truth.radar_y, 1);
  });

  it('measures span only from references captured by the selected radar', () => {
    const references: FusionCalibrationReference[] = [
      {
        id: 'region_a',
        room: { x: 0, y: 0 },
        readings: { radar_1: { rawX: 0, rawY: 0, rawZ: 0, samples: 3, spreadCm: 1 } },
      },
      {
        id: 'region_b',
        room: { x: 300, y: 300 },
        readings: { radar_2: { rawX: 0, rawY: 0, rawZ: 0, samples: 3, spreadCm: 1 } },
      },
      {
        id: 'region_c',
        room: { x: 50, y: 0 },
        readings: { radar_1: { rawX: 50, rawY: 0, rawZ: 0, samples: 3, spreadCm: 1 } },
      },
    ];

    const solution = solveRadarCalibration('radar_1', calibration(), references);

    expect(solution?.referenceSpanCm).toBe(50);
  });
});

describe('calculateCalibrationAdjustment', () => {
  it('reports signed position deltas and the shortest yaw correction', () => {
    const adjustment = calculateCalibrationAdjustment(
      calibration({ radar_x: 30, radar_y: 390, yaw: 135 }),
      calibration({ radar_x: 445.5, radar_y: 34.8, yaw: -70.2 }),
    );

    expect(adjustment).toEqual({ radarX: 415.5, radarY: -355.2, yaw: 154.8 });
  });

  it('normalizes a positive wraparound to a small negative yaw correction', () => {
    const adjustment = calculateCalibrationAdjustment(
      calibration({ yaw: -175 }),
      calibration({ yaw: 170 }),
    );

    expect(adjustment.yaw).toBe(-15);
  });
});
