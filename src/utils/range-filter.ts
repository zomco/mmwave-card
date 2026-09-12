import type { CalibrationConfig } from '../types';
export function rangeContains(distance: number, cal: CalibrationConfig): boolean {
  return (
    Number.isFinite(distance) &&
    distance >= (cal.distance_min ?? 0) &&
    (!(cal.distance_max! > 0) || distance <= cal.distance_max!)
  );
}
export function nativeRangeLimited(maxM: number | undefined, cal: CalibrationConfig): boolean {
  return maxM !== undefined && maxM > 0 && (cal.distance_max ?? 0) > maxM * 100;
}
