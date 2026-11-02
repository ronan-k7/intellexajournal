# Intellexa Journal — Next.js news site (www.intellexajournal.com)

A JavaScript-only, JSON-driven news website inspired by the supplied editorial layouts. The homepage, category pages, author profiles and article pages all share a responsive visual system while keeping their own page-specific composition.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Content model

- `public/data/articles.json` contains every article, including body sections and key takeaways.
- `public/data/authors.json` contains author profiles.
- The `json` directory intentionally contains only those two requested files.
- Articles automatically appear newest-first on the homepage.

## Routes

- `/` — homepage
- `/[category]` — category page, for example `/sport`
- `/[category]/[slug]` — article detail page
- `/author/[slug]` — author profile

## Important project structure

```text
app/
  [category]/
    [slug]/page.jsx
    page.jsx
  author/[slug]/page.jsx
  globals.css
  layout.jsx
  page.jsx
components/
  home/
    Featured.jsx
    HomePage.jsx
    LatestVideo.jsx
    LeadNews.jsx
    Newsletter.jsx
    OpinionStrip.jsx
    Sponsored.jsx
    TopicSection.jsx
  ui/
    SectionHeading.jsx
    StoryCard.jsx
  Footer.jsx
  Header.jsx
  JsonLd.jsx
json/
  articel.json
  author.json
lib/
  data.js
```

## SEO and performance

The project includes route metadata, Open Graph data, NewsArticle structured data, a sitemap, robots configuration, static parameter generation, optimized `next/image` media, semantic landmarks and restrained client-side JavaScript. The production domain (`https://www.intellexajournal.com`) and brand name live in `lib/site.js` (and `scripts/generate-seo-files.mjs` for the static sitemap/robots files).

- `lib/seo.js` — `buildMetadata()` (canonical, Open Graph, Twitter card) + JSON-LD builders.
- `components/Breadcrumbs.jsx` — visible breadcrumbs + `BreadcrumbList` JSON-LD.
- Sitewide JSON-LD: `NewsMediaOrganization` + `WebSite` (layout). Per page: `CollectionPage` (home/category), `NewsArticle` (article), `ProfilePage` (author).
- `public/robots.txt` and `public/sitemap.xml` are generated from the JSON data by `npm run seo` and automatically before every `npm run build`.
- Default social image: `public/og-default.png` (1200x630). Publisher logo: `public/logo.png`.
