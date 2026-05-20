import type { Metadata } from "next";
import { GlassPanel } from "@/components/GlassPanel";
import { getSiteData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Locations — Afara Top Team",
  description: "Dojo addresses, contacts, and how to reach each bay.",
};

export default function LocationsPage() {
  const site = getSiteData();

  return (
    <>
      <div className="bg-black pb-12 pt-28 lg:pt-32">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffc200]">
            Visit Afara Top Team
          </p>
          <h1 className="font-[family-name:var(--font-display)] mt-4 text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl">
            Locations
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Four bays across Saida, Barja, Kfarhata, and Ketermaya. Same coaching
            standard, localized timetables. Pick up day passes at the desk or freeze
            memberships between travel blocks.
          </p>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {site.locations.map((loc) => (
              <li key={loc.id}>
                <GlassPanel className="flex h-full flex-col rounded-2xl p-6">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl text-white">
                    {loc.name}
                  </h2>
                  <address className="mt-4 text-sm not-italic leading-relaxed text-zinc-400">
                    {loc.addressLine1}
                    <br />
                    {loc.city}, {loc.region} {loc.postalCode}
                  </address>
                  <p className="mt-4 text-sm text-zinc-500">
                    <a
                      href={`tel:${loc.phone.replace(/\s/g, "")}`}
                      className="text-[#ffc200] underline-offset-4 hover:underline"
                    >
                      {loc.phone}
                    </a>
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">
                    <a
                      href={`mailto:${loc.email}`}
                      className="underline-offset-4 hover:text-white hover:underline"
                    >
                      {loc.email}
                    </a>
                  </p>
                </GlassPanel>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
