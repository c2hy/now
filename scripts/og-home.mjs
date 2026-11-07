import sharp from 'sharp';
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

// ── 可替换文本 ────────────────────────────────────────────────
// 默认从 src/content/home/{locale}.md 的 imprint 读取（首页第一段就是它）。
// 文案定稿后重跑本脚本即可，不必改代码；也可用命令行临时覆盖：
//   node scripts/og-home.mjs --en "..." --zh "..."
const arg = (name) => {
  const index = process.argv.indexOf(`--${name}`);
  return index > -1 ? process.argv[index + 1] : null;
};
const imprint = (locale) => {
  const source = readFileSync(`src/content/home/${locale}.md`, 'utf8');
  return parse(source.split('---')[1]).imprint;
};

const copy = {
  en: arg('en') ?? imprint('en'),
  zh: arg('zh') ?? imprint('zh'),
};

// 画作：原图 3200×2364 的下部横条（x 0–3200、y 1297.8–2364，3:1）。
const SRC = 'public/art/bassin-argenteuil-1874/monet-1874-2880.avif';
const SOURCE_SCALE = 2880 / 3200;
const CROP = { x: 0, y: 2364 - 3200 / 3, w: 3200, h: 3200 / 3 };
const painting = await sharp(SRC)
  .extract({
    left: Math.round(CROP.x * SOURCE_SCALE),
    top: Math.round(CROP.y * SOURCE_SCALE),
    width: Math.round(CROP.w * SOURCE_SCALE),
    height: Math.round(CROP.h * SOURCE_SCALE),
  })
  .resize({ width: 1200, height: 400, fit: 'fill' })
  .png()
  .toBuffer();
const paintingSrc = `data:image/png;base64,${painting.toString('base64')}`;

// 纸色区：字标 62px + 问句 24/33（最多 3 行）+ 域名。
const STEPS = [
  { size: 24, leading: 33 },
  { size: 22, leading: 30 },
];

const html = (text, { size, leading }, clamp) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
  html, body { margin: 0; width: 1200px; height: 630px; background: #fff; overflow: hidden; }
  .painting { display: block; width: 1200px; height: 400px; }
  .paper { position: relative; height: 230px; box-sizing: border-box; padding-top: 12px;
           display: flex; flex-direction: column; align-items: center; }
  .brand { font-family: Georgia, 'Times New Roman', serif; font-size: 62px; line-height: 64px;
           letter-spacing: 2.2px; color: #3e454f; white-space: nowrap; }
  .brand .dot { color: #c0392b; }
  .question { width: 580px; margin-top: 6px; text-align: center; color: #3e454f;
              font-family: 'Segoe UI Variable Text', 'Segoe UI', Arial, sans-serif;
              font-weight: 300; font-size: ${size}px; line-height: ${leading}px;
              letter-spacing: 0.012em; text-wrap: balance;
              ${clamp ? '-webkit-line-clamp: 3; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;' : ''} }
  .domain { position: absolute; left: 0; right: 0; bottom: 20px; text-align: center;
            font-family: 'Segoe UI Variable Text', 'Segoe UI', Arial, sans-serif;
            font-weight: 400; font-size: 13px; line-height: 18px; letter-spacing: 0.5px;
            color: #6b7482; }
</style></head>
<body>
  <img class="painting" src="${paintingSrc}" alt="">
  <div class="paper">
    <div class="brand">Will<span class="dot">.</span>OPC</div>
    <div class="question" id="q">${text}</div>
    <div class="domain">willopc.com</div>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });

// 长文本降级：24px 超过 3 行 → 22px；仍超过 → 只取第一句；再超过 → 行内省略。
const firstSentence = (text) => {
  const match = text.match(/^[^。！？!?]+[。！？!?]/);
  return match ? match[0] : text;
};
const measure = async (text, step) => {
  await page.setContent(html(text, step, false), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  return page.evaluate(() => {
    const q = document.getElementById('q');
    return Math.round(q.getBoundingClientRect().height / parseFloat(getComputedStyle(q).lineHeight));
  });
};

const render = async (locale) => {
  let text = copy[locale];
  let step = STEPS[0];
  let lines = await measure(text, step);
  if (lines > 3) {
    step = STEPS[1];
    lines = await measure(text, step);
  }
  if (lines > 3) {
    text = firstSentence(text);
    lines = await measure(text, step);
  }
  const clamped = lines > 3;
  if (clamped) {
    step = STEPS[1];
    await page.setContent(html(text, step, true), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
  }
  const png = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
  const out = `public/og/home-${locale}.jpg`;
  const info = await sharp(png)
    .resize({ width: 1200, height: 630 })
    .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(out);
  console.log(
    `${out}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB,`,
    `${step.size}px/${step.leading}px, ${lines} 行${clamped ? '（省略号截断）' : ''}`,
  );
};

for (const locale of ['en', 'zh']) await render(locale);
await browser.close();
