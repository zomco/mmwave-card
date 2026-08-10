# 进阶配置与 DIY 指南

[English](./DIY.md)

面向偏好 YAML 而非可视化编辑器的用户、想新增雷达型号的开发者，以及想弄明白那几个校准
参数到底是什么意思的人。

> 第一次安装？请用可视化编辑器，见
> [新手上手指南](https://github.com/zomco/mmwave-component/blob/main/GETTING-STARTED_CN.md)。
> 本文所有内容都是可选的。

## 目录

- [配置](#配置) —— 各型号的 YAML 写法
- [校准参数详解](#校准参数详解) —— 六个参数分别是什么
- [坐标系](#坐标系) —— 轴向与旋转约定
- [新增雷达型号](#新增雷达型号)
- [从源码构建](#从源码构建)
- [常见问题](#常见问题)

---

## 配置

### 实体键名规则

实体键名**不能随便起** —— 适配器只认它 schema 里的那些键，遇到不认识的键会静默忽略，
结果就是卡片一片空白且不报任何错。

根据型号能报几个目标，有两种命名形式：

| 型号类型 | 键名格式 | 示例 |
| --- | --- | --- |
| 单目标（R60ABD1、LD6002、所有 1D 型号） | `<轴>_entity` | `x_entity`、`y_entity`、`z_entity` |
| 多目标（LD2450/2451/2452/2453/2454） | `target_<n>_<轴>_entity` | `target_1_x_entity`、`target_2_y_entity` |

所有键都以 `_entity` 结尾。任何型号的权威列表都是
`src/models/<型号>/index.ts` 里的 `ENTITY_SCHEMA` 数组。

### R60ABD1 —— 单目标、3D、生命体征

```yaml
type: custom:mmwave-card
radar_model: r60abd1
presence_entity: binary_sensor.r60abd1_presence
x_entity: sensor.r60abd1_x
y_entity: sensor.r60abd1_y
z_entity: sensor.r60abd1_z                  # 可选
breath_entity: sensor.r60abd1_breath_value  # 可选
heart_entity: sensor.r60abd1_heart_rate     # 可选
sleep_entity: sensor.r60abd1_sleep_state    # 可选
polygon_entity: text.r60abd1_polygon_config # 可选，用于保存边界
frame_entity: sensor.r60abd1_target_frame   # 可选，原子帧，见下文
room_w: 400   # 房间宽度（cm）
room_d: 350   # 房间深度（cm）
```

### LD2450 —— 最多 3 目标、2D

```yaml
type: custom:mmwave-card
radar_model: ld2450
presence_entity: binary_sensor.ld2450_presence
target_1_x_entity: sensor.ld2450_target_1_x
target_1_y_entity: sensor.ld2450_target_1_y
target_1_speed_entity: sensor.ld2450_target_1_speed  # 可选
target_2_x_entity: sensor.ld2450_target_2_x          # 可选
target_2_y_entity: sensor.ld2450_target_2_y
target_2_speed_entity: sensor.ld2450_target_2_speed  # 可选
target_3_x_entity: sensor.ld2450_target_3_x          # 可选
target_3_y_entity: sensor.ld2450_target_3_y
target_3_speed_entity: sensor.ld2450_target_3_speed  # 可选
polygon_entity: text.ld2450_polygon_config           # 可选
room_w: 500
room_d: 400
```

LD2451、LD2452、LD2453、LD2454 写法完全相同，只需要改 `radar_model` 和实体前缀。

### 原子目标帧

多目标型号可以把所有目标放在一个带版本号的 JSON 实体里推送，替代"每个轴一个传感器"：

```yaml
frame_entity: sensor.ld2450_target_frame
```

```json
{ "v": 1, "f": 42, "ts": 123456, "t": [[120.0, 340.0, -8], [-45.0, 210.0, 3]] }
```

`f` 是帧序号，`ts` 是设备启动后的毫秒数，`t` 中每项为同一协议帧内的 `[x, y, speed]`。
v1 的单位是 cm 和 cm/s。

这为什么重要：分开的 X/Y 传感器是各自独立更新的 —— 你可能读到目标 1 这一帧的 X 和
下一帧的 Y，于是对角线上凭空出现一个幽灵目标。单个原子实体不会被这样撕裂。

配置了 `frame_entity` 之后，按轴拆分的实体退化为可选的兜底项。
**记得把原子帧实体排除在 HA Recorder 之外** —— 它是高频文本状态，会把 recorder
数据库撑爆。

### 通用配置项

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `radar_model` | string | **必填** | 型号 ID，即 `RADAR_MODELS` 里的键，如 `r60abd1`、`ld2450` |
| `presence_entity` | string | **必填** | 存在检测的 binary sensor |
| `room_w` | number | `400` | 画布缩放用的房间宽度（cm） |
| `room_d` | number | `350` | 画布缩放用的房间深度（cm） |
| `polygon_entity` | string | — | 保存边界的文本实体；想从界面保存边界就必须配 |
| `frame_entity` | string | — | 原子目标帧（多目标型号） |

`room_w` / `room_d` 只影响画布缩放，不影响校准精度。

---

## 校准参数详解

校准数据保存在浏览器 `localStorage` 的 `mmwave_cal_v1_<型号>` 键下；点**保存**时会同时
写入设备，这样重启后依然有效。

| 参数 | 单位 | 含义 |
| --- | --- | --- |
| `radar_x` | cm | 沿房间 X 轴距原点墙角的距离 |
| `radar_y` | cm | 沿房间 Y 轴距原点墙角的距离 |
| `radar_z` | cm | 离地安装高度 |
| `yaw` | ° | 朝向。`0` = 正对房间 **+Y**，俯视顺时针为正 |
| `pitch` | ° | 俯仰角，正值表示向前/向下倾斜 |
| `roll` | ° | 绕雷达自身法向轴的翻滚角 |
| `polygon` | cm | 房间边界顶点；少于 3 个点则关闭过滤 |

量的是雷达模块本身，不是 ESP32 开发板。误差 ±5 cm 完全够用。

### 三个标签页

**标签页 ① —— 几何与边界。** 填 `radar_x`、`radar_y`、`radar_z`，画多边形。多边形外的
目标不再触发存在检测，这就是穿墙幽灵的解法。

**标签页 ② —— 偏航校准。** 两点几何法：站在一个已知点标记，再走到至少 2 m 外的第二个点
标记，卡片据此解算朝向。两点挨太近会放大测量误差。

**标签页 ③ —— 实时验证。** 走动观察。点是镜像的说明偏航角差 180°，和你的移动方向成
直角说明差 90°。回标签页 ② 修 —— 手动去凑角度只是把误差藏起来，并没有改对。

### 通过自动化动态更新 pitch/roll

如果雷达装在会动的东西上并且接了 IMU，这些校准值都是普通实体，可以用自动化驱动：

```yaml
# configuration.yaml
automation:
  - alias: 把 IMU 姿态同步给雷达
    trigger:
      - platform: state
        entity_id: sensor.imu_pitch
    action:
      - service: number.set_value
        target:
          entity_id: number.r60abd1_radar_pitch
        data:
          value: "{{ states('sensor.imu_pitch') | float }}"
```

---

## 坐标系

房间坐标系：原点取你选的墙角，**X** 向右，**Y** 向前，**Z** 从地面向上。长度单位统一为厘米。

旋转采用 ZYX Tait-Bryan 约定：**R = Rz(yaw) · Rx(pitch) · Ry(roll)**。

- `yaw = 0` 时雷达正对房间 **+Y**；正的偏航角俯视顺时针旋转（转向 +X）。
- `pitch` 绕中间坐标系的 X 轴倾斜。
- `roll` 绕雷达自身法向轴（局部 +Y）旋转。
- 房间 Z 从地面向上量，因此 `room_z = radar_z − world_z`。

> **这套约定在三个仓库里各实现了一遍** —— 本仓库的 `src/utils/transform.ts`、
> 每个 ESPHome 组件的 `{型号}_transform.h`、以及融合集成的 `fusion.py`。只改其中一处会
> 静默地把所有人的坐标镜像或旋转，而那个仓库自己的测试全都是绿的。
> 详见 [AGENTS.md](./AGENTS.md)。

---

## 新增雷达型号

只动两个文件：新增一个适配器，加一行注册。

**1. 创建** `src/models/<你的型号>/index.ts`：

```typescript
import type { RadarModelAdapter } from '../base';
import type {
  RadarModelInfo,
  EntitySchemaField,
  MMWaveCardConfig,
  CalibrationConfig,
} from '../../types';
import { DEFAULT_CALIBRATION } from '../../types';

const INFO: RadarModelInfo = {
  id: 'my_radar',
  displayName: 'My Radar XYZ (24 GHz)',
  fovDegrees: 90,
  maxRangeM: 5,
  minRangeM: 0.3,
  updateRateHz: 10,
  maxTargets: 1,
  hasZAxis: false,
  hasBreathing: false,
  hasHeartRate: false,
  hasSleep: false,
  // 只测距的雷达要设为 true：渲染成圆弧而非点，并从多雷达融合中排除。
  is1DRanging: false,
};

const ENTITY_SCHEMA: EntitySchemaField[] = [
  { key: 'presence_entity', labelKey: 'editor.presence_entity', required: true, domain: 'binary_sensor' },
  { key: 'x_entity', labelKey: 'editor.x_entity', required: true, domain: 'sensor' },
  { key: 'y_entity', labelKey: 'editor.y_entity', required: true, domain: 'sensor' },
];

export const myRadarAdapter: RadarModelAdapter = {
  info: INFO,

  getEntitySchema: () => ENTITY_SCHEMA,

  validateConfig(config: MMWaveCardConfig): string[] {
    return ENTITY_SCHEMA.filter((f) => f.required && !config[f.key]).map(
      (f) => `Missing required entity: ${f.key}`,
    );
  },

  readFromHass(hass, config) {
    const pres = hass.states[config.presence_entity as string];
    if (!pres || pres.state !== 'on') return { present: false, targets: [] };
    const x = parseFloat(hass.states[config.x_entity as string]?.state) || 0;
    const y = parseFloat(hass.states[config.y_entity as string]?.state) || 0;
    return { present: true, targets: [{ index: 0, rawX: x, rawY: y, rawZ: 0 }] };
  },

  getDefaultCalibration(): CalibrationConfig {
    return { ...DEFAULT_CALIBRATION, radar_z: 200 };
  },
};
```

`readFromHass` 返回的必须是雷达**局部**坐标系下的原始坐标，单位厘米（Y 向前、X 向右、
Z 垂直于天线面向外）。如果雷达报的是毫米，在这里换算 —— LD2450 适配器就是这么做的。

**2. 注册** 到 `src/models/index.ts`：

```typescript
import { myRadarAdapter } from './my_radar';

export const RADAR_MODELS: Record<string, RadarModelAdapter> = {
  // …已有型号…
  my_radar: myRadarAdapter, // ← 加在这里
};
```

**3. 补翻译**：新增的 `labelKey` 要同时加到 `src/localize/languages/en.json` 和
`zh-Hans.json`。

**4. 构建并测试：**

```bash
npm run lint && npm test && npm run build
```

编辑器下拉框、所有面板、校准存储都会自动识别新型号 —— 不需要改任何公共代码。

可选：按已有文档的格式补上 `docs/<你的型号>/README.md` 和 `README_CN.md`，以及
`tests/` 下的 Lovelace 示例。

---

## 从源码构建

```bash
git clone https://github.com/zomco/mmwave-card.git
cd mmwave-card
npm install

npm run build      # → dist/mmwave-card.js
npm start          # watch 模式（rollup -w）
npm run lint       # eslint
npm run lint:fix
npm test           # vitest，单次运行
npm run test:watch
```

需要 Node.js ≥ 18。技术栈为 TypeScript + Lit 3，用 Rollup 打包。

测试在 `test/` 目录下，覆盖型号适配器、原子帧解析、本地化和坐标变换。

### 源码结构

| 路径 | 内容 |
| --- | --- |
| `src/mmwave-card.ts` | 卡片入口与自定义元素注册 |
| `src/editor.ts` | 可视化配置编辑器 |
| `src/models/` | 每个雷达型号一个目录，外加 `base.ts` 和注册表 `index.ts` |
| `src/panels/` | 三个校准标签页，以及融合、区域编辑、3D 安装视图 |
| `src/fusion/` | 浏览器端融合：校准、帧解码、tracker |
| `src/utils/transform.ts` | 坐标变换 —— **跨仓库不变量** |
| `src/utils/canvas.ts` | 画布绘制辅助函数 |
| `src/types/` | 配置与型号的类型定义 |
| `src/localize/` | i18n helper 与 `languages/en.json`、`zh-Hans.json` |

---

## 常见问题

**卡片能渲染但一片空白。** 多半是实体键名写错了 —— 不认识的键会被静默忽略。对照
`src/models/<型号>/index.ts` 里的 `ENTITY_SCHEMA` 检查，注意多目标型号用的是
`target_1_x_entity`，不是 `target1_x`。

**位置是镜像或旋转的。** 偏航角错了，回标签页 ② 重做。

**对角线上出现幽灵目标。** 按轴拆分的传感器更新不同步。改用 `frame_entity` 原子帧。

**融合视图提示后端版本过旧。** 卡片和集成独立发版，升级 mmwave-fusion 即可。卡片选择
直接拒绝，而不是半残地跑。

**融合编辑器里找不到某个型号。** 只测距的型号没有方向信息，无法融合。查
[型号表](./README_CN.md#支持的型号)的 `可融合` 一列。
