# LD2420 Lovelace 卡片使用说明文档

[English Documentation](./README.md)

本指南详细说明了如何在 Home Assistant 中使用位于 `tests/ld2420.yaml` 的示例卡片配置文件。

## 1. 简介

`ld2420.yaml` 包含了海凌科 (Hi-Link) LD2420 24GHz 单目标测距人体感知雷达在 [mmwave-card](https://github.com/zomco/mmwave-card) 卡片插件中的标准配置说明。配置该卡片后，您可以在 Home Assistant 仪表盘上清晰直观地监控房间内的实时距离、人体存在感知状态以及进行图形化边界校准。

## 2. 前置准备

在使用本配置文件前，请确保：
1. 您已正确安装了 `mmwave-card` 插件（推荐通过 HACS 或前端资源手动接入）。
2. 您的 LD2420 雷达设备已通过 ESPHome 或其他途径成功接入 Home Assistant。

## 3. 使用方法

您可以按照以下两种主要方式将卡片加入到 HA 仪表盘中：

### 方式 A：通过 UI 编辑器接入（推荐）

1. 打开 Home Assistant 网页端，进入需要添加雷达卡片的仪表盘页面。
2. 点击右上角的 **“编辑仪表盘”**（铅笔图标）。
3. 点击右下角的 **“添加卡片”**。
4. 在弹出的卡片列表中滑到最下方，选择 **“手动 / Manual”**（或者若已识别到自定义卡片，直接选择 **“MMWave Radar HA Card”**）。
5. 将 `tests/ld2420.yaml` 里面的全部代码复制并粘贴到左侧的 YAML 代码编辑器中。
6. 根据您的实际设备命名修改其中的实体 ID（参见下文“如何修改实体 ID”），确认无误后点击“保存”。

### 方式 B：通过 YAML 配置文件接入

若您使用的是纯 YAML 模式的 Lovelace（例如 `ui-lovelace.yaml`），可以直接将这段代码添加在对应视图的 `cards:` 列表下：
```yaml
cards:
  - type: custom:mmwave-card
    radar_model: ld2420
    presence_entity: binary_sensor.ld2420_presence
    distance_entity: sensor.ld2420_distance
    room_w: 400
    room_d: 350
```

## 4. 如何修改实体 ID

配置示例中所使用的所有 `entity_id`（例如 `binary_sensor.ld2420_presence`）仅作为示例参考。如果您的设备在接入 Home Assistant 后使用了其他的命名规则或设备前缀，请务必将其**替换为您实际存在的实体 ID**。

您可以在 Home Assistant 的 **“开发者工具” -> “状态”** 页面搜索并确认您雷达设备的真实实体 ID 名称。

## 5. 配置选项说明

- **`type`**: `custom:mmwave-card`（固定值，用于调用自定义雷达卡片插件）
- **`radar_model`**: `ld2420`（固定值，指定使用 LD2420 适配器）
- **`presence_entity`**: 【必填】人体存在检测传感器（0/1 或 off/on）。
- **`distance_entity`**: 【必填】雷达测距实时距离传感器（单位：cm）。由于 LD2420 是 1-D 单轴测距雷达，卡片默认会将测得的距离沿雷达正前方方向（极坐标中心轴）投射。您可通过卡片内提供的 `偏航角 (Yaw)` 拖动滑块或两点定向功能，在 2D 房间地图中自由调整雷达的朝向角度。
- **`room_w` / `room_d`**: 房间物理宽度和深度（单位：cm），主要用于卡片地图画布的显示缩放。
