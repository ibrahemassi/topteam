import Image from "next/image";
import Link from "next/link";
import { GlassPanel } from "@/components/GlassPanel";
import { SectionBackdrop } from "@/components/sections/SectionBackdrop";
import { cn } from "@/lib/cn";
import { getSiteData } from "@/lib/site-data";
import { pexelsUrl } from "@/lib/pexels-url";

function ProgressRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-end justify-between gap-3 text-xs font-medium uppercase tracking-wider text-zinc-300">
        <span>{label}</span>
        <span className="tabular-nums text-[#ffc200]">{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#1f00ff] shadow-[0_0_12px_rgba(31,0,255,0.55)] transition-[width] duration-700 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

type AboutSectionProps = {
  variant?: "home" | "page";
};

export function AboutSection({ variant = "home" }: AboutSectionProps) {
  const site = getSiteData();
  const about = site.about;
  const isHome = variant === "home";
  const backdrop = pexelsUrl(about.backdropImageId, 1920);
  const tiles = about.tiles.map((t, i) => ({
    src: pexelsUrl(t.pexelsId, 900),
    alt: t.alt,
    i,
  }));

  return (
    <section
      id={isHome ? "about-preview" : undefined}
      className={cn(
        "relative overflow-hidden py-16 sm:py-20 lg:py-28",
        isHome && "border-t border-white/5 bg-black",
      )}
      aria-labelledby="about-heading"
    >
      {isHome ? (
        <SectionBackdrop withBgImage />
      ) : (
        <>
          <Image
            src={backdrop}
            alt=""
            fill
            className="object-cover opacity-35"
            sizes="100vw"
            priority={false}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black via-[#10011f]/92 to-black"
            aria-hidden
          />
          <div className="absolute inset-0 bg-black/40" aria-hidden />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffc200] sm:text-sm">
              {about.eyebrow}
            </p>
            <h2
              id="about-heading"
              className="font-[family-name:var(--font-display)] mt-3 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
            >
              {about.pageTitle}
            </h2>
            <p className="mt-4 max-w-xl text-left text-base leading-relaxed text-zinc-400 sm:text-lg">
              {about.lead}
            </p>
            {variant === "page" && (
              <p className="mt-4 max-w-2xl text-left text-base leading-relaxed text-zinc-300 sm:text-lg">
                {about.extendedPageIntro}
              </p>
            )}
          </div>
          {variant === "home" && (
            <Link
              href="/about"
              className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:border-[#1f00ff]/60 hover:bg-[#1f00ff]/15 lg:self-auto"
            >
              View the About Us page
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/40 transition group-hover:border-[#1f00ff]/50 group-hover:text-[#ffc200]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H9M17 7v8"
                  />
                </svg>
              </span>
            </Link>
          )}
        </div>

        <div className="mt-12 grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          <article className="relative flex min-h-[280px] flex-col justify-between rounded-3xl border border-white/10 bg-[#00132d] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-8 lg:col-span-5 lg:row-span-2 lg:row-start-1 lg:col-start-1 lg:min-h-[340px]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ffc200]">
                {about.goalsTitle}
              </p>
              <p className="mt-4 font-[family-name:var(--font-display)] text-3xl uppercase leading-[0.95] text-white sm:text-4xl">
                {about.goalsHeadline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                {about.goalsBody}
              </p>
            </div>
            <Link
              href="/coaches"
              className="mt-8 inline-flex h-12 w-12 items-center justify-center self-end rounded-xl border border-white/20 bg-white/5 text-white transition hover:border-[#1f00ff]/50 hover:bg-[#1f00ff]/20"
              aria-label="Meet the coaching staff"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H9M17 7v8"
                />
              </svg>
            </Link>
          </article>

          <article className="rounded-3xl border border-[#1f00ff]/25 bg-[#0a1628]/95 p-6 sm:p-8 lg:col-span-4 lg:row-span-2 lg:row-start-1 lg:col-start-6">
            <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white">
              {about.benefitsSectionTitle}
            </h3>
            <p className="mt-2 text-sm text-zinc-500">{about.benefitsLead}</p>
            <div className="mt-8 flex flex-col gap-6">
              {about.benefits.map((b) => (
                <ProgressRow key={b.label} label={b.label} value={b.value} />
              ))}
            </div>
          </article>

          <GlassPanel className="flex min-h-[160px] flex-col justify-between rounded-3xl p-6 lg:col-span-3 lg:row-start-1 lg:col-start-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
              {about.statCoachingEyebrow}
            </p>
            <p className="font-[family-name:var(--font-display)] text-4xl text-white sm:text-5xl">
              {about.statCoachingBig}
            </p>
            <p className="text-sm leading-snug text-zinc-400">
              {about.statCoachingText}
            </p>
          </GlassPanel>

          <GlassPanel className="flex min-h-[160px] flex-col justify-between rounded-3xl p-6 lg:col-span-3 lg:row-start-2 lg:col-start-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
              {about.statMembersEyebrow}
            </p>
            <p className="font-[family-name:var(--font-display)] text-4xl text-white sm:text-5xl">
              {about.statMembersBig}
            </p>
            <p className="text-sm leading-snug text-zinc-400">
              {about.statMembersText}
            </p>
          </GlassPanel>

          {/* <div className="col-span-1 grid min-w-0 grid-cols-3 gap-2 sm:gap-3 lg:col-span-12 lg:row-start-3 lg:grid-cols-12 lg:gap-5">
            {tiles.map((t) => (
              <figure
                key={t.src}
                className={cn(
                  "relative aspect-[4/3] min-h-0 overflow-hidden rounded-2xl border border-white/10 bg-[#10011f] sm:aspect-[5/4] lg:col-span-4",
                  t.i === 0 && "lg:col-start-1",
                  t.i === 1 && "lg:col-start-5",
                  t.i === 2 && "lg:col-start-9",
                )}
              >
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(min-width: 1024px) 28vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </figure>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
