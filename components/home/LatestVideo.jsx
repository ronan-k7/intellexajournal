import StoryCard from '@/components/ui/StoryCard';
import SectionHeading from '@/components/ui/SectionHeading';

export default function LatestVideo({ articles }) {
  if (!articles.length) return null;
  return (
    <section id="latest-video" className="mt-6">
      <SectionHeading title="Voices & Video" tone="black" />
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto sm:grid sm:grid-cols-4 sm:overflow-visible">
        {articles.map((article) => <StoryCard key={article.slug} article={article} variant="video" />)}
      </div>
    </section>
  );
}
