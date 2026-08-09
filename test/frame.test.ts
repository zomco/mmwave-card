import { describe, expect, it } from 'vitest';

import { parseAtomicTargetFrame } from '../src/fusion/frame';

// The atomic target frame is the multi-radar fusion ingest path: a compact JSON
// string published by the ESPHome components at radar rate. It is parsed from a
// Home Assistant state string, so it must reject anything malformed rather than
// feed NaN coordinates into the tracker.
const frame = (over: Record<string, unknown> = {}) =>
  JSON.stringify({ v: 1, f: 42, ts: 123456, t: [[120, 340, -8]], ...over });

describe('parseAtomicTargetFrame — accepts valid frames', () => {
  it('parses the documented v1 shape', () => {
    const r = parseAtomicTargetFrame(frame());
    expect(r).toBeDefined();
    expect(r!.frameId).toBe('42');
    expect(r!.sourceTimestamp).toBe(123456);
    expect(r!.targets).toEqual([{ x: 120, y: 340, z: 0, speed: 8 }]);
  });

  it('takes the magnitude of speed', () => {
    // Speed sign encodes approach/recede; the tracker wants magnitude only.
    const r = parseAtomicTargetFrame(frame({ t: [[0, 100, -25]] }));
    expect(r!.targets[0].speed).toBe(25);
  });

  it('accepts a 4-tuple as [x, y, z, speed]', () => {
    const r = parseAtomicTargetFrame(frame({ t: [[10, 20, 30, 4]] }));
    expect(r!.targets[0]).toEqual({ x: 10, y: 20, z: 30, speed: 4 });
  });

  it('parses the exact payload r60abd1 firmware emits', () => {
    // R60ABD1 is single-target 3-D with no speed, so its snprintf writes a
    // 4-tuple with speed 0. A 3-tuple would be read as [x, y, speed] and the
    // height would be silently reinterpreted as a velocity.
    const r = parseAtomicTargetFrame('{"v":1,"f":1,"ts":123456,"t":[[120,340,-8,0]]}');
    expect(r!.targets).toEqual([{ x: 120, y: 340, z: -8, speed: 0 }]);
  });

  it('accepts object-form targets', () => {
    const r = parseAtomicTargetFrame(frame({ t: [{ x: 1, y: 2, z: 3, speed: 4 }] }));
    expect(r!.targets[0]).toEqual({ x: 1, y: 2, z: 3, speed: 4 });
  });

  it('accepts a string frame id', () => {
    expect(parseAtomicTargetFrame(frame({ f: 'abc' }))!.frameId).toBe('abc');
  });

  it('drops the all-zero placeholder target', () => {
    // The components emit [0,0,0] for an unused target slot.
    const r = parseAtomicTargetFrame(frame({ t: [[0, 0, 0], [5, 6, 1]] }));
    expect(r!.targets).toHaveLength(1);
    expect(r!.targets[0].x).toBe(5);
  });

  it('accepts an empty target list', () => {
    const r = parseAtomicTargetFrame(frame({ t: [] }));
    expect(r!.targets).toEqual([]);
  });
});

describe('parseAtomicTargetFrame — rejects malformed input', () => {
  const rejected: Array<[string, string]> = [
    ['not JSON at all', 'unavailable'],
    ['empty string', ''],
    ['a JSON scalar', '123'],
    ['a JSON array', '[1,2,3]'],
    ['null', 'null'],
  ];
  for (const [label, raw] of rejected) {
    it(`rejects ${label}`, () => expect(parseAtomicTargetFrame(raw)).toBeUndefined());
  }

  const badFrames: Array<[string, Record<string, unknown>]> = [
    ['a future schema version', { v: 2 }],
    ['a missing schema version', { v: undefined }],
    ['a missing timestamp', { ts: undefined }],
    ['a non-numeric timestamp', { ts: 'soon' }],
    ['a missing frame id', { f: undefined }],
    ['a non-array target list', { t: { x: 1 } }],
    ['more than 32 targets', { t: Array.from({ length: 33 }, () => [1, 1, 0]) }],
    ['a 1-element target tuple', { t: [[5]] }],
    ['a 5-element target tuple', { t: [[1, 2, 3, 4, 5]] }],
    ['a non-finite coordinate', { t: [['x', 2, 0]] }],
    ['a scalar in the target list', { t: [7] }],
    ['an out-of-range coordinate', { t: [[100001, 0, 0]] }],
  ];
  for (const [label, over] of badFrames) {
    it(`rejects ${label}`, () => expect(parseAtomicTargetFrame(frame(over))).toBeUndefined());
  }

  it('rejects NaN and Infinity, which JSON.parse cannot produce but string concat can', () => {
    expect(parseAtomicTargetFrame('{"v":1,"f":1,"ts":1,"t":[[1e999,0,0]]}')).toBeUndefined();
  });

  it('never returns a target carrying NaN', () => {
    for (const [, over] of badFrames) {
      const r = parseAtomicTargetFrame(frame(over));
      for (const t of r?.targets ?? []) {
        expect(Number.isFinite(t.x)).toBe(true);
        expect(Number.isFinite(t.y)).toBe(true);
        expect(Number.isFinite(t.z)).toBe(true);
      }
    }
  });
});
