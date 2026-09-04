import "./page.css";
import type { Metadata } from "next";
import PrivacyPolicy from "@/components/pages/PrivacyPolicy";
import Header from "@/components/Header";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;

const DEFAULT_TITLE = "Terms of Service | District Behavioral Health";

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchPageData("terms-of-service");
  const title = data?.seo.title.replace(/\s*\|\s*$/, "") || "";
  return {
    title: title ? `${title} | District Behavioral Health` : DEFAULT_TITLE,
    description: data?.seo.description || "The terms and conditions that govern your use of the District Behavioral Health website and services.",
    ...(data?.seo.canonical ? { alternates: { canonical: data.seo.canonical } } : {}),
    ...(data?.seo.robots ? { robots: data.seo.robots } : {}),
  };
}

export default async function Page() {
  const data = await fetchPageData("terms-of-service");
  return (
    <>
      <Header fields={data?.fields} />
      <PrivacyPolicy fields={data?.fields ?? {}} heading="Terms of Service" />
    </>
  );
}
