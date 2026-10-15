import { resolve } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceRoot = resolve(
  root,
  '../production-management/products/tablow/assets/store/2026-10-15-store-2.1.1/aso/horizontal',
);
const width = 1200;
const height = 600;

for (const locale of ['zh', 'en']) {
  const source = resolve(sourceRoot, locale, 'google-play-1024x500.png');
  const png = resolve(root, `public/images/projects/tablow-2.1.1-${locale}.png`);
  const webp = resolve(root, `public/images/project-covers/tablow-2.1.1-${locale}.webp`);
  const image = sharp(source).resize(width, height, {
    fit: 'cover',
    position: 'centre',
  });

  await image.clone().png().toFile(png);
  await image.clone().webp({ quality: 94 }).toFile(webp);

  for (const output of [png, webp]) {
    const metadata = await sharp(output).metadata();
    if (metadata.width !== width || metadata.height !== height)
      throw new Error(`${output} has unexpected dimensions ${metadata.width}x${metadata.height}`);
  }

  console.log(`${locale}: ${png} and ${webp} (${width}x${height})`);
}
