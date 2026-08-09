/**
 * 3-D coordinate transform  (model-agnostic)
 * Rotation order: Rz(yaw) · Rx(pitch) · Ry(roll)
 */

import type { CalibrationConfig, Vec2, TransformResult } from '../types';

type Mat3 = [[number, number, number], [number, number, number], [number, number, number]];

function buildRotation(yawDeg: number, pitchDeg: number, rollDeg: number): Mat3 {
  const d = Math.PI / 180;
  const γ = yawDeg * d,
    α = pitchDeg * d,
    β = rollDeg * d;
  const [sγ, cγ, sα, cα, sβ, cβ] = [Math.sin(γ), Math.cos(γ), Math.sin(α), Math.cos(α), Math.sin(β), Math.cos(β)];
  return [
    [cγ * cβ + sγ * sα * sβ, sγ * cα, -cγ * sβ + sγ * sα * cβ],
    [-sγ * cβ + cγ * sα * sβ, cγ * cα, sγ * sβ + cγ * sα * cβ],
    [cα * sβ, -sα, cα * cβ],
  ];
}

/**射线法点在多边形内测试；顶点 < 3 时始终返回 true（不过滤）。 */
export function pointInPolygon(px: number, py: number, poly: Vec2[]): boolean {
  const n = poly.length;
  if (n < 3) return true;
  let inside = false;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = poly[i].x,
      yi = poly[i].y,
      xj = poly[j].x,
      yj = poly[j].y;
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** Apply full 3-D rotation + translation + boundary test. */
export function applyTransform(rx: number, ry: number, rz: number, cal: CalibrationConfig): TransformResult {
  const R = buildRotation(cal.yaw, cal.pitch, cal.roll);
  const wx = R[0][0] * rx + R[0][1] * ry + R[0][2] * rz;
  const wy = R[1][0] * rx + R[1][1] * ry + R[1][2] * rz;
  const wz = R[2][0] * rx + R[2][1] * ry + R[2][2] * rz;
  const roomX = cal.radar_x + wx;
  const roomY = cal.radar_y + wy;
  const roomZ = cal.radar_z - wz;
  return { roomX, roomY, roomZ, inBoundary: pointInPolygon(roomX, roomY, cal.polygon) };
}

/**
 * Two-point geometric yaw calculation.
 *
 * buildRotation maps a radar-local vector to the room by *decreasing* its
 * standard math angle by yaw, so solving R(yaw)·det = map gives
 *   angle(map) = angle(det) - yaw   ->   yaw = angle(det) - angle(map)
 *
 * This previously returned `am - ad`, i.e. the negated yaw, which mirrored
 * every two-point calibration and left calcCalibrationResidual reporting
 * roughly the full A-B separation instead of ~0.
 */
export function calcYawFromTwoPoints(mapA: Vec2, mapB: Vec2, detA: Vec2, detB: Vec2): number {
  const am = Math.atan2(mapB.y - mapA.y, mapB.x - mapA.x);
  const ad = Math.atan2(detB.y - detA.y, detB.x - detA.x);
  let y = (ad - am) * (180 / Math.PI);
  while (y > 180) y -= 360;
  while (y < -180) y += 360;
  return Math.round(y * 10) / 10;
}

export function calcCalibrationResidual(
  mapA: Vec2,
  mapB: Vec2,
  detA: Vec2,
  detB: Vec2,
  cal: CalibrationConfig,
): number {
  const tA = applyTransform(detA.x, detA.y, 0, cal);
  const tB = applyTransform(detB.x, detB.y, 0, cal);
  return (Math.hypot(tA.roomX - mapA.x, tA.roomY - mapA.y) + Math.hypot(tB.roomX - mapB.x, tB.roomY - mapB.y)) / 2;
}
