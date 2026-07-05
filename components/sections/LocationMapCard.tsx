import { cn } from "@/lib/cn";

type LocationMapCardProps = {
  name: string;
  addressLine: string;
  mapLat: number;
  mapLng: number;
  className?: string;
};

function buildMapEmbedUrl(lat: number, lng: number) {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=15&hl=en&output=embed`;
}

function buildMapLinkUrl(lat: number, lng: number, label: string) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(label)}`;
}

export function LocationMapCard({
  name,
  addressLine,
  mapLat,
  mapLng,
  className,
}: LocationMapCardProps) {
  const embedUrl = buildMapEmbedUrl(mapLat, mapLng);
  const mapsLink = buildMapLinkUrl(mapLat, mapLng, name);

  return (
    <div
      className={cn(
        "flex min-h-[320px] flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
        <span className="font-[family-name:var(--font-display)] text-lg tracking-[0.15em] text-white sm:text-xl">
          FIND US
        </span>
        <span className="text-xs font-bold uppercase tracking-widest text-[#ffc200]">
          Google Maps
        </span>
      </div>

      <div className="relative min-h-[240px] flex-1">
        <iframe
          title={`${name} on Google Maps`}
          src={embedUrl}
          className="absolute inset-0 h-full w-full border-0 grayscale-[20%] contrast-[1.05]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-6">
        <p className="min-w-0 truncate text-xs text-zinc-400">{addressLine}</p>
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs font-semibold uppercase tracking-wider text-[#ffc200] transition hover:text-white"
        >
          Open in Maps
        </a>
      </div>
    </div>
  );
}
