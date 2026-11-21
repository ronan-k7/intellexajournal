// components/AlinahabbaArticlePage.jsx
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  CalendarDays,
  Factory,
  Gavel,
  Globe,
  Landmark,
  Mail,
  Scale,
  ShieldQuestion,
  FileSearch,
  Users,
} from 'lucide-react';
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import CopyLinkButton from '@/components/CopyLinkButton';
import StickySidebar from '@/components/StickySidebar';
import { parseDate, isoDate } from '@/lib/data';
import { SITE_NAME, absoluteUrl } from '@/lib/site';
import { AUTHOR_PATH } from '@/lib/author';

// Palette: "concrete" slate + safety-amber accent (cement-industry look).
const SLATE = '#1b2430';
const SLATE_2 = '#2a3646';
const AMBER = '#e8a33d';
const AMBER_DARK = '#b87812';
const CEMENT = '#f1efeb';
const LINE = '#e3e0da';

const longDate = (d) =>
  parseDate(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const shortDate = (d) =>
  parseDate(d)
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase();

const ICONS = {
  factory: Factory,
  building: Building2,
  scale: Scale,
  people: Users,
  globe: Globe,
  landmark: Landmark,
  calendar: CalendarDays,
  gavel: Gavel,
};

function Avatar({ initials, size = 'h-8 w-8 text-[12px]', dark = true }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-serif font-bold ${size}`}
      style={dark ? { background: SLATE, color: '#fff' } : { background: CEMENT, color: SLATE, border: `1px solid ${LINE}` }}
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
      style={{ borderColor: LINE, background: tint ? CEMENT : '#fff', borderTop: `3px solid ${AMBER}` }}
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
    'grid h-[30px] w-[30px] cursor-pointer place-items-center rounded-full border border-[#cfcfcb] bg-white text-[12px] text-[#222] transition-colors hover:border-[#1b2430] hover:bg-[#1b2430] hover:text-white';

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

// Body blocks. Section headings get an auto-number (01, 02, ...).
function renderBlock(block, index, ctx) {
  switch (block.type) {
    case 'paragraph': {
      const isFirst = index === ctx.firstParagraph;
      return (
        <p
          key={index}
          className={`mb-4 font-serif leading-[1.7] text-[#2c2f36] ${
            isFirst
              ? 'text-[18px] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[74px] first-letter:font-bold first-letter:leading-[0.78] first-letter:text-[#e8a33d]'
              : 'text-[16.5px]'
          }`}
        >
          {block.text}
        </p>
      );
    }

    case 'image':
      return (
        <figure
          key={index}
          className="my-8 overflow-hidden border bg-white shadow-[0_2px_12px_rgba(27,36,48,0.10)]"
          style={{ borderColor: LINE }}
        >
          <Image
            src={block.src}
            alt={block.alt || ''}
            width={block.width || 976}
            height={block.height || 549}
            sizes="(min-width: 1024px) 760px, 100vw"
            className="block h-auto w-full"
          />
          {block.caption && (
            <figcaption
              className="flex items-center gap-3 px-4 py-2.5"
              style={{ background: CEMENT, borderTop: `3px solid ${AMBER}` }}
            >
              <span className="h-4 w-1 shrink-0" style={{ background: SLATE }} aria-hidden="true" />
              <span className="font-serif text-[12.5px] italic leading-[1.4] text-[#444]">{block.caption}</span>
            </figcaption>
          )}
        </figure>
      );

    case 'heading': {
      const num = String(ctx.headingNumbers.get(index) || '').padStart(2, '0');
      const Tag = `h${block.level || 2}`;
      return (
        <Tag
          key={index}
          className="mb-3 mt-10 flex items-start gap-3 font-serif text-[23px] font-bold leading-tight text-[#111]"
        >
          <span
            className="mt-[3px] grid h-8 min-w-[38px] shrink-0 place-items-center px-1.5 font-serif text-[14px] font-bold tracking-[0.04em]"
            style={{ background: SLATE, color: AMBER }}
            aria-hidden="true"
          >
            {num}
          </span>
          <span className="min-w-0 border-b-2 pb-2" style={{ borderColor: AMBER }}>
            {block.text}
          </span>
        </Tag>
      );
    }

    default:
      return null;
  }
}

// "Reported vs. Disputed" two-column panel, shown after the article body.
function ReportedDisputed({ card }) {
  if (!card?.columns?.length) return null;
  return (
    <section className="mt-10" aria-label={card.title || 'Reported and disputed'}>
      {card.title && (
        <h2 className="mb-4 mt-0 font-serif text-[13px] font-extrabold uppercase tracking-[0.12em]" style={{ color: SLATE }}>
          {card.title}
        </h2>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {card.columns.map((col, i) => {
          const dark = i === 0;
          const Icon = dark ? FileSearch : ShieldQuestion;
          return (
            <div
              key={col.heading}
              className="p-5"
              style={
                dark
                  ? { background: SLATE, color: '#fff' }
                  : { background: CEMENT, color: '#222', border: `1px solid ${LINE}`, borderTop: `4px solid ${AMBER}` }
              }
            >
              <div className="mb-3 flex items-center gap-2.5">
                <Icon className="h-6 w-6" strokeWidth={1.6} style={{ color: dark ? AMBER : AMBER_DARK }} aria-hidden="true" />
                <h3 className="m-0 font-serif text-[16px] font-bold uppercase tracking-[0.04em]">{col.heading}</h3>
              </div>
              <ul className="m-0 list-none space-y-2.5 p-0">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-2.5 font-serif text-[14px] leading-[1.5]">
                    <span
                      className="mt-[7px] h-[7px] w-[7px] shrink-0"
                      style={{ background: dark ? AMBER : AMBER_DARK }}
                      aria-hidden="true"
                    />
                    <span style={{ color: dark ? '#e7ebf1' : '#333' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {card.text && (
        <p
          className="mb-0 mt-4 border-l-[3px] pl-4 font-serif text-[15px] italic leading-[1.55] text-[#444]"
          style={{ borderLeftColor: AMBER }}
        >
          {card.text}
        </p>
      )}
    </section>
  );
}

function HeroMeta({ article, light = false }) {
  return (
    <p
      className="mt-5 flex items-center gap-2 text-[12px] uppercase tracking-[0.02em]"
      style={{ color: light ? '#555' : '#cdd6e2' }}
    >
      <CalendarDays className="h-4 w-4" aria-hidden="true" />
      <span>
        {article.dateline ? `${article.dateline} – ` : ''}
        <time dateTime={isoDate(article.date)}>{longDate(article.date)}</time>
      </span>
    </p>
  );
}

// Layout for the "Venezuela cement contracts / Habba–Mildon" client feature article.
export default function AlinahabbaArticlePage({ article, related = [] }) {
  const url = absoluteUrl(`/${article.category}/${article.slug}`);
  const by = article.byline || { name: SITE_NAME, initials: 'IJ', bio: '', href: `/${article.category}` };
  const content = article.content || [];
  const firstParagraph = content.findIndex((b) => b.type === 'paragraph');

  // 1-based numbers for section headings.
  const headingNumbers = new Map();
  let n = 0;
  content.forEach((b, i) => {
    if (b.type === 'heading') headingNumbers.set(i, ++n);
  });

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
          '@type': 'NewsArticle',
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

      {/* ===== HERO (desktop): slate panel with text left, photo right on an amber diagonal ===== */}
      <section
        className="relative hidden overflow-hidden text-white md:block"
        style={{ background: `linear-gradient(105deg, ${SLATE} 0%, ${SLATE_2} 100%)` }}
      >
        <div className="relative min-h-[350px] lg:min-h-[390px]">
          {/* amber diagonal edge */}
          <div
            className="absolute inset-y-0 right-0 w-[49%]"
            style={{ background: AMBER, clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}
            aria-hidden="true"
          />
          {/* photo */}
          <div
            className="absolute inset-y-0 right-0 w-[48.6%]"
            style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}
          >
            <Image
              src={article.image}
              alt={article.imageAlt || ''}
              fill
              priority
              sizes="50vw"
              className="object-cover"
              style={{ objectPosition: article.imagePosition || '50% 30%' }}
            />
          </div>

          {/* text */}
          <div className="relative grid min-h-[350px] grid-cols-[52%_1fr] items-center lg:min-h-[390px]">
            <div
              className="py-10 pr-10"
              style={{ paddingLeft: 'max(20px, calc((100vw - 1120px) / 2))' }}
            >
              <Breadcrumbs
                className="mb-3 text-[9px] uppercase tracking-[0.06em] text-white/70 [&_a:hover]:text-white [&_span]:!text-white/70"
                items={crumbs}
              />

              {article.label && (
                <span
                  className="inline-block px-3 py-[5px] font-serif text-[12px] font-bold uppercase tracking-[0.08em]"
                  style={{ background: AMBER, color: SLATE }}
                >
                  {article.label}
                </span>
              )}

              <h1 className="mb-0 mt-3 font-serif text-[29px] font-bold leading-[1.1] text-white lg:text-[35px]">
                {article.title}
              </h1>

              <p className="mt-4 max-w-[520px] font-serif text-[15px] italic leading-[1.4] text-[#d5dce7] lg:text-[16.5px]">
                {article.excerpt}
              </p>

              <span className="mt-5 block h-[3px] w-[76px]" style={{ background: AMBER }} aria-hidden="true" />

              <HeroMeta article={article} />
            </div>
            <span aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ===== HERO (mobile) — row 1: slate text block ===== */}
      <section
        className="text-white md:hidden"
        style={{ background: `linear-gradient(105deg, ${SLATE} 0%, ${SLATE_2} 100%)` }}
      >
        <div className="mx-auto w-[min(1120px,calc(100%-40px))] py-7 sm:py-9">
          <Breadcrumbs
            className="mb-4 text-[9px] uppercase tracking-[0.06em] text-white/70 [&_a:hover]:text-white [&_span]:!text-white/70"
            items={crumbs}
          />
          {article.label && (
            <span
              className="inline-block px-2.5 py-[4px] font-serif text-[11px] font-bold uppercase tracking-[0.08em]"
              style={{ background: AMBER, color: SLATE }}
            >
              {article.label}
            </span>
          )}
          <h1 className="mb-0 mt-3 font-serif text-[27px] font-bold leading-[1.12] text-white sm:text-[34px]">
            {article.title}
          </h1>
          <p className="mt-4 font-serif text-[15.5px] italic leading-[1.45] text-[#d5dce7] sm:text-[18px]">
            {article.excerpt}
          </p>
          <span className="mt-4 block h-[3px] w-[76px]" style={{ background: AMBER }} aria-hidden="true" />
          <HeroMeta article={article} />
        </div>
      </section>

      {/* ===== HERO (mobile) — row 2: image under the text ===== */}
      <div className="relative aspect-[3/2] w-full md:hidden">
        <Image
          src={article.image}
          alt={article.imageAlt || ''}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: article.imagePosition || '50% 30%' }}
        />
      </div>

      {/* ===== ARTICLE + SIDEBAR ===== */}
      <div className="mx-auto w-[min(1120px,calc(100%-40px))] pb-14 pt-6">
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

            {content.map((block, i) => renderBlock(block, i, { firstParagraph, headingNumbers }))}

            <ReportedDisputed card={article.factCard} />

            {article.sources?.length > 0 && (
              <section className="mt-10 border-t pt-5" style={{ borderColor: LINE }} aria-labelledby="cement-sources-heading">
                <h2 id="cement-sources-heading" className="mb-3 font-serif text-[19px] font-bold text-[#111]">
                  Sources &amp; References
                  <span className="mt-2 block h-[3px] w-10" style={{ background: AMBER }} aria-hidden="true" />
                </h2>
                <ul className="m-0 list-none space-y-3 p-0">
                  {article.sources.map((source) => (
                    <li key={source.url} className="border px-4 py-3" style={{ borderColor: LINE, background: '#faf9f7' }}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="group block">
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: AMBER_DARK }}>
                          {source.publisher}
                        </span>
                        <span className="font-serif text-[14px] font-semibold leading-[1.4] text-[#222] group-hover:underline">
                          {source.title}
                        </span>
                        <span className="mt-1 block break-all text-[11px] text-[#777]">{source.url}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {article.keywords?.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#eee] pt-4">
                <span className="mr-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#111]">Tags</span>
                {article.keywords.map((tag) => (
                  <span key={tag} className="rounded-full border border-[#ddd] px-3 py-1 text-[11px] text-[#666]">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* SIDEBAR */}
          <StickySidebar className="flex flex-col gap-5">
            {article.highlights?.length > 0 && (
              <SideBox title="Key Highlights" tint>
                <ul className="m-0 list-none divide-y divide-[#e3e0da] p-0">
                  {article.highlights.map((item) => {
                    const Icon = ICONS[item.icon] || Scale;
                    return (
                      <li key={item.text} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                        <Icon className="h-8 w-8 shrink-0" strokeWidth={1.5} style={{ color: AMBER_DARK }} />
                        <span className="font-serif text-[13px] leading-[1.35] text-[#333]">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </SideBox>
            )}

            {article.people?.length > 0 && (
              <SideBox title="In This Story">
                <ul className="m-0 list-none space-y-3 p-0">
                  {article.people.map((p) => (
                    <li key={p.name} className="flex items-center gap-3">
                      <Avatar
                        initials={p.name
                          .split(' ')
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join('')}
                        size="h-9 w-9 text-[12px]"
                        dark={false}
                      />
                      <span className="min-w-0">
                        <strong className="block font-serif text-[13.5px] leading-tight text-[#111]">{p.name}</strong>
                        <span className="block text-[11px] leading-[1.3] text-[#666]">{p.role}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </SideBox>
            )}

            {article.timeline?.length > 0 && (
              <SideBox title="Timeline" tint>
                <ol className="relative m-0 list-none p-0 pl-6 before:absolute before:bottom-2 before:left-[4px] before:top-2 before:w-px before:bg-[#e8a33d] before:content-['']">
                  {article.timeline.map((item) => (
                    <li key={item.date} className="relative pb-4 last:pb-0">
                      <span
                        className="absolute -left-6 top-[5px] h-[9px] w-[9px] rounded-full"
                        style={{ background: SLATE, boxShadow: `0 0 0 2px ${AMBER}` }}
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
                            <span className="font-bold uppercase tracking-[0.04em]" style={{ color: AMBER_DARK }}>
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