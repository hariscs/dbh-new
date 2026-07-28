import "./page.css";
import type { Metadata } from "next";
import Home from "@/components/pages/Home";
import { fetchInterlinking } from "@/lib/wordpress";

// the homepage is the WordPress page at path "home"
const INTERLINKING_PATH = "home";

export const metadata: Metadata = {
  title: "District Behavioral Health | Substance Abuse & Mental Health Treatment",
  description: "Transforming Lives Across the U.S. for Over a Decade",
  alternates: { canonical: "https://districtbehavioralhealth.com/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default async function Page() {
  const relatedLinks = await fetchInterlinking(INTERLINKING_PATH);
  return <Home relatedLinks={relatedLinks} />;
}
