// Generates public/robots.txt and public/sitemap.xml from the JSON data.
// Runs automatically before `npm run build` (prebuild) — or run `npm run seo`.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { STATIC_PATHS, LAST_UPDATED } from '../lib/static-pages.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://www.intellexajournal.com';

const articlesData = JSON.parse(readFileSync(path.join(root, 'public/data/articles.json'), 'utf8'));
const authorsData = JSON.parse(readFileSync(path.join(root, 'public/data/authors.json'), 'utf8'));

const slugify = (v) =>
  String(v).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const iso = (s) => { const [d, m, y] = s.split('/'); return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`; };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const published = (a) => a.isPublished !== false && a.isPublished !== 'false';

const cats = Object.keys(articlesData).filter((c) => Array.isArray(articlesData[c]));
const urls = [];
const latest = {};
let newest = '1970-01-01';

for (const c of cats) {
  for (const a of articlesData[c].filter(published)) {
    const d = iso(a.date);
    if (!latest[c] || d > latest[c]) latest[c] = d;
    if (d > newest) newest = d;
    urls.push({ loc: `${SITE_URL}/${c}/${a.slug}`, lastmod: d, changefreq: 'weekly', priority: '0.7',
      image: a.image ? `${SITE_URL}${a.image}` : null, imageTitle: a.title });
  }
}

const pages = [
  { loc: SITE_URL, lastmod: newest, changefreq: 'daily', priority: '1.0' },
  ...cats.map((c) => ({ loc: `${SITE_URL}/${c}`, lastmod: latest[c], changefreq: 'daily', priority: '0.8' })),
  ...STATIC_PATHS.map((p) => ({
    loc: `${SITE_URL}${p}`, lastmod: LAST_UPDATED,
    changefreq: p.startsWith('/policies/') ? 'yearly' : 'monthly',
    priority: p.startsWith('/policies/') ? '0.3' : '0.5',
  })),
  ...urls,
  ...authorsData.categories.map((c) => ({
    loc: `${SITE_URL}/author/${c.author.slug || slugify(c.author.name)}`,
    lastmod: latest[c.category] || newest, changefreq: 'weekly', priority: '0.5',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map((p) => `  <url>
    <loc>${esc(p.loc)}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>${p.image ? `
    <image:image>
      <image:loc>${esc(p.image)}</image:loc>
      <image:title>${esc(p.imageTitle)}</image:title>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>
`;

const robots = `# Intellexa Journal — robots.txt
User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;

// ── RSS feed (20 newest articles) ──
const rssDate = (s) => new Date(`${iso(s)}T12:00:00Z`).toUTCString();
const all = cats.flatMap((c) => articlesData[c].filter(published).map((a) => ({ ...a, _c: c })))
  .sort((a, b) => iso(b.date).localeCompare(iso(a.date))).slice(0, 20);
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Intellexa Journal</title>
    <link>${SITE_URL}</link>
    <description>Independent local reporting: world, U.S., business, finance, politics, health, technology and investigations.</description>
    <language>en-us</language>
    <lastBuildDate>${rssDate(all[0].date)}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${all.map((a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${SITE_URL}/${a._c}/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/${a._c}/${a.slug}</guid>
      <pubDate>${rssDate(a.date)}</pubDate>
      <category>${esc(a.categoryLabel || a._c)}</category>
      <description>${esc(a.excerpt || a.metaDescription || '')}</description>
    </item>`).join('\n')}
  </channel>
</rss>
`;
writeFileSync(path.join(root, 'public/feed.xml'), feed);
writeFileSync(path.join(root, 'public/sitemap.xml'), xml);
writeFileSync(path.join(root, 'public/robots.txt'), robots);
console.log(`SEO files written: ${pages.length} URLs -> public/sitemap.xml, public/robots.txt, public/feed.xml`);
