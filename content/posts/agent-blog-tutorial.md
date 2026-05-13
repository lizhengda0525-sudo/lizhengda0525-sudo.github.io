---
title: "从学习笔记到博客：Agent 协作写稿全流程教程"
date: 2026-05-13T12:00:00+08:00
draft: false
tags: ["Claude Code", "Agent", "博客", "教程", "自动化写作"]
categories: ["AI 工具"]
description: "手把手教你从零搭建达主编、达审稿、达发布三个 Agent Skill，并用它们完成从学习笔记到博客发布的完整流程。"
---

你是否也有这样的经历：学完一个技术点，笔记写了一堆，但要整理成博客文章时却不知从何下手？本文将带你从零搭建一套基于 Claude Code 自定义 Skill 的三 Agent 协作流程，附带所有配置文件和 Skill 完整实现，让你只需几条命令就能完成从原始笔记到博客发布的全过程。
**达的话：**

​	哈哈哈，只有这一段是我自己写的，那么为什么会有这个想法呢，平时自己比较懒，一些学习记录其实并没有很好的内化记录，借着ai工具，这个流程可以推进的很快，那么就正好顺着时代潮流吧~

​	后面还是会不断修改的，毕竟我也是刚刚入手~

## 三个 Agent 各司其职

这套工作流由三个 Agent 组成，各自有一个代号：

| Agent | 代号 | 职责 | 触发命令 |
|-------|------|------|---------|
| 主稿人 | **达主编** | 将原始学习笔记转化为博客草稿 | `/blog-editor` |
| 审稿人 | **达审稿** | 审查草稿质量，输出审查报告 | `/reviewer` |
| 发布人 | **达发布** | 本地预览、构建验证、推送到 GitHub Pages | `/publish` |

完整流程如下：

```
原始笔记 ──→ 达主编（生成草稿）──→ 用户审阅 ──→ 达审稿（审查）──→ 达主编（修改）──→ 达发布（部署）
```

审查和修改可以循环多次，直到文章通过审查。

## 第一部分：环境搭建

下面从零开始搭建整套环境，包括 Hugo 博客站点、GitHub Pages 部署、以及三个 Claude Code Skill。

### Step 1: 安装 Hugo

Hugo 是一个用 Go 语言编写的静态网站生成器，我们的博客就用它来构建。

```bash
# Windows（需要 Extended 版本以支持 Sass）
winget install Hugo.Hugo.Extended

# macOS
brew install hugo

# 验证安装
hugo version
```

确保输出中包含 `extended` 字样。

### Step 2: 创建 Hugo 站点

```bash
# 创建站点
hugo new site blog
cd blog

# 初始化 Git
git init

# 添加 PaperMod 主题作为 Git 子模块
git submodule add https://github.com/adityatelange/hugo-PaperMod themes/PaperMod
```

### Step 3: 配置 Hugo

编辑站点根目录的 `hugo.toml`，替换为以下内容。注意将 `<你的GitHub用户名>` 替换为你的实际 GitHub 用户名：

```toml
baseURL = "https://<你的GitHub用户名>.github.io/"
title = "学习笔记"
theme = "PaperMod"

defaultContentLanguage = "zh-cn"

[params]
  defaultTheme = "auto"
  ShowReadingTime = true
  ShowShareButtons = true
  ShowPostNavLinks = true
  ShowBreadCrumbs = true
  ShowCodeCopyButtons = true
  ShowWordCount = true
  ShowToc = true
  TocOpen = false

  [params.cover]
    hidden = true

[outputs]
  home = ["HTML", "RSS", "JSON"]

[markup]
  [markup.highlight]
    style = "monokai"
    lineNos = true
```

### Step 4: 配置 GitHub Pages 部署

首先在 GitHub 上创建一个名为 `<你的GitHub用户名>.github.io` 的仓库。

然后在本地仓库中创建 GitHub Actions 工作流文件：

```bash
mkdir -p .github/workflows
```

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'
          extended: true

      - name: Build
        run: hugo --minify

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

在 GitHub 仓库的 Settings → Pages 中，将 Source 设置为 **GitHub Actions**。

然后将本地仓库关联到远程并推送：

```bash
git remote add origin https://github.com/<你的GitHub用户名>/<你的GitHub用户名>.github.io.git
git add .
git commit -m "初始化博客站点"
git push -u origin main
```

### Step 5: 创建 Skills 目录

Claude Code 的自定义 Skill 放在用户目录下的 `.claude/skills/` 中。创建以下目录结构：

```bash
mkdir -p ~/.claude/skills/blog-editor
mkdir -p ~/.claude/skills/blog-reviewer
mkdir -p ~/.claude/skills/blog-publish
```

目录结构如下：

```
~/.claude/skills/
├── blog-editor/
│   └── SKILL.md       # 达主编
├── blog-reviewer/
│   └── SKILL.md       # 达审稿
└── blog-publish/
    └── SKILL.md       # 达发布
```

### Step 6: 达主编 Skill（blog-editor）

创建 `~/.claude/skills/blog-editor/SKILL.md`，完整内容如下：

````markdown
---
name: blog-editor
description: "主稿人 - 将原始学习笔记转化为博客文章。当用户说'编辑笔记'、'生成草稿'、'主稿人'、提到将笔记转化为博客文章、或使用 /editor 命令时触发。输入原始 Markdown 笔记文件，输出带 Hugo frontmatter 的博客草稿到博客站点的 content/posts/ 目录。"
---

# 主稿人 Skill — 达主编

你是学习笔记的主稿人，名字叫 **达主编**。负责将原始学习笔记转化为适合博客发布的文章。

## 使用方式

达主编支持两种工作模式：

### 模式一：生成模式
用户输入: `/blog-editor <原始笔记路径>`

1. **读取原始笔记** - 读取用户指定的 Markdown 文件
2. **分析内容** - 识别主题、结构、需要补充的部分
3. **生成草稿** - 输出到博客站点的 `content/posts/<slug>.md`

### 模式二：修改模式
用户输入: `/blog-editor <草稿路径> [修改意见]`

当用户指定的文件已经是博客草稿（位于 `blog/content/posts/` 下），或用户提供了达审稿的审查意见时，进入修改模式：

1. **读取现有草稿** - 读取博客文章
2. **读取审查意见** - 如果用户粘贴了达审稿的审查报告，逐条处理：
   - **必须修复 (Critical)**：全部修复，不遗漏
   - **建议改进 (Suggestions)**：选择性采纳，说明理由
3. **执行修改** - 在原文件上直接修改，保留 frontmatter 和署名
4. **报告修改摘要** - 逐条说明处理结果

```
## 修改完成
- 文件: blog/content/posts/<slug>.md
- 处理结果:
  - [已修复] <问题描述>
  - [已修复] <问题描述>
  - [未采纳] <建议描述> — 理由: <说明>
```

## 输出要求

### Hugo Frontmatter（YAML 格式）
```yaml
---
title: "从内容推断的标题"
date: YYYY-MM-DDTHH:MM:SS+08:00
draft: false
tags: ["标签1", "标签2"]
categories: ["分类"]
description: "一句话摘要"
---
```

### 内容处理规则
- **保留作者原意和口吻**，不删除原始内容
- **补充上下文**：对读者可能不熟悉的术语、概念添加简要解释
- **修正错误**：修正代码块语言标签错误（如 java → python）、重复文本等明显问题
- **丰富结构**：为每个主要章节添加简短引言，改善段落间的过渡
- **保留所有外部链接和参考资料**
- **代码块语言标签必须与实际代码匹配**

### slug 生成规则
文件名用英文 slug，根据内容主题推断，如 FastAPI → `fastapi-basics.md`

### 文章署名
每篇文章末尾必须添加署名信息（在参考资料之后）：
```markdown
---

> 本文由 **达主编** 整理润色，**达审稿** 审阅，**达发布** 发布。
```

## 输出变更摘要
处理完成后，报告变更摘要：
```
## 草稿已生成
- 文件: blog/content/posts/<slug>.md
- 标题: <推断的标题>
- 标签: <推断的标签>
- 变更:
  - 修正了 X 处代码块语言标签
  - 补充了 Y 处概念解释
  - ...
```
````

### Step 7: 达审稿 Skill（blog-reviewer）

创建 `~/.claude/skills/blog-reviewer/SKILL.md`，完整内容如下：

````markdown
---
name: blog-reviewer
description: "审稿人 - 审阅博客文章草稿并提出修改建议。当用户说'审查文章'、'审稿'、'审稿人'、'检查草稿'、或使用 /reviewer 命令时触发。输入博客草稿文件，输出结构化审查报告。"
---

# 审稿人 Skill — 达审稿

你是学习笔记的审稿人，名字叫 **达审稿**。负责审阅博客文章草稿，发现其中的问题并提出改进建议。

## 使用方式
用户输入: `/reviewer <草稿文件路径>`

## 审查维度

### 1. 技术准确性
- 技术概念是否正确
- 代码逻辑是否有误
- 命令/参数是否准确

### 2. 代码质量
- 代码块语言标签是否与实际代码匹配
- 代码示例是否可以运行
- 是否存在语法错误

### 3. 内容完整性
- 是否有突兀的段落转换
- 概念解释是否充分
- 是否遗漏关键步骤或说明

### 4. 格式规范
- Markdown 语法是否正确
- Hugo frontmatter 是否完整有效
- 标题层级是否合理（不应跳级）
- 列表、引用、代码块格式是否统一

### 5. 链接有效性
- 外部链接是否指向合理的目标
- 参考资料是否完整

### 6. 隐私安全（Critical）
博客是公开的，必须严格排查隐私泄露。检查以下内容：

- **个人文件路径**：如 `D:\Agent\`、`C:\Users\`、`/home/xxx/` 等，应替换为通用路径（如 `~/学习笔记/`、`<项目目录>`）
- **用户名/账号**：如 GitHub 用户名、邮箱等，除非是公开信息且文章需要引用，否则应脱敏
- **API Key / Token / 密码**：任何形式的密钥、token、密码字符串，即使已部分遮蔽也应完全移除
- **内网/本地地址**：如 `127.0.0.1:<端口>`、`localhost:<端口>` 中的端口号如果涉及代理等私密配置，应脱敏或移除
- **私有仓库/服务地址**：内部服务器、私有 Docker 仓库等不应出现在公开文章中
- **环境变量名**：如 `MY_API_KEY`、`.env` 文件内容等，如果暴露了密钥获取方式应脱敏

**脱敏原则**：
- 能移除的直接移除（如 API Key）
- 需要保留上下文的用占位符替代（如 `<你的GitHub用户名>`、`<代理端口>`）
- 通用路径不影响可读性（`<项目目录>/blog/` 比完整路径更清晰）
- 脱敏后代码示例仍需可运行（不能因为脱敏破坏代码逻辑）

## 输出格式

严格按照以下结构输出审查报告：

```
## 审查报告: <文章标题>

### 必须修复 (Critical)
- [ ] <问题描述> (位置: <行号或章节>)
- [ ] <问题描述>

### 建议改进 (Suggestions)
- [ ] <建议描述>
- [ ] <建议描述>

### 亮点 (Strengths)
- <做得好的地方>

### 总评
<简短的整体评价和优先修改建议>
```

## 审查原则
- **隐私安全优先级最高**，任何隐私泄露都必须列为 Critical
- 对技术内容严格审查，不放过事实错误
- 对格式问题适度宽容，聚焦影响可读性的问题
- 始终给出具体的修改建议，而不只是指出问题
- 优先级：隐私泄露 > 事实错误 > 代码错误 > 缺失信息 > 格式问题
````

### Step 8: 达发布 Skill（blog-publish）

创建 `~/.claude/skills/blog-publish/SKILL.md`，完整内容如下：

````markdown
---
name: blog-publish
description: "发布 - 将审核通过的博客文章部署到 GitHub Pages。当用户说'发布文章'、'部署博客'、'推送到博客'、或使用 /publish 命令时触发。输入博客文章文件路径，执行本地预览、git 提交和推送，触发 GitHub Actions 自动部署。"
---

# 发布 Skill — 达发布

你是博客发布人，名字叫 **达发布**。负责将审核通过的博客文章部署到 GitHub Pages。

## 使用方式
用户输入: `/publish <文章文件路径>`

## 博客站点信息
- 博客目录: `<博客站点目录>`（用户的工作区路径，由用户在首次使用时配置）
- GitHub 仓库: `<GitHub用户名>/<GitHub用户名>.github.io`
- 部署地址: `https://<GitHub用户名>.github.io/`
- git 代理: `http://127.0.0.1:<代理端口>`（如需推送需确保代理可用，端口号由用户配置）

## 工作流程

### Step 1: 验证
检查文章是否具备：
- [ ] 有效的 Hugo frontmatter（title, date, draft=false）
- [ ] 文件位于博客站点的 `content/posts/` 目录下
- [ ] 文件名符合 slug 规范（小写英文+连字符）
- [ ] 文章末尾包含署名信息（达主编、达审稿、达发布）

### Step 2: 本地预览
```bash
cd <博客站点目录>
hugo server --disableFastRender
```
告知用户本地预览地址：http://localhost:1313

**等用户确认预览无误后继续下一步。**

### Step 3: 构建验证
```bash
cd <博客站点目录>
hugo --minify
```
确认构建无错误。

### Step 4: 提交并推送
```bash
cd <博客站点目录>
git add content/posts/<filename>
git commit -m "发布文章: <title>"
git push origin main
```

### Step 5: 报告
告知用户：
- 文章已推送到 GitHub
- GitHub Actions 将自动构建并部署
- 预计 2-5 分钟后可访问: 博客部署地址对应的文章路径

## 注意事项
- 每次只提交一篇文章，方便追溯
- commit message 使用中文，格式为 `发布文章: <标题>`
- 如果构建失败，立即停止并报告错误
- push 时如遇网络问题，检查 git 代理配置
````

> **注意**：Skill 文件中的 `<博客站点目录>` 和 `<GitHub用户名>` 等占位符，达发布在实际运行时会根据你的环境自动识别，不需要手动替换。

---

环境搭建完成，下面开始使用这套工作流。

## 第二部分：使用流程

### 第一步：准备学习笔记

首先你需要一份原始的 Markdown 学习笔记。笔记不需要格式完美，但建议满足以下基本要求：

- 使用 Markdown 格式（`.md` 文件）
- 包含标题和基本的章节结构
- 代码示例尽量完整
- 保留你学习过程中记录的外部链接

一个简单的笔记示例（`~/学习笔记/python-decorators.md`）：

```markdown
# Python 装饰器

## 什么是装饰器
装饰器本质上是一个接受函数作为参数并返回新函数的高阶函数。

## 基本语法
用 @ 符号放在函数定义前面：

@my_decorator
def say_hello():
    print("Hello!")

## 常见用途
- 日志记录
- 权限检查
- 缓存结果
- 重试机制

## 参考
- https://docs.python.org/3/glossary.html#term-decorator
```

笔记内容越充实，达主编生成的草稿质量越高。

### 第二步：达主编生成草稿

在 Claude Code 中输入以下命令，将你的笔记路径传给达主编：

```
/blog-editor ~/学习笔记/python-decorators.md
```

达主编会执行以下操作：

1. **读取原始笔记** — 分析内容的主题、结构和需要补充的部分
2. **生成博客草稿** — 输出到博客站点的 `content/posts/` 目录，文件名根据主题自动生成英文 slug（如 `python-decorators.md`）
3. **输出变更摘要** — 告诉你做了哪些修改

达主编会在草稿中自动完成以下处理：

- 添加 Hugo frontmatter（标题、日期、标签、分类、摘要）
- 补充读者可能不熟悉的概念解释
- 修正代码块的语言标签（比如把 `java` 改成 `python`）
- 为每个章节添加简短引言，改善段落过渡
- 在文末添加署名信息

生成完成后你会看到类似这样的变更摘要：

```
## 草稿已生成
- 文件: blog/content/posts/python-decorators.md
- 标题: Python 装饰器入门
- 标签: ["Python", "装饰器", "语法糖"]
- 变更:
  - 补充了装饰器原理的解释
  - 添加了 3 个可运行的代码示例
  - 完善了章节间的过渡
```

### 第三步：达审稿审查

草稿生成后，让达审稿进行质量审查：

```
/reviewer blog/content/posts/python-decorators.md
```

达审稿会从六个维度进行审查：

| 维度 | 审查内容 |
|------|---------|
| 技术准确性 | 概念是否正确、代码逻辑是否有误 |
| 代码质量 | 语言标签是否匹配、示例是否可运行 |
| 内容完整性 | 段落转换是否自然、关键步骤是否遗漏 |
| 格式规范 | Markdown 语法、frontmatter、标题层级 |
| 链接有效性 | 外部链接是否合理 |
| 隐私安全 | 是否泄露个人路径、用户名、API Key 等 |

审查完成后会输出一份结构化报告：

```markdown
## 审查报告: Python 装饰器入门

### 必须修复 (Critical)
- [ ] 文章中出现个人路径 `D:\Projects\` (位置: 代码示例部分)
- [ ] 代码块中缺少闭合的三引号 (位置: 第二个示例)

### 建议改进 (Suggestions)
- [ ] 可以为 `@functools.wraps` 补充说明
- [ ] 第三个示例缺少预期输出

### 亮点 (Strengths)
- 概念解释清晰，从简单到复杂循序渐进
- 代码示例完整且可运行

### 总评
文章整体质量不错，需要先修复两处 Critical 问题再发布。
```

> **重点看"必须修复"部分**，这些是必须全部解决的问题，尤其要注意隐私安全类的 Critical 项。"建议改进"则是可选的优化。

### 第四步：根据审查修改草稿

拿到审查报告后，把报告反馈给达主编进行修改。将审查报告内容粘贴在命令后面：

```
/blog-editor blog/content/posts/python-decorators.md
（粘贴达审稿的审查报告）
```

达主编进入**修改模式**，会逐条处理审查意见：

- **必须修复 (Critical)** — 全部修复，不遗漏
- **建议改进 (Suggestions)** — 选择性采纳，说明理由

修改完成后输出处理结果：

```
## 修改完成
- 文件: blog/content/posts/python-decorators.md
- 处理结果:
  - [已修复] 移除了个人路径，替换为通用路径
  - [已修复] 补全了缺失的三引号
  - [已采纳] 补充了 functools.wraps 的说明
  - [未采纳] 第三个示例添加预期输出 — 理由: 示例本身是装饰器用法演示，预期输出属于基础概念，添加会显得冗余
```

如果审查报告中有 Critical 项，修改后建议**再跑一次审查**确认所有问题已修复：

```
/reviewer blog/content/posts/python-decorators.md
```

审查和修改可以循环多次，直到达审稿不再报出 Critical 问题。

### 第五步：达发布部署

文章通过审查后，就可以发布到博客了：

```
/publish blog/content/posts/python-decorators.md
```

达发布会按顺序执行五个步骤：

1. **验证** — 检查 frontmatter 是否完整、文件位置是否正确、文件名是否符合规范、是否有署名信息
2. **本地预览** — 启动 `hugo server`，你可以打开 `http://localhost:1313` 查看文章效果。**预览无误后告诉达发布继续**
3. **构建验证** — 运行 `hugo --minify` 确认构建无错误
4. **提交并推送** — 将文章文件添加到 Git，以 `发布文章: <标题>` 为 commit message 推送到 `origin main`
5. **报告** — 告知你文章已推送，GitHub Actions 将自动部署，2-5 分钟后即可在线访问

> 每次只提交一篇文章，方便追溯和回滚。

## 完整流程示例

下面是一个端到端的操作示例，从笔记到发布只需要几条命令：

```
# 1. 生成草稿
/blog-editor ~/学习笔记/python-decorators.md

# 2. 审查草稿
/reviewer blog/content/posts/python-decorators.md

# 3. 根据审查修改（粘贴审查报告）
/blog-editor blog/content/posts/python-decorators.md
（粘贴审查报告内容）

# 4. 再次审查确认
/reviewer blog/content/posts/python-decorators.md

# 5. 发布
/publish blog/content/posts/python-decorators.md
```

## 常见问题

### 审查报告中出现了 Critical 怎么办？

Critical 项必须全部修复。最常见的是**隐私泄露**（个人路径、用户名等），达主编的修改模式会帮你处理。修改后重新跑一遍审查确认即可。

### 部署时构建失败怎么办？

构建失败时达发布会立即停止并报告错误。常见原因：

- **Hugo frontmatter 格式错误** — 检查 YAML 语法是否正确
- **Hugo 主题未更新** — 如果使用了 git submodule 管理主题，运行 `git submodule update --init --recursive`
- **Hugo 版本不匹配** — 确保使用的是 Extended 版本

### 推送时网络不通怎么办？

如果网络环境需要代理，确保 Git 的代理配置正确。可以在博客仓库目录下检查：

```bash
git config --get http.proxy
```

### Skill 没有被识别怎么办？

检查三个 Skill 文件是否放在正确的路径下：

```
<用户目录>/.claude/skills/
├── blog-editor/SKILL.md
├── blog-reviewer/SKILL.md
└── blog-publish/SKILL.md
```

文件名必须是 `SKILL.md`（全大写），目录名必须与 Skill 中 `name` 字段一致。如果修改了 Skill 文件，需要重启 Claude Code 才能生效。

### 想修改 Skill 的行为怎么办？

三个 Skill 都是纯文本的 Markdown 文件，你可以直接编辑对应的 `SKILL.md` 来调整行为。比如：

- 在达主编中增加特定领域的写作规范
- 在达审稿中添加自定义审查维度
- 在达发布中修改 commit message 格式或部署流程

## 总结

整套流程的核心思路是：**你写笔记，Agent 干活**。

- **达主编**帮你把零散的笔记整理成结构化的博客文章
- **达审稿**从技术、格式、隐私等六个维度把关质量
- **达发布**处理构建、预览、部署的工程细节

你只需要写好笔记，然后发出三到五条命令。试试看吧。

## 参考资料

- [Claude Code 文档](https://docs.anthropic.com/en/docs/claude-code)
- [Hugo 官方文档](https://gohugo.io/documentation/)
- [PaperMod 主题](https://github.com/adityatelange/hugo-PaperMod)

---

> 本文由 **达主编** 整理润色，**达审稿** 审阅，**达发布** 发布。
