import Image from "next/image";
import { getAssetPath } from "@/lib/assets";

export type GalleryImage = {
  src: string;
  alt: string;
};

type DojoGallerySectionProps = {
  images: GalleryImage[];
};

export function DojoGallerySection({ images }: DojoGallerySectionProps) {
  return (
    <section
      id="dojo-gallery"
      className="relative border-y border-white/10 bg-black py-14 sm:py-20"
      aria-labelledby="dojo-gallery-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_0%,rgba(31,0,255,0.14),transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="dojo-gallery-heading"
          className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          From the mats
        </h2>
        <p className="mt-3 max-w-2xl text-left text-zinc-400">
          Pulled from live floors — neon edge, grit, motion. Remote stills refreshed
          from the network.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {images.map((item) => (
            <figure
              key={item.src}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/15 bg-[#10011f]"
            >
              <Image
                src={getAssetPath(item.src)}
                alt={item.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-3 py-3 text-[11px] font-medium uppercase tracking-wider text-zinc-300 sm:text-xs">
                {item.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
