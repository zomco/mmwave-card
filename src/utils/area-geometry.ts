import type { Vec2 } from '../types';
import { pointInPolygon } from './transform';

export const AREA_COLORS = ['#0b825c', '#03a9f4', '#e91e63'] as const;
export const MIN_AREA_SHORT_SIDE_CM = 150;
export const MIN_AREA_CENTROID_GAP_CM = 200;
export const DEFAULT_AREA_SIDE_CM = 180;

export function defaultAreaPolygon(center: Vec2, roomW: number, roomD: number, side = DEFAULT_AREA_SIDE_CM): Vec2[] {
  const half = side / 2;
  let x0 = center.x - half;
  let y0 = center.y - half;
  let x1 = center.x + half;
  let y1 = center.y + half;
  if (x0 < 0) {
    x1 -= x0;
    x0 = 0;
  }
  if (y0 < 0) {
    y1 -= y0;
    y0 = 0;
  }
  if (x1 > roomW) {
    x0 -= x1 - roomW;
    x1 = roomW;
  }
  if (y1 > roomD) {
    y0 -= y1 - roomD;
    y1 = roomD;
  }
  x0 = Math.max(0, Math.round(x0));
  y0 = Math.max(0, Math.round(y0));
  x1 = Math.min(roomW, Math.round(x1));
  y1 = Math.min(roomD, Math.round(y1));
  return [
    { x: x0, y: y0 },
    { x: x1, y: y0 },
    { x: x1, y: y1 },
    { x: x0, y: y1 },
  ];
}

export function centroid(polygon: Vec2[]): Vec2 | null {
  if (polygon.length < 3) return null;
  const sum = polygon.reduce((acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }), { x: 0, y: 0 });
  return { x: sum.x / polygon.length, y: sum.y / polygon.length };
}

export function shortSide(polygon: Vec2[]): number {
  if (polygon.length < 3) return 0;
  const xs = polygon.map((p) => p.x);
  const ys = polygon.map((p) => p.y);
  return Math.min(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
}

export function polygonsOverlap(a: Vec2[], b: Vec2[]): boolean {
  if (a.length < 3 || b.length < 3) return false;
  return a.some((p) => pointInPolygon(p.x, p.y, b)) || b.some((p) => pointInPolygon(p.x, p.y, a));
}

export function areaWarnings(areas: Vec2[][]): string[] {
  const ready = areas
    .map((polygon, index) => ({ polygon, index, center: centroid(polygon) }))
    .filter((item) => item.center && item.polygon.length >= 3) as Array<{
    polygon: Vec2[];
    index: number;
    center: Vec2;
  }>;
  const warnings: string[] = [];
  for (const item of ready) {
    if (shortSide(item.polygon) < MIN_AREA_SHORT_SIDE_CM) warnings.push(`small:${item.index}`);
  }
  for (let i = 0; i < ready.length; i++) {
    for (let j = i + 1; j < ready.length; j++) {
      const dx = ready[i].center.x - ready[j].center.x;
      const dy = ready[i].center.y - ready[j].center.y;
      if (Math.hypot(dx, dy) < MIN_AREA_CENTROID_GAP_CM) warnings.push(`close:${ready[i].index}:${ready[j].index}`);
      if (polygonsOverlap(ready[i].polygon, ready[j].polygon))
        warnings.push(`overlap:${ready[i].index}:${ready[j].index}`);
    }
  }
  return warnings;
}

export function parsePolygon(value: string): Vec2[] {
  return value
    .split(';')
    .map((part) => part.trim())
    .filter((part) => part.includes(','))
    .map((part) => {
      const [x, y] = part.split(',');
      return { x: parseFloat(x), y: parseFloat(y) };
    })
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y));
}

export function formatPolygon(polygon: Vec2[]): string {
  return polygon.map((point) => `${point.x},${point.y}`).join(';');
}
