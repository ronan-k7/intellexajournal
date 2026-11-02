import Image from 'next/image';

// Full-width quote banner. Takes the place of the old advertisement slots.
export default function QuoteBanner({ className = 'my-8' }) {
  return (
    <div className={className}>
      <Image
        src="/images/quote-banner.webp"
        alt="Small, consistent steps create big results over time."
        width={2170}
        height={297}
        sizes="(min-width: 1160px) 1120px, calc(100vw - 40px)"
        className="block h-auto w-full"
      />
    </div>
  );
}
