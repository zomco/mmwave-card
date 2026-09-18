import { describe, expect, it } from 'vitest';
import { calibratedImageWidth, floorplanValues, imagePointToRoom, roomPointToImage } from '../src/utils/floorplan';

describe('floor plan coordinates', () => {
  it('round trips after rotation, scaling and negative offsets', () => {
    const config = { url: '/local/plan.png', width_cm: 800, offset_x_cm: -40, offset_y_cm: 25, rotation: 37 };
    const point = { x: 0.25, y: 0.7 };
    const room = imagePointToRoom(point, config, 400);
    const restored = roomPointToImage(room, config, 400);
    expect(restored.x).toBeCloseTo(point.x, 10);
    expect(restored.y).toBeCloseTo(point.y, 10);
  });
  it('rotates clockwise in room coordinates without changing scale', () => {
    const config = { url: '/local/plan.png', width_cm: 500, rotation: 90 };
    expect(imagePointToRoom({ x: 1, y: 0 }, config, 400).y).toBeCloseTo(500);
    expect(imagePointToRoom({ x: 0, y: 1 }, config, 400).x).toBeCloseTo(-500);
  });
  it('calibrates image width from a diagonal segment and rejects invalid lengths', () => {
    expect(calibratedImageWidth({ x: 0, y: 0 }, { x: 0.3, y: 0.4 }, 250)).toBeCloseTo(500);
    expect(calibratedImageWidth({ x: 0, y: 0 }, { x: 0, y: 0 }, 100)).toBeUndefined();
    expect(calibratedImageWidth({ x: 0, y: 0 }, { x: 1, y: 0 }, -1)).toBeUndefined();
  });
  it('defaults to room width and bounds invalid numeric settings', () => {
    expect(floorplanValues({ url: 'x' }, 400)).toEqual({ width: 400, x: 0, y: 0, angle: 0, opacity: 0.45 });
    expect(floorplanValues({ url: 'x', width_cm: NaN, opacity: 3, offset_x_cm: Infinity }, 400)).toMatchObject({
      width: 400,
      opacity: 1,
      x: 0,
    });
  });
});
