import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const glassBase =
  "backdrop-blur-md bg-white/10 border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";

export type GlassPanelProps = HTMLAttributes<HTMLDivElement>;

export function GlassPanel({ className, children, ...rest }: GlassPanelProps) {
  return (
    <div className={cn(glassBase, className)} {...rest}>
      {children}
    </div>
  );
}
