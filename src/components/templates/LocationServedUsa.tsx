import React from 'react';
import Image from 'next/image';
import { TrustIndexWidget } from '@/components/TrustIndexWidget';
import Link from 'next/link';

export default function LocationServedUsa(props: Record<string, string>) {
  const geo = props.geo ?? "National";
  const topic_1 = props.topic_1 ?? "Sober Living";
  const topic_2 = props.topic_2 ?? "Housing";
  const address_county = props.address_county ?? "Orange County";
  const outpatient_facilities___number = props.outpatient_facilities___number ?? "1";
  const high_rated_facilities___min_rating = props.high_rated_facilities___min_rating ?? "4";
  const facilities_that_accept_private_insurance___number = props.facilities_that_accept_private_insurance___number ?? "2";
  return (
    <>
    <div className="wp-singular page-template-default page page-id-1795 page-child parent-pageid-1737 wp-custom-logo wp-embed-responsive wp-theme-hello-elementor wp-child-theme-hello-theme-child-master hello-elementor-default elementor-default elementor-kit-7 elementor-page elementor-page-1795 elementor-page-691 e--ua-blink e--ua-chrome e--ua-mac e--ua-webkit">
  <Link className="skip-link screen-reader-text" href="#content">
    Skip to content
  </Link>
  <div className="elementor elementor-691 elementor-location-single post-1795 page type-page status-publish hentry geo-national intent-high marketing-channel-seo template-cro1-national-rehab template-national-rehab topic-sober-living">
    <div className="elementor-element elementor-element-3265a60 e-con-full e-flex e-con e-parent e-lazyloaded">
      <div className="elementor-element elementor-element-2b719a94 e-con-full e-flex e-con e-child" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}"></div>
      <div className="elementor-element elementor-element-54271bbe e-con-full e-flex e-con e-child" data-settings="{&quot;background_background&quot;:&quot;gradient&quot;}">
        <div className="elementor-element elementor-element-31452f54 e-flex e-con-boxed e-con e-child">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-4e779022 e-con-full elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile e-flex e-con e-child">
              <div className="elementor-element elementor-element-4f8f4afc elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                <div className="elementor-widget-container">
                  <div className="elementor-heading-title elementor-size-default">
                    <Link href="#">
                      Inpatient Alcohol Rehab Treatment
                    </Link>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-7861a6e2 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                <div className="elementor-widget-container">
                  <div className="elementor-heading-title elementor-size-default">
                    <Link href="#">
                      Outpatient Alcohol Rehab Treatment
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-6dbead9d e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-2a5cde22 elementor-widget__width-initial elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                <div className="elementor-widget-container">
                  <h1 className="elementor-heading-title elementor-size-default">
                    Best {topic_1} {topic_2} Across the Country (Highly Reviewed & Awarded)
                  </h1>
                </div>
              </div>
              <div className="elementor-element elementor-element-36f8cf6d e-con-full e-flex e-con e-child">
                <div className="elementor-element elementor-element-18ef9379 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                  <div className="elementor-widget-container">
                    <h6 className="elementor-heading-title elementor-size-default">
                      We understand recovery, we can help
                    </h6>
                  </div>
                </div>
                <div className="elementor-element elementor-element-54849060 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-widget_type="icon-list.default">
                  <div className="elementor-widget-container">
                    <ul className="elementor-icon-list-items">
                      <li className="elementor-icon-list-item">
                        <span className="elementor-icon-list-icon">
                          <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_608_3003" style={{"maskType":"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width={24} height={24}>
                              <rect width={24} height={24} fill="url(#pattern0_608_3003)"></rect>
                            </mask>
                            <g mask="url(#mask0_608_3003)">
                              <rect width={24} height={24} fill="#2E6AA1"></rect>
                            </g>
                            <defs>
                              <pattern id="pattern0_608_3003" patternContentUnits="objectBoundingBox" width={1} height={1}>
                                <use href="#image0_608_3003" transform="scale(0.00195312)"></use>
                              </pattern>
                              <image id="image0_608_3003" width={512} height={512} preserveAspectRatio="none" href="data:image/png;base64,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"></image>
                            </defs>
                          </svg>
                        </span>
                        <span className="elementor-icon-list-text">
                          Personalized, Addiction Treatment Programs for Every Individual
                        </span>
                      </li>
                      <li className="elementor-icon-list-item">
                        <span className="elementor-icon-list-icon">
                          <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_608_3003" style={{"maskType":"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width={24} height={24}>
                              <rect width={24} height={24} fill="url(#pattern0_608_3003)"></rect>
                            </mask>
                            <g mask="url(#mask0_608_3003)">
                              <rect width={24} height={24} fill="#2E6AA1"></rect>
                            </g>
                            <defs>
                              <pattern id="pattern0_608_3003" patternContentUnits="objectBoundingBox" width={1} height={1}>
                                <use href="#image0_608_3003" transform="scale(0.00195312)"></use>
                              </pattern>
                              <image id="image0_608_3003" width={512} height={512} preserveAspectRatio="none" href="data:image/png;base64,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"></image>
                            </defs>
                          </svg>
                        </span>
                        <span className="elementor-icon-list-text">
                          Masters-level addiction therapists
                        </span>
                      </li>
                      <li className="elementor-icon-list-item">
                        <span className="elementor-icon-list-icon">
                          <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_608_3003" style={{"maskType":"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width={24} height={24}>
                              <rect width={24} height={24} fill="url(#pattern0_608_3003)"></rect>
                            </mask>
                            <g mask="url(#mask0_608_3003)">
                              <rect width={24} height={24} fill="#2E6AA1"></rect>
                            </g>
                            <defs>
                              <pattern id="pattern0_608_3003" patternContentUnits="objectBoundingBox" width={1} height={1}>
                                <use href="#image0_608_3003" transform="scale(0.00195312)"></use>
                              </pattern>
                              <image id="image0_608_3003" width={512} height={512} preserveAspectRatio="none" href="data:image/png;base64,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"></image>
                            </defs>
                          </svg>
                        </span>
                        <span className="elementor-icon-list-text">
                          In network with most major insurances
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-77d9cb61 e-con-full e-flex e-con e-child">
                <div className="elementor-element elementor-element-15d8fbfe elementor-align-justify elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button" data-widget_type="button.default">
                  <div className="elementor-widget-container">
                    <div className="elementor-button-wrapper">
                      <Link className="elementor-button elementor-button-link elementor-size-sm" href="tel:+18887020484">
                        <span className="elementor-button-content-wrapper">
                          <span className="elementor-button-text">
                            Call Now! 888-702-0484
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-8530d02 elementor-align-justify elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button" data-widget_type="button.default">
                  <div className="elementor-widget-container">
                    <div className="elementor-button-wrapper">
                      <Link className="elementor-button elementor-button-link elementor-size-sm" href="#verifyinsurance">
                        <span className="elementor-button-content-wrapper">
                          <span className="elementor-button-text">
                            Verify Your Insurance
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-ff264c6 e-con-full elementor-hidden-mobile e-flex e-con e-child">
                <div className="elementor-element elementor-element-bcef4d2 elementor-author-box--align-left elementor-author-box--image-valign-middle elementor-widget__width-initial elementor-widget-mobile__width-auto author-box-sty elementor-author-box--layout-image-left elementor-widget elementor-widget-author-box" data-widget_type="author-box.default">
                  <div className="elementor-widget-container">
                    <div className="elementor-author-box">
                      <div className="elementor-author-box__avatar">
                        <Image src="/images/32bb7764615883c955b3c78a736e9f39.webp" alt="Picture of Written By:" width={0} height={0} sizes="100vw" style={{width:"100%",height:"auto"}} />
                      </div>
                      <div className="elementor-author-box__text">
                        <div>
                          <h6 className="elementor-author-box__name">
                            
							Written By:						
                          </h6>
                        </div>
                        <div className="elementor-author-box__bio">
                          <p>
                            Matthew D'Ursov
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-8ad9eb9 elementor-author-box--align-left elementor-author-box--image-valign-middle elementor-widget__width-initial elementor-widget-mobile__width-auto author-box-sty elementor-author-box--layout-image-left elementor-widget elementor-widget-author-box" data-widget_type="author-box.default">
                  <div className="elementor-widget-container">
                    <div className="elementor-author-box">
                      <div className="elementor-author-box__avatar">
                        <Image src="/images/1b4eb31b1adebde15844d794a2ee8066.webp" alt="Picture of Content Manager:" width={0} height={0} sizes="100vw" style={{width:"100%",height:"auto"}} />
                      </div>
                      <div className="elementor-author-box__text">
                        <div>
                          <h6 className="elementor-author-box__name">
                            
							Content Manager:						
                          </h6>
                        </div>
                        <div className="elementor-author-box__bio">
                          <p>
                            Amy Leifeste
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="elementor-element elementor-element-d5e1e1c elementor-author-box--align-left elementor-author-box--image-valign-middle elementor-widget__width-initial author-box-sty elementor-widget-mobile__width-auto elementor-author-box--layout-image-left elementor-widget elementor-widget-author-box" data-widget_type="author-box.default">
                  <div className="elementor-widget-container">
                    <div className="elementor-author-box">
                      <div className="elementor-author-box__avatar">
                        <Image src="/images/25adee1fd5544ebff212e174110a1b67.webp" alt="Picture of Editor:" width={0} height={0} sizes="100vw" style={{width:"100%",height:"auto"}} />
                      </div>
                      <div className="elementor-author-box__text">
                        <div>
                          <h6 className="elementor-author-box__name">
                            
							Editor:						
                          </h6>
                        </div>
                        <div className="elementor-author-box__bio">
                          <p>
                            Karena Mathis
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="elementor-element elementor-element-7e0b1ab e-con-full e-flex e-con e-child">
                <div className="elementor-element elementor-element-5dba14d4 e-grid e-con-full e-con e-child">
                  <div className="elementor-element elementor-element-2cd4513e elementor-widget elementor-widget-image" data-widget_type="image.default">
                    <div className="elementor-widget-container">
                      <Image src="/images/3ee7622f2e77a59f5c8add560eb52bfd.webp" alt="" width={95} height={90} className="attachment-thumbnail size-thumbnail wp-image-696" />
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-202b9bf1 elementor-widget elementor-widget-image" data-widget_type="image.default">
                    <div className="elementor-widget-container">
                      <Image src="/images/69ac0757806e7f834cdcef7f946e2e29.webp" alt="" width={83} height={90} className="attachment-thumbnail size-thumbnail wp-image-697" />
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-78eced78 elementor-widget elementor-widget-image" data-widget_type="image.default">
                    <div className="elementor-widget-container">
                      <Image src="/images/c3ecdd7397a8a80001151ad015d0efd2.webp" alt="" width={103} height={90} className="attachment-thumbnail size-thumbnail wp-image-698" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="elementor-element elementor-element-57830ff4 table-of-content-headings e-flex e-con-boxed e-con e-parent e-lazyloaded">
      <div className="e-con-inner">
        <div className="elementor-element elementor-element-5362f2f6 e-con-full e-flex e-con e-child">
          <div className="elementor-element elementor-element-28fe4158 table-of-content-sty elementor-toc--content-ellipsis elementor-widget elementor-widget-table-of-contents" data-settings="{&quot;headings_by_tags&quot;:[&quot;h2&quot;,&quot;h3&quot;],&quot;exclude_headings_by_selector&quot;:[],&quot;no_headings_message&quot;:&quot;No headings were found on this page.&quot;,&quot;container&quot;:&quot;.table-of-content-headings&quot;,&quot;marker_view&quot;:&quot;numbers&quot;,&quot;hierarchical_view&quot;:&quot;yes&quot;,&quot;min_height&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;min_height_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;min_height_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]}}" data-widget_type="table-of-contents.default">
            <div className="elementor-widget-container">
              <div className="elementor-toc__header">
                <h4 className="elementor-toc__header-title">
                  
				Table of Contents			
                </h4>
              </div>
              <div id="elementor-toc__28fe4158" className="elementor-toc__body">
                <ol className="elementor-toc__list-wrapper">
                  <li className="elementor-toc__list-item">
                    <div className="elementor-toc__list-item-text-wrapper">
                      <Link href="#elementor-toc__heading-anchor-0" className="elementor-toc__list-item-text elementor-toc__top-level">
                        {topic_1} Homes for Addiction Recovery
                      </Link>
                    </div>
                  </li>
                  <li className="elementor-toc__list-item">
                    <div className="elementor-toc__list-item-text-wrapper">
                      <Link href="#elementor-toc__heading-anchor-1" className="elementor-toc__list-item-text elementor-toc__top-level">
                        Structured {topic_1} Programs at District Behavioral Health
                      </Link>
                    </div>
                  </li>
                  <li className="elementor-toc__list-item">
                    <div className="elementor-toc__list-item-text-wrapper">
                      <Link href="#elementor-toc__heading-anchor-2" className="elementor-toc__list-item-text elementor-toc__top-level">
                        What Is {topic_1}?
                      </Link>
                    </div>
                    <ol className="elementor-toc__list-wrapper">
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-3" className="elementor-toc__list-item-text">
                            Who Benefits Most from {topic_1}?
                          </Link>
                        </div>
                      </li>
                    </ol>
                  </li>
                  <li className="elementor-toc__list-item">
                    <div className="elementor-toc__list-item-text-wrapper">
                      <Link href="#elementor-toc__heading-anchor-4" className="elementor-toc__list-item-text elementor-toc__top-level">
                        The Role of {topic_1} in Long-Term Recovery
                      </Link>
                    </div>
                    <ol className="elementor-toc__list-wrapper">
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-5" className="elementor-toc__list-item-text">
                            Why Transitional Living After Rehab Matters
                          </Link>
                        </div>
                      </li>
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-6" className="elementor-toc__list-item-text">
                            Accountability, Structure, and Peer Support
                          </Link>
                        </div>
                      </li>
                    </ol>
                  </li>
                  <li className="elementor-toc__list-item">
                    <div className="elementor-toc__list-item-text-wrapper">
                      <Link href="#elementor-toc__heading-anchor-7" className="elementor-toc__list-item-text elementor-toc__top-level">
                        What to Expect in a {topic_1} Home
                      </Link>
                    </div>
                    <ol className="elementor-toc__list-wrapper">
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-8" className="elementor-toc__list-item-text elementor-item-active">
                            Daily Structure and Responsibilities
                          </Link>
                        </div>
                      </li>
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-9" className="elementor-toc__list-item-text">
                            Balancing Work, Therapy, and Recovery
                          </Link>
                        </div>
                      </li>
                    </ol>
                  </li>
                  <li className="elementor-toc__list-item">
                    <div className="elementor-toc__list-item-text-wrapper">
                      <Link href="#elementor-toc__heading-anchor-10" className="elementor-toc__list-item-text elementor-toc__top-level">
                        Types of {topic_1} Arrangements
                      </Link>
                    </div>
                    <ol className="elementor-toc__list-wrapper">
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-11" className="elementor-toc__list-item-text">
                            Men’s and Women’s {topic_1} Homes
                          </Link>
                        </div>
                      </li>
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-12" className="elementor-toc__list-item-text">
                            {topic_1} with Outpatient Treatment
                          </Link>
                        </div>
                      </li>
                    </ol>
                  </li>
                  <li className="elementor-toc__list-item">
                    <div className="elementor-toc__list-item-text-wrapper">
                      <Link href="#elementor-toc__heading-anchor-13" className="elementor-toc__list-item-text elementor-toc__top-level">
                        Building Stability and Independence
                      </Link>
                    </div>
                    <ol className="elementor-toc__list-wrapper">
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-14" className="elementor-toc__list-item-text">
                            Developing Life Skills and Relapse Prevention
                          </Link>
                        </div>
                      </li>
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-15" className="elementor-toc__list-item-text">
                            How Long Should You Stay in {topic_1}?
                          </Link>
                        </div>
                      </li>
                    </ol>
                  </li>
                  <li className="elementor-toc__list-item">
                    <div className="elementor-toc__list-item-text-wrapper">
                      <Link href="#elementor-toc__heading-anchor-16" className="elementor-toc__list-item-text elementor-toc__top-level">
                        FAQs
                      </Link>
                    </div>
                    <ol className="elementor-toc__list-wrapper">
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-17" className="elementor-toc__list-item-text">
                            What is sober living?
                          </Link>
                        </div>
                      </li>
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-18" className="elementor-toc__list-item-text">
                            How long should you stay in sober living?
                          </Link>
                        </div>
                      </li>
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-19" className="elementor-toc__list-item-text">
                            What are the rules in sober living homes?
                          </Link>
                        </div>
                      </li>
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-20" className="elementor-toc__list-item-text">
                            Does insurance cover sober living?
                          </Link>
                        </div>
                      </li>
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-21" className="elementor-toc__list-item-text">
                            What is the difference between sober living and a halfway house?
                          </Link>
                        </div>
                      </li>
                      <li className="elementor-toc__list-item">
                        <div className="elementor-toc__list-item-text-wrapper">
                          <Link href="#elementor-toc__heading-anchor-22" className="elementor-toc__list-item-text">
                            Who should consider sober living after rehab?
                          </Link>
                        </div>
                      </li>
                    </ol>
                  </li>
                  <li className="elementor-toc__list-item">
                    <div className="elementor-toc__list-item-text-wrapper">
                      <Link href="#elementor-toc__heading-anchor-23" className="elementor-toc__list-item-text elementor-toc__top-level">
                        Explore {topic_1} Options at District Behavioral Health
                      </Link>
                    </div>
                  </li>
                  <li className="elementor-toc__list-item">
                    <div className="elementor-toc__list-item-text-wrapper">
                      <Link href="#elementor-toc__heading-anchor-24" className="elementor-toc__list-item-text elementor-toc__top-level">
                        Sources:
                      </Link>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-element elementor-element-75f574f5 e-con-full e-flex e-con e-child">
          <div className="elementor-element elementor-element-309b4571 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
            <div className="elementor-widget-container">
              <h2 className="elementor-heading-title elementor-size-default">{props.h2___head ?? "{topic_1} Homes for Addiction Recovery"}</h2>
            </div>
          </div>
          <div className="elementor-element elementor-element-5e511adb elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
            <div className="elementor-widget-container">
              <p>
                Are you stepping out of treatment and wondering how to hold on to everything you’ve worked so hard to build? Early recovery is one of the most vulnerable phases of the entire journey, and the gap between a structured program and independent living can feel 
                <strong>
                  disorienting, isolating, and destabilizing
                </strong>
                . Sober living exists to bridge that gap, but choosing the right environment matters more than most people realize. Here’s what we hear most:
              </p>
              <ul>
                <li>
                  <p>
                    What if I’m not strong enough to stay sober without 24/7 clinical support?
                  </p>
                </li>
                <li>
                  <p>
                    Will the people in the house actually support my recovery, or undermine it?
                  </p>
                </li>
                <li>
                  <p>
                    What if I struggle with the rules and structure?
                  </p>
                </li>
                <li>
                  <p>
                    Can I afford sober living while I’m getting back on my feet?
                  </p>
                </li>
              </ul>
              <p>
                These are honest, grounded fears, and asking these questions means you understand what’s at stake. You deserve a sober living environment that is 
                <strong>
                  accountable, genuinely supportive, and structured enough to protect your recovery without feeling like a cage
                </strong>
                .
              </p>
              <p>
                At 
                <Link href="/">
                  District Behavioral Health Group
                </Link>
                , we understand that recovery evolves rather than ending at discharge. Our sober living program provides a peer-supported, clinician-informed environment where residents hold each other accountable and build the practical life skills that sustain long-term sobriety. Structure, community, and dignity coexist to promote long-term recovery.
              </p>
              <p>
                Read more below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="elementor-element elementor-element-49f1055 e-con-full e-flex e-con e-parent">
      <div className="elementor-element elementor-element-5207043 elementor-widget elementor-widget-shortcode" data-widget_type="shortcode.default">
        <div className="elementor-widget-container">
          <div className="elementor-shortcode">
            <div className="elementor elementor-1260">
              <div className="elementor-element elementor-element-25a89314 addiction-care-cta-v1-section e-flex e-con-boxed e-con e-parent" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                <div className="e-con-inner">
                  <div className="elementor-element elementor-element-763e7dcd e-con-full e-flex e-con e-child" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                    <div className="elementor-element elementor-element-5a6bc6f3 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                      <div className="elementor-widget-container">
                        <h2 className="elementor-heading-title elementor-size-default">
                          Get Personalized Addiction Care at The District Behavioral Health
                        </h2>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-27baceac elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                      <div className="elementor-widget-container">
                        <p>
                          Our behavioral health services support men and women struggling with substance use and co-occurring mental health disorders. 
                          <strong>
                            District Behavioral Health
                          </strong>
                           focuses on providing a 
                          <strong>
                            comprehensive continuum of care
                          </strong>
                          , including personalized outpatient treatment, intensive outpatient (IOP) and partial hospitalization programs (PHP), and coordinated support services designed to help individuals stabilize, develop effective coping skills, and build lasting recovery within their communities.
                        </p>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-91916 elementor-widget-divider--view-line elementor-widget elementor-widget-divider" data-widget_type="divider.default">
                      <div className="elementor-widget-container">
                        <div className="elementor-divider"></div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-082c92a e-con-full e-flex e-con e-child">
                      <div className="elementor-element elementor-element-cf07434 elementor-align-justify elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button" data-widget_type="button.default">
                        <div className="elementor-widget-container">
                          <div className="elementor-button-wrapper">
                            <Link className="elementor-button elementor-button-link elementor-size-sm" href="tel:+18887020484">
                              <span className="elementor-button-content-wrapper">
                                <span className="elementor-button-text">
                                  Call Now! 888-702-0484
                                </span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-92e20aa elementor-align-justify elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button" data-widget_type="button.default">
                        <div className="elementor-widget-container">
                          <div className="elementor-button-wrapper">
                            <Link className="elementor-button elementor-button-link elementor-size-sm" href="#verifyinsurance">
                              <span className="elementor-button-content-wrapper">
                                <span className="elementor-button-text">
                                  Verify Insurance
                                </span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-cfde672 elementor-align-justify elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button" data-widget_type="button.default">
                        <div className="elementor-widget-container">
                          <div className="elementor-button-wrapper">
                            <Link className="elementor-button elementor-button-link elementor-size-sm" href="/our-facilities/">
                              <span className="elementor-button-content-wrapper">
                                <span className="elementor-button-text">
                                  Tour Our Facilities
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="elementor-element elementor-element-5e096e30 empty-container-sty table-of-content-headings e-flex e-con-boxed e-con e-parent e-lazyloaded">
      <div className="e-con-inner">
        <div className="elementor-element elementor-element-1fa0e0d elementor-widget__width-initial elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
          <div className="elementor-widget-container">
            {props.blog_section_1___con && <div dangerouslySetInnerHTML={{ __html: props.blog_section_1___con }} />}
          </div>
        </div>
      </div>
    </div>
    <div className="elementor-element elementor-element-d1f0d7b e-con-full e-flex e-con e-parent e-lazyloaded">
      <div className="elementor-element elementor-element-d6656c7 elementor-widget elementor-widget-template" data-widget_type="template.default">
        <div className="elementor-widget-container">
          <div className="elementor-template">
            <div className="elementor elementor-2970">
              <div className="elementor-element elementor-element-4e8ee10e elementor-hidden-tablet elementor-hidden-mobile elementor-hidden-desktop e-flex e-con-boxed e-con e-parent" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                <div className="e-con-inner">
                  <div className="elementor-element elementor-element-1efdfee1 e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-7dd89562 elementor-widget__width-initial elementor-widget-mobile__width-auto elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                      <div className="elementor-widget-container">
                        <h2 className="elementor-heading-title elementor-size-default">
                          Related Blogs
                        </h2>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-2c536fb elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                      <div className="elementor-widget-container">
                        <p>
                          Check out our addiction recovery blog to learn more about substance use disorders and how to get effective treatment.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-513e9b1b e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-29005717 elementor-widget elementor-widget-loop-carousel" data-settings="{&quot;template_id&quot;:&quot;54492&quot;,&quot;image_spacing_custom&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:48,&quot;sizes&quot;:[]},&quot;image_spacing_custom_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:24,&quot;sizes&quot;:[]},&quot;_skin&quot;:&quot;post&quot;,&quot;slides_to_show&quot;:&quot;3&quot;,&quot;slides_to_show_tablet&quot;:&quot;2&quot;,&quot;slides_to_show_mobile&quot;:&quot;1&quot;,&quot;slides_to_scroll&quot;:&quot;1&quot;,&quot;edit_handle_selector&quot;:&quot;.elementor-loop-container&quot;,&quot;autoplay&quot;:&quot;yes&quot;,&quot;autoplay_speed&quot;:5000,&quot;pause_on_hover&quot;:&quot;yes&quot;,&quot;pause_on_interaction&quot;:&quot;yes&quot;,&quot;infinite&quot;:&quot;yes&quot;,&quot;speed&quot;:500,&quot;offset_sides&quot;:&quot;none&quot;,&quot;image_spacing_custom_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]}}" data-widget_type="loop-carousel.post">
                      <div className="elementor-widget-container">
                        <div className="swiper elementor-loop-container elementor-grid" role="list" dir="ltr">
                          <div className="swiper-wrapper" aria-live="off" style={{"transform":"none","transitionDuration":"0ms"}}></div>
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
    <div className="elementor-element elementor-element-8c966cc e-con-full e-flex e-con e-parent e-lazyloaded">
      <div className="elementor-element elementor-element-18a7190 elementor-widget elementor-widget-template" data-widget_type="template.default">
        <div className="elementor-widget-container">
          <div className="elementor-template">
            <div className="elementor elementor-2973">
              <div className="elementor-element elementor-element-7d738590 e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                <div className="e-con-inner">
                  <div className="elementor-element elementor-element-489a98ea e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-19bc8c7 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                      <div className="elementor-widget-container">
                        <h2 className="elementor-heading-title elementor-size-default">
                          Testimonials
                        </h2>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-1fa0ad1b elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                      <div className="elementor-widget-container">
                        <h2 className="elementor-heading-title elementor-size-default">
                          Stories of Hope and Healing
                        </h2>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-57042c8f elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <Image src="/images/da37a56cbc0965701377f6a7601a8b3d.webp" alt="" width={226} height={80} className="attachment-full size-full wp-image-208" />
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-2acd848f elementor-align-left elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-button" data-widget_type="button.default">
                      <div className="elementor-widget-container">
                        <div className="elementor-button-wrapper">
                          <Link className="elementor-button elementor-button-link elementor-size-sm" href="#">
                            <span className="elementor-button-content-wrapper">
                              <span className="elementor-button-text">
                                Read More Success Stories
                              </span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-4ea39b57 e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-2792fbc elementor-widget elementor-widget-html" data-widget_type="html.default">
                      <div className="elementor-widget-container">
                        <TrustIndexWidget widgetId="6c23c3d40f38852df246e2f6d3e" />
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-493db9b9 elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-arrows-position-inside elementor-widget elementor-widget-loop-carousel e-widget-swiper" data-settings="{&quot;template_id&quot;:&quot;200&quot;,&quot;image_spacing_custom&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:20,&quot;sizes&quot;:[]},&quot;slides_to_show&quot;:&quot;2&quot;,&quot;_skin&quot;:&quot;post&quot;,&quot;slides_to_show_tablet&quot;:&quot;2&quot;,&quot;slides_to_show_mobile&quot;:&quot;1&quot;,&quot;slides_to_scroll&quot;:&quot;1&quot;,&quot;edit_handle_selector&quot;:&quot;.elementor-loop-container&quot;,&quot;autoplay&quot;:&quot;yes&quot;,&quot;autoplay_speed&quot;:5000,&quot;pause_on_hover&quot;:&quot;yes&quot;,&quot;pause_on_interaction&quot;:&quot;yes&quot;,&quot;infinite&quot;:&quot;yes&quot;,&quot;speed&quot;:500,&quot;offset_sides&quot;:&quot;none&quot;,&quot;arrows&quot;:&quot;yes&quot;,&quot;image_spacing_custom_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;image_spacing_custom_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]}}" data-widget_type="loop-carousel.post">
                      <div className="elementor-widget-container">
                        <div className="swiper elementor-loop-container elementor-grid swiper-initialized swiper-horizontal swiper-pointer-events" role="list" dir="ltr">
                          <div className="swiper-wrapper" aria-live="off" id="swiper-wrapper-1091c8288eb247381" style={{"transitionDuration":"0ms","transform":"none"}}>
                            <div className="elementor elementor-200 swiper-slide e-loop-item e-loop-item-195 post-195 testimonials type-testimonials status-publish has-post-thumbnail hentry" role="group" aria-roledescription="slide" aria-label="1 of 2" style={{"visibility":"visible"}}>
                              <div className="elementor-element elementor-element-6b96d74 e-flex e-con-boxed e-con e-parent" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                                <div className="e-con-inner">
                                  <div className="elementor-element elementor-element-d64a9fa e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-2d86180 e-con-full e-flex e-con e-child">
                                      <div className="elementor-element elementor-element-8181815 elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image" data-widget_type="theme-post-featured-image.default">
                                        <div className="elementor-widget-container">
                                          <Image src="/images/816165b74a85bae57fa3b804180af5d2.webp" alt="" width={42} height={42} className="attachment-thumbnail size-thumbnail wp-image-198" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-1bdc3ce e-con-full e-flex e-con e-child">
                                      <div className="elementor-element elementor-element-f582852 elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading" data-widget_type="theme-post-title.default">
                                        <div className="elementor-widget-container">
                                          <h1 className="elementor-heading-title elementor-size-default">
                                            Thomas daniel
                                          </h1>
                                        </div>
                                      </div>
                                      <div className="elementor-element elementor-element-a2c906b elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                        <div className="elementor-widget-container">
                                          <h2 className="elementor-heading-title elementor-size-default">
                                            Senior Doctor
                                          </h2>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-5358893 e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-38bd3b8 elementor-widget elementor-widget-image" data-widget_type="image.default">
                                      <div className="elementor-widget-container">
                                        <Image src="/images/0374657cebe9faccfc6bfe800bc9bbf3.webp" alt="" width={160} height={25} className="attachment-full size-full wp-image-197" />
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-494fdfc elementor-widget elementor-widget-theme-post-excerpt" data-widget_type="theme-post-excerpt.default">
                                      <div className="elementor-widget-container">
                                        
					The team at Gratitude Lodge truly saved my life. I felt seen, heard, and cared for in every step of my recovery. I’m finally living a life of peace and purpose.				
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="elementor elementor-200 swiper-slide e-loop-item e-loop-item-196 post-196 testimonials type-testimonials status-publish has-post-thumbnail hentry" role="group" aria-roledescription="slide" aria-label="2 of 2" style={{"visibility":"visible"}}>
                              <div className="elementor-element elementor-element-6b96d74 e-flex e-con-boxed e-con e-parent" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                                <div className="e-con-inner">
                                  <div className="elementor-element elementor-element-d64a9fa e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-2d86180 e-con-full e-flex e-con e-child">
                                      <div className="elementor-element elementor-element-8181815 elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image" data-widget_type="theme-post-featured-image.default">
                                        <div className="elementor-widget-container">
                                          <Image src="/images/be003f2536f1c36c7fd92ba3c94fae12.webp" alt="" width={42} height={42} className="attachment-thumbnail size-thumbnail wp-image-199" />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-1bdc3ce e-con-full e-flex e-con e-child">
                                      <div className="elementor-element elementor-element-f582852 elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading" data-widget_type="theme-post-title.default">
                                        <div className="elementor-widget-container">
                                          <h1 className="elementor-heading-title elementor-size-default">
                                            Mathew
                                          </h1>
                                        </div>
                                      </div>
                                      <div className="elementor-element elementor-element-a2c906b elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                        <div className="elementor-widget-container">
                                          <h2 className="elementor-heading-title elementor-size-default">
                                            Senior Doctor
                                          </h2>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-5358893 e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-38bd3b8 elementor-widget elementor-widget-image" data-widget_type="image.default">
                                      <div className="elementor-widget-container">
                                        <Image src="/images/0374657cebe9faccfc6bfe800bc9bbf3.webp" alt="" width={160} height={25} className="attachment-full size-full wp-image-197" />
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-494fdfc elementor-widget elementor-widget-theme-post-excerpt" data-widget_type="theme-post-excerpt.default">
                                      <div className="elementor-widget-container">
                                        
					Watching my loved one thrive after treatment at Alliance Recovery was life-changing. The team’s dedication to her healing was beyond anything I could have imagined.				
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="elementor-swiper-button elementor-swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide" aria-controls="swiper-wrapper-1091c8288eb247381">
                          <svg aria-hidden="true" className="e-font-icon-svg e-fas-long-arrow-alt-left" viewBox="0 0 448 512">
                            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"></path>
                          </svg>
                        </div>
                        <div className="elementor-swiper-button elementor-swiper-button-next" role="button" tabIndex={0} aria-label="Next slide" aria-controls="swiper-wrapper-1091c8288eb247381">
                          <svg aria-hidden="true" className="e-font-icon-svg e-fas-long-arrow-alt-right" viewBox="0 0 448 512">
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
      </div>
    </div>
    <div className="elementor-element elementor-element-42a3397 e-flex e-con-boxed e-con e-parent e-lazyloaded">
      <div className="e-con-inner">
        <div className="elementor-element elementor-element-a460ca7 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
          <div className="elementor-widget-container">
            <h2 className="elementor-heading-title elementor-size-default">
              Treatment Centers & Locations
            </h2>
          </div>
        </div>
        <div className="elementor-element elementor-element-ced5f54 elementor-widget elementor-widget-template" data-widget_type="template.default">
          <div className="elementor-widget-container">
            <div className="elementor-template">
              <div className="elementor elementor-3023">
                <div className="elementor-element elementor-element-95380bd e-con-full e-flex e-con e-child">
                  <div className="elementor-element elementor-element-feb28e1 elementor-grid-3 elementor-grid-tablet-2 elementor-grid-mobile-1 elementor-widget elementor-widget-loop-grid" data-settings="{&quot;template_id&quot;:&quot;75&quot;,&quot;row_gap_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:20,&quot;sizes&quot;:[]},&quot;_skin&quot;:&quot;post&quot;,&quot;columns&quot;:&quot;3&quot;,&quot;columns_tablet&quot;:&quot;2&quot;,&quot;columns_mobile&quot;:&quot;1&quot;,&quot;edit_handle_selector&quot;:&quot;[data-elementor-type=\\&quot;loop-item\\&quot;]&quot;,&quot;row_gap&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;row_gap_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]}}" data-widget_type="loop-grid.post">
                    <div className="elementor-widget-container">
                      <div className="elementor-loop-container elementor-grid" role="list">
                        <div className="elementor elementor-75 e-loop-item e-loop-item-2057 post-2057 our_locations type-our_locations status-publish has-post-thumbnail hentry">
                          <div className="elementor-element elementor-element-2c0bd73 loca_box e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                            <div className="e-con-inner">
                              <div className="elementor-element elementor-element-fd7bae9 e-con-full e-flex e-con e-child">
                                <div className="elementor-element elementor-element-72b120d elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image" data-widget_type="theme-post-featured-image.default">
                                  <div className="elementor-widget-container">
                                    <a href="https://www.renaissancerecovery.com/drug/rehab/tennessee/davidson-county/nashville/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                      <Image src="/images/88d196542277a1c32b831cb9e659e774.webp" alt="" width={485} height={342} className="attachment-full size-full wp-image-2681" />
                                    </a>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-01a7ec1 e-con-full e-flex e-con e-child">
                                  <div className="elementor-element elementor-element-ec5ace6 e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-f407a3e elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading" data-widget_type="theme-post-title.default">
                                      <div className="elementor-widget-container">
                                        <h1 className="elementor-heading-title elementor-size-default">
                                          <a href="https://www.renaissancerecovery.com/drug/rehab/tennessee/davidson-county/nashville/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                            Renaissance Recovery Nashville, TN
                                          </a>
                                        </h1>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-e78a91f elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Nashville, TN
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7923f7e elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          SUD | Mental Health
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7c4fb1a elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          PHP | IOP | OP
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-e94eb3a elementor-align-left elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-button" data-widget_type="button.default">
                                    <div className="elementor-widget-container">
                                      <div className="elementor-button-wrapper">
                                        <Link className="elementor-button elementor-button-link elementor-size-sm" href="#">
                                          <span className="elementor-button-content-wrapper">
                                            <span className="elementor-button-text">
                                              Learn More
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
                        </div>
                        <div className="elementor elementor-75 e-loop-item e-loop-item-68 post-68 our_locations type-our_locations status-publish has-post-thumbnail hentry">
                          <div className="elementor-element elementor-element-2c0bd73 loca_box e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                            <div className="e-con-inner">
                              <div className="elementor-element elementor-element-fd7bae9 e-con-full e-flex e-con e-child">
                                <div className="elementor-element elementor-element-72b120d elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image" data-widget_type="theme-post-featured-image.default">
                                  <div className="elementor-widget-container">
                                    <a href="https://www.renaissancerecovery.com/drug/rehab/california/orange-county/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                      <Image src="/images/f9ae6929c1b3f11fab2a169b372116cb.webp" alt="" width={502} height={359} className="attachment-full size-full wp-image-71" />
                                    </a>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-01a7ec1 e-con-full e-flex e-con e-child">
                                  <div className="elementor-element elementor-element-ec5ace6 e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-f407a3e elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading" data-widget_type="theme-post-title.default">
                                      <div className="elementor-widget-container">
                                        <h1 className="elementor-heading-title elementor-size-default">
                                          <a href="https://www.renaissancerecovery.com/drug/rehab/california/orange-county/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                            Renaissance Recovery {address_county}, CA
                                          </a>
                                        </h1>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-e78a91f elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Fountain Valley, CA
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7923f7e elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          SUD | Mental Health 
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7c4fb1a elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          PHP | IOP | OP
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-e94eb3a elementor-align-left elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-button" data-widget_type="button.default">
                                    <div className="elementor-widget-container">
                                      <div className="elementor-button-wrapper">
                                        <Link className="elementor-button elementor-button-link elementor-size-sm" href="#">
                                          <span className="elementor-button-content-wrapper">
                                            <span className="elementor-button-text">
                                              Learn More
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
                        </div>
                        <div className="elementor elementor-75 e-loop-item e-loop-item-67 post-67 our_locations type-our_locations status-publish has-post-thumbnail hentry">
                          <div className="elementor-element elementor-element-2c0bd73 loca_box e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                            <div className="e-con-inner">
                              <div className="elementor-element elementor-element-fd7bae9 e-con-full e-flex e-con e-child">
                                <div className="elementor-element elementor-element-72b120d elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image" data-widget_type="theme-post-featured-image.default">
                                  <div className="elementor-widget-container">
                                    <a href="https://www.renaissancerecovery.com/drug/rehab/florida/palm-beach/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                      <Image src="/images/ae67d3f9d4fbfc6f457954d081974c48.webp" alt="" width={502} height={359} className="attachment-full size-full wp-image-72" />
                                    </a>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-01a7ec1 e-con-full e-flex e-con e-child">
                                  <div className="elementor-element elementor-element-ec5ace6 e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-f407a3e elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading" data-widget_type="theme-post-title.default">
                                      <div className="elementor-widget-container">
                                        <h1 className="elementor-heading-title elementor-size-default">
                                          <a href="https://www.renaissancerecovery.com/drug/rehab/florida/palm-beach/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                            Renaissance Recovery Palm Beach, FL
                                          </a>
                                        </h1>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-e78a91f elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Lantana, FL | Lake Worth, FL 
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7923f7e elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          SUD | Mental Health 
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7c4fb1a elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          PHP | IOP | OP
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-e94eb3a elementor-align-left elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-button" data-widget_type="button.default">
                                    <div className="elementor-widget-container">
                                      <div className="elementor-button-wrapper">
                                        <Link className="elementor-button elementor-button-link elementor-size-sm" href="#">
                                          <span className="elementor-button-content-wrapper">
                                            <span className="elementor-button-text">
                                              Learn More
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
                        </div>
                        <div className="elementor elementor-75 e-loop-item e-loop-item-69 post-69 our_locations type-our_locations status-publish has-post-thumbnail hentry">
                          <div className="elementor-element elementor-element-2c0bd73 loca_box e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                            <div className="e-con-inner">
                              <div className="elementor-element elementor-element-fd7bae9 e-con-full e-flex e-con e-child">
                                <div className="elementor-element elementor-element-72b120d elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image" data-widget_type="theme-post-featured-image.default">
                                  <div className="elementor-widget-container">
                                    <a href="https://www.gratitudelodge.com/drug-rehab/california/los-angeles/long-beach/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                      <Image src="/images/a08540b112b7f5ad05ac184e412f413f.webp" alt="" width={502} height={359} className="attachment-full size-full wp-image-70" />
                                    </a>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-01a7ec1 e-con-full e-flex e-con e-child">
                                  <div className="elementor-element elementor-element-ec5ace6 e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-f407a3e elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading" data-widget_type="theme-post-title.default">
                                      <div className="elementor-widget-container">
                                        <h1 className="elementor-heading-title elementor-size-default">
                                          <a href="https://www.gratitudelodge.com/drug-rehab/california/los-angeles/long-beach/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                            Gratitude Lodge – Long Beach, CA
                                          </a>
                                        </h1>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-e78a91f elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Long Beach, CA
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7923f7e elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          SUD
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7c4fb1a elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Detox | Inpatient Residential
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-e94eb3a elementor-align-left elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-button" data-widget_type="button.default">
                                    <div className="elementor-widget-container">
                                      <div className="elementor-button-wrapper">
                                        <Link className="elementor-button elementor-button-link elementor-size-sm" href="#">
                                          <span className="elementor-button-content-wrapper">
                                            <span className="elementor-button-text">
                                              Learn More
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
                        </div>
                        <div className="elementor elementor-75 e-loop-item e-loop-item-3015 post-3015 our_locations type-our_locations status-publish has-post-thumbnail hentry">
                          <div className="elementor-element elementor-element-2c0bd73 loca_box e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                            <div className="e-con-inner">
                              <div className="elementor-element elementor-element-fd7bae9 e-con-full e-flex e-con e-child">
                                <div className="elementor-element elementor-element-72b120d elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image" data-widget_type="theme-post-featured-image.default">
                                  <div className="elementor-widget-container">
                                    <a href="https://www.gratitudelodge.com/drug-rehab/california/orange-county/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                      <Image src="/images/a08540b112b7f5ad05ac184e412f413f.webp" alt="" width={502} height={359} className="attachment-full size-full wp-image-70" />
                                    </a>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-01a7ec1 e-con-full e-flex e-con e-child">
                                  <div className="elementor-element elementor-element-ec5ace6 e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-f407a3e elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading" data-widget_type="theme-post-title.default">
                                      <div className="elementor-widget-container">
                                        <h1 className="elementor-heading-title elementor-size-default">
                                          <a href="https://www.gratitudelodge.com/drug-rehab/california/orange-county/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                            Gratitude Lodge – {address_county}, CA
                                          </a>
                                        </h1>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-e78a91f elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          {address_county}, CA
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7923f7e elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          SUD
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7c4fb1a elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Detox | Inpatient Residential
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-e94eb3a elementor-align-left elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-button" data-widget_type="button.default">
                                    <div className="elementor-widget-container">
                                      <div className="elementor-button-wrapper">
                                        <Link className="elementor-button elementor-button-link elementor-size-sm" href="#">
                                          <span className="elementor-button-content-wrapper">
                                            <span className="elementor-button-text">
                                              Learn More
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
                        </div>
                        <div className="elementor elementor-75 e-loop-item e-loop-item-3014 post-3014 our_locations type-our_locations status-publish has-post-thumbnail hentry">
                          <div className="elementor-element elementor-element-2c0bd73 loca_box e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                            <div className="e-con-inner">
                              <div className="elementor-element elementor-element-fd7bae9 e-con-full e-flex e-con e-child">
                                <div className="elementor-element elementor-element-72b120d elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image" data-widget_type="theme-post-featured-image.default">
                                  <div className="elementor-widget-container">
                                    <a href="https://www.gratitudelodge.com/drug-rehab/california/orange-county/newport-beach/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                      <Image src="/images/a08540b112b7f5ad05ac184e412f413f.webp" alt="" width={502} height={359} className="attachment-full size-full wp-image-70" />
                                    </a>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-01a7ec1 e-con-full e-flex e-con e-child">
                                  <div className="elementor-element elementor-element-ec5ace6 e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-f407a3e elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading" data-widget_type="theme-post-title.default">
                                      <div className="elementor-widget-container">
                                        <h1 className="elementor-heading-title elementor-size-default">
                                          <a href="https://www.gratitudelodge.com/drug-rehab/california/orange-county/newport-beach/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                            Gratitude Lodge – Newport Beach, CA
                                          </a>
                                        </h1>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-e78a91f elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Newport Beach, CA
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7923f7e elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          SUD
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7c4fb1a elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Detox | Inpatient Residential
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-e94eb3a elementor-align-left elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-button" data-widget_type="button.default">
                                    <div className="elementor-widget-container">
                                      <div className="elementor-button-wrapper">
                                        <Link className="elementor-button elementor-button-link elementor-size-sm" href="#">
                                          <span className="elementor-button-content-wrapper">
                                            <span className="elementor-button-text">
                                              Learn More
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
                        </div>
                        <div className="elementor elementor-75 e-loop-item e-loop-item-3013 post-3013 our_locations type-our_locations status-publish has-post-thumbnail hentry">
                          <div className="elementor-element elementor-element-2c0bd73 loca_box e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                            <div className="e-con-inner">
                              <div className="elementor-element elementor-element-fd7bae9 e-con-full e-flex e-con e-child">
                                <div className="elementor-element elementor-element-72b120d elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image" data-widget_type="theme-post-featured-image.default">
                                  <div className="elementor-widget-container">
                                    <a href="https://www.gratitudelodge.com/drug-rehab/california/los-angeles/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                      <Image src="/images/a08540b112b7f5ad05ac184e412f413f.webp" alt="" width={502} height={359} className="attachment-full size-full wp-image-70" />
                                    </a>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-01a7ec1 e-con-full e-flex e-con e-child">
                                  <div className="elementor-element elementor-element-ec5ace6 e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-f407a3e elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading" data-widget_type="theme-post-title.default">
                                      <div className="elementor-widget-container">
                                        <h1 className="elementor-heading-title elementor-size-default">
                                          <a href="https://www.gratitudelodge.com/drug-rehab/california/los-angeles/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                            Gratitude Lodge – Los Angeles, CA
                                          </a>
                                        </h1>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-e78a91f elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Los Angeles, CA
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7923f7e elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          SUD
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7c4fb1a elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Detox | Inpatient Residential
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-e94eb3a elementor-align-left elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-button" data-widget_type="button.default">
                                    <div className="elementor-widget-container">
                                      <div className="elementor-button-wrapper">
                                        <Link className="elementor-button elementor-button-link elementor-size-sm" href="#">
                                          <span className="elementor-button-content-wrapper">
                                            <span className="elementor-button-text">
                                              Learn More
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
                        </div>
                        <div className="elementor elementor-75 e-loop-item e-loop-item-448 post-448 our_locations type-our_locations status-publish has-post-thumbnail hentry">
                          <div className="elementor-element elementor-element-2c0bd73 loca_box e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                            <div className="e-con-inner">
                              <div className="elementor-element elementor-element-fd7bae9 e-con-full e-flex e-con e-child">
                                <div className="elementor-element elementor-element-72b120d elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image" data-widget_type="theme-post-featured-image.default">
                                  <div className="elementor-widget-container">
                                    <a href="https://californiadetox.com/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                      <Image src="/images/776047009384fd44b41db6a882115189.webp" alt="california-detox-logo-with-overlay" width={509} height={359} className="attachment-full size-full wp-image-449" />
                                    </a>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-01a7ec1 e-con-full e-flex e-con e-child">
                                  <div className="elementor-element elementor-element-ec5ace6 e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-f407a3e elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading" data-widget_type="theme-post-title.default">
                                      <div className="elementor-widget-container">
                                        <h1 className="elementor-heading-title elementor-size-default">
                                          <a href="https://californiadetox.com/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                            California Detox – {address_county}, CA
                                          </a>
                                        </h1>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-e78a91f elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Laguna Beach, CA
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7923f7e elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          SUD
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7c4fb1a elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Detox | Inpatient Residential
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-e94eb3a elementor-align-left elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-button" data-widget_type="button.default">
                                    <div className="elementor-widget-container">
                                      <div className="elementor-button-wrapper">
                                        <Link className="elementor-button elementor-button-link elementor-size-sm" href="#">
                                          <span className="elementor-button-content-wrapper">
                                            <span className="elementor-button-text">
                                              Learn More
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
                        </div>
                        <div className="elementor elementor-75 e-loop-item e-loop-item-450 post-450 our_locations type-our_locations status-publish has-post-thumbnail hentry">
                          <div className="elementor-element elementor-element-2c0bd73 loca_box e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                            <div className="e-con-inner">
                              <div className="elementor-element elementor-element-fd7bae9 e-con-full e-flex e-con e-child">
                                <div className="elementor-element elementor-element-72b120d elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image" data-widget_type="theme-post-featured-image.default">
                                  <div className="elementor-widget-container">
                                    <a href="https://connectionsoc.com/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                      <Image src="/images/fcae64eeaf7c50ebe66f16babf90e62f.webp" alt="connections-mental-health-logo-with-overlay-v1" width={509} height={359} className="attachment-full size-full wp-image-451" />
                                    </a>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-01a7ec1 e-con-full e-flex e-con e-child">
                                  <div className="elementor-element elementor-element-ec5ace6 e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-f407a3e elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading" data-widget_type="theme-post-title.default">
                                      <div className="elementor-widget-container">
                                        <h1 className="elementor-heading-title elementor-size-default">
                                          <a href="https://connectionsoc.com/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                            Connections Mental Health – {address_county}, CA
                                          </a>
                                        </h1>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-e78a91f elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Orange, CA | Tustin, CA | Villa Park, CA
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7923f7e elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Mental Health
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7c4fb1a elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Inpatient Residential
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-e94eb3a elementor-align-left elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-button" data-widget_type="button.default">
                                    <div className="elementor-widget-container">
                                      <div className="elementor-button-wrapper">
                                        <Link className="elementor-button elementor-button-link elementor-size-sm" href="#">
                                          <span className="elementor-button-content-wrapper">
                                            <span className="elementor-button-text">
                                              Learn More
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
                        </div>
                        <div className="elementor elementor-75 e-loop-item e-loop-item-452 post-452 our_locations type-our_locations status-publish has-post-thumbnail hentry">
                          <div className="elementor-element elementor-element-2c0bd73 loca_box e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                            <div className="e-con-inner">
                              <div className="elementor-element elementor-element-fd7bae9 e-con-full e-flex e-con e-child">
                                <div className="elementor-element elementor-element-72b120d elementor-widget elementor-widget-theme-post-featured-image elementor-widget-image" data-widget_type="theme-post-featured-image.default">
                                  <div className="elementor-widget-container">
                                    <a href="https://alliancerecovery.com/drug/los-angeles-ca/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                      <Image src="/images/c49f9c355b2f80bfd45326be7e79b205.webp" alt="alliance-recovery-logo-with-overlay" width={509} height={359} className="attachment-full size-full wp-image-453" />
                                    </a>
                                  </div>
                                </div>
                                <div className="elementor-element elementor-element-01a7ec1 e-con-full e-flex e-con e-child">
                                  <div className="elementor-element elementor-element-ec5ace6 e-con-full e-flex e-con e-child">
                                    <div className="elementor-element elementor-element-f407a3e elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading" data-widget_type="theme-post-title.default">
                                      <div className="elementor-widget-container">
                                        <h1 className="elementor-heading-title elementor-size-default">
                                          <a href="https://alliancerecovery.com/drug/los-angeles-ca/?utm_source=districtbehavioralhealth.com&utm_medium=referral">
                                            Alliance Recovery – Los Angeles, CA
                                          </a>
                                        </h1>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-e78a91f elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          Los Angeles, CA | Fountain Valley, CA
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7923f7e elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          SUD | Mental Health 
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="elementor-element elementor-element-7c4fb1a elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                                      <div className="elementor-widget-container">
                                        <h2 className="elementor-heading-title elementor-size-default">
                                          PHP | IOP | OP
                                        </h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="elementor-element elementor-element-e94eb3a elementor-align-left elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-button" data-widget_type="button.default">
                                    <div className="elementor-widget-container">
                                      <div className="elementor-button-wrapper">
                                        <Link className="elementor-button elementor-button-link elementor-size-sm" href="#">
                                          <span className="elementor-button-content-wrapper">
                                            <span className="elementor-button-text">
                                              Learn More
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
    <div className="elementor-element elementor-element-0488a74 e-con-full e-flex e-con e-parent e-lazyloaded">
      <div className="elementor-element elementor-element-683314b elementor-widget elementor-widget-template" data-widget_type="template.default">
        <div className="elementor-widget-container">
          <div className="elementor-template">
            <div className="elementor elementor-2976">
              <div className="elementor-element elementor-element-246c550d e-flex e-con-boxed e-con e-parent e-lazyloaded">
                <div className="e-con-inner">
                  <div className="elementor-element elementor-element-793c79f8 e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-2bc6b6fc e-con-full e-flex e-con e-child">
                      <div className="elementor-element elementor-element-556ebec2 elementor-widget__width-initial elementor-widget-mobile__width-auto elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default">
                            Where You’ll Be Staying
                          </h2>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-64e1b169 elementor-widget__width-initial elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                        <div className="elementor-widget-container">
                          <p>
                            We strive to provide a comfortable, home-like environment during your recovery journey. Browse our facility images below to take a look at our upscale residential facilities.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-76f6ff2e e-con-full elementor-hidden-mobile e-flex e-con e-child">
                      <div className="elementor-element elementor-element-6dfc5e0d elementor-align-justify elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button" data-widget_type="button.default">
                        <div className="elementor-widget-container">
                          <div className="elementor-button-wrapper">
                            <Link className="elementor-button elementor-button-link elementor-size-sm" href="/our-facilities/">
                              <span className="elementor-button-content-wrapper">
                                <span className="elementor-button-text">
                                  Tour Our Facilities
                                </span>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-7379b0fa elementor-arrows-position-outside elementor-pagination-position-outside elementor-widget elementor-widget-image-carousel e-widget-swiper" data-settings="{&quot;slides_to_show&quot;:&quot;3&quot;,&quot;navigation&quot;:&quot;both&quot;,&quot;autoplay&quot;:&quot;yes&quot;,&quot;pause_on_hover&quot;:&quot;yes&quot;,&quot;pause_on_interaction&quot;:&quot;yes&quot;,&quot;autoplay_speed&quot;:5000,&quot;infinite&quot;:&quot;yes&quot;,&quot;speed&quot;:500,&quot;image_spacing_custom&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:20,&quot;sizes&quot;:[]},&quot;image_spacing_custom_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]},&quot;image_spacing_custom_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:&quot;&quot;,&quot;sizes&quot;:[]}}" data-widget_type="image-carousel.default">
                    <div className="elementor-widget-container">
                      <div className="elementor-image-carousel-wrapper swiper swiper-initialized swiper-horizontal swiper-pointer-events" role="region" aria-roledescription="carousel" aria-label="Image Carousel" dir="ltr">
                        <div className="elementor-image-carousel swiper-wrapper swiper-image-stretch" aria-live="off" style={{"transitionDuration":"0ms","transform":"none"}} id="swiper-wrapper-67aaf6f20b4a73b8">
                          <div className="swiper-slide swiper-slide-active" role="group" aria-roledescription="slide" aria-label="1 / 6" style={{"width":"497.667px","marginRight":"20px","visibility":"visible"}}>
                            <Link data-elementor-open-lightbox="yes" href="https://districtbehavioralhealth.com/wp-content/uploads/2026/01/rectangle-249-1-68b941b1d65c5.webp">
                              <figure className="swiper-slide-inner">
                                <Image src="/images/2aaccce98b6f73395f5c64c702544ecf.webp" alt="rectangle-249-1-68b941b1d65c5.webp" width={0} height={0} sizes="100vw" style={{width:"100%",height:"auto"}} className="swiper-slide-image" />
                              </figure>
                            </Link>
                          </div>
                          <div className="swiper-slide swiper-slide-next" role="group" aria-roledescription="slide" aria-label="2 / 6" style={{"width":"497.667px","marginRight":"20px","visibility":"visible"}}>
                            <Link data-elementor-open-lightbox="yes" href="https://districtbehavioralhealth.com/wp-content/uploads/2026/01/rectangle-250-1-68b941b299489.webp">
                              <figure className="swiper-slide-inner">
                                <Image src="/images/4f0e5c4294ee6ec8832fcd66ce98d172.webp" alt="rectangle-250-1-68b941b299489.webp" width={0} height={0} sizes="100vw" style={{width:"100%",height:"auto"}} className="swiper-slide-image" />
                              </figure>
                            </Link>
                          </div>
                          <div className="swiper-slide" role="group" aria-roledescription="slide" aria-label="3 / 6" style={{"width":"497.667px","marginRight":"20px","visibility":"visible"}}>
                            <Link data-elementor-open-lightbox="yes" href="https://districtbehavioralhealth.com/wp-content/uploads/2026/01/rectangle-251-1-1-68b941b47d396.webp">
                              <figure className="swiper-slide-inner">
                                <Image src="/images/c2d093f0fb2473f5e2e97e65e37bb14c.webp" alt="rectangle-251-1-1-68b941b47d396.webp" width={0} height={0} sizes="100vw" style={{width:"100%",height:"auto"}} className="swiper-slide-image" />
                              </figure>
                            </Link>
                          </div>
                          <div className="swiper-slide" role="group" aria-roledescription="slide" aria-label="4 / 6" style={{"width":"497.667px","marginRight":"20px","visibility":"visible"}}>
                            <Link data-elementor-open-lightbox="yes" href="https://districtbehavioralhealth.com/wp-content/uploads/2026/01/rectangle-249-2-68b941b68d605.webp">
                              <figure className="swiper-slide-inner">
                                <Image src="/images/9ceae7cd22108ad8641e0419d747499e.webp" alt="rectangle-249-2-68b941b68d605.webp" width={0} height={0} sizes="100vw" style={{width:"100%",height:"auto"}} className="swiper-slide-image" />
                              </figure>
                            </Link>
                          </div>
                          <div className="swiper-slide" role="group" aria-roledescription="slide" aria-label="5 / 6" style={{"width":"497.667px","marginRight":"20px","visibility":"visible"}}>
                            <Link data-elementor-open-lightbox="yes" href="https://districtbehavioralhealth.com/wp-content/uploads/2026/01/rectangle-250-2-68b941b9428a8.webp">
                              <figure className="swiper-slide-inner">
                                <Image src="/images/c95abf8b6dabf275a06a60af535c8df4.webp" alt="rectangle-250-2-68b941b9428a8.webp" width={0} height={0} sizes="100vw" style={{width:"100%",height:"auto"}} className="swiper-slide-image" />
                              </figure>
                            </Link>
                          </div>
                          <div className="swiper-slide swiper-slide-duplicate-prev" role="group" aria-roledescription="slide" aria-label="6 / 6" style={{"width":"497.667px","marginRight":"20px","visibility":"visible"}}>
                            <Link data-elementor-open-lightbox="yes" href="https://districtbehavioralhealth.com/wp-content/uploads/2026/01/rectangle-251-2-68b941bad8a4b.webp">
                              <figure className="swiper-slide-inner">
                                <Image src="/images/e9fc5128fbf95847f94751b9ecde6221.webp" alt="rectangle-251-2-68b941bad8a4b.webp" width={0} height={0} sizes="100vw" style={{width:"100%",height:"auto"}} className="swiper-slide-image" />
                              </figure>
                            </Link>
                          </div>
                        </div>
                        <div className="elementor-swiper-button elementor-swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide" aria-controls="swiper-wrapper-67aaf6f20b4a73b8">
                          <svg aria-hidden="true" className="e-font-icon-svg e-eicon-chevron-left" viewBox="0 0 1000 1000">
                            <path d="M646 125C629 125 613 133 604 142L308 442C296 454 292 471 292 487 292 504 296 521 308 533L604 854C617 867 629 875 646 875 663 875 679 871 692 858 704 846 713 829 713 812 713 796 708 779 692 767L438 487 692 225C700 217 708 204 708 187 708 171 704 154 692 142 675 129 663 125 646 125Z"></path>
                          </svg>
                        </div>
                        <div className="elementor-swiper-button elementor-swiper-button-next" role="button" tabIndex={0} aria-label="Next slide" aria-controls="swiper-wrapper-67aaf6f20b4a73b8">
                          <svg aria-hidden="true" className="e-font-icon-svg e-eicon-chevron-right" viewBox="0 0 1000 1000">
                            <path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z"></path>
                          </svg>
                        </div>
                        <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"></div>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-59164d59 elementor-align-justify elementor-widget-mobile__width-inherit elementor-hidden-desktop elementor-hidden-tablet elementor-widget elementor-widget-button" data-widget_type="button.default">
                    <div className="elementor-widget-container">
                      <div className="elementor-button-wrapper">
                        <Link className="elementor-button elementor-button-link elementor-size-sm" href="tel:+18887020484">
                          <span className="elementor-button-content-wrapper">
                            <span className="elementor-button-text">
                              Tour Our Facilities
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
        </div>
      </div>
    </div>
    <div className="elementor-element elementor-element-323503b e-con-full e-flex e-con e-parent e-lazyloaded">
      <div className="elementor-element elementor-element-0495bce elementor-widget elementor-widget-template" data-widget_type="template.default">
        <div className="elementor-widget-container">
          <div className="elementor-template">
            <div className="elementor elementor-2979">
              <div className="elementor-element elementor-element-51c807a e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;gradient&quot;}">
                <div className="e-con-inner">
                  <div className="elementor-element elementor-element-3728ad5b e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-efdd3ce e-con-full e-flex e-con e-child">
                      <div className="elementor-element elementor-element-5092e90e elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                        <div className="elementor-widget-container">
                          <p>
                            Paying Out Of Pocket without Insurance
                          </p>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-35e38560 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default">
                            Range $5,000 to $60,000
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-4104332 elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <Image src="/images/c05ad0e6a6338f14bb8099f828a91912.webp" alt="" width={366} height={257} className="attachment-full size-full wp-image-1207" />
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-3f8e4795 e-con-full e-flex e-con e-child" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                    <div className="elementor-element elementor-element-75c89559 elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                      <div className="elementor-widget-container">
                        <p>
                          If you can’t pay your co-pay amount
                        </p>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-624d8463 elementor-align-justify elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button" data-widget_type="button.default">
                      <div className="elementor-widget-container">
                        <div className="elementor-button-wrapper">
                          <Link className="elementor-button elementor-button-link elementor-size-sm" href="tel:+18887020484">
                            <span className="elementor-button-content-wrapper">
                              <span className="elementor-button-text">
                                Call us we will work with you
                              </span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-2f6a268f e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-3be99ae e-con-full e-flex e-con e-child">
                      <div className="elementor-element elementor-element-785ec3d2 elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                        <div className="elementor-widget-container">
                          <p>
                            Paying Out Of Pocket with Insurance
                          </p>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-b7121d elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                        <div className="elementor-widget-container">
                          <h2 className="elementor-heading-title elementor-size-default">
                            Range $0 to $12,000
                          </h2>
                        </div>
                      </div>
                      <div className="elementor-element elementor-element-1d18b69a elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                        <div className="elementor-widget-container">
                          <p>
                            (Depending on insurance plan)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-04bfe17 elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <Image src="/images/2e83ae949b5c845fac279f422eca9e19.webp" alt="" width={150} height={150} className="attachment-thumbnail size-thumbnail wp-image-708" />
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
    <div className="elementor-element elementor-element-c4c01c0 e-con-full e-flex e-con e-parent e-lazyloaded">
      <div className="elementor-element elementor-element-5bc909b elementor-widget elementor-widget-template" data-widget_type="template.default">
        <div className="elementor-widget-container">
          <div className="elementor-template">
            <div className="elementor elementor-2982">
              <div className="elementor-element elementor-element-680c8cb0 e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                <div className="e-con-inner">
                  <div className="elementor-element elementor-element-1b928d40 e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-1bb7b5d9 elementor-widget-tablet__width-auto elementor-widget__width-initial elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                      <div className="elementor-widget-container">
                        <h2 className="elementor-heading-title elementor-size-default">
                          We Accept Most Major Insurance
                        </h2>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-725778b0 elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                      <div className="elementor-widget-container">
                        <p>
                          View our wide selection of accepted providers. Don’t see yours? Call our admissions team for help.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-3cb44618 e-con-full e-grid e-con e-child">
                    <div className="elementor-element elementor-element-64bca4b6 elementor-widget__width-inherit elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <Image src="/images/292ee1397e7a6587865ec9939779a277.webp" alt="" width={964} height={462} className="attachment-full size-full wp-image-709" />
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-7900d2d7 elementor-widget__width-inherit elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <Image src="/images/54ec747732d508ea61582710fc97ebe7.webp" alt="" width={965} height={462} className="attachment-full size-full wp-image-710" />
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-743bbadf elementor-widget__width-inherit elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <Image src="/images/1655130271393126c332bd92aadce65e.webp" alt="" width={964} height={462} className="attachment-full size-full wp-image-711" />
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-4e06ab58 elementor-widget__width-inherit elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <Image src="/images/bb324741da58d074cd8e21b590a4989a.webp" alt="" width={965} height={462} className="attachment-full size-full wp-image-712" />
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-368dbdfe elementor-widget__width-inherit elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <Image src="/images/6a4e1281b93a98481e12670cd3f197f5.webp" alt="" width={964} height={462} className="attachment-full size-full wp-image-713" />
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-1318c5e1 elementor-widget__width-inherit elementor-hidden-desktop elementor-hidden-tablet elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <Image src="/images/402d9b93cc8f7c2a23b8f7348b887bbb.webp" alt="" width={580} height={319} className="attachment-full size-full wp-image-714" />
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-238c31de elementor-widget__width-inherit elementor-hidden-mobile elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <Image src="/images/d056c6e0048782ba62915e88361a85e8.webp" alt="" width={965} height={462} className="attachment-full size-full wp-image-715" />
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-60a47341 elementor-widget__width-inherit elementor-hidden-desktop elementor-hidden-tablet elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <Image src="/images/e93ef3004df4809d289ada3fb0af8a74.webp" alt="" width={580} height={319} className="attachment-full size-full wp-image-716" />
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-16517e36 elementor-widget__width-inherit elementor-hidden-mobile elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <Image src="/images/9cb688b63a38575308d8f7df9cc0619b.webp" alt="" width={964} height={462} className="attachment-full size-full wp-image-717" />
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-118e14ea elementor-widget__width-inherit elementor-hidden-mobile elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <Image src="/images/cbed0c5421041e529233912aa59ca9ef.webp" alt="" width={242} height={116} className="attachment-full size-full wp-image-718" />
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-57f7b2f4 elementor-widget__width-inherit elementor-hidden-desktop elementor-hidden-tablet elementor-widget elementor-widget-image" data-widget_type="image.default">
                      <div className="elementor-widget-container">
                        <Image src="/images/b4a68bef03a3ce02d2719c6925f87634.webp" alt="" width={580} height={319} className="attachment-full size-full wp-image-719" />
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-662d72d9 e-con-full elementor-hidden-desktop elementor-hidden-tablet elementor-hidden-mobile e-flex e-con e-child">
                    <div className="elementor-element elementor-element-5b41984f elementor-align-justify elementor-widget-mobile__width-inherit elementor-hidden-tablet elementor-hidden-mobile elementor-widget elementor-widget-button" data-widget_type="button.default">
                      <div className="elementor-widget-container">
                        <div className="elementor-button-wrapper">
                          <Link className="elementor-button elementor-button-link elementor-size-sm" href="tel:+18887020484">
                            <span className="elementor-button-content-wrapper">
                              <span className="elementor-button-text">
                                888-702-0484
                              </span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-305c151b elementor-align-justify elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button" data-widget_type="button.default">
                      <div className="elementor-widget-container">
                        <div className="elementor-button-wrapper">
                          <Link className="elementor-button elementor-button-link elementor-size-sm" href="#verifyinsurance">
                            <span className="elementor-button-content-wrapper">
                              <span className="elementor-button-text">
                                Verify Insurance
                              </span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-2ce3b363 elementor-align-justify elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button" data-widget_type="button.default">
                      <div className="elementor-widget-container">
                        <div className="elementor-button-wrapper">
                          <Link className="elementor-button elementor-button-link elementor-size-sm" href="tel:+18887020484">
                            <span className="elementor-button-content-wrapper">
                              <span className="elementor-button-text">
                                Call Now! 844-759-0999
                              </span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-2621ea80 elementor-align-justify elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button" data-widget_type="button.default">
                      <div className="elementor-widget-container">
                        <div className="elementor-button-wrapper">
                          <Link className="elementor-button elementor-button-link elementor-size-sm" href="#verifyinsurance">
                            <span className="elementor-button-content-wrapper">
                              <span className="elementor-button-text">
                                Verify Your Insurance
                              </span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="elementor-element elementor-element-eb6156f e-con-full e-flex e-con e-child">
                    <div className="elementor-element elementor-element-1aad63f5 elementor-align-justify elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button" data-widget_type="button.default">
                      <div className="elementor-widget-container">
                        <div className="elementor-button-wrapper">
                          <Link className="elementor-button elementor-button-link elementor-size-sm" href="tel:+18887020484">
                            <span className="elementor-button-content-wrapper">
                              <span className="elementor-button-text">
                                888-702-0484
                              </span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="elementor-element elementor-element-641c4e9e elementor-align-justify elementor-widget-mobile__width-inherit elementor-widget elementor-widget-button" data-widget_type="button.default">
                      <div className="elementor-widget-container">
                        <div className="elementor-button-wrapper">
                          <Link className="elementor-button elementor-button-link elementor-size-sm" href="#verifyinsurance">
                            <span className="elementor-button-content-wrapper">
                              <span className="elementor-button-text">
                                Verify Your Insurance
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
          </div>
        </div>
      </div>
    </div>
    <div className="elementor-element elementor-element-cd42b9b interlinking-section e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;gradient&quot;}">
      <div className="e-con-inner">
        <div className="elementor-element elementor-element-38f294a elementor-widget elementor-widget-heading" data-widget_type="heading.default">
          <div className="elementor-widget-container">
            <h2 className="elementor-heading-title elementor-size-default">
              Related Pages
            </h2>
          </div>
        </div>
        <div className="elementor-element elementor-element-517da75 interlinking-shortcode__widget elementor-widget elementor-widget-shortcode" data-widget_type="shortcode.default">
          <div className="elementor-widget-container">
            <div className="elementor-shortcode">
              <div className="cards-wrapper">
                <div className="cards" role="list">
                  <article className="card" role="listitem" style={{"display":"block"}}>
                    <Link href="/location-served/usa/adhd/">
                      <h3>
                        ADHD Therapy Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"block"}}>
                    <Link href="/location-served/usa/premenstrual-dysphoric-disorder/">
                      <h3>
                        Premenstrual Dysphoric Disorder Treatment Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"block"}}>
                    <Link href="/location-served/usa/adjustment/">
                      <h3>
                        Adjustment Disorder Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"block"}}>
                    <Link href="/location-served/usa/borderline-personality-disorder/">
                      <h3>
                          Borderline Personality Disorder Treatment Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/personality-disorder/">
                      <h3>
                        Personality Disorder Treatment Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/neurodevelopment-disorder/">
                      <h3>
                        Neurodevelopment Disorder Treatment Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/virtual-iop/">
                      <h3>
                          Virtual IOP Rehab Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/drug-rehab/">
                      <h3>
                        Drug Rehab Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/php-drug-rehab/">
                      <h3>
                        PHP Rehab Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/iop-drug-rehab/">
                      <h3>
                        IOP Rehab Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/outpatient-drug-rehab/">
                      <h3>
                          Outpatient Rehab Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/lgbtq-drug-rehab/">
                      <h3>
                        LGBTQ Rehab Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/pet-friendly-rehab/">
                      <h3>
                        Pet Friendly Rehab Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/couples-rehab/">
                      <h3>
                        Couples Rehab Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/nitazene-addiction-treatment/">
                      <h3>
                        Nitazene Treatment] Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/ketamine-addiction-treatment/">
                      <h3>
                        Ketamine Treatment Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/xanax-addiction-treatment/">
                      <h3>
                        Best Xanax Rehab Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/benzo-addiction-treatment/">
                      <h3>
                        Best Benzo Rehab Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/fentanyl-addiction-treatment/">
                      <h3>
                        Best Fentanyl Rehab Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/marijuana-addiction-treatment/">
                      <h3>
                        Marijuana Treatment Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/kratom-addiction-treatment/">
                      <h3>
                        Best Kratom Rehab Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/cocaine-addiction-treatment/">
                      <h3>
                        Best Cocaine Rehab Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/meth-addiction-treatment/">
                      <h3>
                        Meth Treatment Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/emdr-therapy/">
                      <h3>
                        EMDR Therapy Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/dbt-therapy/">
                      <h3>
                        Best DBT Therapy Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/cbt-therapy/">
                      <h3>
                        Best CBT Therapy Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/mat-therapy/">
                      <h3>
                        MAT Therapy Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/dual-diagnosis-treatment/">
                      <h3>
                        Best Dual Diagnosis Rehab Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/psycho-dynamic/">
                      <h3>
                        Psycho Dynamic Therapy Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/dissociative-identity/">
                      <h3>
                        Dissociative Identity Disorder Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/social/">
                      <h3>
                        Social Anxiety Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/antisocial-personality/">
                      <h3>
                        Antisocial Personality Disorder Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/family/">
                      <h3>
                        Family Therapy Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/motivational/">
                      <h3>
                        Motivational Interview Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/act/">
                      <h3>
                        ACT Therapy Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/ifs/">
                      <h3>
                        IFS Therapy Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/panic-disorder/">
                      <h3>
                        Panic Disorder Treatment Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/trauma/">
                      <h3>
                        Trauma Treatment Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/cpt/">
                      <h3>
                        CPT Therapy Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/schizophrenia/">
                      <h3>
                        Schizophrenia Treatment Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/schizoaffective-disorder/">
                      <h3>
                        Schizoaffective Disorder Treatment Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/depression/">
                      <h3>
                        Depression Treatment Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/anxiety/">
                      <h3>
                        Anxiety Treatment Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/ptsd/">
                      <h3>
                        PTSD Treatment Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/bipolar/">
                      <h3>
                        Bipolar Disorder Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/obsessive-compulsive/">
                      <h3>
                        Obsessive Compulsive Disorder Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/mental-health/">
                      <h3>
                        Mental Health  Across the Country (Highly Reviewed & Awarded)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/ny/sober-living/">
                      <h3>
                        Escape New York To Our {topic_1} {topic_2} Centers Across The County
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/tn/sober-living/">
                      <h3>
                        Tennessee {topic_1} {topic_2} (Substance Abuse Treatment & Intervention)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/fl/sober-living/">
                      <h3>
                        Florida {topic_1} {topic_2} (Substance Abuse Treatment & Intervention)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/ca/sober-living/">
                      <h3>
                        California {topic_1} {topic_2} (Substance Abuse Treatment & Intervention)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/tn/nashville/sober-living/">
                      <h3>
                        Nashville {topic_1} {topic_2} (Substance Abuse Treatment & Intervention)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/fl/lantana/sober-living/">
                      <h3>
                        Lantana {topic_1} {topic_2} (Substance Abuse Treatment & Intervention)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/fl/lake-worth/sober-living/">
                      <h3>
                        Lake Worth {topic_1} {topic_2} (Substance Abuse Treatment & Intervention)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/fl/sober-living/">
                      <h3>
                        Delray {topic_1} {topic_2} (Substance Abuse Treatment & Intervention)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/ca/newport-beach/sober-living/">
                      <h3>
                        Newport Beach {topic_1} {topic_2} (Substance Abuse Treatment & Intervention)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/ca/laguna-beach/sober-living/">
                      <h3>
                        Laguna Beach {topic_1} {topic_2} (Substance Abuse Treatment & Intervention)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/ca/huntington-beach/sober-living/">
                      <h3>
                        Huntington Beach {topic_1} {topic_2} (Substance Abuse Treatment & Intervention)
                      </h3>
                    </Link>
                  </article>
                  <article className="card" role="listitem" style={{"display":"none"}}>
                    <Link href="/location-served/usa/ca/fountain-valley/sober-living/">
                      <h3>
                        Fountain Valley {topic_1} {topic_2} (Substance Abuse Treatment & Intervention)
                      </h3>
                    </Link>
                  </article>
                </div>
                <div id="button-wrapper">
                  <button id="relatedloadMoreBtn">
                    Load More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="elementor-element elementor-element-1d21950 e-flex e-con-boxed e-con e-parent" id="verifyinsurance" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
      <div className="e-con-inner">
        <div className="elementor-element elementor-element-d843c0a elementor-hidden-desktop elementor-widget elementor-widget-menu-anchor" data-widget_type="menu-anchor.default">
          <div className="elementor-widget-container">
            <div className="elementor-menu-anchor" id="verifyinsurace"></div>
          </div>
        </div>
        <div className="elementor-element elementor-element-316e2d7 e-con-full e-flex e-con e-child">
          <div className="elementor-element elementor-element-f95957a e-con-full e-flex e-con e-child">
            <div className="elementor-element elementor-element-bc9be2d e-con-full e-flex e-con e-child">
              <div className="elementor-element elementor-element-8d1ec88 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">
                    Contact Us
                  </h2>
                </div>
              </div>
              <div className="elementor-element elementor-element-b5f15b8 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                <div className="elementor-widget-container">
                  <h2 className="elementor-heading-title elementor-size-default">
                    We're Here to Help Day or Night
                  </h2>
                </div>
              </div>
              <div className="elementor-element elementor-element-3095981 elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                <div className="elementor-widget-container">
                  <p>
                    Whether you’re seeking help for yourself or a loved one, our admissions team is available 24/7 to answer your questions and guide you toward the right care.
                  </p>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-dd6a10b elementor-widget elementor-widget-image" data-widget_type="image.default">
              <div className="elementor-widget-container">
                <Image src="/images/f8ce11ad862d301faaf9ef4c0fa1b9c0.webp" alt="" width={807} height={579} className="attachment-full size-full wp-image-109134" />
              </div>
            </div>
          </div>
          <div className="elementor-element elementor-element-b407a0b e-con-full e-flex e-con e-child">
            <div className="elementor-element elementor-element-88ac59c elementor-widget__width-inherit elementor-widget-mobile__width-inherit elementor-widget elementor-widget-html" data-widget_type="html.default">
              <div className="elementor-widget-container">
                <iframe loading="lazy" id="JotFormIFrame-252953870854469" title="TDRC New Design Insurance Form" allow="geolocation; microphone; camera; fullscreen; payment" src="https://form.jotform.com/252953870854469?isIframeEmbed=1&parentURL=https%3A%2F%2Fdistrictbehavioralhealth.com%2Flocation-served%2Fusa%2Fsober-living%2F" style={{"minWidth":"100%","maxWidth":"100%","border":"none","height":"680px"}}></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <svg style={{"display":"none"}} className="e-font-icon-svg-symbols"></svg>
  <svg style={{"display":"none"}} className="e-font-icon-svg-symbols"></svg>
</div>
    </>
  );
}
