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
  seasonBtn: document.getElementById('seasonBtn'),
  bossBtn: document.getElementById('bossBtn'),
  status: document.getElementById('status'),
  log: document.getElementById('log'),
};

const featureState = {
  poi: false,
  range: false,
  heatmap: false,
  sceneTime: false,
  weatherCycle: false,
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
  defaultWeather: 'Sunny',
  appliedWeather: '',
  weatherCycleIndex: -1,
  weatherCooldownMs: 1000,
  weatherLastAt: 0,
  weatherCycleList: [
    'Sunny',
    'Cloudy',
    'Overcast',
    'Rain',
    'HeavyRain',
    'Snow',
    'HeavySnow',
    'Fog',
  ],
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
    throw new Error('WdpApi is not definedï¼Œè¯·æ£€æŸ¥ SDK åŠ è½½');
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

  log('WdpApi å®žä¾‹åˆ›å»ºå®Œæˆ', { id: config.id, url: config.env.url });
}

function setActionButtonsDisabled(disabled) {
  ui.focusBtn.disabled = disabled;
  ui.poiBtn.disabled = disabled;
  ui.rangeBtn.disabled = disabled;
  ui.heatmapBtn.disabled = disabled;
  ui.timeBtn.disabled = disabled;
  ui.seasonBtn.disabled = disabled;
  ui.bossBtn.disabled = disabled;
}

function updateButtonStates() {
  ui.poiBtn.classList.toggle('is-on', featureState.poi);
  ui.rangeBtn.classList.toggle('is-on', featureState.range);
  ui.heatmapBtn.classList.toggle('is-on', featureState.heatmap);
  ui.timeBtn.classList.toggle('is-on', featureState.sceneTime);
  ui.seasonBtn.classList.toggle('is-on', featureState.weatherCycle);
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
  // 1) å®˜æ–¹å¯¹è±¡ Get() è¿”å›žé‡Œä¼˜å…ˆæ‰¾ location
  const infoRes = await entity.Get();
  const loc = pickFirstLocation(infoRes?.result);
  if (loc) return loc;

  // 2) ç”¨å®˜æ–¹ GetBoundingBox([entity]) å…œåº•æ±‚ä¸­å¿ƒ
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

  // è‹¥å·²æ˜¯ç»çº¬åº¦èŒƒå›´ï¼Œç›´æŽ¥è¿”å›ž
  if (Math.abs(lon) <= 180 && Math.abs(lat) <= 90) {
    return [lon, lat, alt];
  }

  // å…œåº•ï¼šè§†ä¸ºç¬›å¡å°”åæ ‡ï¼Œè½¬æ¢ä¸º GIS
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
    throw new Error('GetByEids æœªè¿”å›žæœ‰æ•ˆå®žä½“');
  }

  runtime.targetEntity = getRes.result[0];
  const rawCenter = await resolveCenterFromEidEntity(runtime.targetEntity);
  const gisCenter = await normalizeCenterToGIS(rawCenter);
  if (gisCenter) {
    runtime.center = gisCenter;
  } else {
    log('æœªèƒ½ä»Ž eid å®žä½“è§£æžæœ‰æ•ˆ GIS ä¸­å¿ƒç‚¹ï¼Œä½¿ç”¨é»˜è®¤ä¸­å¿ƒ', { center: runtime.center, rawCenter });
  }
  log('ç›®æ ‡å®žä½“å·²ç¼“å­˜', { eid: target.eid, center: runtime.center });
  return runtime.targetEntity;
}

async function safeSetVisible(obj, visible, label) {
  if (!obj) return;
  if (typeof obj.SetVisible === 'function') {
    const res = await obj.SetVisible(visible);
    if (!res?.success) throw new Error(`${label}.SetVisible å¤±è´¥`);
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
    if (!addRes.success) throw new Error(`Poi æ·»åŠ å¤±è´¥: ${addRes.message || 'unknown'}`);
    featureObjects.poi = poi;
    featureState.poi = true;
    log('POI åˆ›å»ºå¹¶æ˜¾ç¤º');
    return;
  }

  const next = !featureState.poi;
  await safeSetVisible(featureObjects.poi, next, 'Poi');
  featureState.poi = next;
  log(`POI å·²${next ? 'å¼€å¯' : 'å…³é—­'}`);
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
    if (!addRes.success) throw new Error(`Range æ·»åŠ å¤±è´¥: ${addRes.message || 'unknown'}`);
    featureObjects.range = range;
    featureState.range = true;
    log('åŒºåŸŸè½®å»“åˆ›å»ºå¹¶æ˜¾ç¤º');
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
  log('åŒºåŸŸè½®å»“å·²å…³é—­');
}

async function toggleHeatMap() {
  await getTargetEntity();
  if (!featureObjects.heatmap) {
    const heatmap = new App.HeatMap(buildHeatMapPayload(runtime.center));
    const addRes = await App.Scene.Add(heatmap, {
      calculateCoordZ: { coordZRef: 'surface', coordZOffset: 6 },
    });
    if (!addRes.success) throw new Error(`HeatMap æ·»åŠ å¤±è´¥: ${addRes.message || 'unknown'}`);
    featureObjects.heatmap = heatmap;
    featureState.heatmap = true;
    log('çƒ­åŠ›å›¾åˆ›å»ºå¹¶æ˜¾ç¤º');
    return;
  }

  const next = !featureState.heatmap;
  await safeSetVisible(featureObjects.heatmap, next, 'HeatMap');
  featureState.heatmap = next;
  log(`çƒ­åŠ›å›¾å·²${next ? 'å¼€å¯' : 'å…³é—­'}`);
}

async function applySceneTime(modeOn) {
  if (modeOn) {
    const res = await App.Environment.SetSkylightTime('18:30', 1, false);
    if (!res.success) throw new Error(`è®¾ç½®åœºæ™¯æ—¶é—´å¤±è´¥: ${res.message || 'unknown'}`);
    featureState.sceneTime = true;
    log('åœºæ™¯æ—¶é—´åˆ‡æ¢ä¸ºå‚æ™š 18:30');
    return;
  }

  const fallbackTime = runtime.defaultSkylightTime || '12:00';
  const res = await App.Environment.SetSkylightTime(fallbackTime, 1, false);
  if (!res.success) throw new Error(`æ¢å¤åœºæ™¯æ—¶é—´å¤±è´¥: ${res.message || 'unknown'}`);
  featureState.sceneTime = false;
  log(`åœºæ™¯æ—¶é—´æ¢å¤ä¸º ${fallbackTime}`);
}

async function toggleSceneTime() {
  await applySceneTime(!featureState.sceneTime);
}

function getNextWeather() {
  if (!Array.isArray(runtime.weatherCycleList) || runtime.weatherCycleList.length === 0) {
    throw new Error('天气轮换列表为空');
  }
  runtime.weatherCycleIndex = (runtime.weatherCycleIndex + 1) % runtime.weatherCycleList.length;
  return runtime.weatherCycleList[runtime.weatherCycleIndex];
}

async function resetWeather() {
  const fallbackWeather = runtime.defaultWeather || 'Sunny';
  const res = await App.Environment.SetSceneWeather(fallbackWeather, 1, false);
  if (!res.success) throw new Error(`恢复默认天气失败: ${res.message || 'unknown'}`);
  featureState.weatherCycle = false;
  runtime.appliedWeather = fallbackWeather;
  log(`天气恢复为 ${fallbackWeather}`);
}

async function cycleWeather() {
  const now = Date.now();
  const elapsed = now - runtime.weatherLastAt;
  if (elapsed < runtime.weatherCooldownMs) {
    const waitSec = ((runtime.weatherCooldownMs - elapsed) / 1000).toFixed(1);
    throw new Error(`天气切换冷却中，请 ${waitSec}s 后再试`);
  }

  const nextWeather = getNextWeather();
  const res = await App.Environment.SetSceneWeather(nextWeather, 1, false);
  if (!res.success) throw new Error(`设置天气失败: ${res.message || 'unknown'}`);

  runtime.weatherLastAt = Date.now();
  runtime.appliedWeather = nextWeather;
  featureState.weatherCycle = true;
  log('天气已切换', { weather: nextWeather, index: runtime.weatherCycleIndex });
}
async function focusToTargetByEid() {
  if (!sceneReady) throw new Error('åœºæ™¯æœªå°±ç»ªï¼Œæ— æ³•æ‰§è¡Œèšç„¦');

  const target = window.projectGlobalConfigs.testTarget;
  const entity = await getTargetEntity();

  setStatus('æ‰§è¡Œé•œå¤´é£žè·ƒèšç„¦');
  const focusPayload = {
    rotation: target.focus.rotation,
    distanceFactor: target.focus.distanceFactor,
    flyTime: target.focus.flyTime,
    entity: [entity],
  };

  const focusRes = await App.CameraControl.Focus(focusPayload);
  if (!focusRes.success) throw new Error(`CameraControl.Focus å¤±è´¥: ${focusRes.message || 'unknown'}`);
  setStatus('èšç„¦å®Œæˆ');
  log('èšç„¦æˆåŠŸ', { eid: target.eid });
}

async function bossReset() {
  setStatus('BOSS å¤ä½ä¸­');

  if (featureObjects.poi && featureState.poi) await safeSetVisible(featureObjects.poi, false, 'Poi');
  if (featureObjects.range && featureState.range) await safeSetVisible(featureObjects.range, false, 'Range');
  if (featureObjects.heatmap && featureState.heatmap) await safeSetVisible(featureObjects.heatmap, false, 'HeatMap');

  featureState.poi = false;
  featureState.range = false;
  featureState.heatmap = false;
  if (featureState.sceneTime) await applySceneTime(false);
  if (featureState.weatherCycle) await resetWeather();

  await focusToTargetByEid();
  setStatus('å·²æ¢å¤é»˜è®¤çŠ¶æ€å’Œé•œå¤´');
  log('BOSS å¤ä½å®Œæˆ');
}

async function startRenderer() {
  await App.System.SetDefaultBrowserFunctionKeyboard(true);
  await App.System.SetTimeoutTime(30000);
  setStatus('å¯åŠ¨æ¸²æŸ“å™¨ä¸­');
  const res = await App.Renderer.Start();
  if (!res.success) throw new Error(`Renderer.Start å¤±è´¥: ${res.message || 'unknown'}`);
  log('Renderer.Start æˆåŠŸ');
}

async function registerEvents() {
  await App.Renderer.RegisterEvent([
    {
      name: 'onVideoReady',
      func: () => {
        ui.loading.style.display = 'none';
        setStatus('è§†é¢‘æµå·²å°±ç»ªï¼Œå¯æ“ä½œ');
        log('onVideoReadyï¼šè§†é¢‘æµè¿žæŽ¥æˆåŠŸ');
      },
    },
    {
      name: 'onRenderCloudConnected',
      func: () => {
        setStatus('äº‘æ¸²æŸ“å·²è¿žæŽ¥');
        log('onRenderCloudConnected');
      },
    },
    {
      name: 'onStopedRenderCloud',
      func: (reason) => {
        setStatus('æ¸²æŸ“æœåŠ¡å·²ä¸­æ–­');
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
        ui.loadingText.textContent = `åœºæ™¯åŠ è½½ä¸­ï¼š${progress}%`;
        if (progress === 100 && !sceneReady) {
          sceneReady = true;
          setActionButtonsDisabled(false);
          setStatus('åœºæ™¯å·²å°±ç»ªï¼Œç‚¹å‡»æŒ‰é’®æµ‹è¯•åŠŸèƒ½');
          log('OnWdpSceneIsReady 100%');

          const skyRes = await App.Environment.GetSkylightTime();
          if (skyRes?.success) {
            const maybe = skyRes?.result?.time || skyRes?.result || runtime.defaultSkylightTime;
            if (typeof maybe === 'string' && maybe.includes(':')) runtime.defaultSkylightTime = maybe;
            log('é»˜è®¤åœºæ™¯æ—¶é—´å·²ç¼“å­˜', { time: runtime.defaultSkylightTime });
          }

          const weatherRes = await App.Environment.GetSceneWeather();
          if (weatherRes?.success) {
            const maybeWeather = weatherRes?.result?.weather || weatherRes?.result || runtime.defaultWeather;
            if (typeof maybeWeather === 'string' && maybeWeather.length > 0) runtime.defaultWeather = maybeWeather;
            const defaultIndex = runtime.weatherCycleList.indexOf(runtime.defaultWeather);
            runtime.weatherCycleIndex = defaultIndex >= 0 ? defaultIndex - 1 : -1;
            runtime.appliedWeather = runtime.defaultWeather;
            log('é»˜è®¤å¤©æ°”å·²ç¼“å­˜', { weather: runtime.defaultWeather });
          }

          await getTargetEntity();
        }
      },
    },
  ]);
}

async function bootstrap() {
  try {
    setStatus('åˆå§‹åŒ–ä¸­');
    updateButtonStates();
    setActionButtonsDisabled(true);
    initWdp();
    await startRenderer();
    await registerEvents();
  } catch (err) {
    setStatus('åˆå§‹åŒ–å¤±è´¥');
    ui.loadingText.textContent = 'åˆå§‹åŒ–å¤±è´¥ï¼Œè¯·æŸ¥çœ‹æ—¥å¿—';
    log('åˆå§‹åŒ–å¤±è´¥', { error: err.message });
    alert(err.message);
  }
}

async function runAction(actionName, fn) {
  if (!sceneReady) {
    alert('åœºæ™¯æœªå°±ç»ªï¼Œè¯·ç¨åŽå†è¯•');
    return;
  }
  try {
    setStatus(`æ‰§è¡Œï¼š${actionName}`);
    await fn();
  } catch (err) {
    log(`${actionName} å¤±è´¥`, { error: err.message });
    alert(err.message);
  } finally {
    updateButtonStates();
  }
}

ui.focusBtn.addEventListener('click', () => runAction('é•œå¤´èšç„¦', focusToTargetByEid));
ui.poiBtn.addEventListener('click', () => runAction('POI å¼€å…³', togglePoi));
ui.rangeBtn.addEventListener('click', () => runAction('åŒºåŸŸè½®å»“å¼€å…³', toggleRange));
ui.heatmapBtn.addEventListener('click', () => runAction('çƒ­åŠ›å›¾å¼€å…³', toggleHeatMap));
ui.timeBtn.addEventListener('click', () => runAction('åœºæ™¯æ—¶é—´å¼€å…³', toggleSceneTime));
ui.seasonBtn.addEventListener('click', () => runAction('天气轮换', cycleWeather));
ui.bossBtn.addEventListener('click', () => runAction('BOSS å¤ä½', bossReset));

window.addEventListener('load', bootstrap);

