# Official excerpt sync: 材质设置

Version baseline: WDP API 2.3.0
Source: public wdpapidoc API (category: 材质设置, categoryId: 574)

## Notes
- Generated from public child-topic detail pages.
- Prefer the online published docs when any mismatch appears.
- This file focuses on method-level code excerpts and does not fully mirror tables or images.

## Topic: 模型材质替换 (id: 1401)

- 创建材质实例

```javascript
const material = new App.Material({
  "seedId": "xxx" // 从编辑器官方材质列表获取的相应材质SeedId
});
const res = await App.Scene.Add(material);
console.log(res);
if (res.success) {
  cache.set('material', res.result.object);
  console.log('materialEid: ', res.result.object.materialEid); // 推荐使用: material.materialEid 获取该材质实例的materialEid
}
```

- 开启获取材质工具

```javascript
const res = await App.Tools.PickerMaterial.Start({
  "bContinuous": true, // true: 连续获取, false: 单次获取
  "func": (res) => {console.log(res)}
});
console.log(res);
```

- 获取目标材质

```javascript
const res = await App.Tools.PickerMaterial.GetMaterials();
console.log(res);
if (res.success) {
  console.log(res.result);
}
```

- 关闭获取材质工具

```javascript
const res = await App.Tools.PickerMaterial.End();
console.log(res);
```

- 同类材质替换

```javascript
const res = await App.DataModel.Material.SetModelMaterial({
  "TargetMaterials": [
      {
        "eid": "xxx", // 对应的静态，骨骼， 层级的模型eid
        "meshName": "xxx",
        "materialIndex": x
      },
  ], // 多种场景中准备替换的目标现存模型材质，可将获取到的目标材质结果数组粘贴到此处
  "MaterialEid": cache.get('material').materialEid // 自己创建的某一材质实例
});
console.log(res);
```

- 批量赋予材质

```javascript
// eid, meshName, materialIndex 数据可通过下面api获取:
// App.Tools.PickerMaterial.Start;
// App.Tools.PickerMaterial.GetMaterials

const { result: [ { meshName, materialIndex } = {} ] = [] } = await App.Tools.PickerMaterial.GetMaterials();

const jsondata = [
    {
        "obj": modelObj, // 模型实例
        "newMaterialsInfo": [
            {
                "MeshName": meshName,
                "MaterialIndex": materialIndex,
                "MIEid": cache.get('material').materialEid
            }
        ]
    }
]

const res = await App.DataModel.Material.Apply(jsondata);
```

- 设置模型mesh slot高亮

```javascript
// eid, meshName, materialIndex 数据可通过下面api获取:
const { result } = await App.DataModel.Material.GetList([modelObj]);

const jsondata = [
  {
    entity: modelObj,
    meshName: "Root_Mesh",
    MaterialIndex: 2,
    bHighlight: true
  }
]

const res = await App.DataModel.Material.SetEntitySlotsHighlight(jsondata);
```

- 获取实体应用的材质对象

```javascript
const { result } = await modelObj.GetMaterial();
```

## Topic: 模型材质高亮 (id: 1402)

- 模型材质高亮

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
