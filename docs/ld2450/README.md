# LD2450 Lovelace Configuration Guide

[中文文档 (Chinese)](./README_CN.md)

This guide explains how to use the configuration file located in `tests/ld2450.yaml` within Home Assistant.

## 1. Introduction

`ld2450.yaml` contains the basic Lovelace card configuration for the Hi-Link LD2450 mmWave multi-target tracking radar using [mmwave-card](https://github.com/zomco/mmwave-card). It enables visual real-time tracking of up to 3 targets and geometric boundary calibration display for this radar in Home Assistant.

## 2. Prerequisites

Before applying this configuration, ensure that:
1. You have correctly installed `mmwave-card` (installation via HACS or manual frontend resource configuration is recommended).
2. Your LD2450 radar device is successfully integrated into Home Assistant via ESPHome or other methods.

## 3. How to Use

You can add this configuration to your Home Assistant dashboard using two main methods:

### Method A: Via UI Editor (Recommended)

1. Go to Home Assistant and open the dashboard where you want to add the card.
2. Click **"Edit Dashboard"** (the pencil icon) in the top right corner.
3. Click **"Add Card"** in the bottom right corner.
4. Scroll to the very bottom of the card list popup and select **"Manual"**.
5. Copy the contents from `tests/ld2450.yaml` and paste them into the code editor.
6. Modify the entity IDs according to your actual setup (see "Modifying Entity IDs" below), and then click "Save".

### Method B: Via YAML Mode

If you manage Lovelace using YAML mode (`ui-lovelace.yaml`), copy the configuration directly into the cards array of the appropriate view:
```yaml
cards:
  - type: custom:mmwave-card
    radar_model: ld2450
    presence_entity: binary_sensor.ld2450_presence
    target_1_x_entity: sensor.ld2450_target_1_x
    target_1_y_entity: sensor.ld2450_target_1_y
    target_1_speed_entity: sensor.ld2450_target_1_speed
    target_2_x_entity: sensor.ld2450_target_2_x
    target_2_y_entity: sensor.ld2450_target_2_y
    target_2_speed_entity: sensor.ld2450_target_2_speed
    target_3_x_entity: sensor.ld2450_target_3_x
    target_3_y_entity: sensor.ld2450_target_3_y
    target_3_speed_entity: sensor.ld2450_target_3_speed
    polygon_entity: text.ld2450_polygon_config
    room_w: 400
    room_d: 350
```

## 4. Modifying Entity IDs

All `entity_id`s in the configuration (such as `binary_sensor.ld2450_presence`) are examples. If your device has different names in Home Assistant, please make sure to replace them with **your actual entity IDs**.

You can search and confirm the real entity IDs of your radar device on the **"Developer Tools" -> "States"** page in Home Assistant.

## 5. Configuration Options

- **`type`**: `custom:mmwave-card` (Fixed value, calls this custom card plugin)
- **`radar_model`**: `ld2450` (Fixed value, specifies the radar model used)
- **`presence_entity`**: [Required] Binary sensor indicating whether any target is present.
- **`target_n_x_entity`**: [Required] Radar-measured local X-axis coordinate for target n. Please map for targets 1, 2, and 3.
- **`target_n_y_entity`**: [Required] Radar-measured local Y-axis coordinate for target n. Please map for targets 1, 2, and 3.
- **`target_n_speed_entity`**: [Optional] Target n's speed sensor (Unit: cm/s). If provided, it assists in displaying the target's motion state in the UI.
- **`polygon_entity`**: [Optional] Text entity representing the boundary polygon configuration. Required if you want to draw and save custom boundary polygons from the UI.
- **`room_w` / `room_d`**: The physical width and depth of the room (Unit: cm), used for scaling during card rendering. This does not affect the calibration data itself. You can modify it according to your actual room size (e.g., `300` or `500`).
