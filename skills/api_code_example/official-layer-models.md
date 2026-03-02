# 官方脚本摘录（新版后台）：图层/模型

版本基线：WDP API 2.2.1  
来源：wdpapidoc 后台接口（分类：图层/模型，子项 id: 1396/1397/1398/1399/1400）

## 使用说明
- 本文件用于本地快速编码，减少重复在线查询。
- 若线上文档与本文件不一致，以线上发布口径为准。
- 不在仓库保存后台 token。

## 图层/单体控制器（id: 1396）

### 获取图层对象

```javascript
const res = await App.Scene.GetTiles();
// AES5: res.result[0].Tiles[0]
// Project: res.result[1].Project[0]
// AES6: res.result[2].EarthTiles[0]
```

### 图层显隐/高亮/描边

```javascript
await App.Scene.Tiles.SetLayersVisibility({ layers: ['Building'], bVisible: false });
await App.Scene.Tiles.SetLayersHighlight({ layers: ['Building'], bHighlight: true, styleName: 'SpringGreen' });
await App.Scene.Tiles.SetLayersOutline({ layers: ['Building'], bOutline: true, styleName: 'SpringGreen' });
```

### 单体（node）显隐/高亮/描边（对象级）

```javascript
await tilesObj.SetNodesVisibility({ nodeIds: ['895874688'], bVisible: false });
await tilesObj.SetNodesHighlight({ nodeIds: ['895874688'], bHighlight: true, styleName: 'SpringGreen' });
await tilesObj.SetNodesOutline({ nodeIds: ['895874688'], bOutline: true, styleName: 'SpringGreen' });
```

## 静态模型（Static，id: 1397）

```javascript
const staticObj = new App.Static({
  location: [121.49992450, 31.10650030, 66],
  rotator: { pitch: 0, yaw: 30, roll: 0 },
  scale3d: [30, 30, 30],
  bVisible: true,
  seedId: '9ab0dfa9cc0d811dd04e5f8f688d7080'
});
await App.Scene.Add(staticObj);
```

```javascript
obj.Update(json);
obj.SetRotator(json);
obj.SetScale3d(json);
obj.SetVisible(boolean);
obj.Get();
obj.Delete();
```

## 骨骼模型（Skeletal，id: 1398）

```javascript
const skeletal = new App.Skeletal({
  location: [121.49992450, 31.10650030, 66],
  rotator: { pitch: 0, yaw: 30, roll: 0 },
  scale3d: [30, 30, 30],
  bVisible: true,
  seedId: '11cf4fabacb485caaa58ec8b1362047d',
  animSequenceIndex: 0,
  bPause: false,
  bLoop: true,
  playRate: 1
});
await App.Scene.Add(skeletal);
```

## 工程摆放模型（ProjectModel，id: 1399）

```javascript
const res = await App.Scene.GetByEids(['xxx']);
const obj = res.result[0];
obj.Update(jsondata);
obj.SetRotator(jsondata);
obj.SetScale3d(jsondata);
obj.SetVisible(jsondata);
obj.Get();
```

## 工程摆放 Instance（ProjectInstance，id: 1400）

```javascript
const res = await App.Scene.GetByEids(['xxx']);
const obj = res.result[0];
obj.Update(jsondata);
obj.SetRotator(jsondata);
obj.SetScale3d(jsondata);
obj.SetVisible(jsondata);
obj.Get();
```

```javascript
await obj.SetNodesOutline({ nodeIds: ['895874688'], bOutline: true, styleName: 'SpringGreen' });
await obj.SetNodesHighlight({ nodeIds: ['895874688'], bHighlight: true, styleName: 'SpringGreen' });
await obj.SetNodesVisibility({ nodeIds: ['895874688'], bVisible: false });
```
