"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { getAssetPath } from "@/lib/assets";

export type FighterCard = {
  id?: string;
  name: string;
  discipline: string;
  image: string;
  alt?: string;
  number?: string;
};

type FighterSectionProps = {
  fighters: FighterCard[];
  showHeading?: boolean;
};

export function FighterSection({
  fighters,
  showHeading = true,
}: FighterSectionProps) {
  return (
    <section
      id="fighters"
      className="relative bg-black py-20 sm:py-28"
      aria-labelledby={showHeading ? "fighters-heading" : undefined}
      aria-label={showHeading ? undefined : "Featured fighters"}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#10011f,transparent_55%)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <div className="mb-16 text-center">
            <h2
              id="fighters-heading"
              className="font-(family-name:--font-display) text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl"
            >
              Elite <span className="text-[#1f00ff]">Roster</span>
            </h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#1f00ff]" />
          </div>
        )}

        <div
          className={cn(
            "-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden",
            !showHeading && "mt-8",
          )}
        >
          {fighters.map((f, i) => {
            const cardContent = (
              <>
                {/* Main Fighter Image */}
                <Image
                  src={getAssetPath(f.image)}
                  alt={f.alt ?? f.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Top Glass Header */}
                <div className="absolute inset-x-4 top-4 z-30">
                  <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/20 p-1.5 pr-4 backdrop-blur-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[#1f00ff]/40 bg-black">
                        <Image
                          src={getAssetPath("/Logo-from-the-back.png")}
                          alt="Logo"
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-tight text-white">
                          {f.name.split(" ")[0]}
                        </span>
                        <span className="text-[8px] font-medium text-zinc-400">
                          TOP TEAM
                        </span>
                      </div>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[#ffc200] transition hover:bg-white/20">
                      Active
                    </div>
                  </div>
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 z-10 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-0 z-10 bg-linear-to-b from-black/40 via-transparent to-transparent opacity-60" />

                {/* Bottom Content */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-8">
                  <motion.h3 
                    className="font-(family-name:--font-display) text-4xl font-bold uppercase leading-[0.85] tracking-tighter text-white sm:text-5xl"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                  >
                    {f.name.split(" ")[0]}
                    <br />
                    <span className="text-[#1f00ff]">{f.name.split(" ").slice(1).join(" ")}</span>
                  </motion.h3>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="rounded-lg bg-[#1f00ff] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_15px_rgba(31,0,255,0.5)]">
                      {f.discipline.split(" / ")[0]}
                    </div>
                    <div className="h-1 w-1 rounded-full bg-zinc-500" />
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-300">
                      <span className="text-white">PRO</span>
                      <span className="text-zinc-500">•</span>
                      <span>{f.number ?? "00"}</span>
                    </div>
                  </div>
                </div>
              </>
            );

            return (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-4/5 w-[min(78vw,300px)] shrink-0 overflow-hidden rounded-[2.5rem] bg-zinc-900 shadow-2xl sm:w-full"
              >
                {f.id ? (
                  <Link href={`/fighters/${f.id}`} className="block h-full w-full">
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </motion.div>
            );
          })}
        </div>

        {showHeading && (
          <p className="mt-12 text-center text-sm font-medium tracking-wide text-zinc-500 max-w-3xl mx-auto uppercase">
            Afara Top Team • Professional Combat Sports Division
          </p>
        )}
      </div>
    </section>
  );
}
