import "./page.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OurLocationsGratitudeLodgeLosAngelesCa from "@/components/pages/OurLocationsGratitudeLodgeLosAngelesCa";
import Header from "@/components/Header";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;

const PATH = "our_locations/gratitude-lodge-los-angeles-ca";

export const metadata: Metadata = {
  title: "Gratitude Lodge - Los Angeles, CA - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/our_locations/gratitude-lodge-los-angeles-ca/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default async function Page() {
  const data = await fetchPageData(PATH);
  if (!data) notFound();

  return (
    <>
      <Header />
      <OurLocationsGratitudeLodgeLosAngelesCa />
    </>
  );
}
