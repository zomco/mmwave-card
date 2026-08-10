# LD2454 Lovelace 配置指南

[English](./README.md)

本指南说明如何在 Home Assistant 中使用 `tests/ld2454.yaml` 这份配置文件。

## 1. 简介

`ld2454.yaml` 是 Hi-Link LD2454 毫米波多目标追踪雷达配合
[mmwave-card](https://github.com/zomco/mmwave-card) 使用的基础 Lovelace 卡片配置。
它让你在 Home Assistant 中实时可视化最多 3 个目标，并显示几何边界校准结果。

LD2454 是 24 GHz 二维追踪雷达，视场角 120°，量程 6 m。因为它报的是位置而不只是距离，
所以可以参与[多雷达融合](https://github.com/zomco/mmwave-fusion)。

## 2. 前提条件

在使用本配置前，请确认：

1. 已正确安装 `mmwave-card`（推荐通过 HACS 安装，或手动配置前端资源）。
2. LD2454 雷达设备已通过 ESPHome 或其他方式成功接入 Home Assistant。

## 3. 使用方法

### 方法 A：通过界面编辑器（推荐）

1. 打开你想添加卡片的面板。
2. 点击右上角的**"编辑仪表板"**（铅笔图标）。
3. 点击右下角的**"添加卡片"**。
4. 搜索 **"MMWave Radar Card"**，在型号下拉框中选择 `ld2454`。编辑器会为每个字段
   生成对应的实体选择器。

### 方法 B：通过 YAML 模式

如果你用 YAML 模式管理 Lovelace（`ui-lovelace.yaml`），把下面的配置直接复制到对应视图
的 cards 数组里：

```yaml
cards:
  - type: custom:mmwave-card
    radar_model: ld2454
    presence_entity: binary_sensor.ld2454_presence
    target_1_x_entity: sensor.ld2454_target_1_x
    target_1_y_entity: sensor.ld2454_target_1_y
    target_1_speed_entity: sensor.ld2454_target_1_speed
    target_2_x_entity: sensor.ld2454_target_2_x
    target_2_y_entity: sensor.ld2454_target_2_y
    target_2_speed_entity: sensor.ld2454_target_2_speed
    target_3_x_entity: sensor.ld2454_target_3_x
    target_3_y_entity: sensor.ld2454_target_3_y
    target_3_speed_entity: sensor.ld2454_target_3_speed
    polygon_entity: text.ld2454_polygon_config
    room_w: 400
    room_d: 350
```

## 4. 修改实体 ID

配置中所有的 `entity_id`（例如 `binary_sensor.ld2454_presence`）都只是示例。如果你的
设备在 Home Assistant 里名字不同，请务必替换成**你实际的实体 ID**。

可以在**开发者工具 → 状态**页面查找确认。

注意键名格式是 `target_<n>_<轴>_entity`。适配器不认识的键会被静默忽略，结果就是卡片
一片空白且不报任何错。

## 5. 配置项说明

- **`type`**：`custom:mmwave-card`（固定值）
- **`radar_model`**：`ld2454`（固定值）
- **`presence_entity`**：[必填] 表示是否有目标存在的 binary sensor。
- **`target_n_x_entity`**：[目标 1 必填，目标 2、3 可选] 目标 n 的雷达局部 X 坐标。
- **`target_n_y_entity`**：[目标 1 必填，目标 2、3 可选] 目标 n 的雷达局部 Y 坐标。
- **`target_n_speed_entity`**：[可选] 目标 n 的速度传感器（单位 cm/s），用于在界面上
  显示运动状态。
- **`frame_entity`**：[可选] 原子目标帧 —— 用一个 JSON 实体承载同一协议帧内的所有目标。
  比按轴拆分的实体更可靠，后者各自独立更新，可能短暂地在对角线上显示出幽灵目标。
  记得把它排除在 HA Recorder 之外。
- **`polygon_entity`**：[可选] 保存边界多边形的文本实体。想从界面绘制并保存自定义边界
  就必须配置它。
- **`room_w` / `room_d`**：房间的实际宽度和深度（cm），仅用于画布缩放，不影响校准精度。
