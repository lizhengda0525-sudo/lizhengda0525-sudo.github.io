import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const myWebRoot = path.resolve(root, '..');
const publishedDir = path.resolve(myWebRoot, '03_publish');
const draftsDir = path.resolve(myWebRoot, '02_review');
const staticAssetsDir = path.resolve(myWebRoot, '00_static');
const postsDir = path.join(root, 'content', 'posts');
const siteImagesDir = path.join(root, 'static', 'images', 'review');
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

if (!isInside(myWebRoot, publishedDir) || !publishedDir.endsWith('03_publish')) {
  throw new Error(`Refusing to sync unexpected source: ${publishedDir}`);
}
if (draftsDir === publishedDir || !draftsDir.endsWith('02_review')) {
  throw new Error('Drafts and published content must remain separate');
}
if (!isInside(root, postsDir) || !postsDir.endsWith(path.join('content', 'posts'))) {
  throw new Error(`Refusing to sync unexpected Hugo destination: ${postsDir}`);
}
if (!isInside(myWebRoot, staticAssetsDir) || !staticAssetsDir.endsWith('00_static')) {
  throw new Error(`Refusing to sync unexpected static source: ${staticAssetsDir}`);
}
if (!isInside(root, siteImagesDir) || !siteImagesDir.endsWith(path.join('static', 'images', 'review'))) {
  throw new Error(`Refusing to sync unexpected static destination: ${siteImagesDir}`);
}

await fs.mkdir(publishedDir, { recursive: true });
await fs.mkdir(postsDir, { recursive: true });
await fs.mkdir(staticAssetsDir, { recursive: true });
await fs.mkdir(siteImagesDir, { recursive: true });

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

const assetFolders = (await fs.readdir(staticAssetsDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const folder of assetFolders) {
  await fs.cp(path.join(staticAssetsDir, folder), path.join(siteImagesDir, folder), { recursive: true, force: true });
}

await fs.writeFile(manifestPath, `${JSON.stringify({ files: sourceFiles }, null, 2)}\n`, 'utf8');
console.log(`Synced ${sourceFiles.length} published Hugo post(s) and ${assetFolders.length} static asset folder(s).`);
