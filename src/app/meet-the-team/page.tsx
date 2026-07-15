import "./page.css";
import type { Metadata } from "next";
import MeetTheTeam from "@/components/pages/MeetTheTeam";

export const metadata: Metadata = {
  title: "| District Behavioral Health",
  description: "Our Team Compassionate care, delivered by experienced professionals. Executive Team Clinical Team Therapists Case Managers Operations Writers Admissions Admin",
  alternates: { canonical: "https://districtbehavioralhealth.com/meet-the-team/" },
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
};

export default function Page() {
  return <MeetTheTeam />;
}
