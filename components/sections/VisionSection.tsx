import Image from "next/image";
import { GlassPanel } from "@/components/GlassPanel";
import { cn } from "@/lib/cn";
import { getAssetPath } from "@/lib/assets";
import { getSiteData } from "@/lib/site-data";
import { VisionHomePreview } from "@/components/vision/VisionHomePreview";
import { VisionPageContent } from "@/components/vision/VisionPageContent";
import { SectionBackdrop } from "@/components/sections/SectionBackdrop";
import type { VisionIconName } from "@/components/vision/vision-icons";
import { pexelsUrl } from "@/lib/pexels-url";

function ImpactChart({ highlight }: { highlight: string }) {
  const bars = [38, 52, 48, 61, 58, 78];

  return (
    <div className="relative mt-5">
      <div className="flex h-20 items-end gap-1.5 sm:h-24 sm:gap-2">
        {bars.map((height, index) => (
          <div
            key={height + index}
            className="relative flex-1 overflow-hidden rounded-md bg-white/8 sm:rounded-lg"
          >
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 rounded-md sm:rounded-lg",
                index === bars.length - 1
                  ? "bg-[#ffc200]"
                  : "bg-white/25",
              )}
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>
      <div className="absolute left-[72%] top-[18%] flex -translate-x-1/2 flex-col items-center">
        <span className="rounded-full bg-[#ffc200] px-2 py-0.5 text-[10px] font-bold text-black sm:text-xs">
          {highlight}
        </span>
        <span className="mt-1 h-3 w-px bg-[#ffc200]/80" aria-hidden />
      </div>
      <div className="mt-3 flex justify-between text-[10px] font-medium uppercase tracking-wider text-zinc-500 sm:text-xs">
        {["Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
}

type HeroStat = {
  value: string;
  label: string;
  detail: string;
};

function VisionHero({
  badge,
  headline,
  subheadline,
  imageSrc,
  stats,
  highlightStat,
}: {
  badge: string;
  headline: string;
  subheadline: string;
  imageSrc: string;
  stats: HeroStat[];
  highlightStat: { label: string; value: string; trend: string };
}) {
  const headlineLines = headline
    .split(/(?<=[.!?])\s+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const miniStats = [stats[0], stats[2]].filter(Boolean);

  return (
    <div className="relative min-h-[88svh] overflow-hidden lg:min-h-[760px]">
      <Image
        src={getAssetPath(imageSrc)}
        alt="Afara Top Team humanitarian outreach"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-black/50"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,#1f00ff28,transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid min-h-[88svh] max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-8 pt-28 sm:px-6 sm:pb-10 lg:min-h-[760px] lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pb-12 lg:pt-32">
        <div className="max-w-xl lg:max-w-none">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-200 backdrop-blur-md">
            {badge}
          </span>
          <h1
            id="vision-heading"
            className="font-[family-name:var(--font-display)] mt-6 text-[clamp(2.75rem,8vw,5.75rem)] font-bold uppercase leading-[0.9] tracking-tight text-white"
          >
            {headlineLines.map((line) => (
              <span key={line} className="block">
                {line.replace(/\.$/, "")}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-300 sm:text-lg lg:max-w-lg">
            {subheadline}
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 sm:gap-5">
          <GlassPanel className="rounded-2xl border-white/15 bg-white/10 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-6">
            <p className="text-xs font-medium text-zinc-300 sm:text-sm">
              Outreach at a glance
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="min-w-0 text-center sm:text-left">
                  <p className="font-[family-name:var(--font-display)] text-2xl text-white sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#ffc200] sm:text-[10px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex rounded-full border border-white/10 bg-black/25 p-1">
              {["Aid", "Youth", "Relief"].map((tab, index) => (
                <span
                  key={tab}
                  className={cn(
                    "flex-1 rounded-full px-2 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wide sm:text-xs",
                    index === 2
                      ? "bg-[#ffc200] text-black"
                      : "text-zinc-400",
                  )}
                >
                  {tab}
                </span>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="rounded-2xl border-white/10 bg-black/55 p-4 backdrop-blur-2xl sm:rounded-3xl sm:p-5">
            <p className="text-xs font-medium text-zinc-400 sm:text-sm">
              {highlightStat.label}
            </p>
            <p className="font-[family-name:var(--font-display)] mt-1 text-3xl text-white sm:text-4xl">
              {highlightStat.value}
            </p>
            <ImpactChart highlight={highlightStat.trend} />
          </GlassPanel>

          <div className="grid grid-cols-2 gap-3">
            {miniStats.map((stat) => (
              <GlassPanel
                key={`mini-${stat.label}`}
                className="rounded-2xl border-white/12 bg-black/50 px-4 py-3 backdrop-blur-2xl sm:rounded-3xl sm:px-5 sm:py-4"
              >
                <p className="text-[10px] font-medium text-zinc-400 sm:text-xs">
                  {stat.label}
                </p>
                <p className="font-[family-name:var(--font-display)] mt-1 text-2xl text-white sm:text-3xl">
                  {stat.value}
                </p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function VisionSection({
  variant = "home",
}: {
  variant?: "home" | "page";
}) {
  const vision = getSiteData().vision;
  const isPage = variant === "page";
  const heroImageSrc = pexelsUrl(vision.hero.imagePexelsId, 1400);

  if (!isPage) {
    return (
      <section
        id="our-vision"
        className="relative overflow-hidden border-t border-white/5 bg-black py-16 sm:py-20 lg:py-24"
        aria-labelledby="vision-heading"
      >
        <SectionBackdrop withBgImage />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <VisionHomePreview
            eyebrow={vision.eyebrow}
            heading={vision.heading}
            lead={vision.lead}
            homeHeadline={vision.homePreview?.headline}
            pillars={vision.pillars.map((pillar) => ({
              step: pillar.step,
              title: pillar.title,
              icon: pillar.icon as VisionIconName,
            }))}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative overflow-hidden bg-[#050a18]"
      aria-labelledby="vision-heading"
    >
      <VisionHero
        badge={vision.hero.badge}
        headline={vision.hero.headline}
        subheadline={vision.hero.subheadline}
        imageSrc={heroImageSrc}
        stats={vision.stats}
        highlightStat={vision.hero.highlightStat}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <VisionPageContent />
      </div>
    </section>
  );
}
