/**
 * Model registry
 *
 * To add a new radar model:
 *   1. Create src/models/<your_model>/index.ts implementing RadarModelAdapter.
 *   2. Import the adapter here and add it to RADAR_MODELS.
 *   3. That's it — the card, editor, and all panels update automatically.
 */

import type { RadarModelAdapter } from "./base";
import { r60abd1Adapter } from "./r60abd1";
import { ld2450Adapter }  from "./ld2450";
import { rd03eAdapter }   from "./rd03e";

/**
 * Central registry: model ID → adapter.
 * The ID string is what users write in their Lovelace YAML:
 *   radar_model: r60abd1
 */
export const RADAR_MODELS: Record<string, RadarModelAdapter> = {
  r60abd1: r60abd1Adapter,
  ld2450:  ld2450Adapter,
  rd03e:   rd03eAdapter,
};

export function getAdapter(modelId: string): RadarModelAdapter | undefined {
  return RADAR_MODELS[modelId];
}

/** Sorted list for the editor drop-down. */
export function getModelList(): Array<{ id: string; label: string }> {
  return Object.entries(RADAR_MODELS)
    .map(([id, a]) => ({ id, label: a.info.displayName }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export type { RadarModelAdapter } from "./base";
