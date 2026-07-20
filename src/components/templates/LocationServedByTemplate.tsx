import LocationServedUsa from "./LocationServedUsa";
import LocationServedUsaAlcohol from "./LocationServedUsaAlcohol";

// Normalize a builder `fields.template` value so ordering/casing/spacing don't matter:
// "Blog, CRO1" and "CRO1, Blog" both become "blog|cro1".
const normalize = (template: string) =>
  template
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean)
    .sort()
    .join("|");

// Builder `fields.template` values that render with the LocationServedUsaAlcohol template
// (Elementor page 2841). Everything else falls back to LocationServedUsa (Elementor page 691),
// which is the template used by e.g. /location-served/usa/iop-drug-rehab — the page that
// returns "CRO1, National (Rehab)".
const ALCOHOL_TEMPLATES = new Set(["Blog, CRO1", "CRO1, Blog"].map(normalize));

/**
 * Renders the correct LocationServed template for a page based on its builder
 * `fields.template` value, so new pages are wired up automatically by their template
 * rather than by hardcoding one route file per slug.
 */
export default function LocationServedByTemplate({
  fields,
  createdAt,
}: {
  fields: Record<string, string>;
  createdAt?: string;
}) {
  if (ALCOHOL_TEMPLATES.has(normalize(fields.template ?? ""))) {
    return <LocationServedUsaAlcohol {...fields} createdAt={createdAt ?? ""} />;
  }
  return <LocationServedUsa {...fields} />;
}
