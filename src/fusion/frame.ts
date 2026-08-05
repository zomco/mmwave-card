export interface AtomicFrameTarget {
  x: number;
  y: number;
  z: number;
  speed?: number;
}

export interface AtomicTargetFrame {
  frameId: string;
  sourceTimestamp: number;
  targets: AtomicFrameTarget[];
}

const finiteNumber = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) ? value : undefined;

export function parseAtomicTargetFrame(value: string): AtomicTargetFrame | undefined {
  let payload: unknown;
  try {
    payload = JSON.parse(value);
  } catch {
    return undefined;
  }
  if (!payload || typeof payload !== 'object') return undefined;
  const frame = payload as Record<string, unknown>;
  const frameId = frame.f;
  const sourceTimestamp = finiteNumber(frame.ts);
  if (frame.v !== 1 || (typeof frameId !== 'number' && typeof frameId !== 'string') || sourceTimestamp == null)
    return undefined;
  if (!Array.isArray(frame.t) || frame.t.length > 32) return undefined;

  const targets: AtomicFrameTarget[] = [];
  for (const raw of frame.t) {
    let x: number | undefined;
    let y: number | undefined;
    let z = 0;
    let speed: number | undefined;
    if (Array.isArray(raw) && raw.length >= 2 && raw.length <= 4) {
      x = finiteNumber(raw[0]);
      y = finiteNumber(raw[1]);
      if (raw.length === 3) speed = finiteNumber(raw[2]);
      if (raw.length === 4) {
        z = finiteNumber(raw[2]) ?? Number.NaN;
        speed = finiteNumber(raw[3]);
      }
    } else if (raw && typeof raw === 'object') {
      const target = raw as Record<string, unknown>;
      x = finiteNumber(target.x);
      y = finiteNumber(target.y);
      z = target.z == null ? 0 : (finiteNumber(target.z) ?? Number.NaN);
      speed = target.speed == null ? undefined : finiteNumber(target.speed);
    } else return undefined;
    if (x == null || y == null || !Number.isFinite(z) || Math.max(Math.abs(x), Math.abs(y), Math.abs(z)) > 100000)
      return undefined;
    if (x === 0 && y === 0 && z === 0) continue;
    targets.push({ x, y, z, speed: speed == null ? undefined : Math.abs(speed) });
  }
  return { frameId: String(frameId), sourceTimestamp, targets };
}
