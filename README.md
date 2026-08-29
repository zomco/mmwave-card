<div align="center">
  <img src="./assets/mmwave_logo.svg" alt="MMWave Logo" width="200"/>
  <h1>MMWave Radar HA Card</h1>
</div>

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/zomco/mmwave-card.svg)](https://github.com/zomco/mmwave-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[中文文档](./README_CN.md)

Calibration and live visualization card for millimetre-wave radars in
[Home Assistant](https://www.home-assistant.io/). Supports 16 radar models.

## What this is

A top-down map of your room showing where people actually are, plus the tools
to make that map correct — you tell the card where the radar is mounted and
which way it points, draw the room boundary, and it turns raw radar output into
real room coordinates.

This card is also the **only user interface** for the project. Calibration
happens here; the ESPHome firmware and the fusion integration ship no UI of
their own.

<img src="./assets/screenshot-live.gif" alt="Live view panel" width="600">

_(Tab ① — Geometry & Boundary | Tab ② — Yaw Calibration | Tab ③ — Live View)_

---

## Quick start

### 1. Install via HACS

[![Open your Home Assistant instance and open a repository inside HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=zomco&repository=mmwave-card&category=plugin)

Or: **HACS → Frontend → ⋮ → Custom repositories** → add this repo URL →
category **Lovelace**. Restart Home Assistant afterwards.

### 2. Add it to a dashboard

Edit any dashboard, **Add Card**, search for **MMWave Radar Card**. Pick your
model from the drop-down and the editor shows one picker per entity that model
needs, filtered to plausible candidates. **No YAML required.**

### 3. Calibrate

Work through the three tabs in order — this is the step that makes the
coordinates mean anything, and the step people skip:

| Tab                   | What you do                                                                | Why                                                                                    |
| --------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| ① Geometry & Boundary | Enter where the radar is (cm from a room corner) and drag the room outline | Targets outside the outline stop driving presence — this is the through-wall ghost fix |
| ② Yaw Calibration     | Stand at two known points a couple of metres apart                         | Solves which way the radar faces                                                       |
| ③ Live View           | Walk around and watch the dot                                              | Verifies the other two                                                                 |

A mirrored dot means yaw is 180° out; a dot moving at right angles to you means
90° out. Redo Tab ② rather than nudging the number by hand.

> **Don't have the firmware flashed yet?** The full journey — wiring, browser
> flashing, then this card — is in
> [Getting Started](https://github.com/zomco/mmwave-component/blob/main/GETTING-STARTED.md).

---

## Supported models

Sixteen adapters are registered. Range-only models report distance without
direction, so they render as an arc rather than a point and cannot take part in
multi-radar fusion.

| Model                                           | Freq   | Targets | Range | FOV  | Z axis | Breathing | Heart rate | Sleep | Fusion |
| ----------------------------------------------- | ------ | ------- | ----- | ---- | ------ | --------- | ---------- | ----- | ------ |
| [MicRadar R60ABD1](https://www.micradar.cn/)    | 60 GHz | 1       | 2.5 m | 40°  | ✅     | ✅        | ✅         | ✅    | ✅     |
| [Hi-Link LD2450](https://www.hlktech.net/)      | 24 GHz | 3       | 6 m   | 120° | ❌     | ❌        | ❌         | ❌    | ✅     |
| Hi-Link LD2451                                  | 24 GHz | 3       | 100 m | 30°  | ❌     | ❌        | ❌         | ❌    | ✅     |
| Hi-Link LD2452                                  | 24 GHz | 3       | 6 m   | 120° | ❌     | ❌        | ❌         | ❌    | ✅     |
| Hi-Link LD2453                                  | 24 GHz | 3       | 6 m   | 80°  | ❌     | ❌        | ❌         | ❌    | ✅     |
| Hi-Link LD2454                                  | 24 GHz | 3       | 6 m   | 120° | ❌     | ❌        | ❌         | ❌    | ✅     |
| Hi-Link LD6002                                  | 60 GHz | 1       | 6 m   | 120° | ❌     | ✅        | ✅         | ❌    | ❌     |
| Hi-Link LD2410                                  | 24 GHz | 1       | 8 m   | 120° | ❌     | ❌        | ❌         | ❌    | ❌     |
| Hi-Link LD2410B                                 | 24 GHz | 1       | 6 m   | 120° | ❌     | ❌        | ❌         | ❌    | ❌     |
| Hi-Link LD2410C                                 | 24 GHz | 1       | 8 m   | 120° | ❌     | ❌        | ❌         | ❌    | ❌     |
| Hi-Link LD2411                                  | 24 GHz | 1       | 6 m   | 40°  | ❌     | ❌        | ❌         | ❌    | ❌     |
| Hi-Link LD2411S                                 | 24 GHz | 1       | 6 m   | 45°  | ❌     | ❌        | ❌         | ❌    | ❌     |
| Hi-Link LD2412                                  | 24 GHz | 1       | 9 m   | 150° | ❌     | ❌        | ❌         | ❌    | ❌     |
| Hi-Link LD2420                                  | 24 GHz | 1       | 8 m   | 120° | ❌     | ❌        | ❌         | ❌    | ❌     |
| Hi-Link LD2450A                                 | 24 GHz | 1       | 2 m   | 120° | ❌     | ❌        | ❌         | ❌    | ❌     |
| [Ai-Thinker RD03E](https://www.ai-thinker.com/) | 24 GHz | 1       | 6 m   | 40°  | ❌     | ❌        | ❌         | ❌    | ❌     |

Per-model YAML reference lives in `docs/<model>/README.md`.

Adding a model takes one new file plus one registry line — see
[Adding a New Model](./DIY.md#adding-a-new-model) in the DIY guide.

---

## Multi-radar fusion (optional, experimental)

**Single-radar use needs nothing beyond this card.**

Covering one space with several radars, and wanting persisted trajectories,
zone events and camera recording, additionally needs the
**[mmwave-fusion](https://github.com/zomco/mmwave-fusion)** integration — a
separate HACS entry under the **integration** category.

Without it the card still renders a fused view, but fusion happens in the
browser and nothing is stored. The card says so explicitly rather than
pretending everything is fine.

The two are released independently, so the integration stamps `api_version` on
every push and the card reports a backend that is too old instead of
half-working.

The visual editor keeps radar binding, exact installation values, and the
shared 3-D placement scene in one setup step organized as one tab per radar.
Only the active radar's form and synchronized 3-D model are shown; adding a
radar creates and selects a new tab. Joint direction calibration then
guides the tester through fixed areas on the floor plan: gray areas are still
uncollected, colored segments show which radars captured a stable sample, and
the blue outline recommends the next well-spaced position. Calibration can be
applied only after every radar has at least three reference points spanning
120 cm with a residual no greater than 40 cm.
On phone-sized screens the calibration panel also offers a focused mobile mode:
the current region guide stays at the top, the large capture action stays above
the bottom safe area, live progress is announced in place, and captured-point
diagnostics remain collapsed until they are needed. This keeps the walking and
capture loop usable with one hand without losing the full diagnostic results.
After at least three positions have been captured, the results compare each
radar's current X/Y/yaw with the fitted reference and a suggested manual delta.
Rejected fits are marked low-confidence with a specific reason and are never
written automatically, so installation values can be checked before recapturing.

Fusion status, replay, heatmap, coverage, and online-count controls are shown
in a toolbar outside the floor-plan canvas so they cannot cover edge-mounted
radar markers.

---

## Documentation map

| If you are                             | Read                                                                                      |
| -------------------------------------- | ----------------------------------------------------------------------------------------- |
| Setting up for the first time          | [Getting Started](https://github.com/zomco/mmwave-component/blob/main/GETTING-STARTED.md) |
| Configuring the card in YAML           | [DIY.md](./DIY.md)                                                                        |
| Looking up one model's entities        | `docs/<model>/README.md`                                                                  |
| Adding a model or building from source | [DIY.md](./DIY.md#adding-a-new-model)                                                     |
| An AI agent working in this repo       | [AGENTS.md](./AGENTS.md)                                                                  |

## Related repositories

| Repository                                                    | What it is       | Needed?                                           |
| ------------------------------------------------------------- | ---------------- | ------------------------------------------------- |
| [mmwave-component](https://github.com/zomco/mmwave-component) | ESPHome firmware | Yes — the device side.                            |
| **mmwave-card** (this)                                        | Lovelace card    | Yes — the only UI, and where calibration happens. |
| [mmwave-fusion](https://github.com/zomco/mmwave-fusion)       | HA integration   | Multi-radar fusion only. Experimental.            |

---

## License

MIT © zomco
