---
name: gis-api-core-operations
description: 处理 GIS API 的核心能力编排与排障。用于 GisApi 插件安装、GeoLayer 图层接入、图层更新/显隐/偏移/高亮与 GIS 事件联动实现。API版本请参考 ../official_api_code_example/OFFICIAL_EXCERPT_INDEX.md
---

# GIS 核心操作子技能

## 强制性要求

任何使用GIS API的代码必须遵循以下要求：
1. 必须使用`new WdpApi()`创建实例
2. 必须在`Renderer.Start()`之前调用`App.Plugin.Install(GisApi)`安装GIS插件
3. 必须验证插件安装成功后才能调用GIS相关接口
4. 必须在场景就绪后(progress === 100)才执行GIS业务操作
5. 必须使用官方文档指定的方法名、参数结构和返回字段
6. 🚨 **npm 安装时必须使用 `@wdp-api/gis-api`，具体版本请参考 `../wdp-api-initialization-unified/SKILL.md`**

如果上述任何一点不满足，GIS相关代码将无法正常工作！

## 版本与来源约束（强制）

- 具体方法名、参数结构、枚举值、返回字段仅以官方在线文档为准。
- 历史案例只用于流程优化（时序、门禁、回滚），不作为方法真值来源。

## 前置安装门禁（强制）

- 执行任意 GIS API 前，必须先完成 `App.Plugin.Install(GisApi)`。
- 若未确认插件安装成功，不得继续执行 `GeoLayer` 创建、更新、显隐、事件监听。
- 首次进入 GIS 调用链时，必须输出安装结果与插件版本信息（`App.gis.GetVersion()`）。

## 标准流程

### 1. GIS插件安装

```javascript
async function installGisPlugin() {
  try {
    // 检查GisApi是否已定义
    if (typeof GisApi === 'undefined') {
      console.error('GisApi未定义，请确保已加载gisApi.min.js');
      return false;
    }
    
    // 安装GIS插件
    const installResult = await App.Plugin.Install(GisApi);
    
    if (installResult?.success) {
      // 获取插件版本
      const versionRes = await App.gis.GetVersion();
      console.log('GIS插件安装成功，版本:', versionRes?.result || '未知');
      return true;
    } else {
      console.error('GIS插件安装失败:', installResult?.message || '未知错误');
      return false;
    }
  } catch (error) {
    console.error('GIS插件安装过程出错:', error);
    return false;
  }
}
```

### 2. 创建GeoLayer图层

#### 创建GeoJSON图层

```javascript
async function createGeoJsonLayer(dataUrl, layerOptions = {}) {
  // 确保GIS插件已安装
  const isReady = await installGisPlugin();
  if (!isReady) return null;
  
  try {
    // 构造图层选项
    const options = {
      name: layerOptions.name || 'GeoJsonLayer',
      type: 'geojson',
      url: dataUrl,
      visible: layerOptions.visible !== false, // 默认可见
      style: layerOptions.style || {
        fillColor: [0.2, 0.5, 0.8, 0.6], // RGBA
        lineColor: [0.1, 0.3, 0.6, 1],
        lineWidth: 2,
        pointSize: 6
      },
      coordZOffset: layerOptions.coordZOffset || 0
    };
    
    // 创建并添加图层
    const geoLayer = new App.GeoLayer(options);
    const addResult = await App.Scene.Add(geoLayer);
    
    if (addResult?.success) {
      console.log(`GeoJSON图层(${options.name})创建成功`);
      return {
        success: true,
        layer: geoLayer,
        eid: addResult.result.eid
      };
    } else {
      console.error(`GeoJSON图层(${options.name})创建失败:`, 
        addResult?.message || '未知错误');
      return { success: false, message: addResult?.message };
    }
  } catch (error) {
    console.error(`创建GeoJSON图层时出错:`, error);
    return { success: false, message: error.message };
  }
}
```

### 3. 图层操作

#### 设置图层可见性

```javascript
async function setLayerVisibility(eid, isVisible) {
  // 确保GIS插件已安装
  const isReady = await installGisPlugin();
  if (!isReady) return false;
  
  try {
    const visibilityResult = await App.gis.SetLayerVisible({
      eid: eid,
      bVisible: isVisible
    });
    
    if (visibilityResult?.success) {
      console.log(`图层(${eid})${isVisible ? '显示' : '隐藏'}成功`);
      return true;
    } else {
      console.error(`图层(${eid})${isVisible ? '显示' : '隐藏'}失败:`, 
        visibilityResult?.message || '未知错误');
      return false;
    }
  } catch (error) {
    console.error(`设置图层(${eid})可见性时出错:`, error);
    return false;
  }
}
```

#### 设置图层高度偏移

```javascript
async function setLayerOffset(eid, offset) {
  // 确保GIS插件已安装
  const isReady = await installGisPlugin();
  if (!isReady) return false;
  
  try {
    const offsetResult = await App.gis.SetGeoLayerOffset({
      eid: eid,
      coordZOffset: offset // 高度偏移量，单位：米
    });
    
    if (offsetResult?.success) {
      console.log(`图层(${eid})高度偏移设置成功: ${offset}米`);
      return true;
    } else {
      console.error(`图层(${eid})高度偏移设置失败:`, 
        offsetResult?.message || '未知错误');
      return false;
    }
  } catch (error) {
    console.error(`设置图层(${eid})高度偏移时出错:`, error);
    return false;
  }
}
```

### 4. 事件处理

#### 注册图层点击事件

```javascript
async function registerFeatureClickEvent(eid) {
  // 确保GIS插件已安装
  const isReady = await installGisPlugin();
  if (!isReady) return false;
  
  try {
    const eventResult = await App.Renderer.RegisterSceneEvent([{
      name: 'OnGeoLayerFeatureClicked',
      func: (res) => {
        if (res.success && res.result.eid === eid) {
          console.log('图层要素被点击:', res.result);
          
          // 获取要素ID、类型和属性
          // GIS 2.1.0 新增 featureType 字段，用于区分点/线/面
          const { featureId, featureType, properties } = res.result;
          console.log(`点击要素类型: ${featureType}`); // point | line | polygon
          
          // 根据要素类型执行不同逻辑
          switch(featureType) {
            case 'point':
              console.log('点击了点要素');
              // 点要素处理逻辑...
              break;
            case 'line':
              console.log('点击了线要素');
              // 线要素处理逻辑...
              break;
            case 'polygon':
              console.log('点击了面要素');
              // 面要素处理逻辑...
              break;
          }
          
          // 高亮点击的要素
          highlightFeature(eid, featureId, true);
          
          // 可以在这里添加其他处理逻辑...
        }
      }
    }]);
    
    if (eventResult?.success) {
      console.log(`图层(${eid})点击事件注册成功`);
      return true;
    } else {
      console.error(`图层(${eid})点击事件注册失败:`, 
        eventResult?.message || '未知错误');
      return false;
    }
  } catch (error) {
    console.error(`注册图层(${eid})点击事件时出错:`, error);
    return false;
  }
}
```

## 图层参数说明

> **注意**：以下参数定义仅供参考，详细参数结构请以 `../official_api_code_example/official-gis-full.md` 为准。

### GeoJSON图层

```javascript
{
  name: 'GeoJsonLayer',      // 图层名称（必填）
  type: 'geojson',           // 图层类型（必填）
  url: 'data.geojson',       // GeoJSON数据URL（必填）
  visible: true,             // 是否可见（可选，默认true）
  style: {                   // 样式设置（可选）
    fillColor: [0.2, 0.5, 0.8, 0.6],  // RGBA
    lineColor: [0.1, 0.3, 0.6, 1],
    lineWidth: 2,
    pointSize: 6
  },
  coordZOffset: 0            // 高度偏移量，单位：米（可选，默认0）
}
```

### WMS图层

```javascript
{
  name: 'WMSLayer',          // 图层名称（必填）
  type: 'wms',               // 图层类型（必填）
  url: 'wms-service-url',    // WMS服务URL（必填）
  layers: 'layer-name',      // WMS图层名称（必填）
  format: 'image/png',      // 图像格式（可选，默认'image/png'）
  transparent: true,         // 是否透明（可选，默认true）
  version: '1.1.1',          // WMS版本（可选，默认'1.1.1'）
  srs: 'EPSG:4326',          // 坐标参考系统（可选，默认'EPSG:4326'）
  visible: true              // 是否可见（可选，默认true）
}
```

> 📖 **完整参数定义**：请参考 `../official_api_code_example/official-gis-full.md`

## 能力范围

### 1. 插件与版本
| 功能 | 方法 | 参数 |
|------|------|------|
| 安装插件 | `App.Plugin.Install(GisApi)` | GisApi对象 |
| 卸载插件 | `App.Plugin.Uninstall(...)` | 插件ID |
| 获取版本 | `App.gis.GetVersion()` | 无参数 |

### 2. GeoLayer接入
| 功能 | 方法 | 参数 |
|------|------|------|
| 创建图层 | `new App.GeoLayer({...})` | 图层配置对象 |
| 添加图层 | `App.Scene.Add(geoLayer)` | GeoLayer实例 |

支持的图层类型：
- geojson：GeoJSON格式数据
- shp：ESRI Shapefile格式
- wfs：Web Feature Service
- wms：Web Map Service
- wmts：Web Map Tile Service
- 3dtiles：OGC 3D Tiles

### 3. 图层通用行为
| 功能 | 方法 | 参数 |
|------|------|------|
| 显隐控制 | `App.gis.SetLayerVisible()` | `{eid, bVisible}` |
| 设置偏移 | `App.gis.SetGeoLayerOffset()` | `{eid, coordZOffset}` |
| 获取偏移 | `App.gis.GetGeoLayerOffset()` | `{eid}` |
| 设置旋转 | `App.gis.SetGeoLayerRotation()` | `{eid, rotation}` |
| 更新图层 | `App.gis.Update()` | `{eid, layerOpt}` |
| 删除图层 | `App.gis.Delete()` | `{eid}` |
| 删除全部 | `App.gis.RemoveAll()` | 无参数 |

### 4. 要素与事件
| 功能 | 方法 | 参数 |
|------|------|------|
| 要素高亮 | `App.gis.SetGeoLayerFeatureHighlight()` | `{eid, featureId, bHighlight, color}` |
| 图层创建事件 | `OnCreateGeoLayerEvent` | 通过RegisterSceneEvent注册 |
| 要素点击事件 | `OnGeoLayerFeatureClicked` | 通过RegisterSceneEvent注册 |

## 参考资料（相对路径）

- `./GIS_PLUGIN_INSTALLATION.md` - GIS 插件安装最佳实践
- `../official_api_code_example/official-gis-full.md`

## 常见问题解决

### 1. 图层不显示或位置错误
- **问题**: 添加的图层在场景中不可见或位置不正确
- **解决方案**: 
  - 确认图层的坐标系统(srs)与场景坐标系统匹配
  - 检查图层的URL是否可访问，数据是否有效
  - 尝试使用SetGeoLayerOffset调整图层高度

### 2. 要素点击事件不触发
- **问题**: OnGeoLayerFeatureClicked事件注册但不响应点击
- **解决方案**: 
  - 确认事件注册在场景就绪后(progress === 100)
  - 验证图层是否正确添加且可见
  - 检查图层中是否包含有效的要素数据
  - 图层可能被其他对象遮挡，尝试调整高度或相机位置

### 3. 图层样式不符合预期
- **问题**: 图层颜色、线宽等样式与设置不符
- **解决方案**: 
  - 检查style参数格式，颜色使用RGBA数组[r, g, b, a]，数值范围0-1
  - 某些图层类型(如WMS)的样式可能由服务端控制
  - 尝试使用Update方法更新样式

### 4. 3DTiles图层加载失败
- **问题**: 3DTiles图层添加失败或显示不正确
- **解决方案**: 
  - 检查tileset.json路径是否正确
  - 3DTiles数据量较大，可能需要更长加载时间
  - 尝试调整transform参数

## 输出要求

始终输出：
1. GIS 目标（图层类型、数据源 URL、关键对象）
2. 命中的接口名与最小调用链
3. 最小可运行代码
4. 验证步骤与通过标准
5. 缺失信息（如仍需用户补充）

---

## 强制性要求（再次强调）

任何使用GIS API的代码必须遵循以下要求：
1. 必须使用`new WdpApi()`创建实例
2. 必须在`Renderer.Start()`之前调用`App.Plugin.Install(GisApi)`安装GIS插件
3. 必须验证插件安装成功后才能调用GIS相关接口
4. 必须在场景就绪后(progress === 100)才执行GIS业务操作
5. 必须使用官方文档指定的方法名、参数结构和返回字段

忽略这些要求将导致GIS操作失败、图层显示错误或应用崩溃。无论任何情况，都需要先确认GIS插件安装成功，再进行后续操作。
