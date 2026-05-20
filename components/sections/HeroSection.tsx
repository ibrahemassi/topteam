"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { getAssetPath } from "@/lib/assets";

export type HeroCarouselCard = {
  eyebrow: string;
  line1: string;
  line2: string;
  href: string;
  src: string;
};

type HeroSectionProps = {
  videoSrc: string;
  posterSrc: string;
  cards: HeroCarouselCard[];
};

export function HeroSection({ videoSrc, posterSrc, cards }: HeroSectionProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const count = cards.length || 1;
  const [active, setActive] = useState(0);

  const syncActiveFromScroll = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const gap = 16;
    const first = el.querySelector("[data-hero-card]") as HTMLElement | null;
    if (!first) return;
    const cardW = first.offsetWidth + gap;
    const i = Math.round(el.scrollLeft / Math.max(cardW, 1));
    const next = Math.min(Math.max(i, 0), count - 1);
    setActive((p) => (p === next ? p : next));
  }, [count]);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const onScroll = () => syncActiveFromScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    syncActiveFromScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [syncActiveFromScroll, count]);

  const scrollDir = useCallback((dir: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    const first = el.querySelector("[data-hero-card]") as HTMLElement | null;
    const step = first ? first.offsetWidth + 16 : 236;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const fill = Math.min(100, ((active + 1) / Math.max(count, 1)) * 100);

  const counter = useMemo(
    () => String(Math.min(active + 1, count)).padStart(2, "0"),
    [active, count],
  );

  return (
    <section
      id="hero"
      className="relative min-h-svh overflow-hidden bg-black pb-8 pt-20 sm:pt-24 lg:pb-12 lg:pt-24"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={getAssetPath(posterSrc)}
        aria-hidden
      >
        <source src={getAssetPath(videoSrc)} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-transparent lg:via-black/35"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#000000]/35 via-transparent to-black/65"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] min-w-0 max-w-[1600px] flex-col gap-10 lg:min-h-[calc(100svh-6rem)] lg:flex-row lg:items-stretch lg:gap-8 lg:pl-6 lg:pr-2 xl:pl-10">
        <div className="flex shrink-0 flex-col justify-center px-4 pt-6 sm:px-6 lg:max-w-[min(42%,520px)] lg:px-2 lg:pt-10 xl:max-w-[min(44%,560px)]">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/85 sm:text-sm">
            Afara Top Team • all locations
          </p>
          <h1 className="font-[family-name:var(--font-display)] mt-4 text-[clamp(2.5rem,8vw,5.75rem)] font-bold uppercase leading-[0.92] tracking-tight text-white">
            TOP TEAM TRAINING SCHEDULE
          </h1>
          <p className="mt-6 max-w-md text-left text-base leading-relaxed text-zinc-200/95 sm:text-lg">
            Lock the lane that fits your fighter profile — striking, grappling,
            HIIT engines, open mat. Scroll the deck and dive into bookings.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              aria-label="Save gym to favorites"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/35 bg-[#1f00ff] text-white shadow-[0_0_24px_rgba(31,0,255,0.55)] transition hover:bg-[#1600c9]"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16l-6-3.5L6 20V4zm2 0v12.88l4 2.33 4-2.33V4H8z" />
              </svg>
            </button>
            <Link
              id="hero-cta"
              href="/#training-matrix"
              className="inline-flex max-w-[min(100%,22rem)] flex-wrap items-center gap-2 rounded-full border border-white/80 bg-white/5 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10 sm:max-w-none sm:gap-3 sm:px-8 sm:text-xs sm:tracking-[0.2em]"
            >
              Claim your free session
              <span className="text-white/70" aria-hidden>
                /
              </span>
            </Link>
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-end lg:justify-center lg:pt-8">
          <div
            ref={railRef}
            className="flex w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 pb-2 pt-2 [scrollbar-width:none] sm:px-6 lg:px-2 lg:pl-4 [&::-webkit-scrollbar]:hidden"
            onWheel={(e) => {
              const t = e.currentTarget;
              const canScrollX = t.scrollWidth > t.clientWidth;
              if (!canScrollX) return;
              if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
              const max = t.scrollWidth - t.clientWidth;
              const next = Math.min(max, Math.max(0, t.scrollLeft + e.deltaY));
              if (next === t.scrollLeft) return;
              t.scrollLeft = next;
              e.preventDefault();
            }}
            role="region"
            aria-roledescription="carousel"
            aria-label="Gym training options"
          >
            {cards.map((c, i) => (
              <Link
                key={`${c.line1}-${c.line2}-${c.href}`}
                href={c.href}
                data-hero-card
                scroll={false}
                className={cn(
                  "group relative aspect-[2/3] w-[min(42vw,200px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/15 bg-[#10011f] shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[272px]",
                  i === cards.length - 1 && "mr-4 lg:mr-8",
                )}
              >
                <Image
                  src={getAssetPath(c.src)}
                  alt={`${c.line1} ${c.line2} — ${c.eyebrow}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 42vw, (max-width: 1280px) 260px, 272px"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/75 sm:text-xs">
                    {c.eyebrow}
                  </p>
                  <p className="font-[family-name:var(--font-display)] mt-1 text-2xl leading-[0.95] tracking-wide text-white sm:text-3xl">
                    {c.line1}
                    <br />
                    {c.line2}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4 px-4 sm:px-6 lg:mt-8 lg:px-4 lg:pl-6">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollDir(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:border-white hover:bg-white/10"
                aria-label="Previous option"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M15 18 9 12l6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollDir(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:border-white hover:bg-white/10"
                aria-label="Next option"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div
              className="relative mt-px h-[2px] flex-1 overflow-hidden rounded-full bg-white/20"
              role="presentation"
              aria-hidden
            >
              <div
                className="h-full rounded-full bg-[#1f00ff] shadow-[0_0_14px_rgba(31,0,255,0.85)] transition-[width] duration-300 ease-out"
                style={{ width: `${fill}%` }}
              />
            </div>
            <span
              className="font-[family-name:var(--font-display)] shrink-0 text-4xl tabular-nums text-white md:text-5xl"
              aria-live="polite"
            >
              {counter}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
