"use client";

import { usePathname } from "next/navigation";

const SITE_URL = "https://districtbehavioralhealth.com";
const SITE_NAME = "District Behavioral Health";
const LOGO = `${SITE_URL}/images/27be6d13936a8bc6dbcfb656bcd95b80.webp`;
const PHONE = "+1-888-707-6073";

const toJson = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

const ABBREVIATION_LENGTH = 3;

const nameOf = (segment: string) =>
  segment.length <= ABBREVIATION_LENGTH
    ? segment.toUpperCase()
    : decodeURIComponent(segment)
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function SiteSchema() {
  const segments = (usePathname() ?? "/").split("/").filter(Boolean);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: LOGO,
      telephone: PHONE,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ];
  if (segments.length) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        ...segments.map((segment, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: nameOf(segment),
          item: `${SITE_URL}/${segments.slice(0, index + 1).join("/")}/`,
        })),
      ],
    });
  }
  return (
    <script
      dangerouslySetInnerHTML={{ __html: toJson({ "@context": "https://schema.org", "@graph": graph }) }}
      type="application/ld+json"
    />
  );
}
