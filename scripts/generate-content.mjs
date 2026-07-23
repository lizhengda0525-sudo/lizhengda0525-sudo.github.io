import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const projectRoot = process.cwd();
const postsRoot = path.join(projectRoot, "content", "posts");
const aboutPath = path.join(projectRoot, "content", "pages", "about.md");
const outputPath = path.join(projectRoot, "app", "content.generated.ts");

marked.setOptions({ gfm: true, breaks: false });

function parseTomlFrontmatter(source) {
  const clean = source.replace(/^\uFEFF/, "");
  const match = clean.match(/^\+\+\+\r?\n([\s\S]*?)\r?\n\+\+\+\r?\n?/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([\w-]+)\s*=\s*(.+)$/);
    if (!pair) continue;
    const [, key, raw] = pair;
    if (/^\[.*\]$/.test(raw.trim())) {
      data[key] = [...raw.matchAll(/['"]([^'"]+)['"]/g)].map((item) => item[1]);
    } else if (/^(true|false)$/i.test(raw.trim())) {
      data[key] = raw.trim().toLowerCase() === "true";
    } else {
      data[key] = raw.trim().replace(/^['"]|['"]$/g, "");
    }
  }
  return { data, content: clean.slice(match[0].length) };
}

function parseSource(source) {
  const clean = source.replace(/^\uFEFF/, "");
  return clean.startsWith("+++") ? parseTomlFrontmatter(clean) : matter(clean);
}

function stripMarkdown(value) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~|\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugifyHeading(value) {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&[^;]+;/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s/—–]+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "section";
}

function renderMarkdown(markdown) {
  const rendered = marked.parse(markdown);
  const used = new Map();
  const toc = [];
  const html = rendered.replace(/<h([2-3])>([\s\S]*?)<\/h\1>/g, (_match, level, body) => {
    const base = slugifyHeading(body);
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    const title = body.replace(/<[^>]+>/g, "").trim();
    toc.push({ id, level: Number(level), title });
    return `<h${level} id="${id}">${body}</h${level}>`;
  });
  return { html, toc };
}

function normalizeDate(value) {
  const date = value instanceof Date ? value : new Date(value || "2026-01-01T00:00:00+08:00");
  return Number.isNaN(date.getTime()) ? "2026-01-01" : date.toISOString().slice(0, 10);
}

function arrayValue(value) {
  if (Array.isArray(value)) return value.map(String);
  return value ? [String(value)] : [];
}

const coverMap = {
  "git-learning-notes": "/images/review/git-learning-notes/image-20260519214154717.webp",
  "gpt-5-6": "/images/site/study-hero.webp",
  "fastapi-basics": "/images/site/study-hero.webp",
  "agent-blog-tutorial": "/images/site/study-hero.webp",
  hello: "/images/site/study-hero.webp",
};

const fileNames = (await readdir(postsRoot)).filter((name) => name.endsWith(".md"));
const posts = [];

for (const fileName of fileNames) {
  const source = await readFile(path.join(postsRoot, fileName), "utf8");
  const parsed = parseSource(source);
  if (!parsed || parsed.data.draft === true) continue;
  const slug = String(parsed.data.slug || path.basename(fileName, ".md"));
  const plainText = stripMarkdown(parsed.content);
  const rendered = renderMarkdown(parsed.content);
  const categories = arrayValue(parsed.data.categories);
  const tags = arrayValue(parsed.data.tags);
  const description = String(parsed.data.description || plainText.slice(0, 150));
  const charCount = plainText.replace(/\s/g, "").length;
  posts.push({
    slug,
    title: String(parsed.data.title || slug),
    date: normalizeDate(parsed.data.date),
    category: categories[0] || "随笔",
    categories: categories.length ? categories : ["随笔"],
    tags,
    image: coverMap[slug] || "/images/site/study-hero.webp",
    excerpt: description,
    read: `${Math.max(1, Math.ceil(charCount / 500))} 分钟`,
    wordCount: charCount,
    searchText: `${parsed.data.title || ""} ${description} ${categories.join(" ")} ${tags.join(" ")} ${plainText}`,
    html: rendered.html,
    toc: rendered.toc,
  });
}

posts.sort((a, b) => b.date.localeCompare(a.date));

const aboutSource = await readFile(aboutPath, "utf8");
const aboutParsed = parseSource(aboutSource);
const aboutRendered = renderMarkdown(aboutParsed.content);

const output = `// 此文件由 scripts/generate-content.mjs 自动生成，请勿手工修改。\n` +
  `export type BlogPost = { slug: string; title: string; date: string; category: string; categories: string[]; tags: string[]; image: string; excerpt: string; read: string; wordCount: number; searchText: string; html: string; toc: { id: string; level: number; title: string }[] };\n` +
  `export const posts: BlogPost[] = ${JSON.stringify(posts, null, 2)};\n` +
  `export const aboutPage = ${JSON.stringify({ html: aboutRendered.html, toc: aboutRendered.toc }, null, 2)};\n`;

await writeFile(outputPath, output, "utf8");
console.log(`Generated ${posts.length} posts → ${path.relative(projectRoot, outputPath)}`);
