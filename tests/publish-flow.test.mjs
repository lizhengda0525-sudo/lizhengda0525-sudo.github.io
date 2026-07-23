import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const myWebRoot = path.resolve(root, '..');
const published = path.resolve(myWebRoot, '03_publish');
const staticAssets = path.resolve(myWebRoot, '00_static');
const posts = path.join(root, 'content', 'posts');
const siteImages = path.join(root, 'static', 'images', 'review');

test('Hugo publish sync script exists and targets only published Markdown', () => {
  const scriptPath = path.join(root, 'scripts', 'sync-published.mjs');
  assert.equal(fs.existsSync(scriptPath), true);
  const script = fs.readFileSync(scriptPath, 'utf8');
  assert.match(script, /publish/);
  assert.match(script, /published/);
  assert.match(script, /['"]content['"]/);
  assert.match(script, /['"]posts['"]/);
  assert.match(script, /drafts/);
  assert.match(script, /00_static/);
});

test('static resources are synchronized from the article-named asset folders', () => {
  execFileSync(process.execPath, ['scripts/sync-published.mjs'], { cwd: root, stdio: 'pipe' });
  for (const folder of fs.readdirSync(staticAssets, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
    assert.equal(fs.existsSync(path.join(siteImages, folder.name)), true, `missing synced static folder: ${folder.name}`);
  }
});

test('published articles can be synchronized into the existing Hugo posts directory', () => {
  execFileSync(process.execPath, ['scripts/sync-published.mjs'], { cwd: root, stdio: 'pipe' });
  for (const file of fs.readdirSync(published).filter((name) => name.endsWith('.md'))) {
    assert.equal(fs.existsSync(path.join(posts, file)), true, `missing synced article: ${file}`);
  }
});

test('GitHub Pages workflow builds committed public content without reading local paths', () => {
  const workflow = fs.readFileSync(path.join(root, '.github', 'workflows', 'deploy.yml'), 'utf8');
  const buildIndex = workflow.indexOf('hugo --minify');
  assert.equal(workflow.includes('node scripts/sync-published.mjs'), false, 'workflow must not access the local knowledge base');
  assert.ok(buildIndex >= 0, 'workflow must build the committed Hugo site');
});
