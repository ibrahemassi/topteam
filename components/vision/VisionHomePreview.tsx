import Link from "next/link";
import { VisionIcon, type VisionIconName } from "@/components/vision/vision-icons";
import "./vision-feat-sec.css";

const boxClasses = [
  "vision-feat-box1",
  "vision-feat-box2",
  "vision-feat-box3",
  "vision-feat-box4",
  "vision-feat-box5",
  "vision-feat-box6",
] as const;

export type HomePillar = {
  step: string;
  title: string;
  icon: VisionIconName;
};

type VisionHomePreviewProps = {
  eyebrow: string;
  heading: string;
  lead: string;
  homeHeadline?: string;
  pillars: HomePillar[];
  ctaHref?: string;
  ctaLabel?: string;
};

export function VisionHomePreview({
  eyebrow,
  heading,
  lead,
  homeHeadline,
  pillars,
  ctaHref = "/vision",
  ctaLabel = "Explore our vision",
}: VisionHomePreviewProps) {
  const headline = homeHeadline ?? heading;

  return (
    <div className="vision-feat-sec">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="order-2 grid grid-cols-3 gap-2 sm:gap-3 lg:order-1">
          {pillars.map((pillar, index) => (
            <div key={pillar.step} className="min-w-0">
              <div
                className={`vision-feat-item text-center ${boxClasses[index] ?? boxClasses[0]}`}
              >
                <span className="vision-feat-icon mb-2 flex justify-center text-[#ffc200] sm:mb-3 lg:mb-4">
                  <VisionIcon
                    name={pillar.icon}
                    className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10"
                  />
                </span>
                <h6 className="text-[10px] font-semibold leading-tight text-white sm:text-sm lg:text-base">
                  {pillar.title}
                </h6>
                <span className="vision-feat-label mt-1 block text-[8px] font-medium uppercase tracking-wider text-zinc-500 sm:mt-1.5 sm:text-[10px] lg:text-xs">
                  Pillar {pillar.step}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="order-1 flex flex-col justify-center text-center lg:order-2 lg:text-left">
          <div>
            <h6 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#ffc200] sm:text-sm">
              {eyebrow}
            </h6>
            <h2
              id="vision-heading"
              className="font-[family-name:var(--font-display)] mx-auto mb-4 max-w-lg text-3xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:mx-0 lg:max-w-none lg:text-[3.25rem]"
            >
              {headline.split("\n").map((line, index) => (
                <span key={line + index} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-lg lg:mx-0">
              {lead}
            </p>
            <Link
              href={ctaHref}
              className="group mx-auto mt-8 inline-flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:text-[#ffc200] lg:mx-0 lg:justify-start"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 transition group-hover:border-[#1f00ff]/50 group-hover:bg-[#1f00ff]/15">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H9M17 7v8"
                  />
                </svg>
              </span>
              <span>{ctaLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
