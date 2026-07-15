import "./page.css";
import type { Metadata } from "next";
import DifferenceOver10YearsOfClinicalExcellence from "@/components/pages/DifferenceOver10YearsOfClinicalExcellence";

export const metadata: Metadata = {
  title: "Over 10 Years Of Clinical Excellence - District Behavioral Health",
  description: "",
  alternates: { canonical: "https://districtbehavioralhealth.com/difference/over-10-years-of-clinical-excellence/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return <DifferenceOver10YearsOfClinicalExcellence />;
}
