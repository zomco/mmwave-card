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

配置的存在实体缺失、`unavailable` 或 `unknown` 时，卡片显示“数据不可用”，请检查实体绑定及设备连接。只有有效的 `off` 状态才表示无人；有效 `on` 但没有坐标仍表示有人但未定位。实体恢复有效状态后，显示自动恢复。

您可以通过以下两种主要方式将该配置添加到您的 Home Assistant 仪表板中：

### 方法 A：通过卡片编辑器（推荐）

1. 在仪表盘中添加卡片，选择 **MMWave Radar Card**，型号选 `r60abd1`。
2. 在“连接雷达设备”下拉框中选择你的 R60ABD1 设备。卡片只在**该设备的实体**内匹配，不会混入其他设备。
3. 查看匹配反馈：“已自动匹配 N 个配置项”表示绑定了 N 个字段；必需字段（presence、x、y）未绑全时会明确列出缺失项，请展开“高级”手动选择。
4. 有多个候选实体（例如设备上有两个 presence）时不会静默任选，会提示你在“高级”中选择。
5. 绑定完成后，如果提示“已绑定实体当前为 unavailable/unknown”，说明绑定正确但设备离线或尚未连接，等待设备恢复即可，不需要重新绑定。
6. 实体注册表暂时不可用时，你的配置不会被改动，可展开“高级”手动填写实体。

7. 若唯一候选实体在 Home Assistant 中被禁用，编辑器不会自动绑定，会提示先在 HA 中启用或手动选择其他实体；卡片不会在后台启用或重命名任何实体。

绑定时注意：x/y 必须是雷达**原始局部坐标**（如 `sensor.xxx_x`），不要选 `room_x`/`room_y`，否则坐标会被变换两次。

### 方法 B：通过 YAML 模式

如果您使用 YAML 模式管理 Lovelace (`ui-lovelace.yaml`)，请将配置直接复制到相应的视图 (view) 卡片数组中：
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

## 4. 修改实体 ID

配置中的所有 `entity_id`（如 `binary_sensor.YOUR_DEVICE_presence`）都是示例 ID。如果您的设备在 Home Assistant 中具有不同的名称，请务必将其替换为**您实际的实体 ID**。

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
