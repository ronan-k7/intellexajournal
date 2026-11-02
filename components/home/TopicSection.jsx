import StoryCard from '@/components/ui/StoryCard';
import SectionHeading from '@/components/ui/SectionHeading';

export default function TopicSection({ title, slug, tone, articles, flip = false, layout: requestedLayout = 'default' }) {
  if (!articles.length) return null;
  // Split layouts need at least 3 stories; fall back to the simple layout otherwise.
  const layout = articles.length >= 3 ? requestedLayout : 'default';

  if (layout === 'split') {
    const listB = articles.slice(2, 6);

    return (
      <section className="mt-6">
        <SectionHeading title={title} href={slug ? `/${slug}` : undefined} tone={tone} />

        <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3">
          <div>
            <StoryCard article={articles[0]} variant="feature" />
          </div>

          <div className="border-t pt-3 md:border-t-0 md:pt-0 lg:border-l lg:pl-4 border-[#ddd]">
            <StoryCard article={articles[1]} variant="feature" />
          </div>

          <div className="flex flex-col gap-1 border-t pt-3 md:border-t-0 md:pt-0 lg:border-l lg:pl-4 border-[#ddd]">
            {listB.map((article) => (
              <StoryCard key={article.slug} article={article} variant="line" />
            ))}
          </div>
        </div>
      </section>
    );
  } 
    if (layout === 'splitsecond') {
    const listB = articles.slice(2, 6);

    return (
      <section className="mt-6">
        <SectionHeading title={title} href={slug ? `/${slug}` : undefined} tone={tone} />

        <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-1">
            {listB.map((article) => (
              <StoryCard key={article.slug} article={article} variant="line" />
            ))}
          </div>
          <div className='border-t pt-3 md:border-t-0 md:pt-0 lg:border-l lg:pl-4 border-[#ddd]'>
            <StoryCard article={articles[0]} variant="feature" />
          </div>
          
          <div className="border-t pt-3 md:border-t-0 md:pt-0 lg:border-l lg:pl-4 border-[#ddd]">
            <StoryCard article={articles[1]} variant="feature" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-6">
      <SectionHeading title={title} href={slug ? `/${slug}` : undefined} tone={tone} />

      <div className={`grid grid-cols-1 gap-5 md:gap-6 ${articles.length > 1 ? 'lg:grid-cols-[1.35fr_.65fr]' : ''} ${flip && articles.length > 1 ? 'lg:grid-cols-[.65fr_1.35fr]' : ''}`}>
        <div className={flip ? 'lg:order-2' : ''}>
          <StoryCard article={articles[0]} variant="feature" />
        </div>

        {articles.length > 1 && <div
          className={`flex flex-col gap-1 border-t pt-3 md:border-t-0 md:pt-0 ${
            flip
              ? 'lg:order-1 lg:border-r lg:border-t-0 lg:border-l-0 lg:pr-4'
              : 'lg:border-l lg:pl-4'
          } border-[#ddd] md:sticky md:top-[18px] md:h-fit md:self-start`}
        >
          {articles.slice(1, 6).map((article) => (
            <StoryCard key={article.slug} article={article} variant="line" />
          ))}
        </div>}
      </div>
    </section>
  );
}