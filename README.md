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

For range-only radars, target trails, range arcs and metre labels share the radar boresight and the room map projection. When the preview is stretched, range circles appear elliptical so they still match room coordinates.

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
| ② Yaw Calibration     | Pause in at least three guided areas, roughly near each center                         | Solves which way the radar faces                                                       |
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

Optional AI stays off until you turn it on in Home Assistant. Enable the
**MMWave Fusion** LLM API on a conversation agent to ask Assist about occupancy
and events (tracks stay anonymous). If an AI Task entity is set on the
integration, traverse clips get a person / pet / false-positive label that the
event list shows. Yaw calibration and fusion warnings spell out the usual
90°/180° mistakes; they do not need a model.

The visual editor keeps radar binding, exact installation values, and the
shared 3-D placement scene in one setup step organized as one tab per radar.
Only the active radar's form and synchronized 3-D model are shown; adding a
radar creates and selects a new tab. Joint direction calibration then
uses the same green, undistorted floor plan as single-radar calibration. Pause in
at least three widely separated areas and capture three seconds of readings at each.
Positions are approximate (about a small step from the center); tap empty floor space
to relocate an uncaptured area when the recommendation is inaccessible. Keep one
person visible; ambiguous multi-target frames and unstable captures are skipped.
Each radar needs three accepted stations spanning 120 cm, RMS residual at most
60 cm and maximum residual at most 90 cm. A weighted fit includes a 30 cm station
uncertainty and preserves pitch/roll. With four or more stations, gross outliers
can be discarded only with at least three stations and 75% consensus.
Existing parameters are retained when their RMS residual is within 40 cm, maximum
error within 60 cm, and a new fit improves RMS by less than 15 cm. This avoids
chasing measurement noise; it does not claim a unique physical optimum.
Accepted radars can proceed to verification independently; unfinished radars keep
their settings and remain identified. Good readings are kept while filling missing
radars at a station; remove a station in details to recapture it completely.
Results remain a draft until Apply and sync succeeds. Walk to other positions in
Live test to check alignment before saving; device sync failures are shown separately.
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

The radar preview outlines the configured polygon with a dashed green line and shades the area outside it. This shows the software boundary filter; targets outside remain visible for diagnosis. With fewer than three vertices, no polygon filter overlay is shown.

Range-only radars use software distance limits (cm, 0 disables each bound) instead of room polygons. Sync writes the device Zone Min/Max Distance entities. The preview shows radial limits and the reported native maximum when available; unknown native minima or per-gate exclusions are not treated as verified coverage. Native detection thresholds remain untouched. No automatic boot-time reset of user calibration is performed.

Compact range previews show the software interval directly: green is the retained sector and grey radial bands are excluded. Detailed range diagnostics remain in settings, not below the preview.

Live previews use equal horizontal and vertical scale even when card height is capped. Unused space remains visible instead of stretching the radar fan; targets, trails, and boundaries share the same mapping.

### Floor plan background

In the card editor, expand **Floor plan background** and enter an image URL such as
`/local/floorplans/room.png`. On HA, put the image at `/config/www/floorplans/room.png`
(in this workspace: `ha-config/www/floorplans/room.png`). This version uses image URLs;
it does not upload files. PNG, JPG and WebP are supported. Prefer a flat top-down plan.

Unlock placement to drag the image, rotate it, or adjust offsets. **Calibrate scale**
lets you select both ends of a known wall and enter its actual length in centimetres.
**Set origin** maps a selected image point to the room's top-left coordinate origin.
Then lock placement and save the card in HA. Visibility and opacity remain adjustable.

The same background is used in single-radar and fusion views, direction calibration,
and the installation floor. Image aspect ratio is preserved; room coordinates, not
screen pixels, anchor it across mobile and desktop layouts. Settings are saved in the
Lovelace card, not radar firmware. A fusion card shares one image across its radars.
The image does not change detection filters: draw the room polygon separately.
Image loading failures retain the usual grid and radar view.

```yaml
floorplan:
  url: /local/floorplans/room.png
  width_cm: 600
  offset_x_cm: 0
  offset_y_cm: 0
  rotation: 0 # clockwise degrees, around the image's top-left corner
  opacity: 0.45
  visible: true
  locked: true
```

`width_cm` is the physical width represented by the entire image, including margins;
height follows the image aspect ratio. Offsets place the image's top-left corner in
room coordinates. Omitted width defaults to room width. Copy `floorplan` to other
cards if they should share the same placement.

Upload a PNG, JPEG or GIF (under 9 MB) directly in **Floor plan background**. Home Assistant stores the image; save the card to keep its URL. No fusion integration is required. In boundary or zone editing, **Snap to walls** helps each tap land on a nearby image edge. Tap wall corners in order, undo mistakes, and review before saving. Image edges may include furniture or text; turn snapping off for manual placement. Cross-origin backgrounds remain viewable but may require uploading for snapping.

Direction calibration places the entire standing circle inside configured room boundaries, with clearance from walls. Manual relocation follows the same rule. Multi-radar guidance uses the union of configured radar boundaries; event zones are not room boundaries. With no polygon, room dimensions apply. Furniture and obstacles absent from the boundary are not detected automatically; move a station to a clear position. Insufficient space is reported instead of adding points outside the boundary.

The radar preview shows compact scene metrics in its bottom-right corner: gestures for LD2450A (`gesture_entity`), and breathing/heart rates for supported models such as LD6002 and R60ABD1 (`breath_entity`, `heart_entity`). Bind these optional sensors in the card editor. Missing, unavailable or non-positive rate readings display “—”.
