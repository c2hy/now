import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { parse } from 'yaml';
const production = process.argv.includes('--production');
const indexingEnabled = process.env.PUBLIC_INDEXING_ENABLED !== 'false';
const robotsContent = indexingEnabled ? 'index, follow' : 'noindex, nofollow';
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
const files = walk('dist').filter((f) => f.endsWith('.html'));
// The opening essay is intentionally untitled: no h1 on the home pages.
const untitledPages = new Set([
  join('dist', 'index.html'),
  join('dist', 'zh', 'index.html'),
]);
const errorPages = new Set([
  join('dist', '404.html'),
  join('dist', 'zh', '404', 'index.html'),
]);
const brandPages = new Set([
  ...untitledPages,
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
const contentFiles = walk('src/content').filter(
  (f) =>
    f.endsWith('.md') && (f.includes('/writing/') || f.includes('/projects/')),
);
const sourceEntries = contentFiles.map((file) => {
  const source = readFileSync(file, 'utf8').split('---')[1];
  const data = parse(source);
  const get = (key) => data[key];
  return {
    collection: file.includes('/writing/') ? 'writing' : 'projects',
    route: `${get('locale') === 'zh' ? '/zh' : ''}/${file.includes('/writing/') ? 'notes' : 'projects'}/${get('slug')}`,
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
    untitledPages.has(file) ? 0 : 1,
    `${file}: h1 count`,
  );
  const expectedRobots =
    indexingEnabled && errorPages.has(file) ? 'noindex, follow' : robotsContent;
  assert.match(html, new RegExp(`name="robots" content="${expectedRobots}"`));
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert(title && !titles.has(title), `${file}: unique title`);
  assert(
    description && !descriptions.has(description),
    `${file}: unique description`,
  );
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
      /<div class="prose">\s*<p>([\s\S]*?)<\/p>/,
    )?.[1];
    for (const keyword of ['Will.OPC', 'willopc']) {
      assert(title.includes(keyword), `${file}: brand in title`);
      assert(description.includes(keyword), `${file}: brand in description`);
      assert(
        introduction?.includes(keyword),
        `${file}: visible brand introduction`,
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
    person?.alternateName?.includes('Will.OPC') &&
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
  const imageDimensions = pngDimensions(ogImageFile);
  const declaredWidth = Number(
    html.match(/property="og:image:width" content="(\d+)"/)?.[1],
  );
  const declaredHeight = Number(
    html.match(/property="og:image:height" content="(\d+)"/)?.[1],
  );
  assert.deepEqual(
    imageDimensions,
    { width: declaredWidth, height: declaredHeight },
    `${file}: og dimensions match metadata`,
  );
  assert.match(html, /property="og:image:type" content="image\/png"/);
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
console.log(
  `Verified ${files.length} pages: links, unique metadata, brand aliases, structured data, sitemap, hreflang, h1, ${robotsContent} (404: noindex)${production ? ', sample exclusion' : ''}.`,
);
