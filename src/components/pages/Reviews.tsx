import React from 'react';
import Link from 'next/link';
import { TrustIndexWidget } from '@/components/TrustIndexWidget';

/**
 * /reviews — header, hero, the reviews widget, footer.
 *
 * The hero is the /blogs hero: same Elementor container (0b56047) and heading widget
 * (2f73c07), and the widget sits in that page's boxed content container (5c0801a) for
 * its max-width and vertical padding. Those rules are scoped to `.elementor-1021`,
 * which is why this page carries the blogs Elementor page id and its route imports
 * `../blogs/page.css` — reusing the stylesheet rather than duplicating 30 KB of it.
 *
 * The header comes from <Header /> in the route, and the footer from the root layout,
 * so neither is rendered here.
 */

/** This page's own Trustindex widget — not the one /privacy-policy or /contact-us use. */
const TRUSTINDEX_WIDGET_ID = "9534f9877b039174d296c758800";
export default function Reviews({ fields = {} }: { fields?: Record<string, string> }) {
  const heading = fields.h1?.trim() || "Reviews";

  return (
    <>
      <div className="reviews wp-custom-logo wp-embed-responsive wp-theme-hello-elementor wp-child-theme-hello-theme-child-master hello-elementor-default elementor-page-1021 elementor-default elementor-template-full-width elementor-kit-7 e--ua-blink e--ua-chrome e--ua-mac e--ua-webkit">
        <Link className="skip-link screen-reader-text" href="#content">
          Skip to content
        </Link>
        <div className="elementor elementor-1021 elementor-location-archive">
          <div className="elementor-element elementor-element-0b56047 e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
            <div className="e-con-inner">
              <div className="elementor-element elementor-element-2f73c07 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                <div className="elementor-widget-container">
                  <h1 className="elementor-heading-title elementor-size-default">
                    {heading}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div id="content" className="elementor-element elementor-element-5c0801a e-flex e-con-boxed e-con e-parent e-lazyloaded">
            <div className="e-con-inner">
              <div className="elementor-element elementor-widget elementor-widget-html" data-widget_type="html.default">
                <div className="elementor-widget-container">
                  <TrustIndexWidget widgetId={TRUSTINDEX_WIDGET_ID} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
