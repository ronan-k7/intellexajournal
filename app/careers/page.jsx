import StaticPage, { staticMetadata } from '@/components/StaticPage';

export const metadata = staticMetadata('/careers');

export default function Page() {
  return <StaticPage path="/careers" />;
}
