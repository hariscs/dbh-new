import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AuthorCard from './meet-the-team/AuthorCard';
import { authorSections } from './meet-the-team/authors';

export default function Page() {
  return (
    <>
    <div className="wp-singular page-template-default page page-id-2113 wp-custom-logo wp-embed-responsive wp-theme-hello-elementor wp-child-theme-hello-theme-child-master hello-elementor-default elementor-default elementor-kit-7 elementor-page elementor-page-2113 e--ua-blink e--ua-chrome e--ua-mac e--ua-webkit">
  <Link className="skip-link screen-reader-text" href="#content">
    Skip to content
  </Link>
  <div id="content" className="site-main post-2113 page type-page status-publish hentry">
    <div className="page-content">
      <div className="elementor elementor-2113">
        <div className="elementor-element elementor-element-386137d e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-2829273 elementor-widget-mobile__width-auto elementor-absolute elementor-hidden-mobile elementor-widget elementor-widget-image" data-settings="{&quot;_position&quot;:&quot;absolute&quot;}" data-widget_type="image.default">
              <div className="elementor-widget-container">
                <Image src="/images/e68b35a4834158476e4f4f794b30f04d.webp" alt="banner left img" width={461} height={537} className="attachment-full size-full wp-image-2128" />
              </div>
            </div>
            <div className="elementor-element elementor-element-cffef7b e-flex e-con-boxed e-con e-child">
              <div className="e-con-inner">
                <div className="elementor-element elementor-element-fc1a1e3 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                  <div className="elementor-widget-container">
                    <h2 className="elementor-heading-title elementor-size-default">
                      Our Team
                    </h2>
                  </div>
                </div>
                <div className="elementor-element elementor-element-4fa530f elementor-widget__width-initial elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                  <div className="elementor-widget-container">
                    
									Compassionate care, delivered by experienced professionals.								
                  </div>
                </div>
              </div>
            </div>
            <div className="elementor-element elementor-element-bba96c1 elementor-absolute elementor-hidden-mobile elementor-widget elementor-widget-image" data-settings="{&quot;_position&quot;:&quot;absolute&quot;}" data-widget_type="image.default">
              <div className="elementor-widget-container">
                <Image src="/images/ee41bfc7b9efc0dd834541682a0035da.webp" alt="banner right img" width={461} height={537} className="attachment-full size-full wp-image-2127" />
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-element elementor-element-6a177a8 author-loop e-flex e-con-boxed e-con e-parent e-lazyloaded">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-11b093d elementor-widget elementor-widget-heading" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  Executive Team
                </h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-eae4436 elementor-grid-3 elementor-grid-tablet-2 elementor-grid-mobile-1 elementor-widget elementor-widget-loop-grid" data-settings="{&quot;template_id&quot;:&quot;103473&quot;,&quot;columns&quot;:3,&quot;columns_tablet&quot;:2,&quot;pagination_type&quot;:&quot;load_more_infinite_scroll&quot;,&quot;row_gap&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:60,&quot;sizes&quot;:[]},&quot;row_gap_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:20,&quot;sizes&quot;:[]},&quot;_skin&quot;:&quot;post&quot;,&quot;columns_mobile&quot;:&quot;1&quot;,&quot;edit_handle_selector&quot;:&quot;[data-elementor-type=\\&quot;loop-item\\&quot;]&quot;,&quot;load_more_spinner&quot;:{&quot;value&quot;:&quot;fas fa-spinner&quot;,&quot;library&quot;:&quot;fa-solid&quot;}}" data-widget_type="loop-grid.post">
              <div className="elementor-widget-container">
                <div className="elementor-loop-container elementor-grid" role="list">
                  {authorSections[0].map((author) => (
                    <AuthorCard key={author.postId} author={author} />
                  ))}
                </div>
                <span className="e-load-more-spinner">
                  <svg aria-hidden="true" className="e-font-icon-svg e-fas-spinner" viewBox="0 0 512 512">
                    <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-element elementor-element-4bc6286 e-flex e-con-boxed e-con e-parent e-lazyloaded">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-446f43e elementor-widget elementor-widget-heading" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  Clinical Team
                </h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-6a03a2e elementor-grid-5 elementor-grid-tablet-2 elementor-grid-mobile-1 team-members__loop elementor-widget elementor-widget-loop-grid" data-settings="{&quot;template_id&quot;:&quot;103459&quot;,&quot;columns&quot;:5,&quot;columns_tablet&quot;:2,&quot;pagination_type&quot;:&quot;load_more_infinite_scroll&quot;,&quot;row_gap&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:20,&quot;sizes&quot;:[]},&quot;columns_mobile&quot;:1,&quot;_skin&quot;:&quot;post&quot;,&quot;edit_handle_selector&quot;:&quot;[data-elementor-type=\\&quot;loop-item\\&quot;]&quot;,&quot;load_more_spinner&quot;:{&quot;value&quot;:&quot;fas fa-spinner&quot;,&quot;library&quot;:&quot;fa-solid&quot;}}" data-widget_type="loop-grid.post">
              <div className="elementor-widget-container">
                <div className="elementor-loop-container elementor-grid" role="list">
                  {authorSections[1].map((author) => (
                    <AuthorCard key={author.postId} author={author} />
                  ))}
                </div>
                <span className="e-load-more-spinner">
                  <svg aria-hidden="true" className="e-font-icon-svg e-fas-spinner" viewBox="0 0 512 512">
                    <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-element elementor-element-f89c085 e-flex e-con-boxed e-con e-parent">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-a2179fa elementor-widget elementor-widget-heading" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  Therapists
                </h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-155ce2a elementor-grid-5 elementor-grid-tablet-2 elementor-grid-mobile-1 team-members__loop elementor-widget elementor-widget-loop-grid" data-settings="{&quot;template_id&quot;:&quot;103459&quot;,&quot;columns&quot;:5,&quot;columns_tablet&quot;:2,&quot;pagination_type&quot;:&quot;load_more_infinite_scroll&quot;,&quot;row_gap&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:20,&quot;sizes&quot;:[]},&quot;columns_mobile&quot;:1,&quot;_skin&quot;:&quot;post&quot;,&quot;edit_handle_selector&quot;:&quot;[data-elementor-type=\\&quot;loop-item\\&quot;]&quot;,&quot;load_more_spinner&quot;:{&quot;value&quot;:&quot;fas fa-spinner&quot;,&quot;library&quot;:&quot;fa-solid&quot;}}" data-widget_type="loop-grid.post">
              <div className="elementor-widget-container">
                <div className="elementor-loop-container elementor-grid" role="list">
                  {authorSections[2].map((author) => (
                    <AuthorCard key={author.postId} author={author} />
                  ))}
                </div>
                <span className="e-load-more-spinner">
                  <svg aria-hidden="true" className="e-font-icon-svg e-fas-spinner" viewBox="0 0 512 512">
                    <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-element elementor-element-f266153 e-flex e-con-boxed e-con e-parent e-lazyloaded">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-74fe8d2 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  Case Managers
                </h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-081a131 elementor-grid-5 elementor-grid-tablet-2 elementor-grid-mobile-1 team-members__loop elementor-widget elementor-widget-loop-grid" data-settings="{&quot;template_id&quot;:&quot;103459&quot;,&quot;columns&quot;:5,&quot;columns_tablet&quot;:2,&quot;pagination_type&quot;:&quot;load_more_infinite_scroll&quot;,&quot;row_gap&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:20,&quot;sizes&quot;:[]},&quot;columns_mobile&quot;:1,&quot;_skin&quot;:&quot;post&quot;,&quot;edit_handle_selector&quot;:&quot;[data-elementor-type=\\&quot;loop-item\\&quot;]&quot;,&quot;load_more_spinner&quot;:{&quot;value&quot;:&quot;fas fa-spinner&quot;,&quot;library&quot;:&quot;fa-solid&quot;}}" data-widget_type="loop-grid.post">
              <div className="elementor-widget-container">
                <div className="elementor-loop-container elementor-grid" role="list">
                  {authorSections[3].map((author) => (
                    <AuthorCard key={author.postId} author={author} />
                  ))}
                </div>
                <span className="e-load-more-spinner">
                  <svg aria-hidden="true" className="e-font-icon-svg e-fas-spinner" viewBox="0 0 512 512">
                    <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-element elementor-element-58ec60f e-flex e-con-boxed e-con e-parent e-lazyloaded">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-86616a9 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  Operations
                </h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-3f20be1 elementor-grid-5 elementor-grid-tablet-2 elementor-grid-mobile-1 team-members__loop elementor-widget elementor-widget-loop-grid" data-settings="{&quot;template_id&quot;:&quot;103459&quot;,&quot;columns&quot;:5,&quot;columns_tablet&quot;:2,&quot;pagination_type&quot;:&quot;load_more_infinite_scroll&quot;,&quot;row_gap&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:20,&quot;sizes&quot;:[]},&quot;columns_mobile&quot;:1,&quot;_skin&quot;:&quot;post&quot;,&quot;edit_handle_selector&quot;:&quot;[data-elementor-type=\\&quot;loop-item\\&quot;]&quot;,&quot;load_more_spinner&quot;:{&quot;value&quot;:&quot;fas fa-spinner&quot;,&quot;library&quot;:&quot;fa-solid&quot;}}" data-widget_type="loop-grid.post">
              <div className="elementor-widget-container">
                <div className="elementor-loop-container elementor-grid" role="list">
                  {authorSections[4].map((author) => (
                    <AuthorCard key={author.postId} author={author} />
                  ))}
                </div>
                <span className="e-load-more-spinner">
                  <svg aria-hidden="true" className="e-font-icon-svg e-fas-spinner" viewBox="0 0 512 512">
                    <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-element elementor-element-64a7b95 e-flex e-con-boxed e-con e-parent e-lazyloaded">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-0fe1ace elementor-widget elementor-widget-heading" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  Writers
                </h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-2cb5dd0 elementor-grid-5 elementor-grid-tablet-2 elementor-grid-mobile-1 team-members__loop elementor-widget elementor-widget-loop-grid" data-settings="{&quot;template_id&quot;:&quot;103459&quot;,&quot;columns&quot;:5,&quot;columns_tablet&quot;:2,&quot;pagination_type&quot;:&quot;load_more_infinite_scroll&quot;,&quot;row_gap&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:20,&quot;sizes&quot;:[]},&quot;columns_mobile&quot;:1,&quot;_skin&quot;:&quot;post&quot;,&quot;edit_handle_selector&quot;:&quot;[data-elementor-type=\\&quot;loop-item\\&quot;]&quot;,&quot;load_more_spinner&quot;:{&quot;value&quot;:&quot;fas fa-spinner&quot;,&quot;library&quot;:&quot;fa-solid&quot;}}" data-widget_type="loop-grid.post">
              <div className="elementor-widget-container">
                <div className="elementor-loop-container elementor-grid" role="list">
                  {authorSections[5].map((author) => (
                    <AuthorCard key={author.postId} author={author} />
                  ))}
                </div>
                <span className="e-load-more-spinner">
                  <svg aria-hidden="true" className="e-font-icon-svg e-fas-spinner" viewBox="0 0 512 512">
                    <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-element elementor-element-eab3835 e-flex e-con-boxed e-con e-parent e-lazyloaded">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-335f131 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  Admissions
                </h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-f1be893 elementor-grid-5 elementor-grid-tablet-2 elementor-grid-mobile-1 team-members__loop elementor-widget elementor-widget-loop-grid" data-settings="{&quot;template_id&quot;:&quot;103459&quot;,&quot;columns&quot;:5,&quot;columns_tablet&quot;:2,&quot;pagination_type&quot;:&quot;load_more_infinite_scroll&quot;,&quot;row_gap&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:20,&quot;sizes&quot;:[]},&quot;columns_mobile&quot;:1,&quot;_skin&quot;:&quot;post&quot;,&quot;edit_handle_selector&quot;:&quot;[data-elementor-type=\\&quot;loop-item\\&quot;]&quot;,&quot;load_more_spinner&quot;:{&quot;value&quot;:&quot;fas fa-spinner&quot;,&quot;library&quot;:&quot;fa-solid&quot;}}" data-widget_type="loop-grid.post">
              <div className="elementor-widget-container">
                <div className="elementor-loop-container elementor-grid" role="list">
                  {authorSections[6].map((author) => (
                    <AuthorCard key={author.postId} author={author} />
                  ))}
                </div>
                <span className="e-load-more-spinner">
                  <svg aria-hidden="true" className="e-font-icon-svg e-fas-spinner" viewBox="0 0 512 512">
                    <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-element elementor-element-14393d0 e-flex e-con-boxed e-con e-parent e-lazyloaded">
          <div className="e-con-inner">
            <div className="elementor-element elementor-element-2534edc elementor-widget elementor-widget-heading" data-widget_type="heading.default">
              <div className="elementor-widget-container">
                <h2 className="elementor-heading-title elementor-size-default">
                  Admin
                </h2>
              </div>
            </div>
            <div className="elementor-element elementor-element-19550be elementor-grid-5 elementor-grid-tablet-2 elementor-grid-mobile-1 team-members__loop elementor-widget elementor-widget-loop-grid" data-settings="{&quot;template_id&quot;:&quot;103459&quot;,&quot;columns&quot;:5,&quot;columns_tablet&quot;:2,&quot;pagination_type&quot;:&quot;load_more_infinite_scroll&quot;,&quot;row_gap&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_tablet&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:30,&quot;sizes&quot;:[]},&quot;row_gap_mobile&quot;:{&quot;unit&quot;:&quot;px&quot;,&quot;size&quot;:20,&quot;sizes&quot;:[]},&quot;columns_mobile&quot;:1,&quot;_skin&quot;:&quot;post&quot;,&quot;edit_handle_selector&quot;:&quot;[data-elementor-type=\\&quot;loop-item\\&quot;]&quot;,&quot;load_more_spinner&quot;:{&quot;value&quot;:&quot;fas fa-spinner&quot;,&quot;library&quot;:&quot;fa-solid&quot;}}" data-widget_type="loop-grid.post">
              <div className="elementor-widget-container">
                <div className="elementor-loop-container elementor-grid" role="list">
                  {authorSections[7].map((author) => (
                    <AuthorCard key={author.postId} author={author} />
                  ))}
                </div>
                <span className="e-load-more-spinner">
                  <svg aria-hidden="true" className="e-font-icon-svg e-fas-spinner" viewBox="0 0 512 512">
                    <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="elementor-element elementor-element-19e0686 e-con-full e-flex e-con e-parent e-lazyloaded">
          <div className="elementor-element elementor-element-61fb1bb elementor-widget elementor-widget-template" data-widget_type="template.default">
            <div className="elementor-widget-container">
              <div className="elementor-template">
                <div className="elementor elementor-3115">
                  <div className="elementor-element elementor-element-19ac283e e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                    <div className="e-con-inner">
                      <div className="elementor-element elementor-element-99e3248 e-con-full e-flex e-con e-child">
                        <div className="elementor-element elementor-element-1d685b1c e-con-full e-flex e-con e-child">
                          <div className="elementor-element elementor-element-67eeeeb2 e-con-full e-flex e-con e-child">
                            <div className="elementor-element elementor-element-2a7885a1 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                              <div className="elementor-widget-container">
                                <h2 className="elementor-heading-title elementor-size-default">
                                  Contact Us
                                </h2>
                              </div>
                            </div>
                            <div className="elementor-element elementor-element-52faab38 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
                              <div className="elementor-widget-container">
                                <h2 className="elementor-heading-title elementor-size-default">
                                  We're Here to Help Day or Night
                                </h2>
                              </div>
                            </div>
                            <div className="elementor-element elementor-element-1c92a7b2 elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
                              <div className="elementor-widget-container">
                                <p>
                                  Whether you’re seeking help for yourself or a loved one, our admissions team is available 24/7 to answer your questions and guide you toward the right care.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="elementor-element elementor-element-1b744bfd elementor-widget elementor-widget-image" data-widget_type="image.default">
                            <div className="elementor-widget-container">
                              <Image src="/images/f8ce11ad862d301faaf9ef4c0fa1b9c0.webp" alt="shutterstock 2023831943 1" width={807} height={579} className="attachment-full size-full wp-image-109134" />
                            </div>
                          </div>
                        </div>
                        <div className="elementor-element elementor-element-7d76f483 e-con-full e-flex e-con e-child">
                          <div className="elementor-element elementor-element-3e2aafc8 elementor-widget__width-inherit elementor-widget-mobile__width-inherit elementor-widget elementor-widget-html" data-widget_type="html.default">
                            <div className="elementor-widget-container">
                              <iframe loading="lazy" id="JotFormIFrame-252953870854469" title="TDRC New Design Insurance Form" allow="geolocation; microphone; camera; fullscreen; payment" src="https://form.jotform.com/252953870854469?isIframeEmbed=1&parentURL=https%3A%2F%2Fdistrictbehavioralhealth.com%2Fmeet-the-team%2F" style={{"minWidth":"100%","maxWidth":"100%","border":"none","height":"680px"}}></iframe>
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
  <svg style={{"display":"none"}} className="e-font-icon-svg-symbols"></svg>
</div>
    </>
  );
}
