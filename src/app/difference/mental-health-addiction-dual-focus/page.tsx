import "./page.css";
import type { Metadata } from "next";
import DifferenceMentalHealthAddictionDualFocus from "@/components/pages/DifferenceMentalHealthAddictionDualFocus";

export const metadata: Metadata = {
  title: "Mental Health & Addiction Dual Focus - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/difference/mental-health-addiction-dual-focus/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return <DifferenceMentalHealthAddictionDualFocus />;
}
