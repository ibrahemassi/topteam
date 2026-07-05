"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlassPanel } from "@/components/GlassPanel";
import { LocationMapCard } from "@/components/sections/LocationMapCard";
import { CoachTeamCard } from "@/components/sections/CoachTeamCard";
import {
  ScheduleMatrix,
  type ScheduleWeek,
} from "@/components/sections/ScheduleMatrix";
import { cn } from "@/lib/cn";
import { getAssetPath } from "@/lib/assets";
import type { LocationWithCoach } from "@/lib/locations";
import {
  coachCardReveal,
  fadeSlideUp,
  fadeSlideUpSoft,
  panelReveal,
} from "@/lib/motion-presets";

const glassStrong =
  "backdrop-blur-xl bg-white/[0.08] border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]";

type LocationsSectionProps = {
  variant?: "home" | "page";
  locations: LocationWithCoach[];
  scheduleByLocationId: Record<string, ScheduleWeek>;
  sharedVideoSrc: string;
  posterSrc?: string;
  heading?: string;
  description?: string;
  sectionId?: string;
};

export function LocationsSection({
  variant = "home",
  locations,
  scheduleByLocationId,
  sharedVideoSrc,
  posterSrc,
  heading = "Weekly schedule",
  description,
  sectionId = "training-matrix",
}: LocationsSectionProps) {
  const [activeId, setActiveId] = useState(locations[0]?.id ?? "");
  const [activeCoachIndex, setActiveCoachIndex] = useState(0);

  useEffect(() => {
    setActiveCoachIndex(0);
  }, [activeId]);

  const activeLocation = locations.find((l) => l.id === activeId);
  const activeCoach = activeLocation?.coaches[activeCoachIndex] ?? activeLocation?.coaches[0];
  const schedule = useMemo(
    () =>
      scheduleByLocationId[activeId] ??
      ({ week: "—", days: [] } as ScheduleWeek),
    [activeId, scheduleByLocationId],
  );

  if (!locations.length) return null;

  const isPage = variant === "page";

  return (
    <section
      id={sectionId}
      className="relative min-h-[90svh] overflow-hidden py-16 sm:py-20 lg:min-h-[880px] lg:py-24"
      aria-labelledby="locations-heading"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={posterSrc ? getAssetPath(posterSrc) : undefined}
        aria-hidden
      >
        <source src={getAssetPath(sharedVideoSrc)} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/85"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#1f00ff18,transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-4 sm:px-6 lg:gap-10 lg:px-10 xl:px-16">
        {!isPage && (
          <div className="text-center lg:text-left">
            <h2
              id="locations-heading"
              className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              {heading}
            </h2>
            {description ? (
              <p className="mx-auto mt-3 max-w-2xl text-zinc-300 lg:mx-0">
                {description}
              </p>
            ) : null}
          </div>
        )}

        {/* Location toggle — centered pill bar */}
        <div className="flex justify-center">
          <GlassPanel
            className={cn(
              "inline-flex flex-wrap items-center justify-center gap-1 rounded-full p-1.5 sm:gap-1.5 sm:p-2",
              glassStrong,
            )}
          >
            {locations.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setActiveId(loc.id)}
                className={cn(
                  "rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] sm:px-5 sm:py-3 sm:text-sm",
                  activeId === loc.id
                    ? "bg-[#1f00ff] text-white shadow-[0_0_20px_rgba(31,0,255,0.5)]"
                    : "text-zinc-300 hover:bg-white/10 hover:text-white",
                )}
              >
                {loc.name}
              </button>
            ))}
          </GlassPanel>
        </div>

        {/* Location name — full width row */}
        <AnimatePresence mode="wait">
          <motion.div key={activeId} className="w-full" {...fadeSlideUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffc200] sm:text-sm">
              Afara Top Team
            </p>
            <h3 className="font-[family-name:var(--font-display)] mt-3 text-[clamp(2.75rem,7vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-tight text-white">
              {activeLocation?.name ?? activeId}
            </h3>
            {isPage && activeLocation ? (
              <address className="mt-5 text-sm not-italic leading-relaxed text-zinc-400">
                {activeLocation.addressLine1}
                <br />
                {activeLocation.city}, {activeLocation.region}{" "}
                {activeLocation.postalCode}
              </address>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {/* Coach toggle + card | schedule — aligned row */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12 xl:gap-16">
          {/* Left — coach toggle + card */}
          <div className="flex w-full max-w-[400px] flex-col items-center lg:items-start lg:shrink-0">
            {activeCoach ? (
              <>
                {activeLocation && activeLocation.coaches.length > 0 ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`coach-toggle-${activeId}`}
                      className="mb-5 w-full"
                      {...fadeSlideUpSoft}
                    >
                      <GlassPanel
                        className={cn(
                          "w-full overflow-hidden rounded-full p-1",
                          glassStrong,
                        )}
                      >
                        <div className="flex h-10 items-center gap-1 overflow-x-auto [scrollbar-width:none] sm:h-11 [&::-webkit-scrollbar]:hidden">
                          {activeLocation.coaches.map((coach, index) => (
                            <button
                              key={`${activeId}-${coach.id}`}
                              type="button"
                              onClick={() => setActiveCoachIndex(index)}
                              className={cn(
                                "shrink-0 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] sm:px-5 sm:text-xs",
                                activeCoachIndex === index
                                  ? "bg-[#ffc200] text-black"
                                  : "text-zinc-300 hover:bg-white/10 hover:text-white",
                              )}
                            >
                              {coach.classLabel}
                            </button>
                          ))}
                        </div>
                      </GlassPanel>
                    </motion.div>
                  </AnimatePresence>
                ) : null}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeId}-${activeCoach.id}`}
                    className="w-full"
                    {...coachCardReveal}
                  >
                    <CoachTeamCard
                      className="w-full"
                      name={activeCoach.name}
                      role={activeCoach.role}
                      bio={activeCoach.bio}
                      imageSrc={activeCoach.imagePath}
                      disciplines={activeCoach.disciplines}
                    >
                      {isPage && activeLocation ? (
                        <div className="mt-5 border-t border-white/10 pt-5">
                          <p className="text-sm">
                            <a
                              href={`tel:${activeLocation.phone.replace(/\s/g, "")}`}
                              className="font-medium text-[#ffc200] underline-offset-4 hover:underline"
                            >
                              {activeLocation.phone}
                            </a>
                          </p>
                          <p className="mt-1 text-sm">
                            <a
                              href={`mailto:${activeLocation.email}`}
                              className="text-zinc-400 underline-offset-4 hover:text-white hover:underline"
                            >
                              {activeLocation.email}
                            </a>
                          </p>
                        </div>
                      ) : null}
                    </CoachTeamCard>
                  </motion.div>
                </AnimatePresence>
              </>
            ) : null}
          </div>

          {/* Right — schedule + map */}
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div key={`schedule-${activeId}`} {...panelReveal}>
                <GlassPanel
                  className={cn(
                    "flex flex-col overflow-hidden rounded-3xl p-0",
                    glassStrong,
                  )}
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
                    <span className="font-[family-name:var(--font-display)] text-lg tracking-[0.15em] text-white sm:text-xl">
                      TRAINING MATRIX
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#ffc200]">
                      {schedule.week}
                    </span>
                  </div>

                  <ScheduleMatrix data={schedule} variant="glass" />

                  <div className="border-t border-white/10 px-4 py-3 text-xs text-zinc-500 sm:px-6">
                    Active node:{" "}
                    <span className="font-semibold text-[#ffc200]">
                      {activeLocation?.name ?? activeId}
                    </span>
                  </div>
                </GlassPanel>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {activeLocation ? (
                <motion.div key={`map-${activeId}`} {...panelReveal}>
                  <LocationMapCard
                    name={activeLocation.name}
                    addressLine={`${activeLocation.addressLine1}, ${activeLocation.city}`}
                    mapLat={activeLocation.mapLat}
                    mapLng={activeLocation.mapLng}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
