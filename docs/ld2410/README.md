# LD2410 Lovelace Configuration Guide

[中文文档 (Chinese)](./README_CN.md)

This guide explains how to use the configuration file located in
`tests/ld2410.yaml` within Home Assistant.

## 1. Introduction

`ld2410.yaml` contains the basic Lovelace card configuration for the Hi-Link
LD2410 24 GHz 1-D presence radar using
[mmwave-card](https://github.com/zomco/mmwave-card). It enables visual
real-time distance tracking, target state monitoring, and geometric boundary
calibration display for this radar in Home Assistant.

The LD2410 is **range-only**: it reports how far away a target is, but not in
which direction. The card therefore renders it as an arc rather than a point,
and the model cannot take part in
[multi-radar fusion](https://github.com/zomco/mmwave-fusion), which needs
direction.

> **Wiring note:** LD2410 is the one supported model that does not use
> GPIO21/GPIO20. Its ESPHome config uses `GPIO4` (TX) and `GPIO5` (RX).

## 2. Prerequisites

Before applying this configuration, ensure that:

1. You have correctly installed `mmwave-card` (installation via HACS or manual
   frontend resource configuration is recommended).
2. Your LD2410 radar device is successfully integrated into Home Assistant via
   ESPHome or other methods.

## 3. How to Use

### Method A: Via UI Editor (Recommended)

1. Open the dashboard where you want to add the card.
2. Click **"Edit Dashboard"** (the pencil icon) in the top right corner.
3. Click **"Add Card"** in the bottom right corner.
4. Search for **"MMWave Radar Card"** and select `ld2410` from the model
   drop-down. The editor renders one entity picker per field.

### Method B: Via YAML Mode

If you manage Lovelace using YAML mode (`ui-lovelace.yaml`), copy the
configuration directly into the cards array of the appropriate view:

```yaml
cards:
  - type: custom:mmwave-card
    radar_model: ld2410
    presence_entity: binary_sensor.ld2410_presence
    distance_entity: sensor.ld2410_detection_distance
    target_state_entity: sensor.ld2410_target_state
    max_distance_entity: sensor.ld2410_max_distance
    room_w: 400
    room_d: 350
```

## 4. Modifying Entity IDs

All `entity_id`s in the configuration (such as
`binary_sensor.ld2410_presence`) are examples. If your device has different
names in Home Assistant, replace them with **your actual entity IDs**.

You can look these up under **Developer Tools → States**.

## 5. Configuration Options

- **`type`**: `custom:mmwave-card` (fixed value)
- **`radar_model`**: `ld2410` (fixed value)
- **`presence_entity`**: [Required] Binary sensor indicating whether a target
  is present.
- **`distance_entity`**: [Required] Detected target distance (cm).
- **`target_state_entity`**: [Optional] Target state — typically none / moving
  / stationary / both. Used to distinguish motion from micro-motion presence.
- **`max_distance_entity`**: [Optional] Configured maximum detection distance,
  used to scale the rendered arc.
- **`room_w` / `room_d`**: Physical room width and depth (cm), used for canvas
  scaling only. Does not affect calibration accuracy.

## 6. Calibration

A range-only radar still benefits from calibration: `radar_x`, `radar_y`,
`radar_z` and `yaw` place the arc correctly in the room, and the boundary
becomes a `distance_min` / `distance_max` gate rather than a polygon test.

Because there is no direction information, the two-point yaw calibration in
Tab ② cannot be used. Enter the heading by hand in Tab ①, measured as the angle
from room **+Y**, clockwise positive.
