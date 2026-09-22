import { readdirSync, readFileSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import sharp from 'sharp';
import {
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
  titleLines?: string[];
  titleFontSize?: number;
  label: string;
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
    locale === 'zh' ? Array.from(value.trim()) : value.trim().split(/\s+/u);
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
  for (let fontSize = 76; fontSize >= 40; fontSize -= 2) {
    const lines = wrapText(title, locale, fontSize, maxWidth);
    const maxLines = fontSize >= 48 ? 3 : 5;
    if (lines.length <= maxLines) return { fontSize, lines };
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
  titleLines,
  titleFontSize,
  label,
  footer,
  coverDataUrl: cover,
}: OgLayout) => {
  const hasCover = Boolean(cover);
  const textWidth = hasCover ? 610 : locale === 'zh' ? 760 : 970;
  const fitted = fitTitle(title, locale, textWidth);
  const fontSize = titleFontSize ?? fitted.fontSize;
  const lines = titleLines ?? fitted.lines;
  const lineHeight = Math.round(fontSize * (locale === 'zh' ? 1.25 : 1.08));
  const titleY = 190;
  const [brand, section] = label.split(' / ');
  const labelMarkup =
    locale === 'zh'
      ? `<text x="88" y="58" fill="#111111" font-family="Inter" font-size="18" font-weight="650" letter-spacing="2">${escapeXml(brand)} /</text><text x="245" y="58" fill="#111111" font-family="${notoFontFamily}" font-size="18" font-weight="650">${escapeXml(section ?? '')}</text>`
      : `<text x="88" y="58" fill="#111111" font-family="Inter" font-size="18" font-weight="650" letter-spacing="2">${escapeXml(label)}</text>`;
  const coverMarkup = cover
    ? `<rect x="770" y="112" width="342" height="406" fill="#f0f0ef"/><image href="${cover}" x="770" y="112" width="342" height="406" preserveAspectRatio="xMidYMid slice"/><rect x="770" y="112" width="342" height="406" fill="none" stroke="#e4e4e4" stroke-width="2"/>`
    : `<rect x="936" y="166" width="176" height="304" fill="#f0f0ef"/><line x1="968" y1="198" x2="1080" y2="198" stroke="#e0301e" stroke-width="8"/><line x1="968" y1="222" x2="1050" y2="222" stroke="#111111" stroke-width="2"/><circle cx="1024" cy="352" r="48" fill="#e0301e"/><text x="1024" y="374" text-anchor="middle" fill="#fafafa" font-family="${fontFamily}" font-size="56" font-weight="650">W.</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <style>${fontFaceCss}</style>
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="#fafafa"/>
  <rect width="12" height="${OG_HEIGHT}" fill="#e0301e"/>
  <line x1="88" y1="82" x2="1112" y2="82" stroke="#e4e4e4" stroke-width="2"/>
  ${labelMarkup}
  ${coverMarkup}
  <text fill="#111111" font-family="${fontFamily}" font-size="${fontSize}" font-weight="650" letter-spacing="${locale === 'zh' ? 0 : -1.5}">${textLines(lines, 88, titleY, lineHeight)}</text>
  <line x1="88" y1="548" x2="1112" y2="548" stroke="#e4e4e4" stroke-width="2"/>
  <text x="88" y="582" fill="#6f6f6f" font-family="${fontFamily}" font-size="16" font-weight="500" letter-spacing="1.5">${escapeXml(footer)}</text>
  <text x="1112" y="582" text-anchor="end" fill="#6f6f6f" font-family="Inter" font-size="16" font-weight="500">WILL.OPC</text>
</svg>`;
};

const renderSvg = (svg: string) => sharp(Buffer.from(svg)).png().toBuffer();

const renderArticle = (data: ArticleOgData, cover?: string) =>
  renderSvg(
    svgFor({
      locale: data.locale,
      title: data.title,
      label: `WILL.OPC / ${data.locale === 'zh' ? '记录' : 'NOTES'}`,
      footer: `${writingCategoryLabels[data.locale][data.category]} / ${new Date(data.publishedAt).getUTCFullYear()}`,
      coverDataUrl: cover,
    }),
  );

export const renderSiteOg = (locale: Locale) =>
  renderSvg(
    svgFor({
      locale,
      title:
        locale === 'zh'
          ? '记录人与自我、数字生活里的真实问题，也把少数想法做成软件。'
          : 'Writing about life with technology, and building software from a few ideas.',
      titleLines:
        locale === 'zh'
          ? [
              '记录人与自我、',
              '数字生活里的真实问题，',
              '也把少数想法做成软件。',
            ]
          : undefined,
      titleFontSize: locale === 'zh' ? 62 : undefined,
      label: 'WILL.OPC / HOME',
      footer:
        locale === 'zh' ? '记录 / 作品 / WILL' : 'NOTES / SOFTWARE / WILL',
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
