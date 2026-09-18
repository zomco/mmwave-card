import type { Vec2 } from '../types';
import { pointInPolygon } from './transform';

/** The whole standing circle must fit, including at concave corners. */
export function standingAreaFits(
  point: Vec2,
  radius: number,
  width: number,
  depth: number,
  boundaries: Vec2[][],
): boolean {
  if (
    ![point.x, point.y, radius, width, depth].every(Number.isFinite) ||
    radius <= 0 ||
    point.x < radius ||
    point.y < radius ||
    point.x > width - radius ||
    point.y > depth - radius
  )
    return false;
  const polygons = boundaries.filter((p) => p.length >= 3);
  return (
    polygons.length === 0 ||
    polygons.some((polygon) => {
      if (
        !polygon.every((p) => Number.isFinite(p.x) && Number.isFinite(p.y)) ||
        !pointInPolygon(point.x, point.y, polygon)
      )
        return false;
      return polygon.every((a, i) => {
        const b = polygon[(i + 1) % polygon.length];
        const dx = b.x - a.x,
          dy = b.y - a.y;
        const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / (dx * dx + dy * dy || 1)));
        return Math.hypot(point.x - a.x - t * dx, point.y - a.y - t * dy) >= radius;
      });
    })
  );
}
