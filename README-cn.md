<div align="center">
  <img src="../../assets/mmwave_logo.svg" alt="MMWave Logo" width="200"/>
  <h1>MMWave Radar HA Card</h1>
</div>

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/zomco/mmwave-card.svg)](https://github.com/zomco/mmwave-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[English](./README.md)

适用于 [Home Assistant](https://www.home-assistant.io/) 的多型号毫米波雷达校准与实时可视化卡片。

## 这是什么？
这款 Lovelace 卡片为您提供房间的实时俯视图，直观显示毫米波雷达探测到的目标确切位置。它内置了简易工具，可帮助您轻松校准雷达的安装方向并定义房间边界，让智能家居的存在检测变得前所未有的精准和直观。

## 演示效果

<img src="docs/screenshot-live.png" alt="Live view panel" width="600">

*(Tab ① — 几何与边界 | Tab ② — 偏航校准 | Tab ③ — 实时视图)*

## 快速开始（开箱即用）

### 1. 通过 HACS 安装（推荐）

[![Open your Home Assistant instance and open a repository inside HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=zomco&repository=mmwave-card&category=plugin)

或者：**HACS → 侧边栏 Frontend → ⋮ → 自定义仓库** → 添加本仓库 URL → 类别选择 **Lovelace**。

### 2. 添加到仪表板

您可以完全通过 Home Assistant UI 来配置卡片！只需在仪表板中添加一张新卡片并搜索 **"MMWave Radar Card"**。可视化配置编辑器包含智能的实体选择器，几秒钟即可完成设置——**完全不需要编写 YAML**！

## 进阶使用（DIY）

对于偏好 YAML 配置的高级用户、需要了解底层校准参数原理的用户，或者想要添加新雷达型号支持、从源码构建卡片的开发者，请参阅我们的 DIY 文档：

👉 **[进阶配置与 DIY 指南](./DIY-cn.md)**

## 支持的型号

| 型号 | 频率 | 目标数 | Z 轴 | 呼吸 | 心率 | 睡眠 |
|---|---|---|---|---|---|---|
| [MicRadar R60ABD1](https://www.micradar.cn/) | 60 GHz | 1 | ✅ | ✅ | ✅ | ✅ |
| [Hi-Link LD2450](https://www.hlktech.net/) | 24 GHz | 3 | ❌ | ❌ | ❌ | ❌ |

## 许可证
MIT © zomco
