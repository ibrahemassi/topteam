"use client";

import { useMemo, useState } from "react";
import { GlassPanel } from "@/components/GlassPanel";
import { cn } from "@/lib/cn";

export type ScheduleDayBlock = {
  day: string;
  sub: string;
  slots: string[];
};

export type ScheduleWeek = {
  week: string;
  days: ScheduleDayBlock[];
};

export type LocationOption = {
  id: string;
  name: string;
};

type ScheduleBoardProps = {
  heading: string;
  description: string;
  locations: LocationOption[];
  scheduleByLocationId: Record<string, ScheduleWeek>;
  sectionId?: string;
};

export function ScheduleBoard({
  heading,
  description,
  locations,
  scheduleByLocationId,
  sectionId = "training-matrix",
}: ScheduleBoardProps) {
  const [activeId, setActiveId] = useState(locations[0]?.id ?? "");
  const data = useMemo(
    () =>
      scheduleByLocationId[activeId] ??
      ({ week: "—", days: [] } as ScheduleWeek),
    [activeId, scheduleByLocationId],
  );

  const activeLoc = locations.find((l) => l.id === activeId);

  if (!locations.length) return null;

  return (
    <section
      id={sectionId}
      className="relative border-y border-[#1f00ff]/25 bg-[#02040a] py-20 sm:py-28"
      aria-labelledby="schedule-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(31,0,255,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(16,1,31,0.9),transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="schedule-heading"
          className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {heading}
        </h2>
        <p className="mt-3 max-w-2xl text-left text-zinc-400">{description}</p>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-start">
          <aside className="flex w-full shrink-0 flex-row flex-wrap items-center gap-3 lg:w-52 lg:flex-col lg:items-stretch">
            <p className="w-full text-xs font-semibold uppercase tracking-[0.3em] text-[#ffc200] lg:w-auto">
              Select location
            </p>
            {locations.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setActiveId(loc.id)}
                className={cn(
                  "min-w-[8.5rem] flex-1 rounded-lg px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider transition sm:min-w-0 sm:flex-none lg:w-full lg:text-left",
                  activeId === loc.id
                    ? "border border-[#1f00ff] bg-[#1f00ff]/25 text-white shadow-[0_0_24px_rgba(31,0,255,0.45)]"
                    : "border border-white/10 bg-black/40 text-zinc-400 hover:border-[#1f00ff]/40 hover:text-zinc-100",
                )}
              >
                {loc.name}
              </button>
            ))}
          </aside>

          <GlassPanel className="flex-1 overflow-hidden rounded-2xl border-[#1f00ff]/35 bg-black/60 p-0">
            <div className="flex items-center justify-between border-b border-[#1f00ff]/40 bg-[#10011f] px-4 py-3 sm:px-6">
              <span className="font-[family-name:var(--font-display)] text-lg tracking-[0.2em] text-white">
                TRAINING MATRIX
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#ffc200]">
                {data.week}
              </span>
            </div>

            <div className="overflow-x-auto">
              <div
                className="grid min-w-[720px] gap-px bg-[#1f00ff]/50 p-px"
                style={{
                  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                }}
              >
                {data.days.map((d) => (
                  <div key={d.day + d.sub} className="flex flex-col bg-black">
                    <div className="border-b border-[#1f00ff]/50 bg-[#000814] px-2 py-3 text-center sm:px-3">
                      <div className="font-[family-name:var(--font-display)] text-xl text-white">
                        {d.day}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#ffc200]">
                        {d.sub}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-px bg-[#1f00ff]/40 p-px">
                      {d.slots.map((slot) => (
                        <div
                          key={slot}
                          className={cn(
                            "min-h-[52px] flex-1 px-2 py-2 text-center text-[11px] font-semibold uppercase leading-snug tracking-wide sm:text-xs",
                            slot === "—"
                              ? "bg-[#050505] text-zinc-600"
                              : "bg-[#0a1020] text-zinc-100 shadow-[inset_0_0_0_1px_rgba(31,0,255,0.25)]",
                          )}
                        >
                          {slot}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 bg-black/80 px-4 py-3 text-xs text-zinc-500 sm:px-6">
              Active node:{" "}
              <span className="font-semibold text-[#ffc200]">
                {activeLoc?.name ?? activeId}
              </span>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
