import "./page.css";
import type { Metadata } from "next";
import OurLocationsAllianceRecoveryLosAngelesCa from "@/components/pages/OurLocationsAllianceRecoveryLosAngelesCa";

export const metadata: Metadata = {
  title: "Alliance Recovery - Los Angeles, CA - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/our_locations/alliance-recovery-los-angeles-ca/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return <OurLocationsAllianceRecoveryLosAngelesCa />;
}
