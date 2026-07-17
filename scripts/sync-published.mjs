import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const knowledgeBase = path.resolve(root, '..', '..');
const publishedDir = path.resolve(knowledgeBase, 'publish', 'published');
const draftsDir = path.resolve(knowledgeBase, 'publish', 'drafts');
const postsDir = path.join(root, 'content', 'posts');
const manifestPath = path.join(root, '.published-manifest.json');

function isInside(parent, child) {
  const relative = path.relative(parent, child);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

async function readManifest() {
  try {
    return JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return { files: [] };
    throw error;
  }
}

if (!isInside(knowledgeBase, publishedDir) || !publishedDir.endsWith(path.join('publish', 'published'))) {
  throw new Error(`Refusing to sync unexpected source: ${publishedDir}`);
}
if (draftsDir === publishedDir || !draftsDir.endsWith(path.join('publish', 'drafts'))) {
  throw new Error('Drafts and published content must remain separate');
}
if (!isInside(root, postsDir) || !postsDir.endsWith(path.join('content', 'posts'))) {
  throw new Error(`Refusing to sync unexpected Hugo destination: ${postsDir}`);
}

await fs.mkdir(publishedDir, { recursive: true });
await fs.mkdir(postsDir, { recursive: true });

const sourceFiles = (await fs.readdir(publishedDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
  .map((entry) => entry.name)
  .sort();
const previous = await readManifest();

for (const file of previous.files ?? []) {
  if (!sourceFiles.includes(file)) {
    await fs.rm(path.join(postsDir, file), { force: true });
  }
}
for (const file of sourceFiles) {
  await fs.copyFile(path.join(publishedDir, file), path.join(postsDir, file));
}

await fs.writeFile(manifestPath, `${JSON.stringify({ files: sourceFiles }, null, 2)}\n`, 'utf8');
console.log(`Synced ${sourceFiles.length} published Hugo post(s).`);
