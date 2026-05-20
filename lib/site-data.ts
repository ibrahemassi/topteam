import siteJson from "@/data/site.json";

export type SiteJson = typeof siteJson;

export function getSiteData(): SiteJson {
  return siteJson;
}
