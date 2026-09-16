import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { visible } from '../../../../utils/content';
import { OG_CONTENT_TYPE, renderArticleOg } from '../../../../utils/og';

export async function getStaticPaths() {
  const entries = await getCollection('writing');
  return entries
    .filter((entry) => visible(entry.data))
    .map((entry) => ({
      params: { locale: entry.data.locale, slug: entry.data.slug },
      props: { entry },
    }));
}

export const GET = (async ({ props }) => {
  const image = await renderArticleOg(props.entry.data);
  return new Response(image, {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Type': OG_CONTENT_TYPE,
    },
  });
}) satisfies APIRoute;
