// 按站点实际用字生成中文 Webfont 子集（自托管，运行时零外部请求）。
// 依赖：python -m fontTools.subset（fonttools + brotli，仅构建期使用，不进入运行时）。
// 用法：node scripts/subset-fonts.mjs
// 输出：src/assets/fonts/*.woff2 与 subset-chars.txt（verify-build 用它对缺字做断言）。
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { spawnSync } from 'node:child_process';

const outDir = join('src', 'assets', 'fonts');
mkdirSync(outDir, { recursive: true });

// macOS/部分 Linux 只装了 python3，没有 python 这个别名。
const python = ['python3', 'python'].find(
  (bin) =>
    spawnSync(bin, ['-c', 'import fontTools'], { stdio: 'ignore' }).status ===
    0,
);
if (!python)
  throw new Error('需要 fonttools：python3 -m pip install fonttools brotli');

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(join(dir, entry.name))
      : [join(dir, entry.name)],
  );

const sources = walk(join('src')).filter((file) =>
  ['.md', '.astro', '.ts', '.js'].includes(extname(file)),
);

// ASCII 全量托底（数字、标点、拉丁），再并入源码里出现的所有字符。
const chars = new Set();
for (let code = 0x20; code <= 0x7e; code++)
  chars.add(String.fromCharCode(code));
for (const file of sources)
  for (const char of readFileSync(file, 'utf8'))
    if (char !== '\n' && char !== '\r' && char !== '\t') chars.add(char);

const textFile = join(outDir, 'subset-chars.txt');
writeFileSync(textFile, [...chars].sort().join(''));
console.log(`charset: ${chars.size} characters -> ${textFile}`);

// 衬线只保留在标题（默认仅 h1，变体 b 的 h2/h3 也走同一套子集）：
// 单独出一个「标题子集」，覆盖 dist 里 h1/h2/h3 的用字。
// 没有 dist 时退回全量，运行时只会多下一个后备字体（不会缺字），
// 因此不会因标题改字而破版。
const displayChars = new Set();
for (let code = 0x20; code <= 0x7e; code++)
  displayChars.add(String.fromCharCode(code));
if (existsSync('dist'))
  for (const file of walk('dist').filter((f) => f.endsWith('.html')))
    for (const m of readFileSync(file, 'utf8').matchAll(/<(h1|h2|h3)[^>]*>([\s\S]*?)<\/\1>/g))
      for (const char of m[2].replace(/<[^>]+>/g, ''))
        if (char !== '\n' && char !== '\r' && char !== '\t') displayChars.add(char);
if (displayChars.size <= 95)
  for (const char of chars) displayChars.add(char);
const displayFile = join(outDir, 'display-chars.txt');
writeFileSync(displayFile, [...displayChars].sort().join(''));
console.log(`display charset: ${displayChars.size} characters -> ${displayFile}`);

// 黑体出两个字重：正文 300、界面/标题/元信息 400；衬线仍只有 400。
const jobs = [
  ['noto-serif-sc', 'serif', 400],
  ['noto-sans-sc', 'sans', 400],
  ['noto-sans-sc', 'sans', 300],
];

for (const [pkg, alias, weight] of jobs) {
  const input = join(
    'node_modules',
    '@fontsource',
    pkg,
    'files',
    `${pkg}-chinese-simplified-${weight}-normal.woff2`,
  );
  const output = join(outDir, `${alias}-sc-${weight}.woff2`);
  const result = spawnSync(
    python,
    [
      '-m',
      'fontTools.subset',
      input,
      `--text-file=${textFile}`,
      '--flavor=woff2',
      `--output-file=${output}`,
      '--layout-features=*',
      '--no-hinting',
    ],
    { stdio: 'inherit' },
  );
  if (result.status !== 0) process.exit(result.status ?? 1);
  console.log(
    `${output}: ${(readFileSync(output).length / 1024).toFixed(1)} KB`,
  );
}

// 标题用的宋体子集：只覆盖 h1/h2/h3 用字，字重 400。
const displayInput = join(
  'node_modules',
  '@fontsource',
  'noto-serif-sc',
  'files',
  'noto-serif-sc-chinese-simplified-400-normal.woff2',
);
const displayOutput = join(outDir, 'serif-sc-display-400.woff2');
const displayResult = spawnSync(
  python,
  [
    '-m',
    'fontTools.subset',
    displayInput,
    `--text-file=${displayFile}`,
    '--flavor=woff2',
    `--output-file=${displayOutput}`,
    '--layout-features=*',
  ],
  { stdio: 'inherit' },
);
if (displayResult.status !== 0) process.exit(displayResult.status ?? 1);
console.log(
  `${displayOutput}: ${(readFileSync(displayOutput).length / 1024).toFixed(1)} KB`,
);

