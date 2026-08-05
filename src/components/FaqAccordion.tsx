/**
 * FAQ accordion built from a builder `faqs___con` HTML blob.
 *
 * The builder stores FAQs as a flat run of heading/paragraph pairs:
 *
 *   <h3>Question?</h3>
 *   <p>Answer.</p>
 *   <h3>Next question?</h3>
 *   <p>Next answer.</p>
 *
 * The live WordPress site sliced that HTML the same way — each heading became an item
 * title, the markup following it became the item body — and emitted the .custom-accordion
 * markup that `page.css` styles. This reproduces that server-side, so the FAQ text is in
 * the initial HTML (indexable, no hydration cost) rather than hardcoded per template.
 *
 * Titles and bodies are injected as HTML, not text: the builder emits entities
 * (`&#8211;`) and inline tags (<strong>, <a>) that would otherwise render literally.
 *
 * Open/closed state is CSS-driven off `.custom-accordion__item.active`; the inline
 * display:none on closed bodies mirrors what the export shipped. The click behaviour
 * lives in WidgetInteractions (delegated), since this renders on the server.
 */

type FaqItem = { title: string; body: string };

// Headings delimit items, so everything between one heading and the next is that item's
// body — which keeps multi-paragraph and list answers intact rather than taking only the
// first <p>. Backreferenced \1 so <h3>…</h3> can't be closed by a stray </h2>.
const HEADING = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1\s*>/gi;

const hasText = (html: string) => html.replace(/<[^>]*>/g, "").trim().length > 0;

export function parseFaqs(html: string): FaqItem[] {
  if (!html) return [];
  const items: FaqItem[] = [];
  const matches = [...html.matchAll(HEADING)];
  for (const [index, match] of matches.entries()) {
    const bodyStart = match.index + match[0].length;
    const bodyEnd = index + 1 < matches.length ? matches[index + 1].index : html.length;
    const title = match[2].trim();
    // Drop items with an empty question or an empty answer — an accordion row that opens
    // onto nothing is worse than not rendering it.
    if (!hasText(title)) continue;
    const body = html.slice(bodyStart, bodyEnd).trim();
    if (!hasText(body)) continue;
    items.push({ title, body });
  }
  return items;
}

export default function FaqAccordion({ html }: { html?: string }) {
  const items = parseFaqs(html ?? "");
  if (items.length === 0) return null;

  return (
    <div className="custom-accordion">
      {items.map((item, i) => {
        const open = i === 0; // the export ships the first item expanded
        return (
          <div key={i} className={open ? "custom-accordion__item active" : "custom-accordion__item"}>
            <div className="accordion-item__header">
              <div
                className="accordion-item__title"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <div className="accordion-item__icon">
                <div className={open ? "closed-icon hidden" : "closed-icon"}></div>
                <div className={open ? "opened-icon" : "opened-icon hidden"}></div>
              </div>
            </div>
            <div
              className="accordion-item__content"
              {...(open ? {} : { style: { display: "none" } })}
              dangerouslySetInnerHTML={{ __html: item.body }}
            />
          </div>
        );
      })}
    </div>
  );
}
