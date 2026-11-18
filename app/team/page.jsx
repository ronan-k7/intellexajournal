// app/team/page.jsx
import StaticPage, { staticMetadata } from '@/components/StaticPage';
import Link from 'next/link';
import { STAFF } from '@/lib/data';
import { AUTHOR_PATH } from '@/lib/author';

export const metadata = staticMetadata('/team');

export default function Page() {
  return (
    <StaticPage path="/team" wide>
      <div className="border-t-2 border-[#111] pt-4">
        <span className="grid h-24 w-24 place-items-center rounded-full bg-[#111] font-serif text-[32px] font-bold text-white" aria-hidden="true">{STAFF.initials}</span>
        <Link href={AUTHOR_PATH} className="mt-3 block font-serif text-[20px] font-bold leading-tight hover:underline">{STAFF.name}</Link>
        <p className="mt-1 max-w-[620px] font-serif text-[14px] leading-[1.5] text-[#555]">{STAFF.bio}</p>
      </div>
    </StaticPage>
  );
}