import { getSiteData, type SiteJson } from "@/lib/site-data";

export type LocationCoach = {
  id: string;
  name: string;
  role: string;
  bio: string;
  disciplines: string[];
  imagePath: string;
  classLabel: string;
};

export type LocationWithCoach = Omit<
  SiteJson["locations"][number],
  "coaches"
> & {
  coaches: LocationCoach[];
};

export function getLocationsWithCoaches(
  site: SiteJson = getSiteData(),
): LocationWithCoach[] {
  const coachById = new Map(site.coaches.map((c) => [c.id, c]));

  return site.locations.map((loc) => {
    const coaches = loc.coaches
      .map((entry) => {
        const coach = coachById.get(entry.coachId);
        if (!coach) return null;
        return {
          id: coach.id,
          name: coach.name,
          role: coach.role,
          bio: coach.bio,
          disciplines: coach.disciplines,
          imagePath: entry.imagePath,
          classLabel:
            entry.classLabel ??
            coach.disciplines[0] ??
            coach.name.split(" ")[0],
        };
      })
      .filter((c): c is LocationCoach => c !== null);

    return { ...loc, coaches };
  });
}

export function getLocationsSectionConfig(site: SiteJson = getSiteData()) {
  return site.locationsSection;
}
