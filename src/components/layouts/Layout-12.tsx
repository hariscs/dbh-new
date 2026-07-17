import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
}

export default function Layout12({ children }: Props) {
  return (
    <>
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
                <li className="dbh-nav__item has-mega-menu">
                  <Link className="dbh-nav__link" href="#" aria-haspopup="true" aria-expanded="false" aria-controls="mm-panel-104566">
                    About
                    <span className="dbh-nav__caret" aria-hidden="true">
                      <svg width={10} height={6} viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </span>
                  </Link>
                  <div className="dbh-mega-panel" role="region" aria-hidden="true" id="mm-panel-104566">
                    <div className="dbh-mega-panel__inner">
                      <div className="dbh-mega-sidebar">
                        <button className="dbh-mega-tab is-active" data-tab="mega-group-104567" type="button" role="tab" aria-selected="true" aria-controls="mega-group-104567">
                          About Us
                        </button>
                        <button className="dbh-mega-tab" data-tab="mega-group-104571" type="button" role="tab" aria-selected="false" aria-controls="mega-group-104571">
                          Community
                        </button>
                      </div>
                      <div className="dbh-mega-panel-body">
                        <div className="dbh-mega-content is-active dbh-mega-content--image" id="mega-group-104567" role="tabpanel" aria-hidden="false">
                          <h3 className="dbh-mega-content__heading">
                            Who We Are
                          </h3>
                          <div className="dbh-mega-cards dbh-mega-cards--image">
                            <Link className="dbh-mega-card dbh-mega-card--image" href="/meet-the-team/">
                              <div className="dbh-mega-card__img-wrap">
                                <Image src="/images/c01e1f4c99890a94c3046d006807cae3.webp" alt="Meet The Team" width={280} height={180} />
                              </div>
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Meet The Team
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Our family is your family. We have brought the absolute best to guide you.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card dbh-mega-card--image" href="/our-facilities/">
                              <div className="dbh-mega-card__img-wrap">
                                <Image src="/images/25c8bb1f470a97edbc99d9e418bf249d.webp" alt="Tour The Center" width={280} height={180} />
                              </div>
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Tour The Center
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Bright, cozy, and inviting: Our beautifully designed space is open.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="dbh-mega-content dbh-mega-content--image" id="mega-group-104571" role="tabpanel" aria-hidden="true">
                          <h3 className="dbh-mega-content__heading">
                            Learn More About Us
                          </h3>
                          <div className="dbh-mega-cards dbh-mega-cards--image">
                            <Link className="dbh-mega-card" href="/location-served/usa/sober-living/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Sober Living
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Transition smoothly back into everyday independent life.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/pet-friendly-rehab/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Pet Friendly Facilities
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Keep your supportive animal companion nearby.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/couples-rehab/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Couples Rehab
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Heal your relationship while finding individual sobriety.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dbh-nav__item has-mega-menu">
                  <Link className="dbh-nav__link" href="#" aria-haspopup="true" aria-expanded="false" aria-controls="mm-panel-104576">
                    Addiction Programs
                    <span className="dbh-nav__caret" aria-hidden="true">
                      <svg width={10} height={6} viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </span>
                  </Link>
                  <div className="dbh-mega-panel" role="region" aria-hidden="true" id="mm-panel-104576">
                    <div className="dbh-mega-panel__inner">
                      <div className="dbh-mega-sidebar">
                        <button className="dbh-mega-tab is-active" data-tab="mega-group-104591" type="button" role="tab" aria-selected="true" aria-controls="mega-group-104591">
                          Addiction Recovery
                        </button>
                        <button className="dbh-mega-tab" data-tab="mega-group-104592" type="button" role="tab" aria-selected="false" aria-controls="mega-group-104592">
                          Addiction Rehab
                        </button>
                        <button className="dbh-mega-tab" data-tab="mega-group-104593" type="button" role="tab" aria-selected="false" aria-controls="mega-group-104593">
                          What We Treat
                        </button>
                        <button className="dbh-mega-tab" data-tab="mega-group-104878" type="button" role="tab" aria-selected="false" aria-controls="mega-group-104878">
                          Treatment Phases
                        </button>
                        <button className="dbh-mega-tab" data-tab="mega-group-104882" type="button" role="tab" aria-selected="false" aria-controls="mega-group-104882">
                          Treatment Modalities
                        </button>
                      </div>
                      <div className="dbh-mega-panel-body">
                        <div className="dbh-mega-content is-active dbh-mega-content--image" id="mega-group-104591" role="tabpanel" aria-hidden="false">
                          <h3 className="dbh-mega-content__heading">
                            What You Need to Know About
                          </h3>
                          <div className="dbh-mega-cards dbh-mega-cards--image">
                            <Link className="dbh-mega-card dbh-mega-card--image" href="/rehab-admission/">
                              <div className="dbh-mega-card__img-wrap">
                                <Image src="/images/461591f9460961b4fbb63836b7509ab3.webp" alt="Admission Process" width={280} height={180} />
                              </div>
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Admission Process
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Learn what to expect during our simple intake and evaluation steps.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="dbh-mega-content dbh-mega-content--image" id="mega-group-104592" role="tabpanel" aria-hidden="true">
                          <div className="dbh-mega-cards dbh-mega-cards--image">
                            <Link className="dbh-mega-card" href="/location-served/usa/drug-rehab/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Drug Rehab
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Compassionate care for substance addiction.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/alcohol/addiction/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Alcohol Rehab
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Professional support for sustainable sobriety.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="dbh-mega-content dbh-mega-content--columns" id="mega-group-104593" role="tabpanel" aria-hidden="true">
                          <div className="dbh-mega-cards dbh-mega-cards--columns">
                            <div className="dbh-mega-col">
                              <p className="dbh-mega-col__heading">
                                Substance Addictions
                              </p>
                              <Link className="dbh-mega-card" href="/location-served/usa/alcohol/addiction/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Alcohol Addiction
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/opioids-addiction-treatment/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Opioid Addiction
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/meth-addiction-treatment/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Meth Addiction
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/cocaine-addiction-treatment/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Cocaine Addiction
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/marijuana-addiction-treatment/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Marijuana Addiction
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/xanax-addiction-treatment/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Xanax Addiction
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/fentanyl-addiction-treatment/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Fentanyl Addiction
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="dbh-mega-content dbh-mega-content--image" id="mega-group-104878" role="tabpanel" aria-hidden="true">
                          <h3 className="dbh-mega-content__heading">
                            Each Phase Targets Immediate Needs
                          </h3>
                          <div className="dbh-mega-cards dbh-mega-cards--image">
                            <Link className="dbh-mega-card" href="/location-served/usa/medical-detox/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Detox
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Safe medical clearance and stabilization.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/residential-substance-use/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Residential Inpatient
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Comprehensive, 24-hour structured care.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/iop-drug-rehab/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Intensive Outpatient Program
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Flexible treatment with therapy sessions.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/php-drug-rehab/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Partial Hospitalization
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Intensive daily treatment while living at home.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/outpatient-drug-rehab/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Outpatient
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Continued group support and therapy.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="dbh-mega-content dbh-mega-content--columns" id="mega-group-104882" role="tabpanel" aria-hidden="true">
                          <div className="dbh-mega-cards dbh-mega-cards--columns">
                            <div className="dbh-mega-col">
                              <p className="dbh-mega-col__heading">
                                Types of Therapy
                              </p>
                              <Link className="dbh-mega-card" href="/location-served/usa/dual-diagnosis-treatment/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Dual Diagnosis
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/dbt-therapy/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    DBT
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/act/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    ACT
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/mat-therapy/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    MAT
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/motivational/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Motivational Interviewing
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/ifs/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    IFS
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/cpt/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    CPT
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                            </div>
                            <div className="dbh-mega-col">
                              <p className="dbh-mega-col__heading"></p>
                              <Link className="dbh-mega-card" href="/location-served/usa/cbt-therapy/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    CBT
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/emdr-therapy/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    EMDR
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/family/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Family Counseling
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="#">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Individual Therapy
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/trauma/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Trauma Informed
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/psycho-dynamic/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Psychodynamic Therapy
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="dbh-mega-blogs">
                        <p className="dbh-mega-blogs__heading">
                          Featured Blogs
                        </p>
                        <Link className="dbh-mega-blog-item" href="/location-served/usa/adderall-addiction-treatment/how-long-in-your-system/">
                          <div className="dbh-mega-blog-item__thumb">
                            <Image src="https://districtbehavioralhealth.com/wp-content/uploads/2026/01/featured-placeholder-bg.png" alt="Adderall/How long in your system" width={80} height={60} />
                          </div>
                          <div className="dbh-mega-blog-item__text">
                            <span className="dbh-mega-blog-item__title">
                              Adderall/How long in your system
                            </span>
                            <span className="dbh-mega-blog-item__arrow" aria-hidden="true">
                              <svg width={16} height={16} viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </span>
                          </div>
                        </Link>
                        <Link className="dbh-mega-blog-item" href="/location-served/usa/adderall-addiction-treatment/withdrawal/">
                          <div className="dbh-mega-blog-item__thumb">
                            <Image src="https://districtbehavioralhealth.com/wp-content/uploads/2026/01/featured-placeholder-bg.png" alt="Adderall/Withdrawal (DrugUse Blog National)" width={80} height={60} />
                          </div>
                          <div className="dbh-mega-blog-item__text">
                            <span className="dbh-mega-blog-item__title">
                              Adderall/Withdrawal (DrugUse Blog National)
                            </span>
                            <span className="dbh-mega-blog-item__arrow" aria-hidden="true">
                              <svg width={16} height={16} viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </span>
                          </div>
                        </Link>
                        <Link className="dbh-mega-blog-item" href="/location-served/usa/alcohol/addiction/">
                          <div className="dbh-mega-blog-item__thumb">
                            <Image src="https://districtbehavioralhealth.com/wp-content/uploads/2026/01/featured-placeholder-bg.png" alt="Alcohol/Addiction (DrugUse Blog National)" width={80} height={60} />
                          </div>
                          <div className="dbh-mega-blog-item__text">
                            <span className="dbh-mega-blog-item__title">
                              Alcohol/Addiction (DrugUse Blog National)
                            </span>
                            <span className="dbh-mega-blog-item__arrow" aria-hidden="true">
                              <svg width={16} height={16} viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dbh-nav__item has-mega-menu">
                  <Link className="dbh-nav__link" href="#" aria-haspopup="true" aria-expanded="false" aria-controls="mm-panel-104837">
                    Mental Health
                    <span className="dbh-nav__caret" aria-hidden="true">
                      <svg width={10} height={6} viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </span>
                  </Link>
                  <div className="dbh-mega-panel" role="region" aria-hidden="true" id="mm-panel-104837">
                    <div className="dbh-mega-panel__inner">
                      <div className="dbh-mega-sidebar">
                        <button className="dbh-mega-tab is-active" data-tab="mega-group-104838" type="button" role="tab" aria-selected="true" aria-controls="mega-group-104838">
                          Mental Wellness
                        </button>
                        <button className="dbh-mega-tab" data-tab="mega-group-104848" type="button" role="tab" aria-selected="false" aria-controls="mega-group-104848">
                          Types of Disorders
                        </button>
                        <button className="dbh-mega-tab" data-tab="mega-group-104854" type="button" role="tab" aria-selected="false" aria-controls="mega-group-104854">
                          Disorders we treat
                        </button>
                        <button className="dbh-mega-tab" data-tab="mega-group-108063" type="button" role="tab" aria-selected="false" aria-controls="mega-group-108063">
                          Treatment Modalities
                        </button>
                      </div>
                      <div className="dbh-mega-panel-body">
                        <div className="dbh-mega-content is-active dbh-mega-content--image" id="mega-group-104838" role="tabpanel" aria-hidden="false">
                          <h3 className="dbh-mega-content__heading">
                            What You Need to Know About
                          </h3>
                          <div className="dbh-mega-cards dbh-mega-cards--image">
                            <Link className="dbh-mega-card dbh-mega-card--image" href="/location-served/usa/mental-health/">
                              <div className="dbh-mega-card__img-wrap">
                                <Image src="/images/a886860a2df42a2bc47aede51230d5dc.webp" alt="What is Mental Health Treatment" width={280} height={180} />
                              </div>
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  What is Mental Health Treatment
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Specialized care for overall emotional wellness.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="dbh-mega-content dbh-mega-content--image" id="mega-group-104848" role="tabpanel" aria-hidden="true">
                          <div className="dbh-mega-cards dbh-mega-cards--image">
                            <Link className="dbh-mega-card" href="/location-served/usa/personality-disorder/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Personality
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Pervasive, ingrained patterns of thinking, feeling, and behaving.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/trauma/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Trauma
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Emotional responses triggered by deeply distressing or painful events.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/anxiety/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Anxiety
                                </span>
                                <span className="dbh-mega-card__excerpt">
                                  Intense feelings of worry or fear impacting daily routines.
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="dbh-mega-content dbh-mega-content--columns" id="mega-group-104854" role="tabpanel" aria-hidden="true">
                          <div className="dbh-mega-cards dbh-mega-cards--columns">
                            <div className="dbh-mega-col">
                              <p className="dbh-mega-col__heading">
                                Mood
                              </p>
                              <Link className="dbh-mega-card" href="/location-served/usa/depression/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Depression
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/bipolar/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Bipolar Disorder
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/antisocial-persnonality/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Antisocial Personality Disorder
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                            </div>
                            <div className="dbh-mega-col">
                              <p className="dbh-mega-col__heading">
                                Psychotic Disorders Treatment
                              </p>
                              <Link className="dbh-mega-card" href="/location-served/usa/schizophrenia/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Schizophrenia
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/schizoaffective-disorder/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Schizoaffective Disorder
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                            </div>
                            <div className="dbh-mega-col">
                              <p className="dbh-mega-col__heading">
                                Trauma
                              </p>
                              <Link className="dbh-mega-card" href="/location-served/usa/ptsd/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    PTSD
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/acute-stress-disorder/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Acute Stress Disorder
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                            </div>
                            <div className="dbh-mega-col">
                              <p className="dbh-mega-col__heading">
                                Anxiety 
                              </p>
                              <Link className="dbh-mega-card" href="/location-served/usa/gad/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Generalized Anxiety Disorder
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/social/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Social Anxiety Disorder
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/panic-disorder/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Panic Disorder
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/obsessive-compulsive/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Obsessive-Compulsive Disorder
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="dbh-mega-content dbh-mega-content--columns" id="mega-group-108063" role="tabpanel" aria-hidden="true">
                          <div className="dbh-mega-cards dbh-mega-cards--columns">
                            <div className="dbh-mega-col">
                              <p className="dbh-mega-col__heading">
                                How We Treat Mental Health
                              </p>
                              <Link className="dbh-mega-card" href="/location-served/usa/dual-diagnosis-treatment/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Dual Diagnosis
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/dbt-therapy/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    DBT
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/act/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    ACT
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/mat-therapy/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    MAT
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/motivational/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Motivational Interviewing
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/ifs/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    IFS
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/cpt/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    CPT
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                            </div>
                            <div className="dbh-mega-col">
                              <p className="dbh-mega-col__heading"></p>
                              <Link className="dbh-mega-card" href="/location-served/usa/cbt-therapy/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    CBT
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/emdr-therapy/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    EMDR
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/family/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Family Counseling
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="#">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Individual Therapy
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/trauma/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Trauma Informed
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                              <Link className="dbh-mega-card" href="/location-served/usa/psycho-dynamic/">
                                <div className="dbh-mega-card__body">
                                  <span className="dbh-mega-card__title">
                                    Psychodynamic Therapy
                                  </span>
                                  <span className="dbh-mega-card__arrow" aria-hidden="true">
                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                      <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </span>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="dbh-mega-blogs">
                        <p className="dbh-mega-blogs__heading">
                          Featured Blogs
                        </p>
                        <Link className="dbh-mega-blog-item" href="/location-served/usa/ativan-lorazepam/how-long-in-your-system/">
                          <div className="dbh-mega-blog-item__thumb">
                            <Image src="https://districtbehavioralhealth.com/wp-content/uploads/2026/01/featured-placeholder-bg.png" alt="Ativan (Lorazepam)/ How long in your system" width={80} height={60} />
                          </div>
                          <div className="dbh-mega-blog-item__text">
                            <span className="dbh-mega-blog-item__title">
                              Ativan (Lorazepam)/ How long in your...
                            </span>
                            <span className="dbh-mega-blog-item__arrow" aria-hidden="true">
                              <svg width={16} height={16} viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </span>
                          </div>
                        </Link>
                        <Link className="dbh-mega-blog-item" href="/location-served/usa/adderall-addiction-treatment/how-long-in-your-system/">
                          <div className="dbh-mega-blog-item__thumb">
                            <Image src="https://districtbehavioralhealth.com/wp-content/uploads/2026/01/featured-placeholder-bg.png" alt="Adderall/How long in your system" width={80} height={60} />
                          </div>
                          <div className="dbh-mega-blog-item__text">
                            <span className="dbh-mega-blog-item__title">
                              Adderall/How long in your system
                            </span>
                            <span className="dbh-mega-blog-item__arrow" aria-hidden="true">
                              <svg width={16} height={16} viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </span>
                          </div>
                        </Link>
                        <Link className="dbh-mega-blog-item" href="/location-served/usa/alcohol/how-long-in-your-system/">
                          <div className="dbh-mega-blog-item__thumb">
                            <Image src="https://districtbehavioralhealth.com/wp-content/uploads/2026/01/featured-placeholder-bg.png" alt="Alcohol/how long in your system" width={80} height={60} />
                          </div>
                          <div className="dbh-mega-blog-item__text">
                            <span className="dbh-mega-blog-item__title">
                              Alcohol/how long in your system
                            </span>
                            <span className="dbh-mega-blog-item__arrow" aria-hidden="true">
                              <svg width={16} height={16} viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dbh-nav__item has-mega-menu">
                  <Link className="dbh-nav__link" href="#" aria-haspopup="true" aria-expanded="false" aria-controls="mm-panel-108075">
                    Resources
                    <span className="dbh-nav__caret" aria-hidden="true">
                      <svg width={10} height={6} viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </span>
                  </Link>
                  <div className="dbh-mega-panel" role="region" aria-hidden="true" id="mm-panel-108075">
                    <div className="dbh-mega-panel__inner">
                      <div className="dbh-mega-sidebar">
                        <button className="dbh-mega-tab is-active" data-tab="mega-group-108076" type="button" role="tab" aria-selected="true" aria-controls="mega-group-108076">
                          Tests
                        </button>
                        <button className="dbh-mega-tab" data-tab="mega-group-108083" type="button" role="tab" aria-selected="false" aria-controls="mega-group-108083">
                          Drugs
                        </button>
                      </div>
                      <div className="dbh-mega-panel-body">
                        <div className="dbh-mega-content is-active dbh-mega-content--plain" id="mega-group-108076" role="tabpanel" aria-hidden="false">
                          <h3 className="dbh-mega-content__heading">
                            Self-Assessments
                          </h3>
                          <div className="dbh-mega-cards dbh-mega-cards--plain">
                            <Link className="dbh-mega-card" href="/quiz/bipolar-disorder/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Bipolar Disorder Test
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/quiz/bipolar-disorder-dsm5/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  DSM-5 for Bipolar Disorder
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/quiz/ptsd-checklist-civilian/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  PTSD Test
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/quiz/anxiety-worry-7/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Anxiety Test
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/quiz/am-i-addicted">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Addiction Test
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/quiz/am-i-alcoholic">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Alcohol Test
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/quiz/generalized-anxiety-disorder-screening/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Generalized Anxiety Disorder Test
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="dbh-mega-content dbh-mega-content--plain" id="mega-group-108083" role="tabpanel" aria-hidden="true">
                          <h3 className="dbh-mega-content__heading">
                            Drug Index
                          </h3>
                          <div className="dbh-mega-cards dbh-mega-cards--plain">
                            <Link className="dbh-mega-card" href="/location-served/usa/adderall-addiction-treatment/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Adderal
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/ativan-addiction-treatment/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Ativan
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/bath-salts-addiction-treatment/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Bath Salts
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/crack-cocaine/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Crack Cocaine
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/fentanyl-addiction-treatment/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Fentanyl
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/heroin-addiction-treatment/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Heroin
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/ketamine-addiction-treatment/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Ketamine
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/opioids-addiction-treatment/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Opioid
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                            <Link className="dbh-mega-card" href="/location-served/usa/xanax-addiction-treatment/">
                              <div className="dbh-mega-card__body">
                                <span className="dbh-mega-card__title">
                                  Xanax
                                </span>
                                <span className="dbh-mega-card__arrow" aria-hidden="true">
                                  <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="dbh-nav__item">
                  <Link className="dbh-nav__link" href="/blogs/">
                    Blog
                  </Link>
                </li>
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
                <Link className="elementor-icon" href="#elementor-action%3Aaction%3Dpopup%3Aopen%26settings%3DeyJpZCI6IjEwNDkxMyIsInRvZ2dsZSI6ZmFsc2V9">
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
</header>
      {children}
<footer className="elementor elementor-117 elementor-location-footer">
  <div className="elementor-element elementor-element-f7771bd e-flex e-con-boxed e-con e-parent">
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
          <div className="elementor-element elementor-element-7fdb839 elementor-shape-circle e-grid-align-left e-grid-align-mobile-center elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-grid-0 elementor-widget elementor-widget-social-icons" data-widget_type="social-icons.default">
            <div className="elementor-widget-container">
              <div className="elementor-social-icons-wrapper elementor-grid" role="list">
                <span className="elementor-grid-item" role="listitem">
                  <a className="elementor-icon elementor-social-icon elementor-social-icon-facebook elementor-repeater-item-bcc1624" target="_blank" rel="noopener noreferrer">
                    <span className="elementor-screen-only">
                      Facebook
                    </span>
                    <svg aria-hidden="true" className="e-font-icon-svg e-fab-facebook" viewBox="0 0 512 512">
                      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                    </svg>
                  </a>
                </span>
                <span className="elementor-grid-item" role="listitem">
                  <a className="elementor-icon elementor-social-icon elementor-social-icon-instagram elementor-repeater-item-6176874" target="_blank" rel="noopener noreferrer">
                    <span className="elementor-screen-only">
                      Instagram
                    </span>
                    <svg aria-hidden="true" className="e-font-icon-svg e-fab-instagram" viewBox="0 0 448 512">
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                    </svg>
                  </a>
                </span>
                <span className="elementor-grid-item" role="listitem">
                  <a className="elementor-icon elementor-social-icon elementor-social-icon-youtube elementor-repeater-item-3d3535c" target="_blank" rel="noopener noreferrer">
                    <span className="elementor-screen-only">
                      Youtube
                    </span>
                    <svg aria-hidden="true" className="e-font-icon-svg e-fab-youtube" viewBox="0 0 576 512">
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                    </svg>
                  </a>
                </span>
                <span className="elementor-grid-item" role="listitem">
                  <a className="elementor-icon elementor-social-icon elementor-social-icon-linkedin-in elementor-repeater-item-3da2b8a" target="_blank" rel="noopener noreferrer">
                    <span className="elementor-screen-only">
                      Linkedin-in
                    </span>
                    <svg aria-hidden="true" className="e-font-icon-svg e-fab-linkedin-in" viewBox="0 0 448 512">
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                    </svg>
                  </a>
                </span>
                <span className="elementor-grid-item" role="listitem">
                  <a className="elementor-icon elementor-social-icon elementor-social-icon-twitter elementor-repeater-item-dd7d172" target="_blank" rel="noopener noreferrer">
                    <span className="elementor-screen-only">
                      Twitter
                    </span>
                    <svg aria-hidden="true" className="e-font-icon-svg e-fab-twitter" viewBox="0 0 512 512">
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                    </svg>
                  </a>
                </span>
              </div>
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
                  <Image src="/images/67df4626d6e86bef3a91cd0427f1dc4d.webp" alt="" width={227} height={103} className="attachment-full size-full wp-image-1250" />
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
    </>
  );
}
