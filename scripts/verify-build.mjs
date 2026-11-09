import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, sep } from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { parse } from 'yaml';
const production = process.argv.includes('--production');
const indexingEnabled = process.env.PUBLIC_INDEXING_ENABLED !== 'false';
const robotsContent = indexingEnabled ? 'index, follow' : 'noindex, nofollow';
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
const files = walk('dist').filter((f) => f.endsWith('.html'));
// H1 不是排名因素：首页的 h1 是站点标题（页头可见 wordmark），
// 内页的 h1 仍是页面自身标题；两种页面都保持每页恰好 1 个 h1。
const homePages = new Set([
  join('dist', 'index.html'),
  join('dist', 'zh', 'index.html'),
]);
const errorPages = new Set([
  join('dist', '404.html'),
  join('dist', 'zh', '404', 'index.html'),
]);
const brandPages = new Set([
  ...homePages,
  join('dist', 'about', 'index.html'),
  join('dist', 'zh', 'about', 'index.html'),
]);
const canonicals = new Set();
const contentCanonicals = new Set();
const titles = new Set();
const descriptions = new Set();
const languageLinks = new Map();
const pngDimensions = (file) => {
  const buffer = readFileSync(file);
  assert.equal(
    buffer.subarray(0, 8).toString('hex'),
    '89504e470d0a1a0a',
    `${file}: png signature`,
  );
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
};
const imageInfo = async (file) => {
  const image = await sharp(file).metadata();
  return { width: image.width, height: image.height, format: image.format };
};
const isWritingFile = (file) => file.split(sep).includes('writing');
const contentFiles = walk('src/content').filter(
  (f) =>
    f.endsWith('.md') &&
    (isWritingFile(f) || f.split(sep).includes('projects')),
);
const sourceEntries = contentFiles.map((file) => {
  const source = readFileSync(file, 'utf8').split('---')[1];
  const data = parse(source);
  const get = (key) => data[key];
  return {
    collection: isWritingFile(file) ? 'writing' : 'projects',
    route: `${get('locale') === 'zh' ? '/zh' : ''}/${isWritingFile(file) ? 'notes' : 'projects'}/${get('slug')}`,
    hidden: get('sample') || get('draft'),
    translationKey: get('translationKey'),
    category: get('category'),
  };
});
const expectedEntries = sourceEntries.filter((e) => !production || !e.hidden);
const writingCategories = new Set([
  'life-observation',
  'technical-sharing',
  'product-building',
]);
const writingEntries = sourceEntries.filter((e) => e.collection === 'writing');
for (const entry of writingEntries)
  assert(writingCategories.has(entry.category), `${entry.route}: category`);
const categoriesByTranslation = new Map();
for (const entry of writingEntries) {
  if (!entry.translationKey) continue;
  const previous = categoriesByTranslation.get(entry.translationKey);
  if (previous)
    assert.equal(
      entry.category,
      previous.category,
      `${entry.translationKey}: bilingual category`,
    );
  else categoriesByTranslation.set(entry.translationKey, entry);
}
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `${file}: h1 count`,
  );
  if (homePages.has(file)) {
    const homeHeading = html.match(/<h1[\s\S]*?<\/h1>/)?.[0] ?? '';
    assert(
      homeHeading.includes('Will.OPC'),
      `${file}: home h1 is the visible wordmark`,
    );
    // 联系区只剩一个动作出口：标题本身是 mailto，渠道链接正好 4 个，
    // placement 口径沿用 home_contact，不再有“全部联系方式”二级入口。
    assert.match(
      html,
      /<a[^>]*href="mailto:hello@willopc\.com"[^>]*data-analytics-placement="home_contact"/,
      `${file}: home contact title is the mailto link`,
    );
    assert.equal(
      (html.match(/data-analytics-placement="home_channel_/g) || []).length,
      4,
      `${file}: home channel links`,
    );
    assert(
      !html.includes('全部联系方式') && !html.includes('All contact details'),
      `${file}: no secondary contact entry`,
    );
  }
  const expectedRobots =
    indexingEnabled && errorPages.has(file) ? 'noindex, follow' : robotsContent;
  assert.match(html, new RegExp(`name="robots" content="${expectedRobots}"`));
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  // 首页中英两版共用同一个纯品牌标题（收藏夹里保持一致），
  // 唯一性检查对这两页单独放开，其余页面仍要求标题互不重复。
  const isHomePage = /^dist\/(zh\/)?index\.html$/.test(file.replace(/\\/g, '/'));
  if (isHomePage) {
    assert.equal(title, 'Will.OPC', `${file}: home title is brand only`);
  } else {
    assert(title && !titles.has(title), `${file}: unique title`);
  }
  assert(
    description && !descriptions.has(description),
    `${file}: unique description`,
  );
  // 品牌只出现在首页、关于与 404 的标题里；内页靠唯一主标题区分，不再统一加后缀。
  if (brandPages.has(file) || errorPages.has(file))
    assert(title.includes('Will.OPC'), `${file}: branded title`);
  titles.add(title);
  descriptions.add(description);
  assert.equal(
    html.match(/property="og:title" content="([^"]+)"/)?.[1],
    title,
    `${file}: OG title`,
  );
  assert.equal(
    html.match(/name="twitter:title" content="([^"]+)"/)?.[1],
    title,
    `${file}: Twitter title`,
  );
  if (brandPages.has(file)) {
    const introduction = html.match(
      /<div class="(?:prose|about-body)"[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>/,
    )?.[1];
    // 别名只出现在描述、可见正文与结构化数据里；标题保持单一品牌名，避免堆砌。
    assert(title.includes('Will.OPC'), `${file}: brand in title`);
    assert(
      description.includes('Will.OPC') && description.includes('willopc'),
      `${file}: both name forms in description`,
    );
    if (homePages.has(file)) {
      assert(/\bWill\b/.test(introduction ?? ''), `${file}: homepage introduces Will`);
    } else {
      assert(
        introduction?.includes('Will.OPC') && introduction?.includes('willopc'),
        `${file}: visible introduction keeps both name forms`,
      );
    }
  }
  const graph = JSON.parse(
    html.match(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
    )?.[1] ?? '{}',
  )['@graph'];
  assert(Array.isArray(graph), `${file}: structured data graph`);
  const websites = graph.filter((node) => node['@type'] === 'WebSite');
  assert.equal(websites.length, 1, `${file}: one website identity`);
  const [website] = websites;
  assert.equal(website.name, 'Will.OPC', `${file}: site name`);
  assert.equal(website.alternateName, 'willopc', `${file}: site alias`);
  assert.equal(website.url, 'https://willopc.com/', `${file}: site root`);
  const person = graph.find((node) => node['@type'] === 'Person');
  assert(
    Array.isArray(person?.alternateName) &&
      person.alternateName.includes('Will.OPC') &&
      person.alternateName.includes('willopc'),
    `${file}: creator aliases`,
  );
  assert.equal(
    website.publisher?.['@id'],
    person['@id'],
    `${file}: creator relationship`,
  );
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert(canonical && !canonicals.has(canonical), `${file}: canonical`);
  canonicals.add(canonical);
  assert.equal(
    new URL(canonical).origin,
    'https://willopc.com',
    `${file}: canonical origin`,
  );
  if (!errorPages.has(file)) {
    contentCanonicals.add(canonical);
    const alternates = new Map(
      [
        ...html.matchAll(/rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g),
      ].map((match) => [match[1], match[2]]),
    );
    const entry = expectedEntries.find(
      (item) => item.route === new URL(canonical).pathname,
    );
    const paired =
      !entry ||
      (entry.translationKey &&
        expectedEntries.some(
          (item) =>
            item.collection === entry.collection &&
            item.translationKey === entry.translationKey &&
            item.route !== entry.route,
        ));
    if (!paired) {
      assert.equal(
        alternates.size,
        0,
        `${file}: no unrelated language alternate`,
      );
    } else {
      const locale = html.includes('<html lang="zh-CN"') ? 'zh-CN' : 'en';
      assert.equal(alternates.get(locale), canonical, `${file}: self hreflang`);
      assert.equal(
        alternates.get('x-default'),
        alternates.get('en'),
        `${file}: default language`,
      );
      languageLinks.set(canonical, alternates);
    }
  }
  const ogImage = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  assert(ogImage, `${file}: og:image`);
  assert(
    ogImage.startsWith('https://willopc.com/'),
    `${file}: absolute og:image`,
  );
  const ogImagePath = new URL(ogImage).pathname.replace(/^\/+/, '');
  const ogImageFile = join('dist', ogImagePath);
  assert(
    existsSync(ogImageFile),
    `${file}: missing ${new URL(ogImage).pathname}`,
  );
  const imageDimensions = await imageInfo(ogImageFile);
  const declaredWidth = Number(
    html.match(/property="og:image:width" content="(\d+)"/)?.[1],
  );
  const declaredHeight = Number(
    html.match(/property="og:image:height" content="(\d+)"/)?.[1],
  );
  assert.deepEqual(
    { width: imageDimensions.width, height: imageDimensions.height },
    { width: declaredWidth, height: declaredHeight },
    `${file}: og dimensions match metadata`,
  );
  const ogType = html.match(/property="og:image:type" content="([^"]+)"/)?.[1];
  assert.equal(
    ogType,
    imageDimensions.format === 'jpeg' ? 'image/jpeg' : 'image/png',
    `${file}: og:image:type`,
  );
  assert(
    Number.isInteger(declaredWidth) && declaredWidth > 0,
    `${file}: og width`,
  );
  assert(
    Number.isInteger(declaredHeight) && declaredHeight > 0,
    `${file}: og height`,
  );
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  for (const match of html.matchAll(
    /(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g,
  )) {
    const target = join('dist', decodeURIComponent(match[1]));
    assert(
      existsSync(target) ||
        existsSync(`${target}.html`) ||
        existsSync(join(target, 'index.html')),
      `${file}: missing ${match[1]}`,
    );
  }
  if (production) {
    for (const entry of sourceEntries.filter((e) => e.hidden))
      assert(!html.includes(`href="${entry.route}"`), `${file}: sample leaked`);
  }
}
const sitemap = readFileSync(join('dist', 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
assert.equal(
  sitemapUrls.length,
  new Set(sitemapUrls).size,
  'sitemap: unique URLs',
);
assert.deepEqual(
  new Set(sitemapUrls),
  contentCanonicals,
  'sitemap: every published page, no error pages',
);
for (const [canonical, alternates] of languageLinks) {
  for (const [locale, target] of alternates) {
    assert(
      contentCanonicals.has(target),
      `${canonical}: published ${locale} alternate`,
    );
    assert(
      languageLinks.get(target)?.has('en') &&
        languageLinks.get(target)?.has('zh-CN'),
      `${canonical}: bilingual alternates`,
    );
    assert(
      [...languageLinks.get(target).values()].includes(canonical),
      `${canonical}: reciprocal hreflang`,
    );
  }
}
assert.equal(files.length, 10 + expectedEntries.length);
for (const locale of ['en', 'zh']) {
  const siteImage = join('dist', 'og', locale, 'site.png');
  assert(existsSync(siteImage), `og/${locale}/site.png: generated`);
  assert.deepEqual(
    pngDimensions(siteImage),
    { width: 1200, height: 630 },
    `${siteImage}: dimensions`,
  );
}
for (const entry of expectedEntries.filter(
  (item) => item.collection === 'writing',
)) {
  const locale = entry.route.startsWith('/zh/') ? 'zh' : 'en';
  const slug = entry.route.split('/').at(-1);
  const image = join('dist', 'og', locale, 'notes', `${slug}.png`);
  assert(existsSync(image), `${image}: generated`);
  assert.deepEqual(
    pngDimensions(image),
    { width: 1200, height: 630 },
    `${image}: dimensions`,
  );
}
for (const entry of sourceEntries)
  assert.equal(
    existsSync(join('dist', entry.route, 'index.html')),
    !production || !entry.hidden,
    `${entry.route}: publication status`,
  );
// 中文子集覆盖断言：产物里出现任何不在子集里的非 ASCII 字符都会静默回退到
// 系统宋体，因此构建直接失败，提示重新生成子集。
const charsetFile = join('src', 'assets', 'fonts', 'subset-chars.txt');
assert(existsSync(charsetFile), 'fonts: run node scripts/subset-fonts.mjs');
const subsetChars = new Set(readFileSync(charsetFile, 'utf8'));
for (const file of files) {
  const text = readFileSync(file, 'utf8')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '');
  for (const char of text)
    if (char.codePointAt(0) > 0x7f)
      assert(
        subsetChars.has(char),
        `${file}: glyph outside subset "${char}" — 改过文案后请运行 npm run fonts:subset`,
      );
}
console.log(
  `Verified ${files.length} pages: links, unique metadata, branded titles, structured data, sitemap, hreflang, h1, ${robotsContent} (404: noindex), font subset coverage${production ? ', sample exclusion' : ''}.`,
);
