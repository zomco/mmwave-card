import { drawFloorplan } from './floorplan';
import type { FloorplanConfig } from '../types';
/**
 * canvas.ts — shared drawing utilities
 *
 * Coordinate system (v2, per user spec):
 *   Origin : top-left corner of the canvas / room map
 *   X axis : left → right  (positive rightward)
 *   Y axis : top  → bottom (positive downward, toward foot of bed)
 *
 * This is the standard screen/CSS coordinate convention.
 * roomToCanvas and canvasToRoom map with Y going down — NO Y-flip.
 */

import type { Vec2 } from '../types';
import { AREA_COLORS } from './area-geometry';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CanvasMetrics {
  W: number; // canvas CSS width  (px)
  H: number; // canvas CSS height (px)
  roomW: number; // room width  (cm)
  roomD: number; // room depth  (cm)
}

/** Fit the room without stretching either axis. Extra canvas area remains
 * available as view space; persisted room dimensions are never changed.
 */
export function fitRoomMetrics(m: CanvasMetrics): CanvasMetrics {
  const scale = Math.min(m.W / m.roomW, m.H / m.roomD);
  return { ...m, roomW: m.W / scale, roomD: m.H / scale };
}

// ── Coordinate helpers ────────────────────────────────────────────────────────

/** Room cm → canvas CSS pixels.  Y down = positive (top-left origin). */
export const roomToCanvas = (x: number, y: number, m: CanvasMetrics) => ({
  cx: (x / m.roomW) * m.W,
  cy: (y / m.roomD) * m.H, // Y down — no flip
});

/** Canvas CSS pixels → room cm. */
export const canvasToRoom = (cx: number, cy: number, m: CanvasMetrics): Vec2 => ({
  x: (cx / m.W) * m.roomW,
  y: (cy / m.H) * m.roomD, // Y down — no flip
});

/**
 * Convert a mouse/touch event to canvas CSS-pixel coordinates.
 * Accounts for canvas scaling (DPR) vs CSS layout size.
 * Returns CSS-pixel coords (NOT device pixels).
 */
export function eventToCanvasPt(e: MouseEvent | TouchEvent, cv: HTMLCanvasElement): Vec2 {
  const rect = cv.getBoundingClientRect();
  // css-pixel scale factor (offsetWidth / canvas.width = 1/dpr)
  const sx = rect.width / cv.width;
  const sy = rect.height / cv.height;
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
  // canvas.width is in device pixels; divide by dpr ratio to get CSS pixels
  return {
    x: (clientX - rect.left) / sx / (cv.width / rect.width),
    y: (clientY - rect.top) / sy / (cv.height / rect.height),
  };
}

// Simplified: just return CSS pixel position within canvas
export function eventToCanvasCssPt(e: MouseEvent | TouchEvent, cv: HTMLCanvasElement): Vec2 {
  const rect = cv.getBoundingClientRect();
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

// ── Canvas setup ──────────────────────────────────────────────────────────────

/**
 * Resize the canvas physical pixels to match CSS layout size (DPR-aware).
 * Must be called AFTER the element has been laid out (offsetWidth > 0).
 * Returns a 2D context already scaled for DPR.
 */
export function setupCanvas(cv: HTMLCanvasElement, cssH: number): CanvasRenderingContext2D {
  const dpr = window.devicePixelRatio || 1;
  const W = cv.offsetWidth || 400;
  cv.width = W * dpr;
  cv.height = cssH * dpr;
  cv.style.height = `${cssH}px`;
  const ctx = cv.getContext('2d')!;
  ctx.scale(dpr, dpr);
  return ctx;
}

// ── Base grid + axes ──────────────────────────────────────────────────────────

/**
 * Draw the background grid, room border, scale bar, and axis labels.
 *
 * Axis convention displayed on canvas:
 *   X→  label at top edge (right side)
 *   Y↓  label at left edge (bottom side)
 *   "0" at top-left corner
 */
export function drawBase(
  ctx: CanvasRenderingContext2D,
  m: CanvasMetrics,
  floorplan?: FloorplanConfig,
  onReady?: () => void,
): void {
  ctx.clearRect(0, 0, m.W, m.H);
  drawFloorplan(ctx, m, floorplan, onReady);

  // Grid
  ctx.strokeStyle = 'rgba(128,128,128,.06)';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < m.W; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, m.H);
    ctx.stroke();
  }
  for (let y = 0; y < m.H; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(m.W, y);
    ctx.stroke();
  }

  // Room border
  ctx.strokeStyle = 'rgba(255,255,255,.15)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(1, 1, m.W - 2, m.H - 2);

  // Scale bar (bottom-right area, horizontal = X direction)
  const swCm = Math.round(m.roomW / 4 / 100) * 100 || 100; // ~25% of room width
  const swPx = (swCm / m.roomW) * m.W;
  const barY = m.H - 10;
  const barX = m.W - swPx - 8;
  ctx.beginPath();
  ctx.moveTo(barX, barY);
  ctx.lineTo(barX + swPx, barY);
  ctx.strokeStyle = 'rgba(255,255,255,.35)';
  ctx.lineWidth = 1.2;
  ctx.stroke();
  // tick marks
  ctx.beginPath();
  ctx.moveTo(barX, barY - 3);
  ctx.lineTo(barX, barY + 3);
  ctx.moveTo(barX + swPx, barY - 3);
  ctx.lineTo(barX + swPx, barY + 3);
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.45)';
  ctx.font = '9px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.fillText(`${swCm}cm`, barX + swPx / 2, barY - 3);

  // Axis labels
  ctx.font = 'bold 9px system-ui';
  ctx.fillStyle = 'rgba(11,130,92,.6)';

  // X→ at top-right
  ctx.textAlign = 'right';
  ctx.textBaseline = 'top';
  ctx.fillText('X →', m.W - 4, 4);

  // Y↓ at bottom-left
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText('Y ↓', 4, m.H - 4);

  // Origin "0" at top-left
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'rgba(255,255,255,.3)';
  ctx.fillText('0', 4, 4);

  ctx.textBaseline = 'alphabetic'; // reset
}

// ── Polygon ───────────────────────────────────────────────────────────────────

export function drawPolygon(ctx: CanvasRenderingContext2D, poly: Vec2[], m: CanvasMetrics, faded = false): void {
  if (poly.length < 2) return;
  const pts = poly.map((p) => roomToCanvas(p.x, p.y, m));
  ctx.beginPath();
  pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.cx, p.cy) : ctx.lineTo(p.cx, p.cy)));
  if (poly.length >= 3) {
    ctx.closePath();
    ctx.fillStyle = faded ? 'rgba(11,130,92,.04)' : 'rgba(11,130,92,.07)';
    ctx.fill();
  }
  ctx.strokeStyle = faded ? 'rgba(11,130,92,.22)' : 'rgba(11,130,92,.55)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  if (!faded) {
    pts.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.cx, p.cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(11,130,92,.8)';
      ctx.fill();
    });
  }
}

export function drawOccupancyAreas(
  ctx: CanvasRenderingContext2D,
  areas: Vec2[][],
  occupied: boolean[],
  m: CanvasMetrics,
): void {
  areas.forEach((poly, index) => {
    if (poly.length < 2) return;
    const color = AREA_COLORS[index] ?? AREA_COLORS[0];
    const pts = poly.map((p) => roomToCanvas(p.x, p.y, m));
    ctx.save();
    ctx.beginPath();
    pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.cx, p.cy) : ctx.lineTo(p.cx, p.cy)));
    if (poly.length >= 3) {
      ctx.closePath();
      ctx.globalAlpha = occupied[index] ? 0.28 : 0.1;
      ctx.fillStyle = color;
      ctx.fill();
    }
    ctx.globalAlpha = occupied[index] ? 0.95 : 0.5;
    ctx.strokeStyle = color;
    ctx.lineWidth = occupied[index] ? 2.4 : 1.5;
    ctx.stroke();
    const cx = pts.reduce((s, p) => s + p.cx, 0) / pts.length;
    const cy = pts.reduce((s, p) => s + p.cy, 0) / pts.length;
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = color;
    ctx.font = 'bold 11px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(index + 1), cx, cy);
    ctx.restore();
  });
}

/** Shade the filtered room area without hiding out-of-bound target markers. */
export function drawBoundaryOverlay(ctx: CanvasRenderingContext2D, poly: Vec2[], m: CanvasMetrics): void {
  if (poly.length < 3) return;
  const pts = poly.map((p) => roomToCanvas(p.x, p.y, m));
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, m.W, m.H);
  ctx.moveTo(pts[0].cx, pts[0].cy);
  pts.slice(1).forEach((p) => ctx.lineTo(p.cx, p.cy));
  ctx.closePath();
  ctx.fillStyle = 'rgba(100,116,139,.25)';
  ctx.fill('evenodd');
  ctx.beginPath();
  ctx.moveTo(pts[0].cx, pts[0].cy);
  pts.slice(1).forEach((p) => ctx.lineTo(p.cx, p.cy));
  ctx.closePath();
  ctx.strokeStyle = 'rgba(11,130,92,.95)';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.stroke();
  ctx.restore();
}

// ── Occupancy heatmap ─────────────────────────────────────────────────────────

/** One binned cell from the backend, keyed by its minimum corner in cm. */
export interface HeatmapCell {
  x: number;
  y: number;
  visits: number;
}

/**
 * Colour ramp, cold to hot. Stops are [position, r, g, b] and are interpolated
 * in RGB, which is good enough for a ramp this short and avoids shipping a
 * colour-space library for one overlay.
 */
const HEAT_RAMP: [number, number, number, number][] = [
  [0, 33, 102, 172],
  [0.35, 5, 168, 170],
  [0.65, 240, 190, 60],
  [1, 214, 48, 49],
];

function rampColor(t: number, alpha: number): string {
  const clamped = Math.min(1, Math.max(0, t));
  let lower = HEAT_RAMP[0];
  let upper = HEAT_RAMP[HEAT_RAMP.length - 1];
  for (let i = 1; i < HEAT_RAMP.length; i++) {
    if (clamped <= HEAT_RAMP[i][0]) {
      lower = HEAT_RAMP[i - 1];
      upper = HEAT_RAMP[i];
      break;
    }
  }
  const span = upper[0] - lower[0];
  const f = span === 0 ? 0 : (clamped - lower[0]) / span;
  const mix = (a: number, b: number) => Math.round(a + (b - a) * f);
  return `rgba(${mix(lower[1], upper[1])},${mix(lower[2], upper[2])},${mix(lower[3], upper[3])},${alpha})`;
}

/**
 * Draw where people have actually been, as a grid of translucent cells.
 *
 * Visit counts are heavily skewed: a sofa someone sits on for three hours
 * collects six figures of points at the fusion rate, while a hallway they cross
 * twice a day collects a few hundred. Normalising linearly against the maximum
 * would render the whole room as the sofa and nothing else — so the ramp is
 * logarithmic, which is what makes the low-traffic structure of a room (doors,
 * walking lines, the edge of coverage) visible at all.
 *
 * Cells are keyed by their minimum corner. This canvas has Y pointing down, so
 * that corner is drawn at the rect's top-left.
 */
export function drawHeatmap(
  ctx: CanvasRenderingContext2D,
  cells: HeatmapCell[],
  binCm: number,
  maxVisits: number,
  m: CanvasMetrics,
): void {
  if (!cells.length || maxVisits <= 0) return;

  const scale = Math.log1p(maxVisits);
  // Cells sit edge to edge; a fractional pixel of overlap keeps antialiasing
  // from drawing a seam of background between every pair of them.
  const w = (binCm / m.roomW) * m.W + 0.5;
  const h = (binCm / m.roomD) * m.H + 0.5;

  ctx.save();
  for (const cell of cells) {
    const t = scale === 0 ? 1 : Math.log1p(cell.visits) / scale;
    const p = roomToCanvas(cell.x, cell.y, m);
    ctx.fillStyle = rampColor(t, 0.14 + t * 0.58);
    ctx.fillRect(p.cx, p.cy, w, h);
  }
  ctx.restore();
}

/** Ramp swatches for a legend, cold to hot. */
export function heatmapLegendColors(steps = 5): string[] {
  return Array.from({ length: steps }, (_, i) => rampColor(i / (steps - 1), 0.14 + (i / (steps - 1)) * 0.58));
}

// ── Replay ────────────────────────────────────────────────────────────────────

export interface ReplayTrack {
  track_id: string;
  points: { ts: number; x: number; y: number }[];
}

/** How much of the past stays on screen behind a replayed target, in seconds. */
export const REPLAY_TRAIL_S = 8;

/**
 * Draw stored tracks as they were at one moment.
 *
 * A track is only drawn while it has a position at or just before the playhead.
 * The tolerance is a few sample intervals rather than a fixed number of seconds
 * because the backend thins wide windows — at six hours the spacing can be
 * seconds apart, and a fixed tolerance would either strobe or leave people
 * standing around long after they left.
 *
 * Gaps in a track are drawn as gaps. The backend preserves them deliberately —
 * a target that was lost and reacquired is not the same as one that walked the
 * straight line between — so joining them here would invent the walk.
 */
export function drawReplay(
  ctx: CanvasRenderingContext2D,
  tracks: ReplayTrack[],
  playhead: number,
  sampleHz: number,
  m: CanvasMetrics,
  colorFor: (trackId: string) => string,
): void {
  const spacing = sampleHz > 0 ? 1 / sampleHz : 0.5;
  const tolerance = spacing * 3;
  const gap = spacing * 3;

  for (const track of tracks) {
    const visible = track.points.filter((point) => point.ts <= playhead && point.ts >= playhead - REPLAY_TRAIL_S);
    if (!visible.length) continue;

    const head = visible[visible.length - 1];
    if (playhead - head.ts > tolerance) continue;

    const color = colorFor(track.track_id);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    for (let i = 1; i < visible.length; i++) {
      const previous = visible[i - 1];
      const current = visible[i];
      // A real absence, not a line to draw across.
      if (current.ts - previous.ts > gap) continue;
      ctx.globalAlpha = Math.max(0.08, 0.7 - ((playhead - current.ts) / REPLAY_TRAIL_S) * 0.7);
      const from = roomToCanvas(previous.x, previous.y, m);
      const to = roomToCanvas(current.x, current.y, m);
      ctx.beginPath();
      ctx.moveTo(from.cx, from.cy);
      ctx.lineTo(to.cx, to.cy);
      ctx.stroke();
    }
    ctx.restore();

    const point = roomToCanvas(head.x, head.y, m);
    drawTarget(ctx, point.cx, point.cy, true, color);
    ctx.fillStyle = color;
    ctx.font = 'bold 9px ui-monospace, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(track.track_id.slice(0, 6), point.cx, point.cy - 14);
  }
}

/** Project radar range geometry with the same X/Y scales as roomToCanvas.
 * A circular range ring in the room becomes an ellipse on a stretched canvas.
 * Keep strokes, labels and marker sizes in CSS pixels.
 */
function radarProjection(ctx: CanvasRenderingContext2D, cx: number, cy: number, m: CanvasMetrics) {
  const sx = m.W / m.roomW;
  const sy = m.H / m.roomD;
  return {
    point: (radiusCm: number, angle: number) => ({
      x: cx + radiusCm * Math.cos(angle) * sx,
      y: cy + radiusCm * Math.sin(angle) * sy,
    }),
    arc: (radiusCm: number, start: number, end: number, counterclockwise = false) => {
      ctx.ellipse(cx, cy, radiusCm * sx, radiusCm * sy, 0, start, end, counterclockwise);
    },
    gradient: (innerCm: number, outerCm: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(sx, sy);
      const gradient = ctx.createRadialGradient(0, 0, innerCm, 0, 0, outerCm);
      ctx.restore();
      return gradient;
    },
  };
}

/** Dim excluded radial bands; the remaining green sector is the usable interval. */
export function drawRangeFilter(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  yaw: number,
  pitch: number,
  fov: number,
  minM: number,
  maxM: number,
  softwareMinCm: number,
  softwareMaxCm: number,
  m: CanvasMetrics,
): void {
  const projection = radarProjection(ctx, cx, cy, m);
  const start = Math.PI / 2 - ((yaw + fov / 2) * Math.PI) / 180;
  const end = start + (fov * Math.PI) / 180;
  const scale = Math.max(0, Math.cos((pitch * Math.PI) / 180));
  const low = Math.max(minM * 100, softwareMinCm);
  const high = Math.min(maxM * 100, softwareMaxCm > 0 ? softwareMaxCm : Infinity);
  const band = (inner: number, outer: number) => {
    if (outer <= inner) return;
    const p = projection.point(outer * scale, start);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    projection.arc(outer * scale, start, end);
    projection.arc(inner * scale, end, start, true);
    ctx.closePath();
    ctx.fillStyle = 'rgba(180,185,190,.82)';
    ctx.fill('evenodd');
  };
  ctx.save();
  if (low >= high) band(minM * 100, maxM * 100);
  else {
    band(minM * 100, low);
    band(high, maxM * 100);
    ctx.strokeStyle = 'rgba(11,130,92,.95)';
    ctx.lineWidth = 2;
    for (const boundary of [low, high]) {
      if (boundary <= minM * 100 || boundary >= maxM * 100) continue;
      ctx.beginPath();
      projection.arc(boundary * scale, start, end);
      ctx.stroke();
    }
  }
  ctx.restore();
}

// ── Radar FOV — annular sector(s) + icon ─────────────────────────────────────

/**
 * Draw the radar detection zone as annular sector(s), then overlay the icon.
 *
 * Coordinate convention: Y-down, yaw=0 → fan points straight DOWN (+Y).
 *
 * For R60ABD1:
 *   Inner annulus  0.4 – 1.5 m  : breathing / heart-rate zone (bright blue)
 *   Outer annulus  1.5 – 2.5 m  : presence / sleep zone (dim blue)
 *   Dashed arc     < 0.4 m      : blind zone boundary (red dashed)
 */
export function drawRadarFov(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  yawDeg: number,
  pitchDeg: number,
  fovDeg: number,
  minRangeM: number,
  maxRangeM: number,
  m: CanvasMetrics,
  vitalRangeM?: number,
): void {
  const projection = radarProjection(ctx, cx, cy, m);
  const toCm = (rangeM: number) => rangeM * 100;

  const halfFov = (fovDeg / 2) * (Math.PI / 180);
  // yaw=0 → +Y and positive yaw → +X, matching applyTransform().
  const base = Math.PI / 2 - yawDeg * (Math.PI / 180);

  // Horizontal projection of range: pitch=0 is level; +/-90 is vertical.
  const pf = Math.max(0, Math.cos(pitchDeg * (Math.PI / 180)));

  const minR = toCm(minRangeM * pf);
  const maxR = toCm(maxRangeM * pf);

  /**
   * Draw ONE filled annular sector.
   * r_inner < r_outer. Uses explicit moveTo to prevent any implicit line to center.
   */
  const drawAnnulus = (
    r_inner: number,
    r_outer: number,
    fillColor: string | CanvasGradient,
    strokeColor: string,
    strokeW = 1.2,
  ) => {
    // Start point: outer arc's left edge
    const start = projection.point(r_outer, base - halfFov);

    ctx.beginPath();
    ctx.moveTo(start.x, start.y); // ← explicit start
    projection.arc(r_outer, base - halfFov, base + halfFov, false); // outer arc, CW
    // canvas auto-draws a line from outer-right to inner-right (right radial)
    projection.arc(r_inner, base + halfFov, base - halfFov, true); // inner arc, CCW
    ctx.closePath(); // left radial

    ctx.fillStyle = fillColor;
    ctx.fill('evenodd'); // evenodd rule: inner arc hole is correctly excluded
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeW;
    ctx.stroke();
  };

  // ── Draw zones (outer first so inner overdraws) ────────────────────────────

  if (vitalRangeM != null && vitalRangeM > minRangeM && vitalRangeM < maxRangeM) {
    const vitalR = toCm(vitalRangeM * pf);

    // Outer zone (presence / sleep): vitalRange → maxRange
    const gradOuter = projection.gradient(vitalR, maxR);
    gradOuter.addColorStop(0, 'rgba(11,130,92,.35)');
    gradOuter.addColorStop(1, 'rgba(11,130,92,.08)');
    drawAnnulus(vitalR, maxR, gradOuter, 'rgba(11,130,92,.60)');

    // Inner zone (breath / HR): minRange → vitalRange
    const gradInner = projection.gradient(minR, vitalR);
    gradInner.addColorStop(0, 'rgba(11,130,92,.60)');
    gradInner.addColorStop(1, 'rgba(11,130,92,.25)');
    drawAnnulus(minR, vitalR, gradInner, 'rgba(11,130,92,.90)', 1.5);
  } else {
    // Single zone circular sector (e.g. LD2450: 120°, 0.2m ~ 6m)
    const gradSingle = projection.gradient(minR, maxR);
    gradSingle.addColorStop(0, 'rgba(11,130,92,.50)');
    gradSingle.addColorStop(1, 'rgba(11,130,92,.12)');
    drawAnnulus(minR, maxR, gradSingle, 'rgba(11,130,92,.75)', 1.5);
  }

  // ── Sector Grid: Range Rings & Angle Rays (when FOV > 0) ──────────────────
  if (fovDeg > 0) {
    // Draw Range Rings (concentric arcs every 0.5m or 1.0m)
    let stepM = 1.0;
    if (maxRangeM <= 3) stepM = 0.5;
    else if (maxRangeM <= 12) stepM = 1.0;
    else if (maxRangeM <= 25) stepM = 5.0;
    else if (maxRangeM <= 50) stepM = 10.0;
    else stepM = 20.0;
    for (let r_m = stepM; r_m <= maxRangeM; r_m += stepM) {
      if (r_m <= minRangeM) continue;
      const radiusCm = toCm(r_m * pf);
      ctx.beginPath();
      projection.arc(radiusCm, base - halfFov, base + halfFov, false);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Angle Rays (-fovDeg/2 to +fovDeg/2)
    const angStepDeg = fovDeg >= 90 ? 15 : fovDeg >= 40 ? 10 : 15;
    const halfFovDeg = fovDeg / 2;
    for (let deg = -halfFovDeg; deg <= halfFovDeg; deg += angStepDeg) {
      const angRad = base + deg * (Math.PI / 180);
      const from = projection.point(minR, angRad);
      const to = projection.point(maxR, angRad);

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = deg === 0 ? 'rgba(11, 200, 140, 0.5)' : 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = deg === 0 ? 1.2 : 0.8;
      if (deg !== 0) ctx.setLineDash([3, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Angle text labels at ray tips
      if (deg !== 0) {
        const tip = projection.point(maxR, angRad);
        const lx = tip.x + 14 * Math.cos(angRad);
        const ly = tip.y + 14 * Math.sin(angRad);
        ctx.font = 'bold 9px system-ui';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${deg > 0 ? '+' : ''}${deg}°`, lx, ly);
        ctx.textBaseline = 'alphabetic';
      }
    }
  }

  // ── Blind zone: dark overlay (center → minR) so it looks invalid ──────────
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  projection.arc(minR, base - halfFov, base + halfFov, false);
  ctx.closePath();
  ctx.fillStyle = 'rgba(0,0,0,.50)'; // semi-transparent dark cover
  ctx.fill();

  // Dashed red arc = minRange boundary
  ctx.beginPath();
  projection.arc(minR, base - halfFov, base + halfFov, false);
  ctx.strokeStyle = 'rgba(244,99,99,.80)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 3]);
  ctx.stroke();
  ctx.setLineDash([]);

  // ── Range labels (along radar forward axis) ───────────────────────────────

  const drawLabel = (rangeM: number, r: number, color: string) => {
    const { x: tx, y: ty } = projection.point(r, base);
    const txt = `${rangeM}m`;
    ctx.font = 'bold 9px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const tw = ctx.measureText(txt).width;
    // pill background
    ctx.fillStyle = 'rgba(10,10,24,.82)';
    ctx.beginPath();
    ctx.roundRect?.(tx - tw / 2 - 3, ty - 7, tw + 6, 14, 3);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.fillText(txt, tx, ty);
  };

  if (fovDeg > 0) {
    let stepM = 1.0;
    if (maxRangeM <= 3) stepM = 0.5;
    else if (maxRangeM <= 12) stepM = 1.0;
    else if (maxRangeM <= 25) stepM = 5.0;
    else if (maxRangeM <= 50) stepM = 10.0;
    else stepM = 20.0;
    for (let r_m = stepM; r_m <= maxRangeM; r_m += stepM) {
      if (r_m <= minRangeM) continue;
      const radiusCm = toCm(r_m * pf);
      const isMax = Math.abs(r_m - maxRangeM) < 0.01;
      const isVital = vitalRangeM != null && Math.abs(r_m - vitalRangeM) < 0.01;
      const col = isMax ? 'rgba(27,159,117,.95)' : isVital ? 'rgba(11,130,92,1)' : 'rgba(255,255,255,.7)';
      drawLabel(Number(r_m.toFixed(1)), radiusCm, col);
    }
  } else {
    // 1-D Ranging Radar Boresight Ray & Distance Scale
    const from = projection.point(minR, base);
    const to = projection.point(maxR, base);

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = 'rgba(11, 200, 140, 0.65)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    let stepM = 1.0;
    if (maxRangeM <= 3) stepM = 0.5;
    else if (maxRangeM <= 12) stepM = 1.0;
    else if (maxRangeM <= 25) stepM = 5.0;
    else if (maxRangeM <= 50) stepM = 10.0;
    else stepM = 20.0;
    for (let r_m = stepM; r_m <= maxRangeM; r_m += stepM) {
      if (r_m <= minRangeM) continue;
      const radiusCm = toCm(r_m * pf);
      const isMax = Math.abs(r_m - maxRangeM) < 0.01;
      const isVital = vitalRangeM != null && Math.abs(r_m - vitalRangeM) < 0.01;
      const col = isMax ? 'rgba(27,159,117,.95)' : isVital ? 'rgba(11,130,92,1)' : 'rgba(255,255,255,.7)';
      drawLabel(Number(r_m.toFixed(1)), radiusCm, col);
    }
  }
  ctx.textBaseline = 'alphabetic';

  // ── Radar icon (drawn on top) ─────────────────────────────────────────────

  ctx.beginPath();
  ctx.arc(cx, cy, 9, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(10,10,24,.92)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(11,130,92,.95)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  for (const [dx, dy] of [
    [7, 0],
    [-7, 0],
    [0, 7],
    [0, -7],
  ] as [number, number][]) {
    ctx.beginPath();
    ctx.moveTo(cx + dx * 0.3, cy + dy * 0.3);
    ctx.lineTo(cx + dx, cy + dy);
    ctx.strokeStyle = 'rgba(11,130,92,.7)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
}

// ── Target dot ────────────────────────────────────────────────────────────────

export function drawTarget(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  inBoundary: boolean,
  color = '#ff9800',
): void {
  if (inBoundary) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.25;
    ctx.fill();
    ctx.restore();
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  } else {
    ctx.save();
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.globalAlpha = 0.8;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }
}

// ── 1-D Target arc (for ranging-only models) ──────────────────────────────────

export function drawTargetArc(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  yawDeg: number,
  pitchDeg: number,
  fovDeg: number,
  rangeM: number,
  m: CanvasMetrics,
  inBoundary: boolean,
): void {
  const projection = radarProjection(ctx, cx, cy, m);
  const pf = Math.max(0, Math.cos(pitchDeg * (Math.PI / 180)));
  const radiusCm = rangeM * 100 * pf;

  const halfFov = (fovDeg / 2) * (Math.PI / 180);
  const base = Math.PI / 2 - yawDeg * (Math.PI / 180);

  if (inBoundary) {
    // Glowing background arc across FOV
    ctx.beginPath();
    projection.arc(radiusCm, base - halfFov, base + halfFov);
    ctx.strokeStyle = 'rgba(255,152,0,.35)';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Crisp foreground arc
    ctx.beginPath();
    projection.arc(radiusCm, base - halfFov, base + halfFov);
    ctx.strokeStyle = 'var(--accent-color,#ff9800)';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Center target dot on boresight line
    const { x: tx, y: ty } = projection.point(radiusCm, base);
    ctx.beginPath();
    ctx.arc(tx, ty, 7, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,152,0,.3)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(tx, ty, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'var(--accent-color,#ff9800)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.8)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  } else {
    // Out-of-boundary / filtered arc
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    projection.arc(radiusCm, base - halfFov, base + halfFov);
    ctx.strokeStyle = 'rgba(244,67,54,.65)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.setLineDash([]);

    // Center dot
    const { x: tx, y: ty } = projection.point(radiusCm, base);
    ctx.beginPath();
    ctx.arc(tx, ty, 4, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(244,67,54,.8)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.lineCap = 'butt';
}

// ── Reference-point dot ───────────────────────────────────────────────────────

export function drawDot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  label: string,
  color: string,
  hollow = false,
): void {
  ctx.beginPath();
  ctx.arc(x, y, 7, 0, Math.PI * 2);
  if (hollow) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.8;
    ctx.stroke();
  } else {
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.5)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
  ctx.fillStyle = hollow ? color : '#fff';
  ctx.font = 'bold 9px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x, y);
  ctx.textBaseline = 'alphabetic';
}
