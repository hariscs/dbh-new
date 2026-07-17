import Image from "next/image";
import Link from "next/link";

// Shared primary navigation, rendered by both Header (desktop) and MobileMenu
// (off-canvas). idSuffix keeps popup ids unique between the two renders;
// withBack adds the mobile submenu "Back" buttons.
export default function PrimaryNav({ idSuffix = "", withBack = false }: { idSuffix?: string; withBack?: boolean }) {
  return (
    <>
                    <li className="dbh-nav__item has-mega-menu">
                      <Link className="dbh-nav__link" href="#" aria-haspopup="true" aria-expanded="false" aria-controls={`mm-panel-104566${idSuffix}`}>
                        About
                        <span className="dbh-nav__caret" aria-hidden="true">
                          <svg width={10} height={6} viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </span>
                      </Link>
                      <div className="dbh-mega-panel" role="region" aria-hidden="true" id={`mm-panel-104566${idSuffix}`}>
                        <div className="dbh-mega-panel__inner">
                          {withBack && (
                          <button type="button" className="dbh-megaback" aria-label="Back">
                            <svg width={18} height={18} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            Back
                          </button>
                          )}
                          <div className="dbh-mega-sidebar">
                            <button className="dbh-mega-tab is-active" data-tab={`mega-group-104567${idSuffix}`} type="button" role="tab" aria-selected="true" aria-controls={`mega-group-104567${idSuffix}`}>
                              About Us
                            </button>
                            <button className="dbh-mega-tab" data-tab={`mega-group-104571${idSuffix}`} type="button" role="tab" aria-selected="false" aria-controls={`mega-group-104571${idSuffix}`}>
                              Community
                            </button>
                          </div>
                          <div className="dbh-mega-panel-body">
                            <div className="dbh-mega-content is-active dbh-mega-content--image" id={`mega-group-104567${idSuffix}`} role="tabpanel" aria-hidden="false">
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
                            <div className="dbh-mega-content dbh-mega-content--image" id={`mega-group-104571${idSuffix}`} role="tabpanel" aria-hidden="true">
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
                      <Link className="dbh-nav__link" href="#" aria-haspopup="true" aria-expanded="false" aria-controls={`mm-panel-104576${idSuffix}`}>
                        Addiction Programs
                        <span className="dbh-nav__caret" aria-hidden="true">
                          <svg width={10} height={6} viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </span>
                      </Link>
                      <div className="dbh-mega-panel" role="region" aria-hidden="true" id={`mm-panel-104576${idSuffix}`}>
                        <div className="dbh-mega-panel__inner">
                          {withBack && (
                          <button type="button" className="dbh-megaback" aria-label="Back">
                            <svg width={18} height={18} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            Back
                          </button>
                          )}
                          <div className="dbh-mega-sidebar">
                            <button className="dbh-mega-tab is-active" data-tab={`mega-group-104591${idSuffix}`} type="button" role="tab" aria-selected="true" aria-controls={`mega-group-104591${idSuffix}`}>
                              Addiction Recovery
                            </button>
                            <button className="dbh-mega-tab" data-tab={`mega-group-104592${idSuffix}`} type="button" role="tab" aria-selected="false" aria-controls={`mega-group-104592${idSuffix}`}>
                              Addiction Rehab
                            </button>
                            <button className="dbh-mega-tab" data-tab={`mega-group-104593${idSuffix}`} type="button" role="tab" aria-selected="false" aria-controls={`mega-group-104593${idSuffix}`}>
                              What We Treat
                            </button>
                            <button className="dbh-mega-tab" data-tab={`mega-group-104878${idSuffix}`} type="button" role="tab" aria-selected="false" aria-controls={`mega-group-104878${idSuffix}`}>
                              Treatment Phases
                            </button>
                            <button className="dbh-mega-tab" data-tab={`mega-group-104882${idSuffix}`} type="button" role="tab" aria-selected="false" aria-controls={`mega-group-104882${idSuffix}`}>
                              Treatment Modalities
                            </button>
                          </div>
                          <div className="dbh-mega-panel-body">
                            <div className="dbh-mega-content is-active dbh-mega-content--image" id={`mega-group-104591${idSuffix}`} role="tabpanel" aria-hidden="false">
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
                            <div className="dbh-mega-content dbh-mega-content--image" id={`mega-group-104592${idSuffix}`} role="tabpanel" aria-hidden="true">
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
                            <div className="dbh-mega-content dbh-mega-content--columns" id={`mega-group-104593${idSuffix}`} role="tabpanel" aria-hidden="true">
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
                            <div className="dbh-mega-content dbh-mega-content--image" id={`mega-group-104878${idSuffix}`} role="tabpanel" aria-hidden="true">
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
                            <div className="dbh-mega-content dbh-mega-content--columns" id={`mega-group-104882${idSuffix}`} role="tabpanel" aria-hidden="true">
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
                                <Image src="/wp-content/uploads/2026/01/featured-placeholder-bg.png" alt="Adderall/How long in your system" width={80} height={60} />
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
                                <Image src="/wp-content/uploads/2026/01/featured-placeholder-bg.png" alt="Adderall/Withdrawal (DrugUse Blog National)" width={80} height={60} />
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
                                <Image src="/wp-content/uploads/2026/01/featured-placeholder-bg.png" alt="Alcohol/Addiction (DrugUse Blog National)" width={80} height={60} />
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
                      <Link className="dbh-nav__link" href="#" aria-haspopup="true" aria-expanded="false" aria-controls={`mm-panel-104837${idSuffix}`}>
                        Mental Health
                        <span className="dbh-nav__caret" aria-hidden="true">
                          <svg width={10} height={6} viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </span>
                      </Link>
                      <div className="dbh-mega-panel" role="region" aria-hidden="true" id={`mm-panel-104837${idSuffix}`}>
                        <div className="dbh-mega-panel__inner">
                          {withBack && (
                          <button type="button" className="dbh-megaback" aria-label="Back">
                            <svg width={18} height={18} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            Back
                          </button>
                          )}
                          <div className="dbh-mega-sidebar">
                            <button className="dbh-mega-tab is-active" data-tab={`mega-group-104838${idSuffix}`} type="button" role="tab" aria-selected="true" aria-controls={`mega-group-104838${idSuffix}`}>
                              Mental Wellness
                            </button>
                            <button className="dbh-mega-tab" data-tab={`mega-group-104848${idSuffix}`} type="button" role="tab" aria-selected="false" aria-controls={`mega-group-104848${idSuffix}`}>
                              Types of Disorders
                            </button>
                            <button className="dbh-mega-tab" data-tab={`mega-group-104854${idSuffix}`} type="button" role="tab" aria-selected="false" aria-controls={`mega-group-104854${idSuffix}`}>
                              Disorders we treat
                            </button>
                            <button className="dbh-mega-tab" data-tab={`mega-group-108063${idSuffix}`} type="button" role="tab" aria-selected="false" aria-controls={`mega-group-108063${idSuffix}`}>
                              Treatment Modalities
                            </button>
                          </div>
                          <div className="dbh-mega-panel-body">
                            <div className="dbh-mega-content is-active dbh-mega-content--image" id={`mega-group-104838${idSuffix}`} role="tabpanel" aria-hidden="false">
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
                            <div className="dbh-mega-content dbh-mega-content--image" id={`mega-group-104848${idSuffix}`} role="tabpanel" aria-hidden="true">
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
                            <div className="dbh-mega-content dbh-mega-content--columns" id={`mega-group-104854${idSuffix}`} role="tabpanel" aria-hidden="true">
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
                            <div className="dbh-mega-content dbh-mega-content--columns" id={`mega-group-108063${idSuffix}`} role="tabpanel" aria-hidden="true">
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
                                <Image src="/wp-content/uploads/2026/01/featured-placeholder-bg.png" alt="Ativan (Lorazepam)/ How long in your system" width={80} height={60} />
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
                                <Image src="/wp-content/uploads/2026/01/featured-placeholder-bg.png" alt="Adderall/How long in your system" width={80} height={60} />
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
                                <Image src="/wp-content/uploads/2026/01/featured-placeholder-bg.png" alt="Alcohol/how long in your system" width={80} height={60} />
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
                      <Link className="dbh-nav__link" href="#" aria-haspopup="true" aria-expanded="false" aria-controls={`mm-panel-108075${idSuffix}`}>
                        Resources
                        <span className="dbh-nav__caret" aria-hidden="true">
                          <svg width={10} height={6} viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="#006CAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </span>
                      </Link>
                      <div className="dbh-mega-panel" role="region" aria-hidden="true" id={`mm-panel-108075${idSuffix}`}>
                        <div className="dbh-mega-panel__inner">
                          {withBack && (
                          <button type="button" className="dbh-megaback" aria-label="Back">
                            <svg width={18} height={18} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            Back
                          </button>
                          )}
                          <div className="dbh-mega-sidebar">
                            <button className="dbh-mega-tab is-active" data-tab={`mega-group-108076${idSuffix}`} type="button" role="tab" aria-selected="true" aria-controls={`mega-group-108076${idSuffix}`}>
                              Tests
                            </button>
                            <button className="dbh-mega-tab" data-tab={`mega-group-108083${idSuffix}`} type="button" role="tab" aria-selected="false" aria-controls={`mega-group-108083${idSuffix}`}>
                              Drugs
                            </button>
                          </div>
                          <div className="dbh-mega-panel-body">
                            <div className="dbh-mega-content is-active dbh-mega-content--plain" id={`mega-group-108076${idSuffix}`} role="tabpanel" aria-hidden="false">
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
                            <div className="dbh-mega-content dbh-mega-content--plain" id={`mega-group-108083${idSuffix}`} role="tabpanel" aria-hidden="true">
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
                  </>
  );
}
