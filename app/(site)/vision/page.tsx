import type { Metadata } from "next";
import { VisionSection } from "@/components/sections/VisionSection";
import { getSiteData } from "@/lib/site-data";

const site = getSiteData();

export const metadata: Metadata = {
  title: site.vision.pageMetaTitle,
  description:
    "Top Team Academy — a legacy built through martial arts, human development through sport, and community impact across Lebanon.",
};

export default function VisionPage() {
  return <VisionSection variant="page" />;
}
