import Image from 'next/image';
import Featured from './Featured';
import { CLIENT_ARTICLE_SLUG } from '@/lib/client-article';
import LatestVideo from './LatestVideo';
import LeadNews from './LeadNews';
import Newsletter from './Newsletter';
import OpinionStrip from './OpinionStrip';
import Sponsored from './Sponsored';
import TopicSection from './TopicSection';

const ACCENT = '#a30d32';

export default function HomePage({ articles, authors }) {
  const byCategory = (category) => articles.filter((article) => article.category === category);

  // Every story appears ONCE on the home page. Each section "takes" the stories
  // it needs from its pool; anything already used by an earlier section is skipped.
  // Order below = priority (top stories first, then special sections, then topics).
  const used = new Set();
  const take = (pool, count) => {
    const picked = [];
    for (const article of pool) {
      if (picked.length >= count) break;
      if (used.has(article.slug)) continue;
      used.add(article.slug);
      picked.push(article);
    }
    return picked;
  };

  // Hero slot is pinned to the client story (falls back to the newest article).
  const hero = articles.find((a) => a.slug === CLIENT_ARTICLE_SLUG) || articles[0];
  used.add(hero.slug);
  const lead = take(articles, 10);
  const video = take(articles.filter((a) => a.video), 4);
  const featured = take(articles.filter((a) => a.featured), 4);
  const world = take(byCategory('world'), 6);
  const politics = take(byCategory('politics'), 6);
  const health = take(byCategory('health'), 6);
  const technology = take(byCategory('technology'), 6);
  const investigation = take(byCategory('investigation'), 6);
  // Leftovers only (stay hidden when everything is already shown above).
  const latest = take(articles, 6);
  const partner = take(articles, 4);
  return (
    <main className="mx-auto w-[min(1120px,calc(100%-40px))] pt-3 sm:pt-4">
      {/* <div className="mb-4 grid grid-cols-[auto_1fr] items-center gap-0 border border-[#d8d8d4] sm:grid-cols-[auto_1fr_auto]">
        <span className="grid h-[34px] place-items-center self-stretch px-3.5 text-[10px] font-extrabold uppercase text-white sm:h-[38px]" style={{ background: ACCENT }}>Live</span>
        <p className="mx-3.5 truncate font-serif text-[11px] sm:text-sm">Independent reporting from across the region — updated throughout the day</p>
        <a href="#latest" className="mr-3.5 hidden text-[11px] font-bold sm:inline" style={{ color: ACCENT }}>Follow updates →</a>
      </div> */}

      <LeadNews hero={hero} articles={lead} />
      <LatestVideo articles={video} />

      {/* <div className="my-6 grid h-[80px] place-items-start justify-center pt-3 text-center text-[8px] uppercase tracking-[0.12em] text-[#aaa] sm:h-[145px]" aria-label="Advertisement space">
        <span>Advertisement</span>
      </div> */}
       <div className="my-8 flex justify-center">
                <div className="relative w-full max-w-[728px]">
                  <span className="absolute left-2 top-2 z-10 bg-white/90 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#999]">
                    Advertisement
                  </span>
                  <div className="relative h-[120px] w-full overflow-hidden border border-[#e2e2df] bg-[#f2f2ef] sm:h-[90px]">
                    <Image
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=60"
                      alt="Advertisement"
                      fill
                      sizes="728px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

      <TopicSection title="Latest" tone="black" articles={latest} />
      <OpinionStrip authors={authors} />
      <TopicSection title="World" slug="world" tone="blue" articles={world} layout="split" />
      <Featured articles={featured} />
      <TopicSection title="Politics" slug="politics" tone="red" articles={politics} />
      <TopicSection title="Health" slug="health" tone="green" articles={health} layout="splitsecond" />
      <TopicSection title="Technology" slug="technology" tone="blue" articles={technology} />
      <TopicSection title="Investigation" slug="investigation" tone="black" articles={investigation} layout="split" />
      <Newsletter />
      <Sponsored articles={partner} />
    </main>
  );
}