import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      pubDate: z.coerce.date().optional(),
      date: z.coerce.date().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false)
    })
    .refine((d) => d.pubDate || d.date, { message: 'pubDate or date is required' })
    .transform((d) => ({ ...d, pubDate: d.pubDate ?? d.date! }))
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = { posts, pages };
