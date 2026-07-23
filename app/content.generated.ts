// 此文件由 scripts/generate-content.mjs 自动生成，请勿手工修改。
export type BlogPost = { slug: string; title: string; date: string; category: string; categories: string[]; tags: string[]; image: string; excerpt: string; read: string; wordCount: number; searchText: string; html: string; toc: { id: string; level: number; title: string }[] };
export const posts: BlogPost[] = [
  {
    "slug": "gpt-5-6",
    "title": "GPT5.6",
    "date": "2026-07-17",
    "category": "AI",
    "categories": [
      "AI"
    ],
    "tags": [
      "AI",
      "OpenAI",
      "Agent",
      "Prompt Engineering"
    ],
    "image": "/images/site/study-hero.webp",
    "excerpt": "围绕 GPT-5.6 Sol 的 Agent 定位、核心能力变化，以及提示词从步骤控制转向目标定义的实践笔记。",
    "read": "3 分钟",
    "wordCount": 1487,
    "searchText": "GPT5.6 围绕 GPT-5.6 Sol 的 Agent 定位、核心能力变化，以及提示词从步骤控制转向目标定义的实践笔记。 AI AI OpenAI Agent Prompt Engineering GPT5.6 Prompting guidance for GPT 5.6 Sol OpenAI API Model guidance OpenAI API GPT5.6核心变化 从「回答问题的模型」 → 「执行复杂任务的 Agent 模型」 官方对于GPT 5.6 Sol的定位是 Frontier model for complex professional work 也就是说，agent模型面向更复杂的专业问题，而不是局限于简单的问答 what is new Programmatic Tool Calling ，Programmatic Tool Calling OpenAI API，自己编写JavaScript 运行可用工具流，在调用之间传递结果 Multi agent ，Multi agent OpenAI API，并行协调多个子agent并综合结果，提升复杂问题中清晰划分独立工作流的性能 Explicit prompt caching ，Prompt caching OpenAI API，可以明确指定哪些可复用的 Prompt 前缀需要被 OpenAI 缓存 Persisted reasonin ，Reasoning models OpenAI API，多个对话轮次之间复用已有的推理内容，提升多轮交互质量，并提高缓存效率 Max reasoning effort ，xhigh模式，执行高难度任务 Frontend design ，对前端的设计支持升级 Original image detail , Images and vision OpenAI API 图像能力理解升级 Intent understanding: ，用户意图理解，以及用户期望的工作深度， 本文核心 ，不需要规划任务执行的步骤，而是转向任务系统的规划，给出任务的背景，硬性限制，需要审批的边界和成功标准等。 Continue to provide domain context, hard constraints, approval boundaries, and success criteria. Tell the model when an important ambiguity should trigger a question. 能力 对Agent影响 Programmatic Tool Calling Agent 可以自动编排工具流程 Multi agent 复杂任务可以并行执行 Prompt Caching 降低长期运行成本 Persisted Reasoning 支持连续任务执行 Max reasoning / Pro mode 复杂任务质量提升 Intent understanding Prompt 从步骤控制变成目标定义 提示词实践 明确定义最终目标、指出重要约束条件、提供可用的信息依据、明确完成标准。其他的空间留给模型，让它自行选择高效解决路径 “GPT 5.6 works best when prompts define the outcome, important constraints, available evidence, and completion bar, then leave room for the model to choose an efficient path.” 删除重复指令和实例精炼prompts、简化工具描述，可以提升任务表现和Token使用效率 简化提示词 删除重复描述同一规则的内容 删除不会改变模型行为的重复风格要求或者流程要求 删除与当前任务无关的描述 检查提示词是否冲突 ，模型会严格遵守prompts的规则，相互冲突会造成比缺少细节更大的不稳定 结果为先、明确停止条件 1. 描述目的结果而不是规划执行，给模型灵活执行空间释放性能： 避免使用不必要的绝对规则命令 对于需要判断的情况，优先使用决策规则，根据条件路由操作 2. 添加停止条件：",
    "html": "<h1>GPT5.6</h1>\n<p><a href=\"https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6\">Prompting guidance for GPT-5.6 Sol | OpenAI API</a></p>\n<p><a href=\"https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6\">Model guidance | OpenAI API</a></p>\n<h2 id=\"gpt56核心变化\">GPT5.6核心变化</h2>\n<blockquote>\n<p>从「回答问题的模型」 → 「执行复杂任务的 Agent 模型」</p>\n</blockquote>\n<p>官方对于GPT-5.6 Sol的定位是<strong>Frontier model for complex professional work</strong></p>\n<p>也就是说，agent模型面向更复杂的专业问题，而不是局限于简单的问答</p>\n<p>what is new</p>\n<ul>\n<li><strong>Programmatic Tool Calling</strong>，<a href=\"https://developers.openai.com/api/docs/guides/tools-programmatic-tool-calling\">Programmatic Tool Calling | OpenAI API</a>，自己编写JavaScript 运行可用工具流，在调用之间传递结果</li>\n<li><strong>Multi-agent</strong>，<a href=\"https://developers.openai.com/api/docs/guides/responses-multi-agent\">Multi-agent | OpenAI API</a>，并行协调多个子agent并综合结果，提升复杂问题中清晰划分独立工作流的性能</li>\n<li><strong>Explicit prompt caching</strong>，<a href=\"https://developers.openai.com/api/docs/guides/prompt-caching\">Prompt caching | OpenAI API</a>，可以明确指定哪些可复用的 Prompt 前缀需要被 OpenAI 缓存</li>\n<li><strong>Persisted reasonin</strong>，<a href=\"https://developers.openai.com/api/docs/guides/reasoning#preserve-reasoning-across-calls\">Reasoning models | OpenAI API</a>，多个对话轮次之间复用已有的推理内容，提升多轮交互质量，并提高缓存效率</li>\n<li><strong>Max reasoning effort</strong>，xhigh模式，执行高难度任务</li>\n<li><strong>Frontend design</strong>，对前端的设计支持升级</li>\n<li><strong>Original image detail</strong>, <a href=\"https://developers.openai.com/api/docs/guides/images-vision#choose-an-image-detail-level\">Images and vision | OpenAI API</a> 图像能力理解升级</li>\n<li><strong>Intent understanding:</strong>，用户意图理解，以及用户期望的工作深度，<strong>本文核心</strong>，不需要规划任务执行的步骤，而是转向任务系统的规划，给出任务的背景，硬性限制，需要审批的边界和成功标准等。<code> Continue to provide domain context, hard constraints, approval boundaries, and success criteria. Tell the model when an important ambiguity should trigger a question.</code></li>\n</ul>\n<table>\n<thead>\n<tr>\n<th>能力</th>\n<th>对Agent影响</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Programmatic Tool Calling</td>\n<td>Agent 可以自动编排工具流程</td>\n</tr>\n<tr>\n<td>Multi-agent</td>\n<td>复杂任务可以并行执行</td>\n</tr>\n<tr>\n<td>Prompt Caching</td>\n<td>降低长期运行成本</td>\n</tr>\n<tr>\n<td>Persisted Reasoning</td>\n<td>支持连续任务执行</td>\n</tr>\n<tr>\n<td>Max reasoning / Pro mode</td>\n<td>复杂任务质量提升</td>\n</tr>\n<tr>\n<td>Intent understanding</td>\n<td>Prompt 从步骤控制变成目标定义</td>\n</tr>\n</tbody></table>\n<h2 id=\"提示词实践\">提示词实践</h2>\n<blockquote>\n<p>明确定义最终目标、指出重要约束条件、提供可用的信息依据、明确完成标准。其他的空间留给模型，让它自行选择高效解决路径</p>\n<p>“GPT-5.6 works best when prompts define the outcome, important constraints, available evidence, and completion bar, then leave room for the model to choose an efficient path.”</p>\n</blockquote>\n<ul>\n<li>删除重复指令和实例精炼prompts、简化工具描述，可以提升任务表现和Token使用效率</li>\n</ul>\n<h3 id=\"简化提示词\">简化提示词</h3>\n<ul>\n<li>删除重复描述同一规则的内容</li>\n<li>删除不会改变模型行为的重复风格要求或者流程要求</li>\n<li>删除与当前任务无关的描述</li>\n</ul>\n<p><strong>检查提示词是否冲突</strong>，模型会严格遵守prompts的规则，相互冲突会造成比缺少细节更大的不稳定</p>\n<h3 id=\"结果为先明确停止条件\">结果为先、明确停止条件</h3>\n<ol>\n<li>描述目的结果而不是规划执行，给模型灵活执行空间释放性能：</li>\n</ol>\n<pre><code>Resolve the customer&#39;s issue end to end.\n\nSuccess means:\n- make the eligibility decision from available policy and account evidence\n- complete any allowed action before responding\n- return completed_actions, customer_message, and blockers\n- if required evidence is missing, ask for the smallest missing field\n</code></pre>\n<p>避免使用不必要的绝对规则命令</p>\n<p>对于需要判断的情况，优先使用决策规则，根据条件路由操作</p>\n<ol start=\"2\">\n<li>添加停止条件：</li>\n</ol>\n<pre><code>Resolve the request in the fewest useful tool loops, but do not let loop minimization outrank correctness, required evidence, calculations, or required citations.\n\nAfter each result, ask whether the core request can now be answered withuseful evidence. If yes, answer. If required evidence is still missing,name the missing fact and use the smallest useful fallback.\n</code></pre>\n",
    "toc": [
      {
        "id": "gpt56核心变化",
        "level": 2,
        "title": "GPT5.6核心变化"
      },
      {
        "id": "提示词实践",
        "level": 2,
        "title": "提示词实践"
      },
      {
        "id": "简化提示词",
        "level": 3,
        "title": "简化提示词"
      },
      {
        "id": "结果为先明确停止条件",
        "level": 3,
        "title": "结果为先、明确停止条件"
      }
    ]
  },
  {
    "slug": "git-learning-notes",
    "title": "Git 学习笔记",
    "date": "2026-07-15",
    "category": "开发工具",
    "categories": [
      "开发工具"
    ],
    "tags": [
      "Git",
      "版本控制",
      "开发工作流"
    ],
    "image": "/images/review/git-learning-notes/image-20260519214154717.webp",
    "excerpt": "从 Git 的快照模型、三大工作区域，到分支、合并、远程协作、rebase、急救工具和团队工作流的系统学习笔记。",
    "read": "15 分钟",
    "wordCount": 7053,
    "searchText": "Git 学习笔记 从 Git 的快照模型、三大工作区域，到分支、合并、远程协作、rebase、急救工具和团队工作流的系统学习笔记。 开发工具 Git 版本控制 开发工作流 【从零开始深入 git】01 git 设计理念 保姆级 git 系列教程，带你手把手掌握版本控制 哔哩哔哩 bilibili Git 学习笔记 目录 速查表：日常开发常用指令 第一部分：理解 Git — 建立心智模型 第二部分：单人本地最小闭环 第三部分：分支 — 让开发可以并行 第四部分：合并 — 让并行开发交汇 第五部分：远程 — 从单人到协作 第六部分：rebase — 保持提交历史整洁 第七部分：急救工具箱 — 日常高频的\"后悔药\" 第八部分：团队工作流 — 把前面的知识组合起来 第九部分：托管平台与认证 第十部分：IDE 集成 速查表：日常开发常用指令 0. 配置（只需一次） → 详见 第二部分：安装与配置 1. 克隆仓库 / 初始化项目 → 详见 第五部分：clone · 第二部分：创建仓库 2. 日常提交流程（最高频） → 详见 第二部分：创建仓库 3. 分支操作 → 详见 第三部分：分支操作 4. 合并 → 详见 第四部分：合并 5. 远程同步 → 详见 第五部分：远程 6. rebase → 详见 第六部分：rebase 7. 急救 / 后悔药 → 详见 第七部分：急救工具箱 8. 查看信息 第一部分：理解 Git — 建立心智模型 Git 的设计理念 Git 引入了 快照（snapshot） 的概念：每次提交时，Git 会对整个项目拍一张\"快照\"，保存那一刻所有文件的状态。这意味着你可以随时回档到任何一个历史版本。 基于快照机制，Git 实现了三个核心能力： 可以回档 ：任何一次提交都是项目在某个时刻的完整状态，随时可以回到过去。 并行开发 ：多分支机制让多个人、多个功能可以同时推进，互不干扰。 多人协作 ：分布式仓库让团队可以方便地管理共享的 repo，各自在本地开发，再同步合并。 三大工作区域 理解 Git 的关键在于搞清楚三个工作区域，几乎所有 Git 命令都在这三者之间搬运数据： 工作区域 英文 含义 工作区 Working Directory 你在文件系统里能看到、能编辑的项目文件 暂存区 Staging Area (Index) 通过 git add 放进来的\"待提交\"快照，是工作区和仓库之间的缓冲层 仓库 Repository (.git) 通过 git commit 最终确认的提交历史，永久记录在 .git 目录中 数据流向：工作区 →（ git add ）→ 暂存区 →（ git commit ）→ 仓库 暂存区的存在是 Git 区别于其他版本控制工具的核心设计之一：它让你可以精确控制\"哪些改动进入下一次提交\"，而不是把工作区的所有修改一股脑提交上去。 文件状态流转 一个文件在 Git 眼中始终处于以下状态之一： untracked ：新文件，Git 还没有追踪它 staged ：通过 git add 进入暂存区，等待被提交 committed ：通过 git commit 写入仓库历史 modified ：已追踪的文件被修改了，但还没 add 到暂存区 理解这个状态机后，后面所有的 add 、 commit 、 reset 、 stash 命令本质上就是在这些状态之间切换文件。 第二部分：单人本地最小闭环 这一部分的目标：走完 init → edit → add → commit → log 的完整循环，让你能独立用 Git 管理一个本地项目。 安装与配置 安装 Git 后，第一步是设置你的身份信息，因为每次提交都会记录作者。 三级配置体系 Git 的配置分三个层级，优先级从低到高： 层级 作用范围 优先级 文件位置 system（系统级） 整台机器所有用户 低 C:\\Program Files\\Git\\etc\\gitconfig global（用户级） 当前用户 中 C:\\Users\\ \\.gitconfig local（项目级） 当前仓库 高 \\.git\\config 覆盖规则： local global system 。这意味着项目级配置可以覆盖用户级配置，用户级可以覆盖系统级。日常使用中，全局设置一次 user.name 和 user.email 即可，特殊项目可在仓库级别单独配置。 创建仓库 1. 准备一个工作目录 2. 在项目根目录下执行 git init ，生成的 .git 目录就是 Git 仓库 3. 首次提交： 4. 查看提交记录： 5. 查看当前 Git 状态（工作区、暂存区的文件状态）： 到这一步，你已经完成了\"创建仓库 → 编辑文件 → 提交 → 查看历史\"的最小闭环。 .gitignore：提前排除不需要追踪的文件 有些文件不应该进入版本控制，比如编译产物、依赖目录、密钥文件。 .gitignore 文件用来告诉 Git 忽略这些文件。 匹配规则： 文件名匹配 → 所有同名文件都命中。例： .env 目录匹配 → 同名目录及其中所有内容命中。例： build/ 、 target/ 通配符匹配 ： 匹配一个或多个字符。例： .log ? 匹配单个字符。例： file?.txt 匹配任意层级目录。例： /node modules/ 注意：.gitignore 只能阻止\"未追踪\"的文件被加入暂存区。如果文件已经被 Git 追踪了（已经 commit 过），.gitignore 无法取消追踪——需要先从仓库中移除该文件，.gitignore 才会生效。远程仓库中的文件也无法通过 .gitignore 取消追踪。 第三部分：分支 — 让开发可以并行 为什么需要分支 如果没有分支，所有人都在一条线上提交，开发新功能时改到一半，想修一个线上 bug 就无从下手。分支让你可以\"分叉\"出去，在不影响主线的情况下独立推进，做完再合回来。 Git encourages workflows that branch and merge often, even multiple times in a day. 分支的本质 创建分支，本质上是创建一个指针，指向对应的 commit。分支不是复制一份代码，而是一个非常轻量的指针。切换分支只是把 HEAD 指针移到另一个 commit 上，工作区的文件会随之更新。 分支操作 第四部分：合并 — 让并行开发交汇 合并的基本流程 当分支上的开发完成后，需要把它合并回主线。操作方式是先切到目标分支（通常是 master/main），再把来源分支 merge 进来： 合并冲突 当两个分支修改了同一文件的同一区域时，Git 无法自动判断保留哪个版本，就会产生合并冲突。你需要手动编辑冲突文件，选择保留哪些内容，然后 add + commit 完成合并。 合并时遵循\"所有权思想\"：谁负责哪部分代码，就由谁来解决相关冲突。 fast forward vs no ff 当目标分支在分叉后没有新的提交时，Git 默认执行 fast forward 合并：直接把目标分支指针快进到来源分支的位置，不生成合并 commit。 不推荐使用 fast forward merge ，原因如下： 分支结构在合并后被抹除了，看不出\"这批代码是从哪个分支合进来的\" 回滚变麻烦：master 和开发分支的提交混在一起，想要回到合并前的状态很难 不符合 PR（Pull Request）和 CR（Code Review）流程，缺少明确的合并节点 推荐使用 no ff ，保留分支历史： 第五部分：远程 — 从单人到协作 本地仓库与远程仓库的关系模型 理解远程协作的关键在于 remote tracking branch（远程追踪分支）这个概念。 origin/ 这样的分支表示的是\"追踪远程仓库的本地镜像\"。它的作用是：当远程和本地发生冲突时，fetch 下来的远程提交不会直接覆盖你的本地提交，而是先放到 origin/ 上，让你有机会查看和处理。 clone：第一次获取远程仓库 b 参数表示会在本地创建一个对应的 master 分支，与远程的 origin/master 区分开来。 协作者克隆仓库后，开始在本地分支上开发，然后推送、拉取： fetch：安全拉取远程更新 fetch 从远程下载提交到本地，更新所有 remote tracking branch（ origin/ ）到最新 commit。 fetch 是安全的 ：它不会触碰你的本地工作区和本地提交，只是把远程的提交同步到本地的 origin/ 镜像上。 push：推送本地提交 push 连接远程仓库，计算本地比远程多的 commit 并上传，尝试更新远程分支。 push 被拒绝的情况 如果远程分支有本地没有的提交（远程分支不是本地的祖先），push 会被拒绝。这通常发生在别人已经推送了新提交，你需要先 fetch + 合并/变基后再 push。 force with lease 比 force 安全的原因：如果远程分支在你上次 fetch 之后有别人推了新提交，它会拒绝推送，避免覆盖别人的工作。典型场景是用 amend 修改了已推送的 commit（hash 变了），需要强制推送时用这个。 pull：fetch + merge/rebase pull = fetch + merge/rebase pull 是 fetch 和 merge（或 rebase）的组合快捷操作。merge 是把 remote tracking 分支合并进本地分支。注意 remote tracking 分支是只读的，不能直接在上面修改，所以 merge 的结果是本地分支移动到合并后的位置。 pull rebase 为什么能避免提交图成\"环\" 多人协作时，如果大家都用 merge，提交历史会不断产生交叉合并的\"环\"结构，历史变得复杂。使用 pull rebase ，Git 会先把你的本地提交临时拿掉，把远程的提交放进来，再把你的提交重新应用在上面，历史保持线性。 合并完成后，远程分支也会移动到最新位置： 远程协作小结 第六部分：rebase — 保持提交历史整洁 这一部分放在远程之后，因为你已经在第五部分见过\"提交图成环\"的问题，才能理解 rebase 解决的是什么。 rebase 的原理 rebase（变基）的过程：找到两个分支的公共祖先，然后把当前分支上的提交\"摘下来\"，重新应用到目标分支的最新位置上。这会改变这些提交所依赖的父节点，相当于把你的提交\"移植\"到目标分支的顶端。 典型场景：feature 分支跟进主分支 你在 feature 分支上开发期间，主分支有了新提交。你想把主分支的最新代码同步过来，有两种选择： 方式一：merge 主分支到 feature 分支 ——会产生一个合并 commit，历史中多一个交叉点。 方式二：rebase 主分支到 feature 分支 ——你的提交会被\"搬到\"主分支最新提交的后面，历史保持线性，更干净。 具体操作：先在 feature 分支上 checkout 主分支（rebase 的目标），在中间处理可能出现的冲突，解决后提交，最后合并回主分支。 rebase vs merge 对比 维度 merge rebase 历史 保留分叉和合并的完整记录 线性历史，看不出曾经的分叉 合并 commit 会生成一个合并节点 不生成额外 commit 冲突处理 一次性解决所有冲突 逐个 commit 重放，可能多次解决冲突 安全性 不改写历史，安全 会改变 commit hash，已推送的分支慎用 经验法则： rebase 只在本地未推送的分支上用 ，避免对已推送的提交做变基（因为 hash 会变，别人的本地会和远程对不上）。 第七部分：急救工具箱 — 日常高频的\"后悔药\" 这一部分是\"出了问题怎么办\"的参考手册，每个命令解决一类常见的\"需要反悔\"的场景。 commit amend：修补上一次提交 场景：刚提交完，发现 commit message 写错了，或者漏 add 了一个文件。 这会覆盖上一次提交（包含 commit message），不生成新的 commit。如果只是修改 message： 注意：如果上一次提交已经 push 到远程，amend 后需要 git push force with lease 。 stash：临时保存工作区 场景：你正在 feature 分支写代码写到一半，突然需要切到 master 修一个紧急 bug，但当前代码还不想提交。 revert：安全撤销（生成反向 commit） 场景：某个提交引入了 bug，你想撤销它，但不想改写历史（因为已经推送到远程）。 revert 不删除任何历史，而是新增一个\"反向操作\"的提交。它是远程分支上撤销更改的安全方式。 reset：回退（soft / mixed / hard） 场景：你想回退到之前的某个 commit，但三种模式对\"回退后代码去哪了\"的处理不同。 记忆要点： soft 最温柔（代码还 staged）， mixed 是默认（代码还 modified）， hard 最激进（代码没了）。 hard 慎用，尤其是已推送的 commit 不要 reset。 模式 HEAD 位置 更改去哪了 soft 回退一个 commit 留在暂存区 mixed（默认） 回退一个 commit 留在工作区 hard 回退一个 commit 彻底删除 detached HEAD：游离 HEAD 状态 场景：你想查看项目在某个历史 commit 的状态，于是 checkout 到了那个 commit，但那个 commit 没有分支指针指向它。 注意：不能直接在 detached HEAD 状态下提交代码。 如果你要基于这个 commit 继续开发，必须先创建分支： 更改分支名 restore：只撤销某提交中某个文件的改动 场景：某次提交改了多个文件，其中一个文件是误改，需要单独撤销这个文件的改动，其他文件保留。 不要用 git revert ，因为这会反向撤销整个提交里的所有文件。 正确思路：把目标文件恢复成\"该提交之前\"的版本（即该 commit 的父提交版本），只影响这一个文件。 参数含义： git restore ：恢复文件内容到工作区 source= 1 ：指定从哪个 commit 取文件版本， 1 表示目标 commit 的父提交（即该提交之前的状态） ：分隔提交参数和文件路径，避免路径被误识别为参数 ：只恢复这个文件，不动其他文件 为什么不用 ^ 表示父提交 理论上 ^ 也表示父提交，但在 Windows cmd.exe 中 ^ 是转义符，会被命令行吞掉或改变含义，导致 Git 拿不到正确的父提交引用。所以在 Windows 下统一用 1 更稳妥。 执行后确认 关键注意点 ：如果当前工作区还有其他未提交的改动，千万不要用 git add . ，否则会把无关文件一起提交进去。这里只应该 git add 目标文件。 第八部分：团队工作流 — 把前面的知识组合起来 前面六部分学的是\"怎么用 Git 操作\"，这一部分学的是\"团队约定怎么用 Git\"。不同的团队规模和项目类型有不同的工作流模式，但底层都是分支 + 合并 + 远程的组合。 Commit message 规范 每次提交的 message 遵循统一格式： verb(range): detail 动词 含义 add 新增功能、文件或模块 edit 修改已有功能或代码 remove 删除功能、文件或模块 feat 新增用户功能（同 add） fix 修复 bug docs 修改文档（如 README、注释） style 代码格式调整（不影响运行逻辑，如空格、缩进） refactor 代码重构（不改变功能） test 添加或修改测试用例 chore 构建工具、辅助工具、依赖等变动 perf 性能优化 merge 合并分支 revert 回滚之前的提交 两条核心原则：每次提交确认只提交想要提交的内容；每次 commit 只关注一件事。 语义化版本号 版本号格式： 主版本.次版本.修订号 主版本（Major）：不兼容的 API 修改 次版本（Minor）：向下兼容的新功能 修订号（Patch）：向下兼容的 bug 修复 Progressive stability 分支模型 核心思想：渐进稳定（progressive stability）。在最不稳定的分支上进行开发，稳定性逐步提高后向上合并。 底层分支最不稳定（可以有半成品代码），越往上越稳定，最终到达发布分支时是经过充分测试的稳定代码。 Team Workflow 团队工作流定义了\"谁在哪个分支上开发，什么时候合并，谁来审核\"。 IM PR Workflow（Pull Request 工作流） PR（Pull Request）工作流：开发者在自己的分支/fork 上完成开发后，发起 PR 请求合并到主分支。团队在 PR 上进行 Code Review，审核通过后合并。 流程要点：开发分支 → push → 发起 PR → Code Review → 合并到主分支 → 删除开发分支。配合 no ff 合并，可以清晰地在历史中看到每个 PR 的边界。 Fork Workflow Fork Workflow 适用于开源项目或跨组织协作：贡献者先 fork 原仓库到自己账号下，在 fork 仓库上开发，然后向原仓库发起 PR。 与 PR Workflow 的区别：Fork Workflow 中贡献者没有原仓库的写权限，必须通过 fork + PR 的方式贡献代码。 第九部分：托管平台与认证 GitHub 账号配置 在向 GitHub 推送代码时，GitHub 需要校验你的身份。主要有两种认证方式。 SSH 密钥认证 SSH 协议通过密钥对（公钥 + 私钥）认证身份，配置一次后无需重复输入密码。 使用 ssh keygen 生成密钥对： 生成后，将公钥（ .pub 文件内容）添加到 GitHub 的 SSH Keys 设置中，私钥保留在本地不要泄露。 HTTPS 协议 HTTPS 方式通过用户名 + Token/密码认证，配置简单但每次推送可能需要输入凭据（可通过 credential helper 缓存）。 第十部分：IDE 集成 在 IDE（如 IntelliJ IDEA、VS Code 等）中使用 Git，主要有三个图形化面板： Commit 面板 ：查看 changes 并提交，相当于图形化的 git add + git commit Log 面板 ：查看 commit graph，相当于 git log graph 分支面板 ：管理 branches（创建、切换、合并），相当于 git branch / git checkout / git merge 图形化工具降低了 Git 的使用门槛，但理解了前面九部分的概念后，你会发现这些面板只是命令行操作的封装。遇到复杂问题（冲突解决、rebase、历史回溯）时，命令行仍然是更精确的工具。 学习路径回顾 ：心智模型 → 单人能用 → 多分支 → 多人协作 → 高级技巧 → 急救 → 团队规范 → 工具链。每一部分解决一类\"你会遇到的场景\"，而不是孤立地罗列命令。",
    "html": "<p><a href=\"https://www.bilibili.com/video/BV1MjRmBJEnK?spm_id_from=333.788.videopod.sections&vd_source=8adfcf78eabf734b81a1d808df35a04d\"> 【从零开始深入 git】01 - git 设计理念 - 保姆级 git 系列教程，带你手把手掌握版本控制_哔哩哔哩_bilibili</a></p>\n<h1>Git 学习笔记</h1>\n<h2 id=\"目录\">目录</h2>\n<ul>\n<li><a href=\"#%E9%80%9F%E6%9F%A5%E8%A1%A8%E6%97%A5%E5%B8%B8%E5%BC%80%E5%8F%91%E5%B8%B8%E7%94%A8%E6%8C%87%E4%BB%A4\">速查表：日常开发常用指令</a></li>\n<li><a href=\"#%E7%AC%AC%E4%B8%80%E9%83%A8%E5%88%86%E7%90%86%E8%A7%A3-git--%E5%BB%BA%E7%AB%8B%E5%BF%83%E6%99%BA%E6%A8%A1%E5%9E%8B\">第一部分：理解 Git — 建立心智模型</a></li>\n<li><a href=\"#%E7%AC%AC%E4%BA%8C%E9%83%A8%E5%88%86%E5%8D%95%E4%BA%BA%E6%9C%AC%E5%9C%B0%E6%9C%80%E5%B0%8F%E9%97%AD%E7%8E%AF\">第二部分：单人本地最小闭环</a></li>\n<li><a href=\"#%E7%AC%AC%E4%B8%89%E9%83%A8%E5%88%86%E5%88%86%E6%94%AF--%E8%AE%A9%E5%BC%80%E5%8F%91%E5%8F%AF%E4%BB%A5%E5%B9%B6%E8%A1%8C\">第三部分：分支 — 让开发可以并行</a></li>\n<li><a href=\"#%E7%AC%AC%E5%9B%9B%E9%83%A8%E5%88%86%E5%90%88%E5%B9%B6--%E8%AE%A9%E5%B9%B6%E8%A1%8C%E5%BC%80%E5%8F%91%E4%BA%A4%E6%B1%87\">第四部分：合并 — 让并行开发交汇</a></li>\n<li><a href=\"#%E7%AC%AC%E4%BA%94%E9%83%A8%E5%88%86%E8%BF%9C%E7%A8%8B--%E4%BB%8E%E5%8D%95%E4%BA%BA%E5%88%B0%E5%8D%8F%E4%BD%9C\">第五部分：远程 — 从单人到协作</a></li>\n<li><a href=\"#%E7%AC%AC%E5%85%AD%E9%83%A8%E5%88%86rebase--%E4%BF%9D%E6%8C%81%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2%E6%95%B4%E6%B4%81\">第六部分：rebase — 保持提交历史整洁</a></li>\n<li><a href=\"#%E7%AC%AC%E4%B8%83%E9%83%A8%E5%88%86%E6%80%A5%E6%95%91%E5%B7%A5%E5%85%B7%E7%AE%B1--%E6%97%A5%E5%B8%B8%E9%AB%98%E9%A2%91%E7%9A%84%E5%90%8E%E6%82%94%E8%8D%AF\">第七部分：急救工具箱 — 日常高频的&quot;后悔药&quot;</a></li>\n<li><a href=\"#%E7%AC%AC%E5%85%AB%E9%83%A8%E5%88%86%E5%9B%A2%E9%98%9F%E5%B7%A5%E4%BD%9C%E6%B5%81--%E6%8A%8A%E5%89%8D%E9%9D%A2%E7%9A%84%E7%9F%A5%E8%AF%86%E7%BB%84%E5%90%88%E8%B5%B7%E6%9D%A5\">第八部分：团队工作流 — 把前面的知识组合起来</a></li>\n<li><a href=\"#%E7%AC%AC%E4%B9%9D%E9%83%A8%E5%88%86%E6%89%98%E7%AE%A1%E5%B9%B3%E5%8F%B0%E4%B8%8E%E8%AE%A4%E8%AF%81\">第九部分：托管平台与认证</a></li>\n<li><a href=\"#%E7%AC%AC%E5%8D%81%E9%83%A8%E5%88%86ide-%E9%9B%86%E6%88%90\">第十部分：IDE 集成</a></li>\n</ul>\n<hr>\n<h1>速查表：日常开发常用指令</h1>\n<h2 id=\"0-配置只需一次\">0. 配置（只需一次）</h2>\n<pre><code class=\"language-bash\">git config --global user.name &quot;你的名字&quot;          # 设置用户名\ngit config --global user.email &quot;你的邮箱&quot;         # 设置邮箱\ngit config --global merge.ff false               # 全局关闭 fast-forward（推荐）\ngit config --list                                # 查看所有配置\n</code></pre>\n<p>→ 详见 <a href=\"#%E5%AE%89%E8%A3%85%E4%B8%8E%E9%85%8D%E7%BD%AE\">第二部分：安装与配置</a></p>\n<h2 id=\"1-克隆仓库-初始化项目\">1. 克隆仓库 / 初始化项目</h2>\n<pre><code class=\"language-bash\">git clone &lt;URL&gt;                    # 克隆远程仓库\ngit clone &lt;URL&gt; 别名                # 克隆并给远程起别名\ngit init                           # 在当前目录初始化 Git 仓库\ngit remote add origin &lt;URL&gt;        # 本地仓库关联远程仓库（init 后需要这一步）\ngit remote -v                      # 查看已关联的远程仓库地址\n</code></pre>\n<p>→ 详见 <a href=\"#clonet%E7%AC%AC%E4%B8%80%E6%AC%A1%E8%8E%B7%E5%8F%96%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93\">第五部分：clone</a> · <a href=\"#%E5%88%9B%E5%BB%BA%E4%BB%93%E5%BA%93\">第二部分：创建仓库</a></p>\n<h2 id=\"2-日常提交流程最高频\">2. 日常提交流程（最高频）</h2>\n<pre><code class=\"language-bash\">git status                         # 查看工作区状态（改了什么、什么待提交）\ngit add .                          # 把所有修改加入暂存区\ngit add &lt;file&gt;                     # 只加入指定文件\ngit commit -m &quot;feat: 描述&quot;         # 提交\ngit log --oneline --graph          # 查看提交历史（简洁图形式）\ngit diff                           # 查看工作区与暂存区的差异\ngit diff --staged                  # 查看暂存区与最近一次 commit 的差异\n</code></pre>\n<p>→ 详见 <a href=\"#%E5%88%9B%E5%BB%BA%E4%BB%93%E5%BA%93\">第二部分：创建仓库</a></p>\n<h2 id=\"3-分支操作\">3. 分支操作</h2>\n<pre><code class=\"language-bash\">git branch                         # 查看本地分支\ngit branch -a                      # 查看所有分支（含远程）\ngit branch -r                      # 只看远程分支\ngit branch -vv                     # 查看分支详情（含远程关联关系、最新 commit）\ngit branch -m &lt;新名&gt;               # 重命名当前分支\ngit branch -d &lt;branch&gt;             # 删除分支（安全删除）\ngit branch -D &lt;branch&gt;             # 强制删除分支（未合并也删）\ngit branch --unset-upstream        # 取消当前分支的上游关联\ngit checkout -b &lt;branch&gt;                    # 创建分支并切换\ngit checkout -b &lt;newbranch&gt; &lt;oldbranch&gt;     # 基于旧分支创建新分支并切换\ngit checkout &lt;branch&gt;                       # 切换分支\ngit switch &lt;branch&gt;                         # 切换分支（新语法）\n</code></pre>\n<p>→ 详见 <a href=\"#%E5%88%86%E6%94%AF%E6%93%8D%E4%BD%9C\">第三部分：分支操作</a></p>\n<h2 id=\"4-合并\">4. 合并</h2>\n<pre><code class=\"language-bash\">git merge &lt;branch&gt;                 # 把指定分支合并到当前分支\ngit merge --no-ff &lt;branch&gt;          # 合并但保留分支结构（推荐）\ngit mergetool                      # 启动冲突解决工具\ngit cherry-pick &lt;commit&gt;           # 从其他分支摘取指定 commit 到当前分支\n</code></pre>\n<p>→ 详见 <a href=\"#%E7%AC%AC%E5%9B%9B%E9%83%A8%E5%88%86%E5%90%88%E5%B9%B6--%E8%AE%A9%E5%B9%B6%E8%A1%8C%E5%BC%80%E5%8F%91%E4%BA%A4%E6%B1%87\">第四部分：合并</a></p>\n<h2 id=\"5-远程同步\">5. 远程同步</h2>\n<pre><code class=\"language-bash\">git fetch                          # 拉取远程更新（安全，不碰工作区）\ngit fetch origin &lt;branch&gt;          # 只拉取远程的某个分支\ngit pull                           # = fetch + merge（默认）\ngit pull --rebase                  # = fetch + rebase（保持线性历史）\n\ngit push                           # 推送本地提交到远程\ngit push origin &lt;branch&gt;           # 推送分支到远程，远程自动创建同名分支\ngit push -u origin &lt;branch&gt;        # 首次推送并关联远程分支（之后直接 git push）\ngit push --force-with-lease        # 安全的强制推送（配合 amend 使用）\n\ngit branch -u origin/&lt;branch&gt;      # 已有本地分支关联到远程分支（--set-upstream-to 的简写）\n\ngit checkout -b &lt;branch&gt; origin/&lt;branch&gt;            # 拉取远程分支并在本地创建同名分支关联\ngit checkout -b &lt;branch&gt; --no-track origin/&lt;branch&gt; # 拉取远程分支并在本地创建分支，不设置追踪关系\ngit switch -c &lt;branch&gt; --no-track origin/&lt;branch&gt;   # 拉取远程分支并在本地创建分支，不设置追踪关系\n\ngit remote -v                      # 查看远程仓库地址\n</code></pre>\n<p>→ 详见 <a href=\"#%E7%AC%AC%E4%BA%94%E9%83%A8%E5%88%86%E8%BF%9C%E7%A8%8B--%E4%BB%8E%E5%8D%95%E4%BA%BA%E5%88%B0%E5%8D%8F%E4%BD%9C\">第五部分：远程</a></p>\n<h2 id=\"6-rebase\">6. rebase</h2>\n<pre><code class=\"language-bash\">git rebase &lt;branch&gt;                # 把当前分支变基到目标分支上\ngit rebase --abort                 # 取消正在进行的 rebase\ngit rebase --continue              # 解决冲突后继续 rebase\n</code></pre>\n<p>→ 详见 <a href=\"#%E7%AC%AC%E5%85%AD%E9%83%A8%E5%88%86rebase--%E4%BF%9D%E6%8C%81%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2%E6%95%B4%E6%B4%81\">第六部分：rebase</a></p>\n<h2 id=\"7-急救-后悔药\">7. 急救 / 后悔药</h2>\n<pre><code class=\"language-bash\">git commit --amend                 # 修补上一次提交（改 message 或补文件）\ngit stash                          # 临时保存工作区修改\ngit stash pop                      # 恢复 stash\ngit stash list                     # 查看所有 stash\ngit revert &lt;commit&gt;                # 生成反向 commit 撤销指定提交（安全）\ngit reset --soft HEAD~1            # 回退，更改留在暂存区\ngit reset --mixed HEAD~1           # 回退，更改留在工作区（默认）\ngit reset --hard HEAD~1            # 回退，更改彻底删除（慎用！）\ngit checkout &lt;commit&gt;               # 切到历史 commit（进入 detached HEAD）\ngit checkout -b &lt;branch&gt;            # 在 detached 状态创建分支继续开发\ngit restore --source=&lt;commit&gt;~1 -- &lt;file&gt;  # 只撤销某提交中某个文件的改动（不影响其他文件）\ngit reflog                         # 查看所有 HEAD 移动记录（找回误删的 commit）\n</code></pre>\n<p>→ 详见 <a href=\"#%E7%AC%AC%E4%B8%83%E9%83%A8%E5%88%86%E6%80%A5%E6%95%91%E5%B7%A5%E5%85%B7%E7%AE%B1--%E6%97%A5%E5%B8%B8%E9%AB%98%E9%A2%91%E7%9A%84%E5%90%8E%E6%82%94%E8%8D%AF\">第七部分：急救工具箱</a></p>\n<h2 id=\"8-查看信息\">8. 查看信息</h2>\n<pre><code class=\"language-bash\">git status                         # 工作区状态\ngit log --oneline --graph          # 提交历史（图形）\ngit log -p &lt;file&gt;                  # 查看某文件的修改历史\ngit show &lt;commit&gt;                 # 查看某个 commit 的具体改动\ngit diff                           # 工作区 vs 暂存区\ngit diff --staged                  # 暂存区 vs 最新 commit\ngit diff &lt;branch1&gt; &lt;branch2&gt;       # 两个分支的差异\ngit branch -a                      # 所有分支\ngit branch -vv                     # 分支与远程的关联关系及最新 commit\ngit remote -v                      # 远程仓库地址\ngit stash list                     # stash 列表\ngit reflog                         # HEAD 移动记录（找回误删的 commit）\ngit blame &lt;file&gt;                  # 查看每行代码最后由谁修改\n</code></pre>\n<hr>\n<h1>第一部分：理解 Git — 建立心智模型</h1>\n<h2 id=\"git-的设计理念\">Git 的设计理念</h2>\n<p>Git 引入了**快照（snapshot）**的概念：每次提交时，Git 会对整个项目拍一张&quot;快照&quot;，保存那一刻所有文件的状态。这意味着你可以随时回档到任何一个历史版本。</p>\n<p>基于快照机制，Git 实现了三个核心能力：</p>\n<ul>\n<li><strong>可以回档</strong>：任何一次提交都是项目在某个时刻的完整状态，随时可以回到过去。</li>\n<li><strong>并行开发</strong>：多分支机制让多个人、多个功能可以同时推进，互不干扰。</li>\n<li><strong>多人协作</strong>：分布式仓库让团队可以方便地管理共享的 repo，各自在本地开发，再同步合并。</li>\n</ul>\n<h2 id=\"三大工作区域\">三大工作区域</h2>\n<p>理解 Git 的关键在于搞清楚三个工作区域，几乎所有 Git 命令都在这三者之间搬运数据：</p>\n<table>\n<thead>\n<tr>\n<th>工作区域</th>\n<th>英文</th>\n<th>含义</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>工作区</td>\n<td>Working Directory</td>\n<td>你在文件系统里能看到、能编辑的项目文件</td>\n</tr>\n<tr>\n<td>暂存区</td>\n<td>Staging Area (Index)</td>\n<td>通过 <code>git add</code> 放进来的&quot;待提交&quot;快照，是工作区和仓库之间的缓冲层</td>\n</tr>\n<tr>\n<td>仓库</td>\n<td>Repository (.git)</td>\n<td>通过 <code>git commit</code> 最终确认的提交历史，永久记录在 .git 目录中</td>\n</tr>\n</tbody></table>\n<p>数据流向：工作区 →（<code>git add</code>）→ 暂存区 →（<code>git commit</code>）→ 仓库</p>\n<p>暂存区的存在是 Git 区别于其他版本控制工具的核心设计之一：它让你可以精确控制&quot;哪些改动进入下一次提交&quot;，而不是把工作区的所有修改一股脑提交上去。</p>\n<h2 id=\"文件状态流转\">文件状态流转</h2>\n<p>一个文件在 Git 眼中始终处于以下状态之一：</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260519231654227.webp\" alt=\"文件状态流转\"></p>\n<ul>\n<li><strong>untracked</strong>：新文件，Git 还没有追踪它</li>\n<li><strong>staged</strong>：通过 <code>git add</code> 进入暂存区，等待被提交</li>\n<li><strong>committed</strong>：通过 <code>git commit</code> 写入仓库历史</li>\n<li><strong>modified</strong>：已追踪的文件被修改了，但还没 add 到暂存区</li>\n</ul>\n<p>理解这个状态机后，后面所有的 <code>add</code>、<code>commit</code>、<code>reset</code>、<code>stash</code> 命令本质上就是在这些状态之间切换文件。</p>\n<hr>\n<h1>第二部分：单人本地最小闭环</h1>\n<p>这一部分的目标：走完 <code>init → edit → add → commit → log</code> 的完整循环，让你能独立用 Git 管理一个本地项目。</p>\n<h2 id=\"安装与配置\">安装与配置</h2>\n<p>安装 Git 后，第一步是设置你的身份信息，因为每次提交都会记录作者。</p>\n<pre><code># 列出所有配置\ngit config --list\n\n# 配置用户名和邮箱\ngit config --global user.name &quot;你的名字&quot;\ngit config --global user.email &quot;你的邮箱&quot;\n</code></pre>\n<h3 id=\"三级配置体系\">三级配置体系</h3>\n<p>Git 的配置分三个层级，优先级从低到高：</p>\n<table>\n<thead>\n<tr>\n<th>层级</th>\n<th>作用范围</th>\n<th>优先级</th>\n<th>文件位置</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>system（系统级）</td>\n<td>整台机器所有用户</td>\n<td>低</td>\n<td><code>C:\\Program Files\\Git\\etc\\gitconfig</code></td>\n</tr>\n<tr>\n<td>global（用户级）</td>\n<td>当前用户</td>\n<td>中</td>\n<td><code>C:\\Users\\&lt;用户名&gt;\\.gitconfig</code></td>\n</tr>\n<tr>\n<td>local（项目级）</td>\n<td>当前仓库</td>\n<td>高</td>\n<td><code>&lt;项目目录&gt;\\.git\\config</code></td>\n</tr>\n</tbody></table>\n<p>覆盖规则：<strong>local &gt; global &gt; system</strong>。这意味着项目级配置可以覆盖用户级配置，用户级可以覆盖系统级。日常使用中，全局设置一次 <code>user.name</code> 和 <code>user.email</code> 即可，特殊项目可在仓库级别单独配置。</p>\n<h2 id=\"创建仓库\">创建仓库</h2>\n<ol>\n<li>准备一个工作目录</li>\n<li>在项目根目录下执行 <code>git init</code>，生成的 <code>.git</code> 目录就是 Git 仓库</li>\n<li>首次提交：</li>\n</ol>\n<pre><code>git add README.md\ngit commit -m &#39;first commit&#39;\n</code></pre>\n<ol start=\"4\">\n<li>查看提交记录：</li>\n</ol>\n<pre><code>git log\ngit log --pretty=oneline --graph\n</code></pre>\n<ol start=\"5\">\n<li>查看当前 Git 状态（工作区、暂存区的文件状态）：</li>\n</ol>\n<pre><code>git status\n</code></pre>\n<p>到这一步，你已经完成了&quot;创建仓库 → 编辑文件 → 提交 → 查看历史&quot;的最小闭环。</p>\n<h2 id=\"gitignore提前排除不需要追踪的文件\">.gitignore：提前排除不需要追踪的文件</h2>\n<p>有些文件不应该进入版本控制，比如编译产物、依赖目录、密钥文件。<code>.gitignore</code> 文件用来告诉 Git 忽略这些文件。</p>\n<p>匹配规则：</p>\n<ul>\n<li><strong>文件名匹配</strong> → 所有同名文件都命中。例：<code>.env</code></li>\n<li><strong>目录匹配</strong> → 同名目录及其中所有内容命中。例：<code>build/</code>、<code>target/</code></li>\n<li><strong>通配符匹配</strong>：<ul>\n<li><code>*</code> 匹配一个或多个字符。例：<code>*.log</code></li>\n<li><code>?</code> 匹配单个字符。例：<code>file?.txt</code></li>\n<li><code>**</code> 匹配任意层级目录。例：<code>**/node_modules/</code></li>\n</ul>\n</li>\n</ul>\n<p><img src=\"/images/review/git-learning-notes/image-20260607131625607.webp\" alt=\".gitignore 规则示例\"></p>\n<p>注意：.gitignore 只能阻止&quot;未追踪&quot;的文件被加入暂存区。如果文件已经被 Git 追踪了（已经 commit 过），.gitignore 无法取消追踪——需要先从仓库中移除该文件，.gitignore 才会生效。远程仓库中的文件也无法通过 .gitignore 取消追踪。</p>\n<hr>\n<h1>第三部分：分支 — 让开发可以并行</h1>\n<h2 id=\"为什么需要分支\">为什么需要分支</h2>\n<p>如果没有分支，所有人都在一条线上提交，开发新功能时改到一半，想修一个线上 bug 就无从下手。分支让你可以&quot;分叉&quot;出去，在不影响主线的情况下独立推进，做完再合回来。</p>\n<blockquote>\n<p>Git encourages workflows that branch and merge often, even multiple times in a day.</p>\n</blockquote>\n<h2 id=\"分支的本质\">分支的本质</h2>\n<p>创建分支，本质上是创建一个指针，指向对应的 commit。分支不是复制一份代码，而是一个非常轻量的指针。切换分支只是把 HEAD 指针移到另一个 commit 上，工作区的文件会随之更新。</p>\n<h2 id=\"分支操作\">分支操作</h2>\n<pre><code># 创建分支\ngit branch 1.0-dev\n\n# 切换分支\ngit checkout 1.0-dev\n\n# 创建分支并切换（最常用）\ngit checkout -b 1.0-dev\n</code></pre>\n<p><img src=\"/images/review/git-learning-notes/image-20260520165749820.webp\" alt=\"分支创建与切换\"></p>\n<hr>\n<h1>第四部分：合并 — 让并行开发交汇</h1>\n<h2 id=\"合并的基本流程\">合并的基本流程</h2>\n<p>当分支上的开发完成后，需要把它合并回主线。操作方式是先切到目标分支（通常是 master/main），再把来源分支 merge 进来：</p>\n<pre><code># 先切换到目标分支\ngit checkout master\n\n# 把 1.0-dev 分支的更改合并进来\ngit merge 1.0-dev\n</code></pre>\n<h3 id=\"合并冲突\">合并冲突</h3>\n<p>当两个分支修改了同一文件的同一区域时，Git 无法自动判断保留哪个版本，就会产生合并冲突。你需要手动编辑冲突文件，选择保留哪些内容，然后 add + commit 完成合并。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260520205050765.webp\" alt=\"合并冲突示例\"></p>\n<p>合并时遵循&quot;所有权思想&quot;：谁负责哪部分代码，就由谁来解决相关冲突。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260520202908268.webp\" alt=\"合并所有权\"></p>\n<h2 id=\"fast-forward-vs-no-ff\">fast-forward vs --no-ff</h2>\n<p>当目标分支在分叉后没有新的提交时，Git 默认执行 fast-forward 合并：直接把目标分支指针快进到来源分支的位置，不生成合并 commit。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260704154805399.webp\" alt=\"fast-forward 合并\"></p>\n<p><strong>不推荐使用 fast-forward merge</strong>，原因如下：</p>\n<ul>\n<li>分支结构在合并后被抹除了，看不出&quot;这批代码是从哪个分支合进来的&quot;</li>\n<li>回滚变麻烦：master 和开发分支的提交混在一起，想要回到合并前的状态很难</li>\n<li>不符合 PR（Pull Request）和 CR（Code Review）流程，缺少明确的合并节点</li>\n</ul>\n<p>推荐使用 <code>--no-ff</code>，保留分支历史：</p>\n<pre><code># 每次合并都保留分支结构\ngit merge --no-ff 1.0-dev\n\n# 全局关闭 fast-forward（推荐）\ngit config --global merge.ff false\n</code></pre>\n<hr>\n<h1>第五部分：远程 — 从单人到协作</h1>\n<h2 id=\"本地仓库与远程仓库的关系模型\">本地仓库与远程仓库的关系模型</h2>\n<p>理解远程协作的关键在于 remote-tracking branch（远程追踪分支）这个概念。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260617105016445.webp\" alt=\"本地与远程仓库关系\"></p>\n<p><code>origin/*</code> 这样的分支表示的是&quot;追踪远程仓库的本地镜像&quot;。它的作用是：当远程和本地发生冲突时，fetch 下来的远程提交不会直接覆盖你的本地提交，而是先放到 <code>origin/*</code> 上，让你有机会查看和处理。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260617110257745.webp\" alt=\"remote-tracking branch\"></p>\n<h3 id=\"clone第一次获取远程仓库\">clone：第一次获取远程仓库</h3>\n<pre><code># 克隆仓库（默认远程名为 origin，本地分支名为 master）\ngit clone &lt;URL&gt;\n\n# 克隆时给远程仓库起别名\ngit clone &lt;URL&gt; otherName\n</code></pre>\n<p><code>-b</code> 参数表示会在本地创建一个对应的 master 分支，与远程的 <code>origin/master</code> 区分开来。</p>\n<p>协作者克隆仓库后，开始在本地分支上开发，然后推送、拉取：</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260617110943037.webp\" alt=\"协作者视角\"></p>\n<h2 id=\"fetch安全拉取远程更新\">fetch：安全拉取远程更新</h2>\n<p>fetch 从远程下载提交到本地，更新所有 remote-tracking branch（<code>origin/*</code>）到最新 commit。</p>\n<p><strong>fetch 是安全的</strong>：它不会触碰你的本地工作区和本地提交，只是把远程的提交同步到本地的 <code>origin/*</code> 镜像上。</p>\n<pre><code>git fetch\n\ngit fetch origin      # 有多个远程仓库时，指定一个\n\ngit fetch --all        # 拉取所有远程仓库\n</code></pre>\n<p><img src=\"/images/review/git-learning-notes/image-20260704143043963.webp\" alt=\"fetch 操作示意\"></p>\n<h2 id=\"push推送本地提交\">push：推送本地提交</h2>\n<p>push 连接远程仓库，计算本地比远程多的 commit 并上传，尝试更新远程分支。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260704144628750.webp\" alt=\"push 流程\"></p>\n<h3 id=\"push-被拒绝的情况\">push 被拒绝的情况</h3>\n<p>如果远程分支有本地没有的提交（远程分支不是本地的祖先），push 会被拒绝。这通常发生在别人已经推送了新提交，你需要先 fetch + 合并/变基后再 push。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260704144829365.webp\" alt=\"push 冲突\"></p>\n<pre><code># 强制推送：把远程分支强行移到本地分支的位置（危险，会覆盖远程历史）\ngit push --force\n\n# 更安全的强制推送：只在远程没有新提交时才覆盖（推荐，配合 --amend 使用）\ngit push --force-with-lease\n</code></pre>\n<p><code>--force-with-lease</code> 比 <code>--force</code> 安全的原因：如果远程分支在你上次 fetch 之后有别人推了新提交，它会拒绝推送，避免覆盖别人的工作。典型场景是用 <code>--amend</code> 修改了已推送的 commit（hash 变了），需要强制推送时用这个。</p>\n<h2 id=\"pullfetch-merge-rebase\">pull：fetch + merge/rebase</h2>\n<blockquote>\n<p>pull = fetch + merge/rebase</p>\n</blockquote>\n<p>pull 是 fetch 和 merge（或 rebase）的组合快捷操作。merge 是把 remote-tracking 分支合并进本地分支。注意 remote-tracking 分支是只读的，不能直接在上面修改，所以 merge 的结果是本地分支移动到合并后的位置。</p>\n<pre><code>git pull              # 默认用 merge\ngit pull --rebase     # 用 rebase 代替 merge\n</code></pre>\n<p><img src=\"/images/review/git-learning-notes/image-20260704152244715.webp\" alt=\"pull 默认 merge\"></p>\n<h3 id=\"pull-rebase-为什么能避免提交图成环\">pull --rebase 为什么能避免提交图成&quot;环&quot;</h3>\n<p>多人协作时，如果大家都用 merge，提交历史会不断产生交叉合并的&quot;环&quot;结构，历史变得复杂。使用 <code>pull --rebase</code>，Git 会先把你的本地提交临时拿掉，把远程的提交放进来，再把你的提交重新应用在上面，历史保持线性。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260704153624311.webp\" alt=\"pull --rebase 避免环\"></p>\n<p>合并完成后，远程分支也会移动到最新位置：</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260704152454803.webp\" alt=\"pull 之后远程分支移动\"></p>\n<h3 id=\"远程协作小结\">远程协作小结</h3>\n<p><img src=\"/images/review/git-learning-notes/image-20260704164005930.webp\" alt=\"远程操作总结\"></p>\n<hr>\n<h1>第六部分：rebase — 保持提交历史整洁</h1>\n<p>这一部分放在远程之后，因为你已经在第五部分见过&quot;提交图成环&quot;的问题，才能理解 rebase 解决的是什么。</p>\n<h2 id=\"rebase-的原理\">rebase 的原理</h2>\n<p>rebase（变基）的过程：找到两个分支的公共祖先，然后把当前分支上的提交&quot;摘下来&quot;，重新应用到目标分支的最新位置上。这会改变这些提交所依赖的父节点，相当于把你的提交&quot;移植&quot;到目标分支的顶端。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260530163605155.webp\" alt=\"rebase 原理\"></p>\n<h2 id=\"典型场景feature-分支跟进主分支\">典型场景：feature 分支跟进主分支</h2>\n<p>你在 feature 分支上开发期间，主分支有了新提交。你想把主分支的最新代码同步过来，有两种选择：</p>\n<p><strong>方式一：merge 主分支到 feature 分支</strong>——会产生一个合并 commit，历史中多一个交叉点。</p>\n<p><strong>方式二：rebase 主分支到 feature 分支</strong>——你的提交会被&quot;搬到&quot;主分支最新提交的后面，历史保持线性，更干净。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260530163449560.webp\" alt=\"rebase 跟进主分支\"></p>\n<p>具体操作：先在 feature 分支上 checkout 主分支（rebase 的目标），在中间处理可能出现的冲突，解决后提交，最后合并回主分支。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260530164629128.webp\" alt=\"rebase 详细过程\"></p>\n<p><img src=\"/images/review/git-learning-notes/image-20260530165304601.webp\" alt=\"rebase 提交重放\"></p>\n<p><img src=\"/images/review/git-learning-notes/image-20260530170632429.webp\" alt=\"rebase 完成后的历史\"></p>\n<h2 id=\"rebase-vs-merge-对比\">rebase vs merge 对比</h2>\n<table>\n<thead>\n<tr>\n<th>维度</th>\n<th>merge</th>\n<th>rebase</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>历史</td>\n<td>保留分叉和合并的完整记录</td>\n<td>线性历史，看不出曾经的分叉</td>\n</tr>\n<tr>\n<td>合并 commit</td>\n<td>会生成一个合并节点</td>\n<td>不生成额外 commit</td>\n</tr>\n<tr>\n<td>冲突处理</td>\n<td>一次性解决所有冲突</td>\n<td>逐个 commit 重放，可能多次解决冲突</td>\n</tr>\n<tr>\n<td>安全性</td>\n<td>不改写历史，安全</td>\n<td>会改变 commit hash，已推送的分支慎用</td>\n</tr>\n</tbody></table>\n<p>经验法则：<strong>rebase 只在本地未推送的分支上用</strong>，避免对已推送的提交做变基（因为 hash 会变，别人的本地会和远程对不上）。</p>\n<hr>\n<h1>第七部分：急救工具箱 — 日常高频的&quot;后悔药&quot;</h1>\n<p>这一部分是&quot;出了问题怎么办&quot;的参考手册，每个命令解决一类常见的&quot;需要反悔&quot;的场景。</p>\n<h2 id=\"commit-amend修补上一次提交\">commit --amend：修补上一次提交</h2>\n<p>场景：刚提交完，发现 commit message 写错了，或者漏 add 了一个文件。</p>\n<pre><code>git commit --amend\n</code></pre>\n<p>这会覆盖上一次提交（包含 commit message），不生成新的 commit。如果只是修改 message：</p>\n<pre><code>git commit --amend -m &quot;新的 commit message&quot;\n</code></pre>\n<p>注意：如果上一次提交已经 push 到远程，amend 后需要 <code>git push --force-with-lease</code>。</p>\n<h2 id=\"stash临时保存工作区\">stash：临时保存工作区</h2>\n<p>场景：你正在 feature 分支写代码写到一半，突然需要切到 master 修一个紧急 bug，但当前代码还不想提交。</p>\n<pre><code>git stash          # 把当前工作区的修改存入暂存区（stash 栈）\ngit stash list     # 查看所有 stash\ngit stash pop      # 取出最近的 stash，恢复工作区\ngit stash drop     # 丢弃最近的 stash\n</code></pre>\n<p><img src=\"/images/review/git-learning-notes/image-20260607125406925.webp\" alt=\"stash 暂存示意\"></p>\n<p><img src=\"/images/review/git-learning-notes/image-20260607125535624.webp\" alt=\"stash 在 Git Graph 中的显示\"></p>\n<h2 id=\"revert安全撤销生成反向-commit\">revert：安全撤销（生成反向 commit）</h2>\n<p>场景：某个提交引入了 bug，你想撤销它，但不想改写历史（因为已经推送到远程）。</p>\n<pre><code>git revert HEAD    # 创建一个新 commit，反转 HEAD 的更改\n</code></pre>\n<p>revert 不删除任何历史，而是新增一个&quot;反向操作&quot;的提交。它是远程分支上撤销更改的安全方式。</p>\n<h2 id=\"reset回退soft-mixed-hard\">reset：回退（soft / mixed / hard）</h2>\n<p>场景：你想回退到之前的某个 commit，但三种模式对&quot;回退后代码去哪了&quot;的处理不同。</p>\n<pre><code>git reset --soft HEAD~1   # HEAD 回退，更改留在暂存区（stage）\ngit reset --mixed HEAD~1  # HEAD 回退，更改留在工作区（modified）\ngit reset --hard HEAD~1   # HEAD 回退，更改彻底删除（危险！）\n</code></pre>\n<p><img src=\"/images/review/git-learning-notes/image-20260607135909909.webp\" alt=\"reset 三种模式对比\"></p>\n<p>记忆要点：<code>--soft</code> 最温柔（代码还 staged），<code>--mixed</code> 是默认（代码还 modified），<code>--hard</code> 最激进（代码没了）。<code>--hard</code> 慎用，尤其是已推送的 commit 不要 reset。</p>\n<table>\n<thead>\n<tr>\n<th>模式</th>\n<th>HEAD 位置</th>\n<th>更改去哪了</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>--soft</td>\n<td>回退一个 commit</td>\n<td>留在暂存区</td>\n</tr>\n<tr>\n<td>--mixed（默认）</td>\n<td>回退一个 commit</td>\n<td>留在工作区</td>\n</tr>\n<tr>\n<td>--hard</td>\n<td>回退一个 commit</td>\n<td>彻底删除</td>\n</tr>\n</tbody></table>\n<h2 id=\"detached-head游离-head-状态\">detached HEAD：游离 HEAD 状态</h2>\n<p>场景：你想查看项目在某个历史 commit 的状态，于是 checkout 到了那个 commit，但那个 commit 没有分支指针指向它。</p>\n<pre><code># 1. 查看提交历史，找到目标 commit\ngit log --oneline\n# abc1234 (HEAD -&gt; main) 第三次提交\n# def5678 第二次提交\n# ghi9012 第一次提交\n\n# 2. 切换到特定 commit（进入 detached HEAD 状态）\ngit checkout def5678\n# 或\ngit switch --detach def5678\n\n# 3. 确认状态\ngit status\n# HEAD detached at def5678\n</code></pre>\n<p><strong>注意：不能直接在 detached HEAD 状态下提交代码。</strong> 如果你要基于这个 commit 继续开发，必须先创建分支：</p>\n<pre><code># 4. 创建新分支，安全地继续开发\ngit checkout -b new-branch-name\n# 或\ngit switch -c new-branch-name\n\n# 5. 现在可以安全地提交了\ngit add .\ngit commit -m &quot;在 detached 状态基础上修复 bug&quot;\n</code></pre>\n<h2 id=\"更改分支名\">更改分支名</h2>\n<pre><code>git checkout 旧分支名\ngit branch -m 新分支名\n</code></pre>\n<h2 id=\"restore只撤销某提交中某个文件的改动\">restore：只撤销某提交中某个文件的改动</h2>\n<p>场景：某次提交改了多个文件，其中一个文件是误改，需要单独撤销这个文件的改动，其他文件保留。</p>\n<p><strong>不要用 <code>git revert &lt;commit&gt;</code></strong>，因为这会反向撤销整个提交里的所有文件。</p>\n<p>正确思路：把目标文件恢复成&quot;该提交之前&quot;的版本（即该 commit 的父提交版本），只影响这一个文件。</p>\n<pre><code>git restore --source=&lt;commit&gt;~1 -- &lt;file&gt;\n</code></pre>\n<p>参数含义：</p>\n<ul>\n<li><code>git restore</code>：恢复文件内容到工作区</li>\n<li><code>--source=&lt;commit&gt;~1</code>：指定从哪个 commit 取文件版本，<code>~1</code> 表示目标 commit 的父提交（即该提交之前的状态）</li>\n<li><code>--</code>：分隔提交参数和文件路径，避免路径被误识别为参数</li>\n<li><code>&lt;file&gt;</code>：只恢复这个文件，不动其他文件</li>\n</ul>\n<h3 id=\"为什么不用-表示父提交\">为什么不用 <code>^</code> 表示父提交</h3>\n<p>理论上 <code>&lt;commit&gt;^</code> 也表示父提交，但在 Windows <code>cmd.exe</code> 中 <code>^</code> 是转义符，会被命令行吞掉或改变含义，导致 Git 拿不到正确的父提交引用。所以在 Windows 下统一用 <code>~1</code> 更稳妥。</p>\n<h3 id=\"执行后确认\">执行后确认</h3>\n<pre><code class=\"language-bash\"># 确认文件状态（成功应显示 M  modified）\ngit status --short -- &lt;file&gt;\n\n# 查看具体差异，确认只撤销了误改内容\ngit diff -- &lt;file&gt;\n\n# 只暂存目标文件（不要用 git add .，避免把其他未提交改动一起带入）\ngit add &lt;file&gt;\n\n# 提交\ngit commit -m &quot;bugfix: 撤销 xxx 的误改&quot;\n</code></pre>\n<p><strong>关键注意点</strong>：如果当前工作区还有其他未提交的改动，千万不要用 <code>git add .</code>，否则会把无关文件一起提交进去。这里只应该 <code>git add</code> 目标文件。</p>\n<hr>\n<h1>第八部分：团队工作流 — 把前面的知识组合起来</h1>\n<p>前面六部分学的是&quot;怎么用 Git 操作&quot;，这一部分学的是&quot;团队约定怎么用 Git&quot;。不同的团队规模和项目类型有不同的工作流模式，但底层都是分支 + 合并 + 远程的组合。</p>\n<h2 id=\"commit-message-规范\">Commit message 规范</h2>\n<p>每次提交的 message 遵循统一格式：<strong>verb(range): detail</strong></p>\n<table>\n<thead>\n<tr>\n<th>动词</th>\n<th>含义</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>add</td>\n<td>新增功能、文件或模块</td>\n</tr>\n<tr>\n<td>edit</td>\n<td>修改已有功能或代码</td>\n</tr>\n<tr>\n<td>remove</td>\n<td>删除功能、文件或模块</td>\n</tr>\n<tr>\n<td>feat</td>\n<td>新增用户功能（同 add）</td>\n</tr>\n<tr>\n<td>fix</td>\n<td>修复 bug</td>\n</tr>\n<tr>\n<td>docs</td>\n<td>修改文档（如 README、注释）</td>\n</tr>\n<tr>\n<td>style</td>\n<td>代码格式调整（不影响运行逻辑，如空格、缩进）</td>\n</tr>\n<tr>\n<td>refactor</td>\n<td>代码重构（不改变功能）</td>\n</tr>\n<tr>\n<td>test</td>\n<td>添加或修改测试用例</td>\n</tr>\n<tr>\n<td>chore</td>\n<td>构建工具、辅助工具、依赖等变动</td>\n</tr>\n<tr>\n<td>perf</td>\n<td>性能优化</td>\n</tr>\n<tr>\n<td>merge</td>\n<td>合并分支</td>\n</tr>\n<tr>\n<td>revert</td>\n<td>回滚之前的提交</td>\n</tr>\n</tbody></table>\n<p>两条核心原则：每次提交确认只提交想要提交的内容；每次 commit 只关注一件事。</p>\n<h2 id=\"语义化版本号\">语义化版本号</h2>\n<p><img src=\"/images/review/git-learning-notes/image-20260523163149500.webp\" alt=\"语义化版本号\"></p>\n<p>版本号格式：<code>主版本.次版本.修订号</code></p>\n<ul>\n<li>主版本（Major）：不兼容的 API 修改</li>\n<li>次版本（Minor）：向下兼容的新功能</li>\n<li>修订号（Patch）：向下兼容的 bug 修复</li>\n</ul>\n<h2 id=\"progressive-stability-分支模型\">Progressive-stability 分支模型</h2>\n<p>核心思想：渐进稳定（progressive-stability）。在最不稳定的分支上进行开发，稳定性逐步提高后向上合并。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260523164840855.webp\" alt=\"渐进稳定分支结构\"></p>\n<p><img src=\"/images/review/git-learning-notes/image-20260523171042629.webp\" alt=\"分支稳定性流向\"></p>\n<p>底层分支最不稳定（可以有半成品代码），越往上越稳定，最终到达发布分支时是经过充分测试的稳定代码。</p>\n<h2 id=\"team-workflow\">Team Workflow</h2>\n<p>团队工作流定义了&quot;谁在哪个分支上开发，什么时候合并，谁来审核&quot;。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260704164645579.webp\" alt=\"Team Workflow\"></p>\n<h2 id=\"im-pr-workflowpull-request-工作流\">IM-PR Workflow（Pull Request 工作流）</h2>\n<p>PR（Pull Request）工作流：开发者在自己的分支/fork 上完成开发后，发起 PR 请求合并到主分支。团队在 PR 上进行 Code Review，审核通过后合并。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260704164806638.webp\" alt=\"PR Workflow\"></p>\n<p>流程要点：开发分支 → push → 发起 PR → Code Review → 合并到主分支 → 删除开发分支。配合 <code>--no-ff</code> 合并，可以清晰地在历史中看到每个 PR 的边界。</p>\n<h2 id=\"fork-workflow\">Fork Workflow</h2>\n<p>Fork Workflow 适用于开源项目或跨组织协作：贡献者先 fork 原仓库到自己账号下，在 fork 仓库上开发，然后向原仓库发起 PR。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260704165121486.webp\" alt=\"Fork Workflow\"></p>\n<p>与 PR Workflow 的区别：Fork Workflow 中贡献者没有原仓库的写权限，必须通过 fork + PR 的方式贡献代码。</p>\n<hr>\n<h1>第九部分：托管平台与认证</h1>\n<h2 id=\"github-账号配置\">GitHub 账号配置</h2>\n<p>在向 GitHub 推送代码时，GitHub 需要校验你的身份。主要有两种认证方式。</p>\n<h3 id=\"ssh-密钥认证\">SSH 密钥认证</h3>\n<p>SSH 协议通过密钥对（公钥 + 私钥）认证身份，配置一次后无需重复输入密码。</p>\n<p><img src=\"/images/review/git-learning-notes/image-20260710165330313.webp\" alt=\"SSH 认证流程\"></p>\n<p>使用 <code>ssh-keygen</code> 生成密钥对：</p>\n<pre><code>ssh-keygen\n# Generating public/private ed25519 key pair.\n# Enter file in which to save the key (C:\\Users\\Li Zhengda/.ssh/id_ed25519):\n# Enter passphrase (empty for no passphrase):\n# Enter same passphrase again:\n# Your identification has been saved in C:\\Users\\Li Zhengda/.ssh/id_ed25519\n# Your public key has been saved in C:\\Users\\Li Zhengda/.ssh/id_ed25519.pub\n</code></pre>\n<p>生成后，将公钥（<code>.pub</code> 文件内容）添加到 GitHub 的 SSH Keys 设置中，私钥保留在本地不要泄露。</p>\n<h3 id=\"https-协议\">HTTPS 协议</h3>\n<p><img src=\"/images/review/git-learning-notes/image-20260711093759433.webp\" alt=\"HTTPS 认证\"></p>\n<p>HTTPS 方式通过用户名 + Token/密码认证，配置简单但每次推送可能需要输入凭据（可通过 credential helper 缓存）。</p>\n<hr>\n<h1>第十部分：IDE 集成</h1>\n<p>在 IDE（如 IntelliJ IDEA、VS Code 等）中使用 Git，主要有三个图形化面板：</p>\n<ul>\n<li><strong>Commit 面板</strong>：查看 changes 并提交，相当于图形化的 <code>git add</code> + <code>git commit</code></li>\n<li><strong>Log 面板</strong>：查看 commit graph，相当于 <code>git log --graph</code></li>\n<li><strong>分支面板</strong>：管理 branches（创建、切换、合并），相当于 <code>git branch</code> / <code>git checkout</code> / <code>git merge</code></li>\n</ul>\n<p>图形化工具降低了 Git 的使用门槛，但理解了前面九部分的概念后，你会发现这些面板只是命令行操作的封装。遇到复杂问题（冲突解决、rebase、历史回溯）时，命令行仍然是更精确的工具。</p>\n<hr>\n<blockquote>\n<p><strong>学习路径回顾</strong>：心智模型 → 单人能用 → 多分支 → 多人协作 → 高级技巧 → 急救 → 团队规范 → 工具链。每一部分解决一类&quot;你会遇到的场景&quot;，而不是孤立地罗列命令。</p>\n</blockquote>\n",
    "toc": [
      {
        "id": "目录",
        "level": 2,
        "title": "目录"
      },
      {
        "id": "0-配置只需一次",
        "level": 2,
        "title": "0. 配置（只需一次）"
      },
      {
        "id": "1-克隆仓库-初始化项目",
        "level": 2,
        "title": "1. 克隆仓库 / 初始化项目"
      },
      {
        "id": "2-日常提交流程最高频",
        "level": 2,
        "title": "2. 日常提交流程（最高频）"
      },
      {
        "id": "3-分支操作",
        "level": 2,
        "title": "3. 分支操作"
      },
      {
        "id": "4-合并",
        "level": 2,
        "title": "4. 合并"
      },
      {
        "id": "5-远程同步",
        "level": 2,
        "title": "5. 远程同步"
      },
      {
        "id": "6-rebase",
        "level": 2,
        "title": "6. rebase"
      },
      {
        "id": "7-急救-后悔药",
        "level": 2,
        "title": "7. 急救 / 后悔药"
      },
      {
        "id": "8-查看信息",
        "level": 2,
        "title": "8. 查看信息"
      },
      {
        "id": "git-的设计理念",
        "level": 2,
        "title": "Git 的设计理念"
      },
      {
        "id": "三大工作区域",
        "level": 2,
        "title": "三大工作区域"
      },
      {
        "id": "文件状态流转",
        "level": 2,
        "title": "文件状态流转"
      },
      {
        "id": "安装与配置",
        "level": 2,
        "title": "安装与配置"
      },
      {
        "id": "三级配置体系",
        "level": 3,
        "title": "三级配置体系"
      },
      {
        "id": "创建仓库",
        "level": 2,
        "title": "创建仓库"
      },
      {
        "id": "gitignore提前排除不需要追踪的文件",
        "level": 2,
        "title": ".gitignore：提前排除不需要追踪的文件"
      },
      {
        "id": "为什么需要分支",
        "level": 2,
        "title": "为什么需要分支"
      },
      {
        "id": "分支的本质",
        "level": 2,
        "title": "分支的本质"
      },
      {
        "id": "分支操作",
        "level": 2,
        "title": "分支操作"
      },
      {
        "id": "合并的基本流程",
        "level": 2,
        "title": "合并的基本流程"
      },
      {
        "id": "合并冲突",
        "level": 3,
        "title": "合并冲突"
      },
      {
        "id": "fast-forward-vs-no-ff",
        "level": 2,
        "title": "fast-forward vs --no-ff"
      },
      {
        "id": "本地仓库与远程仓库的关系模型",
        "level": 2,
        "title": "本地仓库与远程仓库的关系模型"
      },
      {
        "id": "clone第一次获取远程仓库",
        "level": 3,
        "title": "clone：第一次获取远程仓库"
      },
      {
        "id": "fetch安全拉取远程更新",
        "level": 2,
        "title": "fetch：安全拉取远程更新"
      },
      {
        "id": "push推送本地提交",
        "level": 2,
        "title": "push：推送本地提交"
      },
      {
        "id": "push-被拒绝的情况",
        "level": 3,
        "title": "push 被拒绝的情况"
      },
      {
        "id": "pullfetch-merge-rebase",
        "level": 2,
        "title": "pull：fetch + merge/rebase"
      },
      {
        "id": "pull-rebase-为什么能避免提交图成环",
        "level": 3,
        "title": "pull --rebase 为什么能避免提交图成&quot;环&quot;"
      },
      {
        "id": "远程协作小结",
        "level": 3,
        "title": "远程协作小结"
      },
      {
        "id": "rebase-的原理",
        "level": 2,
        "title": "rebase 的原理"
      },
      {
        "id": "典型场景feature-分支跟进主分支",
        "level": 2,
        "title": "典型场景：feature 分支跟进主分支"
      },
      {
        "id": "rebase-vs-merge-对比",
        "level": 2,
        "title": "rebase vs merge 对比"
      },
      {
        "id": "commit-amend修补上一次提交",
        "level": 2,
        "title": "commit --amend：修补上一次提交"
      },
      {
        "id": "stash临时保存工作区",
        "level": 2,
        "title": "stash：临时保存工作区"
      },
      {
        "id": "revert安全撤销生成反向-commit",
        "level": 2,
        "title": "revert：安全撤销（生成反向 commit）"
      },
      {
        "id": "reset回退soft-mixed-hard",
        "level": 2,
        "title": "reset：回退（soft / mixed / hard）"
      },
      {
        "id": "detached-head游离-head-状态",
        "level": 2,
        "title": "detached HEAD：游离 HEAD 状态"
      },
      {
        "id": "更改分支名",
        "level": 2,
        "title": "更改分支名"
      },
      {
        "id": "restore只撤销某提交中某个文件的改动",
        "level": 2,
        "title": "restore：只撤销某提交中某个文件的改动"
      },
      {
        "id": "为什么不用-表示父提交",
        "level": 3,
        "title": "为什么不用 ^ 表示父提交"
      },
      {
        "id": "执行后确认",
        "level": 3,
        "title": "执行后确认"
      },
      {
        "id": "commit-message-规范",
        "level": 2,
        "title": "Commit message 规范"
      },
      {
        "id": "语义化版本号",
        "level": 2,
        "title": "语义化版本号"
      },
      {
        "id": "progressive-stability-分支模型",
        "level": 2,
        "title": "Progressive-stability 分支模型"
      },
      {
        "id": "team-workflow",
        "level": 2,
        "title": "Team Workflow"
      },
      {
        "id": "im-pr-workflowpull-request-工作流",
        "level": 2,
        "title": "IM-PR Workflow（Pull Request 工作流）"
      },
      {
        "id": "fork-workflow",
        "level": 2,
        "title": "Fork Workflow"
      },
      {
        "id": "github-账号配置",
        "level": 2,
        "title": "GitHub 账号配置"
      },
      {
        "id": "ssh-密钥认证",
        "level": 3,
        "title": "SSH 密钥认证"
      },
      {
        "id": "https-协议",
        "level": 3,
        "title": "HTTPS 协议"
      }
    ]
  },
  {
    "slug": "agent-blog-tutorial",
    "title": "从学习笔记到博客：Agent 协作写稿全流程教程",
    "date": "2026-05-13",
    "category": "AI 工具",
    "categories": [
      "AI 工具"
    ],
    "tags": [
      "Claude Code",
      "Agent",
      "博客",
      "教程",
      "自动化写作"
    ],
    "image": "/images/site/study-hero.webp",
    "excerpt": "手把手教你从零搭建达主编、达审稿、达发布三个 Agent Skill，并用它们完成从学习笔记到博客发布的完整流程。",
    "read": "8 分钟",
    "wordCount": 3561,
    "searchText": "从学习笔记到博客：Agent 协作写稿全流程教程 手把手教你从零搭建达主编、达审稿、达发布三个 Agent Skill，并用它们完成从学习笔记到博客发布的完整流程。 AI 工具 Claude Code Agent 博客 教程 自动化写作 你是否也有这样的经历：学完一个技术点，笔记写了一堆，但要整理成博客文章时却不知从何下手？本文将带你从零搭建一套基于 Claude Code 自定义 Skill 的三 Agent 协作流程，附带所有配置文件和 Skill 完整实现，让你只需几条命令就能完成从原始笔记到博客发布的全过程。 达的话： ​ 哈哈哈，只有这一段是我自己写的，那么为什么会有这个想法呢，平时自己比较懒，一些学习记录其实并没有很好的内化记录，借着ai工具，这个流程可以推进的很快，那么就正好顺着时代潮流吧 ​ 后面还是会不断修改的，毕竟我也是刚刚入手 三个 Agent 各司其职 这套工作流由三个 Agent 组成，各自有一个代号： Agent 代号 职责 触发命令 主稿人 达主编 将原始学习笔记转化为博客草稿 /blog editor 审稿人 达审稿 审查草稿质量，输出审查报告 /reviewer 发布人 达发布 本地预览、构建验证、推送到 GitHub Pages /publish 完整流程如下： 审查和修改可以循环多次，直到文章通过审查。 第一部分：环境搭建 下面从零开始搭建整套环境，包括 Hugo 博客站点、GitHub Pages 部署、以及三个 Claude Code Skill。 Step 1: 安装 Hugo Hugo 是一个用 Go 语言编写的静态网站生成器，我们的博客就用它来构建。 确保输出中包含 extended 字样。 Step 2: 创建 Hugo 站点 Step 3: 配置 Hugo 编辑站点根目录的 hugo.toml ，替换为以下内容。注意将 替换为你的实际 GitHub 用户名： Step 4: 配置 GitHub Pages 部署 首先在 GitHub 上创建一个名为 .github.io 的仓库。 然后在本地仓库中创建 GitHub Actions 工作流文件： 创建 .github/workflows/deploy.yml ： 在 GitHub 仓库的 Settings → Pages 中，将 Source 设置为 GitHub Actions 。 然后将本地仓库关联到远程并推送： Step 5: 创建 Skills 目录 Claude Code 的自定义 Skill 放在用户目录下的 .claude/skills/ 中。创建以下目录结构： 目录结构如下： Step 6: 达主编 Skill（blog editor） 创建 /.claude/skills/blog editor/SKILL.md ，完整内容如下： 修改完成 文件: blog/content/posts/ .md 处理结果: [已修复] [已修复] [未采纳] — 理由: yaml title: \"从内容推断的标题\" date: YYYY MM DDTHH:MM:SS+08:00 draft: false tags: [\"标签1\", \"标签2\"] categories: [\"分类\"] description: \"一句话摘要\" markdown 本文由 达主编 整理润色， 达审稿 审阅， 达发布 发布。 草稿已生成 文件: blog/content/posts/ .md 标题: 标签: 变更: 修正了 X 处代码块语言标签 补充了 Y 处概念解释 ... Step 7: 达审稿 Skill（blog reviewer） 创建 /.claude/skills/blog reviewer/SKILL.md ，完整内容如下： 审查报告: 必须修复 (Critical) [ ] (位置: ) [ ] 建议改进 (Suggestions) [ ] [ ] 亮点 (Strengths) 总评 Step 8: 达发布 Skill（blog publish） 创建 /.claude/skills/blog publish/SKILL.md ，完整内容如下： bash cd hugo server disableFastRender bash cd hugo minify bash cd git add content/posts/ git commit m \"发布文章: \" git push origin main 注意 ：Skill 文件中的 和 等占位符，达发布在实际运行时会根据你的环境自动识别，不需要手动替换。 环境搭建完成，下面开始使用这套工作流。 第二部分：使用流程 第一步：准备学习笔记 首先你需要一份原始的 Markdown 学习笔记。笔记不需要格式完美，但建议满足以下基本要求： 使用 Markdown 格式（ .md 文件） 包含标题和基本的章节结构 代码示例尽量完整 保留你学习过程中记录的外部链接 一个简单的笔记示例（ /学习笔记/python decorators.md ）： 笔记内容越充实，达主编生成的草稿质量越高。 第二步：达主编生成草稿 在 Claude Code 中输入以下命令，将你的笔记路径传给达主编： 达主编会执行以下操作： 1. 读取原始笔记 — 分析内容的主题、结构和需要补充的部分 2. 生成博客草稿 — 输出到博客站点的 content/posts/ 目录，文件名根据主题自动生成英文 slug（如 python decorators.md ） 3. 输出变更摘要 — 告诉你做了哪些修改 达主编会在草稿中自动完成以下处理： 添加 Hugo frontmatter（标题、日期、标签、分类、摘要） 补充读者可能不熟悉的概念解释 修正代码块的语言标签（比如把 java 改成 python ） 为每个章节添加简短引言，改善段落过渡 在文末添加署名信息 生成完成后你会看到类似这样的变更摘要： 第三步：达审稿审查 草稿生成后，让达审稿进行质量审查： 达审稿会从六个维度进行审查： 维度 审查内容 技术准确性 概念是否正确、代码逻辑是否有误 代码质量 语言标签是否匹配、示例是否可运行 内容完整性 段落转换是否自然、关键步骤是否遗漏 格式规范 Markdown 语法、frontmatter、标题层级 链接有效性 外部链接是否合理 隐私安全 是否泄露个人路径、用户名、API Key 等 审查完成后会输出一份结构化报告： 重点看\"必须修复\"部分 ，这些是必须全部解决的问题，尤其要注意隐私安全类的 Critical 项。\"建议改进\"则是可选的优化。 第四步：根据审查修改草稿 拿到审查报告后，把报告反馈给达主编进行修改。将审查报告内容粘贴在命令后面： 达主编进入 修改模式 ，会逐条处理审查意见： 必须修复 (Critical) — 全部修复，不遗漏 建议改进 (Suggestions) — 选择性采纳，说明理由 修改完成后输出处理结果： 如果审查报告中有 Critical 项，修改后建议 再跑一次审查 确认所有问题已修复： 审查和修改可以循环多次，直到达审稿不再报出 Critical 问题。 第五步：达发布部署 文章通过审查后，就可以发布到博客了： 达发布会按顺序执行五个步骤： 1. 验证 — 检查 frontmatter 是否完整、文件位置是否正确、文件名是否符合规范、是否有署名信息 2. 本地预览 — 启动 hugo server ，你可以打开 http://localhost:1313 查看文章效果。 预览无误后告诉达发布继续 3. 构建验证 — 运行 hugo minify 确认构建无错误 4. 提交并推送 — 将文章文件添加到 Git，以 发布文章: 为 commit message 推送到 origin main 5. 报告 — 告知你文章已推送，GitHub Actions 将自动部署，2 5 分钟后即可在线访问 每次只提交一篇文章，方便追溯和回滚。 完整流程示例 下面是一个端到端的操作示例，从笔记到发布只需要几条命令： 常见问题 审查报告中出现了 Critical 怎么办？ Critical 项必须全部修复。最常见的是 隐私泄露 （个人路径、用户名等），达主编的修改模式会帮你处理。修改后重新跑一遍审查确认即可。 部署时构建失败怎么办？ 构建失败时达发布会立即停止并报告错误。常见原因： Hugo frontmatter 格式错误 — 检查 YAML 语法是否正确 Hugo 主题未更新 — 如果使用了 git submodule 管理主题，运行 git submodule update init recursive Hugo 版本不匹配 — 确保使用的是 Extended 版本 推送时网络不通怎么办？ 如果网络环境需要代理，确保 Git 的代理配置正确。可以在博客仓库目录下检查： Skill 没有被识别怎么办？ 检查三个 Skill 文件是否放在正确的路径下： 文件名必须是 SKILL.md （全大写），目录名必须与 Skill 中 name 字段一致。如果修改了 Skill 文件，需要重启 Claude Code 才能生效。 想修改 Skill 的行为怎么办？ 三个 Skill 都是纯文本的 Markdown 文件，你可以直接编辑对应的 SKILL.md 来调整行为。比如： 在达主编中增加特定领域的写作规范 在达审稿中添加自定义审查维度 在达发布中修改 commit message 格式或部署流程 总结 整套流程的核心思路是： 你写笔记，Agent 干活 。 达主编 帮你把零散的笔记整理成结构化的博客文章 达审稿 从技术、格式、隐私等六个维度把关质量 达发布 处理构建、预览、部署的工程细节 你只需要写好笔记，然后发出三到五条命令。试试看吧。 参考资料 Claude Code 文档 Hugo 官方文档 PaperMod 主题 本文由 达主编 整理润色， 达审稿 审阅， 达发布 发布。",
    "html": "<p>你是否也有这样的经历：学完一个技术点，笔记写了一堆，但要整理成博客文章时却不知从何下手？本文将带你从零搭建一套基于 Claude Code 自定义 Skill 的三 Agent 协作流程，附带所有配置文件和 Skill 完整实现，让你只需几条命令就能完成从原始笔记到博客发布的全过程。\n<strong>达的话：</strong></p>\n<p>​\t哈哈哈，只有这一段是我自己写的，那么为什么会有这个想法呢，平时自己比较懒，一些学习记录其实并没有很好的内化记录，借着ai工具，这个流程可以推进的很快，那么就正好顺着时代潮流吧~</p>\n<p>​\t后面还是会不断修改的，毕竟我也是刚刚入手~</p>\n<h2 id=\"三个-agent-各司其职\">三个 Agent 各司其职</h2>\n<p>这套工作流由三个 Agent 组成，各自有一个代号：</p>\n<table>\n<thead>\n<tr>\n<th>Agent</th>\n<th>代号</th>\n<th>职责</th>\n<th>触发命令</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>主稿人</td>\n<td><strong>达主编</strong></td>\n<td>将原始学习笔记转化为博客草稿</td>\n<td><code>/blog-editor</code></td>\n</tr>\n<tr>\n<td>审稿人</td>\n<td><strong>达审稿</strong></td>\n<td>审查草稿质量，输出审查报告</td>\n<td><code>/reviewer</code></td>\n</tr>\n<tr>\n<td>发布人</td>\n<td><strong>达发布</strong></td>\n<td>本地预览、构建验证、推送到 GitHub Pages</td>\n<td><code>/publish</code></td>\n</tr>\n</tbody></table>\n<p>完整流程如下：</p>\n<pre><code>原始笔记 ──→ 达主编（生成草稿）──→ 用户审阅 ──→ 达审稿（审查）──→ 达主编（修改）──→ 达发布（部署）\n</code></pre>\n<p>审查和修改可以循环多次，直到文章通过审查。</p>\n<h2 id=\"第一部分环境搭建\">第一部分：环境搭建</h2>\n<p>下面从零开始搭建整套环境，包括 Hugo 博客站点、GitHub Pages 部署、以及三个 Claude Code Skill。</p>\n<h3 id=\"step-1-安装-hugo\">Step 1: 安装 Hugo</h3>\n<p>Hugo 是一个用 Go 语言编写的静态网站生成器，我们的博客就用它来构建。</p>\n<pre><code class=\"language-bash\"># Windows（需要 Extended 版本以支持 Sass）\nwinget install Hugo.Hugo.Extended\n\n# macOS\nbrew install hugo\n\n# 验证安装\nhugo version\n</code></pre>\n<p>确保输出中包含 <code>extended</code> 字样。</p>\n<h3 id=\"step-2-创建-hugo-站点\">Step 2: 创建 Hugo 站点</h3>\n<pre><code class=\"language-bash\"># 创建站点\nhugo new site blog\ncd blog\n\n# 初始化 Git\ngit init\n\n# 添加 PaperMod 主题作为 Git 子模块\ngit submodule add https://github.com/adityatelange/hugo-PaperMod themes/PaperMod\n</code></pre>\n<h3 id=\"step-3-配置-hugo\">Step 3: 配置 Hugo</h3>\n<p>编辑站点根目录的 <code>hugo.toml</code>，替换为以下内容。注意将 <code>&lt;你的GitHub用户名&gt;</code> 替换为你的实际 GitHub 用户名：</p>\n<pre><code class=\"language-toml\">baseURL = &quot;https://&lt;你的GitHub用户名&gt;.github.io/&quot;\ntitle = &quot;学习笔记&quot;\ntheme = &quot;PaperMod&quot;\n\ndefaultContentLanguage = &quot;zh-cn&quot;\n\n[params]\n  defaultTheme = &quot;auto&quot;\n  ShowReadingTime = true\n  ShowShareButtons = true\n  ShowPostNavLinks = true\n  ShowBreadCrumbs = true\n  ShowCodeCopyButtons = true\n  ShowWordCount = true\n  ShowToc = true\n  TocOpen = false\n\n  [params.cover]\n    hidden = true\n\n[outputs]\n  home = [&quot;HTML&quot;, &quot;RSS&quot;, &quot;JSON&quot;]\n\n[markup]\n  [markup.highlight]\n    style = &quot;monokai&quot;\n    lineNos = true\n</code></pre>\n<h3 id=\"step-4-配置-github-pages-部署\">Step 4: 配置 GitHub Pages 部署</h3>\n<p>首先在 GitHub 上创建一个名为 <code>&lt;你的GitHub用户名&gt;.github.io</code> 的仓库。</p>\n<p>然后在本地仓库中创建 GitHub Actions 工作流文件：</p>\n<pre><code class=\"language-bash\">mkdir -p .github/workflows\n</code></pre>\n<p>创建 <code>.github/workflows/deploy.yml</code>：</p>\n<pre><code class=\"language-yaml\">name: Deploy Hugo site to Pages\n\non:\n  push:\n    branches: [&quot;main&quot;]\n  workflow_dispatch:\n\npermissions:\n  contents: read\n  pages: write\n  id-token: write\n\nconcurrency:\n  group: &quot;pages&quot;\n  cancel-in-progress: false\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout\n        uses: actions/checkout@v4\n        with:\n          submodules: recursive\n\n      - name: Setup Hugo\n        uses: peaceiris/actions-hugo@v3\n        with:\n          hugo-version: &#39;latest&#39;\n          extended: true\n\n      - name: Build\n        run: hugo --minify\n\n      - name: Upload artifact\n        uses: actions/upload-pages-artifact@v3\n        with:\n          path: ./public\n\n  deploy:\n    environment:\n      name: github-pages\n      url: ${{ steps.deployment.outputs.page_url }}\n    runs-on: ubuntu-latest\n    needs: build\n    steps:\n      - name: Deploy to GitHub Pages\n        id: deployment\n        uses: actions/deploy-pages@v4\n</code></pre>\n<p>在 GitHub 仓库的 Settings → Pages 中，将 Source 设置为 <strong>GitHub Actions</strong>。</p>\n<p>然后将本地仓库关联到远程并推送：</p>\n<pre><code class=\"language-bash\">git remote add origin https://github.com/&lt;你的GitHub用户名&gt;/&lt;你的GitHub用户名&gt;.github.io.git\ngit add .\ngit commit -m &quot;初始化博客站点&quot;\ngit push -u origin main\n</code></pre>\n<h3 id=\"step-5-创建-skills-目录\">Step 5: 创建 Skills 目录</h3>\n<p>Claude Code 的自定义 Skill 放在用户目录下的 <code>.claude/skills/</code> 中。创建以下目录结构：</p>\n<pre><code class=\"language-bash\">mkdir -p ~/.claude/skills/blog-editor\nmkdir -p ~/.claude/skills/blog-reviewer\nmkdir -p ~/.claude/skills/blog-publish\n</code></pre>\n<p>目录结构如下：</p>\n<pre><code>~/.claude/skills/\n├── blog-editor/\n│   └── SKILL.md       # 达主编\n├── blog-reviewer/\n│   └── SKILL.md       # 达审稿\n└── blog-publish/\n    └── SKILL.md       # 达发布\n</code></pre>\n<h3 id=\"step-6-达主编-skillblog-editor\">Step 6: 达主编 Skill（blog-editor）</h3>\n<p>创建 <code>~/.claude/skills/blog-editor/SKILL.md</code>，完整内容如下：</p>\n<pre><code class=\"language-markdown\">---\nname: blog-editor\ndescription: &quot;主稿人 - 将原始学习笔记转化为博客文章。当用户说&#39;编辑笔记&#39;、&#39;生成草稿&#39;、&#39;主稿人&#39;、提到将笔记转化为博客文章、或使用 /editor 命令时触发。输入原始 Markdown 笔记文件，输出带 Hugo frontmatter 的博客草稿到博客站点的 content/posts/ 目录。&quot;\n---\n\n# 主稿人 Skill — 达主编\n\n你是学习笔记的主稿人，名字叫 **达主编**。负责将原始学习笔记转化为适合博客发布的文章。\n\n## 使用方式\n\n达主编支持两种工作模式：\n\n### 模式一：生成模式\n用户输入: `/blog-editor &lt;原始笔记路径&gt;`\n\n1. **读取原始笔记** - 读取用户指定的 Markdown 文件\n2. **分析内容** - 识别主题、结构、需要补充的部分\n3. **生成草稿** - 输出到博客站点的 `content/posts/&lt;slug&gt;.md`\n\n### 模式二：修改模式\n用户输入: `/blog-editor &lt;草稿路径&gt; [修改意见]`\n\n当用户指定的文件已经是博客草稿（位于 `blog/content/posts/` 下），或用户提供了达审稿的审查意见时，进入修改模式：\n\n1. **读取现有草稿** - 读取博客文章\n2. **读取审查意见** - 如果用户粘贴了达审稿的审查报告，逐条处理：\n   - **必须修复 (Critical)**：全部修复，不遗漏\n   - **建议改进 (Suggestions)**：选择性采纳，说明理由\n3. **执行修改** - 在原文件上直接修改，保留 frontmatter 和署名\n4. **报告修改摘要** - 逐条说明处理结果\n\n```\n## 修改完成\n- 文件: blog/content/posts/&lt;slug&gt;.md\n- 处理结果:\n  - [已修复] &lt;问题描述&gt;\n  - [已修复] &lt;问题描述&gt;\n  - [未采纳] &lt;建议描述&gt; — 理由: &lt;说明&gt;\n```\n\n## 输出要求\n\n### Hugo Frontmatter（YAML 格式）\n```yaml\n---\ntitle: &quot;从内容推断的标题&quot;\ndate: YYYY-MM-DDTHH:MM:SS+08:00\ndraft: false\ntags: [&quot;标签1&quot;, &quot;标签2&quot;]\ncategories: [&quot;分类&quot;]\ndescription: &quot;一句话摘要&quot;\n---\n```\n\n### 内容处理规则\n- **保留作者原意和口吻**，不删除原始内容\n- **补充上下文**：对读者可能不熟悉的术语、概念添加简要解释\n- **修正错误**：修正代码块语言标签错误（如 java → python）、重复文本等明显问题\n- **丰富结构**：为每个主要章节添加简短引言，改善段落间的过渡\n- **保留所有外部链接和参考资料**\n- **代码块语言标签必须与实际代码匹配**\n\n### slug 生成规则\n文件名用英文 slug，根据内容主题推断，如 FastAPI → `fastapi-basics.md`\n\n### 文章署名\n每篇文章末尾必须添加署名信息（在参考资料之后）：\n```markdown\n---\n\n&gt; 本文由 **达主编** 整理润色，**达审稿** 审阅，**达发布** 发布。\n```\n\n## 输出变更摘要\n处理完成后，报告变更摘要：\n```\n## 草稿已生成\n- 文件: blog/content/posts/&lt;slug&gt;.md\n- 标题: &lt;推断的标题&gt;\n- 标签: &lt;推断的标签&gt;\n- 变更:\n  - 修正了 X 处代码块语言标签\n  - 补充了 Y 处概念解释\n  - ...\n```\n</code></pre>\n<h3 id=\"step-7-达审稿-skillblog-reviewer\">Step 7: 达审稿 Skill（blog-reviewer）</h3>\n<p>创建 <code>~/.claude/skills/blog-reviewer/SKILL.md</code>，完整内容如下：</p>\n<pre><code class=\"language-markdown\">---\nname: blog-reviewer\ndescription: &quot;审稿人 - 审阅博客文章草稿并提出修改建议。当用户说&#39;审查文章&#39;、&#39;审稿&#39;、&#39;审稿人&#39;、&#39;检查草稿&#39;、或使用 /reviewer 命令时触发。输入博客草稿文件，输出结构化审查报告。&quot;\n---\n\n# 审稿人 Skill — 达审稿\n\n你是学习笔记的审稿人，名字叫 **达审稿**。负责审阅博客文章草稿，发现其中的问题并提出改进建议。\n\n## 使用方式\n用户输入: `/reviewer &lt;草稿文件路径&gt;`\n\n## 审查维度\n\n### 1. 技术准确性\n- 技术概念是否正确\n- 代码逻辑是否有误\n- 命令/参数是否准确\n\n### 2. 代码质量\n- 代码块语言标签是否与实际代码匹配\n- 代码示例是否可以运行\n- 是否存在语法错误\n\n### 3. 内容完整性\n- 是否有突兀的段落转换\n- 概念解释是否充分\n- 是否遗漏关键步骤或说明\n\n### 4. 格式规范\n- Markdown 语法是否正确\n- Hugo frontmatter 是否完整有效\n- 标题层级是否合理（不应跳级）\n- 列表、引用、代码块格式是否统一\n\n### 5. 链接有效性\n- 外部链接是否指向合理的目标\n- 参考资料是否完整\n\n### 6. 隐私安全（Critical）\n博客是公开的，必须严格排查隐私泄露。检查以下内容：\n\n- **个人文件路径**：如 `D:\\Agent\\`、`C:\\Users\\`、`/home/xxx/` 等，应替换为通用路径（如 `~/学习笔记/`、`&lt;项目目录&gt;`）\n- **用户名/账号**：如 GitHub 用户名、邮箱等，除非是公开信息且文章需要引用，否则应脱敏\n- **API Key / Token / 密码**：任何形式的密钥、token、密码字符串，即使已部分遮蔽也应完全移除\n- **内网/本地地址**：如 `127.0.0.1:&lt;端口&gt;`、`localhost:&lt;端口&gt;` 中的端口号如果涉及代理等私密配置，应脱敏或移除\n- **私有仓库/服务地址**：内部服务器、私有 Docker 仓库等不应出现在公开文章中\n- **环境变量名**：如 `MY_API_KEY`、`.env` 文件内容等，如果暴露了密钥获取方式应脱敏\n\n**脱敏原则**：\n- 能移除的直接移除（如 API Key）\n- 需要保留上下文的用占位符替代（如 `&lt;你的GitHub用户名&gt;`、`&lt;代理端口&gt;`）\n- 通用路径不影响可读性（`&lt;项目目录&gt;/blog/` 比完整路径更清晰）\n- 脱敏后代码示例仍需可运行（不能因为脱敏破坏代码逻辑）\n\n## 输出格式\n\n严格按照以下结构输出审查报告：\n\n```\n## 审查报告: &lt;文章标题&gt;\n\n### 必须修复 (Critical)\n- [ ] &lt;问题描述&gt; (位置: &lt;行号或章节&gt;)\n- [ ] &lt;问题描述&gt;\n\n### 建议改进 (Suggestions)\n- [ ] &lt;建议描述&gt;\n- [ ] &lt;建议描述&gt;\n\n### 亮点 (Strengths)\n- &lt;做得好的地方&gt;\n\n### 总评\n&lt;简短的整体评价和优先修改建议&gt;\n```\n\n## 审查原则\n- **隐私安全优先级最高**，任何隐私泄露都必须列为 Critical\n- 对技术内容严格审查，不放过事实错误\n- 对格式问题适度宽容，聚焦影响可读性的问题\n- 始终给出具体的修改建议，而不只是指出问题\n- 优先级：隐私泄露 &gt; 事实错误 &gt; 代码错误 &gt; 缺失信息 &gt; 格式问题\n</code></pre>\n<h3 id=\"step-8-达发布-skillblog-publish\">Step 8: 达发布 Skill（blog-publish）</h3>\n<p>创建 <code>~/.claude/skills/blog-publish/SKILL.md</code>，完整内容如下：</p>\n<pre><code class=\"language-markdown\">---\nname: blog-publish\ndescription: &quot;发布 - 将审核通过的博客文章部署到 GitHub Pages。当用户说&#39;发布文章&#39;、&#39;部署博客&#39;、&#39;推送到博客&#39;、或使用 /publish 命令时触发。输入博客文章文件路径，执行本地预览、git 提交和推送，触发 GitHub Actions 自动部署。&quot;\n---\n\n# 发布 Skill — 达发布\n\n你是博客发布人，名字叫 **达发布**。负责将审核通过的博客文章部署到 GitHub Pages。\n\n## 使用方式\n用户输入: `/publish &lt;文章文件路径&gt;`\n\n## 博客站点信息\n- 博客目录: `&lt;博客站点目录&gt;`（用户的工作区路径，由用户在首次使用时配置）\n- GitHub 仓库: `&lt;GitHub用户名&gt;/&lt;GitHub用户名&gt;.github.io`\n- 部署地址: `https://&lt;GitHub用户名&gt;.github.io/`\n- git 代理: `http://127.0.0.1:&lt;代理端口&gt;`（如需推送需确保代理可用，端口号由用户配置）\n\n## 工作流程\n\n### Step 1: 验证\n检查文章是否具备：\n- [ ] 有效的 Hugo frontmatter（title, date, draft=false）\n- [ ] 文件位于博客站点的 `content/posts/` 目录下\n- [ ] 文件名符合 slug 规范（小写英文+连字符）\n- [ ] 文章末尾包含署名信息（达主编、达审稿、达发布）\n\n### Step 2: 本地预览\n```bash\ncd &lt;博客站点目录&gt;\nhugo server --disableFastRender\n```\n告知用户本地预览地址：http://localhost:1313\n\n**等用户确认预览无误后继续下一步。**\n\n### Step 3: 构建验证\n```bash\ncd &lt;博客站点目录&gt;\nhugo --minify\n```\n确认构建无错误。\n\n### Step 4: 提交并推送\n```bash\ncd &lt;博客站点目录&gt;\ngit add content/posts/&lt;filename&gt;\ngit commit -m &quot;发布文章: &lt;title&gt;&quot;\ngit push origin main\n```\n\n### Step 5: 报告\n告知用户：\n- 文章已推送到 GitHub\n- GitHub Actions 将自动构建并部署\n- 预计 2-5 分钟后可访问: 博客部署地址对应的文章路径\n\n## 注意事项\n- 每次只提交一篇文章，方便追溯\n- commit message 使用中文，格式为 `发布文章: &lt;标题&gt;`\n- 如果构建失败，立即停止并报告错误\n- push 时如遇网络问题，检查 git 代理配置\n</code></pre>\n<blockquote>\n<p><strong>注意</strong>：Skill 文件中的 <code>&lt;博客站点目录&gt;</code> 和 <code>&lt;GitHub用户名&gt;</code> 等占位符，达发布在实际运行时会根据你的环境自动识别，不需要手动替换。</p>\n</blockquote>\n<hr>\n<p>环境搭建完成，下面开始使用这套工作流。</p>\n<h2 id=\"第二部分使用流程\">第二部分：使用流程</h2>\n<h3 id=\"第一步准备学习笔记\">第一步：准备学习笔记</h3>\n<p>首先你需要一份原始的 Markdown 学习笔记。笔记不需要格式完美，但建议满足以下基本要求：</p>\n<ul>\n<li>使用 Markdown 格式（<code>.md</code> 文件）</li>\n<li>包含标题和基本的章节结构</li>\n<li>代码示例尽量完整</li>\n<li>保留你学习过程中记录的外部链接</li>\n</ul>\n<p>一个简单的笔记示例（<code>~/学习笔记/python-decorators.md</code>）：</p>\n<pre><code class=\"language-markdown\"># Python 装饰器\n\n## 什么是装饰器\n装饰器本质上是一个接受函数作为参数并返回新函数的高阶函数。\n\n## 基本语法\n用 @ 符号放在函数定义前面：\n\n@my_decorator\ndef say_hello():\n    print(&quot;Hello!&quot;)\n\n## 常见用途\n- 日志记录\n- 权限检查\n- 缓存结果\n- 重试机制\n\n## 参考\n- https://docs.python.org/3/glossary.html#term-decorator\n</code></pre>\n<p>笔记内容越充实，达主编生成的草稿质量越高。</p>\n<h3 id=\"第二步达主编生成草稿\">第二步：达主编生成草稿</h3>\n<p>在 Claude Code 中输入以下命令，将你的笔记路径传给达主编：</p>\n<pre><code>/blog-editor ~/学习笔记/python-decorators.md\n</code></pre>\n<p>达主编会执行以下操作：</p>\n<ol>\n<li><strong>读取原始笔记</strong> — 分析内容的主题、结构和需要补充的部分</li>\n<li><strong>生成博客草稿</strong> — 输出到博客站点的 <code>content/posts/</code> 目录，文件名根据主题自动生成英文 slug（如 <code>python-decorators.md</code>）</li>\n<li><strong>输出变更摘要</strong> — 告诉你做了哪些修改</li>\n</ol>\n<p>达主编会在草稿中自动完成以下处理：</p>\n<ul>\n<li>添加 Hugo frontmatter（标题、日期、标签、分类、摘要）</li>\n<li>补充读者可能不熟悉的概念解释</li>\n<li>修正代码块的语言标签（比如把 <code>java</code> 改成 <code>python</code>）</li>\n<li>为每个章节添加简短引言，改善段落过渡</li>\n<li>在文末添加署名信息</li>\n</ul>\n<p>生成完成后你会看到类似这样的变更摘要：</p>\n<pre><code>## 草稿已生成\n- 文件: blog/content/posts/python-decorators.md\n- 标题: Python 装饰器入门\n- 标签: [&quot;Python&quot;, &quot;装饰器&quot;, &quot;语法糖&quot;]\n- 变更:\n  - 补充了装饰器原理的解释\n  - 添加了 3 个可运行的代码示例\n  - 完善了章节间的过渡\n</code></pre>\n<h3 id=\"第三步达审稿审查\">第三步：达审稿审查</h3>\n<p>草稿生成后，让达审稿进行质量审查：</p>\n<pre><code>/reviewer blog/content/posts/python-decorators.md\n</code></pre>\n<p>达审稿会从六个维度进行审查：</p>\n<table>\n<thead>\n<tr>\n<th>维度</th>\n<th>审查内容</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>技术准确性</td>\n<td>概念是否正确、代码逻辑是否有误</td>\n</tr>\n<tr>\n<td>代码质量</td>\n<td>语言标签是否匹配、示例是否可运行</td>\n</tr>\n<tr>\n<td>内容完整性</td>\n<td>段落转换是否自然、关键步骤是否遗漏</td>\n</tr>\n<tr>\n<td>格式规范</td>\n<td>Markdown 语法、frontmatter、标题层级</td>\n</tr>\n<tr>\n<td>链接有效性</td>\n<td>外部链接是否合理</td>\n</tr>\n<tr>\n<td>隐私安全</td>\n<td>是否泄露个人路径、用户名、API Key 等</td>\n</tr>\n</tbody></table>\n<p>审查完成后会输出一份结构化报告：</p>\n<pre><code class=\"language-markdown\">## 审查报告: Python 装饰器入门\n\n### 必须修复 (Critical)\n- [ ] 文章中出现个人路径 `D:\\Projects\\` (位置: 代码示例部分)\n- [ ] 代码块中缺少闭合的三引号 (位置: 第二个示例)\n\n### 建议改进 (Suggestions)\n- [ ] 可以为 `@functools.wraps` 补充说明\n- [ ] 第三个示例缺少预期输出\n\n### 亮点 (Strengths)\n- 概念解释清晰，从简单到复杂循序渐进\n- 代码示例完整且可运行\n\n### 总评\n文章整体质量不错，需要先修复两处 Critical 问题再发布。\n</code></pre>\n<blockquote>\n<p><strong>重点看&quot;必须修复&quot;部分</strong>，这些是必须全部解决的问题，尤其要注意隐私安全类的 Critical 项。&quot;建议改进&quot;则是可选的优化。</p>\n</blockquote>\n<h3 id=\"第四步根据审查修改草稿\">第四步：根据审查修改草稿</h3>\n<p>拿到审查报告后，把报告反馈给达主编进行修改。将审查报告内容粘贴在命令后面：</p>\n<pre><code>/blog-editor blog/content/posts/python-decorators.md\n（粘贴达审稿的审查报告）\n</code></pre>\n<p>达主编进入<strong>修改模式</strong>，会逐条处理审查意见：</p>\n<ul>\n<li><strong>必须修复 (Critical)</strong> — 全部修复，不遗漏</li>\n<li><strong>建议改进 (Suggestions)</strong> — 选择性采纳，说明理由</li>\n</ul>\n<p>修改完成后输出处理结果：</p>\n<pre><code>## 修改完成\n- 文件: blog/content/posts/python-decorators.md\n- 处理结果:\n  - [已修复] 移除了个人路径，替换为通用路径\n  - [已修复] 补全了缺失的三引号\n  - [已采纳] 补充了 functools.wraps 的说明\n  - [未采纳] 第三个示例添加预期输出 — 理由: 示例本身是装饰器用法演示，预期输出属于基础概念，添加会显得冗余\n</code></pre>\n<p>如果审查报告中有 Critical 项，修改后建议<strong>再跑一次审查</strong>确认所有问题已修复：</p>\n<pre><code>/reviewer blog/content/posts/python-decorators.md\n</code></pre>\n<p>审查和修改可以循环多次，直到达审稿不再报出 Critical 问题。</p>\n<h3 id=\"第五步达发布部署\">第五步：达发布部署</h3>\n<p>文章通过审查后，就可以发布到博客了：</p>\n<pre><code>/publish blog/content/posts/python-decorators.md\n</code></pre>\n<p>达发布会按顺序执行五个步骤：</p>\n<ol>\n<li><strong>验证</strong> — 检查 frontmatter 是否完整、文件位置是否正确、文件名是否符合规范、是否有署名信息</li>\n<li><strong>本地预览</strong> — 启动 <code>hugo server</code>，你可以打开 <code>http://localhost:1313</code> 查看文章效果。<strong>预览无误后告诉达发布继续</strong></li>\n<li><strong>构建验证</strong> — 运行 <code>hugo --minify</code> 确认构建无错误</li>\n<li><strong>提交并推送</strong> — 将文章文件添加到 Git，以 <code>发布文章: &lt;标题&gt;</code> 为 commit message 推送到 <code>origin main</code></li>\n<li><strong>报告</strong> — 告知你文章已推送，GitHub Actions 将自动部署，2-5 分钟后即可在线访问</li>\n</ol>\n<blockquote>\n<p>每次只提交一篇文章，方便追溯和回滚。</p>\n</blockquote>\n<h2 id=\"完整流程示例\">完整流程示例</h2>\n<p>下面是一个端到端的操作示例，从笔记到发布只需要几条命令：</p>\n<pre><code># 1. 生成草稿\n/blog-editor ~/学习笔记/python-decorators.md\n\n# 2. 审查草稿\n/reviewer blog/content/posts/python-decorators.md\n\n# 3. 根据审查修改（粘贴审查报告）\n/blog-editor blog/content/posts/python-decorators.md\n（粘贴审查报告内容）\n\n# 4. 再次审查确认\n/reviewer blog/content/posts/python-decorators.md\n\n# 5. 发布\n/publish blog/content/posts/python-decorators.md\n</code></pre>\n<h2 id=\"常见问题\">常见问题</h2>\n<h3 id=\"审查报告中出现了-critical-怎么办\">审查报告中出现了 Critical 怎么办？</h3>\n<p>Critical 项必须全部修复。最常见的是<strong>隐私泄露</strong>（个人路径、用户名等），达主编的修改模式会帮你处理。修改后重新跑一遍审查确认即可。</p>\n<h3 id=\"部署时构建失败怎么办\">部署时构建失败怎么办？</h3>\n<p>构建失败时达发布会立即停止并报告错误。常见原因：</p>\n<ul>\n<li><strong>Hugo frontmatter 格式错误</strong> — 检查 YAML 语法是否正确</li>\n<li><strong>Hugo 主题未更新</strong> — 如果使用了 git submodule 管理主题，运行 <code>git submodule update --init --recursive</code></li>\n<li><strong>Hugo 版本不匹配</strong> — 确保使用的是 Extended 版本</li>\n</ul>\n<h3 id=\"推送时网络不通怎么办\">推送时网络不通怎么办？</h3>\n<p>如果网络环境需要代理，确保 Git 的代理配置正确。可以在博客仓库目录下检查：</p>\n<pre><code class=\"language-bash\">git config --get http.proxy\n</code></pre>\n<h3 id=\"skill-没有被识别怎么办\">Skill 没有被识别怎么办？</h3>\n<p>检查三个 Skill 文件是否放在正确的路径下：</p>\n<pre><code>&lt;用户目录&gt;/.claude/skills/\n├── blog-editor/SKILL.md\n├── blog-reviewer/SKILL.md\n└── blog-publish/SKILL.md\n</code></pre>\n<p>文件名必须是 <code>SKILL.md</code>（全大写），目录名必须与 Skill 中 <code>name</code> 字段一致。如果修改了 Skill 文件，需要重启 Claude Code 才能生效。</p>\n<h3 id=\"想修改-skill-的行为怎么办\">想修改 Skill 的行为怎么办？</h3>\n<p>三个 Skill 都是纯文本的 Markdown 文件，你可以直接编辑对应的 <code>SKILL.md</code> 来调整行为。比如：</p>\n<ul>\n<li>在达主编中增加特定领域的写作规范</li>\n<li>在达审稿中添加自定义审查维度</li>\n<li>在达发布中修改 commit message 格式或部署流程</li>\n</ul>\n<h2 id=\"总结\">总结</h2>\n<p>整套流程的核心思路是：<strong>你写笔记，Agent 干活</strong>。</p>\n<ul>\n<li><strong>达主编</strong>帮你把零散的笔记整理成结构化的博客文章</li>\n<li><strong>达审稿</strong>从技术、格式、隐私等六个维度把关质量</li>\n<li><strong>达发布</strong>处理构建、预览、部署的工程细节</li>\n</ul>\n<p>你只需要写好笔记，然后发出三到五条命令。试试看吧。</p>\n<h2 id=\"参考资料\">参考资料</h2>\n<ul>\n<li><a href=\"https://docs.anthropic.com/en/docs/claude-code\">Claude Code 文档</a></li>\n<li><a href=\"https://gohugo.io/documentation/\">Hugo 官方文档</a></li>\n<li><a href=\"https://github.com/adityatelange/hugo-PaperMod\">PaperMod 主题</a></li>\n</ul>\n<hr>\n<blockquote>\n<p>本文由 <strong>达主编</strong> 整理润色，<strong>达审稿</strong> 审阅，<strong>达发布</strong> 发布。</p>\n</blockquote>\n",
    "toc": [
      {
        "id": "三个-agent-各司其职",
        "level": 2,
        "title": "三个 Agent 各司其职"
      },
      {
        "id": "第一部分环境搭建",
        "level": 2,
        "title": "第一部分：环境搭建"
      },
      {
        "id": "step-1-安装-hugo",
        "level": 3,
        "title": "Step 1: 安装 Hugo"
      },
      {
        "id": "step-2-创建-hugo-站点",
        "level": 3,
        "title": "Step 2: 创建 Hugo 站点"
      },
      {
        "id": "step-3-配置-hugo",
        "level": 3,
        "title": "Step 3: 配置 Hugo"
      },
      {
        "id": "step-4-配置-github-pages-部署",
        "level": 3,
        "title": "Step 4: 配置 GitHub Pages 部署"
      },
      {
        "id": "step-5-创建-skills-目录",
        "level": 3,
        "title": "Step 5: 创建 Skills 目录"
      },
      {
        "id": "step-6-达主编-skillblog-editor",
        "level": 3,
        "title": "Step 6: 达主编 Skill（blog-editor）"
      },
      {
        "id": "step-7-达审稿-skillblog-reviewer",
        "level": 3,
        "title": "Step 7: 达审稿 Skill（blog-reviewer）"
      },
      {
        "id": "step-8-达发布-skillblog-publish",
        "level": 3,
        "title": "Step 8: 达发布 Skill（blog-publish）"
      },
      {
        "id": "第二部分使用流程",
        "level": 2,
        "title": "第二部分：使用流程"
      },
      {
        "id": "第一步准备学习笔记",
        "level": 3,
        "title": "第一步：准备学习笔记"
      },
      {
        "id": "第二步达主编生成草稿",
        "level": 3,
        "title": "第二步：达主编生成草稿"
      },
      {
        "id": "第三步达审稿审查",
        "level": 3,
        "title": "第三步：达审稿审查"
      },
      {
        "id": "第四步根据审查修改草稿",
        "level": 3,
        "title": "第四步：根据审查修改草稿"
      },
      {
        "id": "第五步达发布部署",
        "level": 3,
        "title": "第五步：达发布部署"
      },
      {
        "id": "完整流程示例",
        "level": 2,
        "title": "完整流程示例"
      },
      {
        "id": "常见问题",
        "level": 2,
        "title": "常见问题"
      },
      {
        "id": "审查报告中出现了-critical-怎么办",
        "level": 3,
        "title": "审查报告中出现了 Critical 怎么办？"
      },
      {
        "id": "部署时构建失败怎么办",
        "level": 3,
        "title": "部署时构建失败怎么办？"
      },
      {
        "id": "推送时网络不通怎么办",
        "level": 3,
        "title": "推送时网络不通怎么办？"
      },
      {
        "id": "skill-没有被识别怎么办",
        "level": 3,
        "title": "Skill 没有被识别怎么办？"
      },
      {
        "id": "想修改-skill-的行为怎么办",
        "level": 3,
        "title": "想修改 Skill 的行为怎么办？"
      },
      {
        "id": "总结",
        "level": 2,
        "title": "总结"
      },
      {
        "id": "参考资料",
        "level": 2,
        "title": "参考资料"
      }
    ]
  },
  {
    "slug": "fastapi-basics",
    "title": "FastAPI 基础入门：虚拟环境与异步编程",
    "date": "2026-05-13",
    "category": "后端开发",
    "categories": [
      "后端开发"
    ],
    "tags": [
      "FastAPI",
      "Python",
      "异步编程"
    ],
    "image": "/images/site/study-hero.webp",
    "excerpt": "从零开始学习 FastAPI，掌握 Python 虚拟环境管理、异步编程（async/await）概念，以及基本的 API 开发。",
    "read": "4 分钟",
    "wordCount": 1921,
    "searchText": "FastAPI 基础入门：虚拟环境与异步编程 从零开始学习 FastAPI，掌握 Python 虚拟环境管理、异步编程（async/await）概念，以及基本的 API 开发。 后端开发 FastAPI Python 异步编程 FastAPI 是一个现代、快速（高性能）的 Python Web 框架，基于标准 Python 类型提示构建。本文记录了从环境搭建到第一个 API 运行的完整学习过程。 虚拟环境 参考：虚拟环境 FastAPI 官方文档 Python 虚拟环境可以为每个工程隔离依赖包，避免不同项目之间的包版本冲突。这是每个 Python 项目的第一步。 创建工程目录 创建虚拟环境 开始一个 Python 工程的时候，第一时间创建一个内部的虚拟环境。使用 Python 自带的 venv 模块， .venv 表示在当前目录创建一个名为 .venv 的虚拟环境目录： 激活虚拟环境 注意 ：以上是 Windows PowerShell 的激活方式。macOS/Linux 用户应使用 source .venv/bin/activate 。 激活新的虚拟环境后，运行的任何 Python 命令或安装的包都只会作用于当前项目。每次打开新的终端会话都需要重新激活。安装新包后也需要重新激活，以确保使用的是虚拟环境中的程序版本。 检查虚拟环境是否已激活 升级 pip 保持 pip 为最新版本可以避免很多安装问题： 如果遇到 No module named pip 错误，可以先运行： 添加 .gitignore 在 .venv 目录中添加 .gitignore 文件，将虚拟环境排除在版本控制之外： echo \" \" ：将文本 打印到标准输出 ：重定向操作符，将输出写入文件而非显示在终端 .gitignore ：目标文件名 在 Git 中表示\"所有内容\"，所以该文件会让 Git 忽略 .venv 目录中的全部文件。 安装软件包 直接安装： 从 requirements.txt 安装： 退出虚拟环境 环境搭建完成后，接下来了解 FastAPI 的核心特性之一——异步编程。 并发与 async/await FastAPI 支持两种方式定义路由处理函数： async def 和普通 def 。 如果函数体内需要使用 await （如调用异步数据库驱动、发送异步 HTTP 请求），就用 async def ；否则用普通 def 即可。 FastAPI 会自动将同步函数放入线程池执行，不会阻塞事件循环。 协程（Coroutine） 协程是一种比线程更轻量级的并发单元 ，也叫做\"用户态线程\"或\"微线程\"。它是 Python 中实现并发的一种具体技术： 并发单元 定位 内存开销 切换开销 进程 资源分配的最小单位 独立内存空间 最大 线程 CPU 调度的最小单位 共享进程内存 适中（需要内核参与） 协程 用户态调度单元 同一线程内共享 极小（只保存/恢复少量寄存器） 一个线程内可以创建成千上万个协程，切换开销几乎可以忽略不计。 异步代码 异步编程的核心思想是： 程序不等待慢速任务完成，而是在等待期间去做其他工作 。当慢速任务完成后，程序会回来继续处理结果。 常见的慢速操作主要是 I/O 操作： 通过网络发送/接收数据 通过磁盘写入/读取数据 API 远程调用 数据库操作（查询、删除等） 由于执行时间主要花在等待 I/O 上，这些操作被称为 I/O 密集型 操作。 并发与并行 这两个概念经常被混淆，但含义不同： 并发（Concurrency） ：系统在同一时间段内交替处理多个任务（如单核 CPU 通过时间片轮转），任务不必真正同时运行，但整体看起来像在\"一起进行\"。解决的是\"如何组织多个任务\"的问题。 并行（Parallelism） ：多个任务在同一时刻真正同时执行，需要多核或多 CPU 的硬件支持。解决的是\"如何利用多核加速计算\"的问题。 并发是并行的基础 。没有多核时，并发通过分时复用实现；有了多核，并发程序才可能真正并行运行。 并发是关于\"如何对付多个任务\"，并行则是关于\"如何利用多个硬件\"。 async 和 await Python 通过 async 和 await 关键字实现异步代码。使用这两个关键字写出来的代码看起来是正常的顺序执行，实际在底层实现了并发调度。 实例 下面的示例包含两个路由： GET / ：根路径，返回一个简单的 JSON 对象 GET /items/{item id} ：带 路径参数 {item id} 的路由，URL 中的值会传入函数的 item id 参数；同时支持可选的 查询参数 q （如 /items/5?q=search ） 同步版本 异步版本 两个版本的唯一区别在于：异步版本使用了 async def ，这使得 FastAPI 能够在处理请求时更好地利用异步特性。 运行 启动后终端会显示服务地址和自动重载（auto reload）提示——当你修改代码并保存后，FastAPI 会自动重新加载，无需手动重启。 访问 http://127.0.0.1:8000 查看 API 响应 访问 http://127.0.0.1:8000/docs 查看自动生成的交互式 API 文档（Swagger UI） 按 Ctrl + C 停止服务 参考资料 FastAPI 中文文档 虚拟环境 FastAPI 本文由 达主编 整理润色， 达审稿 审阅， 达发布 发布。",
    "html": "<p><a href=\"https://fastapi.tiangolo.com/zh/\">FastAPI</a> 是一个现代、快速（高性能）的 Python Web 框架，基于标准 Python 类型提示构建。本文记录了从环境搭建到第一个 API 运行的完整学习过程。</p>\n<h2 id=\"虚拟环境\">虚拟环境</h2>\n<p>参考：<a href=\"https://fastapi.tiangolo.com/zh/virtual-environments/\">虚拟环境 - FastAPI 官方文档</a></p>\n<p>Python 虚拟环境可以为每个工程隔离依赖包，避免不同项目之间的包版本冲突。这是每个 Python 项目的第一步。</p>\n<h3 id=\"创建工程目录\">创建工程目录</h3>\n<pre><code class=\"language-bash\"># 进入主目录\ncd\n# 创建一个用于存放所有代码工程的目录\nmkdir code\n# 进入 code 目录\ncd code\n# 创建一个用于存放这个工程的目录\nmkdir awesome-project\n# 进入这个工程的目录\ncd awesome-project\n</code></pre>\n<h3 id=\"创建虚拟环境\">创建虚拟环境</h3>\n<p>开始一个 Python 工程的时候，第一时间创建一个内部的虚拟环境。使用 Python 自带的 <code>venv</code> 模块，<code>.venv</code> 表示在当前目录创建一个名为 <code>.venv</code> 的虚拟环境目录：</p>\n<pre><code class=\"language-bash\">python -m venv .venv\n</code></pre>\n<h3 id=\"激活虚拟环境\">激活虚拟环境</h3>\n<pre><code class=\"language-bash\">.venv\\Scripts\\Activate.ps1\n</code></pre>\n<blockquote>\n<p><strong>注意</strong>：以上是 Windows PowerShell 的激活方式。macOS/Linux 用户应使用 <code>source .venv/bin/activate</code>。</p>\n</blockquote>\n<p>激活新的虚拟环境后，运行的任何 Python 命令或安装的包都只会作用于当前项目。每次打开新的终端会话都需要重新激活。安装新包后也需要重新激活，以确保使用的是虚拟环境中的程序版本。</p>\n<h3 id=\"检查虚拟环境是否已激活\">检查虚拟环境是否已激活</h3>\n<pre><code class=\"language-bash\">Get-Command python\n</code></pre>\n<h3 id=\"升级-pip\">升级 pip</h3>\n<p>保持 pip 为最新版本可以避免很多安装问题：</p>\n<pre><code class=\"language-bash\">python -m pip install --upgrade pip\n</code></pre>\n<p>如果遇到 <code>No module named pip</code> 错误，可以先运行：</p>\n<pre><code class=\"language-bash\">python -m ensurepip --upgrade\n</code></pre>\n<h3 id=\"添加-gitignore\">添加 .gitignore</h3>\n<p>在 <code>.venv</code> 目录中添加 <code>.gitignore</code> 文件，将虚拟环境排除在版本控制之外：</p>\n<pre><code class=\"language-bash\">echo &quot;*&quot; &gt; .venv/.gitignore\n</code></pre>\n<ul>\n<li><code>echo &quot;*&quot;</code>：将文本 <code>*</code> 打印到标准输出</li>\n<li><code>&gt;</code>：重定向操作符，将输出写入文件而非显示在终端</li>\n<li><code>.gitignore</code>：目标文件名</li>\n</ul>\n<p><code>*</code> 在 Git 中表示&quot;所有内容&quot;，所以该文件会让 Git 忽略 <code>.venv</code> 目录中的全部文件。</p>\n<h3 id=\"安装软件包\">安装软件包</h3>\n<p><strong>直接安装：</strong></p>\n<pre><code class=\"language-bash\">pip install &quot;fastapi[standard]&quot;\n</code></pre>\n<p><strong>从 <code>requirements.txt</code> 安装：</strong></p>\n<pre><code class=\"language-bash\">pip install -r requirements.txt\n</code></pre>\n<h3 id=\"退出虚拟环境\">退出虚拟环境</h3>\n<pre><code class=\"language-bash\">deactivate\n</code></pre>\n<p>环境搭建完成后，接下来了解 FastAPI 的核心特性之一——异步编程。</p>\n<h2 id=\"并发与-async-await\">并发与 async/await</h2>\n<p>FastAPI 支持两种方式定义路由处理函数：<code>async def</code> 和普通 <code>def</code>。<strong>如果函数体内需要使用 <code>await</code>（如调用异步数据库驱动、发送异步 HTTP 请求），就用 <code>async def</code>；否则用普通 <code>def</code> 即可。</strong> FastAPI 会自动将同步函数放入线程池执行，不会阻塞事件循环。</p>\n<h3 id=\"协程coroutine\">协程（Coroutine）</h3>\n<p><strong>协程是一种比线程更轻量级的并发单元</strong>，也叫做&quot;用户态线程&quot;或&quot;微线程&quot;。它是 Python 中实现并发的一种具体技术：</p>\n<table>\n<thead>\n<tr>\n<th>并发单元</th>\n<th>定位</th>\n<th>内存开销</th>\n<th>切换开销</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><strong>进程</strong></td>\n<td>资源分配的最小单位</td>\n<td>独立内存空间</td>\n<td>最大</td>\n</tr>\n<tr>\n<td><strong>线程</strong></td>\n<td>CPU 调度的最小单位</td>\n<td>共享进程内存</td>\n<td>适中（需要内核参与）</td>\n</tr>\n<tr>\n<td><strong>协程</strong></td>\n<td>用户态调度单元</td>\n<td>同一线程内共享</td>\n<td>极小（只保存/恢复少量寄存器）</td>\n</tr>\n</tbody></table>\n<p>一个线程内可以创建成千上万个协程，切换开销几乎可以忽略不计。</p>\n<h3 id=\"异步代码\">异步代码</h3>\n<p>异步编程的核心思想是：<strong>程序不等待慢速任务完成，而是在等待期间去做其他工作</strong>。当慢速任务完成后，程序会回来继续处理结果。</p>\n<p>常见的慢速操作主要是 I/O 操作：</p>\n<ul>\n<li>通过网络发送/接收数据</li>\n<li>通过磁盘写入/读取数据</li>\n<li>API 远程调用</li>\n<li>数据库操作（查询、删除等）</li>\n</ul>\n<p>由于执行时间主要花在等待 I/O 上，这些操作被称为 <strong>I/O 密集型</strong> 操作。</p>\n<h3 id=\"并发与并行\">并发与并行</h3>\n<p>这两个概念经常被混淆，但含义不同：</p>\n<ul>\n<li><strong>并发（Concurrency）</strong>：系统在同一时间段内交替处理多个任务（如单核 CPU 通过时间片轮转），任务不必真正同时运行，但整体看起来像在&quot;一起进行&quot;。解决的是&quot;如何组织多个任务&quot;的问题。</li>\n<li><strong>并行（Parallelism）</strong>：多个任务在同一时刻真正同时执行，需要多核或多 CPU 的硬件支持。解决的是&quot;如何利用多核加速计算&quot;的问题。</li>\n</ul>\n<blockquote>\n<p><strong>并发是并行的基础</strong>。没有多核时，并发通过分时复用实现；有了多核，并发程序才可能真正并行运行。<strong>并发是关于&quot;如何对付多个任务&quot;，并行则是关于&quot;如何利用多个硬件&quot;。</strong></p>\n</blockquote>\n<h3 id=\"async-和-await\">async 和 await</h3>\n<p>Python 通过 <code>async</code> 和 <code>await</code> 关键字实现异步代码。使用这两个关键字写出来的代码看起来是正常的顺序执行，实际在底层实现了并发调度。</p>\n<h2 id=\"实例\">实例</h2>\n<p>下面的示例包含两个路由：</p>\n<ul>\n<li><code>GET /</code>：根路径，返回一个简单的 JSON 对象</li>\n<li><code>GET /items/{item_id}</code>：带<strong>路径参数</strong> <code>{item_id}</code> 的路由，URL 中的值会传入函数的 <code>item_id</code> 参数；同时支持可选的<strong>查询参数</strong> <code>q</code>（如 <code>/items/5?q=search</code>）</li>\n</ul>\n<h3 id=\"同步版本\">同步版本</h3>\n<pre><code class=\"language-python\">from fastapi import FastAPI\n\napp = FastAPI()\n\n\n@app.get(&quot;/&quot;)\ndef read_root():\n    return {&quot;Hello&quot;: &quot;World&quot;}\n\n\n@app.get(&quot;/items/{item_id}&quot;)\ndef read_item(item_id: int, q: str | None = None):\n    return {&quot;item_id&quot;: item_id, &quot;q&quot;: q}\n</code></pre>\n<h3 id=\"异步版本\">异步版本</h3>\n<pre><code class=\"language-python\">from fastapi import FastAPI\n\napp = FastAPI()\n\n\n@app.get(&quot;/&quot;)\nasync def read_root():\n    return {&quot;Hello&quot;: &quot;World&quot;}\n\n\n@app.get(&quot;/items/{item_id}&quot;)\nasync def read_item(item_id: int, q: str | None = None):\n    return {&quot;item_id&quot;: item_id, &quot;q&quot;: q}\n</code></pre>\n<p>两个版本的唯一区别在于：异步版本使用了 <code>async def</code>，这使得 FastAPI 能够在处理请求时更好地利用异步特性。</p>\n<h3 id=\"运行\">运行</h3>\n<pre><code class=\"language-bash\">fastapi dev main.py\n</code></pre>\n<p>启动后终端会显示服务地址和自动重载（auto-reload）提示——当你修改代码并保存后，FastAPI 会自动重新加载，无需手动重启。</p>\n<ul>\n<li>访问 <a href=\"http://127.0.0.1:8000\">http://127.0.0.1:8000</a> 查看 API 响应</li>\n<li>访问 <a href=\"http://127.0.0.1:8000/docs\">http://127.0.0.1:8000/docs</a> 查看自动生成的交互式 API 文档（Swagger UI）</li>\n<li>按 <code>Ctrl + C</code> 停止服务</li>\n</ul>\n<h2 id=\"参考资料\">参考资料</h2>\n<ul>\n<li><a href=\"https://fastapi.tiangolo.com/zh/\">FastAPI 中文文档</a></li>\n<li><a href=\"https://fastapi.tiangolo.com/zh/virtual-environments/\">虚拟环境 - FastAPI</a></li>\n</ul>\n<hr>\n<blockquote>\n<p>本文由 <strong>达主编</strong> 整理润色，<strong>达审稿</strong> 审阅，<strong>达发布</strong> 发布。</p>\n</blockquote>\n",
    "toc": [
      {
        "id": "虚拟环境",
        "level": 2,
        "title": "虚拟环境"
      },
      {
        "id": "创建工程目录",
        "level": 3,
        "title": "创建工程目录"
      },
      {
        "id": "创建虚拟环境",
        "level": 3,
        "title": "创建虚拟环境"
      },
      {
        "id": "激活虚拟环境",
        "level": 3,
        "title": "激活虚拟环境"
      },
      {
        "id": "检查虚拟环境是否已激活",
        "level": 3,
        "title": "检查虚拟环境是否已激活"
      },
      {
        "id": "升级-pip",
        "level": 3,
        "title": "升级 pip"
      },
      {
        "id": "添加-gitignore",
        "level": 3,
        "title": "添加 .gitignore"
      },
      {
        "id": "安装软件包",
        "level": 3,
        "title": "安装软件包"
      },
      {
        "id": "退出虚拟环境",
        "level": 3,
        "title": "退出虚拟环境"
      },
      {
        "id": "并发与-async-await",
        "level": 2,
        "title": "并发与 async/await"
      },
      {
        "id": "协程coroutine",
        "level": 3,
        "title": "协程（Coroutine）"
      },
      {
        "id": "异步代码",
        "level": 3,
        "title": "异步代码"
      },
      {
        "id": "并发与并行",
        "level": 3,
        "title": "并发与并行"
      },
      {
        "id": "async-和-await",
        "level": 3,
        "title": "async 和 await"
      },
      {
        "id": "实例",
        "level": 2,
        "title": "实例"
      },
      {
        "id": "同步版本",
        "level": 3,
        "title": "同步版本"
      },
      {
        "id": "异步版本",
        "level": 3,
        "title": "异步版本"
      },
      {
        "id": "运行",
        "level": 3,
        "title": "运行"
      },
      {
        "id": "参考资料",
        "level": 2,
        "title": "参考资料"
      }
    ]
  },
  {
    "slug": "hello",
    "title": "欢迎来到我的学习笔记",
    "date": "2026-05-13",
    "category": "随笔",
    "categories": [
      "随笔"
    ],
    "tags": [
      "随笔"
    ],
    "image": "/images/site/study-hero.webp",
    "excerpt": "这是我的第一篇学习博客，后续将通过 Agent 协作工作流发布更多学习笔记。",
    "read": "1 分钟",
    "wordCount": 36,
    "searchText": "欢迎来到我的学习笔记 这是我的第一篇学习博客，后续将通过 Agent 协作工作流发布更多学习笔记。  随笔 这是我的第一篇学习博客，后续将通过 Agent 协作工作流发布更多学习笔记。",
    "html": "<p>这是我的第一篇学习博客，后续将通过 Agent 协作工作流发布更多学习笔记。</p>\n",
    "toc": []
  }
];
export const aboutPage = {
  "html": "<p>这里是我的个人知识库，用来沉淀技术学习、工具实践与持续思考。</p>\n<p>我相信，写下来的知识会在未来的某一刻重新照亮当下。这个网站也会随着学习不断生长。</p>\n<h2 id=\"内容方向\">内容方向</h2>\n<ul>\n<li>AI 工具与工作流</li>\n<li>后端开发与工程实践</li>\n<li>开发工具和学习记录</li>\n</ul>\n<p>欢迎从<a href=\"/#recent-posts\">最新文章</a>、<a href=\"/archives/\">归档</a>或<a href=\"/search/\">搜索</a>开始阅读。</p>\n",
  "toc": [
    {
      "id": "内容方向",
      "level": 2,
      "title": "内容方向"
    }
  ]
};
