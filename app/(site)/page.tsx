import { HeroSection } from "@/components/sections/HeroSection";
import { VisionSection } from "@/components/sections/VisionSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ClassesSection } from "@/components/sections/ClassesSection";
import { LocationsSection } from "@/components/sections/LocationsSection";
import type { ScheduleWeek } from "@/components/sections/ScheduleMatrix";
import { FighterSection } from "@/components/sections/FighterSection";
import { FighterSectionStrip } from "@/components/sections/FighterSectionStrip";
import { DojoGallerySection } from "@/components/sections/DojoGallerySection";
import { getLocationsWithCoaches } from "@/lib/locations";
import { getSiteData } from "@/lib/site-data";
import { pexelsUrl } from "@/lib/pexels-url";

export default function HomePage() {
  const site = getSiteData();
  const heroCards = site.classes.map((c) => ({
    eyebrow: c.heroCard.eyebrow,
    line1: c.heroCard.line1,
    line2: c.heroCard.line2,
    href: `/classes/${c.id}`,
    src: c.imageLocalPath ?? pexelsUrl(c.imagePexelsId, 900),
  }));

  const homePrograms = site.classes
    .filter((c) => c.featuredHome)
    .map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      imageSrc: c.imageLocalPath ?? pexelsUrl(c.imagePexelsId, 1400),
      imageAlt: `${c.title} — ${c.subtitle}`,
      monthlyFrom: c.monthlyFrom ?? "—",
      badges: c.cardBadges ?? [],
    }));

  const galleryItems = site.gallery.map((g) => ({
    src: pexelsUrl(g.pexelsId, 1200),
    alt: g.alt,
  }));

  const fighters = site.fighters.map((f) => ({
    id: (f as any).id,
    name: f.name,
    discipline: f.discipline,
    image: f.imageLocalPath ?? pexelsUrl((f as any).imagePexelsId, 900),
    alt: f.name,
    number: (f as any).number ?? "00",
  }));

  const locationsWithCoaches = getLocationsWithCoaches(site);
  const scheduleRecord = site.schedule as Record<string, ScheduleWeek>;
  const locationsConfig = site.locationsSection;

  return (
    <>
      <HeroSection
        videoSrc={site.hero.videoSrc}
        posterSrc={pexelsUrl(site.hero.posterImageId, 1920)}
        cards={heroCards}
      />
      <VisionSection variant="home" />
      <FighterSection fighters={fighters} />
      <AboutSection variant="home" />

      <LocationsSection
        variant="home"
        locations={locationsWithCoaches}
        scheduleByLocationId={scheduleRecord}
        sharedVideoSrc={locationsConfig.sharedVideoSrc}
        posterSrc={pexelsUrl(locationsConfig.posterImageId, 1920)}
        heading={locationsConfig.heading}
        description={locationsConfig.description}
      />

      {/* <ClassesSection
        heading={site.home.classesHeading}
        subtitle={site.home.classesSubtitle}
        programs={homePrograms}
        viewAllHref="/classes"
      /> */}
      <ClassesSection
        sectionId="classes-classic-cards"
        headingId="classes-classic-cards-heading"
        heading={site.home.classesHeading}
        subtitle={site.home.classesSubtitle}
        programs={homePrograms}
        viewAllHref="/classes"
        showSlideIndicator={false}
        cardVariant="classic"
        className="pt-10 pb-20 sm:pt-12 sm:pb-28"
      />
      <DojoGallerySection images={galleryItems} />
      
      <FighterSectionStrip fighters={fighters} />
    </>
  );
}
