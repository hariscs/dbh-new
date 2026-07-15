import "./page.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationServedUsaFlCentral from "@/components/templates/LocationServedUsaFlCentral";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;
export const dynamicParams = true;

const BASE_PATH = "location-served/usa/fl/central";

const FALLBACK_SLUGS = ["adhd","premenstrual-dysphoric-disorder","adjustment","borderline-personality-disorder","personality-disorder","neurodevelopment-disorder","virtual-iop","sober-living","drug-rehab","php-drug-rehab","iop-drug-rehab","outpatient-drug-rehab"] as string[];

export async function generateStaticParams() {
  const wpUrl = process.env.WORDPRESS_URL;
  if (!wpUrl) return FALLBACK_SLUGS.map((slug) => ({ slug }));
  try {
    const res = await fetch(
      `${wpUrl}/wp-json/builder/v1/pages?path=%2Flocation-served%2Fusa%2Ffl%2Fcentral`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return FALLBACK_SLUGS.map((slug) => ({ slug }));
    const pages = (await res.json()) as { slug: string }[];
    return pages.map((p) => ({ slug: p.slug }));
  } catch {
    return FALLBACK_SLUGS.map((slug) => ({ slug }));
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchPageData(`${BASE_PATH}/${slug}`);
  if (!data) return {};
  return {
    title: data.seo.title || undefined,
    description: data.seo.description || undefined,
    ...(data.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchPageData(`${BASE_PATH}/${slug}`);
  if (!data) notFound();
  return <LocationServedUsaFlCentral {...data.fields} />;
}
