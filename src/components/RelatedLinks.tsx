import React from 'react';
import Link from 'next/link';

/**
 * Shared "Related Pages" / "Related Blogs" interlinking section.
 *
 * The markup mirrors the original Elementor export byte for byte, because the
 * styling lives in the per-page CSS files and is keyed off the element ids
 * (`.elementor-1990 .elementor-element.elementor-element-1e2507e { ... }`).
 * The `.elementor-NNNN` scope comes from each template's own root wrapper, so
 * this component must be rendered in place and must keep emitting the same
 * class chain — pass the ids through rather than inventing new ones.
 *
 * Two shapes exist in the export:
 *  - `flat`   — `interlinking-section` wrapper, widgets directly in `e-con-inner`
 *  - `nested` — plain wrapper with two extra `e-con-child` containers
 *
 * Card reveal is driven by `WidgetInteractions.tsx`, which flips the inline
 * `display` of the hidden cards when `#relatedloadMoreBtn` is clicked.
 */

export type RelatedCard = {
  href: string;
  title: React.ReactNode;
};

/**
 * Props for a page template that renders a related-links section.
 *
 * `fields` is the builder field bag (what used to be spread directly onto the
 * template). It stays a separate prop rather than being spread alongside
 * `relatedLinks`, because a `Record<string, string>` bag cannot also carry an
 * array-valued prop.
 */
export type TemplateProps = {
  fields?: Record<string, string>;
  /** live interlinking cards; falls back to the template's hardcoded list when absent */
  relatedLinks?: RelatedCard[] | null;
};

export type RelatedLinksIds = {
  /** outer `e-con e-parent` section */
  section: string;
  /** heading widget */
  heading: string;
  /** shortcode widget holding the cards */
  shortcode: string;
  /** text-editor widget — `flat` variant, only when `description` is set */
  text?: string;
  /** outer `e-con e-child` — `nested` variant only */
  outerChild?: string;
  /** inner `e-con e-child` — `nested` variant only */
  innerChild?: string;
};

type RelatedLinksProps = {
  variant: 'flat' | 'nested';
  ids: RelatedLinksIds;
  heading: string;
  /**
   * A string is wrapped in `<p>`; any other node renders as-is (some pages feed
   * this from CMS props). Pass `null` rather than omitting it to keep the
   * text-editor widget in the DOM when the content itself is empty.
   */
  description?: React.ReactNode;
  cards: RelatedCard[];
  /** cards at or past this index render hidden until "Load More" is clicked */
  visibleCount?: number;
  /** `e-lazyloaded` is cosmetic export residue (never styled) but is preserved */
  lazyloaded?: boolean;
};

const GRADIENT = '{"background_background":"gradient"}';

function Cards({ cards, visibleCount }: { cards: RelatedCard[]; visibleCount: number }) {
  // An empty shortcode collapses the whole section via the
  // `.interlinking-section:has(.interlinking-shortcode__widget .elementor-shortcode:empty)` rule.
  if (cards.length === 0) {
    return <div className="elementor-shortcode"></div>;
  }

  return (
    <div className="elementor-shortcode">
      <div className="cards-wrapper">
        <div className="cards" role="list">
          {cards.map((card, i) => (
            <article
              className="card"
              role="listitem"
              style={{ display: i < visibleCount ? 'block' : 'none' }}
              key={`${card.href}-${i}`}
            >
              <Link href={card.href}>
                <h3>
                  {card.title}
                </h3>
              </Link>
            </article>
          ))}
        </div>
        <div id="button-wrapper">
          <button
            id="relatedloadMoreBtn"
            style={cards.length > visibleCount ? undefined : { display: 'none' }}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export function RelatedLinks({
  variant,
  ids,
  heading,
  description,
  cards,
  visibleCount = 4,
  lazyloaded = true,
}: RelatedLinksProps) {
  const sectionClass = [
    'elementor-element',
    `elementor-element-${ids.section}`,
    variant === 'flat' ? 'interlinking-section' : null,
    'e-flex e-con-boxed e-con e-parent',
    lazyloaded ? 'e-lazyloaded' : null,
  ]
    .filter(Boolean)
    .join(' ');

  const headingWidget = (
    <div
      className={`elementor-element elementor-element-${ids.heading} elementor-widget elementor-widget-heading`}
      data-widget_type="heading.default"
    >
      <div className="elementor-widget-container">
        <h2 className="elementor-heading-title elementor-size-default">
          {heading}
        </h2>
      </div>
    </div>
  );

  const descriptionWidget = description !== undefined ? (
    <div
      className={`elementor-element elementor-element-${ids.text} elementor-widget elementor-widget-text-editor`}
      data-widget_type="text-editor.default"
    >
      <div className="elementor-widget-container">
        {typeof description === 'string' ? (
          <p>
            {description}
          </p>
        ) : (
          description
        )}
      </div>
    </div>
  ) : null;

  const shortcodeWidget = (
    <div
      className={
        variant === 'flat'
          ? `elementor-element elementor-element-${ids.shortcode} interlinking-shortcode__widget elementor-widget elementor-widget-shortcode`
          : `elementor-element elementor-element-${ids.shortcode} elementor-widget elementor-widget-shortcode`
      }
      data-widget_type="shortcode.default"
    >
      <div className="elementor-widget-container">
        <Cards cards={cards} visibleCount={visibleCount} />
      </div>
    </div>
  );

  return (
    <div className={sectionClass} data-settings={GRADIENT}>
      <div className="e-con-inner">
        {variant === 'flat' ? (
          <>
            {headingWidget}
            {descriptionWidget}
            {shortcodeWidget}
          </>
        ) : (
          <div className={`elementor-element elementor-element-${ids.outerChild} e-con-full e-flex e-con e-child`}>
            {headingWidget}
            {descriptionWidget}
            <div className={`elementor-element elementor-element-${ids.innerChild} e-con-full e-flex e-con e-child`}>
              {shortcodeWidget}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RelatedLinks;
