<div align="center">
  <img src="./assets/mmwave_logo.svg" alt="MMWave Logo" width="200"/>
  <h1>MMWave Radar HA Card</h1>
</div>

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/zomco/mmwave-card.svg)](https://github.com/zomco/mmwave-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[中文文档](./README_CN.md)

Multi-model millimeter-wave radar calibration & live visualization card for [Home Assistant](https://www.home-assistant.io/).

## What is this?

This Lovelace card provides a real-time, top-down map of your room, visualizing the exact location of targets detected by your mmWave radars. It includes built-in tools to easily calibrate your radar's orientation and define room boundaries, making smart home presence detection more accurate and intuitive than ever.

## Screenshots

<img src="./assets/screenshot-live.gif" alt="Live view panel" width="600">

_(Tab ① — Geometry & Boundary | Tab ② — Yaw Calibration | Tab ③ — Live View)_

## Quick Start (Out-of-the-Box)

### 1. Install via HACS (Recommended)

[![Open your Home Assistant instance and open a repository inside HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=zomco&repository=mmwave-card&category=plugin)

Alternatively: **HACS → Frontend → ⋮ → Custom repositories** → add this repo URL → category **Lovelace**.

### 2. Add to Dashboard

You can configure the card entirely through the Home Assistant UI! Just add a new card to your dashboard and search for **"MMWave Radar Card"**. The visual config editor includes a model-aware entity picker to help you set it up in seconds—**no YAML required**!

## Advanced Usage (DIY)

For advanced users who prefer YAML configuration, need to understand the underlying calibration parameters, or developers who want to add support for new radar models or build the card from source, please refer to our DIY documentation:

👉 **[Advanced Configuration & DIY Guide](./DIY.md)**

## Supported Models

| Model                                        | Freq   | Targets | Z axis | Breathing | Heart rate | Sleep |
| -------------------------------------------- | ------ | ------- | ------ | --------- | ---------- | ----- |
| [MicRadar R60ABD1](https://www.micradar.cn/) | 60 GHz | 1       | ✅     | ✅        | ✅         | ✅    |
| [Hi-Link LD2450](https://www.hlktech.net/)   | 24 GHz | 3       | ❌     | ❌        | ❌         | ❌    |

Adding a new model requires only creating one file — see [Adding a New Model](#adding-a-new-model).

---

## License

MIT © zomco
