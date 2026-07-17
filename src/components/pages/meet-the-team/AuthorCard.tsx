import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Author, BusinessUnitPill as Pill } from './authors'

// The animated-headline widget reads this JSON from data-settings on the client.
// Exec and standard cards use slightly different option sets.
function headlineSettings(name: string, exec: boolean): string {
  return exec
    ? `{"highlighted_text":"${name}","headline_style":"highlight","marker":"circle","highlight_animation_duration":1200}`
    : `{"highlighted_text":"${name}","headline_style":"highlight","marker":"circle","loop":"yes","highlight_animation_duration":1200,"highlight_iteration_delay":8000}`
}

function headlineClass(animated: boolean): string {
  return animated ? 'elementor-headline e-animated' : 'elementor-headline'
}

// Circle marker drawn around the highlighted last name on animated cards.
function NameMarker() {
  return (
    <svg viewBox="0 0 500 150" preserveAspectRatio="none" aria-hidden="true">
      <path d="M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7"></path>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" className="e-font-icon-svg e-fab-linkedin-in" viewBox="0 0 448 512">
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
    </svg>
  )
}

// Role is one or two lines (title + optional certification), joined by a <br />.
// Written without adjacent dynamic text nodes so React emits no text-separator
// comments — keeping the output byte-identical to the original static markup.
function RoleLines({ lines }: { lines: string[] }) {
  if (lines.length > 1) {
    return (
      <>
        {lines[0]}
        <br />
        {lines[1]}
      </>
    )
  }
  return <>{lines[0]}</>
}

function BusinessUnitPill({ pill }: { pill: Pill }) {
  return (
    <a href={pill.href} className={`business-unit-pill ${pill.pillClass}`} style={{ color: pill.color }} rel="nofollow noopener" target="_blank">
      <Image src={pill.icon} alt={pill.alt} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} className="business-unit-icon" />
    </a>
  )
}

function ExecutiveCard({ author }: { author: Author }) {
  return (
                      <div className={author.wrapClass}>
                        <div className="elementor-element elementor-element-7b68fbab e-transform author-card e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;_transform_translateY_effect_hover&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:-5,&quot;sizes&quot;:[]},&quot;background_background&quot;:&quot;classic&quot;,&quot;_transform_translateX_effect_hover&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;_transform_translateX_effect_hover_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;_transform_translateX_effect_hover_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;_transform_translateY_effect_hover_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;_transform_translateY_effect_hover_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]}}">
                          <div className="e-con-inner">
                            <div className="elementor-element elementor-element-319deed9 e-con-full e-flex e-con e-child" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}"></div>
                            <div className="elementor-element elementor-element-777eaa72 e-con-full content-wrapper e-flex e-con e-child">
                              <div className="elementor-element elementor-element-79d46fe e-con-full e-flex e-con e-child">
                                <div className="elementor-element elementor-element-345c4b20 team-name-sty animated-head elementor-headline--style-highlight elementor-widget elementor-widget-animated-headline" data-settings={headlineSettings(author.highlighted, true)} data-widget_type="animated-headline.default">
                                  <div className="elementor-widget-container">
                                    <Link href={author.bio}>
                                      <h3 className={headlineClass(author.animated)}>
                                        <span className="elementor-headline-plain-text elementor-headline-text-wrapper">{author.first}</span>
                                        <span className="elementor-headline-dynamic-wrapper elementor-headline-text-wrapper">
                                          <span className="elementor-headline-dynamic-text elementor-headline-text-active">{author.last}</span>
                                          {author.animated && <NameMarker />}
                                        </span>
                                      </h3>
                                    </Link>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-1c9a97b9 designation-certification-heading elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                  <div className="elementor-widget-container">
                                    <h4 className="elementor-heading-title elementor-size-default"><RoleLines lines={author.role} /></h4>
                                  </div>
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-5f5fe7e8 e-con-full e-flex e-con e-child">
                                <div className="elementor-element elementor-element-53dfc857 elementor-view-stacked elementor-shape-circle elementor-widget elementor-widget-icon" data-widget_type="icon.default">
                                  <div className="elementor-widget-container">
                                    <div className="elementor-icon-wrapper">
                                      {author.linkedin ? (
                                      <a className="elementor-icon" href={author.linkedin} rel="nofollow noopener" target="_blank">
                                        <LinkedInIcon />
                                      </a>
                                    ) : (
                                      <div className="elementor-icon">
                                        <LinkedInIcon />
                                      </div>
                                    )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="elementor-element elementor-element-26d3535d elementor-widget-divider--view-line elementor-widget elementor-widget-divider" data-widget_type="divider.default">
                              <div className="elementor-widget-container">
                                <div className="elementor-divider">
                                  <span className="elementor-divider-separator"></span>
                                </div>
                              </div>
                            </div>
                            <div className="elementor-element elementor-element-5d14b59c e-con-full content-wrapper e-flex e-con e-child">
                              <div className="elementor-element elementor-element-36f59b96 designation-certification-heading elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                <div className="elementor-widget-container">
                                  <h4 className="elementor-heading-title elementor-size-default">
                                    Business Units
                                  </h4>
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-3091f5f2 elementor-widget elementor-widget-shortcode" data-widget_type="shortcode.default">
                                <div className="elementor-widget-container">
                                  <div className="elementor-shortcode">
                                    <div className="author-business-units-wrapper">
                                      {author.pills.map((pill) => (
                                        <BusinessUnitPill key={pill.pillClass} pill={pill} />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
  )
}

function StandardCard({ author }: { author: Author }) {
  return (
                      <div className={author.wrapClass}>
                        <div className="elementor-element elementor-element-536f3889 e-con-full author-card team-member e-transform e-flex e-con e-child" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;_transform_translateY_effect_hover&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:-5,&quot;sizes&quot;:[]},&quot;_transform_translateX_effect_hover&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;_transform_translateX_effect_hover_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;_transform_translateX_effect_hover_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;_transform_translateY_effect_hover_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;_transform_translateY_effect_hover_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]}}">
                          <div className="elementor-element elementor-element-615ef0ff e-con-full e-flex e-con e-child">
                            <div className="elementor-element elementor-element-9370d74 e-con-full top-content-area e-flex e-con e-child">
                              <div className="elementor-element elementor-element-ac242d6 elementor-widget elementor-widget-image" data-widget_type="image.default">
                                <div className="elementor-widget-container">
                                  <Image src={author.head!.src} alt={author.head!.alt} width={author.head!.w} height={author.head!.h} className={author.head!.cls} />
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-ef06e66 team-name-sty elementor-headline--style-highlight elementor-widget elementor-widget-animated-headline" data-settings={headlineSettings(author.highlighted, false)} data-widget_type="animated-headline.default">
                                <div className="elementor-widget-container">
                                  <Link href={author.bio}>
                                    <h3 className={headlineClass(author.animated)}>
                                      <span className="elementor-headline-plain-text elementor-headline-text-wrapper">{author.first}</span>
                                      <span className="elementor-headline-dynamic-wrapper elementor-headline-text-wrapper">
                                        <span className="elementor-headline-dynamic-text elementor-headline-text-active">{author.last}</span>
                                          {author.animated && <NameMarker />}
                                        </span>
                                    </h3>
                                  </Link>
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-3c273ef7 designation-certification-heading elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                <div className="elementor-widget-container">
                                  <h3 className="elementor-heading-title elementor-size-default"><RoleLines lines={author.role} /></h3>
                                </div>
                              </div>
                            </div>
                            <div className="elementor-element elementor-element-9a91ab3 e-con-full e-flex e-con e-child">
                              <div className="elementor-element elementor-element-6115d9e4 elementor-widget-divider--view-line elementor-widget elementor-widget-divider" data-widget_type="divider.default">
                                <div className="elementor-widget-container">
                                  <div className="elementor-divider">
                                    <span className="elementor-divider-separator"></span>
                                  </div>
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-58a26ab5 designation-certification-heading elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                <div className="elementor-widget-container">
                                  <h4 className="elementor-heading-title elementor-size-default">
                                    Business Units
                                  </h4>
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-721ad674 elementor-widget elementor-widget-shortcode" data-widget_type="shortcode.default">
                                <div className="elementor-widget-container">
                                  <div className="elementor-shortcode">
                                    <div className="author-business-units-wrapper">
                                      {author.pills.map((pill) => (
                                        <BusinessUnitPill key={pill.pillClass} pill={pill} />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
  )
}

export default function AuthorCard({ author }: { author: Author }) {
  return author.exec ? <ExecutiveCard author={author} /> : <StandardCard author={author} />
}
