import "./page.css";
import type { Metadata } from "next";
import OurLocationsGratitudeLodgeOrangeCountyCa from "@/components/pages/OurLocationsGratitudeLodgeOrangeCountyCa";

export const metadata: Metadata = {
  title: "Gratitude Lodge - Orange County, CA - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/our_locations/gratitude-lodge-orange-county-ca/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return <OurLocationsGratitudeLodgeOrangeCountyCa />;
}
