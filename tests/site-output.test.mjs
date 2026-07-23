import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'public');
const slugs = ['gpt-5-6', 'git-learning-notes', 'fastapi-basics', 'agent-blog-tutorial', 'hello'];

execFileSync('hugo', ['--cleanDestinationDir', '--minify'], { cwd: root, stdio: 'pipe' });

const read = (...parts) => fs.readFileSync(path.join(output, ...parts), 'utf8');

test('homepage renders migrated identity and all five posts', () => {
  const html = read('index.html');
  assert.match(html, /达的学习笔记/);
  assert.match(html, /PERSONAL KNOWLEDGE BASE/);
  assert.match(html, /把零散的思考/);
  assert.match(html, /关注我的 GitHub/);
  for (const slug of slugs) assert.match(html, new RegExp(`/posts/${slug}/`));
  assert.doesNotMatch(html, /一叶知舟|舟行|PaperMod/);
});

test('all navigation pages and article pages are generated', () => {
  const pages = [
    ['archives', 'index.html'], ['categories', 'index.html'], ['tags', 'index.html'],
    ['search', 'index.html'], ['about', 'index.html'],
    ...slugs.map((slug) => ['posts', slug, 'index.html']),
  ];
  for (const parts of pages) {
    const html = read(...parts);
    assert.match(html, /达的学习笔记/, parts.join('/'));
    assert.match(html, /hero-compact/, parts.join('/'));
  }
  assert.match(read('archives', 'index.html'), /timeline/);
  assert.match(read('categories', 'index.html'), /category-grid/);
  assert.match(read('tags', 'index.html'), /tag-cloud/);
  assert.match(read('search', 'index.html'), /search-input/);
  assert.match(read('posts', 'gpt-5-6', 'index.html'), /article-page/);
});

test('full-text index contains every article and body content', () => {
  const index = JSON.parse(read('index.json'));
  assert.equal(index.length, 5);
  for (const slug of slugs) assert.ok(index.some((item) => item.permalink === `/posts/${slug}/`), slug);
  assert.ok(index.some((item) => item.content.includes('FastAPI')));
  assert.ok(index.some((item) => item.content.includes('Programmatic Tool Calling')));
});

test('theme, keyboard search, code copy and responsive styles are bundled', () => {
  const cssName = fs.readdirSync(path.join(output, 'css', 'extended')).find((name) => name.endsWith('.css'));
  const jsName = fs.readdirSync(path.join(output, 'js')).find((name) => name.endsWith('.js'));
  const css = read('css', 'extended', cssName);
  const js = read('js', jsName);
  assert.match(css, /data-theme=dark/);
  assert.match(css, /@media\(max-width:760px\)/);
  assert.match(css, /markdown-body/);
  assert.match(js, /da-learning-notes-theme/);
  assert.match(js, /navigator\.clipboard\.writeText/);
  assert.match(js, /ctrlKey/);
});

test('migrated images and social assets are present', () => {
  const images = fs.readdirSync(path.join(output, 'images', 'review', 'git-learning-notes')).filter((name) => name.endsWith('.png'));
  assert.equal(images.length, 40);
  assert.ok(fs.existsSync(path.join(output, 'images', 'site', 'study-hero.png')));
  assert.ok(fs.existsSync(path.join(output, 'favicon.svg')));
});
