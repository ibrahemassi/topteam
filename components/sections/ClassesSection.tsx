"use client";

import Link from "next/link";
import {
  ClassProgramsCarousel,
  type ProgramCardVariant,
  type ProgramCarouselItem,
} from "@/components/classes/ClassProgramsCarousel";
import { cn } from "@/lib/cn";

type ClassesSectionProps = {
  heading: string;
  subtitle: string;
  programs: ProgramCarouselItem[];
  viewAllHref: string;
  carouselCtaLabel?: string;
  /** Slide indicator under the carousel (default: true) */
  showSlideIndicator?: boolean;
  /** Override section `id` when duplicating on the same page */
  sectionId?: string;
  headingId?: string;
  /** e.g. `pt-10` for a stacked duplicate with less top padding */
  className?: string;
  /** `classic` = split image + panel + on-image dots (original cards) */
  cardVariant?: ProgramCardVariant;
};

function SubtitleWithHighlight({ text }: { text: string }) {
  const parts = text.split("—");
  if (parts.length < 2) {
    return <p className="mt-3 max-w-2xl text-left text-zinc-400">{text}</p>;
  }
  const lead = parts[0]?.trim() ?? "";
  const tail = parts.slice(1).join("—").trim();
  return (
    <p className="mt-3 max-w-2xl text-left text-base text-zinc-400 sm:text-lg">
      <span className="rounded-sm bg-[#1f00ff]/30 px-1.5 py-0.5 text-zinc-100">
        {lead} —
      </span>{" "}
      {tail}
    </p>
  );
}

export type { ProgramCarouselItem };

export function ClassesSection({
  heading,
  subtitle,
  programs,
  viewAllHref,
  carouselCtaLabel = "Open curriculum →",
  showSlideIndicator = true,
  sectionId = "classes",
  headingId = "classes-heading",
  className: sectionClassName,
  cardVariant = "blur",
}: ClassesSectionProps) {
  return (
    <section
      id={sectionId}
      className={cn(
        "relative bg-black py-20 sm:py-28",
        sectionClassName,
      )}
      aria-labelledby={headingId}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#10011f_0%,_transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id={headingId}
              className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl"
            >
              {heading}
            </h2>
            <SubtitleWithHighlight text={subtitle} />
          </div>
          <Link
            href={viewAllHref}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#1f00ff]/50 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#ffc200] transition hover:border-[#1f00ff] hover:bg-[#1f00ff]/15 sm:self-auto sm:text-sm"
          >
            All programs
          </Link>
        </div>
        <div className="-mx-2 mt-10 overflow-x-visible sm:-mx-4 md:mx-0">
          <ClassProgramsCarousel
            programs={programs}
            ctaLabel={carouselCtaLabel}
            showSlideIndicator={showSlideIndicator}
            cardVariant={cardVariant}
          />
        </div>
      </div>
    </section>
  );
}
