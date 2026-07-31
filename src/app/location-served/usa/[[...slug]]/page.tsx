import "./page.css";
// Also load the alcohol template's styles: this route renders either template depending on
// the page's builder `fields.template` (see LocationServedByTemplate). Both stylesheets are
// scoped to their own Elementor page id (.elementor-691 / .elementor-2841), so they coexist.
import "../alcohol/[slug]/page.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationServedByTemplate from "@/components/templates/LocationServedByTemplate";
import { fetchPageData, fetchInterlinking } from "@/lib/wordpress";
import Header from "@/components/Header";

export const revalidate = 60;
export const dynamicParams = true;

const BASE_PATH = "location-served/usa";

const FALLBACK_SLUGS = ["cpt","ca","adhd","premenstrual-dysphoric-disorder","adjustment","borderline-personality-disorder","personality-disorder","neurodevelopment-disorder","virtual-iop","sober-living","drug-rehab","php-drug-rehab","iop-drug-rehab","outpatient-drug-rehab","clonazepam-addiction-treatment","clonidine-addiction-treatment","codeine-addiction-treatment","buprenorphine-addiction-treatment","buspar-addiction-treatment","butalbital-addiction-treatment","bath-salts-addiction-treatment","amphetamines-addiction-treatment","ativan-addiction-treatment","ambien-addiction-treatment","opioids-addiction-treatment","heroin-addiction-treatment","addiction","lgbtq-drug-rehab","pet-friendly-rehab","couples-rehab","nitazene-addiction-treatment","ketamine-addiction-treatment","xanax-addiction-treatment","benzo-addiction-treatment","fentanyl-addiction-treatment","marijuana-addiction-treatment","kratom-addiction-treatment","cocaine-addiction-treatment","meth-addiction-treatment","emdr-therapy","dbt-therapy","cbt-therapy","mat-therapy","dual-diagnosis-treatment","psycho-dynamic","dissociative-identity","social","antisocial-personality","family","motivational","act","ifs","panic-disorder","trauma","schizophrenia","schizoaffective-disorder","depression","anxiety","ptsd","bipolar","obsessive-compulsive","mental-health","7-oh","residential-substance-use","intensive-inpatient","medical-detox","acute-stress-disorder","separation-anxiety-disorder","gad","crack-cocaine","alcohol-disorder","trauma-bonding","hyper-independence","roofie","track-marks","anavar-oxandrolone","dmt","diphenhydramine-benadryl","zoloft","lisdexamfetamine-vyvanse","e-404-orange-pill","mixing","e-341-round-pill","magic-mushrooms","vs","ativan-lorazepam","dopamine","poppers","lsd","dxm","alcohol","adderall-addiction-treatment"] as string[];

// Optional catch-all, so this one route serves every depth under /location-served/usa:
//   /location-served/usa                                   -> undefined
//   /location-served/usa/sober-living                      -> ["sober-living"]
//   /location-served/usa/pcp-addiction-treatment/addiction -> ["pcp-addiction-treatment", "addiction"]
// Topics with their own directory (ca, fl, tn, zoloft, alcohol, ...) still take priority;
// Next only falls through to here when no static route matches. Before this, the deeper
// form matched no route at all (~25 published pages 404ed) and so did the bare hub URL.
//
// Only the one-segment slugs are prerendered; the hub and deeper pages render on first
// request and are then ISR-cached. Note generateStaticParams still silently falls back to
// FALLBACK_SLUGS — builder/v1/pages returns { items, pagination }, not an array, so the
// .map() below throws. Fixing that needs pagination handling too; tracked separately.
export async function generateStaticParams() {
  const wpUrl = process.env.WORDPRESS_URL;
  if (!wpUrl) return FALLBACK_SLUGS.map((slug) => ({ slug: [slug] }));
  try {
    const res = await fetch(
      `${wpUrl}/wp-json/builder/v1/pages?path=%2Flocation-served%2Fusa`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return FALLBACK_SLUGS.map((slug) => ({ slug: [slug] }));
    const pages = (await res.json()) as { slug: string }[];
    return pages.map((p) => ({ slug: [p.slug] }));
  } catch {
    return FALLBACK_SLUGS.map((slug) => ({ slug: [slug] }));
  }
}

// `slug` is undefined for the bare hub URL (/location-served/usa), which maps to the
// builder page at BASE_PATH itself.
const toWpPath = (slug?: string[]) =>
  slug?.length ? `${BASE_PATH}/${slug.join("/")}` : BASE_PATH;

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchPageData(toWpPath(slug));
  if (!data) return {};
  return {
    title: data.seo.title || undefined,
    description: data.seo.description || undefined,
    ...(data.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const wpPath = toWpPath(slug);
  const [data, relatedLinks] = await Promise.all([
    fetchPageData(wpPath),
    fetchInterlinking(wpPath),
  ]);
  if (!data) notFound();
  return (
    <>
      <Header fields={data.fields} />
      <LocationServedByTemplate fields={data.fields} createdAt={data.meta.createdAt} relatedLinks={relatedLinks} />
    </>
  );
}
