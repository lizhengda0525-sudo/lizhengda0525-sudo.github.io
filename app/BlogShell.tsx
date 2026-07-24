"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { aboutPage, posts, type BlogPost } from "./content.generated";

type View = "home" | "archives" | "categories" | "tags" | "about" | "post";

const navItems = [
  ["首页", "/", "⌂"],
  ["归档", "/archives", "◷"],
  ["分类", "/categories", "▣"],
  ["标签", "/tags", "#"],
  ["关于", "/about", "♡"],
];

const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)));
const allCategories = Array.from(new Set(posts.flatMap((post) => post.categories)));

export function BlogShell({ view = "home", slug }: { view?: View; slug?: string }) {
  // Blue Topaz is the default; choosing GitHub light is retained locally.
  const [dark, setDark] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("da-learning-notes-theme");
    const shouldDark = saved !== "light";
    setDark(shouldDark);
    document.documentElement.dataset.theme = shouldDark ? "dark" : "light";
    setFilterName(new URLSearchParams(window.location.search).get("name") ?? "");
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("da-learning-notes-theme", next ? "dark" : "light");
  };

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return normalized
      ? posts.filter((post) => post.searchText.toLowerCase().includes(normalized))
      : posts.slice(0, 5);
  }, [query]);

  const currentPost = posts.find((post) => post.slug === slug);
  const isHome = view === "home";
  const title = view === "post" ? currentPost?.title ?? "文章未找到" : viewLabel(view);

  return <div className="site-shell">
    <header className={isHome ? "hero hero-full" : "hero hero-compact"}>
      <div className="hero-shade" />
      <nav className="top-nav" aria-label="主导航">
        <Link className="brand" href="/">达的学习笔记</Link>
        <div className="nav-actions">
          <button className="nav-search" onClick={() => setSearchOpen(true)} aria-label="搜索文章">⌕ <span>搜索</span><kbd>⌘K</kbd></button>
          <div className="desktop-menu">{navItems.map(([label, href, icon]) => <Link key={href} href={href}><b>{icon}</b>{label}</Link>)}</div>
          <button className="icon-button" onClick={toggleTheme} aria-label={dark ? "切换浅色模式" : "切换深色模式"}>{dark ? "☀" : "☾"}</button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="打开菜单">☰</button>
        </div>
      </nav>
      {menuOpen && <div className="mobile-menu">{navItems.map(([label, href, icon]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}><b>{icon}</b>{label}</Link>)}</div>}
      {isHome
        ? <div className="hero-copy"><span className="eyebrow">PERSONAL KNOWLEDGE BASE</span><h1>达的学习笔记</h1><p>把零散的思考，整理成可以回看的知识。</p><a className="social-dot" href="https://github.com/lizhengda0525-sudo" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a></div>
        : <div className="compact-title"><span>{viewLabel(view)}</span><h1>{title}</h1></div>}
      {isHome && <button className="scroll-cue" onClick={() => document.getElementById("main")?.scrollIntoView({ behavior: "smooth" })} aria-label="向下浏览">⌄</button>}
    </header>

    <main id="main" className="layout">
      <section className="primary">{renderView(view, currentPost, filterName)}</section>
      <Aside onSearch={() => setSearchOpen(true)} toc={view === "post" ? currentPost?.toc : undefined} />
    </main>

    <footer><div className="sail-mark">◢</div><p>写下来的知识，会在未来的某一刻重新照亮当下。</p><small>© 2026 达的学习笔记 · 持续学习，持续记录</small></footer>

    {searchOpen && <div className="search-layer" role="dialog" aria-modal="true" aria-label="站内搜索" onMouseDown={(event) => event.target === event.currentTarget && setSearchOpen(false)}>
      <div className="search-panel">
        <div className="search-head"><div><span>⌕</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索标题、正文、分类或标签…" aria-label="搜索关键词" /></div><button onClick={() => setSearchOpen(false)}>ESC</button></div>
        <p className="result-count">{query ? `找到 ${results.length} 篇相关文章` : "全部文章"}</p>
        <div className="search-results">{results.map((post) => <Link key={post.slug} href={`/post/${post.slug}`} onClick={() => setSearchOpen(false)}><span>{post.category}</span><strong>{post.title}</strong><small>{post.date} · {post.read}</small></Link>)}{results.length === 0 && <div className="empty">没有找到结果，换个关键词试试。</div>}</div>
      </div>
    </div>}
  </div>;
}

function renderView(view: View, post: BlogPost | undefined, filterName: string) {
  if (view === "home") return <div className="post-list">{posts.map((item, index) => <PostCard key={item.slug} post={item} reverse={index % 2 === 1} />)}</div>;
  if (view === "archives") return <PageCard><p className="page-kicker">共 {posts.length} 篇文章</p><h2>归档</h2><div className="timeline">{posts.map((item) => <Link href={`/post/${item.slug}`} key={item.slug}><time>{item.date}</time><span /><div><small>{item.category}</small><strong>{item.title}</strong></div></Link>)}</div></PageCard>;
  if (view === "categories") {
    if (filterName) return <FilteredPage title={`分类：${filterName}`} items={posts.filter((item) => item.categories.includes(filterName))} />;
    const groups = groupByCategory();
    return <PageCard><p className="page-kicker">CATEGORY</p><h2>分类</h2><div className="category-grid">{Object.entries(groups).map(([name, count]) => <Link href={`/categories?name=${encodeURIComponent(name)}`} key={name}><span>{String(count).padStart(2, "0")}</span><strong>{name}</strong><small>查看相关文章 →</small></Link>)}</div></PageCard>;
  }
  if (view === "tags") {
    if (filterName) return <FilteredPage title={`标签：${filterName}`} items={posts.filter((item) => item.tags.includes(filterName))} />;
    return <PageCard><p className="page-kicker">TAG CLOUD</p><h2>标签</h2><div className="tag-cloud">{allTags.map((tag, index) => <Link style={{ fontSize: `${15 + (index % 4) * 4}px` }} href={`/tags?name=${encodeURIComponent(tag)}`} key={tag}>#{tag}</Link>)}</div></PageCard>;
  }
  if (view === "about") return <PageCard><div className="about-intro"><div className="about-avatar">达</div><div><p className="page-kicker">ABOUT</p><h2>关于这个知识库</h2><p>技术学习、工具实践与持续思考的长期记录。</p></div></div><div className="markdown-body about-markdown" dangerouslySetInnerHTML={{ __html: aboutPage.html }} /></PageCard>;
  if (!post) return <PageCard><div className="not-found"><span>404</span><h2>这篇文章暂时找不到</h2><Link href="/">返回首页</Link></div></PageCard>;
  return <Article post={post} />;
}

function FilteredPage({ title, items }: { title: string; items: BlogPost[] }) {
  return <PageCard><p className="page-kicker">共 {items.length} 篇文章</p><h2>{title}</h2><div className="filtered-list">{items.map((post) => <Link key={post.slug} href={`/post/${post.slug}`}><time>{post.date}</time><div><strong>{post.title}</strong><small>{post.excerpt}</small></div><span>→</span></Link>)}{items.length === 0 && <div className="empty">该主题下暂时没有文章。</div>}</div></PageCard>;
}

function PostCard({ post, reverse }: { post: BlogPost; reverse: boolean }) {
  return <article className={`post-card ${reverse ? "reverse" : ""}`}>
    <Link className="post-image" href={`/post/${post.slug}`} style={{ backgroundImage: `url(${post.image})` }} aria-label={post.title} />
    <div className="post-info"><Link href={`/post/${post.slug}`} className="post-title">{post.title}</Link><div className="meta">◷ {post.date}<span>│</span>▣ {post.category}<span>│</span>{post.read}</div><p>{post.excerpt}</p><Link className="read-more" href={`/post/${post.slug}`}>阅读全文 <span>→</span></Link></div>
  </article>;
}

function Aside({ onSearch, toc }: { onSearch: () => void; toc?: BlogPost["toc"] }) {
  if (toc) return <aside className="article-aside"><ArticleToc toc={toc} /></aside>;
  return <aside>
    <div className="widget profile-card"><div className="profile-cover" /><div className="avatar">达</div><h3>达</h3><p>技术学习、工具实践与持续思考</p><div className="stats"><Link href="/archives"><strong>{posts.length}</strong><span>文章</span></Link><Link href="/tags"><strong>{allTags.length}</strong><span>标签</span></Link><Link href="/categories"><strong>{allCategories.length}</strong><span>分类</span></Link></div><a className="follow" href="https://github.com/lizhengda0525-sudo" target="_blank" rel="noreferrer">关注我的 GitHub</a></div>
    <button className="widget quick-search" onClick={onSearch}><span>⌕</span><div><strong>站内搜索</strong><small>按 ⌘ K 快速唤起</small></div><b>→</b></button>
    <div className="widget announcement"><h3><span>♩</span> 公告</h3><p>欢迎来到达的学习笔记。这里沉淀 AI 工具、后端开发、开发工具和学习记录。</p></div>
    <div className="widget recent"><h3><span>◷</span> 最新文章</h3>{posts.slice(0, 4).map((post) => <Link key={post.slug} href={`/post/${post.slug}`}><i style={{ backgroundImage: `url(${post.image})` }} /><span><strong>{post.title}</strong><small>{post.date}</small></span></Link>)}</div>
    <div className="widget tags-widget"><h3><span>#</span> 标签</h3><div>{allTags.slice(0, 10).map((tag) => <Link key={tag} href={`/tags?name=${encodeURIComponent(tag)}`}>{tag}</Link>)}</div></div>
  </aside>;
}

function ArticleToc({ toc }: { toc: BlogPost["toc"] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => Object.fromEntries(toc.map((item) => [item.id, item.level <= 2])));
  const hasChildren = (index: number) => toc[index + 1]?.level > toc[index].level;
  const isVisible = (index: number) => {
    const level = toc[index].level;
    for (let parent = index - 1; parent >= 0; parent -= 1) {
      if (toc[parent].level < level) return expanded[toc[parent].id] !== false;
    }
    return true;
  };

  return <nav className="article-toc article-toc-sidebar" aria-label={"\u6587\u7ae0\u76ee\u5f55"}>
    <strong>{"\u76ee\u5f55"}</strong>
    <div className="toc-tree">{toc.map((item, index) => isVisible(index) && <div className={`toc-item toc-level-${item.level}`} key={item.id}>
      {hasChildren(index) && <button type="button" className="toc-toggle" onClick={() => setExpanded((current) => ({ ...current, [item.id]: !current[item.id] }))} aria-label={expanded[item.id] === false ? "\u5c55\u5f00\u5b50\u76ee\u5f55" : "\u6298\u53e0\u5b50\u76ee\u5f55"} aria-expanded={expanded[item.id] !== false}>{expanded[item.id] === false ? "+" : "-"}</button>}
      <a href={`#${item.id}`}>{item.title}</a>
    </div>)}</div>
  </nav>;
}

function Article({ post }: { post: BlogPost }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const newer = currentIndex > 0 ? posts[currentIndex - 1] : undefined;
  const older = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined;

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const blocks = Array.from(root.querySelectorAll("pre"));
    const cleanups = blocks.map((block) => {
      const button = document.createElement("button");
      button.className = "copy-code";
      button.type = "button";
      button.textContent = "复制";
      const onClick = async () => {
        const code = block.querySelector("code")?.textContent ?? "";
        await navigator.clipboard.writeText(code);
        button.textContent = "已复制";
        window.setTimeout(() => { button.textContent = "复制"; }, 1500);
      };
      button.addEventListener("click", onClick);
      block.appendChild(button);
      return () => { button.removeEventListener("click", onClick); button.remove(); };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [post.slug]);

  return <article className="article-page page-card">
    <div className="article-meta">{post.date} · {post.category} · {post.read} · {post.wordCount} 字</div>
    <p className="lead">{post.excerpt}</p>
    <div ref={contentRef} className="markdown-body" dangerouslySetInnerHTML={{ __html: post.html }} />
    <div className="license"><strong>文章说明</strong><p>本文迁移自“达的学习笔记”原博客，正文与配图均保持原始内容。</p></div>
    <div className="post-tags">{post.tags.map((tag) => <Link href={`/tags?name=${encodeURIComponent(tag)}`} key={tag}>#{tag}</Link>)}</div>
    <nav className="post-navigation">{newer ? <Link href={`/post/${newer.slug}`}><small>上一篇</small><strong>{newer.title}</strong></Link> : <span />}{older && <Link className="next" href={`/post/${older.slug}`}><small>下一篇</small><strong>{older.title}</strong></Link>}</nav>
  </article>;
}

function PageCard({ children }: { children: React.ReactNode }) { return <div className="page-card">{children}</div>; }
function groupByCategory() { return posts.reduce<Record<string, number>>((accumulator, post) => { for (const category of post.categories) accumulator[category] = (accumulator[category] ?? 0) + 1; return accumulator; }, {}); }
function viewLabel(view: View) { return ({ home: "首页", archives: "归档", categories: "分类", tags: "标签", about: "关于", post: "文章" } as const)[view]; }
