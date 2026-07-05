import type { Metadata } from "next";
import { LocationsSection } from "@/components/sections/LocationsSection";
import type { ScheduleWeek } from "@/components/sections/ScheduleMatrix";
import { getLocationsWithCoaches } from "@/lib/locations";
import { getSiteData } from "@/lib/site-data";
import { pexelsUrl } from "@/lib/pexels-url";

export const metadata: Metadata = {
  title: "Locations — Afara Top Team",
  description: "Dojo addresses, contacts, coaches, and weekly timetables for every bay.",
};

export default function LocationsPage() {
  const site = getSiteData();
  const locationsWithCoaches = getLocationsWithCoaches(site);
  const scheduleRecord = site.schedule as Record<string, ScheduleWeek>;
  const locationsConfig = site.locationsSection;

  return (
    <>
      <div className="bg-black pt-28 lg:pt-32">
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
        </div>
      </div>

      <LocationsSection
        variant="page"
        locations={locationsWithCoaches}
        scheduleByLocationId={scheduleRecord}
        sharedVideoSrc={locationsConfig.sharedVideoSrc}
        posterSrc={pexelsUrl(locationsConfig.posterImageId, 1920)}
      />
    </>
  );
}
