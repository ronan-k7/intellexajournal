import StaticPage, { staticMetadata } from '@/components/StaticPage';

export const metadata = staticMetadata('/advertise');

export default function Page() {
  return <StaticPage path="/advertise" />;
}
