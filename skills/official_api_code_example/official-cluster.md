# 官方脚本摘录（新版后台）：点聚合【私有化环境/lite】

版本基线：WDP API 2.2.1  
来源：wdpapidoc 后台接口（分类：点聚合，子项 id: 1403/1404/1405）

## 使用说明
- 本文件用于本地快速编码，减少重复在线查询。
- 若线上文档与本文件不一致，以线上发布口径为准。
- 不在仓库保存后台 token。

## 数据部署（id: 1403）

```javascript
await App.DataModel.Cluster.Create({
  gather: 'test_db_1',
  mode: 'cloud',
  data: [
    { id: 'xxxx1', coord: '123.23133,23.231311', name: 'custom name' },
    { id: 'xxxx2', coord: '123.23133,23.231311', name: 'custom name2' }
  ]
});
```

```javascript
await App.DataModel.Cluster.Update({ gather: 'test_db_1', mode: 'cloud', data: [...] });
await App.DataModel.Cluster.Delete({ gather: 'test_db_1', condition: { ids: ['111', '222'] }, mode: 'cloud' });
await App.DataModel.Cluster.Reset({ gather: 'test_db_1', mode: 'cloud' });
await App.DataModel.Cluster.DeleteGather({ condition: { gathers: ['test_db_1'] }, mode: 'cloud' });
await App.DataModel.Cluster.GetList({ gather: 'test_db_1', condition: { ids: ['111'] }, mode: 'cloud' });
await App.DataModel.Cluster.Count({ gather: 'test_db_1', mode: 'cloud' });
await App.DataModel.Cluster.GetGatherList({ condition: { gather: 'test_db_1' }, mode: 'cloud' });
```

## 点聚合效果配置（id: 1404）

```javascript
await App.DataModel.Cluster.Start({
  openonclick: true,
  algorithm: { type: 'squareD', parameters: { squareD: { length: '30' } } },
  filters: {
    attr: [
      {
        queryId: 'AAA',
        gather: 'guangzhou_poi',
        condition: { adname: ['白云区'] },
        covering: { type: 'Poi', poiStyle: { markerSize: [25, 57], labelContent: ['{name}', '00ff00ff', '12'] } }
      }
    ]
  }
});
```

```javascript
await App.DataModel.Cluster.Modify({
  attr: [{ queryId: 'BBB', covering: { type: 'poi', poiStyle: { markerSize: [100, 150] } } }]
});
await App.DataModel.Cluster.End();
```

## 周边搜索（id: 1405）

```javascript
await App.DataModel.Cluster.SearchByPoint({
  filters: {
    attr: [{ queryId: 'AAA', gather: 'test_db_1', condition: { grade: ['xxx'] } }],
    selector: { coord: '123.213131,22.2323454', distance: 100 }
  }
});
```

```javascript
await App.DataModel.Cluster.SearchByLine({
  filters: {
    attr: [{ queryId: 'AAA', gather: 'test_db_1', condition: { grade: ['xxx'] } }],
    selector: { coord: ['123.213131,22.2323454', '123.678567,25.22233333'], distance: 100 }
  }
});
```

```javascript
await App.DataModel.Cluster.SearchByArea({
  filters: {
    attr: [{ queryId: 'AAA', gather: 'test_db_1', condition: { grade: ['xxx'] } }],
    selector: { coord: ['123.213131,22.2323454', '123.678567,25.22233333'] }
  }
});
```
