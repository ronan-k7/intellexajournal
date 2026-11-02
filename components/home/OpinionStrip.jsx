import Image from 'next/image';
import Link from 'next/link';

export default function OpinionStrip({ authors }) {
  return (
    <section className="mt-16 border-b border-[#111] pb-4 sm:mt-24">
      <h2 className="mb-3 flex items-center gap-2.5 after:h-0.5 after:flex-1 after:bg-[#111]">
        <span className="bg-[#111] px-2 text-[11px] uppercase leading-6 text-white">Our Reporters</span>
      </h2>
      <div className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-5 sm:overflow-visible">
        {authors.map((author) => (
          <Link key={author.slug} href={`/author/${author.slug}`} className="grid min-w-[155px] grid-cols-[50px_1fr] items-center gap-x-2.5 sm:min-w-0">
            <Image src={author.profileImage} alt={author.name} width={50} height={50} className="row-span-2 h-[50px] w-[50px] rounded-full grayscale-[30%]" />
            <strong className="font-serif text-sm">{author.name}</strong>
            <span className="text-[10px] text-[#777] capitalize">{author.category.replace(/-/g, ' ')} desk</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
