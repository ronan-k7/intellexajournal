import StoryCard from '@/components/ui/StoryCard';

// `hero` and `secondary` are pinned (the client feature stories) and never change
// when new articles are published; `articles` fills the other slots.
// `secondary` is always the 2nd item of the left column.
export default function LeadNews({ hero, secondary = null, articles }) {
  const lead = hero;
  const rest = articles;
  // With a pinned secondary story the left column uses rest[0] + secondary, so the
  // remaining slots shift back by one (no story is skipped, none is repeated).
  const leftItems = secondary ? [rest[0], secondary].filter(Boolean) : rest.slice(0, 2);
  const shift = secondary ? 1 : 2;
  if (!lead) return null;
  return (
    <section className="border-b border-[#111] pb-4" aria-label="Top stories">
      <div className="mb-3 flex items-end justify-between border-b-2 border-[#111]">
        <span className="inline-block bg-[#111] px-2 text-[11px] font-extrabold uppercase leading-6 tracking-[0.05em] text-white">National</span>
        <b className="mb-1 text-[10px] uppercase" style={{ color: '#a30d32' }}>Live</b>
      </div>

      <div className="flex flex-col gap-3 md:grid md:grid-cols-[170px_1fr_210px] lg:grid-cols-[205px_minmax(0,1fr)_245px] md:gap-4 lg:gap-[18px]">
        <div className="order-3 hidden grid-cols-2 gap-2.5 md:order-1 md:grid md:grid-cols-1 md:content-start md:gap-[15px]">
          {leftItems.map((article, i) => (
            <div key={article.slug} className={i > 0 ? 'border-t border-[#ddd] pt-3.5' : ''}>
              <StoryCard article={article} variant="compact" />
            </div>
          ))}
        </div>

        <div className="order-1 border-0 border-b border-[#ccc] pb-3.5 md:order-2 md:border-x md:border-b-0 md:px-4 md:pb-0">
          <StoryCard article={lead} variant="hero" priority />
        </div>

        <aside className="order-2 mt-3 md:order-3 md:mt-0 md:sticky md:top-[18px] md:h-fit md:self-start md:pl-0.5">
          <span className="mb-1 inline-block bg-[#111] px-2 text-[11px] font-extrabold uppercase leading-6 tracking-[0.05em] text-white">Latest updates</span>
          {rest.slice(shift, shift + 5).map((article) => <StoryCard key={article.slug} article={article} variant="line" />)}
        </aside>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-[#bbb] pt-3.5 sm:grid-cols-3 sm:gap-[22px]">
        {rest.slice(shift + 5, shift + 8).map((article) => (
          <StoryCard key={article.slug} article={article} variant="compact" />
        ))}
      </div>
    </section>
  );
}
