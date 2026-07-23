# 本地发布流程

发布内容来自 `../03_publish`，静态资源来自 `../00_static/<文章名>`。同步脚本会把它们复制到 Hugo 网站目录；GitHub Actions 只构建已经提交的 `04_web` 仓库文件，不会读取本地工作区。

从 `MyWeb` 根目录执行：

```powershell
Set-Location 04_web
node scripts\sync-published.mjs
node --test tests\publish-flow.test.mjs
hugo --minify
```

确认构建结果和差异正确后，再由用户明确授权提交：

```powershell
git add content/posts static/images/review .published-manifest.json
git commit -m "发布文章: <文章标题>"
git push origin main
```

图片在文章中使用 `/images/review/<文章名>/<文件名>` 引用。不要将密钥、令牌或私人文件放入网站仓库。
