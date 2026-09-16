import { getCollection } from 'astro:content';
import { contentPath, path, type Locale } from '../i18n';
const preview = import.meta.env.PREVIEW_CONTENT === 'true';
export const visible = (data: { sample: boolean; draft: boolean }) =>
  preview || (!data.sample && !data.draft);
export async function entries(kind: 'writing' | 'projects', locale: Locale) {
  return (await getCollection(kind)).filter(
    (e) => e.data.locale === locale && visible(e.data),
  );
}
export async function translation(
  kind: 'writing' | 'projects',
  key: string | undefined,
  locale: Locale,
) {
  const other = locale === 'en' ? 'zh' : 'en';
  const match =
    key &&
    (await entries(kind, other)).find((e) => e.data.translationKey === key);
  return match
    ? contentPath(other, kind, match.data.slug)
    : path(other);
}
