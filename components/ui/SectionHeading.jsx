import Link from 'next/link';

const toneMap = {
  black: '#111',
  green: '#38653a',
  lime: '#7a9a2e',
  blue: '#1d4e89',
  red: '#a30d32',
  orange: '#c05a1d',
};

export default function SectionHeading({ title, href, tone = 'green' }) {
  const color = toneMap[tone] || toneMap.green;
  return (
    <div className="mb-3 flex items-end justify-between border-b-2" style={{ borderColor: color }}>
      <h2 className="m-0">
        <span className="inline-block bg-[#111] px-2 text-[11px] font-extrabold uppercase leading-6 tracking-[0.05em] text-white">{title}</span>
      </h2>
      {href && (
        <Link href={href} className="mb-1 text-[10px] font-bold uppercase">
          View all <span>→</span>
        </Link>
      )}
    </div>
  );
}
