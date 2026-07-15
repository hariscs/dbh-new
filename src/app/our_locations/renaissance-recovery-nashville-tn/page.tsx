import "./page.css";
import type { Metadata } from "next";
import OurLocationsRenaissanceRecoveryNashvilleTn from "@/components/pages/OurLocationsRenaissanceRecoveryNashvilleTn";

export const metadata: Metadata = {
  title: "Renaissance Recovery Nashville, TN - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/our_locations/renaissance-recovery-nashville-tn/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return <OurLocationsRenaissanceRecoveryNashvilleTn />;
}
