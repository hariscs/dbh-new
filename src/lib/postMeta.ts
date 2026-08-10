/**
 * The byline strip above the hero on the blog templates: a category pill, a "|", and the
 * publish date.
 *
 * Both halves come from the builder page-data endpoint and either can be absent — the
 * fields are optional in WordPress and a fair number of pages carry neither — so each
 * resolver returns "" rather than a placeholder and the caller drops the widget. That is
 * why these live here instead of inline: the same three widgets are duplicated across the
 * 14 generated Elementor templates that use this strip.
 */

/**
 * `meta.createdAt` rendered as "February 20, 2026", or "" when it is missing or unparseable.
 *
 * The endpoint sends a date-only string ("2026-02-20"), which `Date` parses as UTC
 * midnight. Formatting in UTC keeps the calendar date matching WordPress instead of
 * slipping to the previous day wherever the renderer runs west of UTC.
 */
export function formatPostDate(createdAt?: string): string {
  if (!createdAt?.trim()) return "";
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * The category label: the `topic` and `topic-2` fields joined with a space, e.g.
 * "Alumni Rehab". Whichever one is present is used, so a page with only `topic` still
 * gets a pill; "" means neither was returned and the pill should not render.
 *
 * Note these are the taxonomy-slug fields, distinct from the `topic_1`/`topic_2` ACF
 * fields the templates interpolate into headings.
 */
export function formatPostCategory(fields?: Record<string, string> | null): string {
  return [fields?.topic, fields?.["topic-2"]]
    .map((part) => part?.trim() ?? "")
    .filter(Boolean)
    .join(" ");
}
