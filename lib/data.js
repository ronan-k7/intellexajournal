import articlesData from '@/public/data/articles.json';
import authorsData from '@/public/data/authors.json';

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

// ── Authors ──────────────────────────────────────────────────────────────────
// Authors are stored one-per-category in public/data/authors.json.
// Each author gets a URL-friendly `slug` derived from their name (e.g.
// "Conor Bradley" -> "conor-bradley"), used for /author/[slug] routes instead
// of the underlying category key.

export function slugify(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getAuthorByCategory(category) {
  const entry = authorsData.categories.find(
    (c) => c.category.toLowerCase() === String(category).toLowerCase()
  );
  return entry
    ? { ...entry.author, category: entry.category, slug: entry.author.slug || slugify(entry.author.name) }
    : null;
}

export const authors = authorsData.categories.map((c) => ({
  ...c.author,
  category: c.category,
  slug: c.author.slug || slugify(c.author.name),
}));

export function getAuthor(slugOrCategoryOrId) {
  // Accept an author slug (preferred), a category slug, or an author id.
  const key = String(slugOrCategoryOrId).toLowerCase();
  const bySlug = authors.find((a) => a.slug.toLowerCase() === key);
  if (bySlug) return bySlug;
  const byCategory = getAuthorByCategory(slugOrCategoryOrId);
  if (byCategory) return byCategory;
  return authors.find((a) => String(a.id) === String(slugOrCategoryOrId)) || null;
}

export function getAuthorArticles(category) {
  return getCategoryArticles(category);
}

// ── Articles ─────────────────────────────────────────────────────────────────
// Articles are stored keyed by category in public/data/articles.json.

function withAuthor(article, category) {
  return { ...article, category, author: getAuthorByCategory(category) };
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