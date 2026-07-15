import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout11 from '../layouts/Layout-11';
import Script from 'next/script';
import WidgetScript from '@/components/WidgetScript';

const gridData0 = [
  {
    "title": "Step 1",
    "description": "Tell Us About Yourself",
    "text2": "Everyone’s situation is different. Call our admissions team 24/7 to share your story and start the treatment process.",
    "image": "/images/f77658cfecf39266000554ca4648ebc0.webp"
  },
  {
    "title": "Step 2",
    "description": "Complete the Evaluation Process",
    "text2": "Our admissions specialist will ask about your substance use, mental health, medical history, and insurance to determine the best treatment approach.",
    "image": "/images/ff72b273da54989440503c3e18efef56.webp"
  },
  {
    "title": "Step 3",
    "description": "Plan Your Admission",
    "text2": "After your evaluation and approval, we will schedule your admission date and confirm program availability.",
    "image": "/images/8d726cd45b61a263bdedefe8dcf83b1b.webp"
  },
  {
    "title": "Step 4",
    "description": "Travel and Arrive at the Facility",
    "text2": "We’ll continue coordinating with you as you pack for treatment and ensure you are going to make your travel arrangements with no problems.",
    "image": "/images/74ab75db5aadfc72c6b8407e18211b8f.webp"
  },
  {
    "title": "Step 5",
    "description": "Begin Your Treatment",
    "text2": "Your recovery starts with a personalized treatment plan that may include therapy, medication support, and relapse prevention.",
    "image": "/images/16d67b0334ed5feeef99e437429765aa.webp"
  }
] as const;


export default function RehabAdmission(props: Record<string, string>) {
  const address_county = props.address_county ?? "Orange County";
  return (
    <Layout11>
      <div id="content" className="site-main post-103977 page type-page status-publish hentry">
        <div className="page-content">
          <div className="elementor elementor-103977">
            <div className="elementor-element elementor-element-90e9017 e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="&#123;&quot;background_background&quot;:&quot;gradient&quot;&#125;">
              <div className="e-con-inner">
                <div className="elementor-element elementor-element-f509614 elementor-widget-mobile__width-auto elementor-absolute elementor-widget elementor-widget-image" data-settings="&#123;&quot;_position&quot;:&quot;absolute&quot;&#125;" data-widget_type="image.default">
                  <div className="elementor-widget-container">
                    <link rel="preload" as="image" href="/images/07bec7207414dca65b25832a57f3680d.webp" fetchPriority="high" /><img fetchPriority="high" src="/images/07bec7207414dca65b25832a57f3680d.webp" alt="banner left iconpng" className="attachment-full size-full wp-image-103266" style={{maxWidth: "100%", height: "auto"}} />
                  </div>
                </div>
                <div className="elementor-element elementor-element-d048b52 e-flex e-con-boxed e-con e-child">
                  <div className="e-con-inner">
                    <div className="elementor-element elementor-element-4d0fc6a elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                      <div className="elementor-widget-container">
                        <h1 className="elementor-heading-title elementor-size-default">Your Journey to Recovery Starts Here</h1>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-9f7b647 elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                      <div className="elementor-widget-container">
                        <p>At District Behavioral Health, our admissions counselors educate you or your loved one on how simple the admissions process can be. Our goal is to make the rehab admissions process as easy as possible so you or your loved ones can find the right treatment suited to your needs. We walk with you on your journey to sobriety.</p>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-098e0af e-con-full e-flex e-con e-child">
                      <div className="elementor-element elementor-element-0ab130e elementor-align-left elementor-widget-mobile__width-inherit e-transform elementor-mobile-align-justify elementor-widget elementor-widget-button" data-settings="&#123;&quot;_transform_translateY_effect_hover&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:-5,&quot;sizes&quot;:[]&#125;,&quot;_animation_tablet&quot;:&quot;none&quot;,&quot;_transform_translateX_effect_hover&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateX_effect_hover_tablet&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateX_effect_hover_mobile&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateY_effect_hover_tablet&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateY_effect_hover_mobile&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;&#125;" data-widget_type="button.default">
                        <div className="elementor-widget-container">
                          <div className="elementor-button-wrapper">
                            <Link href="/rehab-admission/#verifyinsurancera" className="elementor-button elementor-button-link elementor-size-sm">
                              <span className="elementor-button-content-wrapper">
                                <span className="elementor-button-icon">
                                  <svg fill="none" width={24} xmlns="http://www.w3.org/2000/svg" height={24} viewBox="0 0 24 24">
                                    <path d="M19 12H5M19 12L12 19M19 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                                <span className="elementor-button-text">Get Started</span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-b4be985 elementor-align-left elementor-widget-mobile__width-inherit e-transform elementor-mobile-align-justify elementor-widget elementor-widget-button" data-settings="&#123;&quot;_transform_translateY_effect_hover&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:-5,&quot;sizes&quot;:[]&#125;,&quot;_animation_tablet&quot;:&quot;none&quot;,&quot;_transform_translateX_effect_hover&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateX_effect_hover_tablet&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateX_effect_hover_mobile&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateY_effect_hover_tablet&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateY_effect_hover_mobile&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;&#125;" data-widget_type="button.default">
                        <div className="elementor-widget-container">
                          <div className="elementor-button-wrapper">
                            <Link href="tel:+18887020484" className="elementor-button elementor-button-link elementor-size-sm">
                              <span className="elementor-button-content-wrapper">
                                <span className="elementor-button-text">888-702-0484</span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-f08d794 elementor-absolute elementor-widget elementor-widget-image" data-settings="&#123;&quot;_position&quot;:&quot;absolute&quot;&#125;" data-widget_type="image.default">
                  <div className="elementor-widget-container">
                    <img loading="lazy" src="/images/8d86ed7b81891cfdcdb40b5b3ef24133.webp" alt="banner right icon" className="attachment-full size-full wp-image-103267" style={{maxWidth: "100%", height: "auto"}} />
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-27f0ae6 e-flex e-con-boxed e-con e-parent e-lazyloaded">
              <div className="e-con-inner">
                <div className="elementor-element elementor-element-7035475 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">How Admissions Works</h2>
                  </div>
                </div>
                <div className="elementor-element elementor-element-bb1318e elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                  <div className="elementor-widget-container">We’ve streamlined our process to remove barriers to treatment. Four simple steps stand between you and a new life.</div>
                </div>
                <div className="elementor-element elementor-element-28b3d1c e-con-full e-flex e-con e-child">
                  {gridData0.map((item, i) => (
                    <div key={i} className="elementor-element elementor-element-69644ae e-con-full e-flex e-con e-child" data-settings="&#123;&quot;background_background&quot;:&quot;classic&quot;&#125;">
                      <div className="elementor-element elementor-element-81f85ba e-con-full e-flex e-con e-child">
                        <div className="elementor-element elementor-element-0333cef elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                          <div className="elementor-widget-container">
                            <h4 className="elementor-heading-title elementor-size-default">{item.title}</h4>
                          </div>
                        </div>
                        <div className="elementor-element elementor-element-7649b79 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                          <div className="elementor-widget-container">
                            <h3 className="elementor-heading-title elementor-size-default">{item.description}</h3>
                          </div>
                        </div>
                        <div className="elementor-element elementor-element-3ca0bfb elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                          <div className="elementor-widget-container">
                            <p>{item.text2}</p>
                          </div>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-592360b elementor-widget elementor-widget-image" data-widget_type="image.default">
                        <div className="elementor-widget-container">
                          <img loading="lazy" src={item.image} alt="salesgirl on laptop" className="attachment-full size-full wp-image-103981" style={{maxWidth: "100%", height: "auto"}} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-c9872d3 e-flex e-con-boxed e-con e-parent e-lazyloaded">
              <div className="e-con-inner">
                <div className="elementor-element elementor-element-5cdfc96 e-con-full e-flex e-con e-child" data-settings="&#123;&quot;background_background&quot;:&quot;gradient&quot;&#125;">
                  <div className="elementor-element elementor-element-05c63b9 e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-e34ad95 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                      <div className="elementor-widget-container">
                        <h2 className="elementor-heading-title elementor-size-default">We're Available For You 24/7</h2>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-247d887 elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                      <div className="elementor-widget-container">
                        <p>Call us any time, any day, to speak with an addiction specialist and learn about our drug and alcohol addiction treatment centers in {address_county}, Southern California.</p>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-b52c178 e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-0cb8354 elementor-align-justify elementor-widget-mobile__width-inherit e-transform elementor-mobile-align-justify elementor-widget__width-initial elementor-widget elementor-widget-button" data-settings="&#123;&quot;_transform_translateY_effect_hover&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:-5,&quot;sizes&quot;:[]&#125;,&quot;_animation_tablet&quot;:&quot;none&quot;,&quot;_transform_translateX_effect_hover&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateX_effect_hover_tablet&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateX_effect_hover_mobile&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateY_effect_hover_tablet&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateY_effect_hover_mobile&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;&#125;" data-widget_type="button.default">
                      <div className="elementor-widget-container">
                        <div className="elementor-button-wrapper">
                          <Link href="tel:+18887020484" className="elementor-button elementor-button-link elementor-size-sm">
                            <span className="elementor-button-content-wrapper">
                              <span className="elementor-button-text">888-702-0484</span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-b576440 elementor-align-justify elementor-widget-mobile__width-inherit e-transform elementor-mobile-align-justify elementor-widget__width-initial elementor-widget elementor-widget-button" data-settings="&#123;&quot;_transform_translateY_effect_hover&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:-5,&quot;sizes&quot;:[]&#125;,&quot;_animation_tablet&quot;:&quot;none&quot;,&quot;_transform_translateX_effect_hover&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateX_effect_hover_tablet&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateX_effect_hover_mobile&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateY_effect_hover_tablet&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;,&quot;_transform_translateY_effect_hover_mobile&quot;:&#123;&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]&#125;&#125;" data-widget_type="button.default">
                      <div className="elementor-widget-container">
                        <div className="elementor-button-wrapper">
                          <Link href="/rehab-admission/#verifyinsurancera" className="elementor-button elementor-button-link elementor-size-sm">
                            <span className="elementor-button-content-wrapper">
                              <span className="elementor-button-text">Verify Insurance</span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="verifyinsurancera" className="elementor-element elementor-element-38a6332 e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="&#123;&quot;background_background&quot;:&quot;classic&quot;&#125;">
              <div className="e-con-inner">
                <div className="elementor-element elementor-element-4ce9c2f e-con-full e-flex e-con e-child">
                  <div className="elementor-element elementor-element-28180e1 e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-5ef87cf e-flex e-con-boxed e-con e-child">
                      <div className="e-con-inner">
                        <div className="elementor-element elementor-element-9c826b0 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                          <div className="elementor-widget-container">
                            <h2 className="elementor-heading-title elementor-size-default">Contact Us</h2>
                          </div>
                        </div>
                        <div className="elementor-element elementor-element-9754bca elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                          <div className="elementor-widget-container">
                            <h2 className="elementor-heading-title elementor-size-default">We're Here to Help Day or Night</h2>
                          </div>
                        </div>
                        <div className="elementor-element elementor-element-cb27416 elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                          <div className="elementor-widget-container">
                            <p>Whether you’re seeking help for yourself or a loved one, our admissions team is available 24/7 to answer your questions and guide you toward the right care.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-0f23545 elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <img loading="lazy" src="/images/f8ce11ad862d301faaf9ef4c0fa1b9c0.webp" alt="shutterstock 2023831943 1" className="attachment-full size-full wp-image-109134" style={{maxWidth: "100%", height: "auto"}} />
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-a190554 e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-9086a1f elementor-widget__width-inherit elementor-widget-mobile__width-inherit elementor-widget elementor-widget-html" data-widget_type="html.default">
                      <div className="elementor-widget-container">
                        <iframe loading="lazy" id="JotFormIFrame-252953870854469" src="https://form.jotform.com/252953870854469?isIframeEmbed=1&amp;parentURL=https%3A%2F%2Fdistrictbehavioralhealth.com%2Frehab-admission%2F" allow="geolocation; microphone; camera; fullscreen; payment" title="TDRC New Design Insurance Form" allowTransparency style={{minWidth:"100%",maxWidth:"100%",border:"none",height:"700px"}}></iframe>
                        <WidgetScript src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js" />
                        <Script id="inline-script-0" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window.addEventListener("widgetScriptLoaded",function(){window.jotformEmbedHandler("iframe[id='JotFormIFrame-252953870854469']", "https://form.jotform.com/")},{once:true});` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout11>
  );
}
