import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { QUIZZES } from './quizData';

const FALLBACK_SLUG = 'generalized-anxiety-disorder-screening';

export default function Quiz({ slug }: { slug: string }) {
  const quiz = QUIZZES[slug] ?? QUIZZES[FALLBACK_SLUG];
  const iframeSrc =
    `https://form.jotform.com/${quiz.formId}?isIframeEmbed=1&parentURL=` +
    encodeURIComponent(`https://districtbehavioralhealth.com/quiz/${slug}/`);
  return (
    <>
    <div className="wp-singular page-template page-template-elementor_header_footer page page-id-104537 page-child parent-pageid-104503 wp-custom-logo wp-embed-responsive wp-theme-hello-elementor wp-child-theme-hello-theme-child-master hello-elementor-default elementor-default elementor-template-full-width elementor-kit-7 elementor-page elementor-page-104537 e--ua-blink e--ua-chrome e--ua-mac e--ua-webkit">
  <Link className="skip-link screen-reader-text" href="#content">
    Skip to content
  </Link>
  <div className="elementor elementor-104537">
    <div className="elementor-element elementor-element-432876e e-flex e-con-boxed e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
      <div className="e-con-inner">
        <div className="elementor-element elementor-element-1798c19 elementor-widget__width-initial elementor-widget elementor-widget-heading" data-widget_type="heading.default">
          <div className="elementor-widget-container">
            <h1 className="elementor-heading-title elementor-size-default">
              {quiz.h1}
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div className="elementor-element elementor-element-52e2f89 e-con-full e-flex e-con e-parent e-lazyloaded" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
      <div className="elementor-element elementor-element-7316e2d elementor-widget elementor-widget-html" data-widget_type="html.default">
        <div className="elementor-widget-container">
          <iframe loading="lazy" id={`JotFormIFrame-${quiz.formId}`} title={quiz.iframeTitle} allow="geolocation; microphone; camera; fullscreen; payment" src={iframeSrc} style={{"minWidth":"100%","maxWidth":"100%","height":"2282px","border":"none"}}></iframe>
        </div>
      </div>
    </div>
    <div className="elementor-element elementor-element-f26ab73 e-flex e-con-boxed e-con e-parent e-lazyloaded">
      <div className="e-con-inner">
        <div className="elementor-element elementor-element-230a6f1 e-con-full e-flex e-con e-child">
          <div className="elementor-element elementor-element-661e026 elementor-widget elementor-widget-heading" data-widget_type="heading.default">
            <div className="elementor-widget-container">
              <h2 className="elementor-heading-title elementor-size-default">
                {quiz.h2}
              </h2>
            </div>
          </div>
          <div className="elementor-element elementor-element-4f2041a elementor-widget elementor-widget-text-editor" data-widget_type="text-editor.default">
            <div className="elementor-widget-container" dangerouslySetInnerHTML={{ __html: quiz.descriptionHtml }} />
          </div>
        </div>
        <div className="elementor-element elementor-element-28ceb87 e-con-full e-flex e-con e-child">
          <div className="elementor-element elementor-element-926c366 elementor-widget elementor-widget-image" data-widget_type="image.default">
            <div className="elementor-widget-container">
              <Image src="/images/efb86b9e0036fb8d01b8bd3bc83b94dd.webp" alt="pexels andrew neel 3132388 2 scaled e1698869700999" width={2560} height={1156} className="attachment-full size-full wp-image-104488" />
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
