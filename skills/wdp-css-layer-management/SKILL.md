---
name: wdp-css-layer-management
description: WDP 数字孪生项目的 CSS 层叠管理规范。用于防止多模块 fixed 全屏层的 z-index 冲突和 pointer-events 穿透失效。非 API 域技能，不由 entry-agent 路由自动调度，按需显式引用。
---

# WDP CSS 层叠管理

数字孪生项目普遍采用"3D 场景 + 多模块 UI 覆盖层"架构，每个模块通常有自己的 `position: fixed; inset: 0` 全屏容器配合 `pointer-events: none/auto` 穿透模式。当多个这样的层共存时，缺少 z-index 管理会导致事件被上层透明层拦截。

## 核心规则

1. 所有模块级全屏容器**必须**声明 z-index
2. 遵循全局 z-index 层级表（见下）
3. pointer-events 穿透模式必须使用标准结构

## z-index 层级表

| 层级 | z-index 范围 | 用途 | 示例 |
|------|-------------|------|------|
| 场景层 | 0-9 | 3D 渲染容器 | `#player` |
| UI 基础层 | 10-19 | UI 总容器 | `.ui-layer` |
| 模块容器层 | 20-29 | 各功能模块全屏容器 | SpaceManager, DeviceManager |
| 全局覆盖层 | 100-199 | 始终存在的 UI（导航栏等） | NavBar, LoadingOverlay |
| 模态框层 | 1000+ | 弹窗、确认框 | `.modal-overlay` |

## 标准穿透结构

```css
.module-container {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  z-index: 20; /* 必须声明！ */
}
.module-container > * {
  pointer-events: auto;
}
```

## 典型错误

```
.ui-layer (z-index: 10, pointer-events: none)
  ├─ NavBar .nav-wrapper (z-index: 100, fixed, 全屏, pointer-events: none)
  └─ ModuleA .module-container (无 z-index, fixed, 全屏)  ← 被 NavBar 遮挡
       └─ .panel (pointer-events: auto)                   ← 点击无效！
```

## 高频问题排查

| 现象 | 排查方向 |
|------|---------|
| 模块内面板点击无效 | 检查模块容器是否缺少 z-index |
| 模态框被遮挡 | 检查 z-index 是否达到 1000+ |
| 3D 场景无法交互 | 检查是否有 UI 层未设置 pointer-events: none |
| 悬浮提示被截断 | 检查父容器是否有 overflow: hidden |
| 多模块层叠时下层不可见 | 检查各层 z-index 是否在层级表中有对应位置 |

## 使用方式

本技能不由 `wdp-entry-agent` 路由自动调度。当以下场景出现时，按需显式引用：

- 用户反馈"UI 点击无效"、"弹窗被遮挡"、"3D 场景无法交互"
- 生成包含多模块 UI 覆盖层的完整项目代码时
- 排查前端布局问题时