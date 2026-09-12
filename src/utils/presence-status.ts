import type { RadarTarget } from '../types';

/** Missing range is not evidence that a detected person is outside the boundary. */
export function presenceStatus(present: boolean, targets: RadarTarget[]) {
  if (!present) return 'none';
  if (targets.length === 0) return 'unlocated';
  return targets.some((target) => target.room?.inBoundary) ? 'present' : 'filtered';
}
