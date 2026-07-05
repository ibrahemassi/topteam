import { cn } from "@/lib/cn";

export const visionIconPaths = {
  aid: (
    <>
      <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />
      <path d="M12 11v6M9 14h6" />
    </>
  ),
  youth: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M6 20c0-3.5 2.7-6 6-6s6 2.5 6 6" />
      <path d="M16 11l2 2M8 11 6 13" />
    </>
  ),
  relief: (
    <>
      <path d="M12 3 4 7v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7l-8-4z" />
      <path d="M12 11v5M9 14h6" />
    </>
  ),
  impact: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    </>
  ),
  volunteer: (
    <>
      <path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3z" />
      <path d="M8 11c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3z" />
      <path d="M16 13c2.2 0 4 1.2 4 3v2H12v-2c0-1.8 1.8-3 4-3z" />
      <path d="M8 13c2.2 0 4 1.2 4 3v2H4v-2c0-1.8 1.8-3 4-3z" />
    </>
  ),
  partners: (
    <>
      <path d="M8 12h8" />
      <path d="M12 8v8" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="18" r="3" />
    </>
  ),
} as const;

export type VisionIconName = keyof typeof visionIconPaths;

export function VisionIcon({
  name,
  className,
}: {
  name: VisionIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-10 w-10", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {visionIconPaths[name]}
    </svg>
  );
}
