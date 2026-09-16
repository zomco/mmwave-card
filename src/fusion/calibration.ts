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
  const points = references
    .map((reference) => ({ room: reference.room, reading: reference.readings[radarId] }))
    .filter((point): point is { room: Vec2; reading: CapturedRadarReading } => Boolean(point.reading));
  if (points.length < 2) return undefined;

  const rawCenter = {
    x: points.reduce((sum, point) => sum + point.reading.rawX, 0) / points.length,
    y: points.reduce((sum, point) => sum + point.reading.rawY, 0) / points.length,
  };
  const roomCenter = {
    x: points.reduce((sum, point) => sum + point.room.x, 0) / points.length,
    y: points.reduce((sum, point) => sum + point.room.y, 0) / points.length,
  };
  let dot = 0;
  let cross = 0;
  for (const point of points) {
    const px = point.reading.rawX - rawCenter.x;
    const py = point.reading.rawY - rawCenter.y;
    const qx = point.room.x - roomCenter.x;
    const qy = point.room.y - roomCenter.y;
    dot += px * qx + py * qy;
    cross += px * qy - py * qx;
  }
  if (Math.hypot(dot, cross) < 1) return undefined;
  const standardRotation = Math.atan2(cross, dot);
  const yaw = normalizeDegrees((-standardRotation * 180) / Math.PI);
  const cos = Math.cos(standardRotation);
  const sin = Math.sin(standardRotation);
  const radarX = roomCenter.x - (cos * rawCenter.x - sin * rawCenter.y);
  const radarY = roomCenter.y - (sin * rawCenter.x + cos * rawCenter.y);
  const calibration: CalibrationConfig = {
    ...current,
    radar_x: roundOne(radarX),
    radar_y: roundOne(radarY),
    yaw: roundOne(yaw),
  };
  const before = points.map((point) => {
    const transformed = applyTransform(point.reading.rawX, point.reading.rawY, point.reading.rawZ, current);
    return Math.hypot(transformed.roomX - point.room.x, transformed.roomY - point.room.y);
  });
  const after = points.map((point) => {
    const transformed = applyTransform(point.reading.rawX, point.reading.rawY, point.reading.rawZ, calibration);
    return Math.hypot(transformed.roomX - point.room.x, transformed.roomY - point.room.y);
  });
  let referenceSpanCm = 0;
  for (let left = 0; left < points.length; left += 1) {
    for (let right = left + 1; right < points.length; right += 1) {
      referenceSpanCm = Math.max(
        referenceSpanCm,
        Math.hypot(points[left].room.x - points[right].room.x, points[left].room.y - points[right].room.y),
      );
    }
  }
  return {
    radarId,
    calibration,
    pointCount: points.length,
    sampleCount: points.reduce((sum, point) => sum + point.reading.samples, 0),
    referenceSpanCm: roundOne(referenceSpanCm),
    residualBeforeCm: roundOne(rms(before)),
    residualAfterCm: roundOne(rms(after)),
    maxResidualCm: roundOne(Math.max(...after)),
  };
}
