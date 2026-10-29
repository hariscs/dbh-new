import type { MetadataRoute } from "next";
import { fetchAllPageLinks, SITE_URL } from "@/lib/wordpress";

export const revalidate = 3600;

// Conversion, paid-traffic, and internal dev pages stay out of organic discovery.
const EXCLUDED = ["/thank-you", "/ppc", "/client-outcomes-page-dev", "/elementor-656", "/bu-review-counts"];

// Served even when WordPress is unreachable, so the sitemap degrades instead of 500ing.
const STATIC_ROUTES = [
  "/",
  "/alumni-rehab-program",
  "/blogs",
  "/contact-us",
  "/location-served",
  "/meet-the-team",
  "/newsroom",
  "/our-facilities",
  "/privacy-policy",
  "/rehab-admission",
  "/reviews",
];

const isExcluded = (path: string) =>
  EXCLUDED.some((p) => path === p || path.startsWith(`${p}/`));

const normalize = (path: string) => {
  const clean = path.replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
};

const toUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}/`);

let lastGood: MetadataRoute.Sitemap | null = null;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links = await fetchAllPageLinks();
  if (!links) {
    return lastGood ?? STATIC_ROUTES.map((path) => ({ url: toUrl(path) }));
  }
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, updatedAt } of links) {
    const clean = normalize(path);
    if (seen.has(clean) || isExcluded(clean)) continue;
    seen.add(clean);
    entries.push({
      url: toUrl(clean),
      ...(updatedAt ? { lastModified: new Date(updatedAt) } : {}),
    });
  }

  for (const path of STATIC_ROUTES) {
    if (seen.has(path)) continue;
    seen.add(path);
    entries.push({ url: toUrl(path) });
  }

  lastGood = entries;
  return entries;
}
