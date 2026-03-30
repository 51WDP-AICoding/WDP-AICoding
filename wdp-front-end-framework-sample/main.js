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
}

// 安全序列化（只提取原始类型字段，不展开嵌套对象，避免 WDP 代理对象卡死）
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
// === 空间信息获取（可自动/手动调用） ===
// ==============================================
async function fetchSpatialInfo() {
    showStatus('正在获取空间信息...');

    // 坐标系信息（GetGlobal 返回含循环引用，不能用 JSON.stringify）
    try {
        console.log('[WDP] 调用 App.Scene.GetGlobal()...');
        const globalRes = await App.Scene.GetGlobal();
        console.log('[WDP] GetGlobal success:', globalRes.success);
        if (globalRes.success && globalRes.result) {
            const r = globalRes.result;
            const info = {};
            for (const k of Object.keys(r)) {
                // 跳过 CameraStart（相机信息由单独的面板展示）
                if (k === 'CameraStart') continue;
                try {
                    info[k] = JSON.parse(safeStringify(r[k], 2));
                } catch (_) {
                    info[k] = '[提取失败]';
                }
            }
            setInfo('info-coord-system', safeStringify(info, 2));
            showStatus('坐标系信息获取成功');
        } else {
            setInfo('info-coord-system', '获取失败: success=' + globalRes.success + ', message=' + (globalRes.message || ''));
            showStatus('坐标系信息获取失败', true);
        }
    } catch (e) {
        console.error('[WDP] GetGlobal 异常:', e);
        setInfo('info-coord-system', '异常: ' + e.message);
        showStatus('坐标系信息获取异常', true);
    }

    // 相机位置（正确方法名: GetCameraPose 或 GetCameraInfo，不是 GetCurrentState）
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

        // 先注册事件监听，再启动渲染器（避免竞态）
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
        showStatus('场景已就绪，等待 2 秒后自动获取信息...');
        console.log('[WDP] progress=100，2 秒后执行自动获取');

        // 等待 2 秒，确保内部对象就绪
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 保存初始视角
        try {
            await App.CameraControl.SaveCurrentView('default');
            console.log('[WDP] 初始视角已保存');
        } catch (e) {
            console.warn('[WDP] 保存初始视角失败:', e);
        }

        // 获取插件版本
        try {
            const bimVerRes = await App.DCP.GetVersion();
            console.log('[WDP] BIM GetVersion 返回:', JSON.stringify(bimVerRes));
            if (bimVerRes.success && bimVerRes.result) {
                setInfo('info-bim-version', 'API: ' + (bimVerRes.result.apiVersion || '-') + ', SDK: ' + (bimVerRes.result.sdkVersion || '-'));
            }
        } catch (e) { console.warn('[WDP] 获取 BIM 版本失败:', e); }

        try {
            const gisVerRes = await App.gis.GetVersion();
            console.log('[WDP] GIS GetVersion 返回:', JSON.stringify(gisVerRes));
            if (gisVerRes.success && gisVerRes.result) {
                setInfo('info-gis-version', 'GisApiJsSdk: ' + (gisVerRes.result.GisApiJsSdk || '-') + ', ScenePlugins: ' + (gisVerRes.result.GisApiScenePlugins || '-'));
            }
        } catch (e) { console.warn('[WDP] 获取 GIS 版本失败:', e); }

        // 自动获取空间信息
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
// === 按钮事件绑定 ===
// ==============================================
document.getElementById('btn-fetch-info').addEventListener('click', async () => {
    await fetchSpatialInfo();
});

document.getElementById('btn-reset-view').addEventListener('click', async () => {
    try {
        showStatus('正在回到默认视角...');
        const res = await App.CameraControl.LoadSavedView('default');
        if (res.success) showStatus('已回到默认视角');
        else showStatus('回到默认视角失败: ' + (res.message || '未知错误'), true);
    } catch (e) { showStatus('回到默认视角出错: ' + e.message, true); }
});

// ==============================================
// === 启动 ===
// ==============================================
bootstrap();
