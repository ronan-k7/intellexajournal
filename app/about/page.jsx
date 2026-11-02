import StaticPage, { staticMetadata } from '@/components/StaticPage';

export const metadata = staticMetadata('/about');

export default function Page() {
  return <StaticPage path="/about" />;
}
