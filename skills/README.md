# WDP AI Coding Skills 快速使用规则

这份文件是团队**首次使用唯一入口**。  
目标：让同事先用一份说明，就能快速开始使用整套 skills。

## 这套 skills 是做什么的

- 用于基于 WDP 生态进行 AI 辅助开发与排障。
- 覆盖范围：WDP API、BIM API、GIS API 的接入、调用编排与常见问题修复。
- 输出目标：最小可运行方案 + 明确验证步骤。

## 首次使用怎么做

1. 先读入口技能：`./wdp-entry-agent/SKILL.md`
2. 按入口技能执行路由，不直接跳过入口去猜 sub skill。
3. 仅在需要具体接口细节时，再读取对应 sub skill 和 `api_code_example`。

## 使用原则（团队统一）

- 先走“入口编排”，后走“领域子技能”。
- 第一轮编写/补完默认以在线文档管理平台为准。
- `example` 与历史案例用于交叉验证，不作为第一优先权威来源。
- 后台 token 不落库；每次查询后台时由用户临时提供。

## 给 AI 的推荐提问方式

- “按 `wdp-entry-agent` 路由，完成 [目标功能] 的最小闭环实现，并给验证步骤。”
- “基于当前 skills，排查 [报错信息]，只给最小改动方案。”
- “按在线文档优先，补完 [API 类别] 的 sub skill 与脚本摘录。”

## 目录约定（最常用）

- 入口：`./wdp-entry-agent/SKILL.md`
- 子技能：`./<sub-skill>/SKILL.md`
- 官方摘录与模板：`./api_code_example/`
- 临时参考案例：`./example/`

## 协作建议

- 新增能力时，先补 `api_code_example`，再补对应 sub skill，最后更新入口路由。
- 每次变更都附带“验证步骤与通过标准”，便于同事复现。
