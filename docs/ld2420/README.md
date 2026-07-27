# LD2420 Lovelace Configuration Guide

[中文文档 (Chinese)](./README_CN.md)

This guide explains how to use the configuration file located in `tests/ld2420.yaml` within Home Assistant.

## 1. Introduction

`ld2420.yaml` contains the basic Lovelace card configuration for the Hi-Link LD2420 24 GHz 1-D ranging radar using [mmwave-card](https://github.com/zomco/mmwave-card). It enables visual real-time distance tracking, presence monitoring, and geometric boundary calibration display for this radar in Home Assistant.

## 2. Prerequisites

Before applying this configuration, ensure that:
1. You have correctly installed `mmwave-card` (installation via HACS or manual frontend resource configuration is recommended).
2. Your LD2420 radar device is successfully integrated into Home Assistant via ESPHome or other methods.

## 3. How to Use

You can add this configuration to your Home Assistant dashboard using two main methods:

### Method A: Via UI Editor (Recommended)

1. Go to Home Assistant and open the dashboard where you want to add the card.
2. Click **"Edit Dashboard"** (the pencil icon) in the top right corner.
3. Click **"Add Card"** in the bottom right corner.
4. Scroll to the very bottom of the card list popup and select **"Manual"** or select **"MMWave Radar HA Card"**.
5. Copy the contents from `tests/ld2420.yaml` and paste them into the code editor.
6. Modify the entity IDs according to your actual setup (see "Modifying Entity IDs" below), and then click "Save".

### Method B: Via YAML Mode

If you manage Lovelace using YAML mode (`ui-lovelace.yaml`), copy the configuration directly into the cards array of the appropriate view:
```yaml
cards:
  - type: custom:mmwave-card
    radar_model: ld2420
    presence_entity: binary_sensor.ld2420_presence
    distance_entity: sensor.ld2420_distance
    room_w: 400
    room_d: 350
```

## 4. Modifying Entity IDs

All `entity_id`s in the configuration (such as `binary_sensor.ld2420_presence`) are examples. If your device has different names in Home Assistant, please make sure to replace them with **your actual entity IDs**.

You can search and confirm the real entity IDs of your radar device on the **"Developer Tools" -> "States"** page in Home Assistant.

## 5. Configuration Options

- **`type`**: `custom:mmwave-card` (Fixed value, calls this custom card plugin)
- **`radar_model`**: `ld2420` (Fixed value, specifies the radar model used)
- **`presence_entity`**: [Required] Binary sensor indicating whether any target is present.
- **`distance_entity`**: [Required] Radar-measured line-of-sight distance sensor (Unit: cm). Because the LD2420 is a 1-D ranging radar, the card automatically maps this distance straight ahead along the radar boresight. You can use the card's `Yaw` slider or 2-point calibration to adjust the radar's physical orientation in the room.
- **`room_w` / `room_d`**: The physical width and depth of the room (Unit: cm), used for scaling during card rendering.
