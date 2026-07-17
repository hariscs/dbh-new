import React from 'react'
import Image from 'next/image'
import { authorMarketingChromeHtml } from './authorMarketingChrome'

// Static author-detail template. The hero + "About" + "Explore articles" intro are
// props-driven (filled from the builder API); the shared marketing sections below
// (pricing, insurance, testimonials, admissions, FAQs, socials, contact) are the
// same for every author and are rendered from an exported HTML fragment.

const FALLBACK_AVATAR = '/images/author-fallback-avatar.png'

export type AuthorDetailProps = {
  firstName?: string
  lastName?: string
  role?: string
  headshot?: string
  headshotWidth?: number
  headshotHeight?: number
  headshotAlt?: string
  linkedin?: string | null
  /** Bio HTML from the builder API (may be empty). */
  bio?: string
}

export default function AuthorDetail({
  firstName = 'Will',
  lastName = 'Dunbar',
  role = 'Team Member',
  headshot = FALLBACK_AVATAR,
  headshotWidth = 220,
  headshotHeight = 220,
  headshotAlt,
  linkedin = null,
  bio,
}: AuthorDetailProps) {
  const fullName = `${firstName} ${lastName}`.trim()
  return (
    <div className="elementor elementor-3054 elementor-location-single post-author type-authors">
      <div
        className="elementor-element elementor-element-d2d228b e-flex e-con-boxed e-con e-parent"
        data-settings="{&quot;background_background&quot;:&quot;gradient&quot;}"
      >
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-76d8f269 e-con-full e-flex e-con e-child">
            <div
              className="elementor-element elementor-element-1695fc4e elementor-widget elementor-widget-image"
              data-widget_type="image.default"
            >
              <div className="elementor-widget-container">
                <Image
                  src={headshot}
                  width={headshotWidth}
                  height={headshotHeight}
                  alt={headshotAlt ?? fullName}
                  className="attachment-full size-full"
                />
              </div>
            </div>
            <div className="elementor-element elementor-element-310599fa e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-74027994 e-con-full e-flex e-con e-child">
                <div
                  className="elementor-element elementor-element-550cdd26 elementor-widget elementor-widget-heading"
                  data-widget_type="heading.default"
                >
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">{firstName}</h2>
                  </div>
                </div>
                <div
                  className="elementor-element elementor-element-458af8d elementor-widget elementor-widget-heading"
                  data-widget_type="heading.default"
                >
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">{lastName}</h2>
                  </div>
                </div>
              </div>
              <div
                className="elementor-element elementor-element-118019a elementor-widget elementor-widget-heading"
                data-widget_type="heading.default"
              >
                <div className="elementor-widget-container">
                  <p className="elementor-heading-title elementor-size-default">{role}</p>
                </div>
              </div>
              {linkedin ? (
                <div
                  className="elementor-element elementor-element-14b3e3c1 elementor-view-default elementor-widget elementor-widget-icon"
                  data-widget_type="icon.default"
                >
                  <div className="elementor-widget-container">
                    <div className="elementor-icon-wrapper">
                      <a className="elementor-icon" href={linkedin} rel="nofollow noopener" target="_blank">
                        <svg aria-hidden="true" className="e-font-icon-svg e-fab-linkedin-in" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="elementor-element elementor-element-732d0c31 e-con-full e-flex e-con e-child">
            <div
              className="elementor-element elementor-element-3a7f13eb elementor-widget elementor-widget-heading"
              data-widget_type="heading.default"
            >
              <div className="elementor-widget-container">
                <h1 className="elementor-heading-title elementor-size-default">About {firstName}</h1>
              </div>
            </div>
            {bio ? (
              <div
                className="elementor-element elementor-element-2c53e098 elementor-widget elementor-widget-text-editor"
                data-widget_type="text-editor.default"
              >
                <div className="elementor-widget-container" dangerouslySetInnerHTML={{ __html: bio }} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="elementor-element elementor-element-2321f83d e-flex e-con-boxed e-con e-parent">
        <div className="e-con-inner">
          <div className="elementor-element elementor-element-58420b58 e-flex e-con-boxed e-con e-child">
            <div className="e-con-inner">
              <div
                className="elementor-element elementor-element-7ee938a elementor-widget elementor-widget-heading"
                data-widget_type="heading.default"
              >
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">Explore our latest articles</h2>
                </div>
              </div>
              <div
                className="elementor-element elementor-element-37969aa2 elementor-widget elementor-widget-text-editor"
                data-widget_type="text-editor.default"
              >
                <div className="elementor-widget-container">
                  <p>
                    Want to learn more about substance abuse and addiction problems? Take a look at some of our
                    newest articles on the Renaissance Recovery blog.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: authorMarketingChromeHtml }} />
    </div>
  )
}
