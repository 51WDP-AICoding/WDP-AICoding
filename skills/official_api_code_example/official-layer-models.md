# Official excerpt sync: 图层/模型

Version baseline: WDP API 2.2.1
Source: public wdpapidoc API (category: 图层/模型, categoryId: 573)

## Notes
- Generated from public child-topic detail pages.
- Prefer the online published docs when any mismatch appears.
- This file focuses on method-level code excerpts and does not fully mirror tables or images.

## Topic: 图层/单体控制器 (id: 1396)

- 获取AES底板图层

```javascript
// AES5获取底板 
// 方法一：
const res = await App.Scene.GetTiles();
console.log(res.result[0]);
const tilesObj = res.result[0].Tiles[0];
console.log("tilesObj", tilesObj);
// 方法二：
const result = await App.Scene.Tiles.GetLayers(tilesObj);
console.log("layer=", result); 
// layers:Terrain; Building; Road; Water;

// AES6 获取底板
// 方法一：
const res = await App.Scene.GetTiles();
console.log(res.result[2]);
const tilesObj = res.result[2].EarthTiles[0];
console.log("tilesObj", tilesObj);
方法二：
const result = await App.Scene.EarthTiles.GetLayers(tilesObj);
console.log("layer=", result);
 // layers:Terrain; Vegetation; Building; Road; Water;
```

- 设置图层[轮廓]

```javascript
// AES5:
const res = await App.Scene.Tiles.SetLayersOutline({
  layers: ["Building"],
  bOutline: true,
  styleName: "SpringGreen",
});
conole.log(res);

//AES6: UE5.1 暂时不支持图层描边

// styleName
/*
   0: Default            32: Silver
   1: Black              33: IndianRed
   2: DarkBlue           34: Chocolate
   3: MediumBlue         35: LightGray
   4: Blue               36: Thistle
   5: DarkGreen          37: Orchid
   6: Green              38: GoldenRod
   7: SpringGreen        39: Plum
   8: MidnightBlue       40: LightCyan
   9: ForestGreen        41: DarkSalmon
   10: SeaGreen          42: Violet
   11: LimeGreen         43: LightCoral
   12: RoyalBlue         44: Wheat
   13: SteelBlue         45: Salmon
   14: Maroon            46: Linen
   15: Purple            47: DeepPink
   16: Olive             48: OrangeRed
   17: Gray              49: Tomato
   18: SkyBlue           50: HotPink
   19: BlueViolet        51: Coral
   20: DarkRed           52: DarkOrange
   21: LightGreen        53: LightSalmon
   22: MediumPurple      54: Orange
   23: DarkViolet        55: LightPink
   24: PaleGreen         56: Pink
   25: YellowGreen       57: Gold
   26: Sienna            58: FloralWhite
   27: Brown             59: Snow
   28: DarkGray          60: Yellow
   29: LightBlue         61: LightYellow
   30: GreenYellow       62: Ivory
   31: PowderBlue        63: White
*/
```

- 设置图层[高亮]

```javascript
// AES5:
const res = await App.Scene.Tiles.SetLayersHighlight({
  layers: ['Building'],
  bHighlight: true,
  styleName: "SpringGreen"
});
console.log(res);

//AES6:
const res = await App.Scene.EarthTiles.SetLayersHighlight({
      layers: ["Terrain"],
      bHighlight: false,
      styleName: "Tomato",
    });
console.log(res);

// styleName
/*
   0: Default            32: Silver
   1: Black              33: IndianRed
   2: DarkBlue           34: Chocolate
   3: MediumBlue         35: LightGray
   4: Blue               36: Thistle
   5: DarkGreen          37: Orchid
   6: Green              38: GoldenRod
   7: SpringGreen        39: Plum
   8: MidnightBlue       40: LightCyan
   9: ForestGreen        41: DarkSalmon
   10: SeaGreen          42: Violet
   11: LimeGreen         43: LightCoral
   12: RoyalBlue         44: Wheat
   13: SteelBlue         45: Salmon
   14: Maroon            46: Linen
   15: Purple            47: DeepPink
   16: Olive             48: OrangeRed
   17: Gray              49: Tomato
   18: SkyBlue           50: HotPink
   19: BlueViolet        51: Coral
   20: DarkRed           52: DarkOrange
   21: LightGreen        53: LightSalmon
   22: MediumPurple      54: Orange
   23: DarkViolet        55: LightPink
   24: PaleGreen         56: Pink
   25: YellowGreen       57: Gold
   26: Sienna            58: FloralWhite
   27: Brown             59: Snow
   28: DarkGray          60: Yellow
   29: LightBlue         61: LightYellow
   30: GreenYellow       62: Ivory
   31: PowderBlue        63: White
*/
```

- 设置图层显隐

```javascript
// AES5:
const res = await App.Scene.Tiles.SetLayersVisibility({
  layers: ['Building'],
  bVisible: false
});
console.log(res);

// AES6:
const res = await App.Scene.EarthTiles.SetLayersVisibility({
  layers: ["Water"],
  bVisible: false,
});
console.log(res);
```

- 设置单体[轮廓]

```javascript
const res = await App.Scene.GetTiles();

if (res.success && res.result.length > 0) {
  // AES5底板获取方式：
  const tilesObj = res.result[0].Tiles[0];
  // Project底板获取方式：
  const tilesObj = res.result[1].Project[0];
  // AES6底板获取方式：
  const tilesObj = res.result[2].EarthTiles[0];
  // 方式一： 通过工厂类型设置单体轮廓
  const resNode = await App.Scene.Node.SetNodesOutline(
    {
      entity: tilesObj,
      nodeIds: ["895874688", "901061836", "898315368"],
      bOutline: true,
      styleName: "SpringGreen",
    },
    // AES5使用：Tiles; Project使用：Project;  AES6使用：EarthTiles
    "Tiles"
  );
console.log(resNode);


  // 方式二：通过对象设置单体轮廓
  /*
   // AES5底板获取方式：
  const tilesObj = res.result[0].Tiles[0];
  // Project底板获取方式：
  const tilesObj = res.result[1].Project[0];
  // AES6底板获取方式：
  const tilesObj = res.result[2].EarthTiles[0];

  tilesObj.SetNodesOutline({
      "nodeIds": ['895874688', '898315368'],
      "bOutline": true,
      "styleName": "SpringGreen"
    });
  */
}
```

- 设置单体[高亮]

```javascript
const res = await App.Scene.GetTiles();

if (res.success && res.result.length > 0) {
   // AES5底板获取方式：
  const tilesObj = res.result[0].Tiles[0];
  // Project底板获取方式：
  const tilesObj = res.result[1].Project[0];
  // AES6底板获取方式：
  const tilesObj = res.result[2].EarthTiles[0];
  // 方式一： 通过工厂类型设置单体高亮
  const res = await App.Scene.Node.SetNodesHighlight(
    {
      entity: tilesObj,
      nodeIds: ["895874688", "901061836", "898315368"],
      bHighlight: true,
      styleName: "SpringGreen",
    },
     // AES5使用：Tiles; Project使用：Project;  AES6使用：EarthTiles
    "Tiles"
  );

  console.log(res);

  // 方式二：通过对象设置单体高亮
  /*
 // AES5底板获取方式：
  const tilesObj = res.result[0].Tiles[0];
  // Project底板获取方式：
  const tilesObj = res.result[1].Project[0];
  // AES6底板获取方式：
  const tilesObj = res.result[2].EarthTiles[0];

  tilesObj.SetNodesHighlight({
      "nodeIds": ['895874688', '898315368'],
      "bHighlight": true,
      "styleName": "SpringGreen"
    });
  */
}
```

- 设置单体显隐

```javascript
// 方式一： 通过工厂类型设置单体显隐
const res = await App.Scene.GetTiles();

if (res.success && res.result.length > 0) {
   // AES5底板获取方式：
  const tilesObj = res.result[0].Tiles[0];
  // Project底板获取方式：
  const tilesObj = res.result[1].Project[0];
  // AES6底板获取方式：
  const tilesObj = res.result[2].EarthTiles[0];
  // 方式一： 通过工厂类型设置单体高亮

const res = await App.Scene.Node.SetNodesVisibility(
  {
    entity: tilesObj ,
    nodeIds: ["895874688"],
    bVisible: false,
  },
  // AES5使用：Tiles; Project使用：Project;  AES6使用：EarthTiles
  "Tiles"
);
}
console.log(res);

// 方式二：通过对象设置单体显隐
/*
 // AES5底板获取方式：
  const tilesObj = res.result[0].Tiles[0];
  // Project底板获取方式：
  const tilesObj = res.result[1].Project[0];
  // AES6底板获取方式：
  const tilesObj = res.result[2].EarthTiles[0];

  tilesObj .SetNodesVisibility({
    "nodeIds": ['895874688', '898315368'],
    "bVisible": false
  })
*/
```

## Topic: 静态模型 (id: 1397)

- AES静态模型Static

```javascript
const Static = new App.Static({
  "location": [121.49992450, 31.10650030, 66],
  "rotator": {
    "pitch": 0, //俯仰角, 参考(-180~180)
    "yaw": 30, //偏航角, 参考(-180~180)
    "roll": 0 //翻滚角, 参考(-180~180)
  },
  "scale3d": [30, 30, 30],
  "bVisible": true, //是否可见
  "seedId": "9ab0dfa9cc0d811dd04e5f8f688d7080", //从DaaS中获取
});

const res = await App.Scene.Add(Static);
console.log(res);
```

- 成员函数

```javascript
// 示例
const obj = new App.Static({ ...});
obj.Update(json);
obj.SetRotator(json);
obj.SetScale3d(json);
obj.SetVisible(boolean);
obj.Get();
obj.Delete();
obj.onClick(ev => {
  const newObj = ev.result.object;
  console.log(ev);
})
```

## Topic: 骨骼模型 (id: 1398)

- AES骨骼模型 Skeletal

```javascript
const skeletal = new App.Skeletal({
  "location": [121.49992450, 31.10650030, 66],
  "rotator": {
    "pitch": 0, //俯仰角, 参考(-180~180)
    "yaw": 30, //偏航角, 参考(-180~180)
    "roll": 0 //翻滚角, 参考(-180~180)
  },
  "scale3d": [30, 30, 30],
  "bVisible": true, //是否可见(true/false)
  "seedId": "11cf4fabacb485caaa58ec8b1362047d", //从DaaS中获取
  "animSequenceIndex": 0,
  "bPause": false,
  "bLoop": true,
  "playRate": 1,
  "playInterval": {
    "min": 0,
    "max": 100
  }
});

const res = await App.Scene.Add(skeletal);
console.log(res);
```

- 成员函数

```javascript
// 示例
  const obj = new App.Skeletal({...});
  obj.Update(json);
  obj.SetRotator(json);
  obj.SetScale3d(json);
  obj.SetVisible(boolean);
  obj.Get();
  obj.Delete();
  obj.onClick(ev => {
    const newObj = ev.result.object;
    console.log(ev);
  })
```

## Topic: 工程摆放模型 (id: 1399)

- 成员函数

```javascript
//示例
const eids = ["xxx","xxx"]; // 获取并输入场景中的一个或多个EID
const res = await App.Scene.GetByEids(eids);
const obj = res.result[0]
obj.Update(jsondata);
obj.SetRotator(jsondata);
obj.SetScale3d(jsondata);
obj.SetVisible(jsondata);
obj.Get();
```

```javascript
const jsondata = {
  "location": [121.54710461,31.19603704,27],
  "rotator": {
    "pitch": 0, //俯仰角
    "yaw": 10, //偏航角(0北)
    "roll": 0 //翻滚角
  },
  "scale3d": [20, 20, 20],
  "bVisible": true, //是否可见(true/false)
  "entityName": "Project model test",
  "customData": {
    "data": "myCustomData"
  }
}
```

## Topic: 工程摆放Instance (id: 1400)

- 成员函数

```javascript
//示例
const eids = ["xxx","xxx"]; // 获取并输入场景中的一个或多个EID
const res = await App.Scene.GetByEids(eids);
const obj = res.result[0]
obj.Update(jsondata);
obj.SetRotator(jsondata);
obj.SetScale3d(jsondata);
obj.SetVisible(jsondata);
obj.Get();
```

```javascript
const jsondata = {
  "location": [121.55041213,31.1902032,64],
  "rotator": {
    "pitch": 0, //俯仰角
    "yaw": 10, //偏航角(0北)
    "roll": 0 //翻滚角
  },
  "scale3d": [20, 20, 20],
  "bVisible": true, //是否可见(true/false)
  "entityName": "Project model test",
  "customData": {
    "data": "myCustomData"
  },
  "hiddenNodes": [] //隐藏nodeId单体
}
```

- 设置单体轮廓

```javascript
async function SetNodesOutline() {
  const res = await obj.SetNodesOutline({
    "nodeIds": ['895874688', '898315368'], // 实体nodeIds,点击实体获取
    "bOutline": true,
    "styleName": "SpringGreen"
  });
  console.log(res);
}
```

- 设置单体高亮

```javascript
async function SetNodesHighlight() {
  const res = await obj.SetNodesHighlight({
    "nodeIds": ['895874688', '898315368'], // 实体nodeIds,点击实体获取
    "bHighlight": true,
    "styleName": "SpringGreen"
  });
  console.log(res);
}
```

- 设置单体隐藏

```javascript
async function SetNodesVisibility() {
  const res = await obj.SetNodesVisibility({
    "nodeIds": ['895874688', '898315368'], // 实体nodeIds,点击实体获取
    "bVisible": false
  });
  console.log(res);
}
```

---

## Topic: AES Tiles 激活与停用（id: 1396-ext）

- 激活 / 停用 AES Tiles 底板

```javascript
// 激活 AES Tiles（使底板进入可交互状态）
const res = await App.Scene.Tiles.ActivateAesTiles(tilesObj);
console.log(res);
// 出参: { success: boolean, message: string }

// 停用 AES Tiles
const res2 = await App.Scene.Tiles.DeactivateAesTiles(tilesObj);
console.log(res2);

// 查询 AES Tiles 是否已激活
const res3 = await App.Scene.Tiles.IsActivated(tilesObj);
console.log(res3);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: { bActivated: true }
  }
*/
```

- 在场景外创建 AES Tiles 实体（不通过 GRPC）

```javascript
// 适用于需要手动指定底板数据源的场景
const res = await App.Scene.Tiles.CreateAesTilesEntityWithOutGRPC({
  url: 'http://example.com/tiles-data',  // 底板数据 URL
  entityName: '自定义底板',
  customId: 'my-tiles'
});
console.log(res);
// 出参: { success: boolean, message: string, result: { object: TilesObject } }
```

---

## Topic: 节点可见性分组（id: 1396-node）

- 添加节点可见性分组

```javascript
// 将一批 nodeId 归入一个命名分组，便于批量控制显隐
const tilesRes = await App.Scene.GetTiles();
const tilesObj = tilesRes.result[0].Tiles[0];

const res = await App.Scene.Node.AddVisibilityGroup(tilesObj, {
  groupName: 'floor-1',                          // 分组名称
  nodeIds: ['895874688', '882098004', '901234567']  // 分组内的 nodeId 列表
});
console.log(res);
// 出参: { success: boolean, message: string }
```

- 更新节点可见性分组

```javascript
const res = await App.Scene.Node.UpdateVisibilityGroup(tilesObj, {
  groupName: 'floor-1',
  nodeIds: ['895874688', '882098004'],  // 更新后的 nodeId 列表
  bVisible: false                        // 同时设置分组显隐（可选）
});
console.log(res);
```

- 移除节点可见性分组

```javascript
const res = await App.Scene.Node.RemoveVisibilityGroup(tilesObj, 'floor-1');
console.log(res);
// 出参: { success: boolean, message: string }
```

- 获取节点可见性分组信息

```javascript
const res = await App.Scene.Node.GetVisibilityGroup(tilesObj, 'floor-1');
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      groupName: 'floor-1',
      nodeIds: ['895874688', '882098004'],
      bVisible: true
    }
  }
*/
```

---

## Topic: 节点选择器完整操作（id: 1365-ext）

- 添加选中单体并绘制描边

```javascript
const tilesRes = await App.Scene.GetTiles();
const tilesObj = tilesRes.result[0].Tiles[0];

// 添加选中
await App.Scene.NodeSelection.Add(tilesObj, ['895874688', '882098004']);

// 绘制描边（选中后调用才会显示描边效果）
await App.Scene.NodeSelection.Draw();

// 添加并立即绘制（合并操作）
await App.Scene.NodeSelection.AddDraw(tilesObj, ['895874688']);
```

- 移除选中单体

```javascript
// 移除指定 nodeId 的选中状态
await App.Scene.NodeSelection.Remove(tilesObj, ['895874688']);

// 移除并重绘（合并操作）
await App.Scene.NodeSelection.RemoveDraw(tilesObj, ['895874688']);
```

- 清除所有选中单体

```javascript
// 清除选中状态（不清除描边）
await App.Scene.NodeSelection.Clear();

// 清除选中状态并清除描边（合并操作）
await App.Scene.NodeSelection.ClearDraw();
```

---

## Topic: 节点包围盒（id: 1396-bbox）

> 版本要求：>=2.2.1

- 获取指定节点的包围盒

```javascript
// 获取 AES 底板上指定 nodeId 的三维包围盒
const tilesRes = await App.Scene.GetTiles();
const tilesObj = tilesRes.result[0].Tiles[0];

const res = await tilesObj.GetNodesBoundingBox(['895874688', '882098004']);
console.log(res);
/*
  出参示例：
  {
    success: true,
    message: '',
    result: {
      center: [121.4853, 31.2384, 25],   // 包围盒中心 GIS 坐标 [lng, lat, z]
      size: [30, 20, 50]                 // 包围盒尺寸 [宽, 高, 深]（单位：米）
    }
  }
*/

// 用途：获取单体包围盒后，可用于相机聚焦或空间分析
const center = res.result.center;
await App.CameraControl.FlyTo({
  targetPosition: center,
  rotation: { pitch: -30, yaw: 0 },
  distance: 200,
  flyTime: 1
});
```
