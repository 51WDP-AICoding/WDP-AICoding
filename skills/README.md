# WDP AI Coding Skills 快速使用规则

这份文件是团队首次使用的唯一入口。
目标：让同事只读一份说明，就能理解这套 skills 做什么、怎么开始用。

## 给 Agent 的最短路径

如果目标是“尽快完成 WDP/BIM/GIS 前端开发、排障或补代码”，默认按下面顺序读取：

1. `./wdp-entry-agent/SKILL.md`
2. 命中的 sub skill
3. `./api_code_example/README.md`
4. 对应 `official-*.md` 或 `*.template.js`

仅在以下场景才进入 `example/`：

1. 需要离线分析真实项目的组织方式
2. 需要把案例经验回写到 skill
3. 用户明确要求参考历史项目

## 这套 skills 是做什么的

- 用于基于 WDP 生态进行 AI 辅助开发与排障。
- 覆盖范围：WDP API、BIM API、GIS API 的接入、调用编排与常见问题修复。
- 输出目标：最小可运行方案 + 明确验证步骤。

## 首次使用怎么做

1. 先读入口技能：`./wdp-entry-agent/SKILL.md`
2. 按入口技能执行路由，不跳过入口直接猜 sub skill。
3. 仅在需要具体接口细节时，再读取对应 sub skill 和 `api_code_example`。

## 使用原则（团队统一）

- 先走“入口编排”，后走“领域子技能”。
- 第一轮编写/补完默认以在线文档管理平台为准。
- `example` 与历史案例仅用于“离线调优 skill”，不用于日常开发实时检索。
- 后台 token 不落库；每次查询后台时由用户临时提供。

## 当前 API 资料状态

- `api_code_example/official-*.md` 已完成一次方法级线上核对。
- 当前核对结果见：`./api_code_example/ONLINE_COVERAGE_AUDIT.md`
- 当前同步脚本见：`./api_code_example/sync_public_official_excerpts.ps1`
- 如果线上文档变化，优先同步 `official-*.md`，再更新对应 skill。

## 双轨工作模式（强制）

1. 开发执行轨（默认）
- 只读取：`wdp-entry-agent` + 命中 sub skill + `api_code_example`。
- 不读取：`example/trueProjects` 内案例源码与历史报告。

2. Skill 调优轨（离线）
- 使用：`wdp-internal-case-acquisition` 拉取/分析案例。
- 产出：把可复用规则回写到对应 skill。
- 清理：无增益案例按清理规则删除，仅保留高价值案例。

## 资料优先级（强制）

1. 第一优先：`api_code_example/official-*.md`
2. 第二优先：`api_code_example/*.template.js`
3. 第三优先：命中的 `sub-skill/SKILL.md`
4. 最后才是：`example/`、历史项目、离线案例

若 `official-*.md` 与 `example/` 冲突，以 `official-*.md` 为准。

## 关键参数确认规则（强制）

- 若无法确认效果参数、颜色、坐标、呈现范围等关键字段，AI 必须先向用户索取补充信息，不得直接执行开发。
- 当信息存在歧义时，必须先对齐参数口径（如 GIS/Cartesian 坐标系、HEXA/RGBA 颜色格式）。
- 未确认关键参数前，不允许把“猜测参数”作为最终实现提交。

## 临时性说明（案例驱动优化）

- 当前 skills 已加入“调度闭环”规则，但属于临时增强阶段。
- 后续会持续引入真实项目案例，优化调用逻辑与异常分支。
- 在你确认定稿前，相关闭环规则按“可迭代规范”执行。

## 给 AI 的推荐提问方式

- “按 `wdp-entry-agent` 路由，完成 [目标功能] 的最小闭环实现，并给验证步骤。”
- “基于当前 skills，排查 [报错信息]，只给最小改动方案。”
- “按在线文档优先，补完 [API 类别] 的 sub skill 与脚本摘录。”

## 目录约定（最常用）

- 入口：`./wdp-entry-agent/SKILL.md`
- 子技能：`./<sub-skill>/SKILL.md`
- 官方摘录与模板：`./api_code_example/`
- 临时参考案例：`./example/`

## 面向 API 检索的推荐入口

- 快速找方法名：`./api_code_example/OFFICIAL_EXCERPT_INDEX.md`
- 确认本地摘录是否和线上一致：`./api_code_example/ONLINE_COVERAGE_AUDIT.md`
- 重新从公开文档同步摘录：`./api_code_example/sync_public_official_excerpts.ps1`
- 查看官方文档入口：`./api_code_example/DOC_PLATFORM.md`

## Skill 索引（建议）

- 主入口编排：`./wdp-entry-agent/SKILL.md`
- 前端接入：`./wdp-frontend-integration/SKILL.md`
- BIM 核心：`./bim-api-core-operations/SKILL.md`
- GIS 核心：`./gis-api-core-operations/SKILL.md`
- 内部案例获取（下载/解压，仅内部验证）：`./wdp-internal-case-acquisition/SKILL.md`

## 关键约束（性能）

- 后续实际开发生成代码时，禁止把案例目录作为主要知识源。
- 任何案例信息必须先“蒸馏成 skill 规则”再用于开发。

## 协作建议

- 新增能力时，先补 `api_code_example`，再补对应 sub skill，最后更新入口路由。
- 每次变更都附带“验证步骤与通过标准”，便于同事复现。
- 如果只是补线上已有方法，优先更新 `official-*.md`，不要先改 `example/`。
- 如果脚本摘录更新后影响能力描述或路由，要同步更新 `wdp-entry-agent` 或对应 sub skill。

## 内部案例自动化命令

在仓库根目录执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\skills\wdp-internal-case-acquisition\auto_fetch_extract_analyze.ps1 `
  -Token '你的Admin-Token' `
  -DownloadTop 1
```
