import "./page.css";
import type { Metadata } from "next";
import Home from "@/components/pages/Home";
import { fetchInterlinking } from "@/lib/wordpress";
import Header from "@/components/Header";

// the homepage is the WordPress page at path "home"
const INTERLINKING_PATH = "home";

export const metadata: Metadata = {
  title: "District Behavioral Health | Addiction & Mental Health Care",
  description:
    "District Behavioral Health offers evidence-based addiction and mental health treatment across the U.S., with confidential care from licensed clinicians.",
  alternates: { canonical: "https://districtbehavioralhealth.com/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default async function Page() {
  const relatedLinks = await fetchInterlinking(INTERLINKING_PATH);
  return (
    <>
      <Header />
      <Home relatedLinks={relatedLinks} />
    </>
  );
}
