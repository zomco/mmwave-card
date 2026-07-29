# LD2450A Lovelace 卡片配置指南

[English Documentation](./README.md)

本文档将详细说明如何在 Home Assistant 中使用 `tests/ld2450a.yaml` 配置文件，为海凌科 HLK-LD2450A 雷达添加可视化的控制卡片。

## 1. 简介

`ld2450a.yaml` 包含了基于 [mmwave-card](https://github.com/zomco/mmwave-card) 的 HLK-LD2450A 24GHz 人感与手势识别雷达基础卡片配置。它可以将雷达的人感测距数据、手势识别状态及空间校准参数在 Home Assistant 仪表盘中以图形化方式直观展示。

## 2. 前置条件

在使用本配置前，请确保：
1. 您已正确安装了 `mmwave-card` 插件（推荐通过 HACS 安装或手动引入前端资源）。
2. 您的 LD2450A 雷达设备已通过 ESPHome 等方式成功接入 Home Assistant 并能正常上报实体数据。

## 3. 硬件接线定义

LD2450A 模组与 ESP主控通过串口通信（默认波特率 256000，8N1）：

| LD2450A 引脚 | ESP32-C3 引脚 | 说明 |
| :--- | :--- | :--- |
| 5V | 5V | 电源正极（要求供电能力大于 200mA） |
| GND | GND | 电源地 |
| TX | GPIO20 (RX) | 雷达串口发送引脚 |
| RX | GPIO21 (TX) | 雷达串口接收引脚 |

## 4. 使用方法

可以通过以下两种主要方式将本卡片添加到 Home Assistant 仪表盘：

### 方式 A：通过 UI 编辑器添加（推荐）

1. 进入 Home Assistant 打开您要添加卡片的仪表盘视图。
2. 点击右上角 **“编辑仪表盘”**（铅笔图标）。
3. 点击右下角 **“添加卡片”**。
4. 在弹出的卡片列表中滑动到底部，选择 **“手动 (Manual)”**。
5. 复制 `tests/ld2450a.yaml` 中的全部内容，粘贴到代码编辑器中。
6. 按照您的实际设备修改其中的实体 ID（参考后文“修改实体 ID”），点击“保存”即可。

### 方式 B：通过 YAML 模式添加

如果您使用 YAML 模式（`ui-lovelace.yaml`）管理仪表盘，请直接将配置复制到对应视图的 `cards` 数组下：
```yaml
cards:
  - type: custom:mmwave-card
    radar_model: ld2450a
    presence_entity: binary_sensor.ld2450a_presence
    distance_entity: sensor.ld2450a_distance
    room_w: 400
    room_d: 350
```

## 5. 修改实体 ID

配置文件中的所有 `entity_id`（例如 `binary_sensor.ld2450a_presence`）仅为示例。如果您的设备在 Home Assistant 中命名不同，请务必将其替换为您系统中**真实的实体 ID**。

您可以在 Home Assistant 的 **“开发者工具” -> “状态”** 页面中搜索雷达名称，确认其实际分配的 ID。

## 6. 配置项说明

- **`type`**: `custom:mmwave-card`（固定值，声明使用本自定义卡片）
- **`radar_model`**: `ld2450a`（固定值，声明适配的雷达型号为 LD2450A）
- **`presence_entity`**: [必填] 人体存在状态传感器（二进制传感器）。
- **`distance_entity`**: [必填] 雷达测距传感器（单位：cm）。由于 LD2450A 为一维测距雷达，卡片会将距离数据映射为正前方目标；您可以利用卡片的 `Yaw` (偏航角) 控件在房间平面中旋转调整雷达的物理朝向。
- **`room_w` / `room_d`**: 房间的真实宽度与深度（单位：cm），用于卡片图形的比例渲染。修改此项不影响雷达的实际校准数据，可按实际空间尺寸自由配置（如 `300` 或 `500`）。
