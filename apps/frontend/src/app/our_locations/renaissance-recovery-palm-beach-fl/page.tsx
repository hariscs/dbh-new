import "./page.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OurLocationsRenaissanceRecoveryPalmBeachFl from "@/components/pages/OurLocationsRenaissanceRecoveryPalmBeachFl";
import Header from "@/components/Header";
import { fetchPageData } from "@/lib/wordpress";

export const revalidate = 60;

const PATH = "our_locations/renaissance-recovery-palm-beach-fl";

export const metadata: Metadata = {
  title: "Renaissance Recovery Palm Beach, FL - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/our_locations/renaissance-recovery-palm-beach-fl/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default async function Page() {
  const data = await fetchPageData(PATH);
  if (!data) notFound();

  return (
    <>
      <Header />
      <OurLocationsRenaissanceRecoveryPalmBeachFl />
    </>
  );
}
