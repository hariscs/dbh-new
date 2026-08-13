import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout4 from '../layouts/Layout-4';
import { TrustIndexWidget } from '@/components/TrustIndexWidget';

export default function PrivacyPolicyPillar({
  fields = {},
}: {
  fields?: Record<string, string>;
}) {
  return (
    <Layout4>
      <div id="content" className="site-main post-522 page type-page status-publish hentry">
        <div className="page-content">
          <div className="elementor elementor-522">
            <div className="elementor-element elementor-element-1470cbf elementor-hidden-mobile e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="&#123;&quot;background_background&quot;:&quot;classic&quot;&#125;">
              <div className="e-con-inner">
                <div className="elementor-element elementor-element-5766699 e-con-full e-flex e-con e-child">
                  <div className="elementor-element elementor-element-c7ce012 banner_head elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                      <h2 className="elementor-heading-title elementor-size-default">
                        District Behavioral Health <strong>Privacy Policy</strong>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-9f22cd4 elementor-hidden-desktop elementor-hidden-tablet e-flex e-con-boxed e-con e-parent">
              <div className="e-con-inner">
                <div className="elementor-element elementor-element-197f243 elementor-widget elementor-widget-image" data-widget_type="image.default">
                  <div className="elementor-widget-container">
                    <link rel="preload" as="image" href="/images/9597b4f2b6401eb2038cf91cba4d74b9.webp" fetchPriority="high" /><img fetchPriority="high" src="/images/9597b4f2b6401eb2038cf91cba4d74b9.webp" alt="Rectangle 1" className="attachment-full size-full wp-image-312" style={{maxWidth: "100%", height: "auto"}} />
                  </div>
                </div>
                <div className="elementor-element elementor-element-cc1e3df e-con-full e-flex e-con e-child">
                  <div className="elementor-element elementor-element-4b66f59 banner_head elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                      <h2 className="elementor-heading-title elementor-size-default">
                        Distric Behavioral Health
                        <strong>Privacy Policy</strong>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-bf94d1b e-flex e-con-boxed e-con e-parent e-lazyloaded">
              <div className="e-con-inner">
                <div className="elementor-element elementor-element-4f7a488 elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                  <div className="elementor-widget-container">
                    {/* The policy copy itself, from the builder field. Rich HTML authored in
                        WordPress, so it is injected rather than escaped — same treatment the
                        CRO2 template gives h2___con. Rendered only when present, so a missing
                        field leaves an empty container instead of a broken section. */}
                    {fields.blog_section_1___con && (
                      <div dangerouslySetInnerHTML={{ __html: fields.blog_section_1___con }} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-f055c0f e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="&#123;&quot;background_background&quot;:&quot;classic&quot;&#125;">
              <div className="e-con-inner">
                <div className="elementor-element elementor-element-53994fc e-con-full e-flex e-con e-child">
                  <div className="elementor-element elementor-element-5e9f972 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                      <h2 className="elementor-heading-title elementor-size-default">Testimonials</h2>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-622071b elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                    <div className="elementor-widget-container">
                      <h2 className="elementor-heading-title elementor-size-default">Stories of Hope and Healing</h2>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-3d3b77c elementor-widget elementor-widget-image" data-widget_type="image.default">
                    <div className="elementor-widget-container">
                      <img loading="lazy" src="/images/da37a56cbc0965701377f6a7601a8b3d.webp" alt="Frame 32" className="attachment-full size-full wp-image-208" style={{maxWidth: "100%", height: "auto"}} />
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-800f6f5 elementor-align-left elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-button" data-widget_type="button.default">
                    <div className="elementor-widget-container">
                      <div className="elementor-button-wrapper">
                        <Link href="/privacy-policy/#" className="elementor-button elementor-button-link elementor-size-sm">
                          <span className="elementor-button-content-wrapper">
                            <span className="elementor-button-text">Read More Success Stories</span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-e793128 e-con-full e-flex e-con e-child">
                  <div className="elementor-element elementor-element-fa47234 elementor-widget elementor-widget-html" data-widget_type="html.default">
                    <div className="elementor-widget-container">
                      {/* The scrape dropped the loader <script> this Elementor HTML widget
                          holds on the WordPress page, leaving an empty div — hence no reviews
                          here. Widget id is this page's own, not the one /contact-us uses. */}
                      <TrustIndexWidget widgetId="6c23c3d40f38852df246e2f6d3e" />
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-85dd1a9 elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-arrows-position-inside elementor-widget elementor-widget-loop-carousel e-widget-swiper" data-settings="&#123;&quot;template_id&quot;:&quot;200&quot;,&quot;image_spacing_custom&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:20,&quot;sizes&quot;:[]&#125;,&quot;slides_to_show&quot;:&quot;2&quot;,&quot;_skin&quot;:&quot;post&quot;,&quot;slides_to_show_tablet&quot;:&quot;2&quot;,&quot;slides_to_show_mobile&quot;:&quot;1&quot;,&quot;slides_to_scroll&quot;:&quot;1&quot;,&quot;edit_handle_selector&quot;:&quot;.elementor-loop-container&quot;,&quot;autoplay&quot;:&quot;yes&quot;,&quot;autoplay_speed&quot;:5000,&quot;pause_on_hover&quot;:&quot;yes&quot;,&quot;pause_on_interaction&quot;:&quot;yes&quot;,&quot;infinite&quot;:&quot;yes&quot;,&quot;speed&quot;:500,&quot;offset_sides&quot;:&quot;none&quot;,&quot;arrows&quot;:&quot;yes&quot;,&quot;image_spacing_custom_tablet&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;image_spacing_custom_mobile&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;&#125;" data-widget_type="loop-carousel.post">
                    <div className="elementor-widget-container">
                      <div dir="ltr" role="list" className="swiper elementor-loop-container elementor-grid swiper-initialized swiper-horizontal swiper-pointer-events">
                        <div id="swiper-wrapper-1101c3758c0ef4ba7" className="swiper-wrapper" aria-live="off">
                          <div role="group" className="elementor elementor-200 swiper-slide e-loop-item e-loop-item-195 post-195 testimonials type-testimonials status-publish has-post-thumbnail hentry" aria-label="1 of 2" aria-roledescription="slide">
                            <div className="elementor-element elementor-element-6b96d74 e-flex e-con-boxed e-con e-parent" data-settings="&#123;&quot;background_background&quot;:&quot;classic&quot;&#125;">
                              <div className="e-con-inner">
                                <div className="elementor-element elementor-element-d64a9fa e-con-full e-flex e-con e-child">
                                  <div className="elementor-element elementor-element-2d86180 e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-8181815 elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image" data-widget_type="theme-post-featured-image.default">
                                      <div className="elementor-widget-container">
                                        <img loading="lazy" src="/images/816165b74a85bae57fa3b804180af5d2.webp" alt="Ellipse 3" className="attachment-thumbnail size-thumbnail wp-image-198" style={{maxWidth: "100%", height: "auto"}} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-1bdc3ce e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-f582852 elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading" data-widget_type="theme-post-title.default">
                                      <div className="elementor-widget-container">
                                        <h1 className="elementor-heading-title elementor-size-default">Thomas daniel</h1>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-a2c906b elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">Senior Doctor</h2>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-5358893 e-con-full e-flex e-con e-child">
                                  <div className="elementor-element elementor-element-38bd3b8 elementor-widget elementor-widget-image" data-widget_type="image.default">
                                    <div className="elementor-widget-container">
                                      <img loading="lazy" src="/images/0374657cebe9faccfc6bfe800bc9bbf3.webp" alt="Frame 37" className="attachment-full size-full wp-image-197" style={{maxWidth: "100%", height: "auto"}} />
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-494fdfc elementor-widget elementor-widget-theme-post-excerpt" data-widget_type="theme-post-excerpt.default">
                                    <div className="elementor-widget-container">The team at Gratitude Lodge truly saved my life. I felt seen, heard, and cared for in every step of my recovery. I’m finally living a life of peace and purpose.</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div role="group" className="elementor elementor-200 swiper-slide e-loop-item e-loop-item-196 post-196 testimonials type-testimonials status-publish has-post-thumbnail hentry" aria-label="2 of 2" aria-roledescription="slide">
                            <div className="elementor-element elementor-element-6b96d74 e-flex e-con-boxed e-con e-parent" data-settings="&#123;&quot;background_background&quot;:&quot;classic&quot;&#125;">
                              <div className="e-con-inner">
                                <div className="elementor-element elementor-element-d64a9fa e-con-full e-flex e-con e-child">
                                  <div className="elementor-element elementor-element-2d86180 e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-8181815 elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image" data-widget_type="theme-post-featured-image.default">
                                      <div className="elementor-widget-container">
                                        <img loading="lazy" src="/images/be003f2536f1c36c7fd92ba3c94fae12.webp" alt="Ellipse 3 1" className="attachment-thumbnail size-thumbnail wp-image-199" style={{maxWidth: "100%", height: "auto"}} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-1bdc3ce e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-f582852 elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading" data-widget_type="theme-post-title.default">
                                      <div className="elementor-widget-container">
                                        <h1 className="elementor-heading-title elementor-size-default">Mathew</h1>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-a2c906b elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">Senior Doctor</h2>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-5358893 e-con-full e-flex e-con e-child">
                                  <div className="elementor-element elementor-element-38bd3b8 elementor-widget elementor-widget-image" data-widget_type="image.default">
                                    <div className="elementor-widget-container">
                                      <img loading="lazy" src="/images/0374657cebe9faccfc6bfe800bc9bbf3.webp" alt="Frame 37" className="attachment-full size-full wp-image-197" style={{maxWidth: "100%", height: "auto"}} />
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-494fdfc elementor-widget elementor-widget-theme-post-excerpt" data-widget_type="theme-post-excerpt.default">
                                    <div className="elementor-widget-container">Watching my loved one thrive after treatment at Alliance Recovery was life-changing. The team’s dedication to her healing was beyond anything I could have imagined.</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                      </div>
                      <div role="button" className="elementor-swiper-button elementor-swiper-button-prev" tabIndex={0} aria-label="Previous slide" aria-controls="swiper-wrapper-1101c3758c0ef4ba7">
                        <svg className="e-font-icon-svg e-fas-long-arrow-alt-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true">
                          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"></path>
                        </svg>
                      </div>
                      <div role="button" className="elementor-swiper-button elementor-swiper-button-next" tabIndex={0} aria-label="Next slide" aria-controls="swiper-wrapper-1101c3758c0ef4ba7">
                        <svg className="e-font-icon-svg e-fas-long-arrow-alt-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true">
                          <path d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout4>
  );
}
