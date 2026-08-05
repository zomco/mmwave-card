# LD2412 Integration

The `mmwave-card` fully supports the **HLK-LD2412** 24GHz radar.

## Overview
- **Type**: 1D Ranging Radar (Distance only)
- **Max Range**: 9m
- **Field of View (FOV)**: 150° (±75° horizontal coverage)
- **Features**: Presence detection, Moving/Stationary distance, and 14 range gates.

## Lovelace Configuration

To add the LD2412 radar to your dashboard, configure the card as follows:

```yaml
type: custom:mmwave-card
radar_model: ld2412
presence_entity: binary_sensor.radar_presence
distance_entity: sensor.radar_moving_distance
```

*(You can optionally provide the `max_distance_entity` if you expose it in ESPHome, or the card will assume 9m maximum).*
