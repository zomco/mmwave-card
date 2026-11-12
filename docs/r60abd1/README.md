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

When the configured presence entity is missing, `unavailable`, or `unknown`, the card shows **Data unavailable**. Check the entity binding and device connection. Only a valid `off` state means no presence; valid `on` without coordinates remains present but unlocated. The display recovers automatically when valid entity states return.

You can add this configuration to your Home Assistant dashboard using two main methods:

### Method A: Via the Card Editor (Recommended)

1. Add a card to your dashboard, choose **MMWave Radar Card**, and set the model to `r60abd1`.
2. Pick your R60ABD1 device in the **Connect radar device** dropdown. Matching only looks at that device's entities; other devices' entities are never mixed in.
3. Read the match feedback: "Matched N configuration fields" means N fields were bound. If required fields (presence, x, y) are not all bound, the missing keys are listed — open **Advanced** and pick them manually.
4. When several candidates match one field (for example two presence entities), nothing is silently selected; the editor asks you to choose under **Advanced**.
5. If the editor says bound entities report "unavailable/unknown", the entities exist in the registry and the device is offline or not yet connected — waiting is reasonable. If they never appear, verify the entities still exist. If the editor says a bound entity is not in the selected device's registry, the binding is stale: re-pick the entity or the device.
6. If the entity registry is temporarily unavailable, your configuration stays unchanged and you can fill entities manually under **Advanced**.

7. If the only candidate entity is disabled in Home Assistant, the editor will not auto-bind it; it asks you to enable it in HA first or pick another entity manually. The card never enables or renames registry entities in the background.

When binding, x/y must be the radar's **raw local coordinates** (e.g. `sensor.xxx_x`), not `room_x`/`room_y`, or the coordinates get transformed twice.

### Method B: Via YAML Mode

If you manage Lovelace using YAML mode (`ui-lovelace.yaml`), copy the configuration directly into the cards array of the appropriate view:
```yaml
cards:
  - type: custom:mmwave-card
    radar_model: r60abd1
    presence_entity: binary_sensor.YOUR_DEVICE_presence
    x_entity: sensor.YOUR_DEVICE_x
    y_entity: sensor.YOUR_DEVICE_y
    z_entity: sensor.YOUR_DEVICE_z
    breath_entity: sensor.YOUR_DEVICE_breath_rate
    heart_entity: sensor.YOUR_DEVICE_heart_rate
    sleep_entity: sensor.YOUR_DEVICE_sleep_state
    room_w: 400
    room_d: 350
```

## 4. Modifying Entity IDs

All `entity_id`s in the configuration (such as `binary_sensor.YOUR_DEVICE_presence`) are examples. If your device has different names in Home Assistant, please make sure to replace them with **your actual entity IDs**.

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
