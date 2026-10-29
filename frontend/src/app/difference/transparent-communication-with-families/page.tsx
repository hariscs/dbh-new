import "./page.css";
import type { Metadata } from "next";
import DifferenceTransparentCommunicationWithFamilies from "@/components/pages/DifferenceTransparentCommunicationWithFamilies";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Transparent Communication With Families - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/difference/transparent-communication-with-families/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return (
    <>
      <Header />
      <DifferenceTransparentCommunicationWithFamilies />
    </>
  );
}
