import type { CalibrationConfig, Vec2 } from '../types';
import { applyTransform } from '../utils/transform';

export interface CapturedRadarReading {
  rawX: number;
  rawY: number;
  rawZ: number;
  samples: number;
  spreadCm: number;
}

export interface FusionCalibrationReference {
  id: string;
  room: Vec2;
  readings: Record<string, CapturedRadarReading>;
}

export interface RadarCalibrationSolution {
  radarId: string;
  retainedCurrent: boolean;
  excludedPointCount: number;
  calibration: CalibrationConfig;
  pointCount: number;
  sampleCount: number;
  referenceSpanCm: number;
  residualBeforeCm: number;
  residualAfterCm: number;
  maxResidualCm: number;
}

export interface RadarCalibrationAdjustment {
  radarX: number;
  radarY: number;
  yaw: number;
}

const normalizeDegrees = (value: number) => {
  let normalized = value;
  while (normalized > 180) normalized -= 360;
  while (normalized < -180) normalized += 360;
  return normalized;
};

const roundOne = (value: number) => Math.round(value * 10) / 10;

/** Describe the shortest manual X/Y/yaw adjustment from one installation to another. */
export function calculateCalibrationAdjustment(
  current: CalibrationConfig,
  reference: CalibrationConfig,
): RadarCalibrationAdjustment {
  return {
    radarX: roundOne(reference.radar_x - current.radar_x),
    radarY: roundOne(reference.radar_y - current.radar_y),
    yaw: roundOne(normalizeDegrees(reference.yaw - current.yaw)),
  };
}

const rms = (values: number[]) =>
  values.length ? Math.sqrt(values.reduce((sum, value) => sum + value * value, 0) / values.length) : Infinity;

/** Solve a 2-D rigid transform while preserving height, pitch and roll. */
export function solveRadarCalibration(
  radarId: string,
  current: CalibrationConfig,
  references: FusionCalibrationReference[],
): RadarCalibrationSolution | undefined {
  const points = references.flatMap((reference) => {
    const reading = reference.readings[radarId];
    if (
      !reading ||
      reading.samples < 3 ||
      reading.spreadCm > 30 ||
      ![reading.rawX, reading.rawY, reading.rawZ, reading.spreadCm, reference.room.x, reference.room.y].every(
        Number.isFinite,
      )
    )
      return [];
    const projected = applyTransform(reading.rawX, reading.rawY, reading.rawZ, {
      ...current,
      yaw: 0,
      radar_x: 0,
      radar_y: 0,
    });
    return [
      {
        room: reference.room,
        reading,
        x: projected.roomX,
        y: projected.roomY,
        weight: 1 / (900 + reading.spreadCm ** 2),
      },
    ];
  });
  if (points.length < 2) return undefined;
  type Point = (typeof points)[number];
  const fit = (selected: Point[]): CalibrationConfig | undefined => {
    const weight = selected.reduce((sum, p) => sum + p.weight, 0);
    const mean = (f: (p: Point) => number) => selected.reduce((sum, p) => sum + f(p) * p.weight, 0) / weight;
    const x = mean((p) => p.x),
      y = mean((p) => p.y);
    const qx = mean((p) => p.room.x),
      qy = mean((p) => p.room.y);
    let dot = 0,
      cross = 0;
    for (const p of selected) {
      dot += p.weight * ((p.x - x) * (p.room.x - qx) + (p.y - y) * (p.room.y - qy));
      cross += p.weight * ((p.x - x) * (p.room.y - qy) - (p.y - y) * (p.room.x - qx));
    }
    if (Math.hypot(dot, cross) < 0.001) return undefined;
    const angle = Math.atan2(cross, dot),
      cos = Math.cos(angle),
      sin = Math.sin(angle);
    return {
      ...current,
      yaw: roundOne(normalizeDegrees((-angle * 180) / Math.PI)),
      radar_x: roundOne(qx - cos * x + sin * y),
      radar_y: roundOne(qy - sin * x - cos * y),
    };
  };
  const error = (p: Point, cal: CalibrationConfig) => {
    const t = applyTransform(p.reading.rawX, p.reading.rawY, p.reading.rawZ, cal);
    return Math.hypot(t.roomX - p.room.x, t.roomY - p.room.y);
  };
  let selected = points;
  let candidate = fit(points);
  if (!candidate) return undefined;
  // A station is approximate (about 30 cm). Reject gross outliers only when
  // at least three stations and a 75% consensus independently support a fit.
  if (points.length >= 4) {
    let bestScore = Infinity;
    for (let a = 0; a < points.length; a++)
      for (let b = a + 1; b < points.length; b++) {
        const proposal = fit([points[a], points[b]]);
        if (!proposal) continue;
        const inliers = points.filter((p) => error(p, proposal) <= 60);
        if (inliers.length < Math.max(3, Math.ceil(points.length * 0.75))) continue;
        const refined = fit(inliers);
        if (!refined) continue;
        const score =
          (points.length - inliers.length) * 3600 + inliers.reduce((sum, p) => sum + error(p, refined) ** 2, 0);
        if (score < bestScore) {
          bestScore = score;
          selected = inliers;
          candidate = refined;
        }
      }
  }
  const before = selected.map((p) => error(p, current));
  const proposed = selected.map((p) => error(p, candidate));
  // Do not chase ordinary radar / standing-position noise on repeat calibration.
  const retainedCurrent = rms(before) <= 40 && rms(before) - rms(proposed) < 15 && Math.max(...before) <= 60;
  const calibration = retainedCurrent ? { ...current } : candidate;
  const after = selected.map((p) => error(p, calibration));
  let referenceSpanCm = 0;
  for (const a of selected)
    for (const b of selected) {
      referenceSpanCm = Math.max(referenceSpanCm, Math.hypot(a.room.x - b.room.x, a.room.y - b.room.y));
    }
  return {
    radarId,
    calibration,
    retainedCurrent,
    excludedPointCount: points.length - selected.length,
    pointCount: selected.length,
    sampleCount: selected.reduce((sum, p) => sum + p.reading.samples, 0),
    referenceSpanCm: roundOne(referenceSpanCm),
    residualBeforeCm: roundOne(rms(before)),
    residualAfterCm: roundOne(rms(after)),
    maxResidualCm: roundOne(Math.max(...after)),
  };
}
