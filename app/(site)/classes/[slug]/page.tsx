import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GlassPanel } from "@/components/GlassPanel";
import { getSiteData } from "@/lib/site-data";
import { pexelsUrl } from "@/lib/pexels-url";

export function generateStaticParams() {
  return getSiteData().classes.map((c) => ({ slug: c.id }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getSiteData().classes.find((x) => x.id === slug);
  if (!c) return { title: "Class" };
  return {
    title: `${c.title} — Afara Top Team`,
    description: c.description,
  };
}

export default async function ClassDetailPage({ params }: Props) {
  const { slug } = await params;
  const c = getSiteData().classes.find((x) => x.id === slug);
  if (!c) notFound();

  const img = c.imageLocalPath ?? pexelsUrl(c.imagePexelsId, 1400);

  return (
    <div className="bg-black pb-24 pt-28 lg:pt-32">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/classes"
          className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ffc200] transition hover:text-white"
        >
          ← All classes
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr,1fr] lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/12 bg-[#10011f] lg:sticky lg:top-32 lg:self-start">
            <Image
              src={img}
              alt={c.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffc200]">
              {c.subtitle}
            </p>
            <h1 className="font-[family-name:var(--font-display)] mt-4 text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
              {c.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-300">
              {c.overview}
            </p>

            <GlassPanel className="mt-10 rounded-2xl p-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
                What we emphasize
              </h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-200">
                {c.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </GlassPanel>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/#training-matrix"
                className="inline-flex rounded-md border border-[#1f00ff] bg-[#1f00ff]/90 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_24px_rgba(31,0,255,0.6)] transition hover:bg-[#1f00ff]"
              >
                View timetable
              </Link>
              <Link
                href="/#hero-cta"
                className="inline-flex rounded-md border border-white/25 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition hover:border-white"
              >
                Free session
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
