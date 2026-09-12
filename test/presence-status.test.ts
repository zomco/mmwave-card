import { describe, expect, it } from 'vitest';
import { presenceStatus } from '../src/utils/presence-status';
import type { RadarTarget } from '../src/types';

const target = (inside: boolean): RadarTarget => ({
  index: 0, rawX: 0, rawY: 100, rawZ: 0,
  room: { roomX: 0, roomY: 100, roomZ: 0, inBoundary: inside },
});

describe('presence badge', () => {
  it('does not classify missing range as outside the boundary', () => {
    expect(presenceStatus(true, [])).toBe('unlocated');
  });
  it('distinguishes absence, in-boundary and actually filtered targets', () => {
    expect(presenceStatus(false, [])).toBe('none');
    expect(presenceStatus(true, [target(true)])).toBe('present');
    expect(presenceStatus(true, [target(false)])).toBe('filtered');
    expect(presenceStatus(true, [target(false), target(true)])).toBe('present');
  });
});
