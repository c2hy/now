// 预览构建专用字体诊断：?fontdebug=g（Google Fonts）/ ?fontdebug=cn（jsDelivr）。
// 该文件只在 PREVIEW_CONTENT=true 的构建里通过 ?raw 内联，正式构建不会输出，
// 因此产物中不会出现任何 CDN 地址。
(() => {
  const mode = new URLSearchParams(location.search).get('fontdebug');
  if (!['g', 'cn', 'cdn', 'google', '1', 'local'].includes(mode)) return;
  const source = mode === 'cn' ? 'cn' : mode === 'local' ? 'local' : 'g';
  const CDN = {
    g: [
      'https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Noto+Serif+SC:wght@400;500&display=swap',
    ],
    cn: [
      'https://cdn.jsdelivr.net/npm/@fontsource-variable/newsreader@5.3.0/index.css',
      'https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-sc@5.3.1/400.css',
      'https://cdn.jsdelivr.net/npm/@fontsource/noto-serif-sc@5.3.1/500.css',
    ],
  };
  // Google Fonts 只提供 Newsreader 原名；@fontsource-variable 注册的是 "Newsreader Variable"。
  const FAMILIES = {
    g: ['Noto Serif SC', 'Newsreader'],
    cn: ['Noto Serif SC', 'Newsreader Variable'],
    local: ['Newsreader Variable', 'Newsreader', 'Noto Serif SC'],
  };
  const SAMPLE = {
    'Noto Serif SC': '有些事情值得记住，但不一定值得改进。',
    Newsreader:
      'Some things are worth remembering, but not necessarily worth improving.',
    'Newsreader Variable':
      'Some things are worth remembering, but not necessarily worth improving.',
  };
  const familyOf = (face) => face.family.replace(/["']/g, '').trim();

  const links = [];
  const urls = CDN[source] ?? [];
  const loading = new Promise((resolve) => {
    let remaining = urls.length;
    let finished = false;
    const settle = () => {
      if (!finished && remaining === 0) {
        finished = true;
        resolve();
      }
    };
    if (!remaining) settle();
    urls.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.fontdebugSource = source;
      link.addEventListener('load', () => {
        links.push({ href, status: 'loaded' });
        remaining -= 1;
        settle();
      });
      link.addEventListener('error', () => {
        links.push({ href, status: 'error' });
        remaining -= 1;
        settle();
      });
      document.head.appendChild(link);
    });
    // 网络不可达时不让报告一直挂起。
    setTimeout(() => {
      finished = true;
      resolve();
    }, 12000);
  });

  // 可变字体的 face.weight 是 "100 900" 这样的范围，需要按区间判断。
  const inWeight = (value, weight) => {
    const parts = String(value)
      .split(/\s+/)
      .map(Number)
      .filter((item) => !Number.isNaN(item));
    if (!parts.length) return false;
    return weight >= Math.min(...parts) && weight <= Math.max(...parts);
  };
  const facesFor = (family, weight) =>
    [...document.fonts].filter(
      (face) => familyOf(face) === family && inWeight(face.weight, weight),
    );

  const loadFaces = async () => {
    const report = [];
    for (const family of FAMILIES[source]) {
      for (const weight of [400, 500]) {
        const text = SAMPLE[family];
        let error = null;
        try {
          await document.fonts.load(`${weight} 16px "${family}"`, text);
        } catch (cause) {
          error = String(cause);
        }
        const faces = facesFor(family, weight);
        report.push({
          family,
          weight,
          faces: faces.length,
          loaded: faces.some((face) => face.status === 'loaded'),
          errored: faces.some((face) => face.status === 'error'),
          canRenderSample: document.fonts.check(
            `${weight} 16px "${family}"`,
            text,
          ),
          error,
        });
      }
    }
    return report;
  };

  const pathOf = (el) => {
    const name = el.tagName.toLowerCase();
    const cls = el.classList[0] ? `.${el.classList[0]}` : '';
    const parent = el.parentElement;
    const parentCls = parent?.classList[0] ? `.${parent.classList[0]}>` : '';
    return `${parentCls}${name}${cls}`;
  };

  const collect = () => {
    const root = document.querySelector('main') || document.body;
    return [...root.querySelectorAll('h1,h2,h3,p,li,a,span,time,strong')]
      .filter((el) => {
        if (!(el.textContent || '').trim()) return false;
        if (el.closest('script,style,noscript,svg,pre')) return false;
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      })
      .filter((el, _index, list) => {
        // 同一文本被父子元素重复命中时只保留最内层。
        const inner = [...el.querySelectorAll('*')].some((child) =>
          list.includes(child),
        );
        return !inner;
      })
      .slice(0, 60);
  };

  const stackOf = (value) =>
    value
      .split(',')
      .map((part) =>
        part
          .trim()
          .replace(/["']/g, '')
          .replace(
            /\b(sans-serif|serif|system-ui|ui-monospace|monospace|fantasy|cursive)\b/i,
            '',
          )
          .trim(),
      )
      .filter(Boolean);

  const describe = (el) => {
    const style = getComputedStyle(el);
    const weight = Math.round(Number(style.fontWeight)) || 400;
    const size = parseFloat(style.fontSize) || 16;
    const text = (el.textContent || '').trim().replace(/\s+/g, ' ');
    const stack = stackOf(style.fontFamily);
    const families = stack.map((name) => {
      let canRenderText = false;
      try {
        canRenderText = document.fonts.check(
          `${weight} ${size}px "${name}"`,
          text.slice(0, 12),
        );
      } catch {
        canRenderText = false;
      }
      return {
        name,
        loadedFace: [...document.fonts].some(
          (face) => familyOf(face) === name && face.status === 'loaded',
        ),
        canRenderText,
      };
    });
    const chosen = families.find((item) => item.canRenderText);
    return {
      path: pathOf(el),
      sample: text.slice(0, 40),
      fontSize: style.fontSize,
      fontWeight: String(weight),
      lineHeight: style.lineHeight,
      fontFamily: style.fontFamily,
      likelyUsed: chosen?.name ?? '(fallback 未在 document.fonts 中声明)',
      families,
    };
  };

  const panel = (summary) => {
    const box = document.createElement('pre');
    box.id = 'fontdebug-panel';
    box.style.cssText = [
      'position:fixed',
      'left:12px',
      'bottom:12px',
      'z-index:99',
      'max-width:min(560px,92vw)',
      'max-height:44vh',
      'overflow:auto',
      'margin:0',
      'padding:10px 12px',
      'background:rgba(20,20,23,.92)',
      'color:#e8e9ec',
      'font:12px/1.55 ui-monospace,SFMono-Regular,Menlo,monospace',
      'border-radius:6px',
      'white-space:pre-wrap',
      'pointer-events:none',
    ].join(';');
    box.textContent = summary;
    document.body.appendChild(box);
  };

  const collectRules = () => {
    const rows = [];
    for (const sheet of document.styleSheets) {
      let list = null;
      try {
        list = sheet.cssRules;
      } catch {
        continue; // 跨域 CDN 样式表无法读取，由 links 报告
      }
      if (!list) continue;
      for (const rule of list) {
        if (rule.type !== 5) continue; // CSSFontFaceRule
        const style = rule.style;
        rows.push({
          sheet: sheet.href || '(inline)',
          family: style
            .getPropertyValue('font-family')
            .replace(/["']/g, '')
            .trim(),
          weight: style.getPropertyValue('font-weight') || '(默认 400)',
          display: style.getPropertyValue('font-display') || '(默认 auto)',
          unicodeRange:
            style.getPropertyValue('unicode-range') || '(未声明)',
          src: style.getPropertyValue('src').slice(0, 160),
        });
      }
    }
    return rows;
  };

  const collectResources = () =>
    performance
      .getEntriesByType('resource')
      .filter((entry) => /\.(woff2?|ttf|otf)(\?|$)/.test(entry.name))
      .map((entry) => ({
        file: entry.name.split('/').pop(),
        host: new URL(entry.name).host,
        status: entry.responseStatus ?? null,
        transfer: entry.transferSize,
        duration: Math.round(entry.duration),
      }));

  const collectFailedFaces = () =>
    [...document.fonts]
      .filter((face) => face.status === 'error')
      .map((face) => ({ family: familyOf(face), weight: face.weight }));

  const run = async () => {
    await loading;
    await document.fonts.ready;
    const faces = await loadFaces();
    const rules = collectRules();
    const resources = collectResources();
    const failedFaces = collectFailedFaces();
    const elements = collect().map(describe);
    const results = {
      mode,
      source,
      links,
      rules,
      resources,
      failedFaces,
      faces,
      elements,
      cjkFamilyApplied: faces
        .filter(
          (item) =>
            item.family.includes('Noto') && item.weight === 500 && item.loaded,
        )
        .map((item) => item.family),
      weight500Missing: faces
        .filter((item) => item.weight === 500 && !item.loaded)
        .map((item) => item.family),
    };
    window.__fontDebug = results;
    window.__fontDebugDone = true;
    const linkLines = links.length
      ? links.map((link) => `  ${link.status === 'error' ? '✗' : '✓'} ${link.href}`)
      : ['  （未产生 CDN link 请求）'];
    const faceLines = faces.map(
      (item) =>
        `  ${item.family} ${item.weight}: faces=${item.faces} loaded=${item.loaded} canRender=${item.canRenderSample}`,
    );
    const ruleLines = rules.map(
      (rule) =>
        `  ${rule.family} ${rule.weight} display=${rule.display} unicode-range=${rule.unicodeRange}`,
    );
    const resourceLines = resources.map(
      (item) =>
        `  ${item.status === null || item.status < 400 ? '✓' : '✗'} ${item.host}/${item.file} status=${item.status} ${item.transfer}B`,
    );
    panel(
      [
        `fontdebug=${mode}（${
          source === 'cn' ? 'jsDelivr' : source === 'g' ? 'Google Fonts' : '仅本地打包'
        }）`,
        'CDN CSS 请求：',
        ...linkLines,
        `@font-face 规则（${rules.length}）：`,
        ...ruleLines,
        `字体文件实际请求（${resources.length}）：`,
        ...resourceLines,
        `加载失败的 face：${failedFaces.length}`,
        '字体面：',
        ...faceLines,
        `逐元素明细：window.__fontDebug（${elements.length} 个元素，console.table 已输出）`,
      ].join('\n'),
    );
    console.table(elements.map((item) => ({ ...item, families: undefined })));
  };

  run();
})();
