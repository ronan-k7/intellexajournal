const ACCENT = '#a30d32';

export default function Newsletter() {
  return (
    <section
      id="newsletter"
      className="relative my-12 overflow-hidden rounded-2xl px-6 py-10 sm:my-20 sm:px-12 sm:py-14"
      style={{ background: 'linear-gradient(135deg, #14100f 0%, #2b0d14 55%, #a30d32 130%)' }}
    >
      {/* Decorative glows — purely visual, hidden from assistive tech */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20"
        style={{ background: ACCENT }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-white opacity-[0.06]"
      />

      <div className="relative flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4 sm:max-w-[620px]">
          <div
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full font-serif text-[24px] text-white"
            style={{ background: ACCENT }}
            aria-hidden="true"
          >
            I
          </div>
          <div>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white">
              Morning Edition
            </span>
            <h2 className="m-0 mt-2.5 font-serif text-[18px] leading-[1.1] text-white sm:text-[24px]">
              The Daily Briefing, before your first coffee.
            </h2>
            <p className="m-0 mt-2 text-[9px] leading-[1.5] text-white/70">
              Independent reporting on the stories that matter — free in your inbox every weekday morning.
            </p>
          </div>
        </div>

        <form className="flex w-full flex-col gap-2.5 sm:w-auto sm:shrink-0 sm:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-[13px] text-white placeholder:text-white/50 outline-none transition-colors focus:border-white/60 sm:min-w-[240px]"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-full border-0 bg-white px-5 py-3 text-[13px] font-bold text-[#111] transition-colors hover:bg-white/90"
          >
            Sign up free
          </button>
        </form>
      </div>
    </section>
  );
}