"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { getAssetPath } from "@/lib/assets";

const links = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/about", label: "About", match: (p: string) => p === "/about" },
  {
    href: "/classes",
    label: "Classes",
    match: (p: string) => p.startsWith("/classes"),
  },
  { href: "/coaches", label: "Coaches", match: (p: string) => p === "/coaches" },
  {
    href: "/fighters",
    label: "Fighters",
    match: (p: string) => p === "/fighters",
  },
  {
    href: "/locations",
    label: "Locations",
    match: (p: string) => p === "/locations",
  },
  {
    href: "/blog",
    label: "Blog",
    match: (p: string) => p.startsWith("/blog"),
  },
  {
    href: "/#dojo-gallery",
    label: "Gallery",
    match: () => false,
  },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navInnerRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = navInnerRef.current;
    if (!el) return;
    const set = () => {
      document.documentElement.style.setProperty(
        "--nav-height",
        `${el.offsetHeight}px`,
      );
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) closeMenu();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMenu]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-500 ease-out",
          scrolled || menuOpen
            ? "border-b border-[#1f00ff]/40 bg-white/10 backdrop-blur-md shadow-[0_6px_32px_rgba(31,0,255,0.55),0_1px_0_rgba(255,255,255,0.08)_inset]"
            : "border-b border-transparent bg-transparent shadow-none",
        )}
      >
        <nav
          ref={navInnerRef}
          className="flex w-full items-center justify-between gap-3 py-3.5 pl-2 pr-4 sm:pl-3 sm:pr-6 lg:grid lg:grid-cols-3 lg:items-center lg:gap-4 lg:py-4 lg:pl-6 lg:pr-8"
          aria-label="Primary"
        >
          <div className="flex shrink-0 justify-self-start lg:pl-0">
            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label="Afara Top Team — Home"
              onClick={closeMenu}
            >
              <Image
                src={getAssetPath("/Logo-from-the-back.png")}
                alt=""
                width={192}
                height={192}
                className="h-14 w-14 object-contain sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                priority
              />
            </Link>
          </div>

          <div className="hidden min-w-0 justify-center overflow-x-auto lg:flex lg:w-full [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            <ul className="flex flex-nowrap items-center justify-center gap-3 text-[10px] font-medium uppercase tracking-wider text-zinc-300 lg:gap-4 xl:gap-5 xl:text-xs xl:tracking-widest 2xl:text-sm 2xl:gap-6">
              {links.map((l) => {
                const active = l.match(pathname);
                return (
                  <li key={`${l.href}-${l.label}`} className="shrink-0">
                    <Link
                      href={l.href}
                      className={cn(
                        "whitespace-nowrap border-b pb-0.5 transition-colors",
                        active
                          ? "border-[#1f00ff] text-white"
                          : "border-transparent hover:border-[#1f00ff]/60 hover:text-white",
                      )}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3 justify-self-end lg:pr-0">
            <Link
              href="/#hero-cta"
              className="hidden rounded border border-[#1f00ff]/60 bg-[#1f00ff]/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_18px_rgba(31,0,255,0.45)] transition hover:bg-[#1f00ff]/35 lg:inline-flex"
            >
              Free session
            </Link>
            <Link
              href="/#hero-cta"
              className="rounded border border-[#1f00ff]/60 bg-[#1f00ff]/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-white shadow-[0_0_14px_rgba(31,0,255,0.4)] transition hover:bg-[#1f00ff]/35 sm:px-4 sm:text-xs lg:hidden"
              onClick={closeMenu}
            >
              Free session
            </Link>
            <button
              type="button"
              id="nav-burger"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={toggleMenu}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white transition hover:border-[#1f00ff]/50 hover:bg-white/5 lg:hidden"
            >
              <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                aria-hidden
              >
                {menuOpen ? (
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-[45] bg-black/55 backdrop-blur-sm transition-opacity duration-200 lg:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ top: "var(--nav-height, 4rem)" }}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "fixed inset-x-0 bottom-0 z-[46] max-h-[calc(100dvh-var(--nav-height,4rem))] overflow-y-auto border-b border-[#1f00ff]/30 bg-[#050508]/97 shadow-[0_24px_48px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-[transform,opacity,visibility] duration-200 ease-out lg:hidden",
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0 pointer-events-none",
        )}
        style={{ top: "var(--nav-height, 4rem)" }}
      >
        <ul className="flex flex-col px-4 py-4 sm:px-6">
          {links.map((l) => {
            const active = l.match(pathname);
            return (
              <li
                key={`m-${l.href}-${l.label}`}
                className="border-b border-white/10 last:border-b-0"
              >
                <Link
                  href={l.href}
                  className={cn(
                    "block py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-colors hover:text-white active:text-[#ffc200]",
                    active ? "text-[#ffc200]" : "text-zinc-200",
                  )}
                  onClick={closeMenu}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
