import { fitRoomMetrics, canvasToRoom } from '../src/utils/canvas';
import { describe, expect, it, vi } from 'vitest';
import { drawRadarFov, drawTargetArc, roomToCanvas, type CanvasMetrics } from '../src/utils/canvas';
import { applyTransform } from '../src/utils/transform';
import { DEFAULT_CALIBRATION } from '../src/types';
import { RADAR_MODELS } from '../src/models';

function canvasContext() {
  const mock = {
    beginPath: vi.fn(),
    closePath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    arc: vi.fn(),
    ellipse: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    setLineDash: vi.fn(),
    fillText: vi.fn(),
    roundRect: vi.fn(),
    measureText: vi.fn(() => ({ width: 12 })),
    createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  };
  return { mock, ctx: mock as unknown as CanvasRenderingContext2D };
}

const viewports: CanvasMetrics[] = [
  { W: 476, H: 340, roomW: 400, roomD: 350 },
  { W: 280, H: 340, roomW: 600, roomD: 300 },
  { W: 400, H: 350, roomW: 400, roomD: 350 },
];

function expectedPoint(rangeM: number, yaw: number, pitch: number, m: CanvasMetrics) {
  const cal = { ...DEFAULT_CALIBRATION, radar_x: 45, radar_y: 20, yaw, pitch, roll: 31 };
  const point = applyTransform(0, rangeM * 100, 0, cal);
  return roomToCanvas(point.roomX, point.roomY, m);
}

describe('radar range geometry shares the target/trail room projection', () => {
  for (const m of viewports) {
    for (const yaw of [0, 45, -35, 90, 150]) {
      for (const pitch of [0, 35, -60, 90]) {
        it(`aligns boresight and metre labels at ${m.W}x${m.H}, yaw=${yaw}, pitch=${pitch}`, () => {
          const { ctx, mock } = canvasContext();
          const origin = roomToCanvas(45, 20, m);
          drawRadarFov(ctx, origin.cx, origin.cy, yaw, pitch, 0, 0.3, 6, m);
          const expected = expectedPoint(6, yaw, pitch, m);
          expect(mock.lineTo.mock.calls[0][0]).toBeCloseTo(expected.cx, 8);
          expect(mock.lineTo.mock.calls[0][1]).toBeCloseTo(expected.cy, 8);
          const label = mock.fillText.mock.calls.find(([text]) => text === '2m')!;
          const twoMetres = expectedPoint(2, yaw, pitch, m);
          expect(label[1]).toBeCloseTo(twoMetres.cx, 8);
          expect(label[2]).toBeCloseTo(twoMetres.cy, 8);
        });
      }
    }
  }

  for (const adapter of Object.values(RADAR_MODELS).filter((model) => model.info.is1DRanging)) {
    for (const inBoundary of [true, false]) {
      it(`${adapter.info.id} arc and marker match radial trail, inBoundary=${inBoundary}`, () => {
        const m = viewports[0];
        const { ctx, mock } = canvasContext();
        const origin = roomToCanvas(45, 20, m);
        const yaw = 45,
          pitch = 35,
          range = 2;
        drawTargetArc(ctx, origin.cx, origin.cy, yaw, pitch, adapter.info.fovDegrees, range, m, inBoundary);
        const expected = expectedPoint(range, yaw, pitch, m);
        const dot = mock.arc.mock.calls.find(([, , radius]) => radius === 4)!;
        expect(dot[0]).toBeCloseTo(expected.cx, 8);
        expect(dot[1]).toBeCloseTo(expected.cy, 8);
        const ellipse = mock.ellipse.mock.calls[0];
        const base = Math.PI / 2 - (yaw * Math.PI) / 180;
        expect(ellipse[0] + ellipse[2] * Math.cos(base)).toBeCloseTo(expected.cx, 8);
        expect(ellipse[1] + ellipse[3] * Math.sin(base)).toBeCloseTo(expected.cy, 8);
      });
    }
  }
});

describe('live preview preserves physical proportions', () => {
  for (const viewport of viewports) {
    it(`fits without distortion at ${viewport.W}x${viewport.H}`, () => {
      const m = fitRoomMetrics(viewport);
      const origin = roomToCanvas(0, 0, m);
      const x = roomToCanvas(100, 0, m);
      const y = roomToCanvas(0, 100, m);
      expect(x.cx - origin.cx).toBeCloseTo(y.cy - origin.cy);
      const corner = roomToCanvas(viewport.roomW, viewport.roomD, m);
      expect(corner.cx).toBeLessThanOrEqual(viewport.W + 1e-8);
      expect(corner.cy).toBeLessThanOrEqual(viewport.H + 1e-8);
      expect(canvasToRoom(x.cx, x.cy, m).x).toBeCloseTo(100);
      const { ctx, mock } = canvasContext();
      drawRadarFov(ctx, origin.cx, origin.cy, 45, 0, 40, 0.4, 2.5, m, 1.5);
      for (const ellipse of mock.ellipse.mock.calls) expect(ellipse[2]).toBeCloseTo(ellipse[3]);
    });
  }
});
