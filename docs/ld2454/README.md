# LD2454 Lovelace Configuration Guide

[中文文档 (Chinese)](./README_CN.md)

This guide explains how to use the configuration file located in
`tests/ld2454.yaml` within Home Assistant.

## 1. Introduction

`ld2454.yaml` contains the basic Lovelace card configuration for the Hi-Link
LD2454 mmWave multi-target tracking radar using
[mmwave-card](https://github.com/zomco/mmwave-card). It enables visual
real-time tracking of up to 3 targets and geometric boundary calibration
display for this radar in Home Assistant.

The LD2454 is a 24 GHz 2-D tracking radar with a 120° field of view and a
6 m range. Because it reports position rather than range alone, it can take
part in [multi-radar fusion](https://github.com/zomco/mmwave-fusion).

## 2. Prerequisites

Before applying this configuration, ensure that:

1. You have correctly installed `mmwave-card` (installation via HACS or manual
   frontend resource configuration is recommended).
2. Your LD2454 radar device is successfully integrated into Home Assistant via
   ESPHome or other methods.

## 3. How to Use

### Method A: Via UI Editor (Recommended)

1. Open the dashboard where you want to add the card.
2. Click **"Edit Dashboard"** (the pencil icon) in the top right corner.
3. Click **"Add Card"** in the bottom right corner.
4. Search for **"MMWave Radar Card"** and select `ld2454` from the model
   drop-down. The editor renders one entity picker per field.

### Method B: Via YAML Mode

If you manage Lovelace using YAML mode (`ui-lovelace.yaml`), copy the
configuration directly into the cards array of the appropriate view:

```yaml
cards:
  - type: custom:mmwave-card
    radar_model: ld2454
    presence_entity: binary_sensor.ld2454_presence
    target_1_x_entity: sensor.ld2454_target_1_x
    target_1_y_entity: sensor.ld2454_target_1_y
    target_1_speed_entity: sensor.ld2454_target_1_speed
    target_2_x_entity: sensor.ld2454_target_2_x
    target_2_y_entity: sensor.ld2454_target_2_y
    target_2_speed_entity: sensor.ld2454_target_2_speed
    target_3_x_entity: sensor.ld2454_target_3_x
    target_3_y_entity: sensor.ld2454_target_3_y
    target_3_speed_entity: sensor.ld2454_target_3_speed
    polygon_entity: text.ld2454_polygon_config
    room_w: 400
    room_d: 350
```

## 4. Modifying Entity IDs

All `entity_id`s in the configuration (such as
`binary_sensor.ld2454_presence`) are examples. If your device has different
names in Home Assistant, replace them with **your actual entity IDs**.

You can look these up under **Developer Tools → States**.

Note the key format: `target_<n>_<axis>_entity`. A key the adapter does not
recognise is ignored silently, leaving the card blank with no error.

## 5. Configuration Options

- **`type`**: `custom:mmwave-card` (fixed value)
- **`radar_model`**: `ld2454` (fixed value)
- **`presence_entity`**: [Required] Binary sensor indicating whether any target
  is present.
- **`target_n_x_entity`**: [Required for target 1, optional for 2 and 3]
  Radar-measured local X coordinate for target n.
- **`target_n_y_entity`**: [Required for target 1, optional for 2 and 3]
  Radar-measured local Y coordinate for target n.
- **`target_n_speed_entity`**: [Optional] Target n's speed sensor (cm/s). Used
  to show motion state in the UI.
- **`frame_entity`**: [Optional] Atomic target frame — a single JSON entity
  carrying all targets from one protocol frame. Preferred over the per-axis
  entities, which update independently and can briefly show a phantom target
  on the diagonal. Exclude it from the HA Recorder.
- **`polygon_entity`**: [Optional] Text entity holding the boundary polygon.
  Required if you want to draw and save custom boundaries from the UI.
- **`room_w` / `room_d`**: Physical room width and depth (cm), used for canvas
  scaling only. Does not affect calibration accuracy.
