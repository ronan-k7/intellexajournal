
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Shield, Globe, Users, Mail, ArrowUp } from 'lucide-react';
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa6';
import { getArticles, formatDate } from '@/lib/data';

const ACCENT = '#a30d32';

// ── Reusable data ─────────────────────────────────────────────────────

const footerLinkGroups = [
  {
    heading: 'Sections',
    links: [
      { label: 'Home', href: '/' },
      { label: 'World', href: '/world' },
      { label: 'U.S.', href: '/us' },
      { label: 'Business', href: '/business' },
      { label: 'Finance', href: '/finance' },
      { label: 'Politics', href: '/politics' },
      { label: 'Health', href: '/health' },
      { label: 'Technology', href: '/technology' },
      { label: 'Investigation', href: '/investigation' },
    ],
  },
  {
    heading: 'Quick Links',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Advertise With Us', href: '/advertise' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Newsletters', href: '/newsletters' },
      { label: 'Sitemap', href: '/sitemap.xml' },
      { label: 'RSS Feed', href: '/feed.xml' },
    ],
  },
  {
    heading: 'Policies',
    links: [
      { label: 'Editorial Policy', href: '/policies/editorial' },
      { label: 'Corrections Policy', href: '/policies/corrections' },
      { label: 'Privacy Policy', href: '/policies/privacy' },
      { label: 'Terms & Conditions', href: '/policies/terms' },
      { label: 'Cookie Policy', href: '/policies/cookies' },
      { label: 'Ownership & Funding', href: '/policies/ownership' },
      { label: 'Right of Reply', href: '/policies/right-of-reply' },
      { label: 'Source Methodology', href: '/policies/methodology' },
    ],
  },
];

const socialLinks = [
  { name: 'Facebook', href: '#', Icon: FaFacebookF },
  { name: 'X', href: '#', Icon: FaXTwitter },
  { name: 'Instagram', href: '#', Icon: FaInstagram },
  { name: 'LinkedIn', href: '#', Icon: FaLinkedinIn },
  { name: 'YouTube', href: '#', Icon: FaYoutube },
];

const highlights = [
  {
    title: 'Live Updates',
    description: 'Real-time updates on developing stories',
    Icon: Clock,
  },
  {
    title: 'Trusted Journalism',
    description: 'Fact-checked reporting you can rely on',
    Icon: Shield,
  },
  {
    title: 'Global Perspective',
    description: 'Local stories with global impact',
    Icon: Globe,
  },
  {
    title: 'Community Focused',
    description: 'Amplifying voices that matter',
    Icon: Users,
  },
];

export default function Footer() {
  const latestArticles = getArticles().slice(0, 4);

  return (
    <footer className="bg-[#070707] text-white">

      {/* 1. Newsletter banner */}

      <div className="bg-white text-[#101010]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-10">

          <div className="flex items-start gap-4 lg:max-w-[520px]">

            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f2f2f2] sm:flex">
              <Mail className="h-5 w-5" style={{ color: ACCENT }} />
            </span>

            <div>
              <p
                className="text-[11px] font-bold tracking-[0.12em]"
                style={{ color: ACCENT }}
              >
                STAY INFORMED
              </p>

              <h2 className="mt-1 font-serif text-[26px] leading-tight sm:text-[30px]">
                The stories that shape our world.
              </h2>

              <p className="mt-2 text-[13px] leading-relaxed text-[#666]">
                Get the latest headlines, in-depth analysis and exclusive
                updates delivered to your inbox.
              </p>
            </div>
          </div>

          <div className="hidden h-14 w-px bg-[#ddd] lg:block" />

          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">

            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full min-w-0 border border-[#ddd] px-4 py-3 text-[13px] text-[#101010] outline-none placeholder:text-[#999] sm:w-72"
            />

            <button
              type="button"
              className="whitespace-nowrap px-6 py-3 text-[13px] font-semibold text-white"
              style={{ background: ACCENT }}
            >
              Subscribe
            </button>

          </div>
        </div>
      </div>

      {/* 2. Main footer */}

      <div className="mx-auto max-w-[1200px] px-5 py-10">

        {/*
          Mobile:
          Row 1: Brand (full width)
          Row 2: Sections | Quick Links
          Row 3: Policies | Latest Updates

          Desktop:
          Original five-column layout.
        */}

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-5 lg:gap-6">

          {/* Column 1: Brand */}

          <div className="col-span-2 lg:col-span-1">

            <Link
              href="/"
              className="inline-block font-serif text-[22px] font-bold uppercase leading-[1.15]"
            >
              Intellexa
              <br />
              Journal
            </Link>

            <span
              className="mt-2 block h-[3px] w-10"
              style={{ background: ACCENT }}
            />

            <p className="mt-3 text-[13px] leading-relaxed text-[#aaa]">
              Independent journalism. Trusted coverage from local communities
              to the global stage.
            </p>

            <div className="mt-4 flex gap-2">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#333] text-[#ccc] transition-colors hover:border-[#a30d32] hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>

          </div>

          {/* Columns 2-4: Sections, Quick Links, Policies */}

          {footerLinkGroups.map(({ heading, links }) => {

            const mobilePosition =
              heading === 'Sections'
                ? 'col-start-1 row-start-2'
                : heading === 'Quick Links'
                  ? 'col-start-2 row-start-2'
                  : 'col-start-1 row-start-3';

            return (
              <div
                key={heading}
                className={`group/col min-w-0 ${mobilePosition} lg:col-start-auto lg:row-start-auto`}
              >

                <h3 className="text-[11px] font-bold uppercase tracking-[0.08em]">
                  {heading}
                </h3>

                <span
                  className="mt-2 block h-[2px] w-6 transition-all duration-300 group-hover/col:w-10"
                  style={{ background: ACCENT }}
                />

                <ul className="mt-3 space-y-2">

                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="inline-block text-[13px] text-[#aaa] underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-[#a30d32] hover:decoration-[#a30d32]"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}

                </ul>

              </div>
            );
          })}

          {/* Column 5: Latest Updates */}

          <div className="col-start-2 row-start-3 min-w-0 lg:col-start-auto lg:row-start-auto">

            <h3 className="text-[11px] font-bold uppercase tracking-[0.08em]">
              Latest Updates
            </h3>

            <span
              className="mt-2 block h-[2px] w-6"
              style={{ background: ACCENT }}
            />

            <ul className="mt-3 space-y-3">

              {latestArticles.map((article) => (
                <li key={article.slug}>

                  <Link
                    href={`/${article.category}/${article.slug}`}
                    className="group flex gap-2 lg:gap-3"
                  >

                    <span className="relative block h-12 w-14 shrink-0 overflow-hidden bg-[#1a1a1a] sm:w-16">

                      <Image
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />

                    </span>

                    <span className="min-w-0">

                      <span
                        className="block text-[9px] font-bold uppercase tracking-[0.04em] lg:text-[10px]"
                        style={{ color: ACCENT }}
                      >
                        {article.categoryLabel}
                      </span>

                      <span className="mt-0.5 block text-[10px] leading-snug text-[#eee] transition-colors duration-200 group-hover:text-[#a30d32] lg:text-[11px]">
                        {article.title}
                      </span>

                    </span>

                  </Link>

                </li>
              ))}

            </ul>

          </div>

        </div>
      </div>

      {/* 3. Editorial highlights row */}

      <div className="border-t border-[#333]">

        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-5 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#333]">

          {highlights.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="flex items-start gap-3 lg:px-6 lg:first:pl-0"
            >

              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: ACCENT, color: ACCENT }}
              >
                <Icon className="h-4 w-4" />
              </span>

              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.06em]">
                  {title}
                </p>

                <p className="mt-0.5 text-[12px] leading-snug text-[#aaa]">
                  {description}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* 4. Bottom copyright bar */}

      <div className="border-t border-[#333]">

        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-2 px-5 py-4 text-[11px] text-[#777] sm:flex-row sm:justify-between sm:gap-4">

          <p>
            © {new Date().getFullYear()} Intellexa Journal. All rights reserved.
          </p>

          <p className="hidden sm:block sm:border-l sm:border-[#333] sm:pl-4">
            Designed for clarity. Built for readers.
          </p>

          <a
            href="#"
            className="flex items-center gap-1 text-[#aaa] transition-colors hover:text-white"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" style={{ color: ACCENT }} />
          </a>

        </div>
      </div>

    </footer>
  );
}
