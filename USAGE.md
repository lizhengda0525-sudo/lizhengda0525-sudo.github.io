# 网站使用说明

这份说明面向日常维护。网站使用 Hugo 构建，文章内容从上一级的 `03_publish` 同步进入本站；首页和导航由本站代码控制。

## 一、第一次打开网站

在线网站地址：<https://lizhengda0525-sudo.github.io/>。

在本机预览时，从 `MyWeb` 根目录执行：

```powershell
Set-Location 04_web
node scripts\sync-published.mjs
hugo server --buildDrafts --buildFuture --disableFastRender
```

终端出现 `Web Server is available at ...` 后，在浏览器打开 `http://localhost:1313/`。预览完成后，在运行服务的窗口按 `Ctrl+C` 即可停止。

注意：`hugo --minify` 只会生成静态网页，不会提供浏览器访问地址。

## 二、网站现在有哪些入口

顶部导航和首页侧栏都提供相同的内容入口：

- **首页**：大图、最新文章和知识导航。
- **归档**：按文章发布时间查找。
- **分类**：按主题聚合文章。
- **标签**：按更细的关键词聚合文章。
- **搜索**：输入标题或正文关键词检索文章。
- **关于**：说明本站内容方向。

首页文章卡片、分类、标签、归档和搜索结果都可以直接点进文章。深色模式按钮仍保留在右上角。

## 三、发布一篇新文章

文章流转保持如下规则：

```text
01_raw（原始备份） → 02_review（待审稿） → 03_publish（确认发布） → 04_web（同步并部署）
```

1. 新建或保存原文到 `01_raw/<slug>.md`。
2. 整理审核稿到 `02_review/<slug>.md`，其 frontmatter 必须有 `draft: true`。
3. 审核完成后复制到 `03_publish/<slug>.md`，将 frontmatter 改为 `draft: false`。
4. 若文章有图片、图表或附件，将它们放在 `00_static/<slug>/`。
5. 文章内图片统一使用以下网址形式：

   ```markdown
   ![图片说明](/images/review/<slug>/<文件名>)
   ```

6. 在 `04_web` 中运行同步和预览：

   ```powershell
   node scripts\sync-published.mjs
   hugo server --buildDrafts --buildFuture --disableFastRender
   ```

同步脚本会将 `03_publish` 的文章放到 `content/posts`，并将对应静态资源放到 `static/images/review`。不要手动把文章复制到 `content/posts`，否则下一次同步可能覆盖你的改动。

## 四、确认并部署到远程网站

预览无误后，停止预览服务，再构建和检查：

```powershell
node scripts\sync-published.mjs
node --test tests\publish-flow.test.mjs
node --test tests\site-output.test.mjs
hugo --minify
```

构建成功后，检查将要提交的内容；确认无误再提交并推送：

```powershell
git add content/posts static/images/review .published-manifest.json
git add hugo.toml layouts assets content
git commit -m "发布文章: <文章标题>"
git push origin main
```

推送后，GitHub Actions 会自动部署。通常几分钟后刷新在线网站即可看到新内容。只有已经提交并推送的 `04_web` 内容会出现在远程网站上。

## 五、修改网站文案和布局

以下文件负责网站外观，不会影响文章同步：

| 想修改的内容 | 对应文件 |
| --- | --- |
| 网站标题、首页副标题、菜单名称和顺序 | `hugo.toml` |
| 全站导航、首屏、页脚和分享信息 | `layouts/_default/baseof.html` |
| 首页文章列表与右侧信息栏 | `layouts/index.html` |
| 文章正文、目录、标签和前后文章 | `layouts/_default/single.html` |
| 分类、标签与筛选列表 | `layouts/taxonomy.html`、`layouts/_default/list.html` |
| 归档与搜索页面 | `layouts/archives.html`、`layouts/search.html` |
| 全站颜色、卡片、正文和响应式布局 | `assets/css/extended/knowledge-home.css` |
| 主题切换、搜索、手机菜单和代码复制 | `assets/js/blog.js` |
| 首页大图 | `static/images/site/lake-hero.webp` |
| “关于”页面文字 | `content/about.md` |

例如，想改首页副标题，编辑 `hugo.toml` 中的这一行：

```toml
description = '把零散的思考，整理成可以回看的知识。'
```

改完任何网站外观文件后，重新启动或刷新本地预览即可查看结果。对外观改动满意后，按“确认并部署”一节提交。

首页封面使用 WebP，并在页面头部预加载；正文 Markdown 图片由 `layouts/_default/_markup/render-image.html` 自动加入延迟加载。替换封面时建议保持 WebP 小于 200 KB，避免再次拖慢首屏。

## 六、常见问题

### 归档、搜索或关于页面打不开

先重新构建：

```powershell
hugo --minify
```

这些页面分别由 `content/archives.md`、`content/search.md` 和 `content/about.md` 提供。不要删除它们，否则导航会失效。

### 新文章没有出现在首页

检查以下三项：

1. 文件在 `03_publish`，且扩展名是 `.md`。
2. frontmatter 中 `draft` 是 `false`。
3. 已运行 `node scripts\sync-published.mjs`。

### 图片在网站中显示不出来

确认图片放在 `00_static/<slug>/`，并且 Markdown 链接为 `/images/review/<slug>/<文件名>`。文件名的大小写也必须一致。

### 本地预览看起来仍是旧内容

先停止服务，然后再次运行同步命令和 `hugo server --buildDrafts --buildFuture --disableFastRender`。该参数会关闭快速渲染缓存，适合检查布局和文章变动。

### 在线网站没有更新

本地构建并不会自动上传。确认已经在 `04_web` 仓库中完成提交和推送，再等待 GitHub Actions 部署完成。

## 七、日常最短操作

只需要预览现有内容：

```powershell
Set-Location D:\KnowledgeBase\MyWeb\04_web
node scripts\sync-published.mjs
hugo server --buildDrafts --buildFuture --disableFastRender
```

发布已审核的新文章：同步 → 本地预览 → 两组测试 → 正式构建 → 检查差异 → 提交 → 推送。GitHub Actions 成功后，线上网站会自动同步；每一步完成后再进入下一步，网站会始终保持可回退、可检查的状态。
