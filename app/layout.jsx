import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_LOCALE, DEFAULT_OG_IMAGE } from '@/lib/site';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import './globals.css';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: { default: `${SITE_NAME} | Independent local news`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  alternates: { types: { 'application/rss+xml': [{ url: '/feed.xml', title: `${SITE_NAME} RSS Feed` }] } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    title: SITE_NAME,
    description: 'Independent. Local. Essential.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: SITE_LOCALE,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'Independent. Local. Essential.',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 bg-white text-[15px] leading-[1.4] text-[#101010] font-sans antialiased">
        {/* Sitewide structured data: publisher + website */}
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
