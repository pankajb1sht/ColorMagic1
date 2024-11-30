import { writeFileSync } from 'fs';
import { resolve } from 'path';

const baseUrl = 'https://colormagic.link';

const pages = [
  '',
  '/image-extractor',
  '/random-palette',
  '/background-removal',
  '/blog',
  '/blog/color-psychology-in-design',
  '/blog/color-accessibility-guide',
  '/blog/color-trends-2024'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    </url>
  `).join('')}
</urlset>`;

writeFileSync(resolve(process.cwd(), 'public/sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');