import "./page.css";
import type { Metadata } from "next";
import PrivacyPolicy from "@/components/pages/PrivacyPolicy";
import Header from "@/components/Header";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata(): Promise<import("next").Metadata> {
  const data = await fetchPageData("privacy-policy");
  return {
    title: data?.seo.title || "Privacy Policy | District Behavioral Health",
    description: data?.seo.description || "While you wait, explore our facilities, see what your care experience will look like, and learn what happens next.",
    ...(data?.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data?.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page() {
  const data = await fetchPageData("privacy-policy");
  return (
    <>
      <Header fields={data?.fields} />
      <PrivacyPolicy fields={data?.fields ?? {}} />
    </>
  );
}
