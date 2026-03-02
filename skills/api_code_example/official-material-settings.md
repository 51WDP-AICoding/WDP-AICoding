# 官方脚本摘录（新版后台）：材质设置

版本基线：WDP API 2.2.1  
来源：wdpapidoc 后台接口（分类：材质设置，子项 id: 1401/1402）

## 使用说明
- 本文件用于本地快速编码，减少重复在线查询。
- 若线上文档与本文件不一致，以线上发布口径为准。
- 不在仓库保存后台 token。

## 模型材质替换（id: 1401）

### 创建材质实例

```javascript
const material = new App.Material({
  seedId: 'xxx' // 来自材质库
});
const res = await App.Scene.Add(material);
console.log(res);
```

### 材质拾取

```javascript
await App.Tools.PickerMaterial.Start({
  bContinuous: true,
  func: (res) => console.log(res)
});
const picked = await App.Tools.PickerMaterial.GetMaterials();
await App.Tools.PickerMaterial.End();
```

### 执行替换

```javascript
const res = await App.DataModel.Material.SetModelMaterial({
  TargetMaterials: [
    { eid: 'xxx', meshName: 'xxx', materialIndex: 0 }
  ],
  MaterialEid: materialObj.materialEid
});
console.log(res);
```

### 批量应用（对象+槽位）

```javascript
const res = await App.DataModel.Material.Apply([
  {
    obj: modelObj,
    newMaterialsInfo: [
      {
        MeshName: 'Root_Mesh',
        MaterialIndex: 2,
        MIEid: materialObj.materialEid
      }
    ]
  }
]);
```

## 模型材质高亮（id: 1402）

```javascript
await App.DataModel.Material.SetEntitySlotsHighlight([
  {
    entity: obj,
    meshName: 'xxx',
    MaterialIndex: -1,
    bHighlight: true
  }
]);
```

## 回读校验

```javascript
const { result } = await modelObj.GetMaterial();
console.log(result);
```
