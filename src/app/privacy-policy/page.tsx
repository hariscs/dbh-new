import "./page.css";
import type { Metadata } from "next";
import PrivacyPolicy from "@/components/pages/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Thank You Page | District Behavioral Health",
  description: "Thank you for your interest in and our privacy practices. Our commitment to the privacy of our clients guides our practices as we provide information,",
  alternates: { canonical: "https://districtbehavioralhealth.com/privacy-policy/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return <PrivacyPolicy />;
}
