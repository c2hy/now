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
const canonicals = new Set();
const pngDimensions = (file) => {
  const buffer = readFileSync(file);
  assert.equal(
    buffer.subarray(0, 8).toString('hex'),
    '89504e470d0a1a0a',
    `${file}: png signature`,
  );
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
};
const contentFiles = walk('src/content').filter((f) => f.endsWith('.md'));
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
    1,
    `${file}: h1 count`,
  );
  assert.match(
    html,
    new RegExp(`name="robots" content="${robotsContent}"`),
  );
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert(canonical && !canonicals.has(canonical), `${file}: canonical`);
  canonicals.add(canonical);
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
  assert.deepEqual(
    pngDimensions(ogImageFile),
    { width: 1200, height: 630 },
    `${file}: og dimensions`,
  );
  assert.match(html, /property="og:image:type" content="image\/png"/);
  assert.match(html, /property="og:image:width" content="1200"/);
  assert.match(html, /property="og:image:height" content="630"/);
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
  `Verified ${files.length} pages: links, unique metadata, h1, ${robotsContent}${production ? ', sample exclusion' : ''}.`,
);
