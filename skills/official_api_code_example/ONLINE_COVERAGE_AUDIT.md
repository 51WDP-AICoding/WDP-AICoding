# WDP API Online Coverage Audit

Last verified: 2026-03-09

## 在线文档访问指南

### 访问方式

**重要**：访问在线文档**不需要 MCP 工具**，直接使用 HTTP API 即可。

### API 端点

```bash
# 1. 获取 API 类型列表
GET https://wdpapidoc.51aes.com/api/backend/web/type/list

# 2. 获取分类列表（需要 POST）
POST https://wdpapidoc.51aes.com/api/backend/web/api/category
Content-Type: application/json
Body: {"typeId": 5}  // 5 = BIM API

# 3. 获取具体 API 内容（最常用）
GET https://wdpapidoc.51aes.com/api/backend/web/api/info?id={topicId}
```

### 使用示例

```bash
# 获取构件高亮 API 内容（BIM API）
curl -s "https://wdpapidoc.51aes.com/api/backend/web/api/info?id=1509"

# 使用 PowerShell
Invoke-RestMethod -Uri "https://wdpapidoc.51aes.com/api/backend/web/api/info?id=1509"
```

### 注意事项

1. **不需要 Token**：公共 API 端点不需要认证
2. **返回格式**：JSON 格式，包含 `data.itemList` 数组
3. **内容类型**：itemList 包含代码示例和参数表格（HTML 格式）

## API 类型与 Topic ID 范围

| API 类型 | typeId | Topic ID 范围 | 说明 |
|----------|--------|---------------|------|
| WDP API | 1 | 1369-1436 | 核心 WDP 能力 |
| GIS API | 2 | 1437-1474 | GIS 图层与操作 |
| BIM API | 5 | 1475-1800+ | 模型/构件/空间（含 2.2.0 新增 1700+） |

> **注意**：Topic ID 范围可能随版本更新扩展，建议搜索时覆盖更大范围（如 1400-2000）

### BIM API 常用 Topic ID

| ID | 名称 | 方法 |
|----|------|------|
| 1475 | 通用事件监听 | RegisterEvent |
| 1476 | BIM事件监听 | OnMouseEnterComponent |
| 1477 | 安装部署 | Plugin.Install |
| 1478 | 属性获取 | entity.Get |
| 1479 | 设置全局高亮样式 | SetNodeDefaultHighLightStyle |
| 1480 | 获取全局高亮样式 | GetNodeDefaultHighLightStyle |
| 1481 | 获取模型列表 | GetModelList |
| 1482 | 新加载模型 | App.Hierarchy |
| 1483 | 模型临时加载卸载 | Update tempLoad |
| 1484 | 根据metadata获取案例内模型 | GetModelsByMetadata |
| 1485 | 激活模型 | Active |
| 1486 | 模型移动 | SetLocation |
| 1487 | 模型旋转 | SetRotator |
| 1488 | 模型缩放 | SetScale3d |
| 1489 | 模型聚焦 | SetFocus |
| 1490 | 模型显隐 | SetVisible |
| 1491 | 模型落地 | SetGround |
| 1492 | 剖切开启 | StartModelSection |
| 1493 | 剖切重置 | ResetModelSection |
| 1494 | 剖切关闭 | EndModelSection |
| 1495 | 开启拆楼 | StartBuildingLayer |
| 1496 | 模型卸载 | Delete |
| 1497 | 关闭拆楼 | EndBuildingLayer |
| 1498 | 获取构件树 | GetNodeTree |
| 1499 | 构件树搜索 | GetNodeTreeBySearch |
| 1500 | 构件列表搜索 | GetNodeListBySearch |
| 1501 | 获取构件属性 | GetNodeInfo |
| 1502 | 通过节点ID获取构件树 | GetNodeTreeById |
| 1503 | 获取父级节点ID | GetNodeParentId |
| 1504 | 根据属性获取案例内构件 | GetNodesByProperties |
| 1505 | 构件聚焦 | SetNodeFocus |
| 1506 | 构件显隐 | SetNodeVisibility |
| 1507 | 构件反选显隐 | SetOtherNodesVisibility |
| 1508 | 构件全部显示 | SetNodeShowAll |
| 1509 | 构件高亮 | SetNodeHighLight |
| 1510 | 获取构件坐标 | GetNodeCoord |
| 1511 | 构件移动 | SetNodeLocation |
| 1512 | 根据Room属性获取空间 | GetByProperties |
| 1513 | 高亮空间 | SetRoomHighLight |
| 1514 | 聚焦空间 | SetRoomFocus |
| 1515 | 版本历史 | - |

## Scope

- Local files: `skills/official_api_code_example/official-*.md`
- Sync helper: `skills/official_api_code_example/sync_public_official_excerpts.ps1`
- Online sources:
  - `https://wdpapidoc.51aes.com/apifunc/wdpapi`
  - `https://wdpapidoc.51aes.com/api/backend/web/type/list`
  - `https://wdpapidoc.51aes.com/api/backend/web/api/category`
  - `https://wdpapidoc.51aes.com/api/backend/web/api/info?id=<childTopicId>`

## Verification rule

- Version baseline:
  - WDP API `2.3.0`
  - GIS API `2.1.0` (2026.03.26)
  - BIM API `2.2.0` (2026.03.26)
- Method extraction rule:
  - Count only callable entries matching `App...(` inside code blocks
- Verification standard:
  - `missing=0`
  - `extra=0`

## Final result

- Category-level coverage: aligned
- Method-level coverage: aligned
- WDP / GIS / BIM local excerpt files are now aligned with the public online docs under the current extraction rule

## WDP API 2.3.0

1. `official-general-event-registration.md`
- online `15`
- local `15`
- missing `0`
- extra `0`

2. `official-initialize-scene.md`
- online `9`
- local `9`
- missing `0`
- extra `0`

3. `official-scene-camera.md`
- online `35`
- local `35`
- missing `0`
- extra `0`

4. `official-generic-base-attributes.md`
- online `37`
- local `37`
- missing `0`
- extra `0`

5. `official-entity-general-behavior.md`
- online `63`
- local `63`
- missing `0`
- extra `0`

6. `official-entity-coverings.md`
- online `38`
- local `38`
- missing `0`
- extra `0`

7. `official-layer-models.md`
- online `15`
- local `15`
- missing `0`
- extra `0`

8. `official-material-settings.md`
- online `9`
- local `9`
- missing `0`
- extra `0`

9. `official-cluster.md`
- online `14`
- local `14`
- missing `0`
- extra `0`

10. `official-function-components.md`
- online `52`
- local `52`
- missing `0`
- extra `0`

## GIS API 2.1.0

- file: `official-gis-full.md`
- online `22`
- local `22`
- missing `0`
- extra `0`

## BIM API 2.2.0

- file: `official-bim-full.md`
- online `28` (新增批量构件专题高亮 SetNodesHighlight)
- local `28`
- missing `0`
- extra `0`

### 版本历史

**Version 2.2.0** (2026.03.26)
1. 新增 SetNodesHighlight 方法，支持批量构件专题高亮
2. 修复 bim 构件高亮时对构件原有材质纹理的显示问题
3. 优化构件激活性能，降低构件激活时间

**Version 2.1.1** (2026.01.30)
1. 新增模型构件点击事件 OnNodeClicked，废弃原 OnComponentClicked 事件
2. 优化模型构件无感知自动激活的异常行为
3. 修复模型构件移走/隐藏后，碰撞检测仍停留在原位置的问题

**Version 2.1.0** (2025.12.19)
1. BIMAPI 整体优化
2. 新增拆分拆楼 API，弃用原有拆楼 API
3. 优化高亮多个构件，关闭高亮会重置为默认颜色问题

### 新增方法

| ID | 名称 | 方法 | 版本 |
|----|------|------|------|
| 1738 | 批量构件专题高亮 | SetNodesHighlight | 2.2.0 |
| 1737 | 版本历史 | - | 2.2.0 |

> 注意：新版本的 BIM API topic ID 范围已扩展到 1700-1739，与旧版本 1475-1515 并存

## Current totals

- global unique callable entries across all `official-*.md`: `239`
- per-file unique method sum: `339`

## Notes

- The five WDP excerpt files that previously lagged behind the online docs were regenerated from the public child-topic detail endpoints:
  - `official-entity-general-behavior.md`
  - `official-entity-coverings.md`
  - `official-layer-models.md`
  - `official-material-settings.md`
  - `official-function-components.md`
- The sync script intentionally focuses on method-level code excerpts. It does not fully mirror tables, images, or all rich-text parameter descriptions.
- If the online docs change again, rerun:

```powershell
powershell -ExecutionPolicy Bypass -File .\skills\official_api_code_example\sync_public_official_excerpts.ps1
```
