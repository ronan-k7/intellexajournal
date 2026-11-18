import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  CalendarDays,
  Gavel,
  Landmark,
  Mail,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import CopyLinkButton from '@/components/CopyLinkButton';
import StickySidebar from '@/components/StickySidebar';
import { parseDate, isoDate } from '@/lib/data';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

// Palette: deep navy "case file" look with a brass accent.
const NAVY = '#0b1a30';
const NAVY_2 = '#13294b';
const BRASS = '#c9a24a';
const ACCENT = '#a30d32';

const longDate = (d) =>
  parseDate(d).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

const shortDate = (d) =>
  parseDate(d)
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase();

const ICONS = {
  shield: ShieldCheck,
  gavel: Gavel,
  scale: Scale,
  landmark: Landmark,
  calendar: CalendarDays,
  people: Users,
};

function Avatar({ initials }) {
  return (
    <span
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-serif text-[12px] font-bold text-white"
      style={{ background: NAVY }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

function SideBox({ title, children, tint = false }) {
  return (
    <section
      className={`border border-[#dfe3ea] p-4 ${tint ? 'bg-[#f4f6f9]' : 'bg-white'}`}
      style={{ borderTop: `3px solid ${NAVY}` }}
    >
      <h2 className="m-0 font-serif text-[15px] font-extrabold uppercase tracking-[0.01em] text-[#111]">
        {title}
      </h2>
      <span className="mb-3 mt-2 block h-px w-full" style={{ background: BRASS }} />
      {children}
    </section>
  );
}

function ShareRow({ article, url }) {
  const t = encodeURIComponent(article.title);
  const u = encodeURIComponent(url);
  const btn =
    'grid h-[30px] w-[30px] cursor-pointer place-items-center rounded-full border border-[#cfd4dc] bg-white text-[12px] text-[#222] transition-colors hover:border-[#0b1a30] hover:bg-[#0b1a30] hover:text-white';

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

// One person card: photo, then the name underneath as a link to Wikipedia.
function PersonCard({ person, stretch = false }) {
  return (
    <figure
      className={`m-0 overflow-hidden border border-[#dfe3ea] bg-white shadow-[0_2px_10px_rgba(11,26,48,0.08)] ${
        stretch ? 'flex h-full flex-col' : ''
      }`}
    >
      <div
        className={`relative w-full overflow-hidden bg-[#e7e9ee] ${
          stretch ? 'min-h-[220px] flex-1' : 'aspect-[4/3]'
        }`}
      >
        <Image
          src={person.image}
          alt={person.alt || person.name}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
          style={{ objectPosition: person.position || '50% 20%' }}
        />
      </div>
      <figcaption
        className="px-4 py-3 text-center"
        style={{ borderTop: `3px solid ${BRASS}` }}
      >
        <a
          href={person.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-serif text-[16px] font-bold leading-tight text-[#111] hover:underline"
          style={{ textDecorationColor: ACCENT }}
        >
          {person.name}
          <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" aria-hidden="true" />
        </a>
        {person.role && (
          <span className="mt-1 block text-[10.5px] font-bold uppercase tracking-[0.07em] text-[#7a8190]">
            {person.role}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

// 2-column grid of person cards, placed right after the paragraph that names them.
function PeopleRow({ people }) {
  const single = people.length === 1;
  return (
    <div
      className={`my-7 grid grid-cols-1 gap-4 sm:grid-cols-2 ${single ? '' : ''}`}
      role="group"
      aria-label="People mentioned in this paragraph"
    >
      {people.map((p) => (
        <div key={p.name} className={single ? 'sm:col-span-1 sm:col-start-1' : ''}>
          <PersonCard person={p} />
        </div>
      ))}
    </div>
  );
}

// 2-column row: paragraph (left) + person card (right), both the same height.
function TextPersonRow({ text, person }) {
  return (
    <div className="my-7 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
      <div
        className="flex items-center border border-[#dfe3ea] bg-[#f4f6f9] px-5 py-6"
        style={{ borderLeft: `4px solid ${BRASS}` }}
      >
        <p className="m-0 font-serif text-[16.5px] leading-[1.65] text-[#2a2f3a]">{text}</p>
      </div>
      <PersonCard person={person} stretch />
    </div>
  );
}

function renderBlock(block, index, isFirstParagraph) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p
          key={index}
          className={`mb-4 font-serif text-[16.5px] leading-[1.65] text-[#2a2f3a] ${
            isFirstParagraph
              ? 'first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-serif first-letter:text-[72px] first-letter:font-bold first-letter:leading-[0.78] first-letter:text-[#0b1a30]'
              : ''
          }`}
        >
          {block.text}
        </p>
      );

    case 'textWithPerson':
      return <TextPersonRow key={index} text={block.text} person={block.person} />;

    case 'people':
      return <PeopleRow key={index} people={block.people || []} />;

    case 'heading': {
      const Tag = `h${block.level || 2}`;
      return (
        <Tag key={index} className="mb-3 mt-8 font-serif text-[22px] font-bold leading-tight text-[#111]">
          {block.text}
          <span className="mt-2 block h-[3px] w-10" style={{ background: BRASS }} aria-hidden="true" />
        </Tag>
      );
    }

    default:
      return null;
  }
}

function FactCard({ card }) {
  if (!card || (!card.stats?.length && !card.text)) return null;

  return (
    <section
      className="mt-8 border border-[#dfe3ea] bg-[#f4f6f9] shadow-[0_2px_10px_rgba(11,26,48,0.06)]"
      style={{ borderTop: `4px solid ${BRASS}` }}
      aria-label={card.title || 'Key figures'}
    >
      <div className="px-5 py-5 sm:px-6">
        {card.title && (
          <h2 className="mb-4 mt-0 font-serif text-[13px] font-extrabold uppercase tracking-[0.1em]" style={{ color: NAVY }}>
            {card.title}
          </h2>
        )}

        {card.stats?.length > 0 && (
          <div className="grid grid-cols-1 divide-y divide-[#dfe3ea] border border-[#dfe3ea] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {card.stats.map((stat) => {
              const Icon = ICONS[stat.icon] || Scale;
              return (
                <div key={stat.label} className="flex items-center gap-4 bg-white px-5 py-4">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full border"
                    style={{ borderColor: '#d9c493', background: '#fff' }}
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.6} style={{ color: NAVY }} />
                  </span>
                  <div className="min-w-0">
                    <strong className="block font-serif text-[30px] font-extrabold leading-none" style={{ color: NAVY }}>
                      {stat.value}
                    </strong>
                    <span className="mt-1.5 block text-[11px] font-bold uppercase leading-[1.3] tracking-[0.06em] text-[#333]">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {card.text && (
          <p
            className={`mb-0 border-l-[3px] pl-4 font-serif text-[15px] italic leading-[1.55] text-[#444] ${
              card.stats?.length > 0 ? 'mt-5' : ''
            }`}
            style={{ borderLeftColor: BRASS }}
          >
            {card.text}
          </p>
        )}
      </div>
    </section>
  );
}

// Layout for the Mark Rossini client feature article.
export default function MarkRossiniArticlePage({ article, related = [] }) {
  const url = absoluteUrl(`/${article.category}/${article.slug}`);
  const by = article.byline || { name: SITE_NAME, initials: 'IJ', bio: '', href: `/${article.category}` };
  const content = article.content || [];
  const firstParagraph = content.findIndex((b) => b.type === 'paragraph');
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
          author: { '@type': 'Organization', name: by.name, url: absoluteUrl(by.href) },
          publisher: {
            '@type': 'NewsMediaOrganization',
            name: SITE_NAME,
            url: absoluteUrl('/'),
            logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png'), width: 512, height: 512 },
          },
        }}
      />

      {/* ===== HERO (desktop): photo left (no overlay), text right ===== */}
      <section
        className="relative hidden overflow-hidden text-white md:block"
        style={{ background: `linear-gradient(250deg, ${NAVY} 0%, ${NAVY_2} 100%)` }}
      >
        <div className="relative min-h-[400px] lg:min-h-[440px]">
          <div className="absolute inset-y-0 left-0 w-[50%]">
            <Image
              src={article.image}
              alt={article.imageAlt || ''}
              fill
              priority
              sizes="50vw"
              className="object-cover"
              style={{ objectPosition: article.imagePosition }}
            />
          </div>

          <div className="relative grid min-h-[400px] grid-cols-[50%_1fr] items-center lg:min-h-[440px]">
            <span aria-hidden="true" />
            <div className="py-10 pl-[4%] pr-8 lg:pr-12">
              <Breadcrumbs
                className="mb-4 text-[9px] uppercase tracking-[0.06em] text-white/70 [&_a:hover]:text-white [&_span]:!text-white/70"
                items={crumbs}
              />

              {article.label && (
                <span
                  className="inline-block px-3 py-[5px] font-serif text-[12px] font-bold uppercase tracking-[0.08em]"
                  style={{ background: BRASS, color: NAVY }}
                >
                  {article.label}
                </span>
              )}

              <h1 className="mb-0 mt-4 font-serif text-[34px] font-bold leading-[1.08] text-white lg:text-[42px]">
                {article.title}
              </h1>

              <p className="mt-4 max-w-[520px] font-serif text-[15px] italic leading-[1.4] text-[#d8e0ee] lg:text-[17px]">
                {article.excerpt}
              </p>

              <span className="mt-5 block h-[3px] w-[76px]" style={{ background: BRASS }} aria-hidden="true" />

              <p className="mt-5 flex items-center gap-2 text-[12px] uppercase tracking-[0.02em] text-[#c6d0e2]">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                <span>
                  {article.dateline ? `${article.dateline} – ` : ''}
                  <time dateTime={isoDate(article.date)}>{longDate(article.date)}</time>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HERO (mobile) — row 1: navy text block (title, description, date) ===== */}
      <section className="text-white md:hidden" style={{ background: NAVY }}>
        <div className="mx-auto w-[min(1120px,calc(100%-40px))] py-7 sm:py-9">
          <Breadcrumbs
            className="mb-4 text-[9px] uppercase tracking-[0.06em] text-white/70 [&_a:hover]:text-white [&_span]:!text-white/70"
            items={crumbs}
          />
          {article.label && (
            <span
              className="inline-block px-2.5 py-[4px] font-serif text-[11px] font-bold uppercase tracking-[0.08em]"
              style={{ background: BRASS, color: NAVY }}
            >
              {article.label}
            </span>
          )}
          <h1 className="mb-0 mt-3 font-serif text-[29px] font-bold leading-[1.1] text-white sm:text-[36px]">
            {article.title}
          </h1>
          <p className="mt-4 font-serif text-[15.5px] italic leading-[1.45] text-[#d8e0ee] sm:text-[18px]">
            {article.excerpt}
          </p>
          <span className="mt-4 block h-[3px] w-[76px]" style={{ background: BRASS }} aria-hidden="true" />
          <p className="mt-5 flex items-center gap-2 text-[12px] uppercase tracking-[0.02em] text-[#c6d0e2]">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            <span>
              {article.dateline ? `${article.dateline} – ` : ''}
              <time dateTime={isoDate(article.date)}>{longDate(article.date)}</time>
            </span>
          </p>
        </div>
      </section>

      {/* ===== HERO (mobile) — row 2: image under the text ===== */}
      <div className="relative aspect-[16/10] w-full md:hidden">
        <Image
          src={article.image}
          alt={article.imageAlt || ''}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: article.imagePosition }}
        />
      </div>

      {/* ===== ARTICLE + SIDEBAR ===== */}
      <div className="mx-auto w-[min(1120px,calc(100%-40px))] pb-14 pt-8">
        <div className="flex flex-col gap-9 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-10">
          <article className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-[12px] text-[#555]">
                <Avatar initials={by.initials} />
                <span>
                  By <strong className="font-serif font-semibold text-[#111]">{by.name}</strong>
                </span>
                <span className="h-3.5 w-px bg-[#ccc]" aria-hidden="true" />
                <span>{article.readTime}</span>
              </div>
              <ShareRow article={article} url={url} />
            </div>

            {content.map((block, i) => renderBlock(block, i, i === firstParagraph))}

            {/* <FactCard card={article.factCard} /> */}

            {article.sources?.length > 0 && (
              <section className="mt-8 border-t border-[#dfe3ea] pt-5" aria-labelledby="rossini-sources-heading">
                <h2 id="rossini-sources-heading" className="mb-3 font-serif text-[19px] font-bold text-[#111]">
                  Sources &amp; References
                  <span className="mt-2 block h-[3px] w-10" style={{ background: BRASS }} aria-hidden="true" />
                </h2>
                <ul className="m-0 list-none space-y-3 p-0">
                  {article.sources.map((source) => (
                    <li key={source.url} className="border border-[#dfe3ea] bg-[#f9fafc] px-4 py-3">
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="group block">
                        <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: ACCENT }}>
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
                <ul className="m-0 list-none divide-y divide-[#dfe3ea] p-0">
                  {article.highlights.map((item) => {
                    const Icon = ICONS[item.icon] || Scale;
                    return (
                      <li key={item.text} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                        <Icon className="h-8 w-8 shrink-0" strokeWidth={1.5} style={{ color: NAVY }} />
                        <span className="font-serif text-[13px] leading-[1.35] text-[#333]">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </SideBox>
            )}

            {article.timeline?.length > 0 && (
              <SideBox title="Timeline" tint>
                <ol className="relative m-0 list-none p-0 pl-6 before:absolute before:bottom-2 before:left-[4px] before:top-2 before:w-px before:bg-[#c9a24a] before:content-['']">
                  {article.timeline.map((item) => (
                    <li key={item.date} className="relative pb-4 last:pb-0">
                      <span
                        className="absolute -left-6 top-[5px] h-[9px] w-[9px] rounded-full"
                        style={{ background: NAVY, boxShadow: `0 0 0 2px ${BRASS}` }}
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
                            <span className="font-bold uppercase tracking-[0.04em]" style={{ color: ACCENT }}>
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