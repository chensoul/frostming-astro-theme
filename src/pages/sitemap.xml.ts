import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { themeConfig } from '../theme/config';

const site = themeConfig.siteUrl.replace(/\/$/, '');

export const GET: APIRoute = async () => {
  const posts: CollectionEntry<'posts'>[] = (await getCollection('posts')).filter((p: CollectionEntry<'posts'>) => !p.data.draft);
  const tags = Array.from(
    new Set(
      posts
        .map((p) => p.data.tags || [])
        .flat()
        .filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
    )
  );

  const urls: { loc: string; lastmod?: string; changefreq?: string; priority?: string }[] = [
    { loc: `${site}/`, changefreq: 'daily', priority: '1.0' },
    { loc: `${site}/archive/`, changefreq: 'weekly', priority: '0.6' },
    { loc: `${site}/tags/`, changefreq: 'weekly', priority: '0.6' },
    { loc: `${site}/links/`, changefreq: 'monthly', priority: '0.4' },
    { loc: `${site}/about/`, changefreq: 'monthly', priority: '0.4' }
  ];

  posts.forEach(({ slug, data }) => {
    urls.push({
      loc: `${site}/posts/${String(data.pubDate.getFullYear())}/${String(data.pubDate.getMonth() + 1).padStart(2, '0')}/${String(data.pubDate.getDate()).padStart(2, '0')}/${slug}/`,
      lastmod: data.pubDate?.toISOString()
    });
  });

  tags.forEach((t) => {
    urls.push({ loc: `${site}/tags/${encodeURIComponent(t)}/`, changefreq: 'weekly', priority: '0.5' });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `<url>
  <loc>${u.loc}</loc>${u.lastmod ? `\n  <lastmod>${u.lastmod}</lastmod>` : ''}${
      u.changefreq ? `\n  <changefreq>${u.changefreq}</changefreq>` : ''
    }${u.priority ? `\n  <priority>${u.priority}</priority>` : ''}
</url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
