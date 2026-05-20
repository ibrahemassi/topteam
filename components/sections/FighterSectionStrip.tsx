"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { getAssetPath } from "@/lib/assets";

export type FighterStripItem = {
  id?: string;
  name: string;
  discipline: string;
  image: string;
  number: string;
};

type FighterSectionStripProps = {
  fighters: FighterStripItem[];
};

export function FighterSectionStrip({ fighters }: FighterSectionStripProps) {
  return (
    <section className="relative overflow-hidden bg-black py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 md:flex-nowrap md:gap-2">
          {fighters.map((f, i) => {
            const cardContent = (
              <div className="relative aspect-3/4.2 w-full">
                {/* Desaturated Fighter Image */}
                <Image
                  src={getAssetPath(f.image)}
                  alt={f.name}
                  fill
                  className="object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />

                {/* Top Left Number */}
                <div className="absolute left-4 top-4 z-20">
                  <span className="font-(family-name:--font-display) text-4xl font-bold text-zinc-500/50 transition-colors duration-300 group-hover:text-white/80">
                    {f.number}
                  </span>
                </div>

                {/* Vertical Blue Bar on the Right */}
                <div className="absolute bottom-0 right-0 top-0 z-10 w-[24%] bg-[#1f00ff] transition-transform duration-500 group-hover:translate-x-1">
                  {/* Vertical Name inside the bar */}
                  <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center justify-center">
                    <p 
                      className="-rotate-90 whitespace-nowrap font-(family-name:--font-display) text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl"
                      style={{ transformOrigin: "center" }}
                    >
                      {f.name}
                    </p>
                  </div>
                </div>

                {/* Bottom Gradient for readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );

            return (
              <motion.div
                key={`${f.name}-${i}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative w-full max-w-[280px] min-w-[180px] flex-1 overflow-hidden rounded-xl bg-zinc-900/50 md:min-w-0"
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
      </div>
    </section>
  );
}
