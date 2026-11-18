// app/author/[slug]/page.jsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarDays, Newspaper, Layers, ShieldCheck, Mail } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoryCard from '@/components/ui/StoryCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Newsletter from '@/components/home/Newsletter';
import { AUTHOR_SLUG, AUTHOR_PATH } from '@/lib/author';
import { buildMetadata } from '@/lib/seo';
import { SITE_NAME, absoluteUrl } from '@/lib/site';
import { STAFF, articles, categories, formatDate, isoDate } from '@/lib/data';

const ACCENT = '#a30d32';
const FEED_LIMIT = 30;

const DESK_LABELS = {
  world: 'World',
  us: 'U.S.',
  business: 'Business',
  finance: 'Finance',
  politics: 'Politics',
  health: 'Health',
  technology: 'Technology',
  investigation: 'Investigation',
};

const TITLE = `${STAFF.name} — Newsroom Reporting`;
const DESCRIPTION =
  'Every story on Intellexa Journal is reported and edited by the Intellexa Journal Staff newsroom: world, U.S., business, finance, politics, health, technology and investigations.';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: AUTHOR_SLUG }];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (slug !== AUTHOR_SLUG) return {};
  return buildMetadata({
    title: TITLE,
    absoluteTitle: true,
    description: DESCRIPTION,
    path: AUTHOR_PATH,
  });
}

function Stat({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-3 border border-[#e2e2df] bg-white px-4 py-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f4f4f1]" aria-hidden="true">
        <Icon className="h-5 w-5" strokeWidth={1.6} style={{ color: ACCENT }} />
      </span>
      <div className="min-w-0">
        <strong className="block font-serif text-[22px] font-extrabold leading-none text-[#111]">{value}</strong>
        <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.07em] text-[#777]">{label}</span>
      </div>
    </div>
  );
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  if (slug !== AUTHOR_SLUG) notFound();

  const all = articles; // published, newest first
  const url = absoluteUrl(AUTHOR_PATH);
  const newest = all[0];

  // Desk counts for the chips + sidebar.
  const desks = categories
    .map((c) => ({
      slug: c,
      label: DESK_LABELS[c] || c,
      count: all.filter((a) => a.category === c).length,
    }))
    .filter((d) => d.count > 0);

  const [lead, ...others] = all.slice(0, FEED_LIMIT);

  return (
    <main className="bg-white pb-16">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          '@id': `${url}#profilepage`,
          url,
          name: TITLE,
          description: DESCRIPTION,
          isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: absoluteUrl('/') },
          mainEntity: {
            '@type': 'Organization',
            name: STAFF.name,
            url,
            description: STAFF.bio,
            parentOrganization: { '@type': 'NewsMediaOrganization', name: SITE_NAME, url: absoluteUrl('/') },
          },
        }}
      />

      <div className="mx-auto w-[min(1120px,calc(100%-40px))] pt-5">
        <Breadcrumbs
          className="text-[10px] uppercase tracking-[0.06em] text-gray-600 [&_a:hover]:text-[#111]"
          items={[
            { name: 'Home', path: '/' },
            { name: 'Authors', path: '/team' },
            { name: STAFF.name, path: AUTHOR_PATH },
          ]}
        />
      </div>

      {/* Profile header */}
      <header className="mx-auto mt-4 w-[min(1120px,calc(100%-40px))] border-t-[3px] border-[#111] pt-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:gap-8">
          <span
            className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-[#111] font-serif text-[34px] font-bold text-white md:h-32 md:w-32 md:text-[44px]"
            style={{ boxShadow: `0 0 0 4px #fff, 0 0 0 6px ${ACCENT}` }}
            aria-hidden="true"
          >
            {STAFF.initials}
          </span>

          <div className="min-w-0">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.1em]" style={{ color: ACCENT }}>
              Newsroom
            </span>
            <h1 className="mb-0 mt-1 font-serif text-[34px] font-black leading-[1.05] tracking-[-0.02em] text-[#111] sm:text-[46px]">
              {STAFF.name}
            </h1>
            <p className="mt-3 max-w-[680px] font-serif text-[16px] leading-[1.55] text-[#444]">{STAFF.bio}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {desks.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="rounded-full border border-[#ccc] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-[#333] transition-colors hover:border-[#111] hover:bg-[#111] hover:text-white"
                >
                  {d.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Stat icon={Newspaper} value={all.length} label="Stories published" />
          <Stat icon={Layers} value={desks.length} label="Newsroom desks" />
          <Stat icon={CalendarDays} value={newest ? formatDate(newest.date) : '—'} label="Latest story" />
        </div>
      </header>

      {/* Stories + sidebar */}
      <div className="mx-auto mt-10 grid w-[min(1120px,calc(100%-40px))] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_290px]">
        <section aria-label={`Latest stories by ${STAFF.name}`}>
          <SectionHeading title="Latest stories" tone="black" />

          {lead && (
            <div className="pb-5">
              <StoryCard article={lead} variant="featureCompact" priority />
            </div>
          )}

          <div className="border-t border-[#ddd]">
            {others.map((article) => (
              <StoryCard key={article.slug} article={article} variant="feed" />
            ))}
          </div>

          {all.length > FEED_LIMIT && (
            <p className="mt-5 text-[12px] text-[#666]">
              Showing the {FEED_LIMIT} most recent of {all.length} stories. Browse a desk above for the full archive.
            </p>
          )}
        </section>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-6 lg:self-start">
          <section className="border border-[#e2e2df] bg-[#f7f7f5] p-4">
            <h2 className="m-0 font-serif text-[15px] font-extrabold uppercase text-[#111]">About the newsroom</h2>
            <span className="mb-3 mt-2 block h-px w-full" style={{ background: ACCENT }} />
            <p className="m-0 font-serif text-[13.5px] leading-[1.55] text-[#444]">
              Intellexa Journal Staff is the byline for the whole newsroom. Every story is reported and edited
              under our published standards.
            </p>
            <ul className="m-0 mt-3 list-none space-y-2 p-0 text-[12.5px]">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: ACCENT }} aria-hidden="true" />
                <Link href="/policies/editorial" className="font-bold hover:underline">Editorial policy</Link>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: ACCENT }} aria-hidden="true" />
                <Link href="/policies/corrections" className="font-bold hover:underline">Corrections policy</Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" style={{ color: ACCENT }} aria-hidden="true" />
                <Link href="/contact" className="font-bold hover:underline">Contact the newsroom</Link>
              </li>
            </ul>
          </section>

          <section className="border-t-2 border-[#111] pt-3">
            <span className="mb-2 inline-block bg-[#111] px-2 text-[11px] font-extrabold uppercase text-white">By desk</span>
            <ul className="m-0 list-none divide-y divide-[#eee] p-0">
              {desks.map((d) => (
                <li key={d.slug}>
                  <Link href={`/${d.slug}`} className="flex items-center justify-between py-2.5 text-[13px] hover:underline">
                    <span className="font-serif font-bold text-[#111]">{d.label}</span>
                    <span className="text-[11px] font-bold text-[#888]">{d.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <div className="mx-auto mt-12 w-[min(1120px,calc(100%-40px))]">
        <Newsletter />
      </div>
    </main>
  );
}