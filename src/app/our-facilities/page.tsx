import "./page.css";
import type { Metadata } from "next";
import OurFacilities from "@/components/pages/OurFacilities";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata(): Promise<import("next").Metadata> {
  const data = await fetchPageData("our-facilities");
  return {
    title: data?.seo.title || "| District Behavioral Health",
    description: data?.seo.description || "Whether you’re seeking help for yourself or a loved one, our admissions team is available 24/7 to answer your questions and guide you toward the right care.",
    ...(data?.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data?.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page() {
  const data = await fetchPageData("our-facilities");
  return <OurFacilities {...(data?.fields ?? {})} />;
}
