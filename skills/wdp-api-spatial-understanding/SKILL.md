---
name: wdp-api-spatial-understanding
description: 处理 WDP 场景空间信息获取与坐标转换。用于场景启动后获取坐标系原点、实体列表、包围盒中心、相机位置，以及 GIS/Cartesian/屏幕坐标之间的互转；涉及空间定位、坐标系确认、取点交互时使用本技能。
---

# 📋 本文档职责范围

**本文档定位**：API Sub Skill - 能力描述与使用场景

**本文档职责**：
- ✅ 描述空间信息获取的能力范围（坐标系、实体列表、包围盒等）
- ✅ 说明坐标转换的功能分类和适用场景
- ✅ 描述取点交互的使用流程
- ✅ 列出空间理解操作的强制性要求和常见问题

**本文档不职责**：
- ❌ 不提供具体 API 的完整签名和返回结构（由 official-*.md 提供）
- ❌ 不提供可复制的代码示例（由 official-*.md 提供）

**代码生成前置要求**：
> 🚨 **必须阅读**：`../official_api_code_example/official-spatial-understanding.md`

---

# WDP 空间理解子技能

只负责空间信息读取与坐标转换，不负责实体创建和 UI 渲染。

## 强制性要求

1. 必须使用`new WdpApi()`创建实例
2. 必须显式调用`App.Renderer.Start()`
3. 必须注册场景就绪事件
4. 必须在场景就绪后才执行空间理解操作

⚠️ 如果上述任何一点不满足，空间理解相关代码将无法正常工作！

## 定位说明

本技能是**每次接入新渲染场景的强制步骤**，在 `OnWdpSceneIsReady && progress === 100` 后立即执行。
执行时机由 `wdp-api-initialize-scene` 的第6步触发，本技能负责具体实现。
探查结果作为后续所有业务 API 调用的空间基准，未完成探查前不得开始业务编码。

## 前置条件

1. `App` 初始化成功。
2. `Renderer.Start()` 成功。
3. 场景满足 `OnWdpSceneIsReady && progress === 100`。

---

## 1. 场景空间信息获取

**核心能力**：
- **获取坐标系原点**：`App.Scene.GetGlobal()` → `result.geoReference.origin`
- **获取当前相机位置**：`App.CameraControl.GetCameraPose()`
- **获取所有实体列表**：`App.Scene.GetAll()` / `App.Scene.GetByTypes()`
- **获取场景包围盒中心**：`App.Scene.GetBoundingBox(entities)`

> 📖 **完整 API 签名和返回结构**：参考 `../official_api_code_example/official-spatial-understanding.md`

---

## 2. 坐标转换

| 需求 | 调用方法 |
|------|----------|
| GIS → 世界坐标 | `App.Tools.Coordinate.GISToCartesian([[lng,lat,z]])` |
| 世界坐标 → GIS | `App.Tools.Coordinate.CartesianToGIS([[x,y,z]])` |
| 世界坐标 → 屏幕坐标 | `App.Tools.Coordinate.WorldPosToScreenPos([x,y,z])` |
| GIS → 屏幕坐标 | `App.Tools.Coordinate.GISToScreenPos([lng,lat,z])` |
| 坐标系互转 | `App.Tools.Coordinate.Exchange(fromCRS, toCRS, point)` |
| 批量高度基准转换 | `App.Tools.Coordinate.TransformPointsByCoordZRef({points, coordZRef, coordZOffset})` |

### 坐标格式说明
- **GIS 坐标**：`[lng, lat, z]`（经度、纬度、高度，单位：度/米）
- **Cartesian 坐标**：`[x, y, z]`（世界坐标，单位：米）
- **屏幕坐标**：`[x, y]`（像素）

> 📖 **完整 API 签名和返回结构**：参考 `../official_api_code_example/official-spatial-understanding.md`

---

## 3. 用户取点交互

**使用流程**：
1. **启动取点**：`App.Tools.PickerPoint.StartPickPoint(coordinateShow, iconShow, coordZRef)` (注意：参数缺一不可)
2. **监听事件**：注册 `PickPointEvent` 事件获取坐标
3. **结束取点**：`App.Tools.PickerPoint.EndPickPoint()`
4. **获取历史**：`App.Tools.PickerPoint.GetPickedPoints(coordZRef)`

**事件返回结构**：
- `res.result.location` - GIS 坐标 `[lng, lat, z]`
- `res.result.worldPos` - Cartesian 坐标 `[x, y, z]`

> 📖 **完整 API 签名和返回结构**：参考 `../official_api_code_example/official-spatial-understanding.md`

---

## 4. 高频问题


| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 坐标转换结果偏移 | 源坐标系不正确（国内地图常见 GCJ02 偏移） | 使用 `Exchange('GCJ02', 'WGS84', point)` 纠偏 |
| GetBoundingBox 返回空 | 传入的实体数组为空或包含不支持类型 | 确认实体数组非空；过滤 Group 等不参与计算的实体 |
| PickPointEvent 未触发 | 未启动取点工具或事件未注册 | 确认 `StartPickPoint()` 已调用；确认事件在 `Renderer.Start()` 后注册 |
| GetAll 返回空列表 | 场景未完全加载或缓存设置问题 | 确认 `progress === 100`；检查初始化时 `bCached` 设置 |
| GetGlobal() 没有实体数据 | `App.Scene.GetGlobal()` 仅获取场景全局配置（坐标系原点、相机初始位置），**不包含实体列表** | 获取实体列表请使用 `GetAll()` 或 `GetByTypes([...])` |


---

## 5. 参考资料

**代码生成前必须阅读**：
- `../official_api_code_example/official-spatial-understanding.md` - 空间理解 API 完整文档（真值来源）

**相关能力**：
- `../official_api_code_example/official-scene-camera.md` - 相机方法真值来源
- `../wdp-api-initialization-unified/SKILL.md` - 场景初始化
