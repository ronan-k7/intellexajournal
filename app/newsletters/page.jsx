import StaticPage, { staticMetadata } from '@/components/StaticPage';
import Newsletter from '@/components/home/Newsletter';

export const metadata = staticMetadata('/newsletters');

export default function Page() {
  return (
    <StaticPage path="/newsletters" wide>
      <Newsletter />
    </StaticPage>
  );
}
