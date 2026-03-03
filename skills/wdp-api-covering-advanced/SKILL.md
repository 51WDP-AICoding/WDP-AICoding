---
name: wdp-api-covering-advanced
description: å¤„ç†é«˜çº§è¦†ç›–ç‰©ä¸Žåœºæ™¯æ‰¹é‡åˆ›å»ºèƒ½åŠ›ï¼ˆHeatMap/Path/Boundã€Scene.Create/Createsã€ClearByTypesï¼‰çš„å®žçŽ°ä¸ŽæŽ’éšœã€‚ç”¨äºŽé¡¹ç›®æ¶‰åŠçƒ­åŠ›å›¾ã€è·¯å¾„è¿åŠ¨å¯¹è±¡ã€æ‰¹é‡è¦†ç›–ç‰©æž„å»ºä¸Žæ¸…ç†æ—¶ä½¿ç”¨æœ¬æŠ€èƒ½ã€‚
---

# é«˜çº§è¦†ç›–ç‰©å­æŠ€èƒ½

æœ¬æŠ€èƒ½èšç„¦â€œè¦†ç›–ç‰©é«˜çº§èƒ½åŠ›â€ï¼Œä¸å¤„ç†åˆå§‹åŒ–ä¸ŽåŸºç¡€äº‹ä»¶æ³¨å†Œã€‚

## èƒ½åŠ›èŒƒå›´

1. æ‰¹é‡åˆ›å»ºä¸Žæ¸…ç†
- `Scene.Create(...)`
- `Scene.Creates(...)`
- `Scene.ClearByTypes([...])`

2. é«˜çº§è¦†ç›–ç‰©å¯¹è±¡
- `new App.HeatMap({...})`
- `new App.Path({...})`
- `new App.Bound({...})`
- `Scene.Add(...)`

3. äº¤äº’è”åŠ¨
- `onClick` ç»‘å®šå¯¹è±¡è¡Œä¸º
- `Window/POI` æ˜¾éšè”åŠ¨

## æ‰§è¡Œæµç¨‹

1. å…ˆç¡®è®¤å®¹å™¨ä¸Žæ¸²æŸ“å·²å°±ç»ªï¼ˆä¾èµ–å…¥å£ skill å®Œæˆåˆå§‹åŒ–ï¼‰ã€‚
2. ç”¨ `Create/Creates` æˆ– `new Object + Scene.Add` æž„å»ºè¦†ç›–ç‰©ã€‚
3. ç»Ÿä¸€ç”¨ `ClearByTypes` ç®¡ç†ç”Ÿå‘½å‘¨æœŸï¼Œé¿å…æ®‹ç•™å¯¹è±¡ã€‚
4. å¯¹äº¤äº’å¯¹è±¡æ·»åŠ  `customId`ï¼Œä¾¿äºŽåŽç»­æ£€ç´¢ä¸Žå›žæ”¶ã€‚

## å‚è€ƒèµ„æ–™ï¼ˆç›¸å¯¹è·¯å¾„ï¼‰

- `../api_code_example/official-entity-coverings.md`
- `../api_code_example/official-function-components.md`
- `../api_code_example/entity-coverings.template.js`
- `../api_code_example/covering-advanced.template.js`

## è¾“å‡ºè¦æ±‚

å§‹ç»ˆè¾“å‡ºï¼š
1. è¦†ç›–ç‰©ç±»åž‹æ¸…å•ï¼ˆPoi/Window/HeatMap/Path/Boundï¼‰
2. åˆ›å»ºä¸Žæ¸…ç†è°ƒç”¨é“¾
3. æœ€å°å¯è¿è¡Œä»£ç 
4. éªŒè¯æ­¥éª¤ï¼ˆåˆ›å»ºæˆåŠŸã€ç‚¹å‡»è”åŠ¨ã€æ¸…ç†æˆåŠŸï¼‰
