import type { RadarTarget } from '../types';

export type PresenceStatusResult = 'none' | 'unlocated' | 'present' | 'filtered' | 'unknown';

/**
 * Missing range is not evidence that a detected person is outside the boundary.
 *
 * A missing/unavailable/unknown presence entity is likewise not evidence that
 * the room is empty: it is reported as 'unknown' so no consumer can turn a data
 * outage into a definite "nobody".
 */
export function presenceStatus(
  present: boolean,
  targets: RadarTarget[],
  presenceError?: 'missing' | 'unavailable' | 'unknown',
): PresenceStatusResult {
  if (presenceError) return 'unknown';
  if (!present) return 'none';
  if (targets.length === 0) return 'unlocated';
  return targets.some((target) => target.room?.inBoundary) ? 'present' : 'filtered';
}
