---
name: wdp-api-bim-unified
description: 处理 BIM API 的模型/构件/空间核心能力、插件安装与验证的实现与排障。用于 BIM 接入、插件安装、模型行为调用、构件联动与空间操作实现。
---

# WDP BIM功能统一技能

## 🚨 强制性要求

任何使用BIM API的代码必须遵循以下要求：

1. 🚨 **必须使用`new WdpApi()`创建实例**
2. 🚨 **必须在`Renderer.Start()`之前调用`App.Plugin.Install(BimApi)`安装BIM插件**
3. 🚨 **必须验证插件安装成功后才能调用BIM相关接口**
4. 🚨 **必须在场景就绪后(progress === 100)才执行BIM业务操作**
5. 🚨 **必须使用官方文档指定的方法名、参数结构和返回字段**
6. 🚨 **在操作大型BIM模型时应考虑性能影响**

⚠️ 如果上述任何一点不满足，BIM相关代码将无法正常工作！

## 📋 BIM功能能力范围

### 1. BIM插件安装

#### 1.1 插件安装与验证
```javascript
// 安装BIM插件函数
async function installBimPlugin(app, BimApi) {
  try {
    // 检查BimApi是否已定义
    if (typeof BimApi === 'undefined') {
      console.error('[BIM] BimApi未定义，请确保已加载bimApi.min.js');
      return false;
    }
    
    // 安装BIM插件
    const res = await app.Plugin.Install(BimApi);
    
    if (!res?.success) {
      console.error(`[BIM] 插件安装失败: ${res?.message || '未知错误'}`);
      return false;
    }
    
    console.log('[BIM] 插件安装成功，插件ID:', res.result.id);
    return res;
  } catch (error) {
    console.error(`[BIM] 插件安装过程出错: ${error.message || error}`);
    return false;
  }
}
```

#### 1.2 插件卸载
```javascript
// 卸载BIM插件
async function uninstallBimPlugin(app, pluginId) {
  try {
    const res = await app.Plugin.Uninstall(pluginId);
    if (res.success) {
      console.log("[BIM] 插件卸载成功");
      return true;
    } else {
      console.error(`[BIM] 插件卸载失败: ${res.message || '未知错误'}`);
      return false;
    }
  } catch (error) {
    console.error(`[BIM] 卸载插件出错: ${error.message || error}`);
    return false;
  }
}
```

### 2. 模型操作

#### 2.1 获取模型列表
```javascript
async function getModelList(app) {
  try {
    const modelsResult = await app.Asset.GetAll();
    if (modelsResult?.success) {
      console.log('模型列表获取成功:', modelsResult.result);
      return modelsResult.result;
    } else {
      console.error(`模型列表获取失败: ${modelsResult?.message || '未知错误'}`);
      return null;
    }
  } catch (error) {
    console.error(`获取模型列表时出错: ${error.message || error}`);
    return null;
  }
}
```

#### 2.2 加载模型
```javascript
async function loadModel(app, assetId, bReplace = false) {
  try {
    const loadResult = await app.Asset.LoadHierarchy({
      assetId: assetId,
      bReplace: bReplace // 是否替换当前场景中的模型
    });
    
    if (loadResult?.success) {
      console.log(`模型(${assetId})加载成功:`, loadResult.result);
      return loadResult.result;
    } else {
      console.error(`模型(${assetId})加载失败: ${loadResult?.message || '未知错误'}`);
      return null;
    }
  } catch (error) {
    console.error(`加载模型(${assetId})时出错: ${error.message || error}`);
    return null;
  }
}
```

#### 2.3 模型显隐控制
```javascript
async function setModelVisibility(app, eid, isVisible) {
  try {
    const visibilityResult = await app.Entity.SetVisible({
      eid: eid,
      bVisible: isVisible
    });
    
    if (visibilityResult?.success) {
      console.log(`模型(${eid})${isVisible ? '显示' : '隐藏'}成功`);
      return true;
    } else {
      console.error(`模型(${eid})${isVisible ? '显示' : '隐藏'}失败: ${visibilityResult?.message || '未知错误'}`);
      return false;
    }
  } catch (error) {
    console.error(`设置模型(${eid})可见性时出错: ${error.message || error}`);
    return false;
  }
}
```

#### 2.4 模型剖切
```javascript
// 开启模型剖切
async function startModelSection(app, eid, normal = [0, 0, 1], distance = 0, location = [0, 0, 0]) {
  try {
    const sectionResult = await app.BimModel.StartModelSection({
      eid: eid,
      plane: {
        normal: normal, // 法线向量，默认向上
        distance: distance,
        coordZRef: "altitude", // 必须用"altitude"，不能用"ground"
        transform: {
          location: location // 相对坐标
        }
      }
    });
    
    if (sectionResult?.success) {
      console.log(`模型(${eid})剖切开启成功`);
      return true;
    } else {
      console.error(`模型(${eid})剖切开启失败: ${sectionResult?.message || '未知错误'}`);
      return false;
    }
  } catch (error) {
    console.error(`开启模型(${eid})剖切时出错: ${error.message || error}`);
    return false;
  }
}

// 重置模型剖切
async function resetModelSection(app, eid) {
  try {
    const resetResult = await app.BimModel.ResetModelSection({ eid: eid });
    
    if (resetResult?.success) {
      console.log(`模型(${eid})剖切重置成功`);
      return true;
    } else {
      console.error(`模型(${eid})剖切重置失败: ${resetResult?.message || '未知错误'}`);
      return false;
    }
  } catch (error) {
    console.error(`重置模型(${eid})剖切时出错: ${error.message || error}`);
    return false;
  }
}

// 关闭模型剖切
async function endModelSection(app, eid) {
  try {
    const endResult = await app.BimModel.EndModelSection({ eid: eid });
    
    if (endResult?.success) {
      console.log(`模型(${eid})剖切关闭成功`);
      return true;
    } else {
      console.error(`模型(${eid})剖切关闭失败: ${endResult?.message || '未知错误'}`);
      return false;
    }
  } catch (error) {
    console.error(`关闭模型(${eid})剖切时出错: ${error.message || error}`);
    return false;
  }
}
```

#### 2.5 模型拆楼
```javascript
// 开启拆楼功能
async function startBuildingLayer(app, eid, height, topHeight = null) {
  try {
    // 先确保关闭当前拆楼状态
    await app.BimModel.EndBuildingLayer({ eid: eid });
    
    const params = {
      eid: eid,
      height: height
    };
    
    // 如果提供了顶部高度，则添加到参数中
    if (topHeight !== null) {
      params.topHeight = topHeight;
    }
    
    const startResult = await app.BimModel.StartBuildingLayer(params);
    
    if (startResult?.success) {
      console.log(`模型(${eid})拆楼功能开启成功`);
      return true;
    } else {
      console.error(`模型(${eid})拆楼功能开启失败: ${startResult?.message || '未知错误'}`);
      return false;
    }
  } catch (error) {
    console.error(`开启模型(${eid})拆楼功能时出错: ${error.message || error}`);
    return false;
  }
}

// 关闭拆楼功能
async function endBuildingLayer(app, eid) {
  try {
    const endResult = await app.BimModel.EndBuildingLayer({ eid: eid });
    
    if (endResult?.success) {
      console.log(`模型(${eid})拆楼功能关闭成功`);
      return true;
    } else {
      console.error(`模型(${eid})拆楼功能关闭失败: ${endResult?.message || '未知错误'}`);
      return false;
    }
  } catch (error) {
    console.error(`关闭模型(${eid})拆楼功能时出错: ${error.message || error}`);
    return false;
  }
}
```

### 3. 构件操作

#### 3.1 获取构件树
```javascript
async function getComponentTree(app, eid, bFilterEmptyNode = true) {
  try {
    const treeResult = await app.Component.GetTree({
      eid: eid,
      bFilterEmptyNode: bFilterEmptyNode // 过滤空节点
    });
    
    if (treeResult?.success) {
      console.log(`构件树获取成功:`, treeResult.result);
      return treeResult.result;
    } else {
      console.error(`构件树获取失败: ${treeResult?.message || '未知错误'}`);
      return null;
    }
  } catch (error) {
    console.error(`获取构件树时出错: ${error.message || error}`);
    return null;
  }
}
```

#### 3.2 构件高亮
```javascript
async function highlightComponent(app, nodeId, isHighlight, color = [1, 0, 0, 1]) {
  try {
    const highlightResult = await app.Component.SetHighlight({
      nodeId: nodeId,
      bHighlight: isHighlight,
      color: color // 默认红色高亮，RGBA格式
    });
    
    if (highlightResult?.success) {
      console.log(`构件(${nodeId})${isHighlight ? '高亮' : '取消高亮'}成功`);
      return true;
    } else {
      console.error(`构件(${nodeId})${isHighlight ? '高亮' : '取消高亮'}失败: ${highlightResult?.message || '未知错误'}`);
      return false;
    }
  } catch (error) {
    console.error(`设置构件(${nodeId})高亮时出错: ${error.message || error}`);
    return false;
  }
}
```

#### 3.3 构件显隐控制
```javascript
async function setComponentVisibility(app, nodeId, isVisible) {
  try {
    const visibilityResult = await app.Component.SetNodeVisibility(nodeId, isVisible);
    
    if (visibilityResult?.success) {
      console.log(`构件(${nodeId})${isVisible ? '显示' : '隐藏'}成功`);
      return true;
    } else {
      console.error(`构件(${nodeId})${isVisible ? '显示' : '隐藏'}失败: ${visibilityResult?.message || '未知错误'}`);
      return false;
    }
  } catch (error) {
    console.error(`设置构件(${nodeId})可见性时出错: ${error.message || error}`);
    return false;
  }
}
```

#### 3.4 构件搜索
```javascript
// 树搜索
async function filterComponentTree(app, eid, filterType, conditions) {
  try {
    const filterResult = await app.Component.FilterTree({
      eid: eid,
      filterType: filterType, // 'name', 'property', 'category'等
      conditions: conditions
    });
    
    if (filterResult?.success) {
      console.log(`构件树搜索成功:`, filterResult.result);
      return filterResult.result;
    } else {
      console.error(`构件树搜索失败: ${filterResult?.message || '未知错误'}`);
      return null;
    }
  } catch (error) {
    console.error(`搜索构件树时出错: ${error.message || error}`);
    return null;
  }
}

// 列表搜索
async function filterComponentList(app, eid, filterType, conditions) {
  try {
    const filterResult = await app.Component.FilterList({
      eid: eid,
      filterType: filterType, // 'name', 'property', 'category'等
      conditions: conditions
    });
    
    if (filterResult?.success) {
      console.log(`构件列表搜索成功:`, filterResult.result);
      return filterResult.result;
    } else {
      console.error(`构件列表搜索失败: ${filterResult?.message || '未知错误'}`);
      return null;
    }
  } catch (error) {
    console.error(`搜索构件列表时出错: ${error.message || error}`);
    return null;
  }
}
```

### 4. 空间操作

#### 4.1 获取空间信息
```javascript
async function getRoomSpaces(app, eid, roomName = null) {
  try {
    const params = { eid: eid };
    
    // 如果提供了房间名称，则添加到参数中
    if (roomName !== null) {
      params.roomName = roomName;
    }
    
    const spacesResult = await app.Space.GetList(params);
    
    if (spacesResult?.success) {
      console.log(`空间信息获取成功:`, spacesResult.result);
      return spacesResult.result;
    } else {
      console.error(`空间信息获取失败: ${spacesResult?.message || '未知错误'}`);
      return null;
    }
  } catch (error) {
    console.error(`获取空间信息时出错: ${error.message || error}`);
    return null;
  }
}
```

#### 4.2 空间高亮
```javascript
async function highlightSpace(app, spaceId, isHighlight, color = [0, 1, 0, 0.5]) {
  try {
    const highlightResult = await app.Space.SetHighlight({
      spaceId: spaceId,
      bHighlight: isHighlight,
      color: color // 默认半透明绿色，RGBA格式
    });
    
    if (highlightResult?.success) {
      console.log(`空间(${spaceId})${isHighlight ? '高亮' : '取消高亮'}成功`);
      return true;
    } else {
      console.error(`空间(${spaceId})${isHighlight ? '高亮' : '取消高亮'}失败: ${highlightResult?.message || '未知错误'}`);
      return false;
    }
  } catch (error) {
    console.error(`设置空间(${spaceId})高亮时出错: ${error.message || error}`);
    return false;
  }
}
```

## ⚠️ 常见问题解决

### 1. 构件显隐（SetNodeVisibility）
- **问题**: 调用`SetNodeVisibility`但构件显隐状态未改变
- **解决方案**: 
  - 确认传递的参数顺序正确：`SetNodeVisibility(nodeId, bVisible)`，`true`=显示，`false`=隐藏
  - 确认nodeId存在并且有效

### 2. 剖切（StartModelSection）
- **问题**: 剖切功能不生效或位置不正确
- **解决方案**: 
  - `coordZRef`必须用`"altitude"`，不能用`"ground"`
  - `transform.location`用**相对坐标**（如`[93.5, -40, -10]`），不依赖建筑绝对坐标
  - 开启前必须先借用相机（`CameraControl.Focus`）聚焦模型

### 3. 拆楼重启陷阱
- **问题**: 拆楼功能状态错乱或失效
- **解决方案**: 
  - 必须遵循先关闭再开启的顺序：`EndBuildingLayer()` -> `StartBuildingLayer()`
  - 永远在开始前先停一次避免状态锁死

### 4. BIM插件安装失败
- **问题**: `App.Plugin.Install(BimApi)`返回失败或出现 "t is not a constructor" 错误
- **解决方案**:
  - 确认BimApi已正确加载，可以在控制台输出`typeof BimApi`检查
  - 确认传入的是BimApi构造函数本身，而非实例或字符串数组
  - 确认在场景就绪后执行插件安装
  - 详细解决方案请参考 `./BIM_PLUGIN_INSTALLATION.md`

## 📋 验证方法

### 验证插件安装
```javascript
const verifyBimPlugin = async (app) => {
  try {
    const installResult = await app.Plugin.Install(BimApi);
    console.log("BIM插件安装结果:", installResult);
    
    // 简单测试BIM API可用性
    const modelsResult = await app.Asset.GetAll();
    
    if (installResult?.success && modelsResult?.success) {
      console.log("BIM插件验证成功 - 可获取模型列表");
      return true;
    } else {
      console.error("BIM插件验证失败");
      return false;  
    }
  } catch (error) {
    console.error("BIM插件验证过程出错:", error);
    return false;
  }
};
```

### 验证模型操作
```javascript
const verifyModelOperations = async (app, eid) => {
  try {
    // 测试模型显示/隐藏
    await app.Entity.SetVisible({ eid: eid, bVisible: false });
    console.log("模型已隐藏，请确认视图中模型不可见");
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await app.Entity.SetVisible({ eid: eid, bVisible: true });
    console.log("模型已显示，请确认视图中模型可见");
    
    // 测试模型聚焦
    await app.CameraControl.Focus({ eid: eid });
    console.log("相机已聚焦到模型，请确认模型居中显示");
    
    return true;
  } catch (error) {
    console.error("验证模型操作时出错:", error);
    return false;
  }
};
```

## 🔗 参考资料（相对路径）

- 🔗 `./BIM_PLUGIN_INSTALLATION.md` - BIM 插件安装最佳实践
- 🔗 `../official_api_code_example/official-bim-full.md`
- 🔗 `../official_api_code_example/official-bim-core-operations.md`

## 🚨 强制性要求（再次强调）

1. 🚨 **必须使用`new WdpApi()`创建实例**
2. 🚨 **必须在`Renderer.Start()`之前调用`App.Plugin.Install(BimApi)`安装BIM插件**
3. 🚨 **必须验证插件安装成功后才能调用BIM相关接口**
4. 🚨 **必须在场景就绪后(progress === 100)才执行BIM业务操作**
5. 🚨 **必须使用官方文档指定的方法名、参数结构和返回字段**
6. 🚨 **在操作大型BIM模型时应考虑性能影响**

⚠️ 忽略这些要求将导致BIM操作失败、模型显示错误或应用崩溃。无论任何情况，都需要先确认BIM插件安装成功，再进行后续操作。
