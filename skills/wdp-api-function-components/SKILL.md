---
name: wdp-api-function-components
description: 处理 WDP 功能组件域 API 的实现与排障。用于环境控制、工具类能力、控件与设置、屏幕拾取、DOM 坐标绑定、AssetLoader、DaaS 等功能实现；涉及天气、坐标工具、屏幕工具和系统设置时使用本技能。
---

# 📋 本文档职责范围

**本文档定位**：API Sub Skill - 能力边界与使用场景说明

**本文档职责**：
- ✅ 描述功能组件域的能力边界和问题分类
- ✅ 说明该域与 coverings / cluster / spatial-understanding 等相邻技能的边界
- ✅ 提供强制性约束、常见误用和验证要点
- ✅ 指引你去正确的 official 文档查真实 API

**本文档不负责**：
- ❌ 不提供具体 API 的完整签名和返回结构（由 official-*.md 提供）
- ❌ 不提供可复制的代码示例（由 official-*.md 提供）
- ❌ 不允许基于"通用组件心智"抽象出并不存在的 Create / Destroy API

**代码生成前置要求**：
> 🚨 **必须阅读**：`../official_api_code_example/official-function-components.md`

---

# WDP 功能组件子技能

## 适用范围

本技能处理的是 **环境 / 控件 / 工具 / 设置** 一类的功能组件域，典型包括：

- 环境控制：天气、光照时间、场景风格
- 控件与系统信息：API 信息、插件信息、渲染状态、快照
- 坐标与拾取工具：坐标转换、屏幕取点、取线、测量、剖切、CAD 地理参考
- 屏幕与辅助组件：MiniMap、Compass、ChinaMap、DOM 坐标绑定
- 资源与数据：AssetLoader、DaaS 云盘文件列表

> 📖 真实方法名、参数结构、取值范围一律以 `../official_api_code_example/official-function-components.md` 为准。

---

## 🚨 强制性要求

1. 🚨 **必须在 `App` 已初始化且渲染可用后再进入本技能域**
2. 🚨 **依赖场景状态的功能必须在 `SceneReady(100%)` 后执行**
3. 🚨 **必须使用 official 文档中的真实方法名，禁止按通用经验抽象方法**
4. 🚨 **涉及枚举值、坐标类型、屏幕坐标、颜色格式时必须查 official 文档确认**
5. 🚨 **涉及屏幕绑定、取点、测量、剖切等交互工具时，必须同时考虑退出/关闭路径**

---

## ❌ 严禁事项

### 禁止虚构"通用组件 API"

以下写法**不能作为本技能的默认心智模型**：

- `App.Weather.Create(opt)`
- `App.Water.Create(opt)`
- `App.SkyBox.Create(opt)`
- `App.ParticleEffect.Create(opt)`
- `App.PostProcess.Create(opt)`

这些名字在当前 official 文档中**并未作为本技能域的通用真值接口被确认**。  
如果需求是"天气切换""场景风格化""测量工具""屏幕坐标绑定"等，必须去 official 文档查真实 API。

### 禁止把"功能组件域"误当成"覆盖物创建域"

以下需求**不要默认留在本技能处理**：

- 创建 `Poi / Window / Path / Range / HeatMap / Particle / Effects`
- 创建实时视频、3D 文本、可视域等场景实体

这些更应优先路由到：
- `../wdp-api-coverings-unified/SKILL.md`

### 禁止把聚合展示误归到本技能

如果需求核心是：
- DaaS 点位聚合
- 聚合样式配置
- 周边搜索

优先路由到：
- `../wdp-api-cluster/SKILL.md`

### 禁止忽略关闭/清理路径

以下功能不能只写"开启"，不写"关闭"：

- MiniMap / Compass
- PickerPoint / PickerPolyline / Measure / Section
- ScreenPosBound
- ChinaMap 高亮 / 迁徙图

---

## 与相邻技能的边界

### 本技能负责

- **环境切换**：`GetSceneWeather / SetSceneWeather / GetSkylightTime / SetSkylightTime`
- **场景风格化**：`SetSceneStyle`（comic/sketch/dark/ashy/false）
- **系统与渲染信息**：`GetInfomation / Plugin.Get / GetStats / GetSnapshot`
- **坐标与拾取**：GIS / Cartesian / Screen 坐标互转，取点、取线、拾取
- **坐标几何辅助**：`StartShowCoord / EndShowCoord`
- **工具类能力**：测量、剖切、ChinaMap、MiniMap、Compass
- **DOM 坐标绑定**：ScreenPosBound
- **资源查询**：AssetLoader、DaaS 文件列表

### 工具类方法索引

| 工具 | 开启/创建方法 | 关闭/清理方法 | 说明 |
|------|-------------|-------------|------|
| **剖切体** | `App.Scene.Section.Start({coordZRef, transform})` | `App.Scene.Section.End()` | 场景剖切分析，coordZRef: surface/ground/altitude |
| **测量** | `App.Tools.Measure.Start()` | `App.Tools.Measure.End()` | 距离/面积测量 |
| **取点** | `App.Tools.PickerPoint.Start()` | `App.Tools.PickerPoint.End()` | 屏幕取点 |
| **取线** | `App.Tools.PickerPolyline.Start()` | `App.Tools.PickerPolyline.End()` | 屏幕取线 |
| **MiniMap** | `App.Tools.MiniMap.Start()` | `App.Tools.MiniMap.End()` | 小地图 |
| **Compass** | `App.Tools.Compass.Start()` | `App.Tools.Compass.End()` | 指南针 |
| **ChinaMap** | `App.Tools.ChinaMap.Start()` | `App.Tools.ChinaMap.End()` | 中国地图 |
| **CoordAide** | `App.Tools.CoordAide.Display({entity, coordZRef, coordZ})` | `App.Tools.CoordAide.Clear()` | 坐标轴辅助标注 |

#### Picker 拾取工具方法索引

| 方法 | 说明 |
|------|------|
| `PickByScreenPos([x, y])` | 屏幕坐标拾取实体及世界坐标 |
| `PickWorldPointByScreenPos([x, y])` | 拾取世界坐标点（不关心实体） |
| `PickAesTilesNodeByScreenPos([x, y], types, bMultiple)` | 拾取底板节点 |
| `PickAesTilesNodesByRectangle({startPos, endPos, types})` | 框选底板节点 |
| `PickEntityByRectangle({startPos, endPos, types})` | 框选实体 |
| `PickMaterialByScreenPos({screenPos})` | 拾取材质信息 |
| `GetEntitiesInViewport(types, bVisibleOnly)` | 获取视口内实体 |
| `StartRectPick({onPick})` | 开始矩形拾取模式 |
| `EndRectPick()` | 结束矩形拾取模式 |

#### Shape 形状工具方法索引

| 方法 | 说明 |
|------|------|
| `UpdateShapePoints(points)` | 批量更新形状点位 |
| `RangePickShapePoints(startPos, endPos, mode)` | 框选形状点，mode: New/Add/Remove |

### 数据模型方法索引

| 模块 | 方法 | 说明 |
|------|------|------|
| **AssetLoader** | `LoadAssetById(assetId)` | 按资产 ID 加载模型资产 |
| **AssetLoader** | `ReplaceAssetById(entityObj, newAssetId)` | 替换场景中实体的资产 |
| **AssetLoader** | `GetMeshSizeById(assetId)` | 获取资产模型的网格尺寸 |
| **Geometry** | `StartShowCoord(coords, type)` | 开启坐标点辅助显示，type: surface/absolute |
| **Geometry** | `EndShowCoord()` | 关闭坐标点辅助显示 |
| **DaaS** | `GetCloudDiskFileList(params)` | 获取云盘文件列表，支持分类/格式/排序过滤 |

### 系统与设置方法索引

| 模块 | 方法 | 说明 |
|------|------|------|
| **Customize** | `RunCustomizeApi(jsondata)` | 运行自定义 API 命令 |
| **Debug** | `SetLogMode(mode)` | 设置日志模式：none/normal/high |
| **Setting** | `SetEditShapeActionSetting(options)` | 设置编辑形状动作参数 |
| **Setting** | `SetAudioVolume(volume)` | 设置音量 [0-100] |
| **Setting** | `SetScreenPercentage(percentage)` | 设置场景渲染精度 |
| **Setting** | `GetScreenPercentage()` | 获取场景渲染精度 |
| **Plugin** | `Get()` | 获取已安装插件列表 |
| **Plugin** | `SetEnable(pluginId, bEnable)` | 启用/禁用插件 |
| **System** | `GetInfomation()` | 获取系统信息 |

> 📖 **完整工具 API 签名**：参考 `../official_api_code_example/official-function-components.md`

### 不由本技能主负责

- 场景实体创建与显隐：`wdp-api-coverings-unified`
- 实体通用检索 / 删除 / Bound 行为：`wdp-api-entity-general-behavior`
- 空间理解和坐标推导策略：`wdp-api-spatial-understanding`
- 聚合专题：`wdp-api-cluster`

---

## 标准流程

1. **先判断问题是否真的属于功能组件域**
- 天气、工具、设置、屏幕绑定、拾取、快照等留在本域
- 覆盖物创建、路径运动、实体控制则转到相邻 skill

2. **读取 official 文档确认真实 API**
- 尤其确认方法名、参数顺序、枚举值、返回字段

3. **确认前置条件**
- 是否要求 `SceneReady(100%)`
- 是否需要已有实体对象、已有屏幕坐标、已有资源 ID

4. **补齐关键参数**
- 天气名称、时间值、屏幕坐标、DOM 绑定点位、资源 ID、颜色格式、坐标参考系

5. **补齐关闭/回滚路径**
- 明确 End / Remove / Stop / 解绑步骤

6. **验证结果**
- 看 API 返回值
- 看屏幕可视化效果
- 看是否可重复开启/关闭而不残留状态

---

## 高频问题

### 1. 天气切换写了能运行但天气名不对
- 原因：凭经验填了枚举值，未查 official 参数表
- 处理：到 `official-function-components.md` 核对 `SetSceneWeather` 参数 1 的真实可选值

### 2. 坐标转换结果不对
- 原因：混用了 GIS / Cartesian / Screen 坐标，或高度参考系理解错误
- 处理：先确认输入坐标类型，再确认是否需要 `surface / ground / altitude`

### 3. 工具开启后无法退出
- 原因：只实现了 Start，没有实现 End / Remove
- 处理：编码时必须成对检查启停 API

### 4. 把实体创建误写进功能组件域
- 原因：把天气/工具类 API 和场景覆盖物 API 混在一起
- 处理：凡是 `new App.Poi / Window / Path / Particle / Effects` 这类实体创建，优先转 coverings

### 5. 只看 Console，不做显性验证
- 原因：没有观察 UI 或可视结果
- 处理：至少验证一个用户可见信号，例如天气变化、工具 UI、绑定后的 DOM 跟随、快照结果

---

## 验证要点

1. 天气 / 光照 / 风格切换后，场景有可见变化
2. 屏幕拾取或取点工具返回的数据结构符合 official 文档
3. MiniMap / Compass / Measure / Section 等工具可以正常关闭
4. ScreenPosBound 在更新和移除后，DOM 跟随状态正确变化
5. AssetLoader / DaaS 返回值中关键字段可被后续业务消费

---

## 参考资料（相对路径）

- `../official_api_code_example/official-function-components.md`
- `../wdp-api-coverings-unified/SKILL.md`
- `../wdp-api-cluster/SKILL.md`
- `../wdp-api-spatial-understanding/SKILL.md`

---

## 输出要求

始终输出：
1. 功能组件问题分类
2. 已查阅的 official 参考文件
3. 前置条件与关键参数摘要
4. 调用链路与影响范围
5. 验证步骤与通过标准
6. 关闭/回滚路径
