import { describe, expect, it } from 'vitest';
import { presenceStatus } from '../src/utils/presence-status';
import type { RadarTarget } from '../src/types';

const target = (inside: boolean): RadarTarget => ({
  index: 0, rawX: 0, rawY: 100, rawZ: 0,
  room: { roomX: 0, roomY: 100, roomZ: 0, inBoundary: inside },
});


describe('presence validity', () => {
  it('never turns a data outage into a definite nobody', () => {
    expect(presenceStatus(false, [], 'missing')).toBe('unknown');
    expect(presenceStatus(false, [], 'unavailable')).toBe('unknown');
    expect(presenceStatus(false, [], 'unknown')).toBe('unknown');
  });
  it('keeps a valid off as nobody and valid on paths unchanged', () => {
    expect(presenceStatus(false, [], undefined)).toBe('none');
    expect(presenceStatus(true, [], undefined)).toBe('unlocated');
    expect(presenceStatus(true, [target(true)], undefined)).toBe('present');
    expect(presenceStatus(true, [target(false)], undefined)).toBe('filtered');
  });
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
