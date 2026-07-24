import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

const slugs = ["gpt-5-6", "git-learning-notes", "fastapi-basics", "agent-blog-tutorial", "hello"];

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the migrated blog homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /达的学习笔记/);
  assert.match(html, /PERSONAL KNOWLEDGE BASE/);
  assert.match(html, /GPT5\.6/);
  assert.match(html, /Git 学习笔记/);
  assert.match(html, /站内搜索/);
  assert.doesNotMatch(html, /一叶知舟|舟行|codex-preview|Building your site/i);
});

test("all public pages and all five migrated articles render", async () => {
  const paths = ["/archives/", "/categories/", "/tags/", "/about/", ...slugs.map((slug) => `/post/${slug}/`)];
  for (const path of paths) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /达的学习笔记/, path);
    assert.doesNotMatch(html, /文章未找到|这篇文章暂时找不到/, path);
  }
});

test("generated content includes every source post and migrated image", async () => {
  const [generated, sourceFiles, imageFiles] = await Promise.all([
    readFile(new URL("../app/content.generated.ts", import.meta.url), "utf8"),
    readdir(new URL("../content/posts/", import.meta.url)),
    readdir(new URL("../public/images/review/git-learning-notes/", import.meta.url)),
  ]);
  assert.equal(sourceFiles.filter((name) => name.endsWith(".md")).length, 5);
  assert.equal(imageFiles.filter((name) => name.endsWith(".png")).length, 40);
  assert.equal(imageFiles.filter((name) => name.endsWith(".webp")).length, 40);
  for (const slug of slugs) assert.match(generated, new RegExp(`"slug": "${slug}"`));
  assert.match(generated, /image-20260519214154717\.webp/);
  assert.match(generated, /FastAPI/);
  assert.match(generated, /Agent/);
});

test("includes full-text search, theme, responsive article styles and social preview", async () => {
  const [shell, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/BlogShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.match(shell, /da-learning-notes-theme/);
  assert.match(shell, /searchText\.toLowerCase\(\)\.includes/);
  assert.match(shell, /navigator\.clipboard\.writeText/);
  assert.match(shell, /event\.ctrlKey \|\| event\.metaKey/);
  assert.match(css, /html\[data-theme="dark"\]/);
  assert.match(css, /\.markdown-body table/);
  assert.match(css, /list-style: disc outside/);
  assert.match(shell, /ArticleToc/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(layout, /达的学习笔记/);
  assert.match(layout, /\/og\.jpg/);
  assert.match(packageJson, /content:generate/);
});
