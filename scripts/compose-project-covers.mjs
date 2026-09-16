import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const outputDir = fileURLToPath(new URL('../public/images/covers/', import.meta.url));

const products = [
  {
    key: 'yipa',
    number: '01',
    label: 'YIPA',
    theme: {
      base: '#eee9e3',
      wash: '#f7f4ef',
      accent: '#b96f5b',
      accentSoft: '#d8a593',
      ink: '#564b45',
    },
    locales: {
      zh: '/Users/c2hy/Desktop/repos/yipa/yipa-app/screenshots/iphone/zh/iphone_zh_mood_list.png',
      en: '/Users/c2hy/Desktop/repos/yipa/yipa-app/screenshots/iphone/en/iphone_en_mood_list.png',
    },
  },
  {
    key: 'huddle',
    number: '02',
    label: 'HUDDLE',
    theme: {
      base: '#e5e9e8',
      wash: '#f3f4f0',
      accent: '#d56c45',
      accentSoft: '#78909b',
      ink: '#334650',
    },
    locales: {
      shared: fileURLToPath(new URL('../p1.PNG', import.meta.url)),
    },
  },
  {
    key: 'tablow',
    number: '03',
    label: 'TABLOW',
    theme: {
      base: '#e8eff1',
      wash: '#f5f7f5',
      accent: '#ff6b52',
      accentSoft: '#39a6d8',
      ink: '#243d48',
    },
    locales: {
      zh: '/Users/c2hy/Desktop/repos/tablow/tablow-site/public/screenshots/home-zh.png',
      en: '/Users/c2hy/Desktop/repos/tablow/tablow-site/public/screenshots/home-en.png',
    },
  },
];

const topRoundedMask = (width, height, radius) =>
  Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><path d="M${radius} 0H${width - radius}Q${width} 0 ${width} ${radius}V${height}H0V${radius}Q0 0 ${radius} 0Z" fill="white"/></svg>`,
  );

async function screenshotPanel(file) {
  const width = 650;
  const height = 760;
  const image = await sharp(file)
    .resize({ width })
    .extract({ left: 0, top: 0, width, height })
    .ensureAlpha()
    .composite([{ input: topRoundedMask(width, height, 50), blend: 'dest-in' }])
    .png()
    .toBuffer();
  return { input: image };
}

function background({ number, label, theme }) {
  return Buffer.from(`
    <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="base" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="${theme.wash}"/>
          <stop offset="1" stop-color="${theme.base}"/>
        </linearGradient>
        <radialGradient id="orbA">
          <stop stop-color="${theme.accent}" stop-opacity=".42"/>
          <stop offset="1" stop-color="${theme.accent}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="orbB">
          <stop stop-color="${theme.accentSoft}" stop-opacity=".34"/>
          <stop offset="1" stop-color="${theme.accentSoft}" stop-opacity="0"/>
        </radialGradient>
        <filter id="grain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="3" seed="8"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer><feFuncA type="table" tableValues="0 .055"/></feComponentTransfer>
        </filter>
      </defs>
      <rect width="1200" height="800" fill="url(#base)"/>
      <circle cx="120" cy="116" r="290" fill="url(#orbA)"/>
      <circle cx="252" cy="688" r="330" fill="url(#orbB)"/>
      <path d="M74 229H316" stroke="${theme.ink}" stroke-opacity=".24"/>
      <text x="72" y="118" fill="${theme.ink}" font-family="Inter, Helvetica, Arial, sans-serif" font-size="17" font-weight="600" letter-spacing="4">${number} / 03</text>
      <text x="70" y="198" fill="${theme.ink}" font-family="Inter, Helvetica, Arial, sans-serif" font-size="42" font-weight="650" letter-spacing="5">${label}</text>
      <circle cx="83" cy="694" r="7" fill="${theme.accent}"/>
      <circle cx="111" cy="694" r="7" fill="${theme.accentSoft}"/>
      <circle cx="139" cy="694" r="7" fill="${theme.ink}" fill-opacity=".72"/>
      <path d="M70 737H316" stroke="${theme.ink}" stroke-opacity=".16"/>
      <rect width="1200" height="800" filter="url(#grain)" opacity=".55"/>
    </svg>
  `);
}

async function writeCover(product, locale, file) {
  const panel = await screenshotPanel(file);
  const name = product.key === 'huddle' ? 'huddle.png' : `${product.key}-${locale}.png`;
  await sharp(background(product))
    .composite([{ input: panel.input, left: 430, top: 55 }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(`${outputDir}${name}`);
}

await mkdir(outputDir, { recursive: true });
for (const product of products) {
  for (const [locale, file] of Object.entries(product.locales)) {
    await writeCover(product, locale, file);
  }
}
