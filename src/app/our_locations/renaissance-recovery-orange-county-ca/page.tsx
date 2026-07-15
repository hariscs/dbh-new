import "./page.css";
import type { Metadata } from "next";
import OurLocationsRenaissanceRecoveryOrangeCountyCa from "@/components/pages/OurLocationsRenaissanceRecoveryOrangeCountyCa";

export const metadata: Metadata = {
  title: "Renaissance Recovery Orange County, CA - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/our_locations/renaissance-recovery-orange-county-ca/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return <OurLocationsRenaissanceRecoveryOrangeCountyCa />;
}
