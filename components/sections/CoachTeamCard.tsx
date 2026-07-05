import Image from "next/image";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { getAssetPath } from "@/lib/assets";
import { webfolioTransition } from "@/lib/motion-presets";

type CoachTeamCardProps = {
  name: string;
  role: string;
  bio?: string;
  imageSrc: string;
  disciplines?: string[];
  className?: string;
  children?: ReactNode;
};

export function CoachTeamCard({
  name,
  role,
  bio,
  imageSrc,
  disciplines,
  className,
  children,
}: CoachTeamCardProps) {
  return (
    <article className={cn("group relative w-full max-w-[400px]", className)}>
      <div className="relative z-[2] overflow-hidden rounded-[10px] border border-white/10 bg-white/[0.06] backdrop-blur-xl">
        <div className="relative aspect-[4/5] min-h-[420px] w-full bg-transparent sm:min-h-[460px]">
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
            <div className="absolute bottom-[8%] left-1/2 h-[55%] w-[85%] -translate-x-1/2 rounded-full bg-[#ffc200]/20 blur-[48px] transition-opacity duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:bg-[#ffc200]/45" />
            <div className="absolute bottom-[15%] left-1/2 h-[35%] w-[60%] -translate-x-1/2 rounded-full bg-[#ffc200]/10 blur-[32px] transition-opacity duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:bg-[#ffc200]/30" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={imageSrc}
              className="absolute inset-0 z-[1]"
              initial={{ opacity: 0, y: 24, scale: 1.04 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={webfolioTransition}
            >
              <Image
                src={getAssetPath(imageSrc)}
                alt={name}
                fill
                className="object-contain object-bottom transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 360px, 400px"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-[12px] bottom-[-20px] z-[3] rounded-[10px] border border-white/15 bg-black/20 px-4 py-4 opacity-0 backdrop-blur-xl transition-all duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:bottom-[12px] group-hover:opacity-100">
            {disciplines?.length ? (
              <span className="block text-[10px] font-medium uppercase tracking-wider text-[#ffc200]">
                {disciplines.join(" • ")}
              </span>
            ) : null}
            <h6 className="mt-1 text-base font-semibold text-white">{name}</h6>
            {bio ? (
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-zinc-300">
                {bio}
              </p>
            ) : (
              <p className="mt-2 text-xs text-zinc-400">{role}</p>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${name}-${role}`}
          className="relative z-[1] mt-5 text-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={webfolioTransition}
        >
          <h6 className="text-lg font-semibold text-white">{name}</h6>
          <p className="mt-2.5 text-sm text-zinc-500">{role}</p>
          {children}
        </motion.div>
      </AnimatePresence>
    </article>
  );
}
