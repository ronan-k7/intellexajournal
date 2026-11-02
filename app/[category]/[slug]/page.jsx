import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import ClientArticlePage from '@/components/ClientArticlePage';
import { CLIENT_ARTICLE_SLUG } from '@/lib/client-article';
import { buildMetadata } from '@/lib/seo';
import { SITE_NAME, absoluteUrl } from '@/lib/site';
import StoryCard from '@/components/ui/StoryCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { articles, getArticle, getArticles, getCategoryArticles, formatDate, isoDate } from '@/lib/data';

const ACCENT = '#a30d32';

// Renders one block of the article `content` array. Each block is shaped as
// { type: 'paragraph' | 'heading' | 'quote' | 'image', ... } coming straight
// from the JSON data, so the article body can mix text, subheadings, pull
// quotes and inline images in any order the editor set them in.
const renderContent = (item, index) => {
  switch (item.type) {
    case 'paragraph':
      return (
        <p key={index} className="mb-4 font-serif text-[17px] leading-[1.7] text-[#2b2b2b]">
          {item.text}
        </p>
      );

    case 'heading': {
      const Tag = `h${item.level || 2}`;
      return (
        <Tag
          key={index}
          className={`mb-3 mt-8 font-serif font-black leading-tight text-[#111] ${
            item.level === 2 ? 'text-2xl' : 'text-xl'
          }`}
        >
          {item.text}
        </Tag>
      );
    }

    case 'quote':
      return (
        <blockquote key={index} className="my-7 border-y border-[#ddd] py-5 text-center">
          <span aria-hidden="true" className="block font-serif text-[42px] leading-none" style={{ color: ACCENT }}>
            &ldquo;
          </span>
          <p className="mx-auto max-w-[520px] font-serif text-[24px] leading-[1.25] tracking-[-0.01em] text-[#111]">
            {item.text}
          </p>
          {item.author && (
            <footer className="mt-2 font-sans text-[11px] uppercase tracking-[0.06em] text-[#777]">— {item.author}</footer>
          )}
        </blockquote>
      );

    case 'image':
      return (
        <figure key={index} className="my-6">
          <div className="relative h-[270px] w-full overflow-hidden md:h-[420px]">
            <Image
              src={item.src}
              alt={item.alt || ''}
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          {item.caption && (
            <figcaption className="mt-1.5 font-sans text-[10px] text-[#777]">{item.caption}</figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
};

// Builds a best-effort share-intent URL for each platform. Substack and
// Medium don't publish an official "share this link" endpoint the way
// X/Facebook/LinkedIn do, so those two fall back to their compose screens.
function buildShareUrl(platform, article) {
  const pageUrl = absoluteUrl(`/${article.category}/${article.slug}`);
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(article.title);

  switch (platform) {
    case 'x':
      return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case 'substack':
      return `https://substack.com/notes?url=${encodedUrl}&text=${encodedTitle}`;
    case 'medium':
      return `https://medium.com/new-story?url=${encodedUrl}`;
    default:
      return pageUrl;
  }
}

// Small, dependency-free monogram icons so we don't need to pull in an icon
// library just for five badges. Swap for a proper icon set any time.
const SHARE_PLATFORMS = [
  { id: 'x', label: 'Share on X', glyph: '𝕏' },
  { id: 'facebook', label: 'Share on Facebook', glyph: 'f' },
  { id: 'linkedin', label: 'Share on LinkedIn', glyph: 'in' },
  { id: 'substack', label: 'Share on Substack', glyph: 'S' },
  { id: 'medium', label: 'Share on Medium', glyph: 'M' },
];

function ShareRow({ article }) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <span className="mr-1 text-[10px] uppercase tracking-[0.06em] text-[#888]">Share</span>
      {SHARE_PLATFORMS.map(({ id, label, glyph }) => (
        <a
          key={id}
          href={buildShareUrl(id, article)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="grid h-[28px] w-[28px] place-items-center rounded-full border border-[#ccc] bg-white text-[11px] font-bold text-[#333] transition-colors hover:border-[#a30d32] hover:bg-[#a30d32] hover:text-white"
        >
          {glyph}
        </a>
      ))}
    </div>
  );
}

export function generateStaticParams() {
  return articles.map((article) => ({ category: article.category, slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};
  return buildMetadata({
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    path: `/${article.category}/${article.slug}`,
    image: article.image,
    imageAlt: article.imageAlt,
    keywords: article.keywords,
    type: 'article',
    publishedTime: isoDate(article.date),
    modifiedTime: isoDate(article.date),
    section: article.categoryLabel,
    authors: article.byline ? [article.byline.name] : article.author ? [article.author.name] : undefined,
  });
}

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();

  // Special design for the client feature article.
  if (slug === CLIENT_ARTICLE_SLUG) {
    const everything = getArticles();
    const related = (article.relatedSlugs || []).map((s) => everything.find((item) => item.slug === s)).filter(Boolean);
    return <ClientArticlePage article={article} related={related} />;
  }

  const author = article.author;
  const allArticles = getArticles();
  const categoryArticles = getCategoryArticles(category); // sorted newest → oldest, includes current
  const inSection = categoryArticles.filter((item) => item.slug !== article.slug);
  const more = inSection.slice(0, 3);
  const popular = allArticles.filter((item) => item.slug !== article.slug).slice(0, 5);
  const published = formatDate(article.date);
  const content = article.content || [];
  const articleUrl = absoluteUrl(`/${article.category}/${article.slug}`);

  // Previous/next within the same category, based on publish order.
  const currentIndex = categoryArticles.findIndex((item) => item.slug === article.slug);
  const prevArticle = currentIndex > 0 ? categoryArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex >= 0 && currentIndex < categoryArticles.length - 1 ? categoryArticles[currentIndex + 1] : null;

  return (
    <main className="bg-white">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
        url: articleUrl,
        headline: article.title.slice(0, 110),
        description: article.metaDescription || article.excerpt,
        image: [absoluteUrl(article.image)],
        datePublished: isoDate(article.date),
        dateModified: isoDate(article.date),
        articleSection: article.categoryLabel,
        keywords: Array.isArray(article.keywords) ? article.keywords.join(', ') : undefined,
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        author: author
          ? { '@type': 'Organization', name: author.name, url: absoluteUrl('/') }
          : { '@type': 'Organization', name: SITE_NAME },
        publisher: {
          '@type': 'NewsMediaOrganization',
          name: SITE_NAME,
          url: absoluteUrl('/'),
          logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png'), width: 512, height: 512 },
        },
      }} />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1120px] w-[min(1120px,calc(100%-40px))] pt-5">
        <Breadcrumbs
          className="text-[10px] uppercase tracking-[0.06em] text-gray-600 [&_a:hover]:text-[#111]"
          items={[
            { name: 'Home', path: '/' },
            { name: article.categoryLabel, path: `/${article.category}` },
            { name: article.title, path: `/${article.category}/${article.slug}` },
          ]}
        />
      </div>

      {/* Title + hero image, side by side on desktop */}
      <header className="mx-auto max-w-[1120px] w-[min(1120px,calc(100%-40px))] pt-4 pb-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <Link
              href={`/${article.category}`}
              className="inline-block text-[10px] font-extrabold uppercase tracking-[0.09em]"
              style={{ color: ACCENT }}
            >
              {article.categoryLabel}
            </Link>
            <h1 className="my-3 font-serif text-[34px] font-black leading-[1.05] tracking-[-0.02em] text-[#111] sm:text-[46px]">
              {article.title}
            </h1>
            <p className="max-w-[540px] font-serif text-[14px] leading-[1.5] text-[#555]">{article.excerpt}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-[#777]">
              <span>{published}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
              {author && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    By <strong className="font-bold text-[#111]">{author.name}</strong>
                  </span>
                </>
              )}
            </div>

            <ShareRow article={article} />
          </div>

          <figure className="m-0">
            <div className="relative h-[200px] w-full overflow-hidden sm:h-[260px] lg:h-[300px]">
              <Image
                src={article.image}
                alt={article.imageAlt || ''}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-1.5 font-sans text-[10px] text-[#777]">{article.imageAlt || SITE_NAME}</figcaption>
          </figure>
        </div>
      </header>

      {/* Sidebar (newsroom + popular) + main content */}
      <div className="mx-auto flex max-w-[1120px] w-[min(1120px,calc(100%-40px))] flex-col-reverse gap-8 border-t border-[#eee] pb-14 pt-8 lg:flex-row">
        <aside className="lg:w-[260px] lg:shrink-0">
          {/* Wrapping author card + popular list in a single sticky block
              (rather than making the author card sticky on its own) keeps
              them moving together, so the popular list can never scroll up
              and overlap the pinned author card. */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-6">
            {author && (
              <div className="rounded-md border border-[#e2e2df] bg-[#f7f7f5] p-3.5 shadow-sm">
                <span className="text-[9px] font-extrabold uppercase tracking-[0.08em]" style={{ color: ACCENT }}>Newsroom</span>
                <div className="mt-1.5 flex items-center gap-2.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#111] font-serif text-[14px] font-bold text-white" aria-hidden="true">{author.initials}</span>
                  <strong className="block font-serif text-[15px] leading-tight">{author.name}</strong>
                </div>
                <p className="mt-2 line-clamp-4 font-serif text-[12.5px] leading-[1.45] text-[#555]">{author.bio}</p>
              </div>
            )}

            <div className="border-t-2 border-[#111] pt-3">
              <span className="mb-2 inline-block bg-[#111] px-2 text-[11px] font-extrabold uppercase text-white">Popular</span>
              <div className="flex flex-col divide-y divide-[#eee]">
                {popular.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${item.category}/${item.slug}`}
                    className="group flex items-center gap-3 py-3 first:pt-2"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="block text-[9.5px] font-extrabold uppercase tracking-[0.08em]" style={{ color: ACCENT }}>
                        {item.categoryLabel}
                      </span>
                      <span className="mt-1 block font-serif text-[13.5px] leading-[1.3] text-[#111] group-hover:underline">
                        {item.title}
                      </span>
                    </div>
                    <div className="relative h-14 w-16 shrink-0 overflow-hidden bg-[#e7e7e4]">
                      <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <article className="min-w-0 lg:flex-1">
          {content.map((item, index) => renderContent(item, index))}

          {article.keywords?.length > 0 && (
            <div className="mb-2 mt-6 flex flex-wrap gap-2 border-t border-[#eee] pt-4">
              {article.keywords.slice(0, 8).map((keyword) => (
                <span key={keyword} className="border border-[#ddd] px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.03em] text-[#666]">{keyword}</span>
              ))}
            </div>
          )}

          <div className="mt-2 text-center" style={{ color: ACCENT }}>◆</div>

          {(prevArticle || nextArticle) && (
            <div className={`mt-8 grid grid-cols-1 gap-4 pb-4 ${prevArticle && nextArticle ? 'sm:grid-cols-2' : ''}`}>
              {prevArticle && (
                <Link
                  href={`/${prevArticle.category}/${prevArticle.slug}`}
                  className={`group flex flex-col gap-1.5 rounded-lg bg-[#f7f7f5] p-5 shadow-sm transition-shadow hover:shadow-md ${
                    nextArticle ? '' : 'sm:mx-auto sm:max-w-[420px] sm:items-center sm:text-center'
                  }`}
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: ACCENT }}>← Previous</span>
                  <span className="font-serif text-[15px] leading-[1.3] text-[#111] group-hover:underline">{prevArticle.title}</span>
                </Link>
              )}
              {nextArticle && (
                <Link
                  href={`/${nextArticle.category}/${nextArticle.slug}`}
                  className={`group flex flex-col gap-1.5 rounded-lg bg-[#f7f7f5] p-5 shadow-sm transition-shadow hover:shadow-md ${
                    prevArticle ? 'sm:items-end sm:text-right' : 'sm:mx-auto sm:max-w-[420px] sm:items-center sm:text-center'
                  }`}
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: ACCENT }}>Next →</span>
                  <span className="font-serif text-[15px] leading-[1.3] text-[#111] group-hover:underline">{nextArticle.title}</span>
                </Link>
              )}
            </div>
          )}
        </article>
      </div>

      {more.length > 0 && (
        <section className="mx-auto max-w-[1120px] w-[min(1120px,calc(100%-40px))] pb-16">
          <SectionHeading title={`More from ${article.categoryLabel}`} href={`/${article.category}`} tone="black" />
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {more.map((item) => <StoryCard key={item.slug} article={item} variant="card" />)}
          </div>
        </section>
      )}
    </main>
  );
}