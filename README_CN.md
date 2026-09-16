<div align="center">
  <img src="./assets/mmwave_logo.svg" alt="MMWave Logo" width="200"/>
  <h1>MMWave Radar HA Card</h1>
</div>

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/zomco/mmwave-card.svg)](https://github.com/zomco/mmwave-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[English](./README.md)

[Home Assistant](https://www.home-assistant.io/) 毫米波雷达校准与实时可视化卡片，
支持 16 款雷达型号。

## 这是什么

一张房间俯视图，显示人实际在哪；以及把这张图变准的工具 —— 你告诉卡片雷达装在哪、朝哪，
画出房间边界，它就把雷达的原始输出换算成真实房间坐标。

这张卡片也是整个项目**唯一的用户界面**：校准在这里做，ESPHome 固件和融合集成都不自带界面。

<img src="./assets/screenshot-live.gif" alt="Live view panel" width="600">

_(标签页 ① —— 几何与边界 | 标签页 ② —— 偏航校准 | 标签页 ③ —— 实时视图)_

---

## 快速开始

### 1. 通过 HACS 安装

[![Open your Home Assistant instance and open a repository inside HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=zomco&repository=mmwave-card&category=plugin)

或者：**HACS → 前端 Frontend → ⋮ → 自定义仓库** → 添加本仓库 URL → 类别选
**Lovelace**。装完重启 Home Assistant。

### 2. 添加到面板

编辑任意面板 → **添加卡片** → 搜索 **MMWave Radar Card**。在下拉框里选型号，编辑器会
按型号列出需要的实体选择器，并已过滤好候选项。**完全不用写 YAML。**

### 3. 校准

按顺序做完三个标签页 —— 这一步决定坐标有没有意义，也是最多人跳过的一步：

| 标签页       | 做什么                                       | 为什么                                               |
| ------------ | -------------------------------------------- | ---------------------------------------------------- |
| ① 几何与边界 | 填写雷达位置（离墙角多少厘米），拖出房间轮廓 | 轮廓外的目标不再触发存在检测 —— 这就是穿墙幽灵的解法 |
| ② 偏航校准   | 站在相距两米以上的两个已知点                 | 解算雷达朝向                                         |
| ③ 实时视图   | 走动几步看那个点                             | 验证前两步                                           |

点是镜像的说明偏航角差 180°；点和你的移动方向成直角说明差 90°。这时回标签页 ② 重做，
不要手动去凑数值。

> **还没烧固件？** 完整流程（接线 → 浏览器烧录 → 装这张卡片）见
> [新手上手指南](https://github.com/zomco/mmwave-component/blob/main/GETTING-STARTED_CN.md)。

---

## 支持的型号

已注册 16 个适配器。只测距的型号只有距离没有方向，所以渲染成一段圆弧而不是一个点，
也无法参与多雷达融合。

| 型号                                            | 频率   | 目标数 | 量程  | 视场角 | Z 轴 | 呼吸 | 心率 | 睡眠 | 可融合 |
| ----------------------------------------------- | ------ | ------ | ----- | ------ | ---- | ---- | ---- | ---- | ------ |
| [MicRadar R60ABD1](https://www.micradar.cn/)    | 60 GHz | 1      | 2.5 m | 40°    | ✅   | ✅   | ✅   | ✅   | ✅     |
| [Hi-Link LD2450](https://www.hlktech.net/)      | 24 GHz | 3      | 6 m   | 120°   | ❌   | ❌   | ❌   | ❌   | ✅     |
| Hi-Link LD2451                                  | 24 GHz | 3      | 100 m | 30°    | ❌   | ❌   | ❌   | ❌   | ✅     |
| Hi-Link LD2452                                  | 24 GHz | 3      | 6 m   | 120°   | ❌   | ❌   | ❌   | ❌   | ✅     |
| Hi-Link LD2453                                  | 24 GHz | 3      | 6 m   | 80°    | ❌   | ❌   | ❌   | ❌   | ✅     |
| Hi-Link LD2454                                  | 24 GHz | 3      | 6 m   | 120°   | ❌   | ❌   | ❌   | ❌   | ✅     |
| Hi-Link LD6002                                  | 60 GHz | 1      | 6 m   | 120°   | ❌   | ✅   | ✅   | ❌   | ❌     |
| Hi-Link LD2410                                  | 24 GHz | 1      | 8 m   | 120°   | ❌   | ❌   | ❌   | ❌   | ❌     |
| Hi-Link LD2410B                                 | 24 GHz | 1      | 6 m   | 120°   | ❌   | ❌   | ❌   | ❌   | ❌     |
| Hi-Link LD2410C                                 | 24 GHz | 1      | 8 m   | 120°   | ❌   | ❌   | ❌   | ❌   | ❌     |
| Hi-Link LD2411                                  | 24 GHz | 1      | 6 m   | 40°    | ❌   | ❌   | ❌   | ❌   | ❌     |
| Hi-Link LD2411S                                 | 24 GHz | 1      | 6 m   | 45°    | ❌   | ❌   | ❌   | ❌   | ❌     |
| Hi-Link LD2412                                  | 24 GHz | 1      | 9 m   | 150°   | ❌   | ❌   | ❌   | ❌   | ❌     |
| Hi-Link LD2420                                  | 24 GHz | 1      | 8 m   | 120°   | ❌   | ❌   | ❌   | ❌   | ❌     |
| Hi-Link LD2450A                                 | 24 GHz | 1      | 2 m   | 120°   | ❌   | ❌   | ❌   | ❌   | ❌     |
| [Ai-Thinker RD03E](https://www.ai-thinker.com/) | 24 GHz | 1      | 6 m   | 40°    | ❌   | ❌   | ❌   | ❌   | ❌     |

各型号的 YAML 配置说明见 `docs/<型号>/README_CN.md`。

新增一个型号只需要一个新文件加一行注册 —— 见 DIY 指南的
[新增雷达型号](./DIY_CN.md#新增雷达型号)。

---

## 多雷达融合（可选，实验性）

**单雷达无需任何额外安装，本卡片即可完整使用。**

如果要用多台雷达覆盖同一空间，并且需要轨迹持久化、区域事件和摄像头录像，那还需要装
**[mmwave-fusion](https://github.com/zomco/mmwave-fusion)** 集成 —— 它在 HACS 中是
独立的一项，类别为 **integration**。

未安装时，卡片仍会渲染融合视图，但融合只发生在浏览器内、不保存任何数据 —— 此时卡片会
明确提示"未安装融合集成"，而不是假装一切正常。

两者独立发版，因此集成会在每次推送里带上 `api_version`，卡片发现后端版本低于所需时会
直接提示升级。

可视化编辑器把雷达绑定、精确安装数值和共享 3D 安装场景合并在同一个配置步骤中，并以雷达
TAB 分页；当前 TAB 只显示一台雷达的表单和同步 3D 模型，添加雷达会创建并选中新 TAB。随后，
联合方向校准会引导测试人员依次走到户型图上的固定采集区域：灰色表示尚未采集，彩色分段
表示对应雷达已经获得稳定样本，蓝色外圈表示下一个推荐位置。只有每台雷达都拥有至少 3 个
参考点、自身参考点跨度达到 120 cm 且残差不超过 40 cm 时，才允许应用校准结果。
在手机宽度下，校准面板提供移动专注模式：当前区域指引固定在顶部，大尺寸采集按钮固定在
底部安全区上方，实时进度就地更新，采集点与拟合诊断则默认折叠。这样测试人员可以单手持机
边走边完成采集，需要排查时再展开完整结果。
完成至少 3 点采集后，结果区会逐台对比当前 X/Y/yaw、拟合参考值和建议手动调整量；未通过的
拟合会标为低可信度并说明具体原因，便于先核对安装参数再重采，而不会把异常参考值自动写入配置。

融合状态、回放、热力图、覆盖范围和在线雷达数统一显示在户型画布外的工具栏中，不再遮挡
部署在边界上的雷达标识。

---

## 文档导航

| 你的身份             | 该看                                                                                      |
| -------------------- | ----------------------------------------------------------------------------------------- |
| 第一次安装           | [新手上手指南](https://github.com/zomco/mmwave-component/blob/main/GETTING-STARTED_CN.md) |
| 用 YAML 配置卡片     | [DIY_CN.md](./DIY_CN.md)                                                                  |
| 查某个型号的实体     | `docs/<型号>/README_CN.md`                                                                |
| 新增型号或从源码构建 | [DIY_CN.md](./DIY_CN.md#新增雷达型号)                                                     |
| 你是 AI 助手         | [AGENTS.md](./AGENTS.md)                                                                  |

## 相关仓库

| 仓库                                                          | 是什么        | 要装吗                             |
| ------------------------------------------------------------- | ------------- | ---------------------------------- |
| [mmwave-component](https://github.com/zomco/mmwave-component) | ESPHome 固件  | 要 —— 设备端。                     |
| **mmwave-card**（本仓库）                                     | Lovelace 卡片 | 要 —— 唯一的界面，校准也在这里做。 |
| [mmwave-fusion](https://github.com/zomco/mmwave-fusion)       | HA 集成       | 只有多雷达融合才需要，实验性。     |

---

## 许可证

MIT © zomco
