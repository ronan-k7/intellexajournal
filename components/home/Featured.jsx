import StoryCard from '@/components/ui/StoryCard';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Featured({ articles }) {
  if (!articles.length) return null;
  return (
    <section className="mt-6">
      <SectionHeading title="Featured" tone="orange" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => <StoryCard key={article.slug} article={article} variant="card" />)}
      </div>
    </section>
  );
}
