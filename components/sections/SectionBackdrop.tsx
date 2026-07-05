import Image from "next/image";
import { cn } from "@/lib/cn";
import { getAssetPath } from "@/lib/assets";

export function SectionBackdrop({ withBgImage = false }: { withBgImage?: boolean }) {
  return (
    <>
      {withBgImage ? (
        <Image
          src={getAssetPath("/landing-preview/img/image.png")}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden
        />
      ) : null}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          withBgImage ? "bg-black/70" : "bg-transparent",
        )}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1f00ff22,transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050a18_0%,#10011f44_40%,#000_100%)]"
        aria-hidden
      />
    </>
  );
}
