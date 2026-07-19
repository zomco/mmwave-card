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

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CanvasMetrics {
  W: number; // canvas CSS width  (px)
  H: number; // canvas CSS height (px)
  roomW: number; // room width  (cm)
  roomD: number; // room depth  (cm)
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
export function drawBase(ctx: CanvasRenderingContext2D, m: CanvasMetrics): void {
  ctx.clearRect(0, 0, m.W, m.H);

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
  // Scale: geometric mean of X and Y scale so range rings are circular
  const scale = Math.sqrt((m.W / m.roomW) * (m.H / m.roomD)); // px/cm
  const toPx = (rangeM: number) => Math.max(rangeM * 100 * scale, 1);

  const halfFov = (fovDeg / 2) * (Math.PI / 180);
  // yaw=0 → pointing down (+Y). Canvas angle 0=right, CW-positive.
  const base = Math.PI / 2 + yawDeg * (Math.PI / 180);

  // Calculate a pitch factor: 1.0 when looking straight down (pitch=0), approaches 0 when sideways (pitch=90 or -90)
  // We use this to scale the perceived radius of the footprint on the floor.
  const pf = Math.max(0.05, Math.cos(pitchDeg * (Math.PI / 180)));

  const minR = toPx(minRangeM * pf);
  const maxR = toPx(maxRangeM * pf);

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
    const startX = cx + r_outer * Math.cos(base - halfFov);
    const startY = cy + r_outer * Math.sin(base - halfFov);

    ctx.beginPath();
    ctx.moveTo(startX, startY); // ← explicit start
    ctx.arc(cx, cy, r_outer, base - halfFov, base + halfFov, false); // outer arc, CW
    // canvas auto-draws a line from outer-right to inner-right (right radial)
    ctx.arc(cx, cy, r_inner, base + halfFov, base - halfFov, true); // inner arc, CCW
    ctx.closePath(); // left radial

    ctx.fillStyle = fillColor;
    ctx.fill('evenodd'); // evenodd rule: inner arc hole is correctly excluded
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeW;
    ctx.stroke();
  };

  // ── Draw zones (outer first so inner overdraws) ────────────────────────────

  if (vitalRangeM != null && vitalRangeM > minRangeM && vitalRangeM < maxRangeM) {
    const vitalR = toPx(vitalRangeM * pf);

    // Outer zone (presence / sleep): vitalRange → maxRange
    const gradOuter = ctx.createRadialGradient(cx, cy, vitalR, cx, cy, maxR);
    gradOuter.addColorStop(0, 'rgba(11,130,92,.25)');
    gradOuter.addColorStop(1, 'rgba(11,130,92,.05)');
    drawAnnulus(vitalR, maxR, gradOuter, 'rgba(11,130,92,.45)');

    // Inner zone (breath / HR): minRange → vitalRange
    const gradInner = ctx.createRadialGradient(cx, cy, minR, cx, cy, vitalR);
    gradInner.addColorStop(0, 'rgba(11,130,92,.55)');
    gradInner.addColorStop(1, 'rgba(11,130,92,.20)');
    drawAnnulus(minR, vitalR, gradInner, 'rgba(11,130,92,.85)', 1.5);
  } else {
    // Single zone fallback
    const gradSingle = ctx.createRadialGradient(cx, cy, minR, cx, cy, maxR);
    gradSingle.addColorStop(0, 'rgba(11,130,92,.45)');
    gradSingle.addColorStop(1, 'rgba(11,130,92,.10)');
    drawAnnulus(minR, maxR, gradSingle, 'rgba(11,130,92,.70)');
  }

  // ── Blind zone: dark overlay (center → minR) so it looks invalid ──────────
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, minR, base - halfFov, base + halfFov, false);
  ctx.closePath();
  ctx.fillStyle = 'rgba(0,0,0,.50)'; // semi-transparent dark cover
  ctx.fill();

  // Dashed red arc = minRange boundary
  ctx.beginPath();
  ctx.arc(cx, cy, minR, base - halfFov, base + halfFov, false);
  ctx.strokeStyle = 'rgba(244,99,99,.80)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 3]);
  ctx.stroke();
  ctx.setLineDash([]);

  // ── Range labels (along radar forward axis) ───────────────────────────────

  const drawLabel = (rangeM: number, r: number, color: string) => {
    const tx = cx + r * Math.cos(base);
    const ty = cy + r * Math.sin(base);
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

  if (vitalRangeM != null) {
    drawLabel(Number((vitalRangeM * pf).toFixed(1)), toPx(vitalRangeM * pf), 'rgba(11,130,92,1)');
  }
  drawLabel(Number((maxRangeM * pf).toFixed(1)), maxR, 'rgba(27,159,117,.85)');
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

export function drawTarget(ctx: CanvasRenderingContext2D, cx: number, cy: number, inBoundary: boolean): void {
  if (inBoundary) {
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,152,0,.25)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'var(--accent-color,#ff9800)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  } else {
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(244,67,54,.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(244,67,54,.7)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
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
