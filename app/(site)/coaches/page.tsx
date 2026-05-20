import type { Metadata } from "next";
import Image from "next/image";
import { GlassPanel } from "@/components/GlassPanel";
import { getSiteData } from "@/lib/site-data";
import { pexelsUrl } from "@/lib/pexels-url";

export const metadata: Metadata = {
  title: "Coaches — Afara Top Team",
  description:
    "Meet Afara Top Team striking, wrestling, and hybrid coaches.",
};

export default function CoachesPage() {
  const { coaches } = getSiteData();

  return (
    <div className="bg-black pb-24 pt-28 lg:pt-32">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffc200]">
          Staff room
        </p>
        <h1 className="font-[family-name:var(--font-display)] mt-4 text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl">
          Coaches
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Real fight mileage, obsessive fundamentals, zero ego coaching. Reach
          out at the desk or ask any coach after class — they publish office
          hours weekly.
        </p>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2">
          {coaches.map((coach) => (
            <li key={coach.id}>
              <GlassPanel className="flex overflow-hidden rounded-3xl border-white/14 p-0">
                <div className="relative w-[38%] min-h-[260px] shrink-0 bg-[#10011f] sm:min-h-[300px]">
                  <Image
                    src={pexelsUrl(coach.imagePexelsId, 800)}
                    alt={coach.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 40vw, 22vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-2xl text-white sm:text-3xl">
                      {coach.name}
                    </h2>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#ffc200]">
                      {coach.role}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                      {coach.bio}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {coach.disciplines.map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-300"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassPanel>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
