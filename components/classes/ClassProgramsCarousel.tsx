"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import { cn } from "@/lib/cn";

/** Blur + tint fade to transparent upward so the photo stays sharp at the top */
const BLUR_FADE_MASK: React.CSSProperties = {
  maskImage:
    "linear-gradient(to top, black 0%, black 32%, rgba(0,0,0,0.55) 58%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to top, black 0%, black 32%, rgba(0,0,0,0.55) 58%, transparent 100%)",
};

export type ProgramCarouselItem = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  monthlyFrom: string;
  badges: string[];
};

export type ProgramCardVariant = "blur" | "classic";

function SlideDots({
  total,
  className,
}: {
  total: number;
  className?: string;
}) {
  const { scrollTo, api } = useCarousel();
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const snap = () => setSelected(api.selectedScrollSnap());
    snap();
    api.on("select", snap);
    api.on("reInit", snap);
    return () => {
      api.off("select", snap);
      api.off("reInit", snap);
    };
  }, [api]);

  return (
    <div
      className={cn(
        "pointer-events-auto absolute bottom-4 left-0 right-0 z-[1] flex justify-center gap-2",
        className,
      )}
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={`dot-${String(i)}`}
          type="button"
          aria-label={`Show program ${i + 1}`}
          className={cn(
            "h-2 w-2 rounded-full transition-all",
            selected === i
              ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"
              : "bg-white/40 hover:bg-white/60",
          )}
          onClick={() => scrollTo(i)}
        />
      ))}
    </div>
  );
}

function IconVerified({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6 shrink-0 text-[#1f00ff]", className)}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-8.5 9z"
      />
    </svg>
  );
}

/** Single dot on a track — sits below the carousel, not on the cards */
function CarouselSingleIndicator({
  api,
  total,
}: {
  api: CarouselApi | undefined;
  total: number;
}) {
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const leftPct =
    total <= 1 ? 50 : (selected / (total - 1)) * 100;

  return (
    <div className="mx-auto mt-8 w-full max-w-[200px] px-2">
      <p className="sr-only">
        Slide {selected + 1} of {total}
      </p>
      <div
        className="relative h-1 rounded-full bg-white/15"
        aria-hidden
      >
        <div
          className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white shadow-[0_0_16px_rgba(255,255,255,0.45)] transition-[left] duration-300 ease-out"
          style={{ left: `${String(leftPct)}%` }}
        />
      </div>
    </div>
  );
}

/** Split layout: image on top, dark panel, price pill, stacked badges, full-width CTA (original design) */
function ProgramSlideCardClassic({
  item,
  dotCount,
  ctaLabel,
}: {
  item: ProgramCarouselItem;
  dotCount: number;
  ctaLabel: string;
}) {
  return (
    <article
      className={cn(
        "mx-auto flex h-full max-w-[380px] flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-[#0a0e17] shadow-[0_28px_70px_rgba(0,0,0,0.55)] sm:max-w-[400px]",
      )}
    >
      <div className="relative aspect-[4/3] w-full shrink-0 bg-[#10011f]">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 400px"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-[#0a0e17]/95" />
        <SlideDots total={dotCount} />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-[1.65rem]">
            {item.title}
          </h2>
          <span className="shrink-0 rounded-full border border-white/25 bg-black/40 px-3.5 py-1.5 text-sm font-bold tabular-nums text-white">
            {item.monthlyFrom}
            <span className="font-semibold text-white/70">/mo</span>
          </span>
        </div>
        <p className="mt-3 line-clamp-4 text-left text-sm leading-relaxed text-zinc-400">
          {item.description}
        </p>
        <div className="mt-4 flex flex-col gap-2">
          {item.badges.map((b) => (
            <span
              key={b}
              className="w-fit rounded-full bg-white/[0.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-200 ring-1 ring-white/10"
            >
              {b}
            </span>
          ))}
        </div>
        <Link
          href={`/classes/${item.id}`}
          className="mt-6 w-full rounded-full bg-white py-3.5 text-center text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-zinc-100"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}

function ProgramSlideCard({
  item,
  ctaLabel,
}: {
  item: ProgramCarouselItem;
  ctaLabel: string;
}) {
  return (
    <article
      className={cn(
        "relative isolate mx-auto aspect-[2/3] w-full max-w-[340px] overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-[#10011f] shadow-[0_32px_80px_rgba(0,0,0,0.6)] sm:max-w-[380px]",
      )}
    >
      <Image
        src={item.imageSrc}
        alt={item.imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 90vw, 380px"
        priority={false}
      />

      {/* Gradient frost + blur — masked so it dies out toward the top (sharp image above) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[72%] bg-white/[0.04] backdrop-blur-2xl backdrop-saturate-150 [-webkit-backdrop-filter:blur(24px)_saturate(1.15)]"
        style={BLUR_FADE_MASK}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[72%] bg-gradient-to-t from-black/65 via-black/20 to-transparent"
        style={BLUR_FADE_MASK}
        aria-hidden
      />

      {/* Copy sits on the image; no panel background */}
      <div className="relative z-[2] flex h-full min-h-0 flex-col justify-end p-6 pb-7 sm:p-8 sm:pb-9">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-[family-name:var(--font-display)] text-[1.6rem] font-semibold uppercase leading-tight tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.75)] sm:text-[1.75rem]">
            {item.title}
          </h2>
          <IconVerified className="mt-0.5 shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
        </div>
        <p className="mt-2 line-clamp-3 text-left text-sm font-normal leading-relaxed text-white/92 drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] sm:text-[15px]">
          {item.description}
        </p>
        <Link
          href={`/classes/${item.id}`}
          className="mt-5 inline-flex w-fit items-center text-xs font-bold uppercase tracking-[0.2em] text-white drop-shadow-md transition hover:text-white/90"
        >
          {ctaLabel}
          <span aria-hidden className="ml-1.5 text-white/70">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

type ClassProgramsCarouselProps = {
  programs: ProgramCarouselItem[];
  /** Defaults to "View program" */
  ctaLabel?: string;
  /** Show the slide position bar under the carousel (default: true; N/A for classic) */
  showSlideIndicator?: boolean;
  /** `blur` = full-bleed photo + gradient blur; `classic` = split image + dark panel + on-card dots */
  cardVariant?: ProgramCardVariant;
};

export function ClassProgramsCarousel({
  programs,
  ctaLabel = "View program",
  showSlideIndicator = true,
  cardVariant = "blur",
}: ClassProgramsCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi | undefined>();

  if (!programs.length) return null;

  return (
    <div className="relative overflow-visible py-2 sm:px-12 md:px-14 lg:px-16">
      <Carousel
        opts={{ align: "center", loop: true, skipSnaps: false, dragFree: false }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent className="py-4">
          {programs.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-[min(100%,380px)] sm:basis-[72%] md:basis-[55%] lg:basis-[42%] xl:basis-[34%]"
            >
              {cardVariant === "classic" ? (
                <ProgramSlideCardClassic
                  item={item}
                  dotCount={programs.length}
                  ctaLabel={ctaLabel}
                />
              ) : (
                <ProgramSlideCard item={item} ctaLabel={ctaLabel} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
      {cardVariant === "blur" && showSlideIndicator ? (
        <CarouselSingleIndicator api={api} total={programs.length} />
      ) : null}
    </div>
  );
}
