# API Code Example（WDP 2.2.1）

本目录提供可直接复用的 API 脚本摘录与模板，目标是减少重复生成代码的成本。

## 文件清单

1. `initialize-scene.template.js`
- 场景初始化与启动链路模板
- 对应技能：`../wdp-api-initialize-scene/SKILL.md`

2. `general-event-registration.template.js`
- 通用事件注册模板
- 对应技能：`../wdp-api-general-event-registration/SKILL.md`

3. `scene-camera.template.js`
- 相机读取/飞行/聚焦模板
- 对应技能：`../wdp-api-scene-camera/SKILL.md`

4. `generic-base-attributes.template.js`
- 通用基础属性读取/更新模板
- 对应技能：`../wdp-api-generic-base-attributes/SKILL.md`

5. `official-*.md`
- 来自新版后台的可读脚本摘录（用于快速复制方法）

## 使用方式

1. 优先查看 `official-*.md` 获取对应 API 的现成脚本。
2. 在项目中复制模板文件并替换 `TODO`、参数对象和业务回调。
3. 保留时序门禁：`Renderer.Start()` 成功后再注册场景事件，场景 ready 后再进入业务调用。

## 安全与流程约束

- 不在仓库或脚本中保存后台 token。
- 每次需要查询 `wdpapidoc-admin` 时，由用户临时提供 token。
- 若后台草稿与线上发布文档冲突，默认按线上发布口径执行，除非用户明确指定按后台草稿。

## 参数约定（统一）

- `id`: 渲染容器 DOM id，默认 `player`
- `url`: 渲染服务地址，默认 `https://dtp-api.51aes.com`
- `order`: 32 位十六进制渲染口令
- `resolution`: 分辨率数组 `[width, height]`
- `debugMode`: 日志级别，默认 `normal`
- `keyboard`: 键盘配置，默认 `{ normal: false, func: false }`
