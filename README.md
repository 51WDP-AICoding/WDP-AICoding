# WDP AI Coding Knowledge

WDP（World Digital Platform）AI 编码知识库，包含 WDP 平台 API 技能文档、官方代码示例和前端框架示例工程。

## 📁 项目结构

```
WDP_AIcoding/
├── skills/                          # WDP API 技能文档
│   ├── official_api_code_example/   # 官方 API 代码示例
│   ├── wdp-api-bim-unified/         # BIM 统一 API
│   ├── wdp-api-camera-unified/      # 相机统一 API
│   ├── wdp-api-cluster/             # 集群 API
│   ├── wdp-api-coverings-unified/   # 覆盖物统一 API
│   ├── wdp-api-entity-general-behavior/  # 实体通用行为 API
│   ├── wdp-api-function-components/ # 功能组件 API
│   ├── wdp-api-general-event-registration/  # 通用事件注册 API
│   ├── wdp-api-generic-base-attributes/     # 通用基础属性 API
│   ├── wdp-api-initialization-unified/      # 初始化统一 API
│   ├── wdp-api-layer-models/        # 图层模型 API
│   ├── wdp-api-material-settings/   # 材质设置 API
│   ├── wdp-api-spatial-understanding/       # 空间理解 API
│   ├── wdp-context-memory/          # 上下文记忆
│   ├── wdp-css-layer-management/    # CSS 图层管理
│   ├── wdp-entry-agent/             # 入口代理
│   ├── wdp-intent-orchestrator/     # 意图编排器
│   ├── wdp-internal-case-acquisition/       # 内部案例获取
│   └── gis-api-core-operations/     # GIS API 核心操作
├── wdp-front-end-framework-sample/  # WDP 前端框架示例工程
└── README.md                        # 项目说明
```

## 🚀 快速开始

### 同步到远程仓库

本项目已配置推送到 GitHub 和 GitLab，**两个平台使用不同的默认分支名**：

| 平台 | 远程仓库名 | 默认分支 | 推送命令 |
|------|-----------|---------|---------|
| GitHub | `github` | `master` | `git push github master` |
| GitLab | `gitlab` | `main` | `git push gitlab master:main` |

#### 常用推送方式

```bash
# 方式1：分别推送（推荐，清晰可控）
git push github master        # 推送到 GitHub 的 master 分支
git push gitlab master:main   # 推送到 GitLab 的 main 分支

# 方式2：一键推送到两个平台
git push github master && git push gitlab master:main

# 方式3：使用 all 同时推送（注意：GitLab 需要显式指定 main 分支）
git push all master           # 推送到 GitHub master
git push all master:main      # 推送到 GitLab main
```

#### 查看远程仓库配置

```bash
git remote -v
```

输出示例：
```
github  https://github.com/51WDP-AICoding/WDP-AICoding.git (fetch)
github  https://github.com/51WDP-AICoding/WDP-AICoding.git (push)
gitlab  http://git.51vr.local/neon/wdp-ai-coding-knowledge.git (fetch)
gitlab  http://git.51vr.local/neon/wdp-ai-coding-knowledge.git (push)
```

### 查看技能文档

每个技能目录下包含 `SKILL.md` 文件，详细说明该技能的 API 使用方法、参数说明和示例代码。

### 运行示例工程

```bash
cd wdp-front-end-framework-sample
npm install
npm run dev
```

## 📚 技能分类

### 核心 API 技能

| 技能 | 说明 |
|------|------|
| `wdp-api-initialization-unified` | WDP 场景初始化、渲染器配置 |
| `wdp-api-camera-unified` | 相机控制、漫游、视角切换 |
| `wdp-api-spatial-understanding` | 空间信息获取、坐标系转换 |
| `wdp-api-entity-general-behavior` | 实体通用行为控制 |
| `wdp-api-general-event-registration` | 事件注册与监听 |

### 业务组件技能

| 技能 | 说明 |
|------|------|
| `wdp-api-bim-unified` | BIM 模型操作、房间高亮 |
| `wdp-api-coverings-unified` | 覆盖物（视频、粒子、特效等）|
| `wdp-api-layer-models` | 图层模型（静态、骨骼）|
| `wdp-api-material-settings` | 材质设置、贴图更换 |
| `wdp-api-function-components` | 功能组件（渲染模式等）|

### 系统技能

| 技能 | 说明 |
|------|------|
| `wdp-entry-agent` | 入口代理、初始化引导 |
| `wdp-intent-orchestrator` | 意图识别与编排 |
| `wdp-context-memory` | 上下文记忆管理 |
| `wdp-css-layer-management` | CSS 图层管理 |

## 🔄 更新日志

### 2026-04-03
- 官方 API 代码示例文档参数表格全面优化
- 新增实时视频、Window、POI、Particle、Effects 等参数描述表格
- 修复多个文件的参数表格格式

### 2026-03-26
- 渲染器与底层回调能力升级
- 补充 WebRTC 异常错误码对照表
- 新增网络状况诊断参数

### 2026-03-24
- 新增前端框架示例工程
- 新增 CSS 图层管理技能
- 修正多个 Skill 方法名对齐

## 🔗 远程仓库

- **GitHub**: https://github.com/51WDP-AICoding/WDP-AICoding.git
- **GitLab**: http://git.51vr.local/neon/wdp-ai-coding-knowledge.git

## 📝 贡献指南

1. 在 `skills/` 目录下添加新的技能文档
2. 更新 `official_api_code_example/` 中的官方代码示例
3. 在 `wdp-front-end-framework-sample/` 中添加示例代码
4. 提交前确保文档格式统一、链接正确

## 📄 许可证

All rights reserved. © 51World
