# R60ABD1 Lovelace Configuration Guide

[中文文档 (Chinese)](./README_CN.md)
This guide explains how to use the configuration file located in `tests/r60abd1.yaml` within Home Assistant.

## 1. Introduction

`r60abd1.yaml` contains the basic Lovelace card configuration for the MicRadar R60ABD1 mmWave radar using [mmwave-card](https://github.com/zomco/mmwave-card). It enables visual real-time tracking, geometric boundary calibration, and health-related data (breathing, heart rate, sleep, etc.) display integration for this radar in Home Assistant.

## 2. Prerequisites

Before applying this configuration, ensure that:
1. You have correctly installed `mmwave-card` (installation via HACS or manual frontend resource configuration is recommended).
2. Your R60ABD1 radar device is successfully integrated into Home Assistant via ESPHome or other methods.

## 3. How to Use

You can add this configuration to your Home Assistant dashboard using two main methods:

### Method A: Via UI Editor (Recommended)

1. Go to Home Assistant and open the dashboard where you want to add the card.
2. Click **"Edit Dashboard"** (the pencil icon) in the top right corner.
3. Click **"Add Card"** in the bottom right corner.
4. Scroll to the very bottom of the card list popup and select **"Manual"**.
5. Copy the contents from `tests/r60abd1.yaml` and paste them into the code editor.
6. Modify the entity IDs according to your actual setup (see "Modifying Entity IDs" below), and then click "Save".

### Method B: Via YAML Mode

If you manage Lovelace using YAML mode (`ui-lovelace.yaml`), copy the configuration directly into the cards array of the appropriate view:
```yaml
cards:
  - type: custom:mmwave-card
    radar_model: r60abd1
    presence_entity: binary_sensor.r60abd1_presence
    x_entity: sensor.r60abd1_x
    y_entity: sensor.r60abd1_y
    z_entity: sensor.r60abd1_z
    breath_entity: sensor.r60abd1_breath_value
    heart_entity: sensor.r60abd1_heart_rate
    sleep_entity: sensor.r60abd1_sleep_state
    room_w: 400
    room_d: 350
```

## 4. Modifying Entity IDs

All `entity_id`s in the configuration (such as `binary_sensor.r60abd1_presence`) are examples. If your device has different names in Home Assistant, please make sure to replace them with **your actual entity IDs**.

You can search and confirm the real entity IDs of your radar device on the **"Developer Tools" -> "States"** page in Home Assistant.

## 5. Configuration Options

- **`type`**: `custom:mmwave-card` (Fixed value, calls this custom card plugin)
- **`radar_model`**: `r60abd1` (Fixed value, specifies the radar model used)
- **`presence_entity`**: [Required] Binary sensor indicating whether someone is present.
- **`x_entity`**: [Required] Radar-measured local X-axis coordinate (Unit: cm).
- **`y_entity`**: [Required] Radar-measured local Y-axis coordinate (Unit: cm).
- **`z_entity`**: [Optional] Radar-measured local Z-axis coordinate (height). If provided, it can display the height above ground in the card UI.
- **`breath_entity`**: [Optional] Breathing rate (breaths/minute), included for automation and extended display.
- **`heart_entity`**: [Optional] Heart rate (bpm).
- **`sleep_entity`**: [Optional] Sleep state sensor.
- **`room_w` / `room_d`**: The physical width and depth of the room (Unit: cm), used for scaling during card rendering. This does not affect the calibration data itself. You can modify it according to your actual room size (e.g., `300` or `500`).
