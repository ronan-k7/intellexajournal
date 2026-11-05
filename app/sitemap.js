import { getArticles, categories, getCategoryArticles, isoDate } from '@/lib/data';
import { STATIC_PATHS, LAST_UPDATED } from '@/lib/static-pages.mjs';
import { SITE_URL } from '@/lib/site';

// Served automatically at /sitemap.xml. Built from public/data/articles.json,
// so every new/unpublished article is reflected on the next build.
export const dynamic = 'force-static';

export default function sitemap() {
  const articles = getArticles(); // published only, newest first

  // Newest article date across the whole site (used for the homepage).
  const newest = articles.length ? isoDate(articles[0].date) : LAST_UPDATED;

  // Home
  const home = {
    url: SITE_URL,
    lastModified: newest,
    changeFrequency: 'daily',
    priority: 1.0,
  };

  // Category pages (lastmod = newest published article in that category)
  const categoryPages = categories
    .map((category) => {
      const list = getCategoryArticles(category); // already sorted newest first
      if (!list.length) return null;
      return {
        url: `${SITE_URL}/${category}`,
        lastModified: isoDate(list[0].date),
        changeFrequency: 'daily',
        priority: 0.8,
      };
    })
    .filter(Boolean);

  // Static + policy pages
  const staticPages = STATIC_PATHS.map((p) => {
    const isPolicy = p.startsWith('/policies/');
    return {
      url: `${SITE_URL}${p}`,
      lastModified: LAST_UPDATED,
      changeFrequency: isPolicy ? 'yearly' : 'monthly',
      priority: isPolicy ? 0.3 : 0.5,
    };
  });

  // Articles
  const articlePages = articles.map((a) => ({
    url: `${SITE_URL}/${a.category}/${a.slug}`,
    lastModified: isoDate(a.date),
    changeFrequency: 'weekly',
    priority: 0.7,
    ...(a.image ? { images: [a.image.startsWith('http') ? a.image : `${SITE_URL}${a.image}`] } : {}),
  }));

  return [home, ...categoryPages, ...staticPages, ...articlePages];
}