// ==============================================
// === 插件导入区 ===
// ==============================================
import WdpApi from 'wdpapi';
import BimApi from '@wdp-api/bim-api';
import GisApi from '@wdp-api/gis-api';

// ==============================================
// === 用户配置区 ===
// ==============================================
const WDP_CONFIG = {
    SERVER_URL: 'https://dtp-api.51aes.com',
    ORDER_CODE: 'f9c45daba3b8c7f850644853569cb091',
    CONTAINER_ID: 'player',
    RESOLUTION: [1920, 1080]
};

// 建筑实体EID
const BUILDING_EID = '827500951593025536';

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
    document.getElementById('btn-fetch-coord').disabled = false;
    document.getElementById('btn-building-lift').disabled = false;
}

// ==============================================
// === 动态添加按钮 ===
// ==============================================
function addDebugButtons() {
    const btnContainer = document.getElementById('btn-fetch-info').parentElement;
    
    const btnFetchInfo = document.getElementById('btn-fetch-info');
    
    // 获取坐标系信息按钮
    const btnFetchCoord = document.createElement('button');
    btnFetchCoord.id = 'btn-fetch-coord';
    btnFetchCoord.disabled = true;
    btnFetchCoord.textContent = '获取坐标系信息';
    btnFetchCoord.className = 'btn-action tertiary';
    btnFetchInfo.after(btnFetchCoord);
    
    // 拆楼演示按钮
    const btnBuildingLift = document.createElement('button');
    btnBuildingLift.id = 'btn-building-lift';
    btnBuildingLift.disabled = true;
    btnBuildingLift.textContent = '拆楼演示';
    btnBuildingLift.className = 'btn-action warning';
    btnBuildingLift.style.backgroundColor = '#e67e22';
    btnBuildingLift.style.color = '#fff';
    btnFetchCoord.after(btnBuildingLift);
    
    // 面板可滚动
    const panel = btnContainer.parentElement;
    if (panel) {
        panel.style.overflowY = 'auto';
        panel.style.maxHeight = '100vh';
    }
}

// ==============================================
// === 拆楼功能（单路径 + bReverse反向播放） ===
// ==============================================
let isBuildingRaised = false;
let originalBuildingZ = null;
let originalBuildingLng = null;
let originalBuildingLat = null;
let currentBound = null;
let currentPath = null;
let buildingEntity = null;
let isMoving = false;

const MOVE_DURATION = 10; // 秒

// 记录建筑初始位置
async function recordInitialBuildingPosition() {
    const entity = await getBuildingEntity();
    if (!entity) return false;
    
    const entityInfo = await entity.Get();
    if (entityInfo.success && entityInfo.result) {
        const [lng, lat, z] = entityInfo.result.location;
        originalBuildingLng = lng;
        originalBuildingLat = lat;
        originalBuildingZ = z;
        console.log('[WDP] 记录建筑初始位置:', { lng, lat, z });
        return true;
    }
    return false;
}

// 获取建筑实体
async function getBuildingEntity() {
    if (buildingEntity) return buildingEntity;
    
    try {
        const res = await App.Scene.GetByEids([BUILDING_EID]);
        if (res.success && res.result && res.result.length > 0) {
            buildingEntity = res.result[0];
            return buildingEntity;
        }
    } catch (e) {
        console.error('[WDP] 获取建筑实体错误:', e);
    }
    return null;
}

// 创建垂直路径（只创建一次，抬升下降共用）
function createVerticalPath(startZ, endZ, lng, lat) {
    return new App.Path({
        polyline: {
            coordinates: [
                [lng, lat, startZ],  // 起点：baseZ
                [lng, lat, endZ]     // 终点：baseZ + 200
            ]
        },
        pathStyle: {
            type: 'solid',
            width: 1,
            color: '00000000',
            passColor: '00000000'
        },
        bVisible: false,
        customId: `path-${Date.now()}`
    });
}

// 创建Bound移动对象
// isRising: true=抬升(正向播放), false=下降(反向播放)
function createBoundMove(entity, path, duration, isRising) {
    return new App.Bound({
        moving: entity,
        path: path,
        boundStyle: {
            time: duration,
            bLoop: false,
            bReverse: !isRising,  // 抬升正向播放，下降反向播放
            state: 'play'
        },
        // 【关键】反向播放时路径方向相反，rotator补偿也需要反向
        rotator: {
            pitch: isRising ? -90 : 90,  // 抬升-90，下降+90
            yaw: 0,
            roll: 0
        },
        offset: { left: 0, forward: 0, up: 0 },
        customId: `bound-${Date.now()}`
    });
}

// 清理移动对象
async function cleanupMoveObjects() {
    if (currentBound) {
        await currentBound.Delete().catch(() => {});
        currentBound = null;
    }
    if (currentPath) {
        await currentPath.Delete().catch(() => {});
        currentPath = null;
    }
}

// 拆楼演示主函数（单路径方案）
async function toggleBuildingLift() {
    try {
        const entity = await getBuildingEntity();
        if (!entity) {
            showStatus('建筑实体未找到', true);
            return;
        }
        
        if (isMoving) {
            console.log('[WDP] 动画进行中，忽略点击');
            return;
        }
        
        if (originalBuildingZ === null) {
            showStatus('建筑初始位置未记录', true);
            return;
        }
        
        const lng = originalBuildingLng;
        const lat = originalBuildingLat;
        const baseZ = originalBuildingZ;
        
        await cleanupMoveObjects();
        isMoving = true;
        
        // 创建单一路径：baseZ → baseZ+200
        const path = createVerticalPath(baseZ, baseZ + 200, lng, lat);
        const pathRes = await App.Scene.Add(path);
        
        if (!pathRes.success) {
            isMoving = false;
            showStatus('创建路径失败', true);
            return;
        }
        
        currentPath = pathRes.result?.object || path;
        
        // 根据状态决定抬升或下降
        const isRising = !isBuildingRaised;
        showStatus(isRising ? '建筑正在抬升...' : '建筑正在下降...');
        
        // 创建Bound：抬升时正向播放，下降时反向播放
        const bound = createBoundMove(entity, currentPath, MOVE_DURATION, isRising);
        const boundRes = await App.Scene.Add(bound);
        
        if (boundRes.success) {
            currentBound = boundRes.result?.object || bound;
            
            setTimeout(async () => {
                await cleanupMoveObjects();
                isMoving = false;
                isBuildingRaised = isRising;
                showStatus(isRising ? '建筑已抬升200米' : '建筑已下降复位');
            }, MOVE_DURATION * 1000 + 100);
        } else {
            isMoving = false;
            showStatus('创建移动失败', true);
        }
    } catch (e) {
        showStatus('拆楼操作出错: ' + e.message, true);
        console.error('[WDP] 拆楼操作错误:', e);
        isMoving = false;
    }
}

// ==============================================
// === 坐标系信息获取 ===
// ==============================================
async function fetchCoordInfo() {
    showStatus('正在获取坐标系信息...');
    const results = [];

    try {
        const globalRes = await App.Scene.GetGlobal();
        results.push('【GetGlobal】');
        results.push('  success: ' + globalRes.success);
        if (globalRes.success && globalRes.result) {
            const geoRef = globalRes.result.geoReference;
            if (geoRef) {
                try {
                    const info = await geoRef.Get();
                    results.push('  geoRef: ' + JSON.stringify(info));
                } catch (e) {
                    results.push('  geoRef.Get() 失败: ' + e.message);
                }
            }
        }
    } catch (e) {
        results.push('【GetGlobal】异常: ' + e.message);
    }

    setInfo('info-coord-system', results.join('\n'));
    showStatus('坐标系信息获取完成');
}

// ==============================================
// === 空间信息获取 ===
// ==============================================
async function fetchSpatialInfo() {
    showStatus('正在获取空间信息...');
    try {
        const cameraRes = await App.CameraControl.GetCameraPose();
        if (cameraRes.success && cameraRes.result) {
            setInfo('info-camera-pos', JSON.stringify(cameraRes.result, null, 2));
            showStatus('相机位置获取成功');
        }
    } catch (e) {
        showStatus('相机位置获取失败', true);
    }
}

// ==============================================
// === 核心初始化逻辑 ===
// ==============================================
let App = null;

async function bootstrap() {
    try {
        addDebugButtons();

        showStatus('初始化 WdpApi...');
        App = new WdpApi({
            id: WDP_CONFIG.CONTAINER_ID,
            url: WDP_CONFIG.SERVER_URL,
            order: WDP_CONFIG.ORDER_CODE
        });

        showStatus('安装 BIM 插件...');
        await App.Plugin.Install(BimApi);
        showStatus('BIM 插件安装成功');

        showStatus('安装 GIS 插件...');
        await App.Plugin.Install(GisApi);
        showStatus('GIS 插件安装成功');

        showStatus('注册场景就绪事件...');
        await App.Renderer.RegisterSceneEvent([{
            name: 'OnWdpSceneIsReady',
            func: async (res) => {
                const progress = res?.result?.progress || 0;
                showStatus('场景加载中... ' + progress + '%');
                if (progress === 100) {
                    await onSceneReady();
                }
            }
        }]);

        showStatus('启动渲染器...');
        await App.Renderer.Start();
        showStatus('渲染器已启动，等待场景加载...');

    } catch (err) {
        showStatus(err.message, true);
        alert('严重错误: ' + err.message);
    }
}

async function onSceneReady() {
    try {
        showStatus('场景已就绪，等待 3 秒...');
        await new Promise(resolve => setTimeout(resolve, 1500));

        await fetchSpatialInfo();
        await recordInitialBuildingPosition();

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
let savedDefaultPose = null;

async function resetToDefaultView() {
    try {
        if (!savedDefaultPose) {
            showStatus('默认视角未保存', true);
            return;
        }
        
        const res = await App.CameraControl.SetCameraPose({
            location: savedDefaultPose.location,
            rotation: savedDefaultPose.rotation,
            flyTime: 1
        });
        
        if (res.success) {
            showStatus('已回到默认视角');
        }
    } catch (e) {
        showStatus('回到默认视角出错: ' + e.message, true);
    }
}

// ==============================================
// === 按钮事件绑定 ===
// ==============================================
document.getElementById('btn-fetch-info').addEventListener('click', fetchSpatialInfo);
document.getElementById('btn-reset-view').addEventListener('click', resetToDefaultView);

document.addEventListener('click', async (e) => {
    if (e.target.id === 'btn-fetch-coord') await fetchCoordInfo();
    if (e.target.id === 'btn-building-lift') await toggleBuildingLift();
});

// ==============================================
// === 启动 ===
// ==============================================
document.getElementById('btn-start-render').addEventListener('click', async () => {
    const overlay = document.getElementById('start-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s';
        setTimeout(() => overlay.remove(), 500);
    }
    
    const statusBar = document.getElementById('status-bar');
    if (statusBar) {
        statusBar.innerText = '系统状态：用户已确认，开始初始化...';
        statusBar.style.color = '#3498db';
    }
    
    await bootstrap();
});
