# 本地发布流程

`D:\\KnowledgeBase\\publish\\published` 是公开文章源目录；GitHub Actions 不能访问本地知识库，所以同步必须在本地完成后再提交网站仓库。

```powershell
cd D:\\KnowledgeBase\\projects\\website
node scripts/sync-published.mjs
node --test tests/publish-flow.test.mjs
hugo --minify
```

确认 `public/` 构建成功且 `git diff` 内容符合预期后，再提交：

```powershell
git add content/posts .published-manifest.json
git commit -m "发布文章: <文章标题>"
git push origin main
```

GitHub Actions 只构建已经提交到仓库的 `content/posts`，不会读取本地路径。
