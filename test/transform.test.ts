import { describe, expect, it } from 'vitest';

import { applyTransform, calcCalibrationResidual, calcYawFromTwoPoints, pointInPolygon } from '../src/utils/transform';
import { DEFAULT_CALIBRATION } from '../src/types';
import type { CalibrationConfig, Vec2 } from '../src/types';

const cal = (over: Partial<CalibrationConfig> = {}): CalibrationConfig => ({
  ...DEFAULT_CALIBRATION,
  radar_x: 0,
  radar_y: 0,
  radar_z: 0,
  yaw: 0,
  pitch: 0,
  roll: 0,
  polygon: [],
  ...over,
});

describe('applyTransform — room-frame convention', () => {
  // These four cases pin the convention that mmwave-component (C++) and
  // mmwave_fusion (Python) also implement. tests/unit/test_rotation_convention.py
  // in the workspace guards all three against each other; this suite guards the
  // TypeScript side on its own, so the card repo fails independently.
  it('aims along room +Y at yaw 0', () => {
    const r = applyTransform(0, 100, 0, cal());
    expect(r.roomX).toBeCloseTo(0, 6);
    expect(r.roomY).toBeCloseTo(100, 6);
  });

  it('turns clockwise toward +X for positive yaw', () => {
    const r = applyTransform(0, 100, 0, cal({ yaw: 90 }));
    expect(r.roomX).toBeCloseTo(100, 6);
    expect(r.roomY).toBeCloseTo(0, 6);
  });

  it('maps radar +X to room +X at yaw 0', () => {
    const r = applyTransform(100, 0, 0, cal());
    expect(r.roomX).toBeCloseTo(100, 6);
    expect(r.roomY).toBeCloseTo(0, 6);
  });

  it('translates by the radar position', () => {
    const r = applyTransform(0, 100, 0, cal({ radar_x: 30, radar_y: -40 }));
    expect(r.roomX).toBeCloseTo(30, 6);
    expect(r.roomY).toBeCloseTo(60, 6);
  });

  it('measures height downward from the radar, not upward', () => {
    // A ceiling radar at 250 cm seeing a target 100 cm below its own frame
    // must report 150 cm above the floor. A sign flip here silently turns
    // ceiling installations upside down.
    const r = applyTransform(0, 0, 100, cal({ radar_z: 250 }));
    expect(r.roomZ).toBeCloseTo(150, 6);
  });

  it('is its own inverse over a yaw round trip', () => {
    const forward = applyTransform(37, 121, 0, cal({ yaw: 35 }));
    const back = applyTransform(forward.roomX, forward.roomY, 0, cal({ yaw: -35 }));
    expect(back.roomX).toBeCloseTo(37, 6);
    expect(back.roomY).toBeCloseTo(121, 6);
  });

  it('preserves distance from the radar under pure rotation', () => {
    for (const yaw of [0, 17, 90, -143, 180]) {
      const r = applyTransform(60, 80, 0, cal({ yaw }));
      expect(Math.hypot(r.roomX, r.roomY)).toBeCloseTo(100, 6);
    }
  });
});

describe('pointInPolygon', () => {
  const square: Vec2[] = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 },
  ];

  it('accepts an interior point', () => {
    expect(pointInPolygon(50, 50, square)).toBe(true);
  });

  it('rejects an exterior point', () => {
    expect(pointInPolygon(150, 50, square)).toBe(false);
    expect(pointInPolygon(-1, 50, square)).toBe(false);
    expect(pointInPolygon(50, 150, square)).toBe(false);
  });

  it('does not filter when the polygon is degenerate', () => {
    // Fewer than three vertices means "no boundary configured", which must
    // pass everything rather than reject everything.
    expect(pointInPolygon(9999, 9999, [])).toBe(true);
    expect(pointInPolygon(9999, 9999, [{ x: 0, y: 0 }])).toBe(true);
    expect(pointInPolygon(9999, 9999, [{ x: 0, y: 0 }, { x: 1, y: 1 }])).toBe(true);
  });

  it('handles a concave polygon', () => {
    const l: Vec2[] = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 40 },
      { x: 40, y: 40 },
      { x: 40, y: 100 },
      { x: 0, y: 100 },
    ];
    expect(pointInPolygon(20, 20, l)).toBe(true);
    expect(pointInPolygon(80, 20, l)).toBe(true);
    expect(pointInPolygon(80, 80, l)).toBe(false); // the notch
  });

  it('reports inBoundary through applyTransform', () => {
    const inside = applyTransform(0, 50, 0, cal({ radar_x: 50, radar_y: 0, polygon: square }));
    const outside = applyTransform(0, 500, 0, cal({ radar_x: 50, radar_y: 0, polygon: square }));
    expect(inside.inBoundary).toBe(true);
    expect(outside.inBoundary).toBe(false);
  });
});

describe('calcYawFromTwoPoints', () => {
  it('returns zero when detection already matches the map', () => {
    const a = { x: 0, y: 0 };
    const b = { x: 0, y: 100 };
    expect(calcYawFromTwoPoints(a, b, a, b)).toBeCloseTo(0, 6);
  });

  it('recovers a known rotation', () => {
    // Map says the pair runs along +X; the radar sees it along +Y. Rotating the
    // detection clockwise by +90 (the room convention) lands it on +X.
    const yaw = calcYawFromTwoPoints({ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 100 });
    expect(yaw).toBeCloseTo(90, 6);
    const landed = applyTransform(0, 100, 0, cal({ yaw }));
    expect(landed.roomX).toBeCloseTo(100, 6);
    expect(landed.roomY).toBeCloseTo(0, 6);
  });

  it('normalises into (-180, 180]', () => {
    for (const [mx, my] of [
      [-100, 0],
      [0, -100],
      [70, -70],
    ]) {
      const yaw = calcYawFromTwoPoints({ x: 0, y: 0 }, { x: mx, y: my }, { x: 0, y: 0 }, { x: 0, y: 100 });
      expect(yaw).toBeGreaterThan(-180.001);
      expect(yaw).toBeLessThanOrEqual(180);
    }
  });

  it('round-trips through applyTransform', () => {
    // Solving for yaw and then applying it should land the detection on the map.
    const mapA = { x: 0, y: 0 };
    const mapB = { x: 100, y: 0 };
    const detA = { x: 0, y: 0 };
    const detB = { x: 0, y: 100 };
    const yaw = calcYawFromTwoPoints(mapA, mapB, detA, detB);
    const t = applyTransform(detB.x, detB.y, 0, cal({ yaw }));
    expect(t.roomX).toBeCloseTo(mapB.x, 4);
    expect(t.roomY).toBeCloseTo(mapB.y, 4);
  });

  // Regression: this returned `am - ad`, the negated yaw. Every two-point
  // calibration came out mirrored, and the residual the UI shows as a quality
  // score reported roughly the full A-B separation instead of ~0.
  it('yields a near-zero residual, not a mirrored one', () => {
    // The solver recovers rotation only, so build each case from a known
    // (yaw, radar position) and derive the map points through applyTransform.
    // The residual is then ~0 exactly when the recovered yaw is correct; with
    // the old negated formula it came out at roughly the A-B separation.
    const cases: Array<{ yaw: number; rx: number; ry: number; detA: Vec2; detB: Vec2 }> = [
      { yaw: 90, rx: 0, ry: 0, detA: { x: 0, y: 0 }, detB: { x: 0, y: 100 } },
      { yaw: -35, rx: 120, ry: -40, detA: { x: 20, y: 60 }, detB: { x: -30, y: 180 } },
      { yaw: 137, rx: -80, ry: 55, detA: { x: -10, y: 30 }, detB: { x: 45, y: 210 } },
      { yaw: 0, rx: 15, ry: 15, detA: { x: 5, y: 5 }, detB: { x: 5, y: 305 } },
    ];
    for (const { yaw, rx, ry, detA, detB } of cases) {
      const truth = cal({ yaw, radar_x: rx, radar_y: ry });
      const tA = applyTransform(detA.x, detA.y, 0, truth);
      const tB = applyTransform(detB.x, detB.y, 0, truth);
      const mapA = { x: tA.roomX, y: tA.roomY };
      const mapB = { x: tB.roomX, y: tB.roomY };

      const solved = calcYawFromTwoPoints(mapA, mapB, detA, detB);
      expect(solved).toBeCloseTo(yaw, 3);

      const residual = calcCalibrationResidual(mapA, mapB, detA, detB, cal({ yaw: solved, radar_x: rx, radar_y: ry }));
      expect(residual).toBeLessThan(0.5);
    }
  });

  it('agrees with a yaw applied in the forward direction', () => {
    // Rotate a known pair by a known yaw, then check the solver recovers it.
    for (const trueYaw of [0, 25, -70, 137]) {
      const detA = { x: 0, y: 0 };
      const detB = { x: 0, y: 150 };
      const tA = applyTransform(detA.x, detA.y, 0, cal({ yaw: trueYaw }));
      const tB = applyTransform(detB.x, detB.y, 0, cal({ yaw: trueYaw }));
      const solved = calcYawFromTwoPoints({ x: tA.roomX, y: tA.roomY }, { x: tB.roomX, y: tB.roomY }, detA, detB);
      expect(solved).toBeCloseTo(trueYaw, 3);
    }
  });
});
