import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';
import { SITE_NAME, absoluteUrl } from '@/lib/site';
import { PAGES, EMAILS, LAST_UPDATED, LAST_UPDATED_LABEL } from '@/lib/static-pages.mjs';

const ACCENT = '#a30d32';

// Metadata (title, description, canonical, Open Graph, Twitter) for a footer page.
export function staticMetadata(path) {
  const page = PAGES[path];
  return buildMetadata({
    title: page.metaTitle,
    absoluteTitle: true,
    description: page.metaDescription,
    path,
  });
}

export function pageBreadcrumbs(path) {
  const page = PAGES[path];
  const items = [{ name: 'Home', path: '/' }];
  if (page.parent) items.push({ name: PAGES[`/${page.parent}`].title, path: `/${page.parent}` });
  items.push({ name: page.title, path });
  return items;
}

export function MailLink({ k }) {
  const email = EMAILS[k];
  return (
    <a href={`mailto:${email}`} className="font-bold underline underline-offset-4" style={{ color: ACCENT }}>{email}</a>
  );
}

// Shared shell for About, Team, Contact, Advertise, Careers, Newsletters and policies.
// `children` renders after the text sections; `jsonLd` adds extra schema.org nodes.
export default function StaticPage({ path, children, jsonLd, wide = false }) {
  const page = PAGES[path];
  const url = absoluteUrl(path);
  const isLegal = path.startsWith('/policies/');

  return (
    <main className="bg-white pb-16">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': page.schema,
          '@id': `${url}#webpage`,
          url,
          name: page.metaTitle,
          headline: page.title,
          description: page.metaDescription,
          inLanguage: 'en-US',
          dateModified: LAST_UPDATED,
          isPartOf: { '@type': 'WebSite', '@id': `${absoluteUrl('/')}#website`, name: SITE_NAME, url: absoluteUrl('/') },
          publisher: { '@type': 'NewsMediaOrganization', '@id': `${absoluteUrl('/')}#organization`, name: SITE_NAME },
          ...(jsonLd || {}),
        }}
      />

      <header className="border-b border-[#111] pb-7 pt-6">
        <div className="mx-auto w-[min(1120px,calc(100%-40px))]">
          <Breadcrumbs className="mb-3 text-[11px]" style={{ color: ACCENT }} items={pageBreadcrumbs(path)} />
          <span className="inline-block bg-[#111] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-white">{page.eyebrow}</span>
          <h1 className="m-0 mt-2 font-serif text-[38px] font-extrabold leading-[1.05] sm:text-[54px]">{page.title}</h1>
          <p className="mt-3 max-w-[680px] font-serif text-[16px] leading-[1.55] text-[#555] sm:text-[18px]">{page.intro}</p>
          {isLegal && <p className="mt-3 text-[11px] uppercase tracking-[0.06em] text-[#888]">Last updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time></p>}
        </div>
      </header>

      <div className="mx-auto w-[min(1120px,calc(100%-40px))] pt-8">
        <div className={wide ? '' : 'max-w-[760px]'}>
          {page.sections.map((section) => (
            <section key={section.heading} className="mb-8">
              <h2 className="mb-3 font-serif text-[24px] font-black leading-tight text-[#111]">{section.heading}</h2>
              {section.paragraphs?.map((text, i) => (
                <p key={i} className="mb-3 font-serif text-[17px] leading-[1.7] text-[#2b2b2b]">{text}</p>
              ))}
              {section.list && (
                <ul className="mb-3 list-disc space-y-2 pl-5 font-serif text-[17px] leading-[1.6] text-[#2b2b2b] marker:text-[#a30d32]">
                  {section.list.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {section.email && <p className="font-serif text-[17px]">Email: <MailLink k={section.email} /></p>}
              {section.links && (
                <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[13px] font-bold">
                  {section.links.map((l) => <Link key={l.href} href={l.href} className="hover:underline" style={{ color: ACCENT }}>{l.label} →</Link>)}
                </p>
              )}
            </section>
          ))}
        </div>
        {children}
      </div>
    </main>
  );
}
