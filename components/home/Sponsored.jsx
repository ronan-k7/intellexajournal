import StoryCard from '@/components/ui/StoryCard';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Sponsored({ articles }) {
  if (!articles.length) return null;
  return (
    <section id="notices" className="mt-6 mb-12">
      <SectionHeading title="Partner content" tone="black" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => <StoryCard key={article.slug} article={article} variant="compact" />)}
      </div>
    </section>
  );
}
