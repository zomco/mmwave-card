import { describe, expect, it } from 'vitest';
import type { HomeAssistant } from 'custom-card-helpers';

import { RADAR_MODELS, getAdapter, getModelList } from '../src/models';
import type { MMWaveCardConfig } from '../src/types';

const MODEL_IDS = Object.keys(RADAR_MODELS);

/** A config with every entity the model declares, pointed at synthetic ids. */
function fullConfig(modelId: string): MMWaveCardConfig {
  const adapter = RADAR_MODELS[modelId];
  const config = { type: 'custom:mmwave-card', radar_model: modelId } as MMWaveCardConfig;
  for (const field of adapter.getEntitySchema()) {
    (config as Record<string, unknown>)[field.key] = `${field.domain}.${modelId}_${field.key}`;
  }
  return config;
}

/** A hass whose every entity holds `state`, so one call covers all fields. */
function hassWith(modelId: string, state: string, attributes: Record<string, unknown> = {}): HomeAssistant {
  const states: Record<string, unknown> = {};
  const config = fullConfig(modelId);
  for (const field of RADAR_MODELS[modelId].getEntitySchema()) {
    const id = config[field.key] as string;
    states[id] = { entity_id: id, state, attributes };
  }
  return { states } as unknown as HomeAssistant;
}

describe('model registry', () => {
  it('registers every adapter under its own info.id', () => {
    for (const [key, adapter] of Object.entries(RADAR_MODELS)) {
      expect(adapter.info.id).toBe(key);
    }
  });

  it('resolves known ids and returns undefined for unknown ones', () => {
    expect(getAdapter('ld2450')).toBe(RADAR_MODELS.ld2450);
    expect(getAdapter('definitely-not-a-radar')).toBeUndefined();
  });

  it('lists every model exactly once for the editor drop-down', () => {
    const list = getModelList();
    expect(list).toHaveLength(MODEL_IDS.length);
    expect(new Set(list.map((m) => m.id)).size).toBe(MODEL_IDS.length);
    expect(list.every((m) => m.label.length > 0)).toBe(true);
  });
});

describe.each(MODEL_IDS)('%s adapter', (modelId) => {
  const adapter = RADAR_MODELS[modelId];

  it('publishes coherent model info', () => {
    const { info } = adapter;
    expect(info.displayName.length).toBeGreaterThan(0);
    expect(info.fovDegrees).toBeGreaterThan(0);
    expect(info.fovDegrees).toBeLessThanOrEqual(360);
    expect(info.maxRangeM).toBeGreaterThan(info.minRangeM);
    expect(info.maxTargets).toBeGreaterThanOrEqual(1);
    expect(info.updateRateHz).toBeGreaterThan(0);
  });

  it('declares at least one required entity', () => {
    const schema = adapter.getEntitySchema();
    expect(schema.length).toBeGreaterThan(0);
    expect(schema.some((f) => f.required)).toBe(true);
  });

  it('uses unique entity keys', () => {
    const keys = adapter.getEntitySchema().map((f) => f.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('rejects an empty config and accepts a fully populated one', () => {
    const empty = { type: 'custom:mmwave-card', radar_model: modelId } as MMWaveCardConfig;
    expect(adapter.validateConfig(empty).length).toBeGreaterThan(0);
    expect(adapter.validateConfig(fullConfig(modelId))).toEqual([]);
  });

  it('returns a default calibration with a plausible mounting height', () => {
    const c = adapter.getDefaultCalibration();
    expect(c.radar_z).toBeGreaterThan(0);
    expect(c.radar_z).toBeLessThanOrEqual(400);
    expect(Math.abs(c.yaw)).toBeLessThanOrEqual(180);
    expect(Math.abs(c.pitch)).toBeLessThanOrEqual(90);
    expect(Math.abs(c.roll)).toBeLessThanOrEqual(90);
  });

  it('reports absence when nothing is configured', () => {
    const bare = { type: 'custom:mmwave-card', radar_model: modelId } as MMWaveCardConfig;
    const reading = adapter.readFromHass({ states: {} } as unknown as HomeAssistant, bare);
    expect(reading.present).toBe(false);
    expect(reading.targets).toEqual([]);
  });

  it('reports absence when every entity is unavailable', () => {
    const reading = adapter.readFromHass(hassWith(modelId, 'unavailable'), fullConfig(modelId));
    expect(reading.present).toBe(false);
    expect(reading.targets).toEqual([]);
  });

  // Regression guard for the phantom-target class of bug: adapters read numeric
  // states with `parseFloat(state) || 0`, so an entity going unknown collapses
  // to 0 and can render a target sitting exactly on the radar origin.
  //
  // The interesting case is presence ON with the coordinate sensors dropped
  // out - a real failure mode when one ESPHome sensor stops publishing. With
  // presence itself unknown every adapter returns early, so that path alone
  // would not exercise the coordinate handling at all.
  it('never emits a target at the radar origin from unknown states', () => {
    for (const state of ['unknown', 'unavailable', '', 'NaN']) {
      const reading = adapter.readFromHass(hassWith(modelId, state), fullConfig(modelId));
      for (const target of reading.targets) {
        expect(
          target.rawX === 0 && target.rawY === 0 && target.rawZ === 0,
          `${modelId} emitted an origin target for state "${state}"`,
        ).toBe(false);
      }
    }
  });

  it('never emits an origin target when presence is on but coordinates dropped out', () => {
    // ld2450a is a deliberate, documented exception: its adapter pushes a
    // target at distance 0 when the distance sensor is invalid, so the card
    // renders "Present" rather than "Outside Boundary". The cost is a phantom
    // target drawn exactly on the radar position. Pinned here rather than
    // silently changed - see the comment in src/models/ld2450a/index.ts.
    const emitsOriginTargetByDesign = modelId === 'ld2450a';

    for (const state of ['unknown', 'unavailable', '']) {
      const hass = hassWith(modelId, state);
      // Force every binary_sensor (presence and friends) on, leaving the
      // numeric sensors in their dropped-out state.
      for (const field of adapter.getEntitySchema()) {
        if (field.domain !== 'binary_sensor') continue;
        const id = fullConfig(modelId)[field.key] as string;
        (hass.states as Record<string, unknown>)[id] = { entity_id: id, state: 'on', attributes: {} };
      }
      const reading = adapter.readFromHass(hass, fullConfig(modelId));
      const atOrigin = reading.targets.filter((t) => t.rawX === 0 && t.rawY === 0 && t.rawZ === 0);

      if (emitsOriginTargetByDesign) {
        expect(atOrigin.length).toBeGreaterThan(0);
      } else {
        expect(atOrigin, `${modelId} emitted an origin target with presence on and coords "${state}"`).toEqual([]);
      }
    }
  });

  // The x and y sensors are published as two separate ESPHome state updates,
  // so every track loss passes through a moment where one has already gone
  // unknown while the other still holds its last coordinate. `parseFloat(s) ||
  // 0` turned that half-state into a real 0, which put the target on the
  // boresight: the marker flicked to the centre line before disappearing,
  // every single time a track dropped. Observed on the bench LD2453, whose
  // recorder history is full of x-numeric/y-unknown pairs.
  it('drops a target whose x or y went unknown while the other still holds a value', () => {
    const schema = adapter.getEntitySchema();
    const config = fullConfig(modelId);

    for (const dropped of ['x', 'y'] as const) {
      const kept = dropped === 'x' ? 'y' : 'x';
      // Every sensor holds a real coordinate, and presence is on — otherwise
      // the adapters return early and the coordinate path is never reached.
      const hass = hassWith(modelId, '300');
      for (const field of schema) {
        if (field.domain !== 'binary_sensor') continue;
        const id = config[field.key] as string;
        (hass.states as Record<string, unknown>)[id] = { entity_id: id, state: 'on', attributes: {} };
      }

      let touched = false;
      for (const field of schema) {
        // Only the paired per-slot coordinate fields, e.g. target_1_x_entity.
        if (!new RegExp(`_${dropped}_entity$`).test(field.key)) continue;
        if (!schema.some((f) => f.key === field.key.replace(`_${dropped}_entity`, `_${kept}_entity`))) continue;

        const id = config[field.key] as string;
        (hass.states as Record<string, unknown>)[id] = { entity_id: id, state: 'unknown', attributes: {} };
        touched = true;
      }
      if (!touched) continue; // model has no paired per-slot x/y entities

      // Every slot just lost one coordinate, so nothing is locatable. Before
      // the fix each slot still yielded a target pinned to the boresight.
      expect(
        adapter.readFromHass(hass, config).targets,
        `${modelId} kept a target after its ${dropped} went unknown`,
      ).toEqual([]);
    }
  });

  it('never emits non-finite coordinates', () => {
    for (const state of ['unknown', 'garbage', '1e999', '-0']) {
      const reading = adapter.readFromHass(hassWith(modelId, state), fullConfig(modelId));
      for (const target of reading.targets) {
        expect(Number.isFinite(target.rawX)).toBe(true);
        expect(Number.isFinite(target.rawY)).toBe(true);
        expect(Number.isFinite(target.rawZ)).toBe(true);
      }
    }
  });

  it('never reports more targets than the model supports', () => {
    const reading = adapter.readFromHass(hassWith(modelId, '100'), fullConfig(modelId));
    expect(reading.targets.length).toBeLessThanOrEqual(adapter.info.maxTargets);
  });

  it('assigns each target a distinct index', () => {
    const reading = adapter.readFromHass(hassWith(modelId, '100'), fullConfig(modelId));
    const indices = reading.targets.map((t) => t.index);
    expect(new Set(indices).size).toBe(indices.length);
  });
});
