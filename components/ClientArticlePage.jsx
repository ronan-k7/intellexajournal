
import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, CalendarDays, Handshake, Mail, Scale, Users } from 'lucide-react';
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaQuoteLeft } from 'react-icons/fa6';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import CopyLinkButton from '@/components/CopyLinkButton';
import StickySidebar from '@/components/StickySidebar';
import { parseDate, isoDate } from '@/lib/data';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

const RED = '#d0111b';

const longDate = (d) =>
  parseDate(d).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

const shortDate = (d) =>
  parseDate(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();

// Two interlocked rings
function RingsIcon({ className, style }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="11.5" cy="20" r="8" />
      <circle cx="20.5" cy="20" r="8" />
      <path d="M9 7.5 11.5 4l2.5 3.5-2.5 3z" />
    </svg>
  );
}

const ICONS = {
  scale: Scale,
  handshake: Handshake,
  briefcase: Briefcase,
  calendar: CalendarDays,
  people: Users,
  rings: RingsIcon,
};

function Avatar({ initials, size = 'h-8 w-8 text-[12px]' }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-[#111] font-serif font-bold text-white ${size}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

function SideBox({ title, children, tint = false }) {
  return (
    <section
      className={`border border-[#e6e2dc] p-4 ${
        tint ? 'bg-[#f7f5f2]' : 'bg-white'
      }`}
    >
      <h2 className="m-0 font-serif text-[15px] font-extrabold uppercase tracking-[0.01em] text-[#111]">
        {title}
      </h2>

      <span
        className="mb-3 mt-2 block h-px w-full"
        style={{ background: RED }}
      />

      {children}
    </section>
  );
}

function ShareRow({ article, url }) {
  const t = encodeURIComponent(article.title);
  const u = encodeURIComponent(url);

  const btn =
    'grid h-[30px] w-[30px] cursor-pointer place-items-center rounded-full border border-[#cfcfcb] bg-white text-[12px] text-[#222] transition-colors hover:border-[#111] hover:bg-[#111] hover:text-white';

  return (
    <div className="flex items-center gap-2" aria-label="Share this article">
      <a
        className={btn}
        aria-label="Share on Facebook"
        href={`https://www.facebook.com/sharer/sharer.php?u=${u}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebookF />
      </a>

      <a
        className={btn}
        aria-label="Share on X"
        href={`https://twitter.com/intent/tweet?text=${t}&url=${u}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaXTwitter />
      </a>

      <a
        className={btn}
        aria-label="Share on LinkedIn"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedinIn />
      </a>

      <a
        className={btn}
        aria-label="Share by email"
        href={`mailto:?subject=${t}&body=${u}`}
      >
        <Mail className="h-3.5 w-3.5" />
      </a>

      <CopyLinkButton url={url} className={btn} />
    </div>
  );
}

function renderBlock(block, index, isFirstParagraph) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p
          key={index}
          className={`mb-3 font-serif text-[15.5px] leading-[1.55] text-[#333] ${
            isFirstParagraph
              ? 'first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-serif first-letter:text-[68px] first-letter:font-bold first-letter:leading-[0.78] first-letter:text-[#d0111b]'
              : ''
          }`}
        >
          {block.text}
        </p>
      );

    case 'quote':
      return (
        <blockquote
          key={index}
          className="my-6 flex items-start gap-4 border-l-4 bg-[#f1f1f1] px-5 py-4"
          style={{ borderLeftColor: RED }}
        >
          <FaQuoteLeft
            className="mt-1 h-7 w-7 shrink-0"
            style={{ color: RED }}
            aria-hidden="true"
          />

          <div>
            <p className="m-0 font-serif text-[19px] italic leading-[1.35] text-[#222]">
              {block.text}
            </p>

            {block.author && (
              <footer className="mt-2 text-[10px] uppercase tracking-[0.04em] text-[#777]">
                {block.author}
              </footer>
            )}
          </div>
        </blockquote>
      );

    case 'heading': {
      const Tag = `h${block.level || 2}`;

      return (
        <Tag
          key={index}
          className="mb-3 mt-8 font-serif text-[22px] font-bold leading-tight text-[#111]"
        >
          {block.text}

          <span
            className="mt-2 block h-[3px] w-4"
            style={{ background: RED }}
            aria-hidden="true"
          />
        </Tag>
      );
    }

    default:
      return null;
  }
}

// Special layout for the client feature article.
export default function ClientArticlePage({ article, related = [] }) {
  const url = absoluteUrl(`/${article.category}/${article.slug}`);

  const by = article.byline || {
    name: SITE_NAME,
    initials: 'IJ',
    bio: '',
    href: `/${article.category}`,
  };

  const content = article.content || [];

  const firstParagraph = content.findIndex(
    (b) => b.type === 'paragraph'
  );

  return (
    <main className="bg-white">

      {/* SEO Structured Data */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
          },
          url,
          headline: article.title,
          description: article.metaDescription || article.excerpt,
          image: [
            absoluteUrl(article.image),
            ...(article.heroImage
              ? [absoluteUrl(article.heroImage)]
              : []),
          ],
          datePublished: isoDate(article.date),
          dateModified: isoDate(article.date),
          articleSection: article.categoryLabel,
          keywords: (article.keywords || []).join(', '),
          inLanguage: 'en-US',
          isAccessibleForFree: true,
          author: {
            '@type': 'Organization',
            name: by.name,
            url: absoluteUrl(by.href),
          },
          publisher: {
            '@type': 'NewsMediaOrganization',
            name: SITE_NAME,
            url: absoluteUrl('/'),
            logo: {
              '@type': 'ImageObject',
              url: absoluteUrl('/logo.png'),
              width: 512,
              height: 512,
            },
          },
        }}
      />

      {/* ==========================================
          HERO SECTION
          Desktop: Dark image overlay
          Mobile: Light text section + image below
      ========================================== */}

      <section className="relative isolate overflow-hidden bg-[#07142b] text-white">

        {/* Desktop Background Image */}
        {article.heroImage && (
          <>
            <Image
              src={article.heroImage}
              alt={article.imageAlt || ''}
              fill
              sizes="100vw"
              className="-z-20 hidden object-cover object-[85%_22%] md:block"
            />

            <div
              className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#07142b] via-[#07142b]/70 to-transparent md:block"
              aria-hidden="true"
            />
          </>
        )}

        {/* Row 1 — Breadcrumb, Title, Description, Date */}

        <div className="w-full bg-[#f5f3ef] text-[#111] md:bg-transparent md:text-white">

          <div className="mx-auto w-[min(1120px,calc(100%-40px))] py-7 sm:py-9 md:flex md:min-h-[390px] md:items-center md:py-14 lg:min-h-[430px] lg:py-16">

            <div className="max-w-[640px]">

              {/* Breadcrumbs */}
              <Breadcrumbs
                className="mb-4 text-[9px] uppercase tracking-[0.06em] text-[#666] md:text-gray-200 [&_a:hover]:text-[#d0111b]"
                items={[
                  {
                    name: 'Home',
                    path: '/',
                  },
                  {
                    name: article.categoryLabel,
                    path: `/${article.category}`,
                  },
                  {
                    name: article.title,
                    path: `/${article.category}/${article.slug}`,
                  },
                ]}
              />

              {/* Article Label */}
              {article.label && (
                <span
                  className="inline-block px-2 py-[3px] text-[11px] font-bold uppercase tracking-[0.06em] text-white"
                  style={{ background: RED }}
                >
                  {article.label}
                </span>
              )}

              {/* Article Title */}
              <h1 className="mb-0 mt-3 font-serif text-[31px] font-bold leading-[1.08] text-[#111] sm:text-[38px] md:text-white lg:text-[44px]">
                {article.title}
              </h1>

              {/* Article Description */}
              <p className="mt-4 max-w-[560px] font-serif text-[16px] italic leading-[1.4] text-[#555] sm:text-[19px] md:text-[#e6e8ee]">
                {article.excerpt}
              </p>

              {/* Red Divider */}
              <span
                className="mt-4 block h-[3px] w-[76px]"
                style={{ background: RED }}
                aria-hidden="true"
              />

              {/* Date and Location */}
              <p className="mt-5 flex items-center gap-2 text-[12px] uppercase tracking-[0.02em] text-[#555] md:text-[#dfe3ec]">
                <CalendarDays
                  className="h-4 w-4"
                  aria-hidden="true"
                />

                <span>
                  {article.dateline
                    ? `${article.dateline} – `
                    : ''}

                  <time dateTime={isoDate(article.date)}>
                    {longDate(article.date)}
                  </time>
                </span>
              </p>

            </div>
          </div>
        </div>

        {/* Row 2 — Mobile Article Image */}

        <div className="relative aspect-[994/664] w-full md:hidden">
          <Image
            src={article.image}
            alt={article.imageAlt || ''}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: article.imagePosition,
            }}
          />
        </div>

      </section>

      {/* ==========================================
          ARTICLE CONTENT + SIDEBAR
      ========================================== */}

      <div className="mx-auto w-[min(1120px,calc(100%-40px))] pb-14 pt-4">

        <div className="flex flex-col gap-9 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-10">

          {/* Main Article Column */}

          <article className="min-w-0">

            {/* Author Information + Share Buttons */}

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

              <div className="flex items-center gap-2.5 text-[12px] text-[#555]">

                <Avatar initials={by.initials} />

                <span>
                  By{' '}
                  <strong className="font-serif font-semibold text-[#111]">
                    {by.name}
                  </strong>
                </span>

                <span
                  className="h-3.5 w-px bg-[#ccc]"
                  aria-hidden="true"
                />

                <span>{article.readTime}</span>

              </div>

              <ShareRow article={article} url={url} />

            </div>

            {/* Article Content */}

            {content.map((block, i) =>
              renderBlock(block, i, i === firstParagraph)
            )}

            {/* Sources & References */}
            {article.sources?.length > 0 && (
              <section className="mt-8 border-t border-[#e6e2dc] pt-5" aria-labelledby="article-sources-heading">
                <h2
                  id="article-sources-heading"
                  className="mb-3 font-serif text-[19px] font-bold text-[#111]"
                >
                  Sources &amp; References
                  <span
                    className="mt-2 block h-[3px] w-10"
                    style={{ background: RED }}
                    aria-hidden="true"
                  />
                </h2>

                <ul className="m-0 list-none space-y-3 p-0">
                  {article.sources.map((source) => (
                    <li
                      key={source.url}
                      className="border border-[#e6e2dc] bg-[#faf9f7] px-4 py-3"
                    >
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <span
                          className="mb-1 block text-[10px] font-bold uppercase tracking-[0.08em]"
                          style={{ color: RED }}
                        >
                          {source.publisher}
                        </span>
                        <span className="font-serif text-[14px] font-semibold leading-[1.4] text-[#222] group-hover:underline">
                          {source.title}
                        </span>
                        <span className="mt-1 block break-all text-[11px] text-[#777]">
                          {source.url}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Article Tags */}

            {article.keywords?.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#eee] pt-4">

                <span className="mr-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#111]">
                  Tags
                </span>

                {article.keywords.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#ddd] px-3 py-1 text-[11px] text-[#666]"
                  >
                    {tag}
                  </span>
                ))}

              </div>
            )}

          </article>

          {/* ==========================================
              SIDEBAR
          ========================================== */}

          <StickySidebar className="flex flex-col gap-5">

            {/* Key Highlights */}

            {article.highlights?.length > 0 && (
              <SideBox title="Key Highlights" tint>

                <ul className="m-0 list-none divide-y divide-[#e6e2dc] p-0">

                  {article.highlights.map((item) => {
                    const Icon = ICONS[item.icon] || Scale;

                    return (
                      <li
                        key={item.text}
                        className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                      >
                        <Icon
                          className="h-8 w-8 shrink-0"
                          strokeWidth={1.5}
                          style={{ color: RED }}
                        />

                        <span className="font-serif text-[13px] leading-[1.35] text-[#333]">
                          {item.text}
                        </span>
                      </li>
                    );
                  })}

                </ul>

              </SideBox>
            )}

            {/* Timeline */}

            {article.timeline?.length > 0 && (
              <SideBox title="Timeline of Key Events" tint>

                <ol className="relative m-0 list-none p-0 pl-6 before:absolute before:bottom-2 before:left-[4px] before:top-2 before:w-px before:bg-[#e0a3a7] before:content-['']">

                  {article.timeline.map((item) => (
                    <li
                      key={item.date}
                      className="relative pb-4 last:pb-0"
                    >

                      <span
                        className="absolute -left-6 top-[5px] h-[9px] w-[9px] rounded-full"
                        style={{ background: RED }}
                        aria-hidden="true"
                      />

                      <strong className="block font-serif text-[13px] leading-tight text-[#111]">
                        {item.date}
                      </strong>

                      <span className="block font-serif text-[12px] leading-[1.35] text-[#555]">
                        {item.text}
                      </span>

                    </li>
                  ))}

                </ol>

              </SideBox>
            )}

            {/* Related Stories */}

            {related.length > 0 && (
              <SideBox title="Related Stories">

                <ul className="m-0 list-none divide-y divide-[#eee] p-0">

                  {related.map((item) => (
                    <li key={item.slug} className='mt-3' >

                      <Link
                        href={`/${item.category}/${item.slug}`}
                        className="group flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                      >

                        <span className="relative block h-[62px] w-[82px] shrink-0 overflow-hidden bg-[#e7e7e4]">

                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="82px"
                            className="object-cover"
                          />

                        </span>

                        <span className="min-w-0">

                          <span className="block font-serif text-[10px] font-bold leading-[1.25] text-[#111] group-hover:underline">
                            {item.title}
                          </span>

                          <span className="mt-1 flex items-center gap-1.5 text-[10px]">

                            <span
                              className="font-bold uppercase tracking-[0.04em]"
                              style={{ color: RED }}
                            >
                              {item.categoryLabel}
                            </span>

                            <span className="text-[#ccc]">|</span>

                            <time
                              className="text-[#888]"
                              dateTime={isoDate(item.date)}
                            >
                              {shortDate(item.date)}
                            </time>

                          </span>

                        </span>

                      </Link>

                    </li>
                  ))}

                </ul>

              </SideBox>
            )}

            {/* About the Author */}

            <SideBox title="About the Author">

              <div className="flex items-start gap-3">

                <Avatar
                  initials={by.initials}
                  size="h-12 w-12 text-[18px]"
                />

                <div>

                  <strong className="block font-serif text-[14px] leading-tight text-[#111]">
                    {by.name}
                  </strong>

                  <p className="my-1.5 text-[11.5px] leading-[1.45] text-[#777]">
                    {by.bio}
                  </p>

                  <Link
                    href={by.href}
                    className="text-[11.5px] font-bold hover:underline"
                    style={{ color: '#1a56db' }}
                  >
                    More from {by.name} →
                  </Link>

                </div>

              </div>

            </SideBox>

          </StickySidebar>

        </div>
      </div>

    </main>
  );
}
