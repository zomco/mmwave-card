# 进阶配置与 DIY 指南

[English](./DIY.md)

本指南面向偏好 YAML 配置的高级用户、希望添加新雷达型号支持的开发者，以及希望从源码构建卡片的用户。

## 目录
1. [YAML 完整配置 (R60ABD1)](#3-r60abd1-完整配置)
2. [YAML 完整配置 (LD2450)](#4-ld2450-完整配置)
3. [校准流程与原理](#5-校准流程)
4. [校准参数说明](#6-校准参数说明)
5. [实体 ID 对照表](#7-实体-id-对照表)
6. [常见问题](#8-常见问题)

## 3. R60ABD1 完整配置

```yaml
type: custom:mmwave-card
radar_model: r60abd1

# ── 必填 ──────────────────────────────────────────────────────────────────────
presence_entity: binary_sensor.r60abd1_presence   # 存在检测
x_entity:        sensor.r60abd1_x                 # X 坐标（cm，雷达局部坐标系）
y_entity:        sensor.r60abd1_y                 # Y 坐标（cm）

# ── 可选 ──────────────────────────────────────────────────────────────────────
z_entity:      sensor.r60abd1_z                   # Z 坐标（cm），用于计算离地高度
breath_entity: sensor.r60abd1_breath_value        # 呼吸频率（次/min，0-35）
heart_entity:  sensor.r60abd1_heart_rate          # 心率（bpm，60-120）
sleep_entity:  sensor.r60abd1_sleep_state         # 睡眠状态（文本）

# ── 房间尺寸（仅影响画布缩放比例）──────────────────────────────────────────
room_w: 400    # 房间宽度（cm）
room_d: 350    # 房间深度（cm）
```

### R60ABD1 配合的 ESPHome 实体（由 ESPHome Component 提供）

| 卡片配置键 | 实体类型 | 说明 |
|---|---|---|
| `presence_entity` | `binary_sensor` | `on`=有人，`off`=无人 |
| `x_entity` | `sensor` | 雷达局部坐标 X（cm） |
| `y_entity` | `sensor` | 雷达局部坐标 Y（cm） |
| `z_entity` | `sensor` | 雷达局部坐标 Z（cm） |
| `breath_entity` | `sensor` | 呼吸频率（每 3s 更新） |
| `heart_entity` | `sensor` | 心率（每 3s 更新） |
| `sleep_entity` | `sensor` 或 `text_sensor` | `deep`/`light`/`awake`/`none` |

---

## 4. LD2450 完整配置

```yaml
type: custom:mmwave-card
radar_model: ld2450

# ── 必填 ──────────────────────────────────────────────────────────────────────
presence_entity: binary_sensor.ld2450_presence
target1_x:       sensor.ld2450_target_1_x        # 目标 1 X（mm，适配器自动转 cm）
target1_y:       sensor.ld2450_target_1_y

# ── 可选（目标 2、3）────────────────────────────────────────────────────────
target2_x:       sensor.ld2450_target_2_x
target2_y:       sensor.ld2450_target_2_y
target3_x:       sensor.ld2450_target_3_x
target3_y:       sensor.ld2450_target_3_y

# ── 房间尺寸 ──────────────────────────────────────────────────────────────────
room_w: 500
room_d: 400
```

> **注意**：LD2450 的 ESPHome 组件上报坐标单位为 **mm**。  
> 适配器（`src/models/ld2450/index.ts`）已自动除以 10 转换为 cm。  
> 坐标为 `(0, 0)` 表示该目标槽位为空，适配器会自动过滤。

---

## 5. 校准流程

### 步骤概览

```
Tab ①: 几何参数 → Tab ②: 偏航校准 → Tab ③: 实时验证 → 保存
```

### Tab ① — 几何 & 边界

**必填参数（用卷尺测量）：**

| 参数 | 说明 | 典型值 |
|---|---|---|
| 雷达 X | 雷达在房间中的横向位置，以房间左下角为原点，向右为正（cm） | 200 |
| 雷达 Y | 雷达在房间中的纵向位置，向前为正（cm） | 175 |
| 安装高度 | 雷达距地面的垂直距离（cm） | 220 |
| 粗略偏航 | 雷达正前方与房间 Y 轴的夹角，顺时针为正（°）。不确定时填 0，在 Tab ② 中精确校准 | 0 |
| 俯仰角 | 向前倾斜为正（°）。水平安装填 0 | 0 |
| 横滚角 | 向右倾斜为正（°）。水平安装填 0 | 0 |

**房间边界（可选）：**

- 在画布上点击添加顶点，≥ 3 个点后边界过滤生效
- 变换到房间坐标系后落在多边形外的目标将被忽略，在实时视图中以红色虚线圆圈标注
- 不绘制边界 = 不过滤（接受所有坐标）

### Tab ② — 偏航校准（两点几何法）

**无需 IMU 传感器**，通过两个已知位置的雷达读数自动计算精确偏航角。

操作流程：

1. **选参考点 A**：在房间中选一个你能走到的位置，用卷尺确认其房间坐标（X, Y）。在画布上点击该位置。
2. **走到 A 点**：实际走到步骤 1 标记的位置，站定后点击「捕获雷达读数」。
3. **选参考点 B**：选另一个与 A 距离 >80 cm 的位置，重复步骤 1-2。
4. 卡片自动计算偏航角并显示**残差**（两点变换误差的平均值）：
   - 残差 < 10 cm：良好
   - 残差 10-20 cm：可接受
   - 残差 > 20 cm：建议重新校准（检查参考点测量精度）

### Tab ③ — 实时验证

- 在探测范围内走动，观察蓝色目标点是否跟随实际位置移动
- 时间渐淡的轨迹显示最近 90 秒的移动路径
- 状态栏显示当前房间坐标和边界过滤状态

### 保存校准

点击右下角「**保存**」按钮：

1. 校准数据写入浏览器 `localStorage`（key: `mmwave_cal_v1_<radar_model>`）
2. 同时调用以下 HA 服务更新 `input_number` 实体（如已在 `configuration.yaml` 中定义）：
   - `input_number.r60abd1_radar_x`
   - `input_number.r60abd1_radar_y`
   - `input_number.r60abd1_radar_height`
   - `input_number.r60abd1_yaw`

> **注意**：校准数据保存在**当前浏览器**的 localStorage 中。  
> 更换设备或清除浏览器数据后，需重新校准，或从 `input_number` 实体手动恢复。

---

## 6. 校准参数说明

### 坐标系定义

```
Y（房间纵深，向前）
^
|
|      [雷达安装位置]
|
+-----> X（房间宽度，向右）
原点 = 房间左下角
```

### 三轴旋转说明

| 参数 | 轴 | 正方向 | 无 IMU 时的处理 |
|---|---|---|---|
| 偏航 Yaw | Z 轴（垂直） | 顺时针 | Tab ② 自动计算 |
| 俯仰 Pitch | X 轴（横向） | 雷达向前倾 | 手动测量或 IMU 读取后填写 |
| 横滚 Roll | Y 轴（纵向） | 雷达向右倾 | 手动测量或 IMU 读取后填写 |

### 通过 HA 自动化动态更新 pitch/roll（接入 IMU 后）

```yaml
# configuration.yaml
automation:
  - alias: 从 IMU 更新雷达俯仰角
    trigger:
      - platform: state
        entity_id: sensor.imu_pitch
    action:
      - service: input_number.set_value
        target:
          entity_id: input_number.r60abd1_pitch   # 需自行定义此实体
        data:
          value: "{{ states('sensor.imu_pitch') | float }}"
```

然后在 ESPHome 固件中通过 `number` 平台接收该值并更新 `CalibrationParams`。

---

## 7. 实体 ID 对照表

下表列出卡片配置键与 ESPHome 组件默认实体 ID 的对应关系。  
实际 ID 取决于你在 ESPHome YAML 中为设备设置的 `name`。

### R60ABD1

假设 ESPHome 设备名为 `r60abd1-radar`，则实体 ID 前缀为 `r60abd1_radar_`（HA 将设备名中的 `-` 转为 `_`）。

| 卡片配置键 | 示例实体 ID |
|---|---|
| `presence_entity` | `binary_sensor.r60abd1_radar_presence` |
| `x_entity` | `sensor.r60abd1_radar_x` |
| `y_entity` | `sensor.r60abd1_radar_y` |
| `z_entity` | `sensor.r60abd1_radar_z` |
| `breath_entity` | `sensor.r60abd1_radar_breath_value` |
| `heart_entity` | `sensor.r60abd1_radar_heart_rate` |
| `sleep_entity` | `sensor.r60abd1_radar_sleep_state` |

### LD2450

假设 ESPHome 设备名为 `ld2450-radar`：

| 卡片配置键 | 示例实体 ID |
|---|---|
| `presence_entity` | `binary_sensor.ld2450_radar_presence` |
| `target1_x` | `sensor.ld2450_radar_target_1_x` |
| `target1_y` | `sensor.ld2450_radar_target_1_y` |
| `target2_x` | `sensor.ld2450_radar_target_2_x` |
| `target2_y` | `sensor.ld2450_radar_target_2_y` |
| `target3_x` | `sensor.ld2450_radar_target_3_x` |
| `target3_y` | `sensor.ld2450_radar_target_3_y` |

> 可在 HA **设置 → 设备与服务 → 你的 ESPHome 设备** 中查看所有实体的完整 ID。

---

## 8. 常见问题

**Q：卡片显示「Unknown radar_model」**  
A：`radar_model` 字段填写错误。目前支持的值：`r60abd1`、`ld2450`（区分大小写）。

**Q：实时视图中目标点不移动**  
A：检查 `x_entity` / `y_entity` 实体在 HA 状态页面是否有数据更新。R60ABD1 更新率为 2s，LD2450 约 20Hz。

**Q：校准后目标点位置偏差较大**  
A：按以下顺序排查：
1. 确认卷尺测量的安装坐标（radar_x, radar_y, radar_height）是否准确
2. 重新做 Tab ② 偏航校准，选择距离更远的两个参考点（间距 >150 cm 效果更好）
3. 如果安装有明显倾斜（>10°），填写准确的 pitch 和 roll 值

**Q：更换浏览器/设备后校准数据丢失**  
A：校准数据存在当前浏览器的 localStorage 中。可以：
1. 重新校准（推荐，最准确）
2. 在原浏览器中查看 localStorage 的 `mmwave_cal_v1_r60abd1` 键值，复制到新设备
3. 事先将校准参数同步到 `input_number` 实体（点保存即可），新设备上手动填入 Tab ① 的参数后保存

**Q：能否同时使用两个不同型号的雷达？**  
A：可以。在同一个 Lovelace 仪表板中添加两个 `custom:mmwave-card` 卡片，分别设置不同的 `radar_model` 和实体 ID。每个型号的校准数据独立存储（key: `mmwave_cal_v1_r60abd1` 和 `mmwave_cal_v1_ld2450`）。
