import { SITE_NAME, SITE_DESCRIPTION, SITE_LOCALE, DEFAULT_OG_IMAGE, TWITTER_HANDLE, absoluteUrl } from '@/lib/site';

// Builds full Next.js metadata (title, canonical, Open Graph, Twitter card).
// Next shallow-merges `openGraph`/`twitter`, so every page must supply the full
// object — this helper guarantees that.
export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = 'website',
  keywords,
  publishedTime,
  modifiedTime,
  section,
  authors,
  absoluteTitle = false,
} = {}) {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);
  const ogTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const images = [{ url: imageUrl, alt: imageAlt || title || SITE_NAME }];

  return {
    title: title ? (absoluteTitle ? { absolute: title } : title) : undefined,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type,
      images,
      ...(type === 'article'
        ? { publishedTime, modifiedTime: modifiedTime || publishedTime, section, authors }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [imageUrl],
      ...(TWITTER_HANDLE ? { site: TWITTER_HANDLE, creator: TWITTER_HANDLE } : {}),
    },
  };
}

// ── JSON-LD builders ─────────────────────────────────────────────────────
export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NewsMediaOrganization',
  '@id': `${absoluteUrl('/')}#organization`,
  name: SITE_NAME,
  url: absoluteUrl('/'),
  logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png'), width: 512, height: 512 },
  description: SITE_DESCRIPTION,
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${absoluteUrl('/')}#website`,
  name: SITE_NAME,
  url: absoluteUrl('/'),
  description: SITE_DESCRIPTION,
  inLanguage: 'en-US',
  publisher: { '@id': `${absoluteUrl('/')}#organization` },
};
