"use client";
import { useEffect, useState } from "react";

/**
 * Elementor table-of-contents widget, shared by the CRO1 (Elementor 691) and CRO2
 * (Elementor 978) national templates.
 *
 * The live site renders this widget's list in the browser — the server HTML is only a
 * spinner, and the JS that fills it wasn't part of the export. This reproduces that:
 * spinner first, then the real list once mounted. Both templates configure the widget
 * identically:
 *
 *   headings_by_tags: ["h2"]   container: ".table-of-content-headings"
 *   marker_view: "numbers"     hierarchical_view: "yes"
 *
 * The container selector comes from each widget's own settings and is not the same on every
 * template, hence the `container` prop:
 *   CRO1 (691)  / CRO2 (978)  -> ".table-of-content-headings"   (the default)
 *   Blog, CRO1 (2841)         -> ".content-area"
 *
 * A page can have more than one matching container. CRO2 has a single one (the
 * blog_section_1___con body). CRO1 has two: the section holding h2___head and h2___con, then
 * the section holding blog_section_1___con — and the TOC covers both, in document order. So
 * every matching container is scanned, not just the first.
 *
 * Headings that arrive via dangerouslySetInnerHTML carry no ids, so ids are assigned here to
 * give the anchors a target.
 */

type Entry = { id: string; text: string; level: number; children: Entry[] };

/**
 * Nest a flat, document-order heading list by rank: a smaller level number (h2 vs h3) is a
 * parent, an equal level is a sibling. A heading that is deeper than its predecessor by more
 * than one step (h2 -> h4, which the builder content does use) still nests one level down
 * rather than inventing empty intermediates.
 */
function nest(flat: Entry[]): Entry[] {
  const roots: Entry[] = [];
  const stack: Entry[] = [];
  for (const entry of flat) {
    while (stack.length > 0 && stack[stack.length - 1].level >= entry.level) stack.pop();
    if (stack.length > 0) stack[stack.length - 1].children.push(entry);
    else roots.push(entry);
    stack.push(entry);
  }
  return roots;
}

const slugify = (text: string, index: number) => {
  const base = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
  return base ? `${base}-${index}` : `section-${index}`;
};

export default function ElementorTableOfContents({
  container = ".table-of-content-headings",
}: {
  container?: string;
}) {
  const [entries, setEntries] = useState<Entry[] | null>(null);

  useEffect(() => {
    const containers = document.querySelectorAll(container);
    if (containers.length === 0) {
      setEntries([]);
      return;
    }
    const found: Entry[] = [];
    let i = 0;
    for (const container of containers) {
      container.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((h) => {
        // the widget's own chrome must never become an entry
        if (h.closest(".elementor-widget-table-of-contents")) return;
        const text = (h.textContent ?? "").trim();
        if (!text) return;
        if (!h.id) h.id = slugify(text, i);
        found.push({ id: h.id, text, level: Number(h.tagName[1]), children: [] });
        i += 1;
      });
    }
    setEntries(nest(found));
  }, [container]);

  if (entries === null) {
    return (
      <div className="elementor-toc__spinner-container">
        <svg
          className="elementor-toc__spinner eicon-animation-spin e-font-icon-svg e-eicon-loading"
          aria-hidden="true"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M500 975V858C696 858 858 696 858 500S696 142 500 142 142 304 142 500H25C25 237 238 25 500 25S975 237 975 500 763 975 500 975Z" />
        </svg>
      </div>
    );
  }

  if (entries.length === 0) {
    return <div className="elementor-toc__no-headings-message">No headings were found on this page.</div>;
  }

  return <List entries={entries} depth={0} />;
}

/**
 * Nested lists reuse .elementor-toc__list-wrapper, which is what the stylesheet indents
 * (`.elementor-toc__list-item .elementor-toc__list-wrapper`) and what makes the markers read
 * as 1., 1.1., 1.2. — `counters(item, ".")` walks every enclosing counter scope.
 */
function List({ entries, depth }: { entries: Entry[]; depth: number }) {
  return (
    <ol className="elementor-toc__list-wrapper">
      {entries.map((entry) => (
        <li key={entry.id} className="elementor-toc__list-item">
          {/* the numbering comes from .elementor-toc__list-item-text-wrapper::before
              (content: counters(item, ".")), so this wrapper is required for the marker */}
          <div className="elementor-toc__list-item-text-wrapper">
            <a
              className={
                depth === 0
                  ? "elementor-toc__list-item-text elementor-toc__top-level"
                  : "elementor-toc__list-item-text"
              }
              href={`#${entry.id}`}
            >
              {entry.text}
            </a>
          </div>
          {entry.children.length > 0 && <List entries={entry.children} depth={depth + 1} />}
        </li>
      ))}
    </ol>
  );
}
