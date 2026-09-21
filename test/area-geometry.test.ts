import { describe, expect, it } from 'vitest';

import {
  areaWarnings,
  centroid,
  formatPolygon,
  parsePolygon,
  polygonsOverlap,
  shortSide,
} from '../src/utils/area-geometry';

const desk = [
  { x: 0, y: 0 },
  { x: 180, y: 0 },
  { x: 180, y: 180 },
  { x: 0, y: 180 },
];
const bed = [
  { x: 250, y: 0 },
  { x: 430, y: 0 },
  { x: 430, y: 180 },
  { x: 250, y: 180 },
];
const close = [
  { x: 100, y: 0 },
  { x: 280, y: 0 },
  { x: 280, y: 180 },
  { x: 100, y: 180 },
];

describe('area geometry', () => {
  it('parses and formats the firmware polygon string', () => {
    expect(parsePolygon('10,20; 30,40')).toEqual([
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ]);
    expect(formatPolygon(desk.slice(0, 2))).toBe('0,0;180,0');
  });

  it('computes centroid and short side', () => {
    expect(centroid(desk)).toEqual({ x: 90, y: 90 });
    expect(shortSide(desk)).toBe(180);
  });

  it('warns when areas are too close or overlap', () => {
    expect(areaWarnings([desk, bed])).toEqual([]);
    expect(areaWarnings([desk, close]).some((w) => w.startsWith('close'))).toBe(true);
    expect(polygonsOverlap(desk, close)).toBe(true);
    expect(areaWarnings([desk.slice(0, 4).map((p) => ({ ...p, x: p.x * 0.5 }))]).some((w) => w.startsWith('small'))).toBe(
      true,
    );
  });
});
