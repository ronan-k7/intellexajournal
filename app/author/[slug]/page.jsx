import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StoryCard from '@/components/ui/StoryCard';
import SectionHeading from '@/components/ui/SectionHeading';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';
import { SITE_NAME, absoluteUrl } from '@/lib/site';
import { authors, getAuthor, getAuthorArticles, getCategoryLabel } from '@/lib/data';

const ACCENT = '#a30d32';

export function generateStaticParams() { return authors.map((author) => ({ slug: author.slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return buildMetadata({
    title: `${author.name} — ${author.category.replace(/-/g, ' ')} reporter`,
    description: author.bio,
    path: `/author/${author.slug}`,
    image: author.profileImage,
    imageAlt: author.name,
    type: 'profile',
  });
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();
  const stories = getAuthorArticles(author.category);
  const [lead, ...rest] = stories;
  const colleagues = authors.filter((a) => a.category !== author.category).slice(0, 4);

  return (
    <main className="bg-white">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        url: absoluteUrl(`/author/${author.slug}`),
        mainEntity: {
          '@type': 'Person',
          '@id': `${absoluteUrl(`/author/${author.slug}`)}#person`,
          name: author.name,
          description: author.bio,
          image: author.profileImage,
          url: absoluteUrl(`/author/${author.slug}`),
          jobTitle: `${author.category.replace(/-/g, ' ')} reporter`,
          worksFor: { '@id': `${absoluteUrl('/')}#organization`, '@type': 'NewsMediaOrganization', name: SITE_NAME },
          sameAs: [author.websiteLink, ...Object.values(author.social || {})].filter(Boolean),
        },
      }} />

      {/* Masthead */}
      <section className="border-b-[6px] bg-[#0b0b0b] pb-9 pt-7 text-white" style={{ borderBottomColor: ACCENT }}>
        <div className="mx-auto w-[min(1120px,calc(100%-40px))]">
          <Breadcrumbs
            className="text-[11px] text-[#bbb] [&_span]:!text-[#bbb] [&_a:hover]:text-white"
            items={[{ name: 'Home', path: '/' }, { name: getCategoryLabel(author.category), path: `/${author.category}` }, { name: author.name, path: `/author/${author.slug}` }]}
          />
        </div>
        <div className="mx-auto mt-5 grid w-[min(1120px,calc(100%-40px))] grid-cols-1 items-center gap-4 text-center sm:grid-cols-[110px_1fr] sm:gap-6 sm:text-left lg:grid-cols-[140px_1fr] lg:gap-9">
          <Image
            src={author.profileImage}
            alt={author.name}
            width={140}
            height={140}
            priority
            className="mx-auto h-[90px] w-[90px] rounded-full border-2 border-[#333] object-cover sm:mx-0 lg:h-[140px] lg:w-[140px]"
          />
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: '#e96889' }}>Reporter profile</span>
            <h1 className="my-2 font-serif text-[38px] leading-[0.97] lg:text-[58px]">{author.name}</h1>
            <p className="max-w-[600px] font-serif text-[15px] text-[#ccc] lg:text-lg">{author.bio}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              <span className="border border-[#444] px-2.5 py-1 text-[10px] uppercase tracking-[0.05em] capitalize text-[#ddd]">{author.category.replace(/-/g, ' ')} desk</span>
              <span className="border border-[#444] px-2.5 py-1 text-[10px] uppercase tracking-[0.05em] text-[#ddd]">{author.country}</span>
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.05em] text-white" style={{ background: ACCENT }}>{stories.length} {stories.length === 1 ? 'story' : 'stories'}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-[min(1120px,calc(100%-40px))] pb-16 pt-7">
        {/* Contact / follow row */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[#eee] pb-5">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#999]">Follow {author.name.split(' ')[0]}</span>
          {author.websiteLink && <a href={author.websiteLink} className="text-[11px] font-bold" style={{ color: ACCENT }}>Website</a>}
          {author.social?.twitter && <a href={author.social.twitter} className="text-[11px] text-[#666]">X / Twitter</a>}
          {author.social?.medium && <a href={author.social.medium} className="text-[11px] text-[#666]">Medium</a>}
          {author.social?.reddit && <a href={author.social.reddit} className="text-[11px] text-[#666]">Reddit</a>}
          {author.social?.quora && <a href={author.social.quora} className="text-[11px] text-[#666]">Quora</a>}
        </div>

        {stories.length ? (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <SectionHeading title="Latest stories" href={`/${author.category}`} tone="red" />

              {lead && (
                <div className="mb-6 border-b border-[#ddd] pb-6">
                  <StoryCard article={lead} variant="featureCompact" priority />
                </div>
              )}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
                  {rest.map((article) => <StoryCard key={article.slug} article={article} variant="card" />)}
                </div>
              )}
            </div>

            <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:w-[260px] lg:shrink-0 lg:self-start">
              <div className="border-t border-[#111] pt-3">
                <span className="text-[10px] font-extrabold uppercase">About the newsroom</span>
                <p className="font-serif text-[14px]">Our journalists report independently and transparently. Corrections and updates are noted clearly.</p>
                <a href="#" className="text-[11px] font-bold" style={{ color: ACCENT }}>Editorial standards →</a>
              </div>

              {colleagues.length > 0 && (
                <div className="border-t border-[#111] pt-3">
                  <span className="text-[10px] font-extrabold uppercase">Other desks</span>
                  <div className="mt-2 flex flex-col gap-3">
                    {colleagues.map((colleague) => (
                      <Link key={colleague.slug} href={`/author/${colleague.slug}`} className="flex items-center gap-2.5">
                        <Image src={colleague.profileImage} alt={colleague.name} width={36} height={36} className="h-9 w-9 shrink-0 rounded-full grayscale-[25%]" />
                        <span>
                          <strong className="block font-serif text-[13px] leading-tight">{colleague.name}</strong>
                          <span className="text-[10px] capitalize text-[#777]">{colleague.category.replace(/-/g, ' ')} desk</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        ) : (
          <p className="mt-4 text-[15px]">No stories published yet.</p>
        )}

        <Link href="/" className="mt-10 inline-block font-bold text-[12px]" style={{ color: ACCENT }}>← Back to the front page</Link>
      </div>
    </main>
  );
}