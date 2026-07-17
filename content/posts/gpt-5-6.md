---
title: "GPT5.6"
date: 2026-07-17T15:10:48+08:00
slug: "gpt-5-6"
tags: ["AI", "OpenAI", "Agent", "Prompt Engineering"]
categories: ["AI"]
description: "围绕 GPT-5.6 Sol 的 Agent 定位、核心能力变化，以及提示词从步骤控制转向目标定义的实践笔记。"
draft: false
---

# GPT5.6

[Prompting guidance for GPT-5.6 Sol | OpenAI API](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6)

[Model guidance | OpenAI API](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6)

## GPT5.6核心变化

> 从「回答问题的模型」 → 「执行复杂任务的 Agent 模型」

官方对于GPT-5.6 Sol的定位是**Frontier model for complex professional work**

也就是说，agent模型面向更复杂的专业问题，而不是局限于简单的问答

what is new

- **Programmatic Tool Calling**，[Programmatic Tool Calling | OpenAI API](https://developers.openai.com/api/docs/guides/tools-programmatic-tool-calling)，自己编写JavaScript 运行可用工具流，在调用之间传递结果
- **Multi-agent**，[Multi-agent | OpenAI API](https://developers.openai.com/api/docs/guides/responses-multi-agent)，并行协调多个子agent并综合结果，提升复杂问题中清晰划分独立工作流的性能
- **Explicit prompt caching**，[Prompt caching | OpenAI API](https://developers.openai.com/api/docs/guides/prompt-caching)，可以明确指定哪些可复用的 Prompt 前缀需要被 OpenAI 缓存
- **Persisted reasonin**，[Reasoning models | OpenAI API](https://developers.openai.com/api/docs/guides/reasoning#preserve-reasoning-across-calls)，多个对话轮次之间复用已有的推理内容，提升多轮交互质量，并提高缓存效率
- **Max reasoning effort**，xhigh模式，执行高难度任务
- **Frontend design**，对前端的设计支持升级
- **Original image detail**, [Images and vision | OpenAI API](https://developers.openai.com/api/docs/guides/images-vision#choose-an-image-detail-level) 图像能力理解升级
- **Intent understanding:**，用户意图理解，以及用户期望的工作深度，**本文核心**，不需要规划任务执行的步骤，而是转向任务系统的规划，给出任务的背景，硬性限制，需要审批的边界和成功标准等。` Continue to provide domain context, hard constraints, approval boundaries, and success criteria. Tell the model when an important ambiguity should trigger a question.`

| 能力                      | 对Agent影响                   |
| ------------------------- | ----------------------------- |
| Programmatic Tool Calling | Agent 可以自动编排工具流程    |
| Multi-agent               | 复杂任务可以并行执行          |
| Prompt Caching            | 降低长期运行成本              |
| Persisted Reasoning       | 支持连续任务执行              |
| Max reasoning / Pro mode  | 复杂任务质量提升              |
| Intent understanding      | Prompt 从步骤控制变成目标定义 |

## 提示词实践

>明确定义最终目标、指出重要约束条件、提供可用的信息依据、明确完成标准。其他的空间留给模型，让它自行选择高效解决路径
>
>“GPT-5.6 works best when prompts define the outcome, important constraints, available evidence, and completion bar, then leave room for the model to choose an efficient path.”

- 删除重复指令和实例精炼prompts、简化工具描述，可以提升任务表现和Token使用效率

### 简化提示词

- 删除重复描述同一规则的内容
- 删除不会改变模型行为的重复风格要求或者流程要求
- 删除与当前任务无关的描述

**检查提示词是否冲突**，模型会严格遵守prompts的规则，相互冲突会造成比缺少细节更大的不稳定

### 结果为先、明确停止条件

1. 描述目的结果而不是规划执行，给模型灵活执行空间释放性能：

```
Resolve the customer's issue end to end.

Success means:
- make the eligibility decision from available policy and account evidence
- complete any allowed action before responding
- return completed_actions, customer_message, and blockers
- if required evidence is missing, ask for the smallest missing field
```

避免使用不必要的绝对规则命令

对于需要判断的情况，优先使用决策规则，根据条件路由操作

2. 添加停止条件：

```
Resolve the request in the fewest useful tool loops, but do not let loop minimization outrank correctness, required evidence, calculations, or required citations.

After each result, ask whether the core request can now be answered withuseful evidence. If yes, answer. If required evidence is still missing,name the missing fact and use the smallest useful fallback.
```








