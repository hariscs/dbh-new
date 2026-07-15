import "./page.css";
import type { Metadata } from "next";
import DifferenceNationallyAccreditedFacilities from "@/components/pages/DifferenceNationallyAccreditedFacilities";

export const metadata: Metadata = {
  title: "Nationally Accredited Facilities - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/difference/nationally-accredited-facilities/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return <DifferenceNationallyAccreditedFacilities />;
}
