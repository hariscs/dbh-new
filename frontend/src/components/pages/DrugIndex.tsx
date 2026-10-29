import Image from 'next/image';
import FaqAccordion from '../FaqAccordion';
import DrugIndexGlossary from '../DrugIndexGlossary';
import { fetchDrugIndexLetter } from '@/lib/wordpress';

const FAQ_HTML = `
<h3>What are the most common signs and symptoms of drug addiction?</h3>
<p>Physical and behavioral signs of addiction often include sudden changes in mood or personality, unexplained financial difficulties, changes in sleep or appetite, neglect of personal responsibilities, and continuing to use a substance despite negative health or social consequences.</p>
<h3>What is the difference between substance abuse and addiction?</h3>
<p>Substance abuse refers to using prescription medications or illicit drugs in harmful, improper, or unsafe ways. Addiction (Substance Use Disorder) is a chronic disease where a person develops a physical or psychological dependency, leading to intense cravings and an inability to stop using despite severe consequences.</p>
<h3>How long do drug withdrawal symptoms typically last?</h3>
<p>Acute withdrawal symptoms generally begin within 6 to 24 hours after stopping a substance and typically peak within 3 to 7 days. However, the exact duration varies based on the specific drug, duration of use, dosage, and whether medical detox is utilized.</p>
<h3>What is the difference between Inpatient Rehab and an Intensive Outpatient Program (IOP)?</h3>
<p>Inpatient (Residential) Treatment provides 24/7 medical supervision and housing in a facility. <a href="/location-served/usa/iop-drug-rehab/"><strong>Intensive Outpatient Programs (IOP)</strong></a> allow individuals to live at home while attending scheduled therapy sessions and treatment several days a week.</p>
<h3>What is medical detox, and why is it necessary?</h3>
<p><a href="/location-served/usa/medical-detox/"><strong>Medical detoxification</strong></a> is the process of safely removing drugs or alcohol from the body under professional medical supervision. It manages acute withdrawal symptoms safely and comfortably, reducing the risk of dangerous physical complications during early recovery.</p>
`;

export default async function DrugIndex() {
  const items = await fetchDrugIndexLetter('A');

  return (
    <>
      <div className="wp-singular page-template page-template-elementor_header_footer page elementor-page elementor-page-109371">
        <div className="elementor elementor-109371">
          <div className="elementor-element elementor-element-e297be0 e-flex e-con-boxed e-con e-parent" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
            <div className="e-con-inner">
              <div className="elementor-element elementor-element-c944f0e elementor-absolute elementor-hidden-mobile elementor-widget elementor-widget-image" data-settings="{&quot;_position&quot;:&quot;absolute&quot;}">
                <div className="elementor-widget-container">
                  <Image src="/images/3e8852e6a503a51e5838ebd37832ccfc.webp" alt="banner left img" width={461} height={537} className="attachment-full size-full wp-image-2128" />
                </div>
              </div>
              <div className="elementor-element elementor-element-e589629 e-flex e-con-boxed e-con e-child">
                <div className="e-con-inner">
                  <div className="elementor-element elementor-element-ec1bab1 elementor-widget elementor-widget-heading">
                    <div className="elementor-widget-container">
                      <h2 className="elementor-heading-title elementor-size-default">Drug Index</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-de90f78 elementor-absolute elementor-hidden-mobile elementor-widget elementor-widget-image" data-settings="{&quot;_position&quot;:&quot;absolute&quot;}">
                <div className="elementor-widget-container">
                  <Image src="/images/856af01151d87789050c060f22685951.webp" alt="banner right img" width={461} height={537} className="attachment-full size-full wp-image-2127" />
                </div>
              </div>
            </div>
          </div>

          <div className="elementor-element elementor-element-6a0f172 e-flex e-con-boxed e-con e-parent">
            <div className="e-con-inner">
              <div className="elementor-element elementor-element-6cc3e66 elementor-widget elementor-widget-shortcode">
                <div className="elementor-widget-container">
                  <div className="elementor-shortcode">
                    <DrugIndexGlossary initialLetter="A" initialItems={items ?? []} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="elementor-element elementor-element-ac41008 e-flex e-con-boxed e-con e-parent">
            <div className="e-con-inner">
              <div className="elementor-element elementor-element-7f1ebc7 e-con-full e-flex e-con e-child">
                <div className="elementor-element elementor-element-903311c elementor-widget elementor-widget-heading">
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">Rehabs Near Orange County FAQs</h2>
                  </div>
                </div>
                <div className="elementor-element elementor-widget elementor-widget-shortcode">
                  <div className="elementor-widget-container">
                    <div className="elementor-shortcode">
                      <FaqAccordion html={FAQ_HTML} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-d1f0b89 elementor-widget elementor-widget-image">
                <div className="elementor-widget-container">
                  <Image src="/images/7f7241c92f97cb575bb7b6e8e69409ae.webp" alt="image 4" width={657} height={776} className="attachment-full size-full wp-image-3049" />
                </div>
              </div>
            </div>
          </div>

          <div className="elementor-element elementor-element-f857bac e-con-full e-flex e-con e-parent">
            <div className="elementor-element elementor-element-05ade3c elementor-widget elementor-widget-template">
              <div className="elementor-widget-container">
                <div className="elementor-template">
                  <div className="elementor elementor-3115">
                    <div className="elementor-element elementor-element-19ac283e e-flex e-con-boxed e-con e-parent" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                      <div className="e-con-inner">
                        <div className="elementor-element elementor-element-99e3248 e-con-full e-flex e-con e-child">
                          <div className="elementor-element elementor-element-1d685b1c e-con-full e-flex e-con e-child">
                            <div className="elementor-element elementor-element-67eeeeb2 e-con-full e-flex e-con e-child">
                              <div className="elementor-element elementor-element-2a7885a1 elementor-widget elementor-widget-heading">
                                <div className="elementor-widget-container">
                                  <h2 className="elementor-heading-title elementor-size-default">Contact Us</h2>
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-52faab38 elementor-widget elementor-widget-heading">
                                <div className="elementor-widget-container">
                                  <h2 className="elementor-heading-title elementor-size-default">We&apos;re Here to Help Day or Night</h2>
                                </div>
                              </div>
                              <div className="elementor-element elementor-element-1c92a7b2 elementor-widget elementor-widget-text-editor">
                                <div className="elementor-widget-container">
                                  <p>Whether you&rsquo;re seeking help for yourself or a loved one, our admissions team is available 24/7 to answer your questions and guide you toward the right care.</p>
                                </div>
                              </div>
                            </div>
                            <div className="elementor-element elementor-element-1b744bfd elementor-widget elementor-widget-image">
                              <div className="elementor-widget-container">
                                <Image src="/images/f8ce11ad862d301faaf9ef4c0fa1b9c0.webp" alt="shutterstock 2023831943 1" width={807} height={579} sizes="(max-width: 767px) 65vw, (max-width: 1024px) 70vw, 700px" className="attachment-full size-full wp-image-109134" />
                              </div>
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-7d76f483 e-con-full e-flex e-con e-child">
                            <div className="elementor-element elementor-element-3e2aafc8 elementor-widget elementor-widget-html">
                              <div className="elementor-widget-container">
                                <iframe
                                  loading="lazy"
                                  id="JotFormIFrame-252953870854469"
                                  title="TDRC New Design Insurance Form"
                                  allow="geolocation; microphone; camera; fullscreen; payment"
                                  src="https://form.jotform.com/252953870854469?isIframeEmbed=1&parentURL=https%3A%2F%2Fdistrictbehavioralhealth.com%2Fdrug-index%2F"
                                  style={{ minWidth: '100%', maxWidth: '100%', border: 'none', height: '700px' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
