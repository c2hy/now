import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { writingCategorySlugs } from './i18n';
const base = {
  locale: z.enum(['en', 'zh']),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  translationKey: z.string().optional(),
  sample: z.boolean().default(false),
  draft: z.boolean().default(false),
};
const image = z.object({ src: z.string(), alt: z.string().min(1) });
const writing = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
    base: './src/content/writing',
  }),
  schema: z.object({
    ...base,
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    order: z.number().optional(),
    category: z.enum(writingCategorySlugs),
    cover: image.optional(),
  }),
});
const projects = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
    base: './src/content/projects',
  }),
  schema: z.object({
    ...base,
    name: z.string(),
    description: z.string(),
    statement: z.string(),
    translationKey: z.string(),
    year: z.number(),
    order: z.number(),
    featured: z.boolean(),
    status: z.enum(['active', 'maintained', 'archived']).optional(),
    hero: image,
    gallery: z
      .array(image.extend({ caption: z.string().optional() }))
      .optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.url({ protocol: /^https$/ }),
          type: z.enum(['website', 'app-store', 'google-play', 'other']),
        }),
      )
      .default([]),
  }),
});
export const collections = { writing, projects };
