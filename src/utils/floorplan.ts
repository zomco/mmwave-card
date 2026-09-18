import type { FloorplanConfig, Vec2 } from '../types';
import type { CanvasMetrics } from './canvas';

interface CachedImage {
  image: HTMLImageElement;
  status: 'loading' | 'ready' | 'error';
  listeners: Set<() => void>;
}
const cache = new Map<string, CachedImage>();
const finite = (value: unknown, fallback: number) =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;

export function floorplanValues(config: FloorplanConfig, roomWidth: number) {
  return {
    width: Math.max(1, finite(config.width_cm, roomWidth)),
    x: finite(config.offset_x_cm, 0),
    y: finite(config.offset_y_cm, 0),
    angle: (finite(config.rotation, 0) * Math.PI) / 180,
    opacity: Math.max(0, Math.min(1, finite(config.opacity, 0.45))),
  };
}

export function floorplanImage(url: string, onReady?: () => void): CachedImage | undefined {
  if (typeof url !== 'string' || !url.trim()) return undefined;
  let resolved: URL;
  try {
    resolved = new URL(url, window.location.href);
  } catch {
    return undefined;
  }
  if (!['http:', 'https:'].includes(resolved.protocol)) return undefined;
  let entry = cache.get(resolved.href);
  if (!entry) {
    const image = new Image();
    entry = { image, status: 'loading', listeners: new Set() };
    cache.set(resolved.href, entry);
    if (cache.size > 16) cache.delete(cache.keys().next().value!);
    const settle = (status: CachedImage['status']) => {
      entry!.status = status;
      for (const listener of entry!.listeners) listener();
      entry!.listeners.clear();
    };
    image.onload = () => settle(image.naturalWidth > 0 ? 'ready' : 'error');
    image.onerror = () => settle('error');
    image.src = resolved.href;
  }
  if (entry.status === 'loading' && onReady) entry.listeners.add(onReady);
  return entry;
}

/** Image coordinates normalized by IMAGE WIDTH, so both axes share one scale. */
export function imagePointToRoom(point: Vec2, config: FloorplanConfig, roomWidth: number): Vec2 {
  const v = floorplanValues(config, roomWidth),
    c = Math.cos(v.angle),
    s = Math.sin(v.angle);
  return { x: v.x + v.width * (c * point.x - s * point.y), y: v.y + v.width * (s * point.x + c * point.y) };
}
export function roomPointToImage(point: Vec2, config: FloorplanConfig, roomWidth: number): Vec2 {
  const v = floorplanValues(config, roomWidth),
    c = Math.cos(v.angle),
    s = Math.sin(v.angle);
  const x = point.x - v.x,
    y = point.y - v.y;
  return { x: (c * x + s * y) / v.width, y: (-s * x + c * y) / v.width };
}
export function calibratedImageWidth(a: Vec2, b: Vec2, lengthCm: number): number | undefined {
  const distance = Math.hypot(b.x - a.x, b.y - a.y);
  return Number.isFinite(lengthCm) && lengthCm > 0 && distance > 0.001 ? lengthCm / distance : undefined;
}
export function drawFloorplan(
  ctx: CanvasRenderingContext2D,
  m: CanvasMetrics,
  config?: FloorplanConfig,
  onReady?: () => void,
): void {
  if (!config || config.visible === false) return;
  const cached = floorplanImage(config.url, onReady);
  if (cached?.status !== 'ready') return;
  const v = floorplanValues(config, m.roomW);
  const height = (v.width * cached.image.naturalHeight) / cached.image.naturalWidth;
  ctx.save();
  ctx.globalAlpha = v.opacity;
  ctx.scale(m.W / m.roomW, m.H / m.roomD);
  ctx.translate(v.x, v.y);
  ctx.rotate(v.angle);
  ctx.drawImage(cached.image, 0, 0, v.width, height);
  ctx.restore();
}
