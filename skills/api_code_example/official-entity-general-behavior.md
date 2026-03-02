# 官方脚本摘录（新版后台）：实体一般行为

版本基线：WDP API 2.2.1  
来源：wdpapidoc 后台接口（分类：实体/单体通用行为 -> 实体一般行为，id: 1358）

## 使用说明
- 本文件用于本地快速编码，减少重复在线查询。
- 若线上文档与本文件不一致，以线上发布口径为准。
- 不在仓库保存后台 token。

## 核心脚本方法（可直接复用）

- 按类型获取实体

```javascript
const types = ['Particle', 'Path'];
const { result } = await App.Scene.GetByTypes(types);
console.log(result);
```

- 按 EntityName 获取实体

```javascript
const entityNames = ['myName1', 'myName2'];
const res = await App.Scene.GetByEntityName(entityNames);
console.log(res);
```

- 按 CustomId 获取实体

```javascript
const customIds = ['myId1', 'myId2'];
const res = await App.Scene.GetByCustomId(customIds);
console.log(res);
```

- 按 Eids 获取实体

```javascript
const eids = [
  '-9151314316185345952',
  '-9151314316965221260',
  '-9151314316350575262'
];
const res = await App.Scene.GetByEids(eids);
console.log(res);
```

- 获取全部实体对象

```javascript
const { result } = await App.Scene.GetAll();
console.log(result);
```

- 设置单个对象显隐

```javascript
const res = await particleObj.SetVisible(false); // true 显示 / false 隐藏
console.log(res);
```

- 通过对象批量显隐

```javascript
const objs = [particleObj, pathObj];
const res = await App.Scene.SetVisibleByObjects(objs, false);
console.log(res);
```

- 通过类型批量删除

```javascript
const types = ['Particle', 'Range'];
const res = await App.Scene.ClearByTypes(types);
console.log(res);
```

- 通过对象批量删除

```javascript
const objs = [particleObj, pathObj];
const res = await App.Scene.ClearByObjects(objs);
console.log(res);
```

- 通过 Eids 批量删除

```javascript
const eids = [
  '-9151314316185345952',
  '-9151314316965221260',
  '-9151314316350575262'
];
const res = await App.Scene.ClearByEids(eids);
console.log(res);
```

- 实体落地（对象级）

```javascript
const res = await particleObj.SnapTo({
  calculateCoordZ: {
    coordZRef: 'ground', // surface | ground | altitude
    coordZOffset: 10
  }
});
console.log(res);
```

## 参数与注意事项

- `types` 区分大小写；批量删除前先打印目标清单。
- `GetByEntityName/GetByCustomId` 依赖实体基础信息写入。
- `ProjectModel/ProjectInstance` 在部分删除能力中有限制，调用前先在业务侧做白名单校验。
