import Link from 'next/link';
import { notFound } from 'next/navigation';
import QuoteBanner from '@/components/ui/QuoteBanner';
import StoryCard from '@/components/ui/StoryCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Newsletter from '@/components/home/Newsletter';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CLIENT_ARTICLE_SLUG, CLIENT_ARTICLE_CATEGORY, VANITY_ARTICLE_SLUG, VANITY_ARTICLE_CATEGORY } from '@/lib/client-article';
import { buildMetadata } from '@/lib/seo';
import { SITE_NAME, absoluteUrl } from '@/lib/site';
import { articles, getCategoryArticles } from '@/lib/data';

const ACCENT = '#a30d32';

const categoryNames = {
  world: 'World',
  us: 'U.S.',
  business: 'Business',
  finance: 'Finance',
  politics: 'Politics',
  health: 'Health',
  technology: 'Technology',
  investigation: 'Investigation',
};
const categoryIntros = {
  world: 'Global affairs, diplomacy and the events shaping international headlines.',
  us: 'National reporting on politics, policy and everyday life across the United States.',
  business: 'Clear reporting on enterprise, work and the changing economy.',
  finance: 'Markets, the Federal Reserve and the economic forces moving Wall Street.',
  politics: 'Congress, the White House and the campaigns shaping power in Washington.',
  health: 'Public health, medicine and the policies shaping care for patients across the country.',
  technology: 'AI, big tech and the infrastructure powering the next wave of innovation.',
  investigation: 'Accountability reporting and in-depth investigations that follow the record.',
};
const categoryTones = {
  world: 'blue',
  us: 'red',
  business: 'blue',
  finance: 'green',
  politics: 'red',
  health: 'green',
  technology: 'blue',
  investigation: 'black',
};

export function generateStaticParams() { return Object.keys(categoryNames).map((category) => ({ category })); }

export async function generateMetadata({ params }) {
  const { category } = await params;
  if (!categoryNames[category]) return {};
  return buildMetadata({
    title: `${categoryNames[category]} News`,
    description: categoryIntros[category],
    path: `/${category}`,
    // No `image` → falls back to the default Intellexa Journal brand image.
  });
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const items = getCategoryArticles(category);
  if (!categoryNames[category] || !items.length) notFound();

  // The client stories are pinned as the lead of their own category (static, never displaced).
  const pinnedSlugs = { [CLIENT_ARTICLE_CATEGORY]: CLIENT_ARTICLE_SLUG, [VANITY_ARTICLE_CATEGORY]: VANITY_ARTICLE_SLUG };
  const pinnedSlug = pinnedSlugs[category];
  const pinned = pinnedSlug ? items.find((a) => a.slug === pinnedSlug) : null;
  const ordered = pinned ? [pinned, ...items.filter((a) => a.slug !== pinned.slug)] : items;
  const [lead, ...rest] = ordered;
  const alsoIn = rest.slice(0, 4);
  const fallback = articles.filter((article) => article.category !== category).slice(0, 4);
  const tone = categoryTones[category] || 'black';

  return (
    <main className="pb-16">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${categoryNames[category]} News | ${SITE_NAME}`,
        description: categoryIntros[category],
        url: absoluteUrl(`/${category}`),
        isPartOf: { '@id': `${absoluteUrl('/')}#website` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: items.slice(0, 20).map((a, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: absoluteUrl(`/${a.category}/${a.slug}`),
            name: a.title,
          })),
        },
      }} />

      {/* Masthead */}
      <header className="border-b border-[#111] bg-white pb-6 pt-6">
        <div className="mx-auto w-[min(1120px,calc(100%-40px))]">
          <Breadcrumbs
            className="mb-2 text-[11px]"
            style={{ color: ACCENT }}
            items={[{ name: 'Home', path: '/' }, { name: categoryNames[category], path: `/${category}` }]}
          />
          <span className="inline-block bg-[#111] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-white">Section</span>
          <h1 className="m-0 mt-2 font-serif text-[40px] font-extrabold leading-[1.02] sm:text-[56px]">{categoryNames[category]}</h1>
          <p className="mt-2 max-w-[620px] font-serif text-[15px] leading-[1.5] text-[#555] sm:text-base">{categoryIntros[category]}</p>
        </div>
      </header>

      <div className="mx-auto w-[min(1120px,calc(100%-40px))]">
        {/* Lead split: top story + rest of the section */}
        <section className="mt-6 border-b border-[#111] pb-4" aria-label={`Top ${categoryNames[category]} story`}>
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8">
            <div>
              <StoryCard article={lead} variant="sectionLead" priority />
            </div>
            {alsoIn.length > 0 && (
              <aside className="border-t border-[#ddd] pt-3 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
                <span className="mb-1 inline-block bg-[#111] px-2 text-[11px] font-extrabold uppercase leading-6 tracking-[0.05em] text-white">Also in {categoryNames[category]}</span>
                {alsoIn.map((article) => <StoryCard key={article.slug} article={article} variant="line" />)}
              </aside>
            )}
          </div>
        </section>

        <QuoteBanner />

        {/* Full index of the section */}
        <section id="more-stories" className="mt-2 scroll-mt-6">
          <SectionHeading title={`Every ${categoryNames[category]} story`} tone={tone} />
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((article) => (
              <StoryCard key={`index-${article.slug}`} article={article} variant="tile" />
            ))}
          </div>
        </section>

        <Newsletter />

        {fallback.length > 0 && (
          <section>
            <SectionHeading title="From other desks" href="/" tone="black" />
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {fallback.map((article) => (
                <StoryCard key={`more-${article.slug}`} article={article} variant="tile" />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}