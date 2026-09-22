import type { FusionEvent } from '../types';

const REVIEW_VERDICTS = ['person', 'pet', 'false_positive', 'uncertain'] as const;

export type ClipReviewVerdict = (typeof REVIEW_VERDICTS)[number];

export type CalibrationIssue = 'not_reporting' | 'stale_frames' | 'outside_room';

export function parseReviewVerdict(value: unknown): ClipReviewVerdict | undefined {
  const text = String(value ?? '');
  return REVIEW_VERDICTS.includes(text as ClipReviewVerdict) ? (text as ClipReviewVerdict) : undefined;
}

export function mapFusionEvent(row: Record<string, unknown>): FusionEvent {
  const timestamp = row.ts ?? row.timestamp;
  return {
    event_id: String(row.event_id),
    fusion_id: String(row.fusion_id),
    track_id: String(row.track_id),
    event_type: row.event_type as FusionEvent['event_type'],
    zone_id: String(row.zone_id),
    timestamp: Number(timestamp),
    x: Number(row.x),
    y: Number(row.y),
    clip_path: row.clip_path ? String(row.clip_path) : undefined,
    camera_entity_id: row.camera_entity_id ? String(row.camera_entity_id) : undefined,
    clip_status: row.clip_status ? (String(row.clip_status) as FusionEvent['clip_status']) : undefined,
    clip_provider: row.clip_provider ? (String(row.clip_provider) as FusionEvent['clip_provider']) : undefined,
    clip_file_size: row.clip_file_size ? Number(row.clip_file_size) : undefined,
    clip_error: row.clip_error ? String(row.clip_error) : undefined,
    metadata: row.metadata && typeof row.metadata === 'object' ? (row.metadata as Record<string, unknown>) : undefined,
    quality_score: row.quality_score == null ? undefined : Number(row.quality_score),
    quality_reason: row.quality_reason ? String(row.quality_reason) : undefined,
    recording_decision: row.recording_decision
      ? (String(row.recording_decision) as FusionEvent['recording_decision'])
      : undefined,
    recording_decisions: Array.isArray(row.recording_decisions)
      ? (row.recording_decisions as FusionEvent['recording_decisions'])
      : undefined,
    review_verdict: parseReviewVerdict(row.review_verdict),
    review_summary: row.review_summary ? String(row.review_summary) : undefined,
    review_error: row.review_error ? String(row.review_error) : undefined,
  };
}

export function applyClipReview(events: FusionEvent[], data: Record<string, unknown>): FusionEvent[] {
  const eventId = String(data.event_id ?? '');
  const verdict = parseReviewVerdict(data.verdict ?? data.review_verdict);
  if (!eventId || !verdict) return events;
  const summary = data.summary ?? data.review_summary;
  return events.map((item) =>
    item.event_id === eventId
      ? {
          ...item,
          review_verdict: verdict,
          review_summary: summary ? String(summary) : item.review_summary,
          review_error: undefined,
        }
      : item,
  );
}

export function calibrationIssue(radar: {
  available: boolean;
  stale?: boolean;
  calibrationWarning?: boolean;
}): CalibrationIssue | null {
  if (!radar.available) return 'not_reporting';
  if (radar.stale) return 'stale_frames';
  if (radar.calibrationWarning) return 'outside_room';
  return null;
}
