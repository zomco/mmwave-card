<div align="center">
  <img src="./assets/mmwave_logo.svg" alt="MMWave Logo" width="200"/>
  <h1>MMWave Radar HA Card</h1>
</div>

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/zomco/mmwave-card.svg)](https://github.com/zomco/mmwave-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[中文文档](./README_CN.md)

The only user interface for these radars in Home Assistant. It shows a top-down room map, and it is where you say where the radar is mounted, which way it points, and where the room ends. Firmware and the fusion integration ship no UI of their own.

<img src="./assets/screenshot-live.gif" alt="Live view panel" width="600">

## Quick start

Firmware not flashed yet? Start at [Getting Started](https://github.com/zomco/mmwave-component/blob/main/GETTING-STARTED.md). If the device is already in Home Assistant:

1. Install via HACS as a **Lovelace** plugin, then restart Home Assistant.

   [![Open your Home Assistant instance and open a repository inside HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=zomco&repository=mmwave-card&category=plugin)

2. Edit a dashboard, **Add Card**, search **MMWave Radar Card**. Pick the model. The editor lists the entities that model needs. No YAML required.
3. Calibrate in order. This is the step that makes the coordinates mean anything.

| Tab | Do this | Why |
| --- | --- | --- |
| ① Geometry & boundary | Enter the radar's position and draw the room | Targets outside the outline stop driving presence |
| ② Yaw | Pause in at least three guided areas | Solves which way the radar faces |
| ③ Live view | Walk and watch the dot | Checks the other two |

A mirrored dot is yaw 180° out. A dot moving at right angles to you is 90° out. Redo tab ②. Do not nudge the number by hand. 1D radars hide direction calibration and use a min/max distance instead of a room polygon.

Optional floor plan: in the editor, set an image URL such as `/local/floorplans/room.png` (file at `/config/www/floorplans/room.png`), or upload a PNG, JPEG, or GIF under 9 MB. `width_cm` is the physical width of the whole image. The image does not change the detection filter.

## Documentation map

| If you want | Read |
| --- | --- |
| Wiring, flash, then this card | [Getting Started](https://github.com/zomco/mmwave-component/blob/main/GETTING-STARTED.md) |
| YAML, calibration, adding a model, building from source | [DIY.md](./DIY.md) |
| One model's card config | `docs/<model>/README.md` |
| Stored tracks, zone events, clips | [mmwave-fusion](https://github.com/zomco/mmwave-fusion) — 2D radars only |
| You are an AI agent | [AGENTS.md](./AGENTS.md) |

## Radars

Two classes. **1D radars report distance only.** They draw as an arc, not a point, and cannot use [mmwave-fusion](https://github.com/zomco/mmwave-fusion). The card still shows presence and distance.

**2D radars report a position on the floor.** They can use every feature, including fusion. R60ABD1 also reports height; it is listed here because it can be fused.

One 2D radar is enough for a room map. Several 2D radars can be fused in the browser with nothing stored. Stored trajectories, zone events, and camera clips need the fusion integration.

Figures and progress match [mmwave-component](https://github.com/zomco/mmwave-component/blob/main/README.md), which is the source of truth. `—` means the manual does not state it. A cell marked *accuracy* is not a range-gate width. LD2410 at 0.20 m resolution reaches 1.6 m. LD2451 reports whole metres. LD2450 and LD2454 publish resolution in each target frame. LD2454's performance table says 8 m; the install section says 6 m tracking.

| Status | Meaning |
| --- | --- |
| Developing | On-hardware firmware tests are in progress. |
| Testing | Home Assistant integration tests are in progress. |
| Completed | Integration checked and stable. |

### 1D radars

| Model | Detection distance | Distance resolution | Progress |
| --- | --- | --- | --- |
| LD2410 | 6 m | 0.75 m / 0.20 m | Developing |
| LD2410B | 6 m | 0.75 m (protocol can also select 0.20 m) | Testing |
| LD2410C | 6 m | 0.75 m (protocol can also select 0.20 m) | Testing |
| LD2411 | 2 m (gesture 1 m) | — | Developing |
| LD2411S | 6 m (micro-motion 3.5 m) | ±5 cm / ±5% (accuracy) | Developing |
| LD2412 | 9 m | 0.75 m | Developing |
| LD2420 | 8 m (micro-motion 6 m) | 0.70 m | Developing |
| LD2450A | 2 m | 0.2 m (sensing accuracy) | Developing |
| LD6002 | 1.5 m (breath / heart) | — | Developing |
| RD-03E | 6 m (micro-motion 3.5 m) | ±5 cm / ±5% (accuracy) | Developing |

### 2D radars

| Model | Detection distance | Angle | Distance resolution | Progress |
| --- | --- | --- | --- | --- |
| LD2450 | 6 m | azimuth ±60°, elevation ±35° | per frame | Developing |
| LD2451 | 100 m | horizontal ±15°, vertical ±7° | 1 m | Testing |
| LD2452 | 6 m | azimuth ±60°, elevation ±30° | 0.72 m | Testing |
| LD2453 | 6 m | azimuth ±40°, elevation ±30° | 0.72 m | Developing |
| LD2454 | 8 m | azimuth ±60°, elevation ±30° | per frame | Testing |
| R60ABD1 | 2.5 m (breath / heart 1.5 m) | ±20° | — | Completed |

## Related repositories

| Repository | What it is | Needed? |
| --- | --- | --- |
| [mmwave-component](https://github.com/zomco/mmwave-component) | ESPHome firmware | Yes |
| **mmwave-card** (this) | Lovelace card | Yes — the only UI |
| [mmwave-fusion](https://github.com/zomco/mmwave-fusion) | Home Assistant integration | Only for stored fusion. 2D radars only. Experimental. |

## License

MIT © zomco
