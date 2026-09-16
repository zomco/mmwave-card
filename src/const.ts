export const CARD_VERSION = '1.0.0';

/**
 * Which build is actually running, as opposed to which release it claims to be.
 *
 * CARD_VERSION has been '1.0.0' for the life of the card, so the console banner
 * said the same thing whether the browser had today's bundle or one from three
 * months ago. That is not a cosmetic gap: a stale bundle still writing to
 * pre-rename entity ids is invisible until someone diffs the file, and it cost
 * a long debugging session once already.
 *
 * rollup replaces this at build time with `git describe` plus a UTC timestamp.
 * A bundle still showing the raw placeholder was not built by rollup, which
 * is itself worth knowing.
 */
export const CARD_BUILD = '__CARD_BUILD__';
export const CARD_TAG = 'mmwave-card';
export const EDITOR_TAG = 'mmwave-card-editor';
export const STORAGE_KEY = 'mmwave_cal_v1'; // prefix; full key = `${STORAGE_KEY}_${modelId}`
export const TRAIL_MAX_MS = 90_000; // trail retention: 90 s
export const FUSION_TRAIL_MAX_MS = 15_000;

/**
 * Lowest mmwave-fusion WebSocket contract this card can work against.
 *
 * The card and the integration ship as two independent HACS packages, so any
 * combination of versions can end up installed. Bump this when the card starts
 * relying on a command or field a previous backend did not have.
 */
export const REQUIRED_FUSION_API_VERSION = 1;
