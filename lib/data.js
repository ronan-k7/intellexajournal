import articlesData from '@/public/data/articles.json';

// ── Date helpers ─────────────────────────────────────────────────────────────
// Articles store `date` as "DD/MM/YYYY".

export function parseDate(str) {
  const [d, m, y] = str.split('/');
  return new Date(Number(y), Number(m) - 1, Number(d));
}

// "DD/MM/YYYY" -> "YYYY-MM-DD" (timezone-safe, for sitemap + JSON-LD)
export function isoDate(str) {
  const [d, m, y] = str.split('/');
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

export function formatDate(str) {
  return parseDate(str).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// ── Byline ───────────────────────────────────────────────────────────────────
// Every article is published under the newsroom byline (no individual authors).

export const STAFF = {
  name: 'Intellexa Journal Staff',
  initials: 'IJ',
  bio: 'Our editorial team reports on the stories that shape American life, with a focus on accountability and the institutions behind them.',
};

export function slugify(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── Articles ─────────────────────────────────────────────────────────────────
// Articles are stored keyed by category in public/data/articles.json.

function withAuthor(article, category) {
  return { ...article, category, author: STAFF };
}

export function getArticles() {
  const all = [];
  for (const [category, list] of Object.entries(articlesData)) {
    if (!Array.isArray(list)) continue;
    for (const article of list) {
      if (article.isPublished === false || article.isPublished === 'false') continue;
      all.push(withAuthor(article, category));
    }
  }
  return all.sort((a, b) => parseDate(b.date) - parseDate(a.date));
}

export function getArticle(category, slug) {
  const list = articlesData[category] || [];
  const article = list.find((a) => a.slug === slug);
  return article ? withAuthor(article, category) : null;
}

export function getCategoryArticles(category) {
  const list = articlesData[category] || [];
  return list
    .filter((a) => a.isPublished !== false && a.isPublished !== 'false')
    .map((a) => withAuthor(a, category))
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));
}

export const articles = getArticles();

export const categories = Object.keys(articlesData);

// ── Category nav ─────────────────────────────────────────────────────────────
// Builds a display label for each category straight from the article data
// (falls back to a title-cased version of the slug if none is found).

export function getCategoryLabel(category) {
  const list = articlesData[category];
  if (list && list[0] && list[0].categoryLabel) return list[0].categoryLabel;
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const categoryList = categories.map((category) => ({
  slug: category,
  label: getCategoryLabel(category),
}));