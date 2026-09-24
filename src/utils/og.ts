import { readdirSync, readFileSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import sharp from 'sharp';
import {
  ui,
  writingCategoryLabels,
  type Locale,
  type WritingCategory,
} from '../i18n';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
export const OG_CONTENT_TYPE = 'image/png';

export interface ArticleOgData {
  title: string;
  locale: Locale;
  category: WritingCategory;
  publishedAt: Date;
  cover?: { src: string; alt: string };
}

interface OgLayout {
  locale: Locale;
  title: string;
  kind: 'site' | 'article';
  footer: string;
  coverDataUrl?: string;
}

// Astro bundles static endpoints before prerendering them. Use the build cwd
// so font and public asset paths still point at the project after bundling.
const projectRoot = resolve(process.cwd());
const notoFontDirectory = resolve(
  projectRoot,
  'node_modules/@fontsource-variable/noto-sans-sc/files',
);
const fontSources = [
  {
    family: 'Inter',
    file: resolve(
      projectRoot,
      'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
    ),
  },
  ...readdirSync(notoFontDirectory)
    .filter((file) => file.endsWith('.woff2'))
    .map((file, index) => ({
      family: `NotoSubset${index}`,
      file: resolve(notoFontDirectory, file),
    })),
];
const fontFamily = fontSources.map(({ family }) => family).join(', ');
const notoFontFamily = fontSources
  .slice(1)
  .map(({ family }) => family)
  .join(', ');
const fontFaceCss = fontSources
  .map(({ family, file }) => {
    const data = readFileSync(file).toString('base64');
    return `@font-face{font-family:${family};font-style:normal;font-weight:100 900;src:url(data:font/woff2;base64,${data}) format('woff2');}`;
  })
  .join('');

const escapeXml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[character] ?? character,
  );

const isCjk = (value: string) =>
  /[\u1100-\u11ff\u2e80-\u2fff\u3000-\u303f\u3040-\u30ff\u3100-\u312f\u3130-\u318f\u31a0-\u31bf\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/u.test(
    value,
  );

const estimatedWidth = (value: string, fontSize: number) =>
  Array.from(value).reduce(
    (width, character) =>
      width +
      (isCjk(character)
        ? fontSize
        : /\s/u.test(character)
          ? fontSize * 0.3
          : fontSize * 0.56),
    0,
  );

const wrapText = (
  value: string,
  locale: Locale,
  fontSize: number,
  maxWidth: number,
) => {
  const units =
    locale === 'zh'
      ? Array.from(
          new Intl.Segmenter('zh', { granularity: 'word' }).segment(
            value.trim(),
          ),
          ({ segment }) => segment,
        ).reduce<string[]>((result, segment) => {
          if (/^[，。！？；：、,.!?;:]$/u.test(segment) && result.length) {
            result[result.length - 1] += segment;
          } else {
            result.push(segment);
          }
          return result;
        }, [])
      : value.trim().split(/\s+/u);
  const lines: string[] = [];
  let line = '';

  for (const unit of units) {
    const candidate =
      locale === 'zh' ? `${line}${unit}` : `${line}${line ? ' ' : ''}${unit}`;
    if (line && estimatedWidth(candidate, fontSize) > maxWidth) {
      lines.push(line);
      line = unit;
      continue;
    }
    if (!line && estimatedWidth(unit, fontSize) > maxWidth) {
      const characters = Array.from(unit);
      let characterLine = '';
      for (const character of characters) {
        const characterCandidate = `${characterLine}${character}`;
        if (
          characterLine &&
          estimatedWidth(characterCandidate, fontSize) > maxWidth
        ) {
          lines.push(characterLine);
          characterLine = character;
        } else {
          characterLine = characterCandidate;
        }
      }
      line = characterLine;
      continue;
    }
    line = candidate;
  }
  if (line) lines.push(line);
  return lines;
};

const fitTitle = (title: string, locale: Locale, maxWidth: number) => {
  for (
    let fontSize = locale === 'zh' ? 76 : 82;
    fontSize >= 38;
    fontSize -= 2
  ) {
    const lines = wrapText(title, locale, fontSize, maxWidth);
    const lineHeight = Math.round(fontSize * (locale === 'zh' ? 1.27 : 1.12));
    if ((lines.length - 1) * lineHeight <= 255) return { fontSize, lines };
  }
  return { fontSize: 38, lines: wrapText(title, locale, 38, maxWidth) };
};

const textLines = (lines: string[], x: number, y: number, lineHeight: number) =>
  lines
    .map(
      (line, index) =>
        `<tspan x="${x}" y="${y + index * lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join('');

const coverDataUrl = (src: string) => {
  if (!src.startsWith('/'))
    throw new Error(`OG cover must be a local path: ${src}`);
  const publicRoot = resolve(projectRoot, 'public');
  const filePath = resolve(publicRoot, `.${src}`);
  if (filePath !== publicRoot && !filePath.startsWith(`${publicRoot}${sep}`)) {
    throw new Error(`OG cover is outside public/: ${src}`);
  }
  const buffer = readFileSync(filePath);
  const mime = (
    {
      '.avif': 'image/avif',
      '.jpeg': 'image/jpeg',
      '.jpg': 'image/jpeg',
      '.png': 'image/png',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
    } as Record<string, string>
  )[extname(filePath).toLowerCase()];
  if (!mime) throw new Error(`Unsupported OG cover format: ${src}`);
  return `data:${mime};base64,${buffer.toString('base64')}`;
};

const svgFor = ({
  locale,
  title,
  kind,
  footer,
  coverDataUrl: cover,
}: OgLayout) => {
  const section =
    kind === 'site'
      ? locale === 'zh'
        ? '首页'
        : 'HOME'
      : locale === 'zh'
        ? '记录'
        : 'NOTES';
  const heading =
    kind === 'site'
      ? `<text x="88" y="326" fill="#111111" font-family="${fontFamily}" font-size="112" font-weight="650" letter-spacing="${locale === 'zh' ? 0 : -5}">${escapeXml(title)}</text>
       <text fill="#505050" font-family="${fontFamily}" font-size="29" font-weight="450">${textLines(wrapText(ui[locale].homeIntroDescription, locale, 29, 1000), 88, 414, 43)}</text>`
      : (() => {
          const { fontSize, lines } = fitTitle(
            title,
            locale,
            cover ? 660 : 1020,
          );
          const lineHeight = Math.round(
            fontSize * (locale === 'zh' ? 1.27 : 1.12),
          );
          return `<text fill="#111111" font-family="${fontFamily}" font-size="${fontSize}" font-weight="650" letter-spacing="${locale === 'zh' ? 0 : -1.8}">${textLines(lines, 88, 265, lineHeight)}</text>`;
        })();
  const coverMarkup =
    cover && kind === 'article'
      ? `<rect x="814" y="176" width="298" height="340" fill="#f0f0ef"/><image href="${cover}" x="814" y="176" width="298" height="340" preserveAspectRatio="xMidYMid slice"/>`
      : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <style>${fontFaceCss}</style>
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="#fafafa"/>
  <text x="88" y="94" fill="#111111" font-family="Inter" font-size="42" font-weight="700" letter-spacing="-1.5">WILL.OPC</text>
  <text x="1112" y="90" text-anchor="end" fill="#6f6f6f" font-family="${notoFontFamily}" font-size="17" font-weight="600" letter-spacing="2">${escapeXml(section)}</text>
  <line x1="88" y1="128" x2="1112" y2="128" stroke="#111111" stroke-width="2"/>
  <rect x="88" y="159" width="64" height="7" fill="#e0301e"/>
  ${coverMarkup}
  ${heading}
  <line x1="88" y1="544" x2="1112" y2="544" stroke="#d6d6d6" stroke-width="2"/>
  <text x="88" y="586" fill="#6f6f6f" font-family="${fontFamily}" font-size="17" font-weight="500">${escapeXml(footer)}</text>
  <text x="1112" y="586" text-anchor="end" fill="#6f6f6f" font-family="Inter" font-size="17" font-weight="500">WILLOPC.COM</text>
</svg>`;
};

const renderSvg = (svg: string) => sharp(Buffer.from(svg)).png().toBuffer();

const renderArticle = (data: ArticleOgData, cover?: string) =>
  renderSvg(
    svgFor({
      locale: data.locale,
      title: data.title,
      kind: 'article',
      footer: `${writingCategoryLabels[data.locale][data.category]} / ${new Date(data.publishedAt).getUTCFullYear()}`,
      coverDataUrl: cover,
    }),
  );

export const renderSiteOg = (locale: Locale) =>
  renderSvg(
    svgFor({
      locale,
      title: ui[locale].homeIntroTitle,
      kind: 'site',
      footer: locale === 'zh' ? '记录 / 作品' : 'NOTES / PROJECTS',
    }),
  );

export const renderArticleOg = async (data: ArticleOgData) => {
  let cover: string | undefined;
  if (data.cover) {
    try {
      cover = coverDataUrl(data.cover.src);
    } catch {
      cover = undefined;
    }
  }

  try {
    return await renderArticle(data, cover);
  } catch {
    try {
      return await renderArticle(data);
    } catch {
      return renderSiteOg(data.locale);
    }
  }
};
