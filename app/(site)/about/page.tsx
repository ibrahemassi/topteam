import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { getSiteData } from "@/lib/site-data";

const site = getSiteData();

export const metadata: Metadata = {
  title: site.about.pageMetaTitle,
  description: site.about.lead,
};

export default function AboutPage() {
  return <AboutSection variant="page" />;
}
