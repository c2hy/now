import { readdirSync, readFileSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import { openSync, type Font } from 'fontkit';
import sharp from 'sharp';
import { getEntry } from 'astro:content';
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
  kind: 'site' | 'article';
  footer: string;
  coverDataUrl?: string;
}

// Astro bundles static endpoints before prerendering them. Use the build cwd
// so font and public asset paths still point at the project after bundling.
const projectRoot = resolve(process.cwd());

// sharp's bundled librsvg cannot load data-URL @font-face fonts, so all text
// is converted to SVG outlines with fontkit. Stacks mirror the site's
// --font-heading (Newsreader + Noto Serif SC) and --font-sans (Inter +
// Noto Sans SC) using the static 400 files for deterministic rendering.
const staticFontDirectory = (pkg: string) =>
  resolve(projectRoot, `node_modules/@fontsource/${pkg}/files`);
const openFont = (path: string): Font => openSync(path) as Font;
const latinFont = (pkg: string) =>
  openFont(resolve(staticFontDirectory(pkg), `${pkg}-latin-400-normal.woff2`));
const cjkSubsets = (pkg: string) =>
  readdirSync(staticFontDirectory(pkg))
    .filter((file) => file.endsWith('400-normal.woff2'))
    .map((file) => openFont(resolve(staticFontDirectory(pkg), file)));

const serifStack: Font[] = [
  latinFont('newsreader'),
  ...cjkSubsets('noto-serif-sc'),
];
const sansStack: Font[] = [latinFont('inter'), ...cjkSubsets('noto-sans-sc')];

const fontForCharacter = (stack: Font[], character: string) => {
  const codePoint = character.codePointAt(0) ?? 0;
  for (const font of stack) {
    if (font.characterSet?.includes(codePoint)) return font;
  }
  return stack[0];
};

const measureText = (
  stack: Font[],
  text: string,
  fontSize: number,
  letterSpacing = 0,
) => {
  let width = 0;
  for (const character of Array.from(text)) {
    const font = fontForCharacter(stack, character);
    const glyph = font.layout(character).glyphs[0];
    width += (glyph.advanceWidth * fontSize) / font.unitsPerEm + letterSpacing;
  }
  return width;
};

const commandsToPathData = (
  commands: ReadonlyArray<{
    command: string;
    args: number[];
  }>,
  scale: number,
  offsetX: number,
  baselineY: number,
) =>
  commands
    .map(({ command, args }) => {
      const point = (index: number) =>
        `${(offsetX + args[index] * scale).toFixed(2)} ${(
          baselineY -
          args[index + 1] * scale
        ).toFixed(2)}`;
      switch (command) {
        case 'moveTo':
          return `M${point(0)}`;
        case 'lineTo':
          return `L${point(0)}`;
        case 'quadraticCurveTo':
          return `Q${point(0)} ${point(2)}`;
        case 'bezierCurveTo':
          return `C${point(0)} ${point(2)} ${point(4)}`;
        case 'closePath':
          return 'Z';
        default:
          return '';
      }
    })
    .join('');

const textToPathData = (
  stack: Font[],
  text: string,
  fontSize: number,
  x: number,
  baselineY: number,
  letterSpacing = 0,
) => {
  const segments: string[] = [];
  let cursorX = x;
  for (const character of Array.from(text)) {
    const font = fontForCharacter(stack, character);
    const glyph = font.layout(character).glyphs[0];
    const scale = fontSize / font.unitsPerEm;
    segments.push(
      commandsToPathData(glyph.path.commands, scale, cursorX, baselineY),
    );
    cursorX += (glyph.advanceWidth * fontSize) / font.unitsPerEm + letterSpacing;
  }
  const width = cursorX - x - (text.length ? letterSpacing : 0);
  return { data: segments.join(''), width };
};

const wrapText = (
  value: string,
  locale: Locale,
  fontSize: number,
  maxWidth: number,
  letterSpacing: number,
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
    if (
      line &&
      measureText(serifStack, candidate, fontSize, letterSpacing) > maxWidth
    ) {
      lines.push(line);
      line = unit;
      continue;
    }
    if (
      !line &&
      measureText(serifStack, unit, fontSize, letterSpacing) > maxWidth
    ) {
      const characters = Array.from(unit);
      let characterLine = '';
      for (const character of characters) {
        const characterCandidate = `${characterLine}${character}`;
        if (
          characterLine &&
          measureText(serifStack, characterCandidate, fontSize, letterSpacing) >
            maxWidth
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

const fitTitle = (
  title: string,
  locale: Locale,
  maxWidth: number,
  letterSpacing: number,
) => {
  for (
    let fontSize = locale === 'zh' ? 76 : 82;
    fontSize >= 38;
    fontSize -= 2
  ) {
    const lines = wrapText(title, locale, fontSize, maxWidth, letterSpacing);
    const lineHeight = Math.round(fontSize * (locale === 'zh' ? 1.27 : 1.12));
    if ((lines.length - 1) * lineHeight <= 255) return { fontSize, lines };
  }
  return {
    fontSize: 38,
    lines: wrapText(title, locale, 38, maxWidth, letterSpacing),
  };
};

const titlePaths = (lines: string[], x: number, firstBaseline: number, fontSize: number, lineHeight: number, letterSpacing: number) =>
  lines
    .map((line, index) => {
      const { data } = textToPathData(
        serifStack,
        line,
        fontSize,
        x,
        firstBaseline + index * lineHeight,
        letterSpacing,
      );
      return data;
    })
    .join(' ');

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

const svgFor = ({ locale, title, footer, coverDataUrl: cover }: OgLayout) => {
  const letterSpacing = locale === 'zh' ? 0 : -1;
  const { fontSize, lines } = fitTitle(title, locale, cover ? 660 : 1020, letterSpacing);
  const lineHeight = Math.round(fontSize * (locale === 'zh' ? 1.27 : 1.12));
  const coverMarkup = cover
    ? `<image href="${cover}" x="814" y="176" width="298" height="340" preserveAspectRatio="xMidYMid slice"/>`
    : '';

  // Brand wordmark: serif, with a red dot — each part rendered from its own
  // glyph outlines at the position the previous part ended.
  let brandX = 76;
  const brandParts: string[] = [];
  for (const [part, fill] of [
    ['Will', '#343940'],
    ['.', '#c0392b'],
    ['OPC', '#343940'],
  ] as const) {
    const { data, width } = textToPathData(
      serifStack,
      part,
      28,
      brandX,
      94,
      -0.5,
    );
    brandParts.push(`<path d="${data}" fill="${fill}"/>`);
    brandX += width + (part.length ? -0.5 : 0);
  }

  const titleOutlines = titlePaths(
    lines,
    76,
    265,
    fontSize,
    lineHeight,
    letterSpacing,
  );
  const footerLeft = textToPathData(sansStack, footer, 17, 76, 575);
  const footerRight = textToPathData(
    sansStack,
    'willopc.com',
    17,
    1112 - measureText(sansStack, 'willopc.com', 17),
    575,
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="#ffffff"/>
  ${brandParts.join('\n  ')}
  ${coverMarkup}
  <path d="${titleOutlines}" fill="#343940"/>
  <path d="${footerLeft.data}" fill="#6b7482"/>
  <path d="${footerRight.data}" fill="#6b7482"/>
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

export const renderSiteOg = async (locale: Locale) => {
  const home = await getEntry('home', locale);
  if (!home) throw new Error(`Missing ${locale} opening essay`);
  return renderSvg(
    svgFor({
      locale,
      title: home.data.title,
      kind: 'site',
      footer:
        locale === 'zh'
          ? 'Will · 上海 · 独立开发者'
          : 'Will · Shanghai · Independent developer',
    }),
  );
};

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
