import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';
import { themeConfig } from '../theme/config';

export async function GET() {
  const posts: CollectionEntry<'posts'>[] = await getCollection('posts');
  return rss({
    title: themeConfig.siteName,
    description: themeConfig.description,
    site: themeConfig.siteUrl,
    items: posts.map((post: CollectionEntry<'posts'>) => {
      const d = post.data.pubDate;
      const y = String(d.getFullYear());
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return {
        link: `/posts/${y}/${m}/${day}/${post.slug}/`,
        title: post.data.title,
        pubDate: post.data.pubDate
      };
    })
  });
}
