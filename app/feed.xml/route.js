import { getArticles, isoDate } from '@/lib/data';
import { SITE_NAME, SITE_URL } from '@/lib/site';

// Served automatically at /feed.xml. Built from public/data/articles.json.
// (Next.js route handlers must be named route.js — the folder name "feed.xml"
// is what makes the URL /feed.xml.)
export const dynamic = 'force-static';

const FEED_LIMIT = 20;
const FEED_DESCRIPTION =
  'Independent local reporting: world, U.S., business, finance, politics, health, technology and investigations.';

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// "DD/MM/YYYY" -> RFC-822 date (noon UTC, so it never shifts day by timezone)
const rssDate = (str) => new Date(`${isoDate(str)}T12:00:00Z`).toUTCString();

export function GET() {
  const items = getArticles().slice(0, FEED_LIMIT); // published only, newest first
  const lastBuildDate = items.length ? rssDate(items[0].date) : new Date().toUTCString();

  const itemsXml = items
    .map((a) => {
      const link = `${SITE_URL}/${a.category}/${a.slug}`;
      return `    <item>
      <title>${esc(a.title)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="true">${esc(link)}</guid>
      <pubDate>${rssDate(a.date)}</pubDate>
      <category>${esc(a.categoryLabel || a.category)}</category>
      <description>${esc(a.excerpt || a.metaDescription || '')}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${esc(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}