# 待插入 official-entity-coverings.md 的模块一增强内容草稿

## 1. 结构模型 (Hierarchy)
- 新增 `App.Hierarchy`，支持动态指定资产ID（seedId）加载模型，并可替换模型的材质信息。
```javascript
const hierarchy = new App.Hierarchy({
  location: [121.51132810, 31.23485399, 0], 
  rotator: { pitch: 0, yaw: 0, roll: 0 },
  scale3d: [1, 1, 1],
  bVisible: true,
  seedId: 'building_asset_001', // 模型资产 ID（从 DaaS 获取）
  changedMaterialInfo: [ // 动态材质变更
    { materialName: 'facade_mat', color: 'c0c0c0ff' },
    { materialName: 'glass_mat', color: '4fc3f7cc' },
  ],
  entityName: '主楼节点'
})
const res = await App.Scene.Add(hierarchy)
// 更新资产和材质
hierarchy.seedId = 'new_asset'
hierarchy.changedMaterialInfo = [{ materialName: 'roof', color: 'ffffffff' }]
```

## 2. 静态实例模型 (ProjectInstance - 更正旧版文档里的 StaticInstance)
- 批量放置同一个模型，支持节点级别的高亮、描边和显隐控制。
```javascript
const instance = new App.ProjectInstance({
  location: [121.51132810, 31.23485399, 0], 
  rotator: { pitch: 0, yaw: 0, roll: 0 },
  scale3d: [1, 1, 1],
  hiddenNodes: ['node-pipe-001', 'node-elec-002'], // 默认隐藏节点
})
await App.Scene.Add(instance)

// 控制节点高亮
await instance.SetNodesHighlight({ nodeIds: ['node-structure-001'], color: 'ff6b6bff', opacity: 0.8 })
await instance.ClearNodesHighlight()

// 控制节点轮廓描边
await instance.SetNodesOutline({ nodeIds: ['node-structure-001'], color: '00d4ffff' })
await instance.ClearNodesOutline()

// 控制节点显隐
await instance.SetNodesVisible({ nodeIds: ['node-pipe-001'], bVisible: false })
```

## 3. 智能建模 (Modeler 系列参数补充)
```javascript
// 示例1：路基/堤坝 (ModelerEmbank)
const embank = new App.ModelerEmbank({
  coordinates: [[121.5, 31.2, 0], [121.51, 31.2, 0]], // 折线路径坐标
  attributes: [ { cornerRadius: 800, cornerSplitNum: 5, baseWidth: 1, sideWidthScale: 1 }, {...} ],
  bClosed: false,
  modelerEmbankStyle: {
    baseType: 'Asphalt', // 底面材质：Asphalt | Brick | Concert 等
    baseWidth: 400, baseHeight: 200,
    sideType: 'GrassSlope', // 侧面材质：GrassSlope | Brick 等
    bTwoSide: true,
    fenceType: 'MetalRail' // 护栏类型：MetalRail | WoodRail 等
  }
})

// 示例2：围栏 (ModelerFence)
const fence = new App.ModelerFence({
  coordinates: [[121.5, 31.2, 0], [121.51, 31.2, 0]], 
  bClosed: true,
  ModelerFenceStyle: { // 🚨注意：必须大写 M -> ModelerFenceStyle
    fenceMeshTypeName: 'SM_P_wall_04',
    fenceScale: 1,
    cornerRadius: 0,
    bRotCol: false
  }
})

// 示例3：楼板 (ModelerFloor)
const floor = new App.ModelerFloor({
  coordinates: [ // 🚨注意：必须是三维数组 [][][] 
    [ [121.5, 31.2, 10], [121.52, 31.2, 10], [121.52, 31.24, 10], [121.5, 31.2, 10] ]
  ],
  modelerFloorStyle: {
    innerMatName: 'face_grass_1', // 顶面材质
    outerMatName: 'side_brick_9', // 侧面材质
    innerHeight: 20, outerHeight: 20, outerWidth: 20,
    cornerRadius: 100, cornerSplitNum: 10,
    bAlignZ: true, bInverseNormal: true
  }
})

// 示例4：水面与河道 (ModelerWater / ModelerRiver)
const water = new App.ModelerWater({
  coordinates: [ // 🚨水面也是多边形闭合区域，必须三维数组 [][][]
    [ [121.5, 31.2, 0], [121.52, 31.2, 0], [121.52, 31.24, 0] ]
  ],
  modelerWaterStyle: {
    waterType: 'Water03', waterColor: '1a5276ff',
    waterHeight: 200, waveHeight: 1.5, waveSpeed: 0.05, waterTransparency: 0.2
  }
})
const river = new App.ModelerRiver({
  coordinates: [[121.5, 31.2, 0], [121.51, 31.2, 0]], // 河道是折线
  modelerRiverStyle: {
    riverWidth: 500, riverHeight: 200,
    waterType: 'River01', waterColor: '1a5276ff',
    waveHeight: 2, waveSpeed: 0.05
  }
})