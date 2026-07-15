import "./page.css";
import type { Metadata } from "next";
import Home from "@/components/pages/Home";

export const metadata: Metadata = {
  title: "District Behavioral Health | Substance Abuse & Mental Health Treatment",
  description: "Transforming Lives Across the U.S. for Over a Decade",
  alternates: { canonical: "https://districtbehavioralhealth.com/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return <Home />;
}
