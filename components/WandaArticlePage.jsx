// components/WandaArticlePage.jsx
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarDays,
  Clock,
  FileSearch,
  Gavel,
  Landmark,
  ListChecks,
  Mail,
  Newspaper,
  Scale,
} from 'lucide-react';
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import CopyLinkButton from '@/components/CopyLinkButton';
import StickySidebar from '@/components/StickySidebar';
import { parseDate, isoDate } from '@/lib/data';
import { SITE_NAME, absoluteUrl } from '@/lib/site';
import { AUTHOR_PATH } from '@/lib/author';

// Palette: deep emerald "opinion" masthead + coral accent on a warm paper background.
const GREEN = '#0f3d3a';
const GREEN_2 = '#17524e';
const CORAL = '#e0613f';
const CORAL_DARK = '#b8452a';
const PAPER = '#f6f3ec';
const LINE = '#e2ddd2';

const longDate = (d) =>
  parseDate(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const shortDate = (d) =>
  parseDate(d)
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase();

const ICONS = {
  clock: Clock,
  file: FileSearch,
  scale: Scale,
  landmark: Landmark,
  gavel: Gavel,
  news: Newspaper,
  calendar: CalendarDays,
};

function Avatar({ initials }) {
  return (
    <span
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-serif text-[12px] font-bold text-white"
      style={{ background: GREEN }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

function SideBox({ title, children, tint = false }) {
  return (
    <section
      className="border p-4"
      style={{ borderColor: LINE, background: tint ? PAPER : '#fff', borderTop: `3px solid ${CORAL}` }}
    >
      <h2 className="m-0 font-serif text-[15px] font-extrabold uppercase tracking-[0.01em] text-[#111]">{title}</h2>
      <span className="mb-3 mt-2 block h-px w-full" style={{ background: LINE }} />
      {children}
    </section>
  );
}

function ShareRow({ article, url }) {
  const t = encodeURIComponent(article.title);
  const u = encodeURIComponent(url);
  const btn =
    'grid h-[30px] w-[30px] cursor-pointer place-items-center rounded-full border border-[#d4cfc3] bg-white text-[12px] text-[#222] transition-colors hover:border-[#0f3d3a] hover:bg-[#0f3d3a] hover:text-white';

  return (
    <div className="flex items-center gap-2" aria-label="Share this article">
      <a className={btn} aria-label="Share on Facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer">
        <FaFacebookF />
      </a>
      <a className={btn} aria-label="Share on X" href={`https://twitter.com/intent/tweet?text=${t}&url=${u}`} target="_blank" rel="noopener noreferrer">
        <FaXTwitter />
      </a>
      <a className={btn} aria-label="Share on LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer">
        <FaLinkedinIn />
      </a>
      <a className={btn} aria-label="Share by email" href={`mailto:?subject=${t}&body=${u}`}>
        <Mail className="h-3.5 w-3.5" />
      </a>
      <CopyLinkButton url={url} className={btn} />
    </div>
  );
}

// Turns "[9]" markers inside a paragraph into small superscript links to the matching source.
function withCitations(text, refs) {
  const parts = text.split(/(\[\d+\])/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[(\d+)\]$/);
    if (!m) return part;
    const n = Number(m[1]);
    if (!refs.has(n)) return part;
    return (
      <sup key={i} className="ml-[1px] text-[11px] font-bold">
        <a
          href={`#src-${n}`}
          className="rounded-sm px-[2px] no-underline hover:underline"
          style={{ color: CORAL_DARK }}
          aria-label={`Source ${n}`}
        >
          [{n}]
        </a>
      </sup>
    );
  });
}

function renderBlock(block, index, ctx) {
  switch (block.type) {
    case 'paragraph': {
      const isFirst = index === ctx.firstParagraph;
      return (
        <p
          key={index}
          className={`mb-5 font-serif leading-[1.72] text-[#262a2b] ${
            isFirst
              ? 'text-[18.5px] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[76px] first-letter:font-bold first-letter:leading-[0.78] first-letter:text-[#e0613f]'
              : 'text-[16.8px]'
          }`}
        >
          {withCitations(block.text, ctx.refs)}
        </p>
      );
    }

    case 'heading': {
      const Tag = `h${block.level || 2}`;
      return (
        <Tag key={index} className="mb-3 mt-9 font-serif text-[23px] font-bold leading-tight text-[#111]">
          {block.text}
          <span className="mt-2 block h-[3px] w-12" style={{ background: CORAL }} aria-hidden="true" />
        </Tag>
      );
    }

    default:
      return null;
  }
}

// "The three asks": numbered cards after the body.
function Asks({ card }) {
  if (!card?.items?.length) return null;
  return (
    <section
      className="mt-10 p-5 sm:p-6"
      style={{ background: GREEN, color: '#fff' }}
      aria-label={card.title || 'What disclosure would show'}
    >
      <div className="mb-4 flex items-center gap-2.5">
        <ListChecks className="h-6 w-6" strokeWidth={1.6} style={{ color: CORAL }} aria-hidden="true" />
        <h2 className="m-0 font-serif text-[13px] font-extrabold uppercase tracking-[0.12em]">{card.title}</h2>
      </div>
      <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-3">
        {card.items.map((item, i) => (
          <li key={item.title} className="relative border-t-[3px] bg-white/[0.06] p-4" style={{ borderColor: CORAL }}>
            <span className="mb-2 block font-serif text-[34px] font-bold leading-none" style={{ color: CORAL }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <strong className="block font-serif text-[15px] leading-tight">{item.title}</strong>
            {item.text && <span className="mt-1.5 block font-serif text-[13px] leading-[1.45] text-[#cfe0dd]">{item.text}</span>}
          </li>
        ))}
      </ol>
      {card.text && (
        <p className="mb-0 mt-4 font-serif text-[14px] italic leading-[1.5] text-[#cfe0dd]">{card.text}</p>
      )}
    </section>
  );
}

function HeroMeta({ article }) {
  return (
    <p className="mt-5 flex items-center justify-start gap-2 text-[12px] uppercase tracking-[0.03em] text-[#cfe0dd] md:justify-center">
      <CalendarDays className="h-4 w-4" aria-hidden="true" />
      <span>
        {article.dateline ? `${article.dateline} – ` : ''}
        <time dateTime={isoDate(article.date)}>{longDate(article.date)}</time>
      </span>
    </p>
  );
}

// Layout for the Wanda Vázquez "ten-day gap" opinion & analysis piece.
export default function WandaArticlePage({ article, related = [] }) {
  const url = absoluteUrl(`/${article.category}/${article.slug}`);
  const by = article.byline || { name: SITE_NAME, initials: 'IJ', bio: '', href: `/${article.category}` };
  const content = article.content || [];
  const firstParagraph = content.findIndex((b) => b.type === 'paragraph');
  const refs = new Set((article.sources || []).map((s) => s.ref).filter(Boolean));
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: article.categoryLabel, path: `/${article.category}` },
    { name: article.title, path: `/${article.category}/${article.slug}` },
  ];

  return (
    <main className="bg-white">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'OpinionNewsArticle',
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          url,
          headline: article.title.slice(0, 110),
          description: article.metaDescription || article.excerpt,
          image: [absoluteUrl(article.image)],
          datePublished: isoDate(article.date),
          dateModified: isoDate(article.date),
          articleSection: article.categoryLabel,
          keywords: (article.keywords || []).join(', '),
          inLanguage: 'en-US',
          isAccessibleForFree: true,
          author: { '@type': 'Organization', name: by.name, url: absoluteUrl(AUTHOR_PATH) },
          publisher: {
            '@type': 'NewsMediaOrganization',
            name: SITE_NAME,
            url: absoluteUrl('/'),
            logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png'), width: 512, height: 512 },
          },
        }}
      />

      {/* ===== HERO: emerald masthead (text) with the photo framed underneath ===== */}
      <section
        className="relative text-white"
        style={{ background: `linear-gradient(110deg, ${GREEN} 0%, ${GREEN_2} 100%)` }}
      >
        <div className="mx-auto w-[min(1120px,calc(100%-40px))] pt-5 text-left md:text-center">
          <Breadcrumbs
            className="text-[9px] uppercase tracking-[0.06em] text-white/70 md:justify-center [&_a:hover]:text-white [&_span]:!text-white/70"
            items={crumbs}
          />
        </div>

        <div className="mx-auto w-[min(920px,calc(100%-40px))] pb-8 pt-5 text-left md:pb-24 md:pt-6 md:text-center">
          {article.label && (
            <span
              className="inline-block px-3 py-[5px] font-serif text-[11.5px] font-bold uppercase tracking-[0.1em]"
              style={{ background: CORAL, color: '#fff' }}
            >
              {article.label}
            </span>
          )}

          <h1 className="mb-0 mt-4 font-serif text-[30px] font-bold leading-[1.1] text-white sm:text-[38px] md:text-[44px]">
            {article.title}
          </h1>

          <p className="mt-4 font-serif text-[16px] italic leading-[1.45] text-[#dcebe8] md:mx-auto md:max-w-[760px] md:text-[19px]">
            {article.excerpt}
          </p>

          <span className="mt-5 block h-[3px] w-[76px] md:mx-auto" style={{ background: CORAL }} aria-hidden="true" />

          <HeroMeta article={article} />
        </div>
      </section>

      {/* Photo frame: overlaps the masthead on desktop, sits directly under the text on mobile */}
      <div className="relative mx-auto w-[min(1120px,calc(100%-0px))] sm:w-[min(1120px,calc(100%-40px))] md:-mt-16">
        <div
          className="relative aspect-[3/2] w-full overflow-hidden bg-[#d9d4c8] md:aspect-[16/7] md:border-[6px] md:border-white md:shadow-[0_10px_30px_rgba(15,61,58,0.28)]"
        >
          <Image
            src={article.image}
            alt={article.imageAlt || ''}
            fill
            priority
            sizes="(min-width: 1120px) 1120px, 100vw"
            className="object-cover"
            style={{ objectPosition: article.imagePosition || '50% 30%' }}
          />
        </div>
        <span
          className="absolute -bottom-[3px] left-0 hidden h-[6px] w-40 md:block"
          style={{ background: CORAL }}
          aria-hidden="true"
        />
      </div>

      {/* ===== ARTICLE + SIDEBAR ===== */}
      <div className="mx-auto w-[min(1120px,calc(100%-40px))] pb-14 pt-8">
        <div className="flex flex-col gap-9 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-10">
          <article className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-[12px] text-[#555]">
                <Avatar initials={by.initials} />
                <span>
                  By{' '}
                  <Link href={AUTHOR_PATH} className="font-serif font-semibold text-[#111] hover:underline">
                    {by.name}
                  </Link>
                </span>
                <span className="h-3.5 w-px bg-[#ccc]" aria-hidden="true" />
                <span>{article.readTime}</span>
              </div>
              <ShareRow article={article} url={url} />
            </div>

            {content.map((block, i) => renderBlock(block, i, { firstParagraph, refs }))}

            <Asks card={article.factCard} />

            {article.keywords?.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-2 border-t pt-5" style={{ borderColor: LINE }}>
                <span className="mr-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#111]">Tags</span>
                {article.keywords.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-[11px] text-[#555]"
                    style={{ borderColor: '#d4cfc3', background: PAPER }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {article.sources?.length > 0 && (
              <section className="mt-8 border-t pt-5" style={{ borderColor: LINE }} aria-labelledby="wanda-sources-heading">
                <h2 id="wanda-sources-heading" className="mb-3 font-serif text-[19px] font-bold text-[#111]">
                  Sources &amp; References
                  <span className="mt-2 block h-[3px] w-10" style={{ background: CORAL }} aria-hidden="true" />
                </h2>
                <ol className="m-0 list-none space-y-3 p-0">
                  {article.sources.map((source) => (
                    <li
                      key={source.url}
                      id={source.ref ? `src-${source.ref}` : undefined}
                      className="flex scroll-mt-24 gap-3 border px-4 py-3"
                      style={{ borderColor: LINE, background: '#fbfaf6' }}
                    >
                      {source.ref && (
                        <span
                          className="mt-[2px] grid h-6 min-w-[30px] shrink-0 place-items-center px-1 font-serif text-[12px] font-bold text-white"
                          style={{ background: GREEN }}
                        >
                          {source.ref}
                        </span>
                      )}
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="group block min-w-0">
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: CORAL_DARK }}>
                          {source.publisher}
                        </span>
                        <span className="font-serif text-[14px] font-semibold leading-[1.4] text-[#222] group-hover:underline">
                          {source.title}
                        </span>
                        <span className="mt-1 block break-all text-[11px] text-[#777]">{source.url}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </article>

          {/* SIDEBAR */}
          <StickySidebar className="flex flex-col gap-5">
            {article.stat && (
              <section
                className="p-5 text-center text-white"
                style={{ background: `linear-gradient(135deg, ${GREEN} 0%, ${GREEN_2} 100%)`, borderTop: `4px solid ${CORAL}` }}
              >
                <span className="block font-serif text-[64px] font-black leading-none" style={{ color: CORAL }}>
                  {article.stat.value}
                </span>
                <strong className="mt-1 block font-serif text-[15px] uppercase tracking-[0.08em]">{article.stat.label}</strong>
                <span className="mx-auto mt-3 block h-px w-10" style={{ background: CORAL }} aria-hidden="true" />
                <span className="mt-3 block font-serif text-[12.5px] leading-[1.45] text-[#cfe0dd]">{article.stat.note}</span>
              </section>
            )}

            {article.highlights?.length > 0 && (
              <SideBox title="Key Points" tint>
                <ul className="m-0 list-none divide-y divide-[#e2ddd2] p-0">
                  {article.highlights.map((item) => {
                    const Icon = ICONS[item.icon] || Scale;
                    return (
                      <li key={item.text} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                        <Icon className="h-8 w-8 shrink-0" strokeWidth={1.5} style={{ color: CORAL_DARK }} />
                        <span className="font-serif text-[13px] leading-[1.35] text-[#333]">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </SideBox>
            )}

            {article.timeline?.length > 0 && (
              <SideBox title="Timeline">
                <ol className="relative m-0 list-none p-0 pl-6 before:absolute before:bottom-2 before:left-[4px] before:top-2 before:w-px before:bg-[#e0613f] before:content-['']">
                  {article.timeline.map((item) => (
                    <li key={item.date} className="relative pb-4 last:pb-0">
                      <span
                        className="absolute -left-6 top-[5px] h-[9px] w-[9px] rounded-full"
                        style={{ background: GREEN, boxShadow: `0 0 0 2px ${CORAL}` }}
                        aria-hidden="true"
                      />
                      <strong className="block font-serif text-[13px] leading-tight text-[#111]">{item.date}</strong>
                      <span className="block font-serif text-[12px] leading-[1.35] text-[#555]">{item.text}</span>
                    </li>
                  ))}
                </ol>
              </SideBox>
            )}

            {related.length > 0 && (
              <SideBox title="Related Stories">
                <ul className="m-0 list-none divide-y divide-[#eee] p-0">
                  {related.map((item) => (
                    <li key={item.slug} className="mt-3">
                      <Link
                        href={`/${item.category}/${item.slug}`}
                        className="group flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                      >
                        <span className="relative block h-[62px] w-[82px] shrink-0 overflow-hidden bg-[#e7e7e4]">
                          <Image src={item.image} alt="" fill sizes="82px" className="object-cover" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-serif text-[10px] font-bold leading-[1.25] text-[#111] group-hover:underline">
                            {item.title}
                          </span>
                          <span className="mt-1 flex items-center gap-1.5 text-[10px]">
                            <span className="font-bold uppercase tracking-[0.04em]" style={{ color: CORAL_DARK }}>
                              {item.categoryLabel}
                            </span>
                            <span className="text-[#ccc]">|</span>
                            <time className="text-[#888]" dateTime={isoDate(item.date)}>
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
          </StickySidebar>
        </div>
      </div>
    </main>
  );
}