import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

// Visible breadcrumb trail + matching BreadcrumbList JSON-LD.
// items: [{ name, path }] — last item is the current page (not linked).
export default function Breadcrumbs({ items, className = '', style }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className={className} style={style}>
        <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="max-w-[60ch] truncate text-[#777]">{item.name}</span>
                ) : (
                  <>
                    <Link href={item.path} className="hover:underline">{item.name}</Link>
                    <span aria-hidden="true" className="text-[#999]">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
