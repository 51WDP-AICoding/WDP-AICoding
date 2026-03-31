# Skill 设计指导手册

> 基于 SKILL Code 最佳实践文档整理，用于指导 WDP AI Coding 项目中 Skill 的设计与优化

---

## 一、核心设计原则

### 1. 高效性（Efficiency）- 上下文管理

#### 关键原则
- **按需加载**：Skills 在相关时自动应用，或通过 `/skill-name` 直接调用，不会使每次对话膨胀
- **简洁性**：保持 SKILL.md 简短，对于每一行问自己："删除这个会导致 AI 犯错吗？"

#### 原文摘录
> "SKILL.md 在每个会话中加载，所以只包括广泛适用的东西。对于仅有时相关的域知识或工作流，改用 skills。AI 按需加载它们，不会使每次对话都膨胀。"

> "保持简洁。对于每一行，问自己："删除这个会导致 AI 犯错吗？" 如果不会，删除它。"

#### 实践建议
- 将广泛适用的内容放入 SKILL.md
- 将特定领域知识放入独立的 Skill 文件
- 定期清理 context window，使用 `/clear` 避免厨房水槽会话

---

### 2. 高性能（Performance）- 并行与隔离

#### 关键原则
- **Subagents 隔离**：在单独的 context windows 中运行，不污染主对话
- **非阻塞执行**：Hooks 在特定点自动运行，不中断主工作流

#### 原文摘录
> "Subagents 在自己的 context 中运行，拥有自己的一组允许的工具。它们对于读取许多文件或需要专门关注而不会使你的主对话混乱的任务很有用。"

> "与 SKILL.md 指令不同，hooks 是确定性的，保证操作发生。"

#### 实践建议
- 使用 subagents 处理大量文件读取任务
- 使用 hooks 处理必须每次发生的确定性操作
- 避免在主对话中堆积不相关的上下文

---

### 3. 高可靠性（Reliability）- 验证与确定性

#### 关键原则
- **自我验证**：提供测试、截图或预期输出，让 AI 可以检查自己
- **确定性执行**：Hooks 保证操作每次都会发生，没有例外

#### 原文摘录
> "当 AI 能够验证自己的工作时，例如运行测试、比较屏幕截图和验证输出，它的表现会显著提高。"

> "使用 hooks 来处理必须每次发生且没有例外的操作。"

#### 实践建议
- 在 Skill 中提供验证机制（测试命令、预期输出示例）
- 对于关键操作使用 hooks 确保确定性执行
- 提供截图或输出示例作为验证基准

---

### 4. 可维护性（Maintainability）- 模块化与配置

#### 关键原则
- **模块化设计**：Skills、Subagents、Hooks 分离不同关注点
- **可配置权限**：支持 Auto mode、权限允许列表、沙箱隔离

#### 原文摘录
> "有三种方式来减少这些中断：Auto mode、权限允许列表、沙箱。"

#### 实践建议
- 将不同关注点分离到独立的 skill/subagent/hook
- 配置适当的权限级别，减少用户确认中断
- 使用沙箱隔离敏感操作


---

## 二、设计模式示例

### 2.1 Skill 示例结构

```markdown
---
name: api-conventions
description: REST API design conventions for our services
---

# API Conventions

## URL 设计
- Use kebab-case for URL paths
- Use camelCase for JSON properties

## 响应格式
```json
{
  "code": 200,
  "data": {},
  "message": "success"
}
```

## 验证命令
```bash
npm run test:api
```
```

### 2.2 Subagent 示例结构

```markdown
---
name: security-reviewer
description: Reviews code for security vulnerabilities
model: opus
---

# Security Reviewer

You are a senior security engineer. Review code for:
- Injection vulnerabilities
- Authentication flaws
- Authorization bypasses
- Data exposure risks

## 输出格式
对于每个发现的问题，提供：
1. 问题描述
2. 风险等级（Critical/High/Medium/Low）
3. 修复建议
4. 代码示例
```

### 2.3 Hooks 使用场景

| 场景 | Hook 类型 | 示例 |
|------|----------|------|
| 代码质量检查 | 文件编辑后 | 运行 eslint |
| 敏感操作保护 | 文件写入前 | 阻止写入迁移文件夹 |
| 自动格式化 | 文件保存后 | 运行 prettier |
| 测试验证 | 代码修改后 | 运行相关测试 |

---

## 三、避免的失败模式

### 3.1 厨房水槽会话（Kitchen Sink Sessions）

**问题**：不相关任务之间不使用 `/clear`，导致 context window 过度填充

**解决**：
- 任务切换时使用 `/clear`
- 使用 subagents 隔离不同任务
- 定期清理无关上下文

### 3.2 过度指定的 SKILL.md（Over-specified SKILL.md）

**问题**：文件太长导致 AI 忽略规则

**解决**：
- 保持简洁，只包含广泛适用的内容
- 特定领域知识放入 skills
- 每行都问自己："删除这个会导致 AI 犯错吗？"

### 3.3 信任然后验证的差距（Trust-then-Verify Gap）

**问题**：不提供验证机制，AI 无法自我检查

**解决**：
- 提供测试命令
- 提供预期输出示例
- 提供截图对比基准

### 3.4 无限探索（Infinite Exploration）

**问题**：不限定范围的"调查"请求

**解决**：
- 明确任务边界
- 使用 subagents 限定探索范围
- 设置明确的完成标准


---

## 四、Skill 设计检查清单

在创建或优化 Skill 时，使用以下检查清单：

### 4.1 内容质量
- [ ] 内容简洁，无冗余信息
- [ ] 每行都有明确目的
- [ ] 删除后会导致错误的规则已保留

### 4.2 验证机制
- [ ] 提供测试命令或验证方法
- [ ] 提供预期输出示例
- [ ] 提供截图对比基准（如适用）

### 4.3 工具声明
- [ ] 权限设置遵循最小权限原则
- [ ] 复杂任务指定合适的 `model`

### 4.4 模块化
- [ ] 不同关注点分离到独立单元
- [ ] 广泛适用内容放入 SKILL.md
- [ ] 特定领域知识放入 Skills

### 4.5 可维护性
- [ ] 使用版本控制管理 Skills
- [ ] 配置适当的权限级别
- [ ] 文档清晰，易于理解

---

## 五、WDP 项目特定建议

### 5.1 Skill 命名规范
- 使用 `wdp-` 前缀标识 WDP 相关技能
- 使用清晰的描述性名称
- 示例：`wdp-api-initialization-unified`, `wdp-entry-agent`

### 5.2 目录结构
```
skills/
├── wdp-api-*/          # API 相关技能
├── wdp-context-memory/  # 上下文管理
├── wdp-entry-agent/     # 入口代理
├── wdp-intent-orchestrator/  # 意图编排
└── ...
```

### 5.3 依赖关系管理
- 明确声明 skill 之间的依赖关系
- 避免循环依赖
- 使用 orchestrator 协调复杂工作流

---

## 六、WDP Skill 优化约束（重要）

> ⚠️ **警告**：WDP 是独立的产品，具有特定的 API 和行为规范。在优化 WDP Skill 时，**严禁**基于通识经验进行代码层面的推理，否则可能导致严重的使用问题。

### 6.1 严禁事项

#### ❌ 禁止基于通识推理添加代码示例
- **错误做法**：根据方法名推测 API 调用方式并添加代码示例
- **示例**：看到 `GetCameraPose` 就添加 `App.Camera.GetCameraPose()` 示例
- **后果**：WDP 实际 API 可能是 `App.CameraControl.GetCameraPose()`，导致用户代码无法运行

#### ❌ 禁止基于通识推理添加验证流程
- **错误做法**：根据通用开发经验添加验证步骤和预期输出
- **示例**：添加 "Vite 启动后显示 Local 地址" 作为验证标准
- **后果**：可能与 WDP 实际运行环境不符

#### ❌ 禁止基于通识推理添加配置示例
- **错误做法**：根据通用前端经验添加 HTML/CSS 配置示例
- **示例**：添加通用的 z-index 层级规范
- **后果**：可能与 WDP 实际渲染机制冲突

### 6.2 允许事项

#### ✅ 基于文件已有内容的格式优化
- 将列表改为表格（内容不变，仅格式优化）
- 删除重复内容
- 修复乱码字符

#### ✅ 引用 official 文档
- 指引用户参考 `../official_api_code_example/*.md`
- 引用已有的代码示例（如果 skill 文件中已有）
- 添加参考资料链接

#### ✅ 基于文件内容的重组
- 将分散的验证步骤整合为章节（不添加新的验证逻辑）
- 将问题描述重组为表格形式

### 6.3 优化前检查清单

在优化 WDP Skill 前，必须确认：

- [ ] 是否只做了格式优化（表格化、删除重复、修复乱码）？
- [ ] 是否添加了任何代码示例？如果是，是否基于 official 文档？
- [ ] 是否添加了验证流程？如果是，是否基于文件已有内容？
- [ ] 是否添加了配置建议？如果是，是否基于 WDP 实际项目经验？

### 6.4 遇到不确定内容时的处理

1. **优先删除**：如果不确定内容来源，按照剃刀原则删除
2. **引用代替**：用"参考 official-xxx.md"代替具体的代码示例
3. **询问确认**：在添加任何代码示例前，先读取 official 文档确认

---

## 七、深度优化检查要求（重要）

> 基于 wdp-api-layer-models 优化经验，对于涉及具体 API 调用的 Skill，必须进行深度检查。

### 7.1 何时需要深度检查

以下情况必须进行深度检查（读取 official 文档交叉验证）：
- Skill 涉及具体的 API 方法名和参数
- Skill 包含代码示例
- Skill 描述的能力范围与 official 文档可能不一致
- 用户明确要求"深度检查"或"交叉验证"

### 7.2 深度检查步骤

#### 步骤 1：读取 official 文档
```
读取 skills/official_api_code_example/official-{对应模块}.md
```

#### 步骤 2：对比检查清单

| 检查项 | Skill 文件 | Official 文档 | 差异处理 |
|--------|-----------|--------------|---------|
| 方法名 | `App.Xxx.yyy` | `App.Xxx.yyy` | 必须一致 |
| 参数结构 | `{a: 1, b: 2}` | `{a: 1, b: 2}` | 必须一致 |
| 调用路径 | `App.Scene.Tiles` | `App.Scene.Tiles` | 版本差异需说明 |
| 功能覆盖 | 描述的能力 | 实际能力 | 缺失需补充 |
| 代码示例 | 提供的示例 | 官方示例 | 不一致需修正 |

#### 步骤 3：识别差异类型

**类型 A：方法名/参数错误**（严重）
- 示例：Skill 写 `App.Camera.GetPose()`，Official 写 `App.CameraControl.GetPose()`
- 处理：**必须修正**，否则会导致用户代码错误

**类型 B：版本差异未说明**（中等）
- 示例：Skill 未说明 AES5/AES6 的 API 路径差异
- 处理：**必须补充**，添加版本差异说明

**类型 C：功能缺失**（中等）
- 示例：Skill 缺少 official 文档中的高级功能（如 VisibilityGroup）
- 处理：**评估后补充**，确保能力覆盖完整

**类型 D：变量命名不一致**（轻微）
- 示例：Skill 用 `RealTimeVideo`，Official 用 `realTimeVideo`
- 处理：**类名大写正确，变量名小写正确**，无需修改

### 7.3 深度优化内容规范

#### ✅ 必须补充的内容
1. **版本差异说明**：AES5/AES6、不同引擎版本的 API 差异
2. **多种调用方式**：工厂模式 vs 对象模式
3. **缺失的功能模块**：official 文档中有但 skill 中缺失的功能
4. **高频问题完善**：基于 official 文档补充常见问题

#### ❌ 禁止补充的内容
1. **通识推理的代码示例**：未经验证的 API 调用方式
2. **官方文档中不存在的方法**：自行推测的方法
3. **未经验证的参数**：官方文档未提及的参数配置

### 7.4 工作边界

**Skill 的职责**：
- 提供技能范围内的能力描述
- 引用 official 文档作为真值来源
- 说明版本差异和调用方式选择

**Official 文档的职责**：
- 提供准确的 API 方法名和参数
- 提供官方代码示例
- 作为最终真值来源

**Skill 不应替代 Official 文档**：
- Skill 不应重复 official 文档的完整 API 列表
- Skill 应聚焦于"如何使用"而非"完整参考"
- Skill 应明确标注"详见 official-xxx.md"

### 7.5 深度优化后检查清单

- [ ] 是否读取了对应的 official 文档？
- [ ] 是否检查了方法名和参数的一致性？
- [ ] 是否识别并说明了版本差异？
- [ ] 是否补充了缺失的功能模块？
- [ ] 是否验证了代码示例的准确性？
- [ ] 是否添加了基于 official 文档的高频问题？
- [ ] 是否保持了 Skill 的简洁性（不重复 official 文档）？

---

## 八、参考资源
