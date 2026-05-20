import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import { cn } from "@/lib/cn";
import { getAssetPath } from "@/lib/assets";
import { 
  Camera, 
  MessageCircle, 
  Video, 
  ArrowLeft, 
  ChevronRight,
  Trophy,
  Target,
  Zap
} from "lucide-react";

interface FighterPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return site.fighters.map((f) => ({
    slug: f.id,
  }));
}

export async function generateMetadata({ params }: FighterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const fighter = site.fighters.find((f) => f.id === slug);
  if (!fighter) return { title: "Fighter Not Found" };

  return {
    title: `${fighter.name} | Afara Top Team`,
    description: fighter.note,
  };
}

export default async function FighterPage({ params }: FighterPageProps) {
  const { slug } = await params;
  const fighter = site.fighters.find((f) => f.id === slug);

  if (!fighter) {
    notFound();
  }

  const firstName = fighter.name.split(" ")[0];
  const lastName = fighter.name.split(" ").slice(1).join(" ");

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getAssetPath(fighter.imageLocalPath)}
          alt=""
          fill
          className="object-cover opacity-10 blur-2xl grayscale"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black" />
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1f00ff]/5 blur-[140px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-[1600px] px-6 py-20 sm:px-12 lg:py-32">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-24">
          
          {/* Left Column: Fighter Card */}
          <div className="lg:col-span-5">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-[3rem] border border-white/10 bg-zinc-900/30 shadow-2xl backdrop-blur-xl">
              {/* 1. Background Image Layer */}
              <Image
                src={getAssetPath(fighter.imageLocalPath)}
                alt=""
                fill
                className="z-0 object-cover object-top opacity-40 blur-[2px]"
                priority
              />

              {/* 2. Middle Layer: Name Typography (Moved to top) */}
              <div className="pointer-events-none absolute inset-x-0 top-12 z-10 flex flex-col items-center text-center px-4">
                <h1 className="flex flex-col font-(family-name:--font-display) leading-[0.8] tracking-tighter">
                  <span className="text-6xl font-black uppercase text-white sm:text-7xl lg:text-6xl xl:text-8xl">
                    {firstName}
                  </span>
                  <span className="text-5xl font-black uppercase text-[#1f00ff] sm:text-6xl lg:text-5xl xl:text-7xl mt-2">
                    {lastName}
                  </span>
                </h1>
              </div>

              {/* 3. Top Layer: Foreground Image (no background) */}
              <Image
                src={getAssetPath(fighter.imageNoBg || fighter.imageLocalPath)}
                alt={fighter.name}
                fill
                className="z-20 object-cover object-top transition-transform duration-700 hover:scale-105"
                priority
              />

              {/* Card Overlay Gradient */}
              <div className="absolute inset-0 z-30 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Information */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-16">
              
              {/* Header Info */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#ffc200]">
                  Elite Professional
                </p>
                <h2 className="mt-4 font-(family-name:--font-display) text-5xl font-black uppercase tracking-tight sm:text-7xl">
                  {firstName} {lastName}
                </h2>
                <div className="mt-6 flex items-center gap-4">
                  <div className="rounded-full bg-[#1f00ff] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
                    {fighter.discipline}
                  </div>
                  <div className="h-1 w-1 rounded-full bg-zinc-700" />
                  <p className="text-sm font-medium text-zinc-400">#{fighter.number} • Pro Division</p>
                </div>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
                  {fighter.note}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter text-white">{fighter.stats?.rating}</span>
                    <Trophy className="h-5 w-5 text-[#ffc200]" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Match Ratings</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter text-white">{fighter.stats?.marketValue}</span>
                    <Zap className="h-5 w-5 text-[#1f00ff]" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Market Value</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter text-white">{fighter.stats?.accuracy}</span>
                    <Target className="h-5 w-5 text-emerald-500" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Pass Accuracy</p>
                </div>
              </div>

              {/* Match Section */}
              <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                {/* Next Match */}
                <div className="group overflow-hidden rounded-[2.5rem] bg-white p-8 text-black shadow-2xl transition-transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Upcoming Bouts</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:translate-x-1">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border border-zinc-100 bg-zinc-50 p-2">
                      <Image src={getAssetPath("/Logo-from-the-back.png")} alt="Gym" fill className="object-contain p-2" />
                    </div>
                    <span className="text-sm font-black italic text-zinc-300">VS</span>
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border border-zinc-100 bg-zinc-50 p-2">
                      <Image src={getAssetPath(fighter.nextMatch?.logo || "/Logo-from-the-back.png")} alt="Opponent" fill className="object-contain p-2" />
                    </div>
                  </div>

                  <div className="mt-8 space-y-1">
                    <p className="text-xs font-bold text-zinc-400">{fighter.nextMatch?.date}</p>
                    <p className="text-xl font-black uppercase tracking-tighter">
                      {firstName} VS {fighter.nextMatch?.opponent}
                    </p>
                  </div>
                </div>

                {/* Recent Bouts */}
                <div className="space-y-4">
                  <p className="px-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Recent History</p>
                  {fighter.matches?.map((match, i) => (
                    <div 
                      key={i}
                      className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-3 pr-6 transition hover:bg-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/5 p-1.5">
                          <Image src={getAssetPath("/Logo-from-the-back.png")} alt="Opponent" fill className="object-contain p-1.5 grayscale opacity-40" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{match.date}</p>
                          <p className="text-xs font-black uppercase">{match.opponent} <span className="text-[#1f00ff]">VS</span> {firstName}</p>
                        </div>
                      </div>
                      <div className={cn(
                        "text-[10px] font-black uppercase tracking-tighter",
                        match.result === "WIN" ? "text-emerald-500" : "text-red-500"
                      )}>
                        {match.result}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Socials & Actions */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex gap-3">
                  {fighter.socials?.instagram && (
                    <a href={fighter.socials.instagram} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#1f00ff]/50 hover:bg-[#1f00ff]/10">
                      <Camera className="h-5 w-5" />
                    </a>
                  )}
                  {fighter.socials?.twitter && (
                    <a href={fighter.socials.twitter} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#1f00ff]/50 hover:bg-[#1f00ff]/10">
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  )}
                  {fighter.socials?.youtube && (
                    <a href={fighter.socials.youtube} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#1f00ff]/50 hover:bg-[#1f00ff]/10">
                      <Video className="h-5 w-5" />
                    </a>
                  )}
                </div>
                <div className="h-10 w-px bg-white/10" />
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 transition hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Roster
                </Link>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#1f00ff]/20 to-transparent" />
    </div>
  );
}
