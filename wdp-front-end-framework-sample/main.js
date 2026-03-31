// ==============================================
// === 插件导入区 ===
// ==============================================
import WdpApi from 'wdpapi';
import BimApi from '@wdp-api/bim-api';
import GisApi from '@wdp-api/gis-api';

// ==============================================
// === 用户配置区：非开发人员请只修改这里的内容 ===
// ==============================================
const WDP_CONFIG = {
    SERVER_URL: 'https://dtp-api.51aes.com',
    ORDER_CODE: 'a5d66f1612f3d2aae0278e08dcebdc72',
    CONTAINER_ID: 'player',
    RESOLUTION: [1920, 1080]
};

// ==============================================
// === UI 工具函数 ===
// ==============================================
function showStatus(msg, isError = false) {
    const bar = document.getElementById('status-bar');
    bar.innerText = '系统状态：' + msg;
    bar.style.color = isError ? '#e74c3c' : '#2ecc71';
    console[isError ? 'error' : 'log']('[WDP] ' + msg);
}

function setInfo(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

function unlockUI() {
    document.getElementById('btn-fetch-info').disabled = false;
    document.getElementById('btn-reset-view').disabled = false;
    document.getElementById('btn-show-default-view').disabled = false;
    document.getElementById('btn-fetch-coord').disabled = false;
}

// 安全序列化
function safeStringify(obj, indent) {
    try {
        return JSON.stringify(obj, null, indent);
    } catch (e) {
        if (obj && typeof obj === 'object') {
            const safe = {};
            for (const key of Object.keys(obj)) {
                try {
                    const val = obj[key];
                    if (val === null || val === undefined || typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
                        safe[key] = val;
                    } else if (Array.isArray(val)) {
                        safe[key] = '[Array(' + val.length + ')]';
                    } else {
                        safe[key] = '[Object]';
                    }
                } catch (_) { safe[key] = '[Error]'; }
            }
            return JSON.stringify(safe, null, indent);
        }
        return String(obj);
    }
}

// ==============================================
// === 动态添加按钮（避免修改HTML） ===
// ==============================================
function addDebugButtons() {
    const btnContainer = document.getElementById('btn-fetch-info').parentElement;
    
    // 将原"获取空间信息"按钮改名为"获取当前镜头"
    document.getElementById('btn-fetch-info').textContent = '获取当前镜头';
    
    // 在"回到默认视角"后面插入"显示已保存的默认视角"
    const btnResetView = document.getElementById('btn-reset-view');
    const btnShowDefault = document.createElement('button');
    btnShowDefault.id = 'btn-show-default-view';
    btnShowDefault.disabled = true;
    btnShowDefault.textContent = '显示已保存的默认视角';
    btnShowDefault.style.cssText = 'margin: 4px; padding: 6px 12px; cursor: pointer;';
    btnResetView.after(btnShowDefault);
    
    // 在"显示已保存的默认视角"后面插入"获取坐标系信息"
    const btnFetchCoord = document.createElement('button');
    btnFetchCoord.id = 'btn-fetch-coord';
    btnFetchCoord.disabled = true;
    btnFetchCoord.textContent = '获取坐标系信息';
    btnFetchCoord.style.cssText = 'margin: 4px; padding: 6px 12px; cursor: pointer;';
    btnShowDefault.after(btnFetchCoord);
    
    // 坐标系信息显示区域
    const coordDiv = document.createElement('div');
    coordDiv.id = 'info-coord-system';
    coordDiv.style.cssText = 'margin: 8px 0; padding: 8px; background: #1a1a2e; border-radius: 4px; white-space: pre-wrap; font-family: monospace; font-size: 12px; color: #ccc; max-height: 200px; overflow-y: auto;';
    coordDiv.innerText = '（点击"获取坐标系信息"按钮）';
    btnContainer.parentElement.appendChild(coordDiv);
    
    // 整个UI面板改为可滚动
    const panel = btnContainer.parentElement;
    if (panel) {
        panel.style.overflowY = 'auto';
        panel.style.maxHeight = '100vh';
    }
}

// ==============================================
// === 坐标系信息获取（多种方式尝试） ===
// ==============================================
async function fetchCoordInfo() {
    showStatus('正在获取坐标系信息...');
    const results = [];

    // 方式1: GetGlobal + geoReference
    try {
        console.log('[WDP] 方式1: App.Scene.GetGlobal()...');
        const globalRes = await App.Scene.GetGlobal();
        console.log('[WDP] GetGlobal 返回:', globalRes);
        results.push('【方式1: GetGlobal】');
        results.push('  success: ' + globalRes.success);
        if (globalRes.success && globalRes.result) {
            results.push('  result keys: ' + Object.keys(globalRes.result).join(', '));
            const geoRef = globalRes.result.geoReference;
            if (geoRef) {
                results.push('  geoReference 存在，类型: ' + typeof geoRef);
                try {
                    const info = await geoRef.Get();
                    results.push('  geoRef.Get(): ' + safeStringify(info));
                } catch (e) {
                    results.push('  geoRef.Get() 失败: ' + e.message);
                    // 直接访问属性
                    try {
                        results.push('  直接访问: coordSystem=' + geoRef.coordSystem + ', origin=' + safeStringify(geoRef.origin));
                    } catch (e2) {
                        results.push('  直接访问也失败: ' + e2.message);
                    }
                }
            } else {
                results.push('  geoReference 不存在');
            }
        }
    } catch (e) {
        results.push('【方式1: GetGlobal】异常: ' + e.message);
    }

    // 方式2: GetGlobalSettings
    try {
        console.log('[WDP] 方式2: App.Scene.GetGlobalSettings()...');
        const settingsRes = await App.Scene.GetGlobalSettings();
        console.log('[WDP] GetGlobalSettings 返回:', settingsRes);
        results.push('\n【方式2: GetGlobalSettings】');
        results.push('  success: ' + settingsRes.success);
        if (settingsRes.success && settingsRes.result) {
            results.push('  result: ' + safeStringify(settingsRes.result));
        } else {
            results.push('  message: ' + (settingsRes.message || ''));
        }
    } catch (e) {
        results.push('【方式2: GetGlobalSettings】异常: ' + e.message);
    }

    // 方式3: GetCameraStart（获取初始相机，包含坐标系原点信息）
    try {
        console.log('[WDP] 方式3: App.Scene.GetCameraStart()...');
        const startRes = await App.Scene.GetCameraStart();
        console.log('[WDP] GetCameraStart 返回:', startRes);
        results.push('\n【方式3: GetCameraStart】');
        results.push('  success: ' + startRes.success);
        if (startRes.success && startRes.result) {
            const obj = startRes.result.object;
            if (obj) {
                try {
                    const info = await obj.Get();
                    results.push('  CameraStart: ' + safeStringify(info));
                } catch (e) {
                    results.push('  直接访问: location=' + safeStringify(obj.location) + ', rotation=' + safeStringify(obj.rotation));
                }
            } else {
                results.push('  result: ' + safeStringify(startRes.result));
            }
        }
    } catch (e) {
        results.push('【方式3: GetCameraStart】异常: ' + e.message);
    }

    // 方式4: GetCameraInfo（包含坐标系相关字段）
    try {
        console.log('[WDP] 方式4: App.CameraControl.GetCameraInfo()...');
        const infoRes = await App.CameraControl.GetCameraInfo();
        console.log('[WDP] GetCameraInfo 返回:', infoRes);
        results.push('\n【方式4: GetCameraInfo（含坐标系字段）】');
        if (infoRes.success && infoRes.result) {
            results.push('  location: ' + safeStringify(infoRes.result.location));
            results.push('  rotation: ' + safeStringify(infoRes.result.rotation));
            results.push('  fieldOfView: ' + infoRes.result.fieldOfView);
            results.push('  controlMode: ' + infoRes.result.controlMode);
            // 检查是否有坐标系相关字段
            const extraKeys = Object.keys(infoRes.result).filter(k => !['location', 'rotation', 'fieldOfView', 'controlMode', 'locationLimit', 'pitchLimit', 'yawLimit', 'viewDistanceLimit'].includes(k));
            if (extraKeys.length > 0) {
                results.push('  其他字段: ' + extraKeys.join(', '));
                extraKeys.forEach(k => {
                    try { results.push('    ' + k + ': ' + safeStringify(infoRes.result[k])); } catch(_) {}
                });
            }
        }
    } catch (e) {
        results.push('【方式4: GetCameraInfo】异常: ' + e.message);
    }

    const output = results.join('\n');
    setInfo('info-coord-system', output);
    console.log('[WDP] 坐标系获取结果:\n' + output);
    showStatus('坐标系信息获取完成（详见下方）');
}

// ==============================================
// === 空间信息获取（相机位置） ===
// ==============================================
async function fetchSpatialInfo() {
    showStatus('正在获取空间信息...');

    // 相机位置
    try {
        console.log('[WDP] 调用 App.CameraControl.GetCameraPose()...');
        const cameraRes = await App.CameraControl.GetCameraPose();
        console.log('[WDP] GetCameraPose 返回:', safeStringify(cameraRes));
        if (cameraRes.success && cameraRes.result) {
            setInfo('info-camera-pos', safeStringify(cameraRes.result, 2));
            showStatus('相机位置获取成功');
        } else {
            console.log('[WDP] GetCameraPose 失败，尝试 GetCameraInfo...');
            const infoRes = await App.CameraControl.GetCameraInfo();
            console.log('[WDP] GetCameraInfo 返回:', safeStringify(infoRes));
            if (infoRes.success && infoRes.result) {
                setInfo('info-camera-pos', safeStringify(infoRes.result, 2));
                showStatus('相机位置获取成功(GetCameraInfo)');
            } else {
                setInfo('info-camera-pos', 'GetCameraPose 和 GetCameraInfo 均失败');
                showStatus('相机位置获取失败', true);
            }
        }
    } catch (e) {
        console.error('[WDP] 相机获取异常:', e);
        setInfo('info-camera-pos', '异常: ' + e.message);
        showStatus('相机位置获取异常', true);
    }
}

// ==============================================
// === 核心初始化逻辑 ===
// ==============================================
let App = null;

async function bootstrap() {
    try {
        // 动态添加调试按钮
        addDebugButtons();

        showStatus('初始化 WdpApi...');
        App = new WdpApi({
            id: WDP_CONFIG.CONTAINER_ID,
            url: WDP_CONFIG.SERVER_URL,
            order: WDP_CONFIG.ORDER_CODE
        });

        showStatus('安装 BIM 插件...');
        const bimRes = await App.Plugin.Install(BimApi);
        if (!bimRes.success) throw new Error('BIM 插件安装失败: ' + (bimRes.message || '未知错误'));
        showStatus('BIM 插件安装成功');

        showStatus('安装 GIS 插件...');
        const gisRes = await App.Plugin.Install(GisApi);
        if (!gisRes.success) throw new Error('GIS 插件安装失败: ' + (gisRes.message || '未知错误'));
        showStatus('GIS 插件安装成功');

        showStatus('注册场景就绪事件...');
        await App.Renderer.RegisterSceneEvent([{
            name: 'OnWdpSceneIsReady',
            func: async (res) => {
                const progress = res?.result?.progress || 0;
                console.log('[WDP] OnWdpSceneIsReady, progress:', progress);
                showStatus('场景加载中... ' + progress + '%');
                if (progress === 100) {
                    await onSceneReady();
                }
            }
        }, {
            name: 'OnEntityClicked',
            func: async (res) => {
                const { eid, triggerType, layerType, position } = res?.result || {};
                console.log('[WDP] 实体点击:', { eid, triggerType, layerType, position });
            }
        }, {
            name: 'OnEntityDbClicked',
            func: async (res) => {
                console.log('[WDP] 实体双击:', res?.result?.eid);
            }
        }, {
            name: 'OnGeoLayerFeatureClicked',
            func: async (res) => {
                const { eid, featureId, featureType, properties } = res?.result || {};
                console.log('[WDP] GIS 要素点击:', { eid, featureId, featureType, properties });
            }
        }]);
        console.log('[WDP] 场景事件已注册，准备启动渲染器');

        showStatus('启动渲染器...');
        const startRes = await App.Renderer.Start();
        if (!startRes.success) throw new Error('渲染启动失败: ' + (startRes.message || '口令或服务端错误'));
        showStatus('渲染器已启动，等待场景加载...');

    } catch (err) {
        showStatus(err.message, true);
        alert('严重错误: ' + err.message);
    }
}

async function onSceneReady() {
    try {
        showStatus('场景已就绪，等待 3 秒确保内部对象就绪...');
        console.log('[WDP] progress=100');
        await new Promise(resolve => setTimeout(resolve, 3000));

        // 保存初始视角
        try {
            const cameraRes = await App.CameraControl.GetCameraPose();
            console.log('[WDP] 初始视角相机位置:', safeStringify(cameraRes));
            
            if (cameraRes.success && cameraRes.result) {
                const { location, rotation } = cameraRes.result;
                const [lng, lat, z] = location;
                console.log('[WDP] 初始视角坐标: lng=' + lng + ', lat=' + lat + ', z=' + z);
                
                if (lng === 0 && lat === 0 && z === 0) {
                    console.warn('[WDP] 警告: 初始视角为000点！');
                    showStatus('警告: 初始视角为000点，请手动保存视角', true);
                } else {
                    savedDefaultPose = { location, rotation };
                    console.log('[WDP] 初始视角已保存:', savedDefaultPose);
                }
            }
        } catch (e) {
            console.warn('[WDP] 保存初始视角异常:', e);
        }

        // 获取插件版本
        try {
            const bimVerRes = await App.DCP.GetVersion();
            if (bimVerRes.success && bimVerRes.result) {
                setInfo('info-bim-version', 'API: ' + (bimVerRes.result.apiVersion || '-') + ', SDK: ' + (bimVerRes.result.sdkVersion || '-'));
            }
        } catch (e) { console.warn('[WDP] 获取 BIM 版本失败:', e); }

        try {
            const gisVerRes = await App.gis.GetVersion();
            if (gisVerRes.success && gisVerRes.result) {
                setInfo('info-gis-version', 'GisApiJsSdk: ' + (gisVerRes.result.GisApiJsSdk || '-') + ', ScenePlugins: ' + (gisVerRes.result.GisApiScenePlugins || '-'));
            }
        } catch (e) { console.warn('[WDP] 获取 GIS 版本失败:', e); }

        // 自动获取相机位置
        await fetchSpatialInfo();

        // 解锁按钮
        unlockUI();
        showStatus('场景就绪，所有功能可用');
        alert('场景加载完成！');

    } catch (err) {
        showStatus('onSceneReady 出错: ' + err.message, true);
        console.error('[WDP] onSceneReady 错误:', err);
    }
}

// ==============================================
// === 视角管理 ===
// ==============================================
let savedDefaultPose = null; // { location: [lng,lat,z], rotation: {pitch, yaw} }

// 显示已保存的默认视角坐标（精简版）
async function showDefaultView() {
    if (!savedDefaultPose) {
        setInfo('info-camera-pos', '默认视角未保存');
        return;
    }
    
    try {
        const currentRes = await App.CameraControl.GetCameraPose();
        const cur = currentRes.success && currentRes.result ? currentRes.result : null;
        
        let output = '【已保存的默认视角】\n';
        output += '位置: [' + savedDefaultPose.location.join(', ') + ']\n';
        output += '旋转: pitch=' + savedDefaultPose.rotation.pitch + ', yaw=' + savedDefaultPose.rotation.yaw;
        
        if (cur) {
            output += '\n\n【当前相机位置】\n';
            output += '位置: [' + cur.location.join(', ') + ']\n';
            output += '旋转: pitch=' + cur.rotation.pitch + ', yaw=' + cur.rotation.yaw;
        }
        
        setInfo('info-camera-pos', output);
    } catch (e) {
        setInfo('info-camera-pos', '获取出错: ' + e.message);
    }
}

// 回到默认视角（使用 SetCameraPose 直接设置，避免 Apply 的未知行为）
async function resetToDefaultView() {
    try {
        showStatus('正在回到默认视角...');
        
        if (!savedDefaultPose) {
            showStatus('默认视角未保存', true);
            return;
        }
        
        console.log('[WDP] 使用 SetCameraPose 回到默认视角:', savedDefaultPose);
        const res = await App.CameraControl.SetCameraPose({
            location: savedDefaultPose.location,
            rotation: savedDefaultPose.rotation,
            flyTime: 1
        });
        
        if (res.success) {
            showStatus('已回到默认视角');
        } else {
            showStatus('回到默认视角失败: ' + (res.message || '未知错误'), true);
        }
    } catch (e) {
        showStatus('回到默认视角出错: ' + e.message, true);
    }
}

// ==============================================
// === 按钮事件绑定 ===
// ==============================================
document.getElementById('btn-fetch-info').addEventListener('click', async () => {
    await fetchSpatialInfo();
});

document.getElementById('btn-reset-view').addEventListener('click', async () => {
    await resetToDefaultView();
});

// 动态按钮在 addDebugButtons() 中创建，这里用事件委托
document.addEventListener('click', async (e) => {
    if (e.target.id === 'btn-show-default-view') {
        await showDefaultView();
    } else if (e.target.id === 'btn-fetch-coord') {
        await fetchCoordInfo();
    }
});

// ==============================================
// === 启动 ===
// ==============================================
bootstrap();