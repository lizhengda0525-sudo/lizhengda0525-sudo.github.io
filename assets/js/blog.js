(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const updateThemeButton = () => {
    if (!themeButton) return;
    const dark = root.dataset.theme === 'dark';
    themeButton.textContent = dark ? '☀' : '☾';
    themeButton.setAttribute('aria-label', dark ? '切换浅色模式' : '切换深色模式');
  };
  updateThemeButton();
  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('da-learning-notes-theme', next);
    updateThemeButton();
  });

  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = () => {
    if (!mobileMenu || !menuButton) return;
    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  };
  menuButton?.addEventListener('click', () => {
    if (!mobileMenu) return;
    mobileMenu.hidden = !mobileMenu.hidden;
    menuButton.setAttribute('aria-expanded', String(!mobileMenu.hidden));
  });
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.querySelectorAll('.markdown-body pre').forEach((block) => {
    if (block.querySelector('.copy-code')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code';
    button.textContent = '复制';
    button.addEventListener('click', async () => {
      const code = block.querySelector('code')?.textContent || '';
      await navigator.clipboard.writeText(code);
      button.textContent = '已复制';
      window.setTimeout(() => { button.textContent = '复制'; }, 1500);
    });
    block.appendChild(button);
  });

  const searchInput = document.querySelector('#search-input');
  const searchResults = document.querySelector('#search-results');
  const searchCount = document.querySelector('#search-count');
  let searchIndex = [];

  const text = (value) => String(value || '').toLowerCase();
  const renderResults = (items, query) => {
    if (!searchResults || !searchCount) return;
    searchResults.replaceChildren();
    searchCount.textContent = query ? `找到 ${items.length} 篇相关文章` : `共 ${searchIndex.length} 篇文章`;
    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = query ? '没有找到结果，换个关键词试试。' : '输入关键词开始搜索。';
      searchResults.appendChild(empty);
      return;
    }
    items.forEach((item) => {
      const link = document.createElement('a');
      link.href = item.permalink;
      const meta = document.createElement('span');
      meta.textContent = `${(item.categories || [])[0] || '文章'} · ${item.date}`;
      const body = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = item.title;
      const summary = document.createElement('small');
      summary.textContent = item.summary || '';
      body.append(title, summary);
      const arrow = document.createElement('b');
      arrow.textContent = '→';
      link.append(meta, body, arrow);
      searchResults.appendChild(link);
    });
  };

  if (searchInput) {
    fetch('/index.json')
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('search index unavailable')))
      .then((data) => {
        searchIndex = Array.isArray(data) ? data : [];
        const initial = new URLSearchParams(location.search).get('q') || '';
        searchInput.value = initial;
        const normalized = text(initial).trim();
        const items = normalized ? searchIndex.filter((item) => text([item.title, item.summary, item.content, ...(item.categories || []), ...(item.tags || [])].join(' ')).includes(normalized)) : searchIndex;
        renderResults(items, normalized);
        if (initial) searchInput.focus();
      })
      .catch(() => {
        if (searchCount) searchCount.textContent = '搜索索引加载失败，请刷新页面重试。';
      });
    searchInput.addEventListener('input', () => {
      const query = text(searchInput.value).trim();
      const items = query ? searchIndex.filter((item) => text([item.title, item.summary, item.content, ...(item.categories || []), ...(item.tags || [])].join(' ')).includes(query)) : searchIndex;
      renderResults(items, query);
    });
  }

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (searchInput) searchInput.focus();
      else location.href = '/search/';
    }
    if (event.key === 'Escape') {
      closeMenu();
      if (searchInput && document.activeElement === searchInput) {
        if (searchInput.value) {
          searchInput.value = '';
          searchInput.dispatchEvent(new Event('input'));
        } else searchInput.blur();
      }
    }
  });
})();
