---
title: "Skills：小而准的行为系统"
date: 2026-07-24T11:00:00+08:00
slug: "skills-behavior-system"
draft: false
tags: ["AI", "Agent", "Skills", "工程方法"]
categories: ["AI"]
description: "一篇关于 Agent Skill 设计方法的学习笔记，梳理 Skill 的本质、触发机制、结构规范、渐进式披露、行为约束、验证流程与安全边界。"
---
# Skills - 小而准的行为系统

| 链接                                                         | 来源             | 时间       |
| ------------------------------------------------------------ | ---------------- | ---------- |
| [Agent Skills Overview - Agent Skills](https://agentskills.io/home) | Agent Skills     |            |
| [阿里开源 skill-up：让 Agent Skill 可评测可回归]()           | 阿里技术         | 2026/07/23 |
| [NL2SQL 在超大规模数仓场景的架构突破与工程实践](https://mp.weixin.qq.com/s/RDIMNWfITiBqC7e8pBa8bw) | 阿里技术         | 2026/07/21 |
| [一文讲透Skill](https://mp.weixin.qq.com/s/0Cc2pjv6Mnf6U-C-H7RWpg) | 腾讯云开发者     | 2026/07/16 |
| [面向复杂业务场景的智能分析 Skills 架构设计与演进实践](https://mp.weixin.qq.com/s/mF3TyV_GzkBdoyYfK14fWQ) | 阿里技术         | 2026/07/17 |
| [AI Agent 的 Skill 系统设计](https://mp.weixin.qq.com/s/idzAV3XkWWm7GnFOFyZUBw) | 大淘宝技术       | 2026/07/01 |
| [anthropics/skills: Public repository for Agent Skills](https://github.com/anthropics/skills) | Anthropics       |            |
| [Using skills OpenAI](https://openai.com/academy/skills/)    | OpenAI           | 2026/04/10 |
| [How AI assistance impacts the formation of coding skills \ Anthropic](https://www.anthropic.com/research/AI-assistance-coding-skills) | Anthropics       | 2026/01/29 |
| [一文了解｜SkillScan 智能体技能安全扫描最佳实践](https://mp.weixin.qq.com/s/GaefP5FMN8b-1JBfrUMqzQ) | 字节跳动技术团队 | 2026/07/01 |

> A standardized way to give AI agents new capabilities and expertise.

**放在前面的强调**：

1. **本质**：Skill 是 Agent ⾏为设计的⼀种⼯程⽅法。它把触发、加载、执⾏、约束、验证和迭代组织在⼀起，让通⽤ Agent 在特定任务上获得更稳定的专业⾏为。
2. **要求**：Skill 不是写清楚说明，而是让 Agent 在复杂环境中更难走错。
3. **信息策略**：默认 Agent 足够聪明，只补它不知道且必须知道的；单一信息源，重复必漂移。
4. **加载条件**：仅当任务有固定流程/格式/合规要求，且通用能力不足以稳定产出时才加载。
5. **边界固化**：固化为输出格式、调用顺序、检查点、兜底路径；定好任务自由度边界，其余留给 Agent 自主判断。
6. **验证标准**：复杂skill基于真实案例前向测试，不靠作者自信。
7. **组织原则**：SKILL.md 只放核心流程（上下文是公共资源）；脚本承确定性操作，引用承领域知识，资产承输出材料。简洁、分层、可验证、可迭代。

## 为什么

>Agents are increasingly capable, but often don’t have the context they need to do real work reliably. 

- 补充LLM缺乏的实际工作背景和专业领域知识
- 可重复的正确工作流程，将多步骤任务转化为一致的、可审计的流程
- 跨agent复用

Skill 面向的是 Agent，它会在上下文不足、任务复杂、目标冲突或执行压力下走捷径。因此，Skill 必须预设这些失败模式，并把正确路径写成更容易被执行的行为结构。



## 是什么

>Agent Skills are a lightweight, open format for extending AI agent capabilities with specialized knowledge and workflows.

**Skill = API接口 + OpenAPI描述文档**

- API 接口：执行动作的肌肉
- OpenAPI描述文档： 模型能读懂的说明书

起到翻译枢纽、行为编程的功能，将需求描述转换为固定的流程，并让LLM能够按照流程执行工具，获取结果

<img src="https://mmbiz.qpic.cn/mmbiz_png/DthwRd8vvp0eiaQjbcsjPicgUJ7QOlMvp7cz5c7Gia9Kujz7H4QJmjMeQhn4yk5EsWJUdXMye2IpTlXESkUYaV1l4F5ILpLtJUibL9u2PvaosM0/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1" alt="图片" style="zoom:50%;" />

```text
skill-name/
├── SKILL.md (必需)
│   ├── YAML frontmatter 元数据 (必需)
│   │   ├── name: (必需)
│   │   ├── description: (必需)
│   │   └── license: (可选)
│   └── Markdown 说明 (可选)
└── 捆绑资源 (可选)
    ├── scripts/          - 可执行代码 (Python/Bash等)
    ├── references/       - 需要时加载到上下文的文档
    └── assets/           - 输出中使用的文件 (模板、图标、字体等)
```





### 触发时机

模型自己没有的能力、不确定的事情，会加载 Skill：

- A. "无知"机制（不得不查）: 涉及实时性、私有数据，AI 几乎 100% 会调用 Skill。
- B. "省力/准确"机制（怕算错）: 模型有能力但会出错，取决于模型对自己的能力认知。
- C. "副作用"机制（必须动手）：超过生成文本的能力，必须实际交互并产生副作用。

当只涉及通用知识、闲聊、逻辑推理，或缺少工具时，不会采用 Skill。



## 设计原则

### 上下文窗口是公共资源

Skill 设计的第一条工程原则是：上下文窗口是公共资源。也就是此多彼少

再次强调：**写 Skill 时要默认 Agent 已经很聪明，只补充它不知道、但完成任务必须知道的内容。**

每一段内容都应该经受两个问题的挑战：

- Agent 真的需要这段解释吗？
- 这段内容值得它占用的 token 成本吗？



### 渐进式披露

由上很明显，skill设计应该采用渐进式披露，而不是一股脑塞进去

<img src="https://mmbiz.qpic.cn/mmbiz_png/DthwRd8vvp3mpnhjPCBXOF5jStPwUcAMxzasewOA1OO5ack9Z3yqlZ6vbtLCsAdSiaVGoX47q9SYACebJFuafaiav0ibcz1YtLuG4CZaPMiaY0k/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5" alt="图片" style="zoom: 50%;" />

1. **Discovery**: 启动后，只加载每个skill的名称和描述，只需要能够用来判断何时skill可能会和任务相关
2. **Activation**: 当任务和skill的描述匹配，加载skill.md全文进入上下文
3. **Execution**: agent按照skill指令执行，并按照skill内容加载所需的资源（scripts/references/assets）

## 结构规范

> 详细规范见 [Specification - Agent Skills](https://agentskills.io/specification)

### SKILL.md

SKILL.md是必选项，其中包含两层目的：
第一层是skill要能识别，能触发；第二层是触发了之后提供可控的流程和边界。

因此引出SKILL.md的不同部分

#### YAML frontmatte  --- 识别触发

| 字段          | 是否必须 | 约束条件                                                     |
| ------------- | -------- | ------------------------------------------------------------ |
| name          | 是       | 最大64个字符。仅允许小写字母、数字和连字符。不得以连字符开头或结尾。 |
| description   | 是       | 最大1024个字符。非空。描述该技能的功能及使用场景。（是路由不是教程） |
| license       | 否       | 许可证名称，或对某个捆绑许可证文件的引用。                   |
| compatibility | 否       | 最大500个字符。指明环境要求（如目标产品、系统软件包、网络访问等）。大部分不需要 |
| metadata      | 否       | 任意键值映射，用于附加元数据。                               |
| allowed-tools | 否       | 以空格分隔的字符串，列出该技能可预先批准使用的工具。（实验性功能） |

```python
---
name: pdf-processing
description: Extract PDF text, fill forms, merge files. Use when handling PDFs.
license: Apache-2.0
compatibility: Requires Python 3.14+ and uv
metadata:
  author: example-org
  version: "1.0"
---
```

- name要明确、简洁，术语skill发现机制的一部分
- description 包含“这个 Skill 做什么”和“什么时候使用它”，不能变成完整工作流摘要。它的职责是让 Agent 正确加载正文，而不是让 Agent 读完描述就开始凭印象执行。
  - Skill 做什么
  - 何时使用
  - 典型触发词
  - 相关症状
  - 输入或任务类型

#### Body content --- 可控的流程和边界

frontmatter 之后的 Markdown 正文部分包含技能指令。没有格式限制。请编写任何有助于智能体高效执行任务的内容。

推荐包含以下章节：
- 分步操作说明
- 输入与输出的示例
- 常见的边界情况
- ai借口合理化

一旦智能体决定激活某个技能，它将加载整个文件。如果 SKILL.md 内容较长，可考虑将其拆分为被引用的多个文件，只给agent不知道的、任务必须要的上下文。

**注意一个Agent的问题，合理化**，在有上下文压力等会跳过规则并找到合理理由，需要提前写出来并反驳

| 常见借口                      | 应写进Skill的反驳                                        |
| ----------------------------- | -------------------------------------------------------- |
| “这个Skill很简单，不需要例子” | 没有例子就不知道触发边界，也不知道需要哪些资源。         |
| “先写SKILL.md，之后再补资源”  | 资源设计决定正文结构，后补容易造成重复和上下文膨胀。     |
| “脚本很短，每次生成也可以”    | 重复生成的脆弱代码会漂移，脚本能提供确定性。             |
| “验证只是格式检查，可以跳过”  | 格式错误会直接影响发现和加载，必须尽早暴露。             |
| “子代理看一下就行”            | 验证不能泄露预期答案，否则测的是复述能力，不是泛化能力。 |

**skill的相互引用应该是条件的路由而不是强制加载**

```markdown
**必需：** 创建新 Skill 前，先使用 skill-x。
**推荐：** 如果要将其发布为开发者文章，使用 skill-y。
**另见：** openai_yaml.md，了解 UI 元数据字段。
```

| 级别        | 语义       | 使用时机       |
| ----------- | ---------- | -------------- |
| REQUIRED    | 必须先加载 | 前置依赖       |
| RECOMMENDED | 建议加载   | 能明显提高质量 |
| SEE ALSO    | 可选参考   | 扩展阅读       |

### 可复用资产管理

创建 Skill 时，不应该一开始就写长篇 SKILL.md。更好的路径是先看具体例子，然后判断哪些东西值得变成可复用资源。（这句话有点意思）

信息只放一个地方。不要在 SKILL.md 和 references/ 中重复同一段规则。重复会带来漂移，漂移会让 Agent 在两个版本之间自行解释，最后把维护成本转化成执行风险。

| 资源        | 适合放什么                               | 不适合放什么               |
| ----------- | ---------------------------------------- | -------------------------- |
| scripts/    | 反复执行、容易写错、需要确定性的操作     | 只用于解释概念的示意代码   |
| references/ | schema、API 文档、政策、长示例、领域规则 | 每次执行都必须读的核心流程 |
| assets/     | 模板、图片、字体、样例工程、PPT 母版     | 需要被读入上下文的大段说明 |

#### scripts/

重复使用到的代码，或者任务需要完全确定性流程使用

脚本的价值不是“让目录更丰富”，而是减少上下文消耗和行为漂移。让 Agent 每次临时生成 PDF 旋转代码，和让它调用一个已经验证过的脚本，是完全不同的可靠性水平。

#### references/

任务执行时需要查阅的知识，但不是每次都必读的流程

如果用户问销售指标，Agent 只需要读 sales.md 或对应领域文件，不应该同时加载财务、产品、市场的所有规则。这就是渐进披露在真实 Skill 中的价值：信息可发现，但不抢占上下文。

#### assets/

不作为上下文读入，但是作为输出材料被复制、修改和引用。

例如模板工程、字体、图片、PPT 模板、品牌素材都属于资产。它们不是给 Agent 阅读的长文本，而是给最终产物使用的材料。

## 行为约束与自由度

按照任务风险设置自由度，根据任务的脆弱度和变化空间进行匹配

<img src="https://mmbiz.qpic.cn/mmbiz_png/DthwRd8vvp0nMc22cxrnqqqncibb5mmiaicbzhLuPHjGNLNibvWxIF33vAH5ZpAKhHQpicOiadWfZFcwb0qqZbYXnAvYjib349hCqtuJKUfjiahR9pU/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9" alt="图片" style="zoom:50%;" />

| 自由度   | 适用场景                           | 表达方式                     |
| -------- | ---------------------------------- | ---------------------------- |
| 高自由度 | 多种做法都合理，需要结合上下文判断 | 文本原则、启发式规则         |
| 中自由度 | 有推荐模式，但允许参数变化         | 伪代码、参数化脚本、模板     |
| 低自由度 | 操作脆弱、容易出错、必须一致       | 固定脚本、少量参数、明确顺序 |

例如： 

- 写技术文章：适合高自由度，用结构原则、语气规则和示例引导。
- 查询内部指标：适合中自由度，用 SQL 模板和字段说明控制口径。
- 旋转 PDF、转换格式、生成固定报告：适合低自由度，用脚本保证确定性。

也就是说，注意流程的自由度很关键，不同风险操作给出不同的自由度

### 门控

在低自由度任务里，门控尤其重要。Skill 如果只写“建议先做 A”，Agent 很可能直接进入 B。门控的作用是：在条件满足前，明确禁止后续动作。

门控不是语气问题，而是执行边界。它能减少 Agent 的解释空间，让 Skill 在关键路径上更像程序，而不是建议。

```markdown
<HARD-GATE>
在理解具体使用示例并规划好可复用资源之前，不要创建或编辑该 Skill。
</HARD-GATE>
```

| 门控类型   | 用途                             | 示例                               |
| ---------- | -------------------------------- | ---------------------------------- |
| 前置门控   | 完成A才能开始B                   | 先理解例子，再设计资源             |
| 上下文门控 | 特定角色或环境跳过流程           | 子代理不加载入口Skill              |
| 验证门控   | 有证据才能声明完成，通过后再交付 | quick_validate.py 验证通过后再交付 |
| 审查门控   | 审查通过才能继续                 | 计划通过后再实现                   |

## 创建与验证

重点不要一开始写流程，而是要关注使用边界和流转

<img src="https://mmbiz.qpic.cn/mmbiz_png/DthwRd8vvp2BmRBmfZ6P8cyKLBAHCCGKLRxDUs33DBvudSrTa0sZHbq8ficK3MAtMd8GjIbGIpNXrcGe4O9qxkh1oOibvx0JReQ4T8IyNdgTk/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=15" alt="图片" style="zoom:50%;" />

1. 理解具体使用例子
2. 规划可复用资源
3. 初始化 Skill
4. 编辑 SKILL.md 和资源
5. 验证 Skill
6. 基于真实使用迭代

复杂流程还需要编号检查表，并要求 Agent 外化进度。否则，Agent 很容易执行前几步后忘记后面的验证和迭代。(重要)

### 初始化skill环境

```bash
git clone https://github.com/openai/skills.git openai-skills
```

```bash
python .\scripts\init_skill.py pdf-editor
    --path "$CodexHome\skills" 
    --resources scripts,references
```

使用创建脚本减少结构错误

### 写skill

这里挖个坑，后面实践再慢慢分享

### 写完之后的收尾

```bash
python .\scripts\quick_validate.py <path/to/skill-folder>
```

使用skill测试效果

```mark
正确：使用位于 /path/to/skill-x 的 @skill-x 来解决问题 y。

错误：审查这个 Skill。我认为它存在问题 A，预期的修复方案是 B。
```

### 交付前自查表

| 反模式              | 表现                               | 修正                                 |
| ------------------- | ---------------------------------- | ------------------------------------ |
| 把Skill当文档       | 背景很长，流程很散                 | 只保留可执行知识                     |
| description写成教程 | Agent不读正文就开始执行            | 描述只负责触发                       |
| 自由度不匹配        | 脆弱任务只给建议，开放任务写死流程 | 按任务风险设置自由度                 |
| 资源不分层          | 所有内容塞进SKILL.md               | 用scripts/、references/、assets/分离 |
| 重复信息            | 正文和引用文件都有同一规则         | 信息只放一个地方                     |
| 跳过验证            | 写完就交付                         | 运行格式验证和真实任务测试           |
| 验证泄露答案        | 子代理知道预期修复                 | 只给原始任务和材料                   |
| 额外文档膨胀        | 创建README、安装指南、变更日志     | 只保留执行必需文件                   |

### 评估

<img src="https://mmbiz.qpic.cn/mmbiz_png/DthwRd8vvp3ibUqR8C7tES5geD91bWFQK0WiaoBVy0LKb42kYuiaz1oOCStqKgJkCChLK2DJorQ0oia60PnrtL6mdWx6ZW3e1pMD3t5vF6ta9PA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=18" alt="图片" style="zoom:50%;" />

**Skill 的价值是把期望行为转化成 Agent 能稳定执行的工作流。一个好的 Skill 要同时解决四件事： **

1. 让 Agent 在正确场景发现它
2. 用最少上下文加载必要信息
3. 按任务风险设置合适的自由度
4. 并通过真实任务验证它是否改变了行为。



**一个有效的 Skill 要影响 Agent 的完整行为链路：**

- 什么时候发现这个 Skill，什么时候不触发
- 什么时候加载完整正文
- 哪些信息继续按需读取
- 哪些动作必须先做
- 哪些行为绝对不能发生
- 如何证明任务真的完成，成功的标准是什么
- 什么时候需要停下来请求人类判断
- 任务的输入是什么、输出是什么
- 哪些步骤会出现错误



**前向测试应该给子代理原始任务、原始材料和必要上下文，按照规范的流程像真实使用者执行，记录原始证据**

- 示例 prompt
- 输出文件
- diff
- 日志
- 行为轨迹
- 失败截图
- 测试结果



**审查循环也应该围绕真实失败风险，而不是措辞偏好：**

```
写或修改 Skill
-> 运行格式验证
-> 用真实任务前向测试
-> 是否存在会导致任务失败的问题？
-> 是：修复并重测-> 否：交付
```

应该阻塞的问题包括触发条件模糊、资源引用缺失、脚本不可运行、验证流程缺失、自由度设置错误、关键信息重复且容易漂移。不应该阻塞的问题包括纯粹风格偏好、不影响执行的标题顺序、可以由 Agent 自行判断的轻微表达差异。



## 安全与边界

Skill 作为可执行代码载体，还面临安全层面的挑战。

安全隐患：

1. AI幻觉导致命令执行错误
2. 提示词注入攻击
3. 恶意代码下载



措施:

**A. 沙箱环境 (Sandbox) —— 最重要**

永远不要让 AI 直接在你的宿主机（Host）上跑代码。

- **Docker 容器**
- **虚拟机 (VM)**
- **E2B / Code Interpreter API**

**B. 人类介入 (Human-in-the-loop) —— 核按钮**

在执行任何敏感操作（删除、修改、发送邮件、转账）之前，强制暂停。

**C. 最小权限原则 (Least Privilege)**

- **只读权限：** 如果 Skill 只需要读取文件，就不要给它“写”和“执行”的权限。
- **白名单：** 限制 Skill 只能访问特定的文件夹（比如 /app/data/），严禁访问系统目录（如 C:\Windows\ 或 /etc/）。
- **网络限制：** 如果是本地处理文件的 Skill，禁止它访问互联网，防止它把数据传出去。

## 如何获取

| 平台                                                         | 特点                                   | 适合人群   |
| :----------------------------------------------------------- | :------------------------------------- | :--------- |
| [OpenAI GPT Store](https://chatgpt.com/gpts?openaicom_referred=true) | 最大 C 端市场（Kayak/Canva 等 Action） | 普通用户   |
| [Zapier](https://zapier.com/)                                | 连接器之王（6000+ 应用封装）           | 企业用户   |
| [LangChain Hub]([Hub - LangSmith](https://smith.langchain.com/hub)) | 程序员的军火库（pip install 即用）     | 开发者     |
| https://github.com/lingxling/awesome-skills-cn               | 中文skill学习平台                      | 学习者     |
| Coze/Dify 插件市场                                           | 低代码拖拽（谷歌搜索/PDF解析等）       | 无代码用户 |



## 实践

### ai-morning-brief

> 每天自动生成一份行业早报

#### 功能

- 自动搜索全网最新资讯（支持任意主题：AI、半导体、新能源……）
- 智能打分筛选，只保留高价值新闻
- 生成两份文档：团队内参 PPT + 公众号发布 Word
- 还能自动发邮件推送

#### 架构

<img src="https://mmbiz.qpic.cn/mmbiz_png/ZRhjO8xAWr69tVS6kGfu2Wcpt8lBQfCx6Wh0Zmlu9nibWzib3srer8vwdQFLD3f0FueshEFONAo9W7ojancEZN5Gz0O5RYbsMHaxjYW2ycr4o/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4" alt="图片" style="zoom:33%;" />

```text
ai-morning-brief/
├── config.yaml                    # 配置文件
├── main.py                        # 主程序入口
├── requirements.txt               # Python 依赖
├── src/skills/morning_brief/      # Skill 核心代码
│   ├── __init__.py                # 双模式自动切换
│   ├── agent_mode_helpers.py      # 智能体模式：脚本只做手脚
│   ├── searcher.py                # 新闻搜索引擎
│   ├── brain.py                   # LLM 分析引擎（Skill 模式用）
│   ├── ppt_generator.py           # PPT 生成器
│   ├── word_generator.py          # Word 生成器
│   ├── notifier.py                # 邮件推送
│   ├── memory.py                  # 历史数据持久化
│   ├── models.py                  # 数据模型
│   └── config_loader.py           # 配置加载器
├── data/output/                   # 生成的文档
├── data/history/                  # 历史数据
└── SKILL.md                       # Skill 说明书
```

```markdown
---
name: ai-morning-brief
description: 搜索新闻、生成早报、新闻分析总结。零 API Token 配置。
---

# AI Morning Brief Skill

## 工作流程

### Step 1: 搜索新闻（脚本执行）
运行 search_news(topic='AI') 获取新闻列表

### Step 2: 打分筛选（你自己思考，不调用任何 API！）
拿到新闻后，你自己打分，淘汰 score < 60 的

### Step 3: 抓取完整正文（脚本执行）
对入选新闻调用 fetch_full_content(urls)

### Step 4: 深度分析（你自己思考）
结合完整正文，生成 summary_deep 和 summary_public

### Step 5: 在对话中输出公众号草稿
让用户第一时间阅读，无需等文件生成

### Step 6: 生成文档（脚本执行）
调用 generate_documents_from_file() 生成 PPT + Word

### Step 7: 邮件推送（可选，脚本执行）

### Step 8: 汇报结果
```































































