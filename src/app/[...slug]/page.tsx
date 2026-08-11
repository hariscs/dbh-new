// Renders whichever template the page's builder `fields.template` selects, so it needs the
// same stylesheets as the /location-served/usa catch-all. Each is scoped to its own Elementor
// page id (.elementor-691 / .elementor-2841 / .elementor-978), so they coexist.
import "../location-served/usa/[[...slug]]/page.css";
import "../location-served/usa/alcohol/[slug]/page.css";
import "../location-served/usa/[[...slug]]/cro2.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationServedByTemplate from "@/components/templates/LocationServedByTemplate";
import { fetchPageData, fetchInterlinking } from "@/lib/wordpress";
import Header from "@/components/Header";

export const revalidate = 60;
export const dynamicParams = true;

/**
 * Catch-all for builder pages that hang off the site root rather than a section.
 *
 * WordPress owns the URL structure, and a page with no parent lives at its own slug —
 * /klonopin-addiction-treatment/addiction, not /location-served/usa/... . Those paths
 * matched no route at all and 404ed even though `page-data` served them fine.
 *
 * This is a required catch-all (`[...slug]`, not `[[...slug]]`) so it does not collide
 * with app/page.tsx at "/". Next resolves static and more specific dynamic routes first,
 * so every existing section keeps its own route and only genuinely unmatched paths land
 * here. A path WordPress does not know still calls notFound(), so real 404s stay 404s.
 *
 * Nothing needs changing when editors add more parentless pages: they are discovered by
 * generateStaticParams at build time, and anything created between builds renders on
 * first request and is then ISR-cached.
 */

// Top-level segments that already have their own route directory under src/app. A page
// beneath one of these is served there, so prerendering it here would be duplicate work.
// If this drifts the only cost is prerendering — an unlisted page still renders on demand.
const ROUTED_SEGMENTS = new Set([
  "alumni-rehab-program", "api", "authors", "blogs", "bu-review-counts",
  "client-outcomes-page-dev", "contact-us", "difference", "elementor-656", "facility",
  "location-served", "meet-the-team", "newsroom", "our-facilities", "our_locations",
  "ppc", "privacy-policy", "quiz", "rehab-admission", "review-us", "thank-you",
]);

const segmentsOf = (link: string): string[] => {
  try {
    return new URL(link).pathname.split("/").filter(Boolean);
  } catch {
    return [];
  }
};

export async function generateStaticParams() {
  const wpUrl = process.env.WORDPRESS_URL;
  if (!wpUrl) return [];
  try {
    const params: { slug: string[] }[] = [];
    // wp/v2/pages caps out at 100 per request; the site is ~600 pages.
    for (let page = 1; page <= 10; page++) {
      const res = await fetch(
        `${wpUrl}/wp-json/wp/v2/pages?per_page=100&page=${page}&_fields=link`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) break;
      const batch = (await res.json()) as Array<{ link?: string }>;
      if (!Array.isArray(batch) || batch.length === 0) break;
      for (const p of batch) {
        const slug = segmentsOf(p.link ?? "");
        if (slug.length && !ROUTED_SEGMENTS.has(slug[0])) params.push({ slug });
      }
      if (batch.length < 100) break;
    }
    return params;
  } catch {
    // Prerender nothing rather than fail the build; dynamicParams still serves these.
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchPageData(slug.join("/"));
  if (!data) return {};
  return {
    title: data.seo.title || undefined,
    description: data.seo.description || undefined,
    ...(data.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const wpPath = slug.join("/");
  const [data, relatedLinks] = await Promise.all([
    fetchPageData(wpPath),
    fetchInterlinking(wpPath),
  ]);
  if (!data) notFound();
  return (
    <>
      <Header fields={data.fields} />
      <LocationServedByTemplate
        fields={data.fields}
        createdAt={data.meta.createdAt}
        relatedLinks={relatedLinks}
      />
    </>
  );
}
