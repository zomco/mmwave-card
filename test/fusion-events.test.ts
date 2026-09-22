import { describe, expect, it } from 'vitest';

import {
  applyClipReview,
  applySnapshotReady,
  calibrationIssue,
  filterFusionEvents,
  mapFusionEvent,
  parseReviewVerdict,
} from '../src/fusion/events';
import type { FusionEvent } from '../src/types';

function event(over: Partial<FusionEvent> = {}): FusionEvent {
  return {
    event_id: 'e1',
    fusion_id: 'home',
    track_id: 't1',
    event_type: 'traverse',
    zone_id: 'kitchen',
    timestamp: 100,
    x: 1,
    y: 2,
    ...over,
  };
}

describe('mapFusionEvent', () => {
  it('keeps clip fields and flattens a review verdict', () => {
    const mapped = mapFusionEvent({
      event_id: 'e1',
      fusion_id: 'home',
      track_id: 't1',
      event_type: 'traverse',
      zone_id: 'kitchen',
      ts: 12.5,
      x: 10,
      y: 20,
      clip_status: 'ready',
      clip_path: 'mmwave_fusion/home/e1.mp4',
      snapshot_path: 'mmwave_fusion/home/e1.jpg',
      review_verdict: 'false_positive',
      review_summary: 'Empty hall.',
      quality_score: 82,
    });
    expect(mapped.timestamp).toBe(12.5);
    expect(mapped.clip_path).toBe('mmwave_fusion/home/e1.mp4');
    expect(mapped.snapshot_path).toBe('mmwave_fusion/home/e1.jpg');
    expect(mapped.review_verdict).toBe('false_positive');
    expect(mapped.review_summary).toBe('Empty hall.');
    expect(mapped.quality_score).toBe(82);
  });

  it('ignores an unknown review verdict', () => {
    expect(parseReviewVerdict('intruder')).toBeUndefined();
    expect(mapFusionEvent({ event_id: 'e', fusion_id: 'h', track_id: 't', event_type: 'enter', zone_id: 'z', ts: 1, x: 0, y: 0, review_verdict: 'intruder' }).review_verdict).toBeUndefined();
  });
});

describe('applySnapshotReady', () => {
  it('patches the snapshot path on the matching event', () => {
    const next = applySnapshotReady([event(), event({ event_id: 'e2' })], {
      event_id: 'e1',
      snapshot_path: 'mmwave_fusion/home/e1.jpg',
    });
    expect(next[0].snapshot_path).toBe('mmwave_fusion/home/e1.jpg');
    expect(next[1].snapshot_path).toBeUndefined();
  });
});

describe('filterFusionEvents', () => {
  it('keeps events that match type, zone and time', () => {
    const rows = [
      event({ event_type: 'enter', zone_id: 'hall', timestamp: 50 }),
      event({ event_id: 'e2', event_type: 'dwell', zone_id: 'hall', timestamp: 80 }),
      event({ event_id: 'e3', event_type: 'enter', zone_id: 'roof', timestamp: 90 }),
    ];
    expect(filterFusionEvents(rows, { eventType: 'enter', zoneId: 'hall', since: 40 }).map((item) => item.event_id)).toEqual([
      'e1',
    ]);
  });
});

describe('applyClipReview', () => {
  it('patches only the matching event', () => {
    const next = applyClipReview(
      [event(), event({ event_id: 'e2' })],
      { event_id: 'e1', verdict: 'person', summary: 'Someone walking.' },
    );
    expect(next[0].review_verdict).toBe('person');
    expect(next[0].review_summary).toBe('Someone walking.');
    expect(next[1].review_verdict).toBeUndefined();
  });

  it('leaves the list unchanged when the payload is incomplete', () => {
    const rows = [event()];
    expect(applyClipReview(rows, { event_id: 'e1' })).toBe(rows);
  });
});

describe('calibrationIssue', () => {
  it('treats a missing radar as wiring, not yaw', () => {
    expect(calibrationIssue({ available: false, calibrationWarning: true })).toBe('not_reporting');
  });

  it('points at yaw when detections miss the room', () => {
    expect(calibrationIssue({ available: true, calibrationWarning: true })).toBe('outside_room');
  });

  it('is silent when the radar looks healthy', () => {
    expect(calibrationIssue({ available: true, stale: false, calibrationWarning: false })).toBeNull();
  });
});
