import type { APIRoute } from 'astro';
import { themeConfig } from '../theme/config';

export const GET: APIRoute = async () => {
  const site = themeConfig.siteUrl.replace(/\/$/, '');
  const content = `User-agent: *
Allow: /
Sitemap: ${site}/sitemap.xml
`;
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
