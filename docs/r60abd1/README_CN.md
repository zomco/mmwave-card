# R60ABD1 Lovelace 配置使用说明

[English Documentation](./README.md)
这份说明用于指导如何在 Home Assistant 中使用 `tests/r60abd1.yaml` 中的配置文件。

## 1. 简介

`r60abd1.yaml` 包含了适用于 MicRadar R60ABD1 毫米波雷达的 [mmwave-card](https://github.com/zomco/mmwave-card) 基本 Lovelace 卡片配置。它能够实现该雷达在 Home Assistant 中的可视化实时追踪、几何边界校准以及健康相关数据（呼吸、心率、睡眠等）的显示接入。

## 2. 前置准备

在应用此配置之前，请确保：
1. 您已正确安装了 `mmwave-card`（推荐通过 HACS 安装或手动配置前端资源）。
2. 您的 R60ABD1 雷达设备已通过 ESPHome 或其他方式成功接入 Home Assistant。

## 3. 如何使用

您可以通过以下两种主要方式将该配置添加到您的 Home Assistant 仪表板中：

### 方法 A：通过 UI 编辑器（推荐）

1. 进入 Home Assistant，打开您想要添加卡片的仪表板。
2. 点击右上角的 **“编辑仪表板”** (铅笔图标)。
3. 点击右下角的 **“添加卡片”**。
4. 在弹出的卡片列表中，向下滚动并选择最底部的 **“手动” (Manual)**。
5. 将 `tests/r60abd1.yaml` 中的内容复制并粘贴到代码编辑器中。
6. 根据您的实际情况修改实体 ID（见下文“修改实体 ID”），然后点击“保存”。

### 方法 B：通过 YAML 模式

如果您使用 YAML 模式管理 Lovelace (`ui-lovelace.yaml`)，请将配置直接复制到相应的视图 (view) 卡片数组中：
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

## 4. 修改实体 ID

配置中的所有 `entity_id`（如 `binary_sensor.r60abd1_presence`）都是示例 ID。如果您的设备在 Home Assistant 中具有不同的名称，请务必将其替换为**您实际的实体 ID**。

您可以在 Home Assistant 的 **“开发者工具” -> “状态”** 页面中搜索并确认您雷达设备的真实实体 ID。

## 5. 配置项说明

- **`type`**: `custom:mmwave-card`（固定值，调用本卡片插件）
- **`radar_model`**: `r60abd1`（固定值，指定使用的雷达模型）
- **`presence_entity`**: 【必填】表示是否有人存在的二进制传感器。
- **`x_entity`**: 【必填】雷达测量的局部 X 轴坐标（单位：cm）。
- **`y_entity`**: 【必填】雷达测量的局部 Y 轴坐标（单位：cm）。
- **`z_entity`**: 【可选】雷达测量的局部 Z 轴坐标（高度），填入后可在卡片UI中显示离地高度。
- **`breath_entity`**: 【可选】呼吸频率（次/分钟），加入以备自动化和扩展显示调用。
- **`heart_entity`**: 【可选】心率（bpm）。
- **`sleep_entity`**: 【可选】睡眠状态传感器。
- **`room_w` / `room_d`**: 房间的物理宽度和深度（单位：cm），用于在卡片绘图时缩放比例，不影响校准数据本身。您可以根据实际房间大小自行修改（例如 `300` 或 `500`）。
