# LD2410 Lovelace 配置指南

[English](./README.md)

本指南说明如何在 Home Assistant 中使用 `tests/ld2410.yaml` 这份配置文件。

## 1. 简介

`ld2410.yaml` 是 Hi-Link LD2410 24 GHz 一维存在检测雷达配合
[mmwave-card](https://github.com/zomco/mmwave-card) 使用的基础 Lovelace 卡片配置。
它让你在 Home Assistant 中实时查看距离、目标状态，并显示几何边界校准结果。

LD2410 **只测距**：它能报出目标有多远，但报不出在哪个方向。因此卡片把它渲染成一段圆弧
而不是一个点，并且该型号无法参与[多雷达融合](https://github.com/zomco/mmwave-fusion)
（融合需要方向信息）。

> **接线注意：** LD2410 是唯一不使用 GPIO21/GPIO20 的支持型号，它的 ESPHome 配置用的是
> `GPIO4`（TX）和 `GPIO5`（RX）。

## 2. 前提条件

在使用本配置前，请确认：

1. 已正确安装 `mmwave-card`（推荐通过 HACS 安装，或手动配置前端资源）。
2. LD2410 雷达设备已通过 ESPHome 或其他方式成功接入 Home Assistant。

## 3. 使用方法

### 方法 A：通过界面编辑器（推荐）

1. 打开你想添加卡片的面板。
2. 点击右上角的**"编辑仪表板"**（铅笔图标）。
3. 点击右下角的**"添加卡片"**。
4. 搜索 **"MMWave Radar Card"**，在型号下拉框中选择 `ld2410`。编辑器会为每个字段生成
   对应的实体选择器。

### 方法 B：通过 YAML 模式

如果你用 YAML 模式管理 Lovelace（`ui-lovelace.yaml`），把下面的配置直接复制到对应视图
的 cards 数组里：

```yaml
cards:
  - type: custom:mmwave-card
    radar_model: ld2410
    presence_entity: binary_sensor.ld2410_presence
    distance_entity: sensor.ld2410_detection_distance
    target_state_entity: sensor.ld2410_target_state
    max_distance_entity: sensor.ld2410_max_distance
    room_w: 400
    room_d: 350
```

## 4. 修改实体 ID

配置中所有的 `entity_id`（例如 `binary_sensor.ld2410_presence`）都只是示例。如果你的
设备在 Home Assistant 里名字不同，请务必替换成**你实际的实体 ID**。

可以在**开发者工具 → 状态**页面查找确认。

## 5. 配置项说明

- **`type`**：`custom:mmwave-card`（固定值）
- **`radar_model`**：`ld2410`（固定值）
- **`presence_entity`**：[必填] 表示是否有目标存在的 binary sensor。
- **`distance_entity`**：[必填] 检测到的目标距离（cm）。
- **`target_state_entity`**：[可选] 目标状态，一般为 无/运动/静止/两者。用于区分运动和
  微动存在。
- **`max_distance_entity`**：[可选] 配置的最大检测距离，用于缩放渲染的圆弧。
- **`room_w` / `room_d`**：房间的实际宽度和深度（cm），仅用于画布缩放，不影响校准精度。

## 6. 校准

只测距的雷达同样需要校准：`radar_x`、`radar_y`、`radar_z` 和 `yaw` 决定这段圆弧画在房间
的什么位置；边界在这里退化为 `distance_min` / `distance_max` 的距离门，而不是多边形判定。

由于没有方向信息，标签页 ② 的两点偏航校准对它不适用。请在标签页 ① 里手动填写朝向角度：
以房间 **+Y** 为 0，顺时针为正。
