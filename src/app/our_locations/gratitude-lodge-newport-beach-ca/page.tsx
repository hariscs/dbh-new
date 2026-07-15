import "./page.css";
import type { Metadata } from "next";
import OurLocationsGratitudeLodgeNewportBeachCa from "@/components/pages/OurLocationsGratitudeLodgeNewportBeachCa";

export const metadata: Metadata = {
  title: "Gratitude Lodge - Newport Beach, CA - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/our_locations/gratitude-lodge-newport-beach-ca/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return <OurLocationsGratitudeLodgeNewportBeachCa />;
}
