# LD6002 Lovelace Configuration Guide

[中文文档 (Chinese)](./README_CN.md)

This guide explains how to use the configuration file located in `tests/ld6002.yaml` within Home Assistant.

## 1. Introduction

`ld6002.yaml` contains the basic Lovelace card configuration for the Hi-Link LD6002 60 GHz biological sensing radar using [mmwave-card](https://github.com/zomco/mmwave-card). LD6002 is a high-precision radar that not only provides basic distance, respiration, and heart rate detection but also natively incorporates complete 3D/2D coordinate transformation within ESPHome.

## 2. Core Features & Adapter Modes

In `mmwave-card`, we have implemented a **hybrid reading scheme** for the LD6002. You can choose one of the following two modes depending on your needs:

### Mode A: 2D/3D Coordinate Tracking Mode (Recommended)
If you want to precisely visualize the target's X and Y coordinates within the room on the card, you can map the card's `x_entity` and `y_entity` to the `room_x` and `room_y` entities provided by ESPHome.
**[⚠️ IMPORTANT WARNING]**: If you use this mode and intend to adjust the rotation (Yaw) from the card interface, **you must ensure that `yaw`, `pitch`, `roll`, `radar_x`, and `radar_y` in your ESPHome firmware are all set to `0`**. Otherwise, the data will be "double-calibrated", leading to position drift.

### Mode B: 1D Distance Mode
If you only configure `distance_entity` (pointing to the ESPHome `distance` entity), the card will automatically fall back to 1D radar mode, mapping the detected distance straight ahead. In this mode, you don't need to worry about ESPHome's calibration settings; simply adjust the Yaw directly on the card.

## 3. Prerequisites

Before applying this configuration, ensure that:
1. You have correctly installed `mmwave-card` (installation via HACS or manual frontend resource configuration is recommended).
2. Your LD6002 radar device is successfully integrated into Home Assistant via ESPHome or other methods.

## 4. How to Use

You can add this configuration to your Home Assistant dashboard using two main methods:

### Method A: Via UI Editor (Recommended)

1. Go to Home Assistant and open the dashboard where you want to add the card.
2. Click **"Edit Dashboard"** (the pencil icon) in the top right corner.
3. Click **"Add Card"** in the bottom right corner.
4. Scroll to the very bottom of the card list popup and select **"Manual"**.
5. Copy the contents from `tests/ld6002.yaml` and paste them into the code editor.
6. Modify the entity IDs according to your actual setup (see "Modifying Entity IDs" below), and then click "Save".

### Method B: Via YAML Mode

If you manage Lovelace using YAML mode (`ui-lovelace.yaml`), copy the configuration directly into the cards array of the appropriate view:
```yaml
cards:
  - type: custom:mmwave-card
    radar_model: ld6002
    presence_entity: binary_sensor.ld6002_presence
    x_entity: sensor.ld6002_room_x
    y_entity: sensor.ld6002_room_y
    # If using Mode B, remove the x/y_entity lines above and use the following distance_entity:
    # distance_entity: sensor.ld6002_distance
    breath_entity: sensor.ld6002_respiration_rate
    heart_entity: sensor.ld6002_heart_rate
    room_w: 400
    room_d: 350
```

## 5. Modifying Entity IDs

All `entity_id`s in the configuration (such as `binary_sensor.ld6002_presence`) are examples. If your device has different names in Home Assistant, please make sure to replace them with **your actual entity IDs**.

## 6. Configuration Options

- **`type`**: `custom:mmwave-card` (Fixed value)
- **`radar_model`**: `ld6002` (Fixed value)
- **`presence_entity`**: [Required] Binary sensor indicating target presence.
- **`x_entity` / `y_entity`**: [Either this OR distance] X and Y coordinate entities, typically mapped to ESPHome's `room_x` and `room_y`.
- **`distance_entity`**: [Either this OR x/y] Straight-line detection distance entity. Used as a fallback if x/y entities are not provided.
- **`breath_entity` / `heart_entity`**: [Optional] Entities for respiration and heart rate.
- **`room_w` / `room_d`**: Physical width and depth of the room (Unit: cm), used for scaling during card rendering.
