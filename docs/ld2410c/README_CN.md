# LD2410C Lovelace 配置使用说明

[English Documentation](./README.md)

这份说明用于指导如何在 Home Assistant 中使用 `tests/ld2410c.yaml` 中的配置文件。

## 1. 简介

`ld2410c.yaml` 包含了适用于海凌科 HLK-LD2410C 24 GHz 一维人体存在雷达的 [mmwave-card](https://github.com/zomco/mmwave-card) 基本 Lovelace 卡片配置。它能够实现该雷达在 Home Assistant 中的实时距离可视化、目标状态追踪及几何边界校准显示。

## 2. 前置准备

在应用此配置之前，请确保：
1. 您已正确安装了 `mmwave-card`（推荐通过 HACS 安装或手动配置前端资源）。
2. 您的 LD2410C 雷达设备已通过 ESPHome 或其他方式成功接入 Home Assistant。

## 3. 如何使用

您可以通过以下两种主要方式将该配置添加到您的 Home Assistant 仪表板中：

### 方法 A：通过 UI 编辑器（推荐）

1. 进入 Home Assistant，打开您想要添加卡片的仪表板。
2. 点击右上角的 **“编辑仪表板”** (铅笔图标)。
3. 点击右下角的 **“添加卡片”**。
4. 在弹出的卡片列表中，向下滚动并选择最底部的 **“手动” (Manual)**。
5. 将 `tests/ld2410c.yaml` 中的内容复制并粘贴到代码编辑器中。
6. 根据您的实际情况修改实体 ID（见下文“修改实体 ID”），然后点击“保存”。

### 方法 B：通过 YAML 模式

如果您使用 YAML 模式管理 Lovelace (`ui-lovelace.yaml`)，请将配置直接复制到相应的视图 (view) 卡片数组中：
```yaml
cards:
  - type: custom:mmwave-card
    radar_model: ld2410c
    presence_entity: binary_sensor.ld2410c_presence
    distance_entity: sensor.ld2410c_detection_distance
    target_state_entity: sensor.ld2410c_target_state
    room_w: 400
    room_d: 350
```

## 4. 修改实体 ID

配置中的所有 `entity_id`（如 `binary_sensor.ld2410c_presence`）都是示例 ID。如果您的设备在 Home Assistant 中具有不同的名称，请务必将其替换为**您实际的实体 ID**。

您可以在 Home Assistant 的 **“开发者工具” -> “状态”** 页面中搜索并确认您雷达设备的真实实体 ID。

## 5. 配置项说明

- **`type`**: `custom:mmwave-card`（固定值，调用本卡片插件）
- **`radar_model`**: `ld2410c`（固定值，指定使用的雷达模型）
- **`presence_entity`**: 【必填】表示雷达是否检测到目标的二进制传感器。
- **`distance_entity`**: 【必填】雷达测量的探测距离传感器（单位：cm），通常对应 ESPHome 中的 `detection_distance`。由于 LD2410C 是一维雷达，卡片会自动将距离映射到正前方，您可以通过卡片界面的 `Yaw` 参数调整雷达在房间中的朝向。
- **`target_state_entity`**: 【可选】目标的运动状态传感器。如有提供，将在 UI 中辅助展示目标的具体状态（如静止、微动、运动等）。
- **`room_w` / `room_d`**: 房间的物理宽度和深度（单位：cm），用于在卡片绘图时缩放比例，不影响校准数据本身。您可以根据实际房间大小自行修改（例如 `300` 或 `500`）。
