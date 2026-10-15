# MMWave visual language

[中文](visual-language_CN.md)

The DIY flasher is the visual reference for MMWave Card, its Fusion surfaces and TraceCue. The products retain their existing workflows and runtimes. No cross-repository runtime dependency is required.

## Rules

- Brand: `#0b825c` actions, quiet green tints, an outlined radar mark. Red remains destructive/error; amber remains warning. Never recolor every series green.
- Typography: DM Sans / Noto Sans SC / host font / system fallback. No remote font request. Body and controls are 13 px in the compact HA card, supporting text at least 12 px, map labels 11 px. Use weight 600 and normal sentence case; monospace is for coordinates, IDs and code.
- Surfaces: 16 px outer card, 14 px panels, 10 px fields; subtle borders and shadows. Inputs and secondary actions are at least 40 px tall, primary actions 44 px. Coarse-pointer buttons are at least 44 px tall.
- Every Lit shadow root imports `src/styles/controls.ts`. Use HA surface/text/divider variables; never change global Home Assistant CSS. `--mmwave-brand-color` and `--mmwave-font-family` are optional host overrides.
- Canvas uses `src/styles/scene.ts` for the categorical palette, font and theme-aware scale/label colors. SVG area and zone editors share the palette. Heatmaps retain their cold-to-hot semantic ramp. Coordinates and calibration mathematics are unchanged.
- Keep focus rings, disabled states, accessible icon-button names and reduced-motion support. Do not hide required form controls at narrow widths.

## Coverage and verification

Includes live card, config editor, installation preview, geometry/boundary/area/zone editors, direction calibration, fusion workflow, joint calibration, live/replay/heatmap controls and floorplan fields. Fusion has no separate frontend: its UI lives here. Native HA entity pickers and integration dialogs remain owned by HA.

Run `npm run lint`, `npm test`, `npm run build` (the HACS bundle is tracked). For a hardware-free visual check, serve this repository with `python -m http.server 5176 --bind 127.0.0.1` and open `/test/visual.html`. The page uses the built bundle and simulated states; device writes are disabled. Check light/dark, Chinese/English, 390 px and wide layouts, keyboard focus, all three calibration steps and Fusion editor mode. Native HA pickers/icons and real device writes still require HA acceptance; the fixture is not evidence of hardware compatibility.
