import "./page.css";
import type { Metadata } from "next";
import OurLocationsCaliforniaDetoxOrangeCountyCa from "@/components/pages/OurLocationsCaliforniaDetoxOrangeCountyCa";

export const metadata: Metadata = {
  title: "California Detox - Orange County, CA - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/our_locations/california-detox-orange-county-ca/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return <OurLocationsCaliforniaDetoxOrangeCountyCa />;
}
