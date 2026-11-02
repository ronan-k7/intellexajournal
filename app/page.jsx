import HomePage from '@/components/home/HomePage';
import JsonLd from '@/components/JsonLd';
import { getArticles } from '@/lib/data';
import { SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: `${SITE_NAME} | Independent local news`,
  absoluteTitle: true,
  description: SITE_DESCRIPTION,
  path: '/',
});

export default function Page() {
  const articles = getArticles();
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${absoluteUrl('/')}#webpage`,
          url: absoluteUrl('/'),
          name: `${SITE_NAME} — Independent local news`,
          description: SITE_DESCRIPTION,
          isPartOf: { '@id': `${absoluteUrl('/')}#website` },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: articles.slice(0, 10).map((a, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: absoluteUrl(`/${a.category}/${a.slug}`),
              name: a.title,
            })),
          },
        }}
      />
      <HomePage articles={articles} />
    </>
  );
}
