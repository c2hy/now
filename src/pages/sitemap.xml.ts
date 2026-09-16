import { getCollection } from 'astro:content';
import { contentPath, locales, path, sectionPath } from '../i18n';
import { profile } from '../data/profile';
import { visible } from '../utils/content';

export const prerender = true;

const escapeXml = (value: string) =>
  value.replace(
    /[<>&'\"]/g,
    (character) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        "'": '&apos;',
        '"': '&quot;',
      })[character] ?? character,
  );

export async function GET() {
  const urls: { loc: string; lastmod?: string }[] = [];
  const writing = await getCollection('writing');
  const projects = await getCollection('projects');

  for (const locale of locales) {
    urls.push({ loc: new URL(path(locale), profile.site).href });
    for (const section of ['writing', 'projects', 'about'] as const)
      urls.push({
        loc: new URL(sectionPath(locale, section), profile.site).href,
      });

    for (const entry of writing.filter(
      (item) => item.data.locale === locale && visible(item.data),
    ))
      urls.push({
        loc: new URL(
          contentPath(locale, 'writing', entry.data.slug),
          profile.site,
        ).href,
        lastmod: (entry.data.updatedAt ?? entry.data.publishedAt).toISOString(),
      });

    for (const entry of projects.filter(
      (item) => item.data.locale === locale && visible(item.data),
    ))
      urls.push({
        loc: new URL(
          contentPath(locale, 'projects', entry.data.slug),
          profile.site,
        ).href,
      });
  }

  const body = urls
    .map(
      ({ loc, lastmod }) =>
        `  <url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
