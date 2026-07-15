import "./page.css";
import type { Metadata } from "next";
import RehabAdmission from "@/components/pages/RehabAdmission";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata(): Promise<import("next").Metadata> {
  const data = await fetchPageData("rehab-admission");
  return {
    title: data?.seo.title || "| District Behavioral Health",
    description: data?.seo.description || "At District Behavioral Health, our admissions counselors educate you or your loved one on how simple the admissions process can be. Our goal is to make the",
    ...(data?.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data?.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page() {
  const data = await fetchPageData("rehab-admission");
  return <RehabAdmission {...(data?.fields ?? {})} />;
}
