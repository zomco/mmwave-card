# LD2411S 1-D mmWave Radar (Frontend Card)

This frontend card provides visualization for the LD2411S 1-D ranging radar.
Because it is a 1-D radar, targets are visualized as circular arcs matching the 45-degree field of view of the sensor, rather than point dots.

## Lovelace Configuration Example

```yaml
type: custom:mmwave-card
radar_model: ld2411s
name: "LD2411S Radar"
room_w: 400
room_d: 600
presence_entity: binary_sensor.ld2411s_test_presence
distance_entity: sensor.ld2411s_test_distance
```
