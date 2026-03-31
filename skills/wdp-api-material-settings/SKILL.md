---
name: wdp-api-material-settings
description: 处理 WDP 材质设置 API 的实现与排障。用于材质实例创建、材质拾取、模型材质替换和材质高亮控制；涉及模型材质变更时使用本技能。
---

# WDP 材质设置子技能

覆盖范围：模型材质替换、模型材质高亮。

## 前置条件

1. `App` 已初始化且渲染可用。
2. 目标模型对象可检索（`GetByEids` 或现有对象引用）。
3. 材质替换前可获取 `meshName/materialIndex/materialEid`。

## 标准流程

### 1. 创建材质实例
```javascript
const material = new App.Material({
  seedId: 'xxx' // 从编辑器官方材质列表获取的相应材质SeedId
});
const res = await App.Scene.Add(material);
if (res.success) {
  const materialObj = res.result.object;
  const materialEid = materialObj.materialEid; // 获取材质实例的 materialEid
}
```

### 2. 获取目标材质槽位

#### 方式A：工具模式（PickerMaterial）
```javascript
// 开启材质拾取工具
await App.Tools.PickerMaterial.Start({
  bContinuous: true, // true=连续获取, false=单次获取
  func: (res) => { console.log('拾取结果:', res); }
});

// 获取拾取到的材质信息
const pickRes = await App.Tools.PickerMaterial.GetMaterials();
if (pickRes.success) {
  console.log('目标材质:', pickRes.result);
  // result: [{ eid, meshName, materialIndex, ... }]
}

// 关闭材质拾取工具
await App.Tools.PickerMaterial.End();
```

#### 方式B：事件模式（OnWdpMaterialHit）
```javascript
// 注册材质点击事件
await App.Renderer.RegisterSceneEvent([{
  name: 'OnWdpMaterialHit',
  func: (res) => {
    // res.result 包含精确被点击面的信息
    const { eid, meshName, materialIndex } = res.result;
    console.log('点击材质:', { eid, meshName, materialIndex });
  }
}]);
```

#### 方式C：数据查询（GetList）
```javascript
// 通过模型对象获取材质列表
const listRes = await App.DataModel.Material.GetList([modelObj]);
if (listRes.success) {
  console.log('材质列表:', listRes.result);
}
```

### 3. 执行替换或高亮

#### 材质替换 - 方式1：SetModelMaterial
```javascript
// 同类材质替换（批量替换相同材质）
await App.DataModel.Material.SetModelMaterial({
  TargetMaterials: [
    {
      eid: 'xxx',          // 模型eid
      meshName: 'xxx',     // 网格名称
      materialIndex: 0     // 材质索引
    }
  ],
  MaterialEid: materialEid // 新材质的 materialEid
});
```

#### 材质替换 - 方式2：Apply（批量赋予）
```javascript
// 批量赋予不同材质到不同模型
const jsondata = [
  {
    obj: modelObj1,
    newMaterialsInfo: [
      {
        MeshName: 'meshName1',
        MaterialIndex: 0,
        MIEid: materialEid1
      },
      {
        MeshName: 'meshName2',
        MaterialIndex: 1,
        MIEid: materialEid2
      }
    ]
  },
  {
    obj: modelObj2,
    newMaterialsInfo: [
      {
        MeshName: 'meshName3',
        MaterialIndex: 0,
        MIEid: materialEid3
      }
    ]
  }
];

await App.DataModel.Material.Apply(jsondata);
```

#### 材质高亮
```javascript
// 设置模型 mesh slot 高亮
await App.DataModel.Material.SetEntitySlotsHighlight([
  {
    entity: modelObj,
    meshName: 'Root_Mesh',
    MaterialIndex: 2,    // -1 表示所有材质
    bHighlight: true       // true=高亮, false=取消高亮
  }
]);
```

### 4. 校验结果
```javascript
// 对象级回读材质信息
const { result } = await modelObj.GetMaterial();
console.log('当前材质:', result);
```

## 质量门槛

1. 替换前必须校验目标槽位数组非空。
2. 材质高亮与替换不能混用同一临时参数对象。
3. 批量操作前先输出目标 EID 和 mesh 摘要。

## 高频问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 替换接口成功但模型无变化 | meshName/materialIndex 不匹配 | 检查 `meshName` 和 `materialIndex` 是否与目标模型匹配；确认材质槽位存在 |
| 高亮未生效 | MaterialIndex 或 entity 对象类型错误 | 检查 `MaterialIndex` 是否正确；确认 `entity` 对象类型支持高亮操作 |
| 拾取结果为空 | PickerMaterial 未启动或无可拾取材质 | 检查 `PickerMaterial` 是否已启动；确认场景中有可拾取材质；检查拾取操作是否正确执行 |

## 参考资料（相对路径）

- `../official_api_code_example/official-material-settings.md`

## 输出要求

始终输出：
1. 材质目标范围（对象/槽位）
2. 替换或高亮调用链路
3. 验证步骤与结果
4. 回滚建议（如有）