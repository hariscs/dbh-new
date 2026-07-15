import "./page.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationServedUsa from "@/components/templates/LocationServedUsa";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;
export const dynamicParams = true;

const FALLBACK_SLUGS = ["cpt","ca","adhd","premenstrual-dysphoric-disorder","adjustment","borderline-personality-disorder","personality-disorder","neurodevelopment-disorder","virtual-iop","sober-living","drug-rehab","php-drug-rehab","iop-drug-rehab","outpatient-drug-rehab","clonazepam-addiction-treatment","clonidine-addiction-treatment","codeine-addiction-treatment","buprenorphine-addiction-treatment","buspar-addiction-treatment","butalbital-addiction-treatment","bath-salts-addiction-treatment","amphetamines-addiction-treatment","ativan-addiction-treatment","ambien-addiction-treatment","opioids-addiction-treatment","heroin-addiction-treatment","addiction","lgbtq-drug-rehab","pet-friendly-rehab","couples-rehab","nitazene-addiction-treatment","ketamine-addiction-treatment","xanax-addiction-treatment","benzo-addiction-treatment","fentanyl-addiction-treatment","marijuana-addiction-treatment","kratom-addiction-treatment","cocaine-addiction-treatment","meth-addiction-treatment","emdr-therapy","dbt-therapy","cbt-therapy","mat-therapy","dual-diagnosis-treatment","psycho-dynamic","dissociative-identity","social","antisocial-personality","family","motivational","act","ifs","panic-disorder","trauma","schizophrenia","schizoaffective-disorder","depression","anxiety","ptsd","bipolar","obsessive-compulsive","mental-health","7-oh","residential-substance-use","intensive-inpatient","medical-detox","acute-stress-disorder","separation-anxiety-disorder","gad","crack-cocaine","alcohol-disorder","trauma-bonding","hyper-independence","roofie","track-marks","anavar-oxandrolone","dmt","diphenhydramine-benadryl","zoloft","lisdexamfetamine-vyvanse","e-404-orange-pill","mixing","e-341-round-pill","magic-mushrooms","vs","ativan-lorazepam","dopamine","poppers","lsd","dxm","alcohol","adderall-addiction-treatment"] as string[];

export async function generateStaticParams() {
  const wpUrl = process.env.WORDPRESS_URL;
  if (!wpUrl) return FALLBACK_SLUGS.map((slug) => ({ slug }));
  try {
    const res = await fetch(
      `${wpUrl}/wp-json/builder/v1/pages?path=%2Flocation-served%2Fusa`,
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
  const data = await fetchPageData(slug);
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
  const data = await fetchPageData(slug);
  if (!data) notFound();
  return <LocationServedUsa {...data.fields} />;
}
