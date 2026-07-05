import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAssetPath } from "@/lib/assets";

const business = [
  { href: "/", label: "Home" },
  { href: "/locations", label: "Locations" },
  { href: "/classes", label: "Classes" },
  { href: "#", label: "Gift cards" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/vision", label: "Vision" },
  { href: "#", label: "Careers" },
  { href: "#", label: "Press" },
  { href: "#", label: "Legal" },
];

function SocialIcon({ children, label }: { children: ReactNode; label: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 transition hover:border-[#1f00ff]/60 hover:text-white hover:shadow-[0_0_16px_rgba(31,0,255,0.45)]"
    >
      {children}
    </a>
  );
}

export function FooterSection() {
  return (
    <footer
      id="footer"
      className="border-t border-white/10 bg-black py-16 text-zinc-400"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={getAssetPath("/Logo-from-the-back.png")}
              alt="Afara Top Team"
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 object-contain"
            />
            <p className="font-[family-name:var(--font-display)] text-2xl leading-tight tracking-wide text-white">
              Afara <span className="text-[#ffc200]">Top Team</span>
            </p>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            Afara Top Team — striking, wrestling, and hybrid training. Train
            sharp. Recover smarter.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
            Programs
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {business.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {company.map((l) => (
              <li key={l.label}>
                {l.href.startsWith("/") ? (
                  <Link href={l.href} className="transition hover:text-white">
                    {l.label}
                  </Link>
                ) : (
                  <a href={l.href} className="transition hover:text-white">
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
            Social
          </h3>
          <div className="mt-4 flex gap-3">
            <SocialIcon label="Instagram">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM17.5 6.3a1.2 1.2 0 1 1-1.2 1.2 1.2 1.2 0 0 1 1.2-1.2z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="X">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M18.22 3h3.43l-7.5 8.57L22 21h-6.87l-5.36-6.26L5.73 21H2.28l8.02-9.15L2 3h7.03l4.85 5.66L18.22 3zm-1.2 16.2h1.9L7.1 4.68H5.02l11.99 14.52z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="YouTube">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M23.5 7.2s-.23-1.66-.95-2.39c-.9-.95-1.9-.95-2.37-1C17 3 12 3 12 3h0s-5 0-8.18.41c-.46.05-1.47.05-2.37 1C.73 5.54.5 7.2.5 7.2S.12 9.11.12 11.01v1.96c0 1.9.38 3.81.38 3.81s.23 1.66.95 2.39c.9.95 2.08.92 2.61 1.02 1.9.18 8.05.42 8.05.42s5-.01 8.18-.43c.47-.06 1.47-.06 2.37-1 .72-.73.95-2.39.95-2.39s.38-1.9.38-3.81v-1.96c0-1.9-.38-3.81-.38-3.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
              </svg>
            </SocialIcon>
          </div>
          <p className="mt-6 text-xs text-zinc-600">
            © {new Date().getFullYear()} Afara Top Team. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
