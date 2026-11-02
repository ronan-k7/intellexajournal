import Image from 'next/image';
import Link from 'next/link';

const ACCENT = '#a30d32';

const socialLabels = { twitter: 'X / Twitter', medium: 'Medium', quora: 'Quora', reddit: 'Reddit' };

// A byline / "about the reporter" card. `variant="full"` is the larger card
// used at the foot of an article or inside a category page; `variant="mini"`
// is a compact sidebar version.
export default function AuthorCard({ author, variant = 'full', storyCount }) {
  if (!author) return null;

  if (variant === 'mini') {
    return (
      <div className="border border-[#e2e2df] p-3.5 bg-[#f7f7f5] shadow-sm transition-shadow rounded-md">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.08em]" style={{ color: ACCENT }}>Desk editor</span>
        <Link href={`/author/${author.slug}`} className="mt-1.5 flex items-center gap-2.5">
          <Image src={author.profileImage} alt={author.name} width={40} height={40} className="h-10 w-10 shrink-0 rounded-full grayscale-[20%]" />
          <span>
            <strong className="block font-serif text-[15px] leading-tight">{author.name}</strong>
            <span className="text-[10px] capitalize text-[#777]">{author.category?.replace(/-/g, ' ')} desk</span>
          </span>
        </Link>
        <p className="mt-2 line-clamp-3 font-serif text-[12.5px] leading-[1.45] text-[#555]">{author.bio}</p>
        <Link href={`/author/${author.slug}`} className="mt-1.5 inline-block text-[11px] font-bold" style={{ color: ACCENT }}>
          More from {author.name.split(' ')[0]} →
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4 border-t-2 border-[#111] pt-5 sm:flex-row sm:items-center">
      <Image src={author.profileImage} alt={author.name} width={64} height={64} className="h-16 w-16 shrink-0 rounded-full grayscale-[15%]" />
      <div className="flex-1">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: ACCENT }}>
          Written by
        </span>
        <h3 className="m-0 font-serif text-[22px] leading-tight">
          <Link href={`/author/${author.slug}`} className="hover:underline">{author.name}</Link>
        </h3>
        <p className="mt-1 max-w-[560px] font-serif text-[13.5px] leading-[1.5] text-[#555]">{author.bio}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[11px]">
          <span className="capitalize text-[#777]">{author.category?.replace(/-/g, ' ')} desk · {author.country}</span>
          {typeof storyCount === 'number' && (
            <span className="text-[#777]">{storyCount} {storyCount === 1 ? 'story' : 'stories'} published</span>
          )}
          {author.social?.twitter && (
            <a href={author.social.twitter} className="font-bold" style={{ color: ACCENT }}>{socialLabels.twitter}</a>
          )}
        </div>
      </div>
      <Link
        href={`/author/${author.slug}`}
        className="shrink-0 self-start whitespace-nowrap border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.04em] sm:self-center"
        style={{ borderColor: ACCENT, color: ACCENT }}
      >
        View profile
      </Link>
    </div>
  );
}
