import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const published = path.resolve(root, '..', '..', 'publish', 'published');
const posts = path.join(root, 'content', 'posts');

test('Hugo publish sync script exists and targets only published Markdown', () => {
  const scriptPath = path.join(root, 'scripts', 'sync-published.mjs');
  assert.equal(fs.existsSync(scriptPath), true);
  const script = fs.readFileSync(scriptPath, 'utf8');
  assert.match(script, /publish/);
  assert.match(script, /published/);
  assert.match(script, /['"]content['"]/);
  assert.match(script, /['"]posts['"]/);
  assert.match(script, /drafts/);
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
