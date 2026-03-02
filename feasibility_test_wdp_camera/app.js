let App = null;
let sceneReady = false;

const ui = {
  loading: document.getElementById('loading'),
  loadingText: document.getElementById('loadingText'),
  focusBtn: document.getElementById('focusBtn'),
  poiBtn: document.getElementById('poiBtn'),
  rangeBtn: document.getElementById('rangeBtn'),
  heatmapBtn: document.getElementById('heatmapBtn'),
  timeBtn: document.getElementById('timeBtn'),
  bossBtn: document.getElementById('bossBtn'),
  status: document.getElementById('status'),
  log: document.getElementById('log'),
};

const featureState = {
  poi: false,
  range: false,
  heatmap: false,
  sceneTime: false,
};

const featureObjects = {
  poi: null,
  range: null,
  heatmap: null,
};

const runtime = {
  targetEntity: null,
  center: [121.50007292, 31.22579403, 30],
  defaultSkylightTime: '12:00',
};
const RANGE_CUSTOM_ID = 'my-range-id';

function log(message, payload) {
  const ts = new Date().toLocaleTimeString('zh-CN', { hour12: false });
  let payloadText = '';
  if (payload !== undefined) {
    try {
      const seen = new WeakSet();
      payloadText = JSON.stringify(payload, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) return '[Circular]';
          seen.add(value);
        }
        return value;
      });
    } catch (e) {
      payloadText = String(payload);
    }
  }
  const line = payload !== undefined ? `[${ts}] ${message} ${payloadText}` : `[${ts}] ${message}`;
  ui.log.textContent = `${line}\n${ui.log.textContent}`;
  console.log(message, payload || '');
}

function setStatus(text) {
  ui.status.textContent = `状态：${text}`;
}

function validateConfig(config) {
  if (!config?.env?.order || !/^[a-fA-F0-9]{32}$/.test(config.env.order)) {
    throw new Error('渲染口令无效，必须是 32 位十六进制字符串');
  }
  if (!document.getElementById(config.id || 'player')) {
    throw new Error('渲染容器不存在');
  }
}

function initWdp() {
  if (typeof WdpApi === 'undefined') {
    throw new Error('WdpApi is not defined，请检查 SDK 加载');
  }

  const config = window.projectGlobalConfigs.renderer;
  validateConfig(config);

  App = new WdpApi({
    id: config.id,
    url: config.env.url,
    order: config.env.order,
    resolution: config.resolution,
    rendererMode: config.rendererMode,
    debugMode: config.debugMode,
    keyboard: config.keyboard,
    prefix: config.prefix,
  });

  log('WdpApi 实例创建完成', { id: config.id, url: config.env.url });
}

function setActionButtonsDisabled(disabled) {
  ui.focusBtn.disabled = disabled;
  ui.poiBtn.disabled = disabled;
  ui.rangeBtn.disabled = disabled;
  ui.heatmapBtn.disabled = disabled;
  ui.timeBtn.disabled = disabled;
  ui.bossBtn.disabled = disabled;
}

function updateButtonStates() {
  ui.poiBtn.classList.toggle('is-on', featureState.poi);
  ui.rangeBtn.classList.toggle('is-on', featureState.range);
  ui.heatmapBtn.classList.toggle('is-on', featureState.heatmap);
  ui.timeBtn.classList.toggle('is-on', featureState.sceneTime);
  ui.bossBtn.classList.add('boss');
}

function metersToLngLatOffset(center, eastMeters, northMeters) {
  const lat = center[1];
  const lngPerMeter = 1 / (111320 * Math.cos((lat * Math.PI) / 180));
  const latPerMeter = 1 / 110540;
  return [center[0] + eastMeters * lngPerMeter, center[1] + northMeters * latPerMeter, center[2] || 0];
}

function pickFirstLocation(result) {
  const tryPaths = [
    result?.location,
    result?.transform?.location,
    result?.base?.location,
    result?.pose?.location,
  ];
  for (const loc of tryPaths) {
    if (Array.isArray(loc) && loc.length >= 3) return loc;
  }
  return null;
}

function pickCenterFromBBox(result) {
  const candidates = [
    result?.center,
    result?.Center,
    result?.boxCenter,
    result?.result?.center,
  ];
  for (const c of candidates) {
    if (Array.isArray(c) && c.length >= 3) return c;
  }

  const min = result?.min || result?.Min || result?.bbox?.min;
  const max = result?.max || result?.Max || result?.bbox?.max;
  if (Array.isArray(min) && Array.isArray(max) && min.length >= 3 && max.length >= 3) {
    return [
      (min[0] + max[0]) / 2,
      (min[1] + max[1]) / 2,
      (min[2] + max[2]) / 2,
    ];
  }
  return null;
}

async function resolveCenterFromEidEntity(entity) {
  // 1) 官方对象 Get() 返回里优先找 location
  const infoRes = await entity.Get();
  const loc = pickFirstLocation(infoRes?.result);
  if (loc) return loc;

  // 2) 用官方 GetBoundingBox([entity]) 兜底求中心
  const bboxRes = await App.Scene.GetBoundingBox([entity]);
  const bboxCenter = pickCenterFromBBox(bboxRes?.result || bboxRes);
  if (bboxCenter) return bboxCenter;

  return null;
}

async function normalizeCenterToGIS(center) {
  if (!Array.isArray(center) || center.length < 3) return null;
  const lon = Number(center[0]);
  const lat = Number(center[1]);
  const alt = Number(center[2]);
  if (!Number.isFinite(lon) || !Number.isFinite(lat) || !Number.isFinite(alt)) return null;

  // 若已是经纬度范围，直接返回
  if (Math.abs(lon) <= 180 && Math.abs(lat) <= 90) {
    return [lon, lat, alt];
  }

  // 兜底：视为笛卡尔坐标，转换为 GIS
  const convRes = await App.Tools.Coordinate.CartesianToGIS([[lon, lat, alt]]);
  const converted =
    convRes?.result?.[0] ||
    convRes?.result?.coordinates?.[0] ||
    convRes?.result?.points?.[0] ||
    null;

  if (Array.isArray(converted) && converted.length >= 3) {
    return [Number(converted[0]), Number(converted[1]), Number(converted[2])];
  }
  return null;
}

async function getTargetEntity() {
  if (runtime.targetEntity) return runtime.targetEntity;

  const target = window.projectGlobalConfigs.testTarget;
  const getRes = await App.Scene.GetByEids([target.eid]);
  if (!getRes.success || !Array.isArray(getRes.result) || getRes.result.length === 0) {
    throw new Error('GetByEids 未返回有效实体');
  }

  runtime.targetEntity = getRes.result[0];
  const rawCenter = await resolveCenterFromEidEntity(runtime.targetEntity);
  const gisCenter = await normalizeCenterToGIS(rawCenter);
  if (gisCenter) {
    runtime.center = gisCenter;
  } else {
    log('未能从 eid 实体解析有效 GIS 中心点，使用默认中心', { center: runtime.center, rawCenter });
  }
  log('目标实体已缓存', { eid: target.eid, center: runtime.center });
  return runtime.targetEntity;
}

async function safeSetVisible(obj, visible, label) {
  if (!obj) return;
  if (typeof obj.SetVisible === 'function') {
    const res = await obj.SetVisible(visible);
    if (!res?.success) throw new Error(`${label}.SetVisible 失败`);
    return;
  }
  if (!visible && typeof obj.Delete === 'function') {
    await obj.Delete();
  }
}

function buildPoiPayload(center) {
  const poiLoc = metersToLngLatOffset(center, 90, 80);
  poiLoc[2] = (center[2] || 30) + 10;
  return {
    location: poiLoc,
    poiStyle: {
      markerNormalUrl: 'http://wdpapi.51aes.com/doc-static/images/static/markerNormal.png',
      markerActivateUrl: 'http://wdpapi.51aes.com/doc-static/images/static/markerActive.png',
      markerSize: [90, 140],
    },
  };
}

function buildRangePayload(center) {
  void center;
  return {
    polygon2D: {
      coordinates: [
        [
          [-31.844647909462985, 112.1143766444287],
          [-110.49958601037262, 69.44755860259498],
          [-90.4054429953943, -57.48750033405235],
          [79.13684098430487, -49.71048702002434],
          [52.3787931497482, 75.2376952622658],
        ],
      ],
    },
    rangeStyle: {
      type: 'loop_line',
      fillAreaType: 'block',
      height: 200,
      strokeWeight: 10,
      color: 'f853ffff',
      fillAreaColor: 'fa34008f',
      bBlocked: false,
    },
    entityName: 'myName1',
    customId: RANGE_CUSTOM_ID,
    customData: { data: 'myCustomData' },
    bVisible: true,
  };
}

function buildHeatMapPayload(center) {
  const points = [
    { east: -120, north: 20, value: 15 },
    { east: -30, north: 90, value: 60 },
    { east: 20, north: -60, value: 45 },
    { east: 80, north: 10, value: 90 },
    { east: 140, north: -80, value: 30 },
  ];

  const features = points.map((p) => {
    const loc = metersToLngLatOffset(center, p.east, p.north);
    return {
      geometry: { coordinates: [loc[0], loc[1], center[2] || 0] },
      properties: { value: p.value },
    };
  });

  return {
    heatMapStyle: {
      type: 'fit',
      brushDiameter: 360,
      mappingValueRange: [1, 100],
      gradientSetting: ['3b82f6', '22c55e', 'f97316'],
    },
    points: { features },
    bVisible: true,
  };
}

async function togglePoi() {
  await getTargetEntity();
  if (!featureObjects.poi) {
    const poi = new App.Poi(buildPoiPayload(runtime.center));
    const addRes = await App.Scene.Add(poi, {
      calculateCoordZ: { coordZRef: 'surface', coordZOffset: 20 },
    });
    if (!addRes.success) throw new Error(`Poi 添加失败: ${addRes.message || 'unknown'}`);
    featureObjects.poi = poi;
    featureState.poi = true;
    log('POI 创建并显示');
    return;
  }

  const next = !featureState.poi;
  await safeSetVisible(featureObjects.poi, next, 'Poi');
  featureState.poi = next;
  log(`POI 已${next ? '开启' : '关闭'}`);
}

async function toggleRange() {
  await getTargetEntity();
  if (!featureState.range) {
    const oldRange = await App.Scene.GetByCustomId([RANGE_CUSTOM_ID]);
    if (oldRange?.success && Array.isArray(oldRange.result) && oldRange.result.length > 0) {
      await oldRange.result[0].Delete();
    }

    const range = new App.Range(buildRangePayload(runtime.center));
    const addRes = await App.Scene.Add(range, {
      calculateCoordZ: { coordZRef: 'surface', coordZOffset: 10 },
    });
    if (!addRes.success) throw new Error(`Range 添加失败: ${addRes.message || 'unknown'}`);
    featureObjects.range = range;
    featureState.range = true;
    log('区域轮廓创建并显示');
    return;
  }

  if (featureObjects.range) {
    await featureObjects.range.Delete();
    featureObjects.range = null;
  } else {
    const oldRange = await App.Scene.GetByCustomId([RANGE_CUSTOM_ID]);
    if (oldRange?.success && Array.isArray(oldRange.result) && oldRange.result.length > 0) {
      await oldRange.result[0].Delete();
    }
  }
  featureState.range = false;
  log('区域轮廓已关闭');
}

async function toggleHeatMap() {
  await getTargetEntity();
  if (!featureObjects.heatmap) {
    const heatmap = new App.HeatMap(buildHeatMapPayload(runtime.center));
    const addRes = await App.Scene.Add(heatmap, {
      calculateCoordZ: { coordZRef: 'surface', coordZOffset: 6 },
    });
    if (!addRes.success) throw new Error(`HeatMap 添加失败: ${addRes.message || 'unknown'}`);
    featureObjects.heatmap = heatmap;
    featureState.heatmap = true;
    log('热力图创建并显示');
    return;
  }

  const next = !featureState.heatmap;
  await safeSetVisible(featureObjects.heatmap, next, 'HeatMap');
  featureState.heatmap = next;
  log(`热力图已${next ? '开启' : '关闭'}`);
}

async function applySceneTime(modeOn) {
  if (modeOn) {
    const res = await App.Environment.SetSkylightTime('18:30', 1, false);
    if (!res.success) throw new Error(`设置场景时间失败: ${res.message || 'unknown'}`);
    featureState.sceneTime = true;
    log('场景时间切换为傍晚 18:30');
    return;
  }

  const fallbackTime = runtime.defaultSkylightTime || '12:00';
  const res = await App.Environment.SetSkylightTime(fallbackTime, 1, false);
  if (!res.success) throw new Error(`恢复场景时间失败: ${res.message || 'unknown'}`);
  featureState.sceneTime = false;
  log(`场景时间恢复为 ${fallbackTime}`);
}

async function toggleSceneTime() {
  await applySceneTime(!featureState.sceneTime);
}

async function focusToTargetByEid() {
  if (!sceneReady) throw new Error('场景未就绪，无法执行聚焦');

  const target = window.projectGlobalConfigs.testTarget;
  const entity = await getTargetEntity();

  setStatus('执行镜头飞跃聚焦');
  const focusPayload = {
    rotation: target.focus.rotation,
    distanceFactor: target.focus.distanceFactor,
    flyTime: target.focus.flyTime,
    entity: [entity],
  };

  const focusRes = await App.CameraControl.Focus(focusPayload);
  if (!focusRes.success) throw new Error(`CameraControl.Focus 失败: ${focusRes.message || 'unknown'}`);
  setStatus('聚焦完成');
  log('聚焦成功', { eid: target.eid });
}

async function bossReset() {
  setStatus('BOSS 复位中');

  if (featureObjects.poi && featureState.poi) await safeSetVisible(featureObjects.poi, false, 'Poi');
  if (featureObjects.range && featureState.range) await safeSetVisible(featureObjects.range, false, 'Range');
  if (featureObjects.heatmap && featureState.heatmap) await safeSetVisible(featureObjects.heatmap, false, 'HeatMap');

  featureState.poi = false;
  featureState.range = false;
  featureState.heatmap = false;
  if (featureState.sceneTime) await applySceneTime(false);

  await focusToTargetByEid();
  setStatus('已恢复默认状态和镜头');
  log('BOSS 复位完成');
}

async function startRenderer() {
  await App.System.SetDefaultBrowserFunctionKeyboard(true);
  await App.System.SetTimeoutTime(30000);
  setStatus('启动渲染器中');
  const res = await App.Renderer.Start();
  if (!res.success) throw new Error(`Renderer.Start 失败: ${res.message || 'unknown'}`);
  log('Renderer.Start 成功');
}

async function registerEvents() {
  await App.Renderer.RegisterEvent([
    {
      name: 'onVideoReady',
      func: () => {
        ui.loading.style.display = 'none';
        setStatus('视频流已就绪，可操作');
        log('onVideoReady：视频流连接成功');
      },
    },
    {
      name: 'onRenderCloudConnected',
      func: () => {
        setStatus('云渲染已连接');
        log('onRenderCloudConnected');
      },
    },
    {
      name: 'onStopedRenderCloud',
      func: (reason) => {
        setStatus('渲染服务已中断');
        setActionButtonsDisabled(true);
        log('onStopedRenderCloud', { reason });
      },
    },
  ]);

  await App.Renderer.RegisterSceneEvent([
    {
      name: 'OnWdpSceneIsReady',
      func: async (res) => {
        const progress = res?.result?.progress || 0;
        ui.loadingText.textContent = `场景加载中：${progress}%`;
        if (progress === 100 && !sceneReady) {
          sceneReady = true;
          setActionButtonsDisabled(false);
          setStatus('场景已就绪，点击按钮测试功能');
          log('OnWdpSceneIsReady 100%');

          const skyRes = await App.Environment.GetSkylightTime();
          if (skyRes?.success) {
            const maybe = skyRes?.result?.time || skyRes?.result || runtime.defaultSkylightTime;
            if (typeof maybe === 'string' && maybe.includes(':')) runtime.defaultSkylightTime = maybe;
            log('默认场景时间已缓存', { time: runtime.defaultSkylightTime });
          }

          await getTargetEntity();
        }
      },
    },
  ]);
}

async function bootstrap() {
  try {
    setStatus('初始化中');
    updateButtonStates();
    setActionButtonsDisabled(true);
    initWdp();
    await startRenderer();
    await registerEvents();
  } catch (err) {
    setStatus('初始化失败');
    ui.loadingText.textContent = '初始化失败，请查看日志';
    log('初始化失败', { error: err.message });
    alert(err.message);
  }
}

async function runAction(actionName, fn) {
  if (!sceneReady) {
    alert('场景未就绪，请稍后再试');
    return;
  }
  try {
    setStatus(`执行：${actionName}`);
    await fn();
  } catch (err) {
    log(`${actionName} 失败`, { error: err.message });
    alert(err.message);
  } finally {
    updateButtonStates();
  }
}

ui.focusBtn.addEventListener('click', () => runAction('镜头聚焦', focusToTargetByEid));
ui.poiBtn.addEventListener('click', () => runAction('POI 开关', togglePoi));
ui.rangeBtn.addEventListener('click', () => runAction('区域轮廓开关', toggleRange));
ui.heatmapBtn.addEventListener('click', () => runAction('热力图开关', toggleHeatMap));
ui.timeBtn.addEventListener('click', () => runAction('场景时间开关', toggleSceneTime));
ui.bossBtn.addEventListener('click', () => runAction('BOSS 复位', bossReset));

window.addEventListener('load', bootstrap);
