import type { FloorplanConfig, Vec2 } from '../types';
import { floorplanImage, floorplanValues, imagePointToRoom, roomPointToImage } from './floorplan';

export interface EdgeMap {
  width: number;
  height: number;
  edges: Uint8Array;
}
const maps = new WeakMap<HTMLImageElement, EdgeMap | null>();

/** Contrast edges on a white background; transparent pixels are not walls. */
export function buildEdges(data: Uint8ClampedArray, width: number, height: number): EdgeMap {
  const gray = new Float32Array(width * height),
    edges = new Uint8Array(width * height);
  for (let i = 0; i < gray.length; i++) {
    const a = data[i * 4 + 3] / 255;
    gray[i] = (data[i * 4] * 0.299 + data[i * 4 + 1] * 0.587 + data[i * 4 + 2] * 0.114) * a + 255 * (1 - a);
  }
  for (let y = 1; y < height - 1; y++)
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      edges[i] =
        Math.max(Math.abs(gray[i + 1] - gray[i - 1]), Math.abs(gray[i + width] - gray[i - width])) >= 60 ? 1 : 0;
    }
  return { width, height, edges };
}

export function nearestEdge(map: EdgeMap, point: Vec2, radius: number): Vec2 | undefined {
  let best = radius * radius,
    result: Vec2 | undefined;
  for (let y = Math.max(0, Math.floor(point.y - radius)); y <= Math.min(map.height - 1, point.y + radius); y++)
    for (let x = Math.max(0, Math.floor(point.x - radius)); x <= Math.min(map.width - 1, point.x + radius); x++) {
      const distance = (x - point.x) ** 2 + (y - point.y) ** 2;
      if (map.edges[y * map.width + x] && distance < best) {
        best = distance;
        result = { x, y };
      }
    }
  return result;
}

export function tracePoint(
  point: Vec2,
  config: FloorplanConfig | undefined,
  roomW: number,
  radiusCm: number,
): { point: Vec2; unavailable?: boolean; snapped?: boolean } {
  if (!config || config.visible === false) return { point };
  const cached = floorplanImage(config.url);
  if (cached?.status !== 'ready') return { point };
  const image = cached.image;
  if (!maps.has(image)) {
    try {
      const scale = Math.min(1, 1024 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      maps.set(
        image,
        buildEdges(ctx.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height),
      );
    } catch {
      maps.set(image, null);
    }
  }
  const map = maps.get(image);
  if (!map) return { point, unavailable: true };
  const p = roomPointToImage(point, config, roomW);
  const edge = nearestEdge(
    map,
    { x: p.x * map.width, y: p.y * map.width },
    Math.min(40, (radiusCm / floorplanValues(config, roomW).width) * map.width),
  );
  return edge
    ? { point: imagePointToRoom({ x: edge.x / map.width, y: edge.y / map.width }, config, roomW), snapped: true }
    : { point };
}
