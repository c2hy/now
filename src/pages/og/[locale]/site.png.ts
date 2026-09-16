import type { APIRoute } from 'astro';
import { locales, type Locale } from '../../../i18n';
import { OG_CONTENT_TYPE, renderSiteOg } from '../../../utils/og';

export function getStaticPaths() {
  return locales.map((locale) => ({ params: { locale }, props: { locale } }));
}

export const GET = (async ({ props }) => {
  const image = await renderSiteOg(props.locale as Locale);
  return new Response(image, {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Type': OG_CONTENT_TYPE,
    },
  });
}) satisfies APIRoute;
