# LD6002 Lovelace 配置使用说明

[English Documentation](./README.md)

这份说明用于指导如何在 Home Assistant 中使用 `tests/ld6002.yaml` 中的配置文件。

## 1. 简介

`ld6002.yaml` 包含了适用于海凌科 HLK-LD6002 60 GHz 生物检测雷达的 [mmwave-card](https://github.com/zomco/mmwave-card) 基本 Lovelace 卡片配置。LD6002 是一款高精度的雷达，不但能提供基本的距离、呼吸与心率检测，还在 ESPHome 内部具备了完整的 3D/2D 坐标转换能力。

## 2. 核心特性与适配模式

在 `mmwave-card` 中，我们为 LD6002 提供了**混合式读取方案**，您可以根据您的实际需求选择以下两种模式之一：

### 模式 A：2D/3D 坐标追踪模式（推荐）
如果您希望在卡片中精确地看到目标在房间内的 X 和 Y 坐标，您可以将卡片的 `x_entity` 和 `y_entity` 指向 ESPHome 提供的 `room_x` 和 `room_y` 实体。
**【⚠️ 重要警告】**：如果您使用此模式并希望在卡片界面中进行旋转 (Yaw) 调整，**请务必确保您在 ESPHome 固件中的 `yaw`, `pitch`, `roll`, `radar_x`, `radar_y` 都设置为 `0`**，否则这会导致数据被“二次校准”从而引发位置漂移。

### 模式 B：1D 距离模式
如果您只配置了 `distance_entity`（指向 ESPHome 的 `distance` 实体），卡片会自动退化为 1D 雷达模式，将目标的探测距离映射到正前方。此时您无需理会 ESPHome 中的校准设置，直接在卡片上调整 Yaw 即可。

## 3. 前置准备

在应用此配置之前，请确保：
1. 您已正确安装了 `mmwave-card`（推荐通过 HACS 安装或手动配置前端资源）。
2. 您的 LD6002 雷达设备已通过 ESPHome 或其他方式成功接入 Home Assistant。

## 4. 如何使用

您可以通过以下两种主要方式将该配置添加到您的 Home Assistant 仪表板中：

### 方法 A：通过 UI 编辑器（推荐）

1. 进入 Home Assistant，打开您想要添加卡片的仪表板。
2. 点击右上角的 **“编辑仪表板”** (铅笔图标)。
3. 点击右下角的 **“添加卡片”**。
4. 在弹出的卡片列表中，向下滚动并选择最底部的 **“手动” (Manual)**。
5. 将 `tests/ld6002.yaml` 中的内容复制并粘贴到代码编辑器中。
6. 根据您的实际情况修改实体 ID（见下文“修改实体 ID”），然后点击“保存”。

### 方法 B：通过 YAML 模式

如果您使用 YAML 模式管理 Lovelace (`ui-lovelace.yaml`)，请将配置直接复制到相应的视图 (view) 卡片数组中：
```yaml
cards:
  - type: custom:mmwave-card
    radar_model: ld6002
    presence_entity: binary_sensor.ld6002_presence
    x_entity: sensor.ld6002_room_x
    y_entity: sensor.ld6002_room_y
    # 如果您使用模式 B，请移除上面的 x/y_entity，换成如下的 distance_entity:
    # distance_entity: sensor.ld6002_distance
    respiration_entity: sensor.ld6002_respiration_rate
    heart_rate_entity: sensor.ld6002_heart_rate
    room_w: 400
    room_d: 350
```

## 5. 修改实体 ID

配置中的所有 `entity_id`（如 `binary_sensor.ld6002_presence`）都是示例 ID。如果您的设备在 Home Assistant 中具有不同的名称，请务必将其替换为**您实际的实体 ID**。

## 6. 配置项说明

- **`type`**: `custom:mmwave-card`（固定值）
- **`radar_model`**: `ld6002`（固定值）
- **`presence_entity`**: 【必填】表示雷达是否检测到目标的二进制传感器。
- **`x_entity` / `y_entity`**: 【二选一】X和Y坐标实体，建议映射 ESPHome 的 `room_x` 和 `room_y`。
- **`distance_entity`**: 【二选一】直线探测距离实体。如果提供，它将在没有配置 x/y 实体时作为后备方案。
- **`respiration_entity` / `heart_rate_entity`**: 【可选】呼吸频率和心率实体。
- **`room_w` / `room_d`**: 房间的物理宽度和深度（单位：cm），用于在卡片绘图时缩放比例。
