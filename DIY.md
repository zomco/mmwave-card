# Advanced Configuration & DIY Guide

[中文文档](./DIY_CN.md)

For users who prefer YAML over the visual editor, developers adding radar
models, and anyone who wants to understand what the calibration numbers
actually mean.

> Setting up for the first time? Use the visual editor instead — see
> [Getting Started](https://github.com/zomco/mmwave-component/blob/main/GETTING-STARTED.md).
> Everything below is optional.

## Contents

- [Configuration](#configuration) — YAML for each model shape
- [Calibration explained](#calibration-explained) — what the six parameters mean
- [Coordinate system](#coordinate-system) — axis and rotation conventions
- [Adding a New Model](#adding-a-new-model)
- [Building from Source](#building-from-source)
- [Troubleshooting](#troubleshooting)

---

## Configuration

### Entity key naming

Entity keys are **not** freely named — the adapter looks up exactly the keys in
its schema, and a key it does not recognise is ignored silently, leaving the
card blank with no error.

Two naming shapes are in use, depending on how many targets the model reports:

| Model shape | Key pattern | Example |
| --- | --- | --- |
| Single-target (R60ABD1, LD6002, all 1-D models) | `<axis>_entity` | `x_entity`, `y_entity`, `z_entity` |
| Multi-target (LD2450/2451/2452/2453/2454) | `target_<n>_<axis>_entity` | `target_1_x_entity`, `target_2_y_entity` |

Every key ends in `_entity`. The authoritative list for any model is the
`ENTITY_SCHEMA` array in `src/models/<model>/index.ts`.

### R60ABD1 — single target, 3-D, vital signs

```yaml
type: custom:mmwave-card
radar_model: r60abd1
presence_entity: binary_sensor.r60abd1_presence
x_entity: sensor.r60abd1_x
y_entity: sensor.r60abd1_y
z_entity: sensor.r60abd1_z                  # optional
breath_entity: sensor.r60abd1_breath_value  # optional
heart_entity: sensor.r60abd1_heart_rate     # optional
sleep_entity: sensor.r60abd1_sleep_state    # optional
polygon_entity: text.r60abd1_polygon_config # optional, enables saving the boundary
frame_entity: sensor.r60abd1_target_frame   # optional, atomic frame — see below
room_w: 400   # room width (cm)
room_d: 350   # room depth (cm)
```

### LD2450 — up to 3 targets, 2-D

```yaml
type: custom:mmwave-card
radar_model: ld2450
presence_entity: binary_sensor.ld2450_presence
target_1_x_entity: sensor.ld2450_target_1_x
target_1_y_entity: sensor.ld2450_target_1_y
target_1_speed_entity: sensor.ld2450_target_1_speed  # optional
target_2_x_entity: sensor.ld2450_target_2_x          # optional
target_2_y_entity: sensor.ld2450_target_2_y
target_2_speed_entity: sensor.ld2450_target_2_speed  # optional
target_3_x_entity: sensor.ld2450_target_3_x          # optional
target_3_y_entity: sensor.ld2450_target_3_y
target_3_speed_entity: sensor.ld2450_target_3_speed  # optional
polygon_entity: text.ld2450_polygon_config           # optional
room_w: 500
room_d: 400
```

LD2451, LD2452, LD2453 and LD2454 take the same shape — only `radar_model` and
the entity prefixes change.

### Atomic target frames

Multi-target models can publish all targets in one versioned JSON entity
instead of a sensor per axis:

```yaml
frame_entity: sensor.ld2450_target_frame
```

```json
{ "v": 1, "f": 42, "ts": 123456, "t": [[120.0, 340.0, -8], [-45.0, 210.0, 3]] }
```

`f` is a frame counter, `ts` is milliseconds since device boot, and each entry
in `t` is `[x, y, speed]` from the same protocol frame. v1 units are cm and
cm/s.

This matters because separate X/Y sensors update independently — you can read
target 1's X from one frame and its Y from the next, which puts a phantom
target on the diagonal. One atomic entity cannot tear that way.

When `frame_entity` is set, the per-axis entities become optional fallbacks.
**Exclude the frame entity from the HA Recorder** — it is a high-frequency text
state and will bloat the recorder database.

### Common options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `radar_model` | string | **required** | Model ID — the key in `RADAR_MODELS`, e.g. `r60abd1`, `ld2450` |
| `presence_entity` | string | **required** | Binary sensor for presence |
| `room_w` | number | `400` | Room width for canvas scaling (cm) |
| `room_d` | number | `350` | Room depth for canvas scaling (cm) |
| `polygon_entity` | string | — | Text entity holding the boundary; required to save a boundary from the UI |
| `frame_entity` | string | — | Atomic target frame (multi-target models) |

`room_w` / `room_d` affect canvas scaling only. They do not change calibration
accuracy.

---

## Calibration explained

Calibration is stored in browser `localStorage` under
`mmwave_cal_v1_<radar_model>`, and pushed to the device when you press **Save**
so it survives a reboot.

| Parameter | Unit | Meaning |
| --- | --- | --- |
| `radar_x` | cm | Distance along the room X axis from the origin corner |
| `radar_y` | cm | Distance along the room Y axis from the origin corner |
| `radar_z` | cm | Mounting height above the floor |
| `yaw` | ° | Heading. `0` = boresight along room **+Y**, clockwise positive seen from above |
| `pitch` | ° | Elevation tilt, positive = tilted forward/down |
| `roll` | ° | Bank about the radar's own boresight |
| `polygon` | cm | Room boundary vertices; fewer than 3 disables filtering |

Measure to the radar module, not the ESP32 board. ±5 cm is fine.

### The three tabs

**Tab ① — Geometry & boundary.** Enter `radar_x`, `radar_y`, `radar_z` and draw
the polygon. Targets outside the polygon stop driving presence, which is the
through-wall ghost fix.

**Tab ② — Yaw calibration.** Two-point geometric method: stand at a known
point, mark it, then stand at a second point at least ~2 m away and mark that.
The card solves the heading from the pair. Points too close together amplify
measurement error.

**Tab ③ — Live view.** Walk and watch. A mirrored dot is 180° of yaw error; a
dot at right angles to your motion is 90°. Fix it in Tab ② — hand-tuning the
angle hides the error rather than correcting it.

### Updating pitch/roll from an automation

If you mount the radar on something that moves and have an IMU, the calibration
numbers are plain entities and can be driven from an automation:

```yaml
# configuration.yaml
automation:
  - alias: Push IMU tilt to radar
    trigger:
      - platform: state
        entity_id: sensor.imu_pitch
    action:
      - service: number.set_value
        target:
          entity_id: number.r60abd1_radar_pitch
        data:
          value: "{{ states('sensor.imu_pitch') | float }}"
```

---

## Coordinate system

Room frame: origin at a corner you choose, **X** to the right, **Y** forward,
**Z** up from the floor. All lengths in centimetres.

Rotation is ZYX Tait-Bryan: **R = Rz(yaw) · Rx(pitch) · Ry(roll)**.

- `yaw = 0` aims the radar boresight along room **+Y**; positive yaw turns
  clockwise seen from above (toward +X).
- `pitch` tilts about the intermediate X axis.
- `roll` turns about the radar's own boresight (local +Y).
- Room Z is measured up from the floor, so `room_z = radar_z − world_z`.

> **This convention is implemented three times, in three repositories** — here
> in `src/utils/transform.ts`, in each ESPHome component's
> `{model}_transform.h`, and in the fusion integration's `fusion.py`. Changing
> one alone silently mirrors or rotates everyone's coordinates without failing
> that repository's own tests. See [AGENTS.md](./AGENTS.md).

---

## Adding a New Model

Two files change: one new adapter, one registry line.

**1. Create** `src/models/<your_model>/index.ts`:

```typescript
import type { RadarModelAdapter } from '../base';
import type {
  RadarModelInfo,
  EntitySchemaField,
  MMWaveCardConfig,
  CalibrationConfig,
} from '../../types';
import { DEFAULT_CALIBRATION } from '../../types';

const INFO: RadarModelInfo = {
  id: 'my_radar',
  displayName: 'My Radar XYZ (24 GHz)',
  fovDegrees: 90,
  maxRangeM: 5,
  minRangeM: 0.3,
  updateRateHz: 10,
  maxTargets: 1,
  hasZAxis: false,
  hasBreathing: false,
  hasHeartRate: false,
  hasSleep: false,
  // Set for range-only radars: renders an arc instead of a point, and
  // excludes the model from multi-radar fusion.
  is1DRanging: false,
};

const ENTITY_SCHEMA: EntitySchemaField[] = [
  { key: 'presence_entity', labelKey: 'editor.presence_entity', required: true, domain: 'binary_sensor' },
  { key: 'x_entity', labelKey: 'editor.x_entity', required: true, domain: 'sensor' },
  { key: 'y_entity', labelKey: 'editor.y_entity', required: true, domain: 'sensor' },
];

export const myRadarAdapter: RadarModelAdapter = {
  info: INFO,

  getEntitySchema: () => ENTITY_SCHEMA,

  validateConfig(config: MMWaveCardConfig): string[] {
    return ENTITY_SCHEMA.filter((f) => f.required && !config[f.key]).map(
      (f) => `Missing required entity: ${f.key}`,
    );
  },

  readFromHass(hass, config) {
    const pres = hass.states[config.presence_entity as string];
    if (!pres || pres.state !== 'on') return { present: false, targets: [] };
    const x = parseFloat(hass.states[config.x_entity as string]?.state) || 0;
    const y = parseFloat(hass.states[config.y_entity as string]?.state) || 0;
    return { present: true, targets: [{ index: 0, rawX: x, rawY: y, rawZ: 0 }] };
  },

  getDefaultCalibration(): CalibrationConfig {
    return { ...DEFAULT_CALIBRATION, radar_z: 200 };
  },
};
```

Raw coordinates returned from `readFromHass` must be in the radar's **local**
frame, in centimetres (Y forward, X right, Z away from the antenna face). If
the radar reports millimetres, convert here — the LD2450 adapter does exactly
this.

**2. Register** it in `src/models/index.ts`:

```typescript
import { myRadarAdapter } from './my_radar';

export const RADAR_MODELS: Record<string, RadarModelAdapter> = {
  // …existing models…
  my_radar: myRadarAdapter, // ← add here
};
```

**3. Add translation keys** to both `src/localize/languages/en.json` and
`zh-Hans.json` for any new `labelKey` you introduced.

**4. Build and test:**

```bash
npm run lint && npm test && npm run build
```

The editor drop-down, all panels, and calibration storage pick the model up
automatically — no shared code to touch.

Optionally add `docs/<your_model>/README.md` and `README_CN.md` following the
shape of the existing ones, and a Lovelace example under `tests/`.

---

## Building from Source

```bash
git clone https://github.com/zomco/mmwave-card.git
cd mmwave-card
npm install

npm run build      # → dist/mmwave-card.js
npm start          # watch mode (rollup -w)
npm run lint       # eslint
npm run lint:fix
npm test           # vitest, single run
npm run test:watch
```

Requires Node.js ≥ 18. Built with TypeScript + Lit 3, bundled by Rollup.

Tests live in `test/` and cover the model adapters, the atomic frame parser,
localization, and the coordinate transform.

### Source layout

| Path | What it holds |
| --- | --- |
| `src/mmwave-card.ts` | Card entry point and custom element registration |
| `src/editor.ts` | Visual config editor |
| `src/models/` | One directory per radar model, plus `base.ts` and the `index.ts` registry |
| `src/panels/` | The three calibration tabs, plus the fusion, zone and 3-D installation views |
| `src/fusion/` | Browser-side fusion: calibration, frame decode, tracker |
| `src/utils/transform.ts` | Coordinate transform — **cross-repo invariant** |
| `src/utils/canvas.ts` | Canvas drawing helpers |
| `src/types/` | Config and model type definitions |
| `src/localize/` | i18n helper and `languages/en.json`, `zh-Hans.json` |

---

## Troubleshooting

**Card renders but stays blank.** Usually a misspelled entity key — an
unrecognised key is ignored silently. Check it against `ENTITY_SCHEMA` in
`src/models/<model>/index.ts`, and note that multi-target models use
`target_1_x_entity`, not `target1_x`.

**Position is mirrored or rotated.** Yaw error. Redo Tab ②.

**A phantom target appears on the diagonal.** Per-axis sensors updating out of
step. Set `frame_entity` to the atomic frame instead.

**Fusion view says the backend is too old.** The card and integration are
versioned independently; update mmwave-fusion. The card refuses rather than
half-working.

**A model is missing from the fusion editor.** Range-only models have no
direction to fuse. Check the `Fusion` column in the
[model table](./README.md#supported-models).
