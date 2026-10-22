import sansCss from '@fontsource-variable/noto-sans-sc/wght.css?raw';
import serifCss from '@fontsource-variable/noto-serif-sc/wght.css?raw';

const assets = import.meta.glob<string>(
  '../../node_modules/@fontsource-variable/noto-{sans,serif}-sc/files/*-wght-normal.woff2',
  { eager: true, query: '?url', import: 'default' },
);

const faces = [
  { name: 'noto-sans-sc', css: sansCss },
  { name: 'noto-serif-sc', css: serifCss },
].flatMap(({ name, css }) =>
  [...css.matchAll(/@font-face\s*\{[^}]+\}/g)].map(([rule]) => {
    const ranges = rule.match(/unicode-range:\s*([^;]+);/)?.[1];
    if (!ranges) throw new Error(`Missing unicode ranges in ${name}`);
    const coverage = ranges.split(',').map((range) => {
      const [first, last = first] = range.trim().slice(2).split('-');
      return [parseInt(first, 16), parseInt(last, 16)] as const;
    });
    const styles = rule.replace(/url\(\.\/files\/([^)]*)\)/g, (_, file) => {
      const asset =
        assets[`../../node_modules/@fontsource-variable/${name}/files/${file}`];
      if (!asset) throw new Error(`Missing font asset: ${name}/${file}`);
      return `url("${asset}")`;
    });
    return { coverage, styles };
  }),
);

// Keep the original fonts and Unicode fallback behavior, but only declare
// subsets that can be used by this page's visible text.
export function chineseFontStyles(text: string): string {
  // Astro escapes some text as numeric HTML entities before rendering a slot.
  const decoded = text.replace(
    /&#(x[\da-f]+|\d+);/gi,
    (entity, value: string) => {
      const code =
        value[0].toLowerCase() === 'x'
          ? parseInt(value.slice(1), 16)
          : parseInt(value, 10);
      return code <= 0x10ffff ? String.fromCodePoint(code) : entity;
    },
  );
  const characters = [
    ...new Set([...decoded].map((char) => char.codePointAt(0)!)),
  ];
  return faces
    .flatMap(({ coverage, styles }) => {
      const used = characters.filter((code) =>
        coverage.some(([first, last]) => code >= first && code <= last),
      );
      if (!used.length) return [];
      return [
        styles.replace(
          /unicode-range:\s*[^;]+;/,
          `unicode-range: ${used.map((code) => `U+${code.toString(16)}`).join(',')};`,
        ),
      ];
    })
    .join('\n');
}
