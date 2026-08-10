export const CARD_VERSION = '1.0.0';
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
