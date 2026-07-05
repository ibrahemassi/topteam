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

type ScheduleMatrixProps = {
  data: ScheduleWeek;
  variant?: "default" | "glass";
  className?: string;
};

export function ScheduleMatrix({
  data,
  variant = "default",
  className,
}: ScheduleMatrixProps) {
  const isGlass = variant === "glass";

  return (
    <div className={cn(isGlass ? "w-full" : "overflow-x-auto", className)}>
      <div
        className={cn(
          "grid w-full gap-px p-px",
          !isGlass && "min-w-[720px]",
          isGlass ? "bg-white/10" : "bg-[#1f00ff]/50",
        )}
        style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}
      >
        {data.days.map((d) => (
          <div
            key={d.day + d.sub}
            className={cn(
              "flex flex-col",
              isGlass ? "bg-white/[0.04]" : "bg-black",
            )}
          >
            <div
              className={cn(
                "px-2 py-3 text-center sm:px-3",
                isGlass
                  ? "border-b border-white/10 bg-white/[0.06]"
                  : "border-b border-[#1f00ff]/50 bg-[#000814]",
              )}
            >
              <div className="font-[family-name:var(--font-display)] text-lg text-white sm:text-xl">
                {d.day}
              </div>
              <div className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#ffc200] sm:text-[10px] sm:tracking-[0.35em]">
                {d.sub}
              </div>
            </div>
            <div
              className={cn(
                "flex flex-1 flex-col gap-px p-px",
                isGlass ? "bg-white/5" : "bg-[#1f00ff]/40",
              )}
            >
              {d.slots.map((slot) => (
                <div
                  key={slot}
                  className={cn(
                    isGlass
                      ? "min-h-[46px] px-1 py-1.5 text-[9px] sm:min-h-[52px] sm:px-2 sm:py-2 sm:text-[11px]"
                      : "min-h-[52px] px-2 py-2 text-[11px] sm:text-xs",
                    "flex-1 text-center font-semibold uppercase leading-snug tracking-wide",
                    slot === "—"
                      ? isGlass
                        ? "bg-white/[0.02] text-zinc-600"
                        : "bg-[#050505] text-zinc-600"
                      : isGlass
                        ? "bg-white/[0.08] text-zinc-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
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
  );
}
