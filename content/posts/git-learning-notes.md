---
title: "Git 学习笔记"
date: 2026-07-15T09:00:00+08:00
slug: "git-learning-notes"
draft: false
tags: ["Git", "版本控制", "开发工作流"]
categories: ["开发工具"]
description: "从 Git 的快照模型、三大工作区域，到分支、合并、远程协作、rebase、急救工具和团队工作流的系统学习笔记。"
---

[ 【从零开始深入 git】01 - git 设计理念 - 保姆级 git 系列教程，带你手把手掌握版本控制_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1MjRmBJEnK?spm_id_from=333.788.videopod.sections&vd_source=8adfcf78eabf734b81a1d808df35a04d)

# Git 学习笔记

## 目录

- [速查表：日常开发常用指令](#速查表日常开发常用指令)
- [第一部分：理解 Git — 建立心智模型](#第一部分理解-git--建立心智模型)
- [第二部分：单人本地最小闭环](#第二部分单人本地最小闭环)
- [第三部分：分支 — 让开发可以并行](#第三部分分支--让开发可以并行)
- [第四部分：合并 — 让并行开发交汇](#第四部分合并--让并行开发交汇)
- [第五部分：远程 — 从单人到协作](#第五部分远程--从单人到协作)
- [第六部分：rebase — 保持提交历史整洁](#第六部分rebase--保持提交历史整洁)
- [第七部分：急救工具箱 — 日常高频的"后悔药"](#第七部分急救工具箱--日常高频的后悔药)
- [第八部分：团队工作流 — 把前面的知识组合起来](#第八部分团队工作流--把前面的知识组合起来)
- [第九部分：托管平台与认证](#第九部分托管平台与认证)
- [第十部分：IDE 集成](#第十部分ide-集成)

---

# 速查表：日常开发常用指令

## 0. 配置（只需一次）

```bash
git config --global user.name "你的名字"          # 设置用户名
git config --global user.email "你的邮箱"         # 设置邮箱
git config --global merge.ff false               # 全局关闭 fast-forward（推荐）
git config --list                                # 查看所有配置
```

→ 详见 [第二部分：安装与配置](#安装与配置)

## 1. 克隆仓库 / 初始化项目

```bash
git clone <URL>                    # 克隆远程仓库
git clone <URL> 别名                # 克隆并给远程起别名
git init                           # 在当前目录初始化 Git 仓库
git remote add origin <URL>        # 本地仓库关联远程仓库（init 后需要这一步）
git remote -v                      # 查看已关联的远程仓库地址
```

→ 详见 [第五部分：clone](#clonet第一次获取远程仓库) · [第二部分：创建仓库](#创建仓库)

## 2. 日常提交流程（最高频）

```bash
git status                         # 查看工作区状态（改了什么、什么待提交）
git add .                          # 把所有修改加入暂存区
git add <file>                     # 只加入指定文件
git commit -m "feat: 描述"         # 提交
git log --oneline --graph          # 查看提交历史（简洁图形式）
git diff                           # 查看工作区与暂存区的差异
git diff --staged                  # 查看暂存区与最近一次 commit 的差异
```

→ 详见 [第二部分：创建仓库](#创建仓库)

## 3. 分支操作

```bash
git branch                         # 查看本地分支
git branch -a                      # 查看所有分支（含远程）
git branch -r                      # 只看远程分支
git branch -vv                     # 查看分支详情（含远程关联关系、最新 commit）
git branch -m <新名>               # 重命名当前分支
git branch -d <branch>             # 删除分支（安全删除）
git branch -D <branch>             # 强制删除分支（未合并也删）
git branch --unset-upstream        # 取消当前分支的上游关联
git checkout -b <branch>                    # 创建分支并切换
git checkout -b <newbranch> <oldbranch>     # 基于旧分支创建新分支并切换
git checkout <branch>                       # 切换分支
git switch <branch>                         # 切换分支（新语法）
```

→ 详见 [第三部分：分支操作](#分支操作)

## 4. 合并

```bash
git merge <branch>                 # 把指定分支合并到当前分支
git merge --no-ff <branch>          # 合并但保留分支结构（推荐）
git mergetool                      # 启动冲突解决工具
git cherry-pick <commit>           # 从其他分支摘取指定 commit 到当前分支
```

→ 详见 [第四部分：合并](#第四部分合并--让并行开发交汇)

## 5. 远程同步

```bash
git fetch                          # 拉取远程更新（安全，不碰工作区）
git fetch origin <branch>          # 只拉取远程的某个分支
git pull                           # = fetch + merge（默认）
git pull --rebase                  # = fetch + rebase（保持线性历史）

git push                           # 推送本地提交到远程
git push origin <branch>           # 推送分支到远程，远程自动创建同名分支
git push -u origin <branch>        # 首次推送并关联远程分支（之后直接 git push）
git push --force-with-lease        # 安全的强制推送（配合 amend 使用）

git branch -u origin/<branch>      # 已有本地分支关联到远程分支（--set-upstream-to 的简写）

git checkout -b <branch> origin/<branch>            # 拉取远程分支并在本地创建同名分支关联
git checkout -b <branch> --no-track origin/<branch> # 拉取远程分支并在本地创建分支，不设置追踪关系
git switch -c <branch> --no-track origin/<branch>   # 拉取远程分支并在本地创建分支，不设置追踪关系

git remote -v                      # 查看远程仓库地址
```

→ 详见 [第五部分：远程](#第五部分远程--从单人到协作)

## 6. rebase

```bash
git rebase <branch>                # 把当前分支变基到目标分支上
git rebase --abort                 # 取消正在进行的 rebase
git rebase --continue              # 解决冲突后继续 rebase
```

→ 详见 [第六部分：rebase](#第六部分rebase--保持提交历史整洁)

## 7. 急救 / 后悔药

```bash
git commit --amend                 # 修补上一次提交（改 message 或补文件）
git stash                          # 临时保存工作区修改
git stash pop                      # 恢复 stash
git stash list                     # 查看所有 stash
git revert <commit>                # 生成反向 commit 撤销指定提交（安全）
git reset --soft HEAD~1            # 回退，更改留在暂存区
git reset --mixed HEAD~1           # 回退，更改留在工作区（默认）
git reset --hard HEAD~1            # 回退，更改彻底删除（慎用！）
git checkout <commit>               # 切到历史 commit（进入 detached HEAD）
git checkout -b <branch>            # 在 detached 状态创建分支继续开发
git restore --source=<commit>~1 -- <file>  # 只撤销某提交中某个文件的改动（不影响其他文件）
git reflog                         # 查看所有 HEAD 移动记录（找回误删的 commit）
```

→ 详见 [第七部分：急救工具箱](#第七部分急救工具箱--日常高频的后悔药)

## 8. 查看信息

```bash
git status                         # 工作区状态
git log --oneline --graph          # 提交历史（图形）
git log -p <file>                  # 查看某文件的修改历史
git show <commit>                 # 查看某个 commit 的具体改动
git diff                           # 工作区 vs 暂存区
git diff --staged                  # 暂存区 vs 最新 commit
git diff <branch1> <branch2>       # 两个分支的差异
git branch -a                      # 所有分支
git branch -vv                     # 分支与远程的关联关系及最新 commit
git remote -v                      # 远程仓库地址
git stash list                     # stash 列表
git reflog                         # HEAD 移动记录（找回误删的 commit）
git blame <file>                  # 查看每行代码最后由谁修改
```

---

# 第一部分：理解 Git — 建立心智模型

## Git 的设计理念

Git 引入了**快照（snapshot）**的概念：每次提交时，Git 会对整个项目拍一张"快照"，保存那一刻所有文件的状态。这意味着你可以随时回档到任何一个历史版本。

基于快照机制，Git 实现了三个核心能力：

- **可以回档**：任何一次提交都是项目在某个时刻的完整状态，随时可以回到过去。
- **并行开发**：多分支机制让多个人、多个功能可以同时推进，互不干扰。
- **多人协作**：分布式仓库让团队可以方便地管理共享的 repo，各自在本地开发，再同步合并。

## 三大工作区域

理解 Git 的关键在于搞清楚三个工作区域，几乎所有 Git 命令都在这三者之间搬运数据：

| 工作区域 | 英文 | 含义 |
|---------|------|------|
| 工作区 | Working Directory | 你在文件系统里能看到、能编辑的项目文件 |
| 暂存区 | Staging Area (Index) | 通过 `git add` 放进来的"待提交"快照，是工作区和仓库之间的缓冲层 |
| 仓库 | Repository (.git) | 通过 `git commit` 最终确认的提交历史，永久记录在 .git 目录中 |

数据流向：工作区 →（`git add`）→ 暂存区 →（`git commit`）→ 仓库

暂存区的存在是 Git 区别于其他版本控制工具的核心设计之一：它让你可以精确控制"哪些改动进入下一次提交"，而不是把工作区的所有修改一股脑提交上去。

## 文件状态流转

一个文件在 Git 眼中始终处于以下状态之一：

![文件状态流转](/images/review/git-learning-notes/image-20260519231654227.png)

- **untracked**：新文件，Git 还没有追踪它
- **staged**：通过 `git add` 进入暂存区，等待被提交
- **committed**：通过 `git commit` 写入仓库历史
- **modified**：已追踪的文件被修改了，但还没 add 到暂存区

理解这个状态机后，后面所有的 `add`、`commit`、`reset`、`stash` 命令本质上就是在这些状态之间切换文件。

---

# 第二部分：单人本地最小闭环

这一部分的目标：走完 `init → edit → add → commit → log` 的完整循环，让你能独立用 Git 管理一个本地项目。

## 安装与配置

安装 Git 后，第一步是设置你的身份信息，因为每次提交都会记录作者。

```
# 列出所有配置
git config --list

# 配置用户名和邮箱
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

### 三级配置体系

Git 的配置分三个层级，优先级从低到高：

| 层级 | 作用范围 | 优先级 | 文件位置 |
|------|---------|--------|---------|
| system（系统级） | 整台机器所有用户 | 低 | `C:\Program Files\Git\etc\gitconfig` |
| global（用户级） | 当前用户 | 中 | `C:\Users\<用户名>\.gitconfig` |
| local（项目级） | 当前仓库 | 高 | `<项目目录>\.git\config` |

覆盖规则：**local > global > system**。这意味着项目级配置可以覆盖用户级配置，用户级可以覆盖系统级。日常使用中，全局设置一次 `user.name` 和 `user.email` 即可，特殊项目可在仓库级别单独配置。

## 创建仓库

1. 准备一个工作目录
2. 在项目根目录下执行 `git init`，生成的 `.git` 目录就是 Git 仓库
3. 首次提交：

```
git add README.md
git commit -m 'first commit'
```

4. 查看提交记录：

```
git log
git log --pretty=oneline --graph
```

5. 查看当前 Git 状态（工作区、暂存区的文件状态）：

```
git status
```

到这一步，你已经完成了"创建仓库 → 编辑文件 → 提交 → 查看历史"的最小闭环。

## .gitignore：提前排除不需要追踪的文件

有些文件不应该进入版本控制，比如编译产物、依赖目录、密钥文件。`.gitignore` 文件用来告诉 Git 忽略这些文件。

匹配规则：

- **文件名匹配** → 所有同名文件都命中。例：`.env`
- **目录匹配** → 同名目录及其中所有内容命中。例：`build/`、`target/`
- **通配符匹配**：
  - `*` 匹配一个或多个字符。例：`*.log`
  - `?` 匹配单个字符。例：`file?.txt`
  - `**` 匹配任意层级目录。例：`**/node_modules/`

![.gitignore 规则示例](/images/review/git-learning-notes/image-20260607131625607.png)

注意：.gitignore 只能阻止"未追踪"的文件被加入暂存区。如果文件已经被 Git 追踪了（已经 commit 过），.gitignore 无法取消追踪——需要先从仓库中移除该文件，.gitignore 才会生效。远程仓库中的文件也无法通过 .gitignore 取消追踪。

---

# 第三部分：分支 — 让开发可以并行

## 为什么需要分支

如果没有分支，所有人都在一条线上提交，开发新功能时改到一半，想修一个线上 bug 就无从下手。分支让你可以"分叉"出去，在不影响主线的情况下独立推进，做完再合回来。

> Git encourages workflows that branch and merge often, even multiple times in a day.

## 分支的本质

创建分支，本质上是创建一个指针，指向对应的 commit。分支不是复制一份代码，而是一个非常轻量的指针。切换分支只是把 HEAD 指针移到另一个 commit 上，工作区的文件会随之更新。

## 分支操作

```
# 创建分支
git branch 1.0-dev

# 切换分支
git checkout 1.0-dev

# 创建分支并切换（最常用）
git checkout -b 1.0-dev
```

![分支创建与切换](/images/review/git-learning-notes/image-20260520165749820.png)

---

# 第四部分：合并 — 让并行开发交汇

## 合并的基本流程

当分支上的开发完成后，需要把它合并回主线。操作方式是先切到目标分支（通常是 master/main），再把来源分支 merge 进来：

```
# 先切换到目标分支
git checkout master

# 把 1.0-dev 分支的更改合并进来
git merge 1.0-dev
```

### 合并冲突

当两个分支修改了同一文件的同一区域时，Git 无法自动判断保留哪个版本，就会产生合并冲突。你需要手动编辑冲突文件，选择保留哪些内容，然后 add + commit 完成合并。

![合并冲突示例](/images/review/git-learning-notes/image-20260520205050765.png)

合并时遵循"所有权思想"：谁负责哪部分代码，就由谁来解决相关冲突。

![合并所有权](/images/review/git-learning-notes/image-20260520202908268.png)

## fast-forward vs --no-ff

当目标分支在分叉后没有新的提交时，Git 默认执行 fast-forward 合并：直接把目标分支指针快进到来源分支的位置，不生成合并 commit。

![fast-forward 合并](/images/review/git-learning-notes/image-20260704154805399.png)

**不推荐使用 fast-forward merge**，原因如下：

- 分支结构在合并后被抹除了，看不出"这批代码是从哪个分支合进来的"
- 回滚变麻烦：master 和开发分支的提交混在一起，想要回到合并前的状态很难
- 不符合 PR（Pull Request）和 CR（Code Review）流程，缺少明确的合并节点

推荐使用 `--no-ff`，保留分支历史：

```
# 每次合并都保留分支结构
git merge --no-ff 1.0-dev

# 全局关闭 fast-forward（推荐）
git config --global merge.ff false
```

---

# 第五部分：远程 — 从单人到协作

## 本地仓库与远程仓库的关系模型

理解远程协作的关键在于 remote-tracking branch（远程追踪分支）这个概念。

![本地与远程仓库关系](/images/review/git-learning-notes/image-20260617105016445.png)

`origin/*` 这样的分支表示的是"追踪远程仓库的本地镜像"。它的作用是：当远程和本地发生冲突时，fetch 下来的远程提交不会直接覆盖你的本地提交，而是先放到 `origin/*` 上，让你有机会查看和处理。

![remote-tracking branch](/images/review/git-learning-notes/image-20260617110257745.png)

### clone：第一次获取远程仓库

```
# 克隆仓库（默认远程名为 origin，本地分支名为 master）
git clone <URL>

# 克隆时给远程仓库起别名
git clone <URL> otherName
```

`-b` 参数表示会在本地创建一个对应的 master 分支，与远程的 `origin/master` 区分开来。

协作者克隆仓库后，开始在本地分支上开发，然后推送、拉取：

![协作者视角](/images/review/git-learning-notes/image-20260617110943037.png)

## fetch：安全拉取远程更新

fetch 从远程下载提交到本地，更新所有 remote-tracking branch（`origin/*`）到最新 commit。

**fetch 是安全的**：它不会触碰你的本地工作区和本地提交，只是把远程的提交同步到本地的 `origin/*` 镜像上。

```
git fetch

git fetch origin      # 有多个远程仓库时，指定一个

git fetch --all        # 拉取所有远程仓库
```

![fetch 操作示意](/images/review/git-learning-notes/image-20260704143043963.png)

## push：推送本地提交

push 连接远程仓库，计算本地比远程多的 commit 并上传，尝试更新远程分支。

![push 流程](/images/review/git-learning-notes/image-20260704144628750.png)

### push 被拒绝的情况

如果远程分支有本地没有的提交（远程分支不是本地的祖先），push 会被拒绝。这通常发生在别人已经推送了新提交，你需要先 fetch + 合并/变基后再 push。

![push 冲突](/images/review/git-learning-notes/image-20260704144829365.png)

```
# 强制推送：把远程分支强行移到本地分支的位置（危险，会覆盖远程历史）
git push --force

# 更安全的强制推送：只在远程没有新提交时才覆盖（推荐，配合 --amend 使用）
git push --force-with-lease
```

`--force-with-lease` 比 `--force` 安全的原因：如果远程分支在你上次 fetch 之后有别人推了新提交，它会拒绝推送，避免覆盖别人的工作。典型场景是用 `--amend` 修改了已推送的 commit（hash 变了），需要强制推送时用这个。

## pull：fetch + merge/rebase

> pull = fetch + merge/rebase

pull 是 fetch 和 merge（或 rebase）的组合快捷操作。merge 是把 remote-tracking 分支合并进本地分支。注意 remote-tracking 分支是只读的，不能直接在上面修改，所以 merge 的结果是本地分支移动到合并后的位置。

```
git pull              # 默认用 merge
git pull --rebase     # 用 rebase 代替 merge
```

![pull 默认 merge](/images/review/git-learning-notes/image-20260704152244715.png)

### pull --rebase 为什么能避免提交图成"环"

多人协作时，如果大家都用 merge，提交历史会不断产生交叉合并的"环"结构，历史变得复杂。使用 `pull --rebase`，Git 会先把你的本地提交临时拿掉，把远程的提交放进来，再把你的提交重新应用在上面，历史保持线性。

![pull --rebase 避免环](/images/review/git-learning-notes/image-20260704153624311.png)

合并完成后，远程分支也会移动到最新位置：

![pull 之后远程分支移动](/images/review/git-learning-notes/image-20260704152454803.png)

### 远程协作小结

![远程操作总结](/images/review/git-learning-notes/image-20260704164005930.png)

---

# 第六部分：rebase — 保持提交历史整洁

这一部分放在远程之后，因为你已经在第五部分见过"提交图成环"的问题，才能理解 rebase 解决的是什么。

## rebase 的原理

rebase（变基）的过程：找到两个分支的公共祖先，然后把当前分支上的提交"摘下来"，重新应用到目标分支的最新位置上。这会改变这些提交所依赖的父节点，相当于把你的提交"移植"到目标分支的顶端。

![rebase 原理](/images/review/git-learning-notes/image-20260530163605155.png)

## 典型场景：feature 分支跟进主分支

你在 feature 分支上开发期间，主分支有了新提交。你想把主分支的最新代码同步过来，有两种选择：

**方式一：merge 主分支到 feature 分支**——会产生一个合并 commit，历史中多一个交叉点。

**方式二：rebase 主分支到 feature 分支**——你的提交会被"搬到"主分支最新提交的后面，历史保持线性，更干净。

![rebase 跟进主分支](/images/review/git-learning-notes/image-20260530163449560.png)

具体操作：先在 feature 分支上 checkout 主分支（rebase 的目标），在中间处理可能出现的冲突，解决后提交，最后合并回主分支。

![rebase 详细过程](/images/review/git-learning-notes/image-20260530164629128.png)

![rebase 提交重放](/images/review/git-learning-notes/image-20260530165304601.png)

![rebase 完成后的历史](/images/review/git-learning-notes/image-20260530170632429.png)

## rebase vs merge 对比

| 维度 | merge | rebase |
|------|-------|--------|
| 历史 | 保留分叉和合并的完整记录 | 线性历史，看不出曾经的分叉 |
| 合并 commit | 会生成一个合并节点 | 不生成额外 commit |
| 冲突处理 | 一次性解决所有冲突 | 逐个 commit 重放，可能多次解决冲突 |
| 安全性 | 不改写历史，安全 | 会改变 commit hash，已推送的分支慎用 |

经验法则：**rebase 只在本地未推送的分支上用**，避免对已推送的提交做变基（因为 hash 会变，别人的本地会和远程对不上）。

---

# 第七部分：急救工具箱 — 日常高频的"后悔药"

这一部分是"出了问题怎么办"的参考手册，每个命令解决一类常见的"需要反悔"的场景。

## commit --amend：修补上一次提交

场景：刚提交完，发现 commit message 写错了，或者漏 add 了一个文件。

```
git commit --amend
```

这会覆盖上一次提交（包含 commit message），不生成新的 commit。如果只是修改 message：

```
git commit --amend -m "新的 commit message"
```

注意：如果上一次提交已经 push 到远程，amend 后需要 `git push --force-with-lease`。

## stash：临时保存工作区

场景：你正在 feature 分支写代码写到一半，突然需要切到 master 修一个紧急 bug，但当前代码还不想提交。

```
git stash          # 把当前工作区的修改存入暂存区（stash 栈）
git stash list     # 查看所有 stash
git stash pop      # 取出最近的 stash，恢复工作区
git stash drop     # 丢弃最近的 stash
```

![stash 暂存示意](/images/review/git-learning-notes/image-20260607125406925.png)

![stash 在 Git Graph 中的显示](/images/review/git-learning-notes/image-20260607125535624.png)

## revert：安全撤销（生成反向 commit）

场景：某个提交引入了 bug，你想撤销它，但不想改写历史（因为已经推送到远程）。

```
git revert HEAD    # 创建一个新 commit，反转 HEAD 的更改
```

revert 不删除任何历史，而是新增一个"反向操作"的提交。它是远程分支上撤销更改的安全方式。

## reset：回退（soft / mixed / hard）

场景：你想回退到之前的某个 commit，但三种模式对"回退后代码去哪了"的处理不同。

```
git reset --soft HEAD~1   # HEAD 回退，更改留在暂存区（stage）
git reset --mixed HEAD~1  # HEAD 回退，更改留在工作区（modified）
git reset --hard HEAD~1   # HEAD 回退，更改彻底删除（危险！）
```

![reset 三种模式对比](/images/review/git-learning-notes/image-20260607135909909.png)

记忆要点：`--soft` 最温柔（代码还 staged），`--mixed` 是默认（代码还 modified），`--hard` 最激进（代码没了）。`--hard` 慎用，尤其是已推送的 commit 不要 reset。

| 模式 | HEAD 位置 | 更改去哪了 |
|------|----------|-----------|
| --soft | 回退一个 commit | 留在暂存区 |
| --mixed（默认） | 回退一个 commit | 留在工作区 |
| --hard | 回退一个 commit | 彻底删除 |

## detached HEAD：游离 HEAD 状态

场景：你想查看项目在某个历史 commit 的状态，于是 checkout 到了那个 commit，但那个 commit 没有分支指针指向它。

```
# 1. 查看提交历史，找到目标 commit
git log --oneline
# abc1234 (HEAD -> main) 第三次提交
# def5678 第二次提交
# ghi9012 第一次提交

# 2. 切换到特定 commit（进入 detached HEAD 状态）
git checkout def5678
# 或
git switch --detach def5678

# 3. 确认状态
git status
# HEAD detached at def5678
```

**注意：不能直接在 detached HEAD 状态下提交代码。** 如果你要基于这个 commit 继续开发，必须先创建分支：

```
# 4. 创建新分支，安全地继续开发
git checkout -b new-branch-name
# 或
git switch -c new-branch-name

# 5. 现在可以安全地提交了
git add .
git commit -m "在 detached 状态基础上修复 bug"
```

## 更改分支名

```
git checkout 旧分支名
git branch -m 新分支名
```

## restore：只撤销某提交中某个文件的改动

场景：某次提交改了多个文件，其中一个文件是误改，需要单独撤销这个文件的改动，其他文件保留。

**不要用 `git revert <commit>`**，因为这会反向撤销整个提交里的所有文件。

正确思路：把目标文件恢复成"该提交之前"的版本（即该 commit 的父提交版本），只影响这一个文件。

```
git restore --source=<commit>~1 -- <file>
```

参数含义：

- `git restore`：恢复文件内容到工作区
- `--source=<commit>~1`：指定从哪个 commit 取文件版本，`~1` 表示目标 commit 的父提交（即该提交之前的状态）
- `--`：分隔提交参数和文件路径，避免路径被误识别为参数
- `<file>`：只恢复这个文件，不动其他文件

### 为什么不用 `^` 表示父提交

理论上 `<commit>^` 也表示父提交，但在 Windows `cmd.exe` 中 `^` 是转义符，会被命令行吞掉或改变含义，导致 Git 拿不到正确的父提交引用。所以在 Windows 下统一用 `~1` 更稳妥。

### 执行后确认

```bash
# 确认文件状态（成功应显示 M  modified）
git status --short -- <file>

# 查看具体差异，确认只撤销了误改内容
git diff -- <file>

# 只暂存目标文件（不要用 git add .，避免把其他未提交改动一起带入）
git add <file>

# 提交
git commit -m "bugfix: 撤销 xxx 的误改"
```

**关键注意点**：如果当前工作区还有其他未提交的改动，千万不要用 `git add .`，否则会把无关文件一起提交进去。这里只应该 `git add` 目标文件。

---

# 第八部分：团队工作流 — 把前面的知识组合起来

前面六部分学的是"怎么用 Git 操作"，这一部分学的是"团队约定怎么用 Git"。不同的团队规模和项目类型有不同的工作流模式，但底层都是分支 + 合并 + 远程的组合。

## Commit message 规范

每次提交的 message 遵循统一格式：**verb(range): detail**

| 动词 | 含义 |
|------|------|
| add | 新增功能、文件或模块 |
| edit | 修改已有功能或代码 |
| remove | 删除功能、文件或模块 |
| feat | 新增用户功能（同 add） |
| fix | 修复 bug |
| docs | 修改文档（如 README、注释） |
| style | 代码格式调整（不影响运行逻辑，如空格、缩进） |
| refactor | 代码重构（不改变功能） |
| test | 添加或修改测试用例 |
| chore | 构建工具、辅助工具、依赖等变动 |
| perf | 性能优化 |
| merge | 合并分支 |
| revert | 回滚之前的提交 |

两条核心原则：每次提交确认只提交想要提交的内容；每次 commit 只关注一件事。

## 语义化版本号

![语义化版本号](/images/review/git-learning-notes/image-20260523163149500.png)

版本号格式：`主版本.次版本.修订号`

- 主版本（Major）：不兼容的 API 修改
- 次版本（Minor）：向下兼容的新功能
- 修订号（Patch）：向下兼容的 bug 修复

## Progressive-stability 分支模型

核心思想：渐进稳定（progressive-stability）。在最不稳定的分支上进行开发，稳定性逐步提高后向上合并。

![渐进稳定分支结构](/images/review/git-learning-notes/image-20260523164840855.png)

![分支稳定性流向](/images/review/git-learning-notes/image-20260523171042629.png)

底层分支最不稳定（可以有半成品代码），越往上越稳定，最终到达发布分支时是经过充分测试的稳定代码。

## Team Workflow

团队工作流定义了"谁在哪个分支上开发，什么时候合并，谁来审核"。

![Team Workflow](/images/review/git-learning-notes/image-20260704164645579.png)

## IM-PR Workflow（Pull Request 工作流）

PR（Pull Request）工作流：开发者在自己的分支/fork 上完成开发后，发起 PR 请求合并到主分支。团队在 PR 上进行 Code Review，审核通过后合并。

![PR Workflow](/images/review/git-learning-notes/image-20260704164806638.png)

流程要点：开发分支 → push → 发起 PR → Code Review → 合并到主分支 → 删除开发分支。配合 `--no-ff` 合并，可以清晰地在历史中看到每个 PR 的边界。

## Fork Workflow

Fork Workflow 适用于开源项目或跨组织协作：贡献者先 fork 原仓库到自己账号下，在 fork 仓库上开发，然后向原仓库发起 PR。

![Fork Workflow](/images/review/git-learning-notes/image-20260704165121486.png)

与 PR Workflow 的区别：Fork Workflow 中贡献者没有原仓库的写权限，必须通过 fork + PR 的方式贡献代码。

---

# 第九部分：托管平台与认证

## GitHub 账号配置

在向 GitHub 推送代码时，GitHub 需要校验你的身份。主要有两种认证方式。

### SSH 密钥认证

SSH 协议通过密钥对（公钥 + 私钥）认证身份，配置一次后无需重复输入密码。

![SSH 认证流程](/images/review/git-learning-notes/image-20260710165330313.png)

使用 `ssh-keygen` 生成密钥对：

```
ssh-keygen
# Generating public/private ed25519 key pair.
# Enter file in which to save the key (C:\Users\Li Zhengda/.ssh/id_ed25519):
# Enter passphrase (empty for no passphrase):
# Enter same passphrase again:
# Your identification has been saved in C:\Users\Li Zhengda/.ssh/id_ed25519
# Your public key has been saved in C:\Users\Li Zhengda/.ssh/id_ed25519.pub
```

生成后，将公钥（`.pub` 文件内容）添加到 GitHub 的 SSH Keys 设置中，私钥保留在本地不要泄露。

### HTTPS 协议

![HTTPS 认证](/images/review/git-learning-notes/image-20260711093759433.png)

HTTPS 方式通过用户名 + Token/密码认证，配置简单但每次推送可能需要输入凭据（可通过 credential helper 缓存）。

---

# 第十部分：IDE 集成

在 IDE（如 IntelliJ IDEA、VS Code 等）中使用 Git，主要有三个图形化面板：

- **Commit 面板**：查看 changes 并提交，相当于图形化的 `git add` + `git commit`
- **Log 面板**：查看 commit graph，相当于 `git log --graph`
- **分支面板**：管理 branches（创建、切换、合并），相当于 `git branch` / `git checkout` / `git merge`

图形化工具降低了 Git 的使用门槛，但理解了前面九部分的概念后，你会发现这些面板只是命令行操作的封装。遇到复杂问题（冲突解决、rebase、历史回溯）时，命令行仍然是更精确的工具。

---

> **学习路径回顾**：心智模型 → 单人能用 → 多分支 → 多人协作 → 高级技巧 → 急救 → 团队规范 → 工具链。每一部分解决一类"你会遇到的场景"，而不是孤立地罗列命令。
