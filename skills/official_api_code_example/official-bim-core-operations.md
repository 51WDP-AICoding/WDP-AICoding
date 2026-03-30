# official-bim-core-operations（BIM 2.2.0 首批可用脚本摘录）

补充：BIM 全量分类请优先查看 `official-bim-full.md`。

来源：`wdpapidoc-admin` 后台（BIM API，`typeId=5`, `versionId=129`）  
整理原则：仅保留后台已确认的代码方法与最小可执行调用链。

## 1. 获取 BIM 模型列表

```javascript
const list = await App.DCP.GetModelList();
console.log("BIM model list:", list);
```

说明：
- 用于查询当前场景可用 BIM 模型清单。
- 常见返回字段可用于后续选择模型并加载（如模型标识、资源信息）。

## 2. 新增并加载 BIM 模型（Hierarchy）

```javascript
const entityObj = new App.Hierarchy({
  assetId: "your_asset_id",
  seedId: "your_seed_id",
  noFindHandle: true
});

await App.Scene.Add(entityObj);
```

参数说明：
- `assetId`: BIM 资源标识（由模型列表或业务配置提供）
- `seedId`: 种子标识（由资源发布侧提供）
- `noFindHandle`: 未找到处理句柄时是否忽略（通常可先 `true`）

## 3. 对象级基础行为（文档有定义，示例分散）

以下为 BIM 模型对象常见基础能力名称，用于后续子 skill 编排：

- `Update(...)`
- `SetRotator(...)`
- `SetScale3d(...)`
- `SetVisible(...)`
- `Get(...)`
- `Delete(...)`

说明：
- 这部分在后台多个条目中分散出现，后续按你的真实 case 再补全参数级示例。

## 最小链路建议

1. `GetModelList` 获取目标模型元数据  
2. `new App.Hierarchy({...})` 构造对象  
3. `App.Scene.Add(entityObj)` 加载入场景  
4. 再执行对象级行为（显隐、旋转、缩放、删除等）
