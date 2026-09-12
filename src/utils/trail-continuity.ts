/** A radar slot is not a persistent person ID. Break implausible connections,
 * but keep displaying the newly measured position instead of filtering it out.
 */
export function continuesTrail(
  previous: { x: number; y: number },
  next: { x: number; y: number },
  elapsedMs: number,
): boolean {
  if (elapsedMs < 0 || elapsedMs > 1000) return false;
  // 1 m noise allowance plus 3 m/s motion. This controls drawing only.
  return Math.hypot(next.x - previous.x, next.y - previous.y) <= 100 + (300 * elapsedMs) / 1000;
}
