import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const SITE = process.env.PUBLIC_SITE || 'http://localhost:4321';

export default defineConfig({
  site: SITE,
  integrations: [
    tailwind({
      applyBaseStyles: true
    })
  ],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor-link'] },
          content: {
            type: 'element',
            tagName: 'span',
            properties: { className: ['icon', 'icon-link'] }
          }
        }
      ] as any
    ]
  }
});
