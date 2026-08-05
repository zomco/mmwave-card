# LD2412 支持文档

`mmwave-card` 完美支持 **HLK-LD2412** 24GHz 雷达传感器的图形化显示。

## 概述
- **雷达类型**: 1D 测距雷达（仅输出距离信息）
- **最大探测距离**: 9米
- **视场角 (FOV)**: 150° (水平覆盖范围 ±75°)
- **核心特性**: 存在检测、运动/静止距离探测、14个工程距离门及光敏检测。

## Lovelace 配置说明

若要将 LD2412 添加到 Home Assistant 面板，请使用以下配置：

```yaml
type: custom:mmwave-card
radar_model: ld2412
presence_entity: binary_sensor.radar_presence
distance_entity: sensor.radar_moving_distance
```

*(如果您在 ESPHome 中暴露了 `max_distance_entity`，也可以选填该项，否则卡片默认使用 9 米作为最大边界)。*
