import Link from 'next/link';
import StaticPage, { staticMetadata } from '@/components/StaticPage';
import { PAGES, POLICY_PATHS } from '@/lib/static-pages.mjs';
import { absoluteUrl } from '@/lib/site';

export const metadata = staticMetadata('/policies');

export default function Page() {
  return (
    <StaticPage
      path="/policies"
      wide
      jsonLd={{
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: POLICY_PATHS.map((p, i) => ({
            '@type': 'ListItem', position: i + 1, url: absoluteUrl(p), name: PAGES[p].title,
          })),
        },
      }}
    >
      <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
        {POLICY_PATHS.map((p) => (
          <li key={p}>
            <Link href={p} className="group block border border-[#e2e2df] bg-[#f7f7f5] p-5 transition-shadow hover:shadow-md">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#a30d32]">{PAGES[p].eyebrow}</span>
              <strong className="mt-1 block font-serif text-[20px] group-hover:underline">{PAGES[p].title}</strong>
              <span className="mt-1 block font-serif text-[14px] leading-[1.5] text-[#555]">{PAGES[p].intro}</span>
            </Link>
          </li>
        ))}
      </ul>
    </StaticPage>
  );
}
