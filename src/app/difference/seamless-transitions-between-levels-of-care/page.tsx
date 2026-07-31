import "./page.css";
import type { Metadata } from "next";
import DifferenceSeamlessTransitionsBetweenLevelsOfCare from "@/components/pages/DifferenceSeamlessTransitionsBetweenLevelsOfCare";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Seamless Transitions Between Levels Of Care - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/difference/seamless-transitions-between-levels-of-care/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return (
    <>
      <Header />
      <DifferenceSeamlessTransitionsBetweenLevelsOfCare />
    </>
  );
}
