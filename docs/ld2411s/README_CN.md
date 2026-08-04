# LD2411S 1-D 毫米波雷达 (前端卡片)

前端卡片为 LD2411S 一维测距雷达提供可视化展示。
由于它是一维雷达，因此目标被渲染为匹配传感器 45 度视场角的移动圆弧，而不是点。

## Lovelace 配置示例

```yaml
type: custom:mmwave-card
radar_model: ld2411s
name: "LD2411S 测距雷达"
room_w: 400
room_d: 600
presence_entity: binary_sensor.ld2411s_test_presence
distance_entity: sensor.ld2411s_test_distance
```
