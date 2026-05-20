import type { Metadata } from "next";
import { ClassProgramsCarousel } from "@/components/classes/ClassProgramsCarousel";
import { getSiteData } from "@/lib/site-data";
import { pexelsUrl } from "@/lib/pexels-url";

export const metadata: Metadata = {
  title: "Classes — Afara Top Team",
  description: "Programs: Muay Thai, Boxing, MMA, Wrestling, and more.",
};

export default function ClassesPage() {
  const { classes } = getSiteData();

  const programs = classes.map((c) => ({
    id: c.id,
    title: c.title,
    description: c.description,
    imageSrc: c.imageLocalPath ?? pexelsUrl(c.imagePexelsId, 1200),
    imageAlt: `${c.title} — ${c.subtitle}`,
    monthlyFrom: c.monthlyFrom ?? "—",
    badges: c.cardBadges ?? [],
  }));

  return (
    <div className="bg-black pb-24 pt-20 lg:pt-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffc200]">
          Programs
        </p>
        <h1 className="font-[family-name:var(--font-display)] mt-4 text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl">
          Classes
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Swipe through tracks — each card opens the full syllabus, schedule
          ties, and coach notes.
        </p>

        <div className="mt-10">
          <ClassProgramsCarousel programs={programs} />
        </div>
      </div>
    </div>
  );
}
