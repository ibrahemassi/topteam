import type { Metadata } from "next";
import { FighterSection } from "@/components/sections/FighterSection";
import { getSiteData } from "@/lib/site-data";
import { pexelsUrl } from "@/lib/pexels-url";

export const metadata: Metadata = {
  title: "Featured fighters — Afara Top Team",
  description:
    "Amateur and rising pros who train their camps at Afara Top Team.",
};

export default function FightersPage() {
  const site = getSiteData();
  const fighters = site.fighters.map((f) => ({
    id: (f as any).id,
    name: f.name,
    discipline: f.discipline,
    image: f.imageLocalPath ?? pexelsUrl((f as any).imagePexelsId, 900),
    alt: f.note ? `${f.name} — ${f.note}` : f.name,
    number: (f as any).number ?? "00",
  }));

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-white/10 px-4 pt-20 pb-8 sm:px-6 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffc200]">
            Competitive roster
          </p>
          <h1 className="font-(family-name:--font-display) mt-4 text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl">
            Fighters
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Spotlight athletes who build their camps out of Afara Top Team — not an
            exhaustive roster, just the killers we&apos;re filming this season.
          </p>
        </div>
      </div>
      <FighterSection fighters={fighters} showHeading={false} />
    </div>
  );
}
