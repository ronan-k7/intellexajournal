import Image from 'next/image';
import Link from 'next/link';
import { parseDate } from '@/lib/data';

const ACCENT = '#a30d32';

// Per-variant layout classes for the outer <article>, the image wrapper, and the title.
const variants = {
  hero: {
    wrap: 'flex flex-col',
    image: 'relative block aspect-[1.42] overflow-hidden bg-[#e7e7e4]',
    copy: '',
    title: 'font-serif text-[29px] sm:text-[37px] leading-[1.05]',
    showDek: true,
    dekClass: 'my-1.5 text-[14px] leading-[1.4] text-[#4d4d4a]',
    showMeta: true,
  },
  compact: {
    wrap: 'flex flex-col',
    image: 'relative block aspect-[1.42] overflow-hidden bg-[#e7e7e4]',
    copy: 'pt-1.5',
    title: 'font-serif text-lg leading-[1.14]',
    showDek: true,
    dekClass: 'my-1.5 text-[12.5px] leading-[1.4] text-[#4d4d4a]',
    showMeta: false,
  },
  line: {
    wrap: 'grid grid-cols-[92px_1fr] gap-2.5 border-b border-[#ddd] py-2.5',
    image: 'relative block aspect-[1.35] overflow-hidden bg-[#e7e7e4]',
    copy: '',
    title: 'font-serif text-[15px] leading-[1.16]',
    showDek: false,
    showMeta: false,
  },
  video: {
    wrap: 'flex min-w-[67vw] snap-start flex-col sm:min-w-0',
    image: 'relative block aspect-[1.28] overflow-hidden bg-[#e7e7e4]',
    copy: '',
    title: 'mt-1.5 font-serif text-base leading-[1.14]',
    showDek: false,
    showMeta: false,
  },
  sectionLead: {
    wrap: 'flex flex-col',
    image: 'relative block aspect-[2.4] overflow-hidden bg-[#e7e7e4]',
    copy: 'pt-2',
    title: 'font-serif text-[21px] sm:text-[25px] leading-[1.12]',
    showDek: true,
    dekClass: 'my-1.5 line-clamp-2 text-[13px] leading-[1.4] text-[#4d4d4a]',
    showMeta: true,
  },
  feature: {
    wrap: 'flex flex-col',
    image: 'relative block aspect-[1.52] overflow-hidden bg-[#e7e7e4]',
    copy: '',
    title: 'mt-2 font-serif text-[28px] leading-[1.1]',
    showDek: true,
    dekClass: 'my-1.5 text-[13.5px] leading-[1.4] text-[#4d4d4a]',
    showMeta: false,
  },
  // Same as `feature` but with a shorter image — used on the author page so
  // the lead story doesn't push the sidebar/fold down as far.
  featureCompact: {
    wrap: 'flex flex-col',
    image: 'relative block aspect-[1.9] overflow-hidden bg-[#e7e7e4]',
    copy: '',
    title: 'mt-2 font-serif text-[28px] leading-[1.1]',
    showDek: true,
    dekClass: 'my-1.5 text-[13.5px] leading-[1.4] text-[#4d4d4a]',
    showMeta: false,
  },
  card: {
    wrap: 'flex flex-col',
    image: 'relative block aspect-[1.45] overflow-hidden bg-[#e7e7e4]',
    copy: 'pt-2',
    title: 'font-serif text-[19px] leading-[1.14]',
    showDek: true,
    dekClass: 'my-1.5 text-[12.5px] leading-[1.4] text-[#4d4d4a]',
    showMeta: false,
  },
  feed: {
    wrap: 'grid grid-cols-[118px_1fr] gap-2.5 border-b border-[#ddd] py-3 sm:grid-cols-[230px_1fr] sm:gap-5 sm:py-4',
    image: 'relative block aspect-[1.55] overflow-hidden bg-[#e7e7e4]',
    copy: '',
    title: 'font-serif text-lg leading-[1.14] sm:text-2xl',
    showDek: true,
    dekClass: 'my-1.5 block text-[12.5px] leading-[1.4] text-[#4d4d4a]',
    showMeta: false,
  },
  micro: {
    wrap: 'flex flex-col',
    image: 'relative block aspect-[1.5] overflow-hidden bg-[#e7e7e4]',
    copy: 'pt-1',
    title: 'font-serif text-sm leading-[1.16]',
    showDek: false,
    showMeta: false,
  },
  tile: {
    wrap: 'flex flex-col',
    image: 'relative block aspect-[1.5] overflow-hidden bg-[#e7e7e4] rounded-sm',
    copy: 'pt-2.5',
    title: 'font-serif text-[16px] font-bold leading-[1.28]',
    showDek: false,
    showCategory: false,
    showMeta: true,
    showReadTime: false,
  },
};

export default function StoryCard({ article, variant = 'card', priority = false }) {
  const v = variants[variant] || variants.card;
  const displayDate = article.date
    ? parseDate(article.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <article className={`min-w-0 ${v.wrap}`}>
      <Link className={v.image} href={`/${article.category}/${article.slug}`} aria-label={article.title}>
        <Image
          src={article.image}
          alt={article.imageAlt || ''}
          fill
          sizes={
            variant === 'hero'
              ? '(max-width: 760px) 100vw, 58vw'
              : variant === 'sectionLead'
                ? '(max-width: 760px) 100vw, 45vw'
                : '(max-width: 760px) 100vw, 33vw'
          }
          priority={priority}
          className="object-cover transition-transform duration-300 ease-out hover:scale-[1.02]"
          style={article.imagePosition ? { objectPosition: article.imagePosition } : undefined}
        />
      </Link>
      <div className={v.copy}>
        {v.showCategory !== false && (
          <Link
            href={`/${article.category}`}
            className="mb-1 inline-block text-[10px] font-bold uppercase tracking-[0.1em]"
            style={{ color: ACCENT }}
          >
            {article.categoryLabel}
          </Link>
        )}
        <h3 className={`m-0 tracking-[-0.01em] ${v.title}`}>
          <Link href={`/${article.category}/${article.slug}`} className="hover:underline hover:decoration-[#a30d32] hover:underline-offset-2">
            {article.title}
          </Link>
        </h3>
        {v.showDek && article.excerpt && (
          <p className={`line-clamp-2 ${v.dekClass}`}>{article.excerpt}</p>
        )}
        {v.showMeta && (
          <div className="mt-1.5 flex gap-2 text-[10px] uppercase text-[#8b8b87]">
            {v.showReadTime !== false && <span>{article.readTime}</span>}
            <time dateTime={article.date}>{displayDate}</time>
          </div>
        )}
      </div>
    </article>
  );
}