import { notFound } from 'next/navigation';
import StaticPage, { staticMetadata } from '@/components/StaticPage';
import { POLICY_PATHS } from '@/lib/static-pages.mjs';

export const dynamicParams = false;

export function generateStaticParams() {
  return POLICY_PATHS.map((p) => ({ policy: p.replace('/policies/', '') }));
}

export async function generateMetadata({ params }) {
  const { policy } = await params;
  const path = `/policies/${policy}`;
  return POLICY_PATHS.includes(path) ? staticMetadata(path) : {};
}

export default async function Page({ params }) {
  const { policy } = await params;
  const path = `/policies/${policy}`;
  if (!POLICY_PATHS.includes(path)) notFound();
  return <StaticPage path={path} />;
}
