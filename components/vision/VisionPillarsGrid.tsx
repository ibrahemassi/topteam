"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GlassPanel } from "@/components/GlassPanel";
import { cn } from "@/lib/cn";
import { getAssetPath } from "@/lib/assets";

import { VisionIcon, type VisionIconName } from "@/components/vision/vision-icons";

export type VisionPillar = {
  step: string;
  title: string;
  description: string;
  icon: VisionIconName;
  imageSrc: string;
};

const CARD_HEIGHT = "h-[300px] sm:h-[320px]";
const FADE_MS = "duration-300";

function PillarCard({
  pillar,
  isExpanded,
  onExpand,
  onClose,
}: {
  pillar: VisionPillar;
  isExpanded: boolean;
  onExpand: () => void;
  onClose: () => void;
}) {
  const { step, title, description, icon, imageSrc } = pillar;

  return (
    <div className="relative h-full">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? undefined : `Expand ${title}`}
        onClick={!isExpanded ? onExpand : undefined}
        tabIndex={isExpanded ? -1 : 0}
        className={cn(
          "absolute inset-0 block h-full w-full cursor-pointer text-left transition-opacity ease-out",
          FADE_MS,
          isExpanded
            ? "pointer-events-none opacity-0"
            : "opacity-100",
        )}
      >
        <GlassPanel className="relative flex h-full flex-col overflow-hidden rounded-2xl p-4 sm:rounded-3xl sm:p-5">
          <Image
            src={getAssetPath(imageSrc)}
            alt=""
            fill
            className="object-cover opacity-[0.45] saturate-[0.95]"
            sizes="280px"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#050a18]/55 via-[#10011f]/70 to-[#050a18]/85"
            aria-hidden
          />

          <div className="relative z-10 flex flex-col">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1f00ff]/40 bg-[#1f00ff]/15 text-[#ffc200] shadow-[0_0_20px_rgba(31,0,255,0.35)] sm:h-12 sm:w-12 sm:rounded-xl">
              <VisionIcon name={icon} className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="font-[family-name:var(--font-display)] mt-4 text-3xl leading-none text-white/20 sm:text-4xl">
              {step}
            </span>
            <h3 className="font-[family-name:var(--font-display)] mt-2 text-base uppercase leading-tight tracking-wide text-white sm:text-lg">
              {title}
            </h3>
            <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-zinc-400">
              {description}
            </p>
          </div>
        </GlassPanel>
      </button>

      <div
        className={cn(
          "absolute inset-0 flex flex-row overflow-hidden rounded-2xl border border-white/15 bg-[#0a0e1a]/95 p-3 shadow-[0_24px_60px_rgba(31,0,255,0.2)] backdrop-blur-xl transition-opacity ease-out sm:rounded-3xl sm:p-4",
          FADE_MS,
          isExpanded
            ? "opacity-100 delay-75"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="relative h-full w-[38%] shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:w-[42%]">
          <Image
            src={getAssetPath(imageSrc)}
            alt={title}
            fill
            className="object-cover"
            sizes="420px"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center overflow-hidden px-2 py-3 sm:px-6 sm:py-4 lg:px-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffc200] sm:text-xs">
            {step}
          </p>
          <h3 className="font-[family-name:var(--font-display)] mt-1.5 line-clamp-2 text-lg uppercase leading-tight text-white sm:mt-2 sm:text-2xl lg:text-3xl">
            {title}
          </h3>
          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-zinc-400 sm:mt-3 sm:line-clamp-4 sm:text-sm">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5 sm:gap-3">
            <Link
              href="#humanitarian-events"
              className="inline-flex rounded-full border border-[#1f00ff]/50 bg-[#1f00ff]/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f00ff]/45"
              onClick={(e) => e.stopPropagation()}
            >
              Explore more
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-sm font-medium text-zinc-500 transition hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VisionPillarsGrid({ pillars }: { pillars: VisionPillar[] }) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [&::-webkit-scrollbar]:hidden">
      <div
        className={cn(
          "flex w-max items-stretch gap-4 snap-x snap-mandatory sm:gap-5",
          CARD_HEIGHT,
        )}
      >
        {pillars.map((pillar) => {
          const isExpanded = expandedStep === pillar.step;

          return (
            <div
              key={pillar.step}
              className={cn(
                "shrink-0 snap-start transition-[width] duration-300 ease-out",
                CARD_HEIGHT,
                isExpanded
                  ? "w-[min(92vw,560px)]"
                  : "w-[min(72vw,260px)] sm:w-[280px]",
              )}
            >
              <PillarCard
                pillar={pillar}
                isExpanded={isExpanded}
                onExpand={() => setExpandedStep(pillar.step)}
                onClose={() => setExpandedStep(null)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
