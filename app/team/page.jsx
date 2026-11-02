import Image from 'next/image';
import Link from 'next/link';
import StaticPage, { staticMetadata } from '@/components/StaticPage';
import { authors, getCategoryLabel } from '@/lib/data';
import { absoluteUrl } from '@/lib/site';

export const metadata = staticMetadata('/team');

export default function Page() {
  return (
    <StaticPage
      path="/team"
      wide
      jsonLd={{
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: authors.map((a, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Person',
              name: a.name,
              url: absoluteUrl(`/author/${a.slug}`),
              image: a.profileImage,
              jobTitle: `${getCategoryLabel(a.category)} reporter`,
              worksFor: { '@id': `${absoluteUrl('/')}#organization` },
            },
          })),
        },
      }}
    >
      <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {authors.map((a) => (
          <li key={a.slug} className="border-t-2 border-[#111] pt-4">
            <Link href={`/author/${a.slug}`} className="group block">
              <Image src={a.profileImage} alt={a.name} width={96} height={96} className="h-24 w-24 rounded-full grayscale-[20%]" />
              <span className="mt-3 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#a30d32]">{getCategoryLabel(a.category)} desk</span>
              <strong className="block font-serif text-[20px] leading-tight group-hover:underline">{a.name}</strong>
              <p className="mt-1 line-clamp-4 font-serif text-[14px] leading-[1.5] text-[#555]">{a.bio}</p>
            </Link>
          </li>
        ))}
      </ul>
    </StaticPage>
  );
}
