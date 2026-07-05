import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { getAssetPath } from "@/lib/assets";

export type BlogCardProps = {
  title: string;
  excerpt: string;
  imageSrc: string;
  href: string;
  category?: string;
  date?: string;
  className?: string;
  imageAlt?: string;
};

export function BlogCard({
  title,
  excerpt,
  imageSrc,
  href,
  category = "Article",
  date,
  className,
  imageAlt,
}: BlogCardProps) {
  const formattedDate =
    date &&
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <Link
      href={href}
      className={cn(
        "group relative block aspect-[3/4] min-h-[300px] w-full overflow-hidden rounded-[1.75rem] bg-zinc-900 sm:min-h-[340px] sm:rounded-[2rem]",
        className,
      )}
    >
      <Image
        src={getAssetPath(imageSrc)}
        alt={imageAlt ?? title}
        fill
        className="object-cover transition duration-700 group-hover:scale-105"
        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 320px"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10"
        aria-hidden
      />

      <div
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white/80 backdrop-blur-md sm:right-4 sm:top-4"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <circle cx="5" cy="12" r="1.75" />
          <circle cx="12" cy="12" r="1.75" />
          <circle cx="19" cy="12" r="1.75" />
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white/75">
              {category}
              {formattedDate && (
                <span className="text-white/45"> · {formattedDate}</span>
              )}
            </p>
            <h3 className="mt-1 line-clamp-2 text-lg font-bold leading-snug text-white transition group-hover:text-[#ffc200] sm:text-xl">
              {title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/65">
              {excerpt}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-black transition group-hover:bg-[#ffc200] sm:px-4 sm:text-sm">
            See post
          </span>
        </div>
      </div>
    </Link>
  );
}
