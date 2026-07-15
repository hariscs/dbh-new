import "./page.css";
import type { Metadata } from "next";
import OurLocationsConnectionsMentalHealth from "@/components/pages/OurLocationsConnectionsMentalHealth";

export const metadata: Metadata = {
  title: "Connections Mental Health - Orange County, CA - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/our_locations/connections-mental-health/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return <OurLocationsConnectionsMentalHealth />;
}
