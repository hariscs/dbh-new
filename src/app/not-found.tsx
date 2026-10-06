import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import "./not-found.css";

// Replicates the WordPress "error-404" Elementor template (id 104774) live at
// cms.districtbehavioralhealth.com, so a real 404 (not just a bare message) renders here too.
// The header is rendered per page rather than by the root layout (see src/lib/phone.ts),
// so Next's built-in 404 would otherwise render without one. There is no page data for a
// missing page, so the header falls back to the default number. The footer comes from the
// root layout, which renders it on every page.
export default function NotFound() {
  return (
    <>
      <Header />
      <div className="elementor elementor-104774 elementor-location-single">
        <div className="elementor-element elementor-element-525d415 e-flex e-con-boxed e-con e-parent">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-42f96cd elementor-absolute elementor-widget elementor-widget-image">
              <div className="elementor-widget-container">
                <Image
                  src="https://cms.districtbehavioralhealth.com/wp-content/uploads/2026/04/Frame-2147227683.webp"
                  alt=""
                  width={737}
                  height={622}
                  sizes="(max-width: 737px) 100vw, 737px"
                />
              </div>
            </div>
            <div className="elementor-element elementor-element-c3093af e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-115310e elementor-widget elementor-widget-heading">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">
                    OOOPS... SOMETHING GOES WRONG PAGE NOT FOUND
                  </h2>
                </div>
              </div>
              <div className="elementor-element elementor-element-e98b4a8 elementor-align-center elementor-mobile-align-justify elementor-widget elementor-widget-button">
                <div className="elementor-widget-container">
                  <div className="elementor-button-wrapper">
                    <Link href="/" className="elementor-button elementor-button-link elementor-size-sm">
                      <span className="elementor-button-content-wrapper">
                        <span className="elementor-button-text">
                          Back to Homepage
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
