import { expect, it } from 'vitest';
import { DEFAULT_CALIBRATION } from '../src/types';
import { rangeContains, nativeRangeLimited } from '../src/utils/range-filter';
it('uses radial limits independently of a fictitious polygon', () => {
  const cal = {
    ...DEFAULT_CALIBRATION,
    distance_min: 100,
    distance_max: 300,
    polygon: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ],
  };
  expect(rangeContains(100, cal)).toBe(true);
  expect(rangeContains(300, cal)).toBe(true);
  expect(rangeContains(99, cal)).toBe(false);
  expect(rangeContains(301, cal)).toBe(false);
  expect(rangeContains(NaN, cal)).toBe(false);
});
it('does not mistake unknown native bounds for unlimited coverage', () => {
  expect(nativeRangeLimited(undefined, { ...DEFAULT_CALIBRATION, distance_max: 600 })).toBe(false);
  expect(nativeRangeLimited(3, { ...DEFAULT_CALIBRATION, distance_max: 600 })).toBe(true);
  expect(rangeContains(1000, DEFAULT_CALIBRATION)).toBe(true);
});
