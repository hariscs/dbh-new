import "./page.css";
import type { Metadata } from "next";
import OurLocationsRenaissanceRecoveryPalmBeachFl from "@/components/pages/OurLocationsRenaissanceRecoveryPalmBeachFl";

export const metadata: Metadata = {
  title: "Renaissance Recovery Palm Beach, FL - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/our_locations/renaissance-recovery-palm-beach-fl/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return <OurLocationsRenaissanceRecoveryPalmBeachFl />;
}
