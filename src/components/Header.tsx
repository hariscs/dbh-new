import Image from "next/image";
import Link from "next/link";
import PrimaryNav from "@/components/PrimaryNav";

export default function Header() {
  return (
    <header className="elementor elementor-26 elementor-location-header">
      <header className="elementor-element elementor-element-bbfbc92 sticky-header elementor-hidden-tablet elementor-hidden-mobile e-flex e-con-boxed e-con e-parent elementor-sticky elementor-sticky--active elementor-section--handles-inside e-lazyloaded elementor-sticky--effects" data-settings="{&quot;sticky_on&quot;:[&quot;desktop&quot;,&quot;laptop&quot;,&quot;tablet&quot;,&quot;mobile&quot;],&quot;background_background&quot;:&quot;classic&quot;,&quot;sticky&quot;:&quot;top&quot;,&quot;sticky_effects_offset&quot;:90,&quot;sticky_offset&quot;:0,&quot;sticky_anchor_link_offset&quot;:0}">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-86b5b0d this-logo-sticky elementor-widget elementor-widget-image" data-widget_type="image.default">
            <div className="elementor-widget-container">
              <Link href="/">
                <Image src="/images/27be6d13936a8bc6dbcfb656bcd95b80.webp" alt="District-Behavioral-Health-Group-Big-Logo-Size" width={840} height={259} className="attachment-full size-full wp-image-430" />
              </Link>
            </div>
          </div>
          <div className="elementor-element elementor-element-31ff910 elementor-widget elementor-widget-shortcode" data-widget_type="shortcode.default">
            <div className="elementor-widget-container">
              <div className="elementor-shortcode">
                <nav id="dbh-primary-nav" className="dbh-nav">
                  <ul id="menu-mega-menu-district-behavioral-health" className="dbh-nav__list">
                    <PrimaryNav />
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="elementor-element elementor-element-0030369 elementor-align-right menu-cta elementor-widget elementor-widget-button" data-widget_type="button.default">
            <div className="elementor-widget-container">
              <div className="elementor-button-wrapper">
                <Link className="elementor-button elementor-button-link elementor-size-sm" href="tel:+18887020484">
                  <span className="elementor-button-content-wrapper">
                    <span className="elementor-button-text">
                      (888) 702-0484
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="elementor-section elementor-top-section elementor-element elementor-element-2427782 elementor-hidden-desktop sticky-header elementor-section-content-middle elementor-hidden-tablet elementor-hidden-mobile elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-sticky elementor-sticky--active elementor-section--handles-inside elementor-sticky--effects" data-settings="{&quot;sticky&quot;:&quot;top&quot;,&quot;background_background&quot;:&quot;classic&quot;,&quot;sticky_effects_offset&quot;:100,&quot;sticky_offset_mobile&quot;:0,&quot;sticky_effects_offset_mobile&quot;:5,&quot;sticky_anchor_link_offset_mobile&quot;:60,&quot;sticky_on&quot;:[&quot;desktop&quot;,&quot;tablet&quot;,&quot;mobile&quot;],&quot;sticky_offset&quot;:0,&quot;sticky_anchor_link_offset&quot;:0}">
        <div className="elementor-container elementor-column-gap-default">
          <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-589db17">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-element-ede5212 this-logo-sticky elementor-widget elementor-widget-image" data-widget_type="image.default">
                <div className="elementor-widget-container">
                  <Link href="/">
                    <Image src="/images/27be6d13936a8bc6dbcfb656bcd95b80.webp" alt="District-Behavioral-Health-Group-Big-Logo-Size" width={840} height={259} className="attachment-full size-full wp-image-430" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-819cba6">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-element-dc5d096 menu-cta elementor-hidden-mobile elementor-align-right elementor-widget elementor-widget-button" data-widget_type="button.default">
                <div className="elementor-widget-container">
                  <div className="elementor-button-wrapper">
                    <Link className="elementor-button elementor-button-link elementor-size-sm" href="/contact">
                      <span className="elementor-button-content-wrapper">
                        <span className="elementor-button-text">
                          Contact Us
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-ac2e9fe">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-element-ea9b3f3 menu-cta elementor-view-default elementor-widget elementor-widget-icon" data-widget_type="icon.default">
                <div className="elementor-widget-container">
                  <div className="elementor-icon-wrapper">
                    <Link className="elementor-icon" href="#elementor-action%3Aaction%3Dpopup%3Aopen%26settings%3DeyJpZCI6IjE4MjEiLCJ0b2dnbGUiOmZhbHNlfQ%3D%3D">
                      <svg aria-hidden="true" className="e-font-icon-svg e-fas-bars" viewBox="0 0 448 512">
                        <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="elementor-section elementor-top-section elementor-element elementor-element-6e615ec elementor-hidden-desktop sticky-header elementor-section-content-middle elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-sticky elementor-sticky--active elementor-section--handles-inside elementor-sticky--effects" data-settings="{&quot;sticky&quot;:&quot;top&quot;,&quot;background_background&quot;:&quot;classic&quot;,&quot;sticky_effects_offset&quot;:100,&quot;sticky_offset_mobile&quot;:0,&quot;sticky_effects_offset_mobile&quot;:5,&quot;sticky_anchor_link_offset_mobile&quot;:60,&quot;sticky_on&quot;:[&quot;desktop&quot;,&quot;tablet&quot;,&quot;mobile&quot;],&quot;sticky_offset&quot;:0,&quot;sticky_anchor_link_offset&quot;:0}">
        <div className="elementor-container elementor-column-gap-default">
          <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-6468fc2">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-element-d70e0ec this-logo-sticky elementor-widget elementor-widget-image" data-widget_type="image.default">
                <div className="elementor-widget-container">
                  <Link href="/">
                    <Image src="/images/27be6d13936a8bc6dbcfb656bcd95b80.webp" alt="District-Behavioral-Health-Group-Big-Logo-Size" width={840} height={259} className="attachment-full size-full wp-image-430" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-7693640">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-element-21a23f0 menu-cta elementor-hidden-mobile elementor-align-right elementor-widget elementor-widget-button" data-widget_type="button.default">
                <div className="elementor-widget-container">
                  <div className="elementor-button-wrapper">
                    <Link className="elementor-button elementor-button-link elementor-size-sm" href="/contact">
                      <span className="elementor-button-content-wrapper">
                        <span className="elementor-button-text">
                          Contact Us
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-788e046">
            <div className="elementor-widget-wrap elementor-element-populated">
              <div className="elementor-element elementor-element-18e5587 menu-cta elementor-view-default elementor-widget elementor-widget-icon" data-widget_type="icon.default">
                <div className="elementor-widget-container">
                  <div className="elementor-icon-wrapper">
                    <button type="button" className="elementor-icon" data-mobile-menu-open="" aria-controls="elementor-popup-modal-104913" aria-expanded="false" aria-label="Open menu">
                      <svg aria-hidden="true" className="e-font-icon-svg e-fas-bars" viewBox="0 0 448 512">
                        <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </header>
  );
}
