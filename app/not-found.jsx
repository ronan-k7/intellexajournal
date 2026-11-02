import Link from 'next/link';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto w-[min(1120px,calc(100%-40px))] py-24 text-center">
      <span className="font-bold" style={{ color: '#a30d32' }}>404</span>
      <h1 className="font-serif text-[50px]">That story can&apos;t be found.</h1>
      <p>It may have moved, or the address may be incorrect.</p>
      <Link href="/" className="font-bold" style={{ color: '#a30d32' }}>Return to the front page</Link>
    </main>
  );
}
