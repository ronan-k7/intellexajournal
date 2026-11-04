'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaXTwitter, FaInstagram, FaRedditAlien } from 'react-icons/fa6';
import { SiMedium, SiSubstack } from 'react-icons/si';
import { categoryList, articles } from '@/lib/data';

const ACCENT = '#a30d32';

// ── Flat, searchable list of every published article ──────────────────────
const ALL_ARTICLES = articles.map((article) => ({
  id: article.id,
  title: article.title,
  slug: article.slug,
  category: article.category,
  categoryLabel: article.categoryLabel,
  excerpt: article.excerpt || ''
}));

// ── Social links ──────────────────────────────────────────────────────────
const SOCIAL_ICONS = [
  { label: 'Instagram', href: 'https://www.instagram.com/intellexa_journal/', Icon: FaInstagram },
  { label: 'X / Twitter', href: '#', Icon: FaXTwitter },
  { label: 'Reddit', href: 'https://www.reddit.com/user/Intellexa_Journal/', Icon: FaRedditAlien },
  { label: 'Medium', href: 'https://medium.com/@intellexajournal', Icon: SiMedium },
  { label: 'Substack', href: 'https://substack.com/@intellexajournal', Icon: SiSubstack },
];

// Only open real links in a new tab; "#" placeholders stay in the same tab.
const linkProps = (href) =>
  href && href !== '#' ? { target: '_blank', rel: 'noopener noreferrer' } : {};

// Wrap the portion(s) of `text` that match `query` in <mark> for highlighting.
function highlightMatch(text, query) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  // split() with a capture group puts the matches at odd indexes.
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} style={{ color: ACCENT }} className="bg-transparent font-bold not-italic">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState('');
  const router = useRouter();

  // ── Search state ──────────────────────────────────────────────────────────
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open, searchOpen]);

  useEffect(() => {
    const close = (event) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      closeSearch();
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const lower = query.toLowerCase();
    const filtered = ALL_ARTICLES.filter(
      (article) =>
        article.title.toLowerCase().includes(lower) || article.excerpt.toLowerCase().includes(lower)
    ).slice(0, 8);

    setSearchResults(filtered);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchResults.length > 0) {
      handleArticleClick(searchResults[0].category, searchResults[0].slug);
    }
  };

  const handleArticleClick = (category, slug) => {
    closeSearch();
    router.push(`/${category}/${slug}`);
  };

  return (
    <>
      <header className="relative z-50 bg-white">
        <div className="mx-auto grid h-[77px] sm:h-[114px] w-[min(1120px,calc(100%-20px))] sm:w-[min(1120px,calc(100%-40px))] grid-cols-[44px_1fr_44px] sm:grid-cols-[1fr_auto_1fr] items-center border-b border-[#ddd]">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                className="flex items-center gap-2 border-0 bg-transparent p-0 sm:p-1.5 pl-0 cursor-pointer text-[#111]"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
              >
                <span className="grid w-5 gap-[4px] sm:w-4 sm:gap-[3px]" aria-hidden="true">
                  <i className="block h-[2px] bg-[#111] sm:h-px" />
                  <i className="block h-[2px] bg-[#111] sm:h-px" />
                  <i className="block h-[2px] bg-[#111] sm:h-px" />
                </span>
                <span className="hidden sm:inline text-[12px] uppercase tracking-[0.1em]">Menu</span>
              </button>
              <button
                className="hidden sm:grid place-items-center border-0 bg-transparent p-1.5 cursor-pointer text-[23px] leading-none text-[#111] hover:text-[#a30d32]"
                onClick={() => setSearchOpen((value) => !value)}
                aria-label="Toggle search"
                aria-expanded={searchOpen}
              >⌕</button>
              <div className="hidden md:flex ml-3 gap-1" aria-label="Social media">
                {SOCIAL_ICONS.map(({ label, Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    {...linkProps(href)}
                    className="grid h-[25px] w-[25px] place-items-center border border-[#aaa] text-[11px] text-[#111] hover:border-[#a30d32] hover:text-[#a30d32]"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <Link href="/" aria-label="Intellexa Journal home" className="min-w-0 sm:min-w-[360px] text-center leading-none">
              <strong className="block whitespace-nowrap font-serif text-[17px] sm:text-[34px] tracking-[-0.3px] sm:tracking-[-0.5px]">INTELLEXA JOURNAL</strong>
              <span className="mt-1 inline-block px-[10px] sm:px-[23px] py-0 text-[6px] sm:text-[8px] leading-[10px] sm:leading-[14px] tracking-[0.14em] text-white" style={{ background: ACCENT }}>
                INDEPENDENT LOCAL REPORTING
              </span>
            </Link>

            <div className="flex items-center justify-end gap-0 sm:gap-7">
              <button
                className="grid place-items-center border-0 bg-transparent p-0 cursor-pointer text-[27px] leading-none text-[#111] hover:text-[#a30d32] sm:hidden"
                onClick={() => setSearchOpen((value) => !value)}
                aria-label="Toggle search"
                aria-expanded={searchOpen}
              >⌕</button>
              <span className="hidden lg:block text-right text-[12px] font-serif italic text-[#555]">
                {today}
              </span>
            </div>
        </div>
        <nav
          aria-label="Primary navigation"
          className="mx-auto hidden lg:flex w-full sm:w-[min(1120px,calc(100%-40px))] h-8 sm:h-[42px] items-center justify-center gap-5 sm:gap-8 overflow-x-auto whitespace-nowrap border-b border-[#111] px-2.5 sm:px-0 font-serif text-[12px] sm:text-[15px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <Link href="/" className="hover:text-[#a30d32]">Home</Link>
          {categoryList.map(({ slug, label }) => (
            <Link key={slug} href={`/${slug}`} className="hover:text-[#a30d32]">{label}</Link>
          ))}
        </nav>

        {/* ── Search takeover panel ── */}
        <div
          className={`absolute inset-x-0 top-full border-t-[6px] bg-[#0b0b0b] transition-all duration-200 ease-out ${
            searchOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
          }`}
          style={{ borderTopColor: ACCENT }}
          aria-hidden={!searchOpen}
        >
          <div className="mx-auto w-[min(1120px,calc(100%-40px))] py-6 sm:py-8">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 border-b border-[#555] pb-3">
              <span className="text-[22px] text-white/50 leading-none" aria-hidden="true">⌕</span>
              <label htmlFor="site-search" className="sr-only">Search articles</label>
              <input
                id="site-search"
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search articles&hellip;"
                className="flex-1 border-0 bg-transparent font-serif text-lg sm:text-2xl text-white placeholder-white/40 outline-none"
                aria-label="Search articles"
                aria-autocomplete="list"
                aria-expanded={searchResults.length > 0}
              />
              <button
                type="button"
                onClick={closeSearch}
                className="border-0 bg-transparent text-[28px] leading-none text-white/70 hover:text-white cursor-pointer"
                aria-label="Close search"
              >×</button>
            </form>

            <div className="mt-1 max-h-[calc(100dvh-220px)] overflow-y-auto overscroll-contain">
              {searchResults.length > 0 ? (
                <>
                  {searchResults.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/${article.category}/${article.slug}`}
                      onClick={closeSearch}
                      className="group flex w-full items-start justify-between gap-4 border-b border-[#2a2a2a] py-4 text-left"
                    >
                      <span className="min-w-0">
                        <span
                          className="block text-[10px] font-sans font-bold uppercase tracking-[0.14em]"
                          style={{ color: ACCENT }}
                        >
                          {article.categoryLabel}
                        </span>
                        <span className="mt-1 block font-serif text-base sm:text-lg leading-snug text-white group-hover:text-[#e96889] transition-colors">
                          {highlightMatch(article.title, searchQuery)}
                        </span>
                      </span>
                      <span className="mt-1 shrink-0 text-white/30 group-hover:text-[#e96889] text-xl font-normal transition-colors" aria-hidden="true">›</span>
                    </Link>
                  ))}
                  <p className="pt-3 font-serif italic text-[12px] text-[#888]">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                  </p>
                </>
              ) : searchQuery.trim().length >= 2 ? (
                <p className="py-8 text-center font-serif italic text-[#888]">
                  No articles found for &ldquo;{searchQuery}&rdquo;
                </p>
              ) : (
                <p className="py-8 text-center font-serif italic text-[#666]">
                  Type at least 2 characters to search&hellip;
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop shared by the mobile menu and the search panel.
          It needs to sit ABOVE the header while the slide-out menu is open
          (so the header dims/covers correctly under the menu), but BELOW
          the header while only the search panel is open (so the search
          results, which live inside the header, stay clickable). */}
      <div
        className={`fixed inset-0 bg-black/48 transition-opacity duration-200 ${
          open ? 'z-[80]' : 'z-40'
        } ${open || searchOpen ? 'opacity-100 visible' : 'invisible opacity-0'}`}
        onClick={() => { setOpen(false); closeSearch(); }}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-0 z-[90] flex h-dvh max-h-dvh w-[min(360px,92vw)] flex-col overflow-hidden border-t-[6px] bg-[#0b0b0b] px-7 py-6 text-white transition-transform duration-[280ms] ease-out ${open ? 'translate-x-0 shadow-[18px_0_45px_rgba(0,0,0,0.28)]' : '-translate-x-[101%]'}`}
        style={{ borderTopColor: ACCENT }}
        aria-hidden={!open}
        aria-label="Main menu"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#555] pb-[17px] font-serif font-extrabold">
          <Link href="/" onClick={() => setOpen(false)}>INTELLEXA JOURNAL</Link>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="border-0 bg-transparent text-[35px] text-white cursor-pointer">×</button>
        </div>
        <nav aria-label="Menu sections" className="mt-3.5 grid min-h-0 flex-1 auto-rows-max overflow-y-auto overscroll-contain pr-1 [scrollbar-color:#555_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#555]">
          <Link href="/" onClick={() => setOpen(false)} className="flex min-h-[51px] items-center justify-between gap-2 border-b border-[#333] font-serif text-lg hover:text-[#e96889]">
            ⌂ <span className="flex-1">Home</span>
          </Link>
          {categoryList.map(({ slug, label }) => (
            <Link key={slug} href={`/${slug}`} onClick={() => setOpen(false)} className="flex min-h-[51px] items-center justify-between border-b border-[#333] font-serif text-lg hover:text-[#e96889]">
              <span>{label}</span><b className="text-[28px] font-normal">›</b>
            </Link>
          ))}
          <Link href="/newsletters" onClick={() => setOpen(false)} className="flex min-h-[51px] items-center justify-between border-b border-[#333] font-serif text-lg hover:text-[#e96889]"><span>Newsletters</span></Link>
        </nav>

        <div className="flex shrink-0 flex-col gap-3 border-t border-[#333] pt-4">
          <div className="flex gap-2" aria-label="Social media">
            {SOCIAL_ICONS.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...linkProps(href)}
                className="grid h-[30px] w-[30px] place-items-center border border-[#555] text-[13px] text-white hover:border-[#e96889] hover:text-[#e96889]"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="font-serif italic text-[#aaa]">Independent. Local. Essential.</p>
        </div>
      </aside>
    </>
  );
}