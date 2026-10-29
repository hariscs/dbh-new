import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="elementor elementor-117 elementor-location-footer">
      <div className="elementor-element elementor-element-f7771bd e-flex e-con-boxed e-con e-parent e-lazyloaded">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-8ac0bb4 e-con-full e-flex e-con e-child">
            <div className="elementor-element elementor-element-34475cf e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-1f1a7ab elementor-widget elementor-widget-image" data-widget_type="image.default">
                <div className="elementor-widget-container">
                  <Image src="/images/e595b586e3b76b76b111980e167b16e0.webp" alt="" width={247} height={58} className="attachment-full size-full wp-image-32" />
                </div>
              </div>
              <div className="elementor-element elementor-element-d311276 elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                <div className="elementor-widget-container">
                  <p>
                    The District Behavioral Health Group is a network of trusted, accredited treatment centers helping individuals overcome addiction and mental health challenges.
                  </p>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-6b48b01 e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-2400855 elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">
                    Quick Links
                  </h2>
                </div>
              </div>
              <div className="elementor-element elementor-element-c2fef40 elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-widget_type="icon-list.default">
                <div className="elementor-widget-container">
                  <ul className="elementor-icon-list-items">
                    <li className="elementor-icon-list-item">
                      <Link href="#">
                        <span className="elementor-icon-list-text">
                          About
                        </span>
                      </Link>
                    </li>
                    <li className="elementor-icon-list-item">
                      <Link href="#">
                        <span className="elementor-icon-list-text">
                          Facilities
                        </span>
                      </Link>
                    </li>
                    <li className="elementor-icon-list-item">
                      <Link href="#">
                        <span className="elementor-icon-list-text">
                          Programs
                        </span>
                      </Link>
                    </li>
                    <li className="elementor-icon-list-item">
                      <Link href="#">
                        <span className="elementor-icon-list-text">
                          Careers
                        </span>
                      </Link>
                    </li>
                    <li className="elementor-icon-list-item">
                      <Link href="#">
                        <span className="elementor-icon-list-text">
                          Contact
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-9a278a5 e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-a8d796e elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">
                    Proudly Accredited
                  </h2>
                </div>
              </div>
              <div className="elementor-element elementor-element-144c6fd elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-image" data-widget_type="image.default">
                <div className="elementor-widget-container">
                  <Image src="/images/9ae5067217df37c1765aa8b913b40a56.webp" alt="" width={656} height={149} className="attachment-full size-full wp-image-118" />
                </div>
              </div>
              <div className="elementor-element elementor-element-9682ed2 e-con-full e-flex e-con e-child">
                <div className="elementor-element elementor-element-06e41df elementor-widget elementor-widget-image" data-widget_type="image.default">
                  <div className="elementor-widget-container">
                    <a href="https://recovery.com/the-district-recovery-huntington-beach-california/" target="_blank" rel="noopener noreferrer">
                      <Image src="/images/67df4626d6e86bef3a91cd0427f1dc4d.webp" alt="Find us on Recovery.com" width={227} height={103} className="attachment-full size-full wp-image-1250" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="elementor-element elementor-element-876d646 e-con-full e-flex e-con e-child">
            <div className="elementor-element elementor-element-6247dc7 e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-145dc5a elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                <div className="elementor-widget-container">
                  <p>
                    All rights reserved ® Districtbehavioralhealthgroup.com
                  </p>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-9be6cab e-con-full elementor-hidden-mobile e-flex e-con e-child">
              <div className="elementor-element elementor-element-3a61439 elementor-icon-list--layout-inline elementor-align-end elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-widget_type="icon-list.default">
                <div className="elementor-widget-container">
                  <ul className="elementor-icon-list-items elementor-inline-items">
                    <li className="elementor-icon-list-item elementor-inline-item">
                      <Link href="/privacy-policy/">
                        <span className="elementor-icon-list-text">
                          Privacy Policy
                        </span>
                      </Link>
                    </li>
                    <li className="elementor-icon-list-item elementor-inline-item">
                      <Link href="/terms-of-service/">
                        <span className="elementor-icon-list-text">
                          Terms of Service
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
