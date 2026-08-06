import type { ReactElement } from "react";
import LocationServedUsa from "./LocationServedUsa";
import LocationServedUsaAlcohol from "./LocationServedUsaAlcohol";
import LocationServedNationalCro1 from "./LocationServedNationalCro1";
import LocationServedNationalCro2 from "./LocationServedNationalCro2";
import type { RelatedCard } from "@/components/RelatedLinks";

// Normalize a builder `fields.template` value so ordering/casing/spacing don't matter:
// "Blog, CRO1" and "CRO1, Blog" both become "blog|cro1".
const normalize = (template: string) =>
  template
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean)
    .sort()
    .join("|");

type TemplateContext = {
  fields: Record<string, string>;
  createdAt?: string;
  relatedLinks?: RelatedCard[] | null;
};

/**
 * The registry: builder template value -> the component that renders it.
 *
 * `fields.template` mirrors a WordPress custom taxonomy, so the values are a closed set
 * maintained in the builder rather than free text. Keys here are normalize()d, which is why
 * term order does not matter. Adding a template later is one entry plus one component.
 *
 * Each entry is a render function rather than a bare component because the templates do not
 * share a prop shape — LocationServedUsaAlcohol spreads the fields and wants `createdAt`,
 * the others take `fields` as a single prop.
 *
 * Distribution across the 107 pages under /location-served/usa (builder `terms.template`):
 *   cro1-national-rehab   47   -> LocationServedUsa            (Elementor 691)
 *   blog,cro1             29   -> LocationServedUsaAlcohol     (Elementor 2841)
 *   cro2-national-rehab   15   -> LocationServedNationalCro2   (Elementor 978)
 *   (no template term)    15   -> redirect stubs + the hub; see the fallback note below
 *   cro1-geo               1   -> the tn hub; see below
 */
const TEMPLATES: Record<string, (ctx: TemplateContext) => ReactElement> = {
  // "CRO1, National (Rehab)" — sober-living, drug-rehab, iop-drug-rehab, ...
  "cro1|national (rehab)": ({ fields, relatedLinks }) => (
    <LocationServedNationalCro1 fields={fields} relatedLinks={relatedLinks} />
  ),
  // "Blog, CRO1" — this template's section is "Related Blogs", which stays hardcoded
  "blog|cro1": ({ fields, createdAt }) => (
    <LocationServedUsaAlcohol {...fields} createdAt={createdAt ?? ""} />
  ),
  // "CRO2, National (Rehab)" — anxiety, depression, ptsd, mat-therapy, ...
  "cro2|national (rehab)": ({ fields, relatedLinks }) => (
    <LocationServedNationalCro2 fields={fields} relatedLinks={relatedLinks} />
  ),
};

/**
 * Renders the correct LocationServed template for a page based on its builder
 * `fields.template` value, so new pages are wired up by their template rather than by
 * hardcoding one route file per slug.
 *
 * Unmapped values fall back to LocationServedUsa. Two known cases reach that path today:
 *   - "CRO1, GEO", which has no single component yet (22 near-identical per-geo templates)
 *   - pages with no template term at all, which are redirect stubs and the /usa hub
 * Both warn in development so a genuinely new taxonomy value is visible rather than silently
 * rendering as CRO1 National.
 */
export default function LocationServedByTemplate({
  fields,
  createdAt,
  relatedLinks,
}: TemplateContext) {
  const key = normalize(fields.template ?? "");
  const render = TEMPLATES[key];

  if (render) return render({ fields, createdAt, relatedLinks });

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[LocationServedByTemplate] no template registered for ${JSON.stringify(
        fields.template ?? ""
      )} (normalized: "${key}") — falling back to LocationServedUsa.`
    );
  }
  return <LocationServedUsa fields={fields} relatedLinks={relatedLinks} />;
}
