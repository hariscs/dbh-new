"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PrimaryNav from "@/components/PrimaryNav";
import { FALLBACK_TEL_HREF } from "@/lib/phone";

// Mobile off-canvas menu. Markup duplicated from Header.tsx desktop nav
// (Option A) with wrapper ids removed and mm-panel-*/mega-group-* ids
// suffixed `-m` to avoid duplicate ids in the DOM. Open/close wiring +
// scroll lock are added in Chunk 2.
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  // The call button's number comes from the page's builder `tel_phone` field, but this
  // component is rendered by the layout, which cannot read page data without making every
  // route dynamic (see the note in layout.tsx). The page's own <Header> already renders that
  // number, so read it back off the DOM and fall back to the shared default.
  const [telHref, setTelHref] = useState(FALLBACK_TEL_HREF);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const firstRun = useRef(true);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;
      const opener = el.closest("[data-mobile-menu-open]");
      if (opener) {
        e.preventDefault();
        triggerRef.current = opener as HTMLElement;
        setOpen(true);
        return;
      }
      if (el.closest("[data-mobile-menu-close]")) {
        e.preventDefault();
        setOpen(false);
        return;
      }
      // "Back" inside a submenu closes that submenu (removes .is-open)
      const back = el.closest(".dbh-megaback");
      if (back) {
        e.preventDefault();
        const item = back.closest(".dbh-nav__item");
        if (item) {
          item.classList.remove("is-open");
          item.querySelector("a[aria-haspopup]")?.setAttribute("aria-expanded", "false");
        }
        return;
      }
      // close when a real (navigating) link inside the drawer is clicked
      const link = el.closest("a[href]");
      if (link && link.closest(".dbh-mobile-drawer")) {
        const href = link.getAttribute("href") ?? "";
        if (href && href !== "#" && !link.hasAttribute("aria-haspopup")) setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const trigger =
      triggerRef.current ??
      document.querySelector<HTMLElement>("[data-mobile-menu-open]");
    trigger?.setAttribute("aria-expanded", String(open));
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (open) closeBtnRef.current?.focus();
    else trigger?.focus();
  }, [open]);

  useEffect(() => {
    // scroll-lock via class (not inline style) so layout.tsx's body-style-guard
    // MutationObserver, which only resets inline body.style.overflow, ignores it
    document.body.classList.toggle("dbh-menu-open", open);
    return () => document.body.classList.remove("dbh-menu-open");
  }, [open]);

  useEffect(() => {
    // Prefer the header's link (that is the page's `tel_phone`); fall back to any tel: link
    // on the page before the hardcoded default.
    const fromHeader = document.querySelector<HTMLAnchorElement>(
      '.elementor-location-header a[href^="tel:"]'
    );
    const anyTel = fromHeader ?? document.querySelector<HTMLAnchorElement>('a[href^="tel:"]');
    const href = anyTel?.getAttribute("href")?.trim();
    if (href) setTelHref(href);
  }, []);

  return (
    <div id="elementor-popup-modal-104913" className={`dbh-mobile-modal${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
      <div className="dbh-mobile-overlay" data-mobile-menu-close="" />
      <aside className="dbh-mobile-drawer">
        <div className="dbh-mobile-drawer__head">
          <Link href="/" className="dbh-mobile-logo">
            <Image src="/images/27be6d13936a8bc6dbcfb656bcd95b80.webp" alt="District Behavioral Health" width={840} height={259} />
          </Link>
          <div className="dbh-mobile-drawer__actions">
            <a className="dbh-mobile-call" href={telHref} aria-label="Call us">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
              </svg>
            </a>
            <button type="button" ref={closeBtnRef} className="dbh-mobile-close" data-mobile-menu-close="" aria-label="Close menu">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <nav className="dbh-nav">
                  <ul className="dbh-nav__list">
            <PrimaryNav idSuffix="-m" withBack />
          </ul>
                </nav>
      </aside>
    </div>
  );
}
