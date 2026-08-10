# Copilot Instructions — MMWave Radar HA Card

This is a Home Assistant Lovelace custom card: **TypeScript + Lit 3**, bundled
by **Rollup**, tested with **Vitest**.

The custom element is `custom:mmwave-card`. This card is the **only user
interface** for the project — the ESPHome firmware and the fusion integration
ship no frontend of their own, and calibration happens here.

---

## Quick reference

```bash
npm ci
npm start          # rollup -w, watch mode
npm run build      # → dist/mmwave-card.js
npm run lint       # eslint
npm run lint:fix
npm test           # vitest, single run
npm run test:watch
```

`dist/mmwave-card.js` is **committed** — it is what HACS serves. Rebuild it in
the same change set as any source change, or users get stale behaviour.

---

## Repository layout

```
src/
├── mmwave-card.ts        # Card entry point, custom element registration
├── editor.ts             # Visual config editor (LovelaceCardEditor)
├── const.ts
├── logo.ts
├── models/               # One directory per radar model
│   ├── base.ts           # RadarModelAdapter interface
│   ├── index.ts          # ← RADAR_MODELS registry
│   └── <model>/index.ts  # 16 adapters
├── panels/
│   ├── geo-panel.ts           # Tab ① Geometry & boundary
│   ├── yaw-panel.ts           # Tab ② Yaw calibration
│   ├── live-panel.ts          # Tab ③ Live view
│   ├── fusion-panel.ts        # Multi-radar fused view
│   ├── fusion-calibration.ts  # Joint calibration
│   ├── zone-editor.ts
│   └── installation-3d.ts     # 3-D installation preview
├── fusion/
│   ├── calibration.ts
│   ├── frame.ts          # Atomic target frame decode
│   └── tracker.ts        # Browser-side fallback tracker
├── utils/
│   ├── transform.ts      # ← CROSS-REPO INVARIANT, see below
│   └── canvas.ts
├── types/
│   ├── index.ts
│   └── common.ts         # MMWaveCardConfig, RadarModelInfo, CalibrationConfig,
│                         # EntitySchemaField, DEFAULT_CALIBRATION
└── localize/
    ├── localize.ts
    └── languages/        # en.json, zh-Hans.json

test/                     # Vitest: adapters, frame, localize, transform
tests/                    # Per-model Lovelace example YAML (not test code)
docs/<model>/             # README.md + README_CN.md per model
```

> Note the two similarly named directories: `test/` holds Vitest specs,
> `tests/` holds user-facing Lovelace example configs.

---

## The coordinate transform is a cross-repo invariant

`src/utils/transform.ts` implements the room-frame convention:

**R = Rz(yaw) · Rx(pitch) · Ry(roll)**, `yaw = 0` aims boresight along room
**+Y**, positive yaw clockwise seen from above, `room_z = radar_z − world_z`.
All lengths in **centimetres**.

**The same convention is implemented three times, in three repositories:**

| Repository | File |
| --- | --- |
| **mmwave-card** (here) | `src/utils/transform.ts` |
| [mmwave-component](https://github.com/zomco/mmwave-component) | `components/{model}/{model}_transform.h` (one per model) |
| [mmwave-fusion](https://github.com/zomco/mmwave-fusion) | `custom_components/mmwave_fusion/fusion.py` |

Changing one alone silently mirrors or rotates every user's coordinates, and
**this repository's own tests will still pass**. The cross-check lives in the
[workspace](https://github.com/zomco/mmwave-workspace), which carries all three
as submodules:

```bash
python -m unittest tests.unit.test_rotation_convention -v
```

It extracts the TypeScript expressions out of `transform.ts` and evaluates them
against `fusion.py`. Any change to the convention must land in all three
repositories together.

---

## Adding a radar model

The card core and panels interact with models **exclusively** through
`RadarModelAdapter`, so adding a model touches no shared code:

1. Create `src/models/<model>/index.ts` exporting a `RadarModelAdapter`.
2. Register it in `RADAR_MODELS` in `src/models/index.ts`.
3. Add any new `labelKey` to **both** `en.json` and `zh-Hans.json`.
4. Add `docs/<model>/README.md` + `README_CN.md`, and `tests/<model>.yaml`.
5. `npm run lint && npm test && npm run build`.

### Entity key naming — do not improvise

The adapter looks up exactly the keys in its `ENTITY_SCHEMA`. An unrecognised
key is ignored **silently**: the card renders blank with no error, which is a
miserable thing to debug. Two established shapes:

| Model shape | Pattern | Example |
| --- | --- | --- |
| Single-target | `<axis>_entity` | `x_entity`, `z_entity` |
| Multi-target | `target_<n>_<axis>_entity` | `target_1_x_entity` |

Every key ends in `_entity`. Never emit `target1_x` — that form has appeared in
documentation before and does not work.

### Adapter contract

- `readFromHass` must return raw coordinates in the **radar's local frame, in
  centimetres** (Y forward, X right, Z away from the antenna face). Convert
  here if the radar reports millimetres — see the LD2450 adapter.
- Set `is1DRanging: true` for range-only radars. It makes the card render an
  arc instead of a point, and excludes the model from fusion, which needs
  direction.
- `getDefaultCalibration()` spreads `DEFAULT_CALIBRATION` and overrides only
  what is model-specific (typical mounting height, FOV-derived polygon).

---

## Architecture and patterns

- Prefer Lit 3 patterns; `@property` for public reactive inputs, `@state` for
  internal state.
- Keep configuration shape centralized in `src/types/`.
- Keep editor schema and defaults aligned with runtime card behaviour.
- Validate early in `setConfig` and throw actionable errors.
- Keep `getCardSize` deterministic and aligned with rendered density.
- Avoid direct DOM mutation where Lit reactivity suffices. The canvas panels
  are the deliberate exception — they draw imperatively via `utils/canvas.ts`
  and throttle through `requestAnimationFrame`.

## TypeScript standards

- Strict, explicit typing; avoid `any` unless there is no practical alternative.
- `import type` for type-only imports.
- Validate and narrow optional config fields before use.
- Keep public API names stable unless explicitly asked to change them.

## Home Assistant integration

- Use helpers and conventions from `custom-card-helpers`.
- Support unavailable/loading/error states gracefully — entities are routinely
  `unknown` before the first radar frame arrives.
- Keep Lovelace config compatibility in mind when changing schema or defaults.

## Fusion

- Fusion is optional. The card must stay fully functional for single-radar use
  with no backend present.
- When the [mmwave-fusion](https://github.com/zomco/mmwave-fusion) integration
  is absent, the card falls back to the browser-side tracker in
  `src/fusion/tracker.ts` and must **say so in the UI** rather than implying
  data is being persisted.
- The two are versioned independently. The integration stamps `api_version` on
  every push; the card refuses a backend older than it needs and reports that,
  rather than half-working.
- Prefer `frame_entity` (atomic frame) over per-axis entities. Separate X/Y
  sensors update independently, so a target's X from one frame can pair with
  its Y from the next, putting a phantom target on the diagonal.

## Localization

- Do not hardcode user-facing strings; use a localize key.
- Add new keys to **both** `en.json` and `zh-Hans.json`. There is no other
  language in the repo.
- Keep copy concise and sentence case.

## Styling and UX

- Respect Home Assistant theme variables and CSS custom properties.
- Avoid hardcoded colors when theme tokens exist.
- Ensure layouts work in both compact and wider dashboard widths.

---

## Documentation

User-facing docs are bilingual — every `X.md` has an `X_CN.md`:

| File | Audience |
| --- | --- |
| `README.md` / `README_CN.md` | DIY users: what it is, install, calibrate |
| `DIY.md` / `DIY_CN.md` | Developers: YAML reference, adding models, building |
| `docs/<model>/README*.md` | Per-model config reference |
| `AGENTS.md` → this file | AI agents |

When behaviour or config changes, update the matching docs **in both
languages** in the same change. The model table in `README.md` is generated
from adapter `INFO` blocks by hand — keep it in step when adding a model.

## Safe change workflow

1. Read adjacent code before editing.
2. Implement the smallest viable change.
3. Run `npm run lint && npm test && npm run build`.
4. Update docs (both languages) when behaviour or config changes.
5. Summarize what changed and why.

## Avoid these common issues

- Breaking editor/card config parity
- Inventing entity key names outside the two established patterns
- Adding untyped dynamic config access
- Hardcoding text instead of localization keys
- Overriding theme behavior with fixed styles
- Changing output filenames or the card tag without explicit request
- Editing `transform.ts` without the other two repositories
- Forgetting to rebuild `dist/`
