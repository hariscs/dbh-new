/**
 * The call-us number shown in the header and in on-page call CTAs.
 *
 * WordPress supplies it per page through the builder fields:
 *   `phone`      -> what the visitor reads, e.g. "888-707-6073"
 *   `tel_phone`  -> the href, already carrying the "tel:" prefix, e.g. "tel:888-707-6073"
 *
 * It genuinely varies by page (e.g. /contact-us and /location-served/usa use
 * 866-330-9449), and some pages carry neither field, so every consumer must go
 * through `resolvePhone` rather than reading the fields directly.
 */

export const FALLBACK_PHONE = "888-707-6073";
export const FALLBACK_TEL_HREF = "tel:888-707-6073";

export type ResolvedPhone = {
  /** display text */
  phone: string;
  /** href value, including the "tel:" prefix */
  telHref: string;
};

/**
 * Resolve the number for a page, falling back when a field is absent or blank.
 * `tel_phone` already includes the "tel:" prefix, so it is used verbatim.
 */
export function resolvePhone(fields?: Record<string, string> | null): ResolvedPhone {
  const phone = fields?.phone?.trim();
  const telHref = fields?.tel_phone?.trim();
  return {
    phone: phone || FALLBACK_PHONE,
    telHref: telHref || FALLBACK_TEL_HREF,
  };
}
