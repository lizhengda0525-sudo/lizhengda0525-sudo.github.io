# 本地发布流程

发布内容来自 `../03_publish`，静态资源来自 `../00_static/<文章名>`。同步脚本会把它们复制到 Hugo 网站目录；GitHub Actions 只构建已经提交的 `04_web` 仓库文件，不会读取本地工作区。

## 本地预览

如果要在浏览器里本地查看网站，从 `MyWeb` 根目录执行：

```powershell
Set-Location 04_web
node scripts\sync-published.mjs
hugo server --buildDrafts --buildFuture --disableFastRender
```

预览服务启动后，终端会显示本地访问入口，通常是 `http://localhost:1313/`。`hugo --minify` 只负责构建静态文件，不会启动本地浏览服务。

## 正式构建

确认预览无误后，再执行测试和构建：

```powershell
Set-Location 04_web
node scripts\sync-published.mjs
node --test tests\publish-flow.test.mjs
node --test tests\site-output.test.mjs
hugo --minify
```

确认构建结果和差异正确后，再由用户明确授权提交：

```powershell
git status --short
git add content/posts static/images/review .published-manifest.json
git commit -m "发布文章: <文章标题>"
git push origin main
```

推送后，`.github/workflows/deploy.yml` 会自动构建并发布到 `https://lizhengda0525-sudo.github.io/`。发布完成前不要删除本地源码；若线上异常，可从 Git 历史回退。

图片在文章中使用 `/images/review/<文章名>/<文件名>` 引用。不要将密钥、令牌或私人文件放入网站仓库。

## 使用说明

网站日常预览、文章发布、导航和首页文案的维护方式见 [USAGE.md](USAGE.md)。
