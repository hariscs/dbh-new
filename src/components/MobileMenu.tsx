"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PrimaryNav from "@/components/PrimaryNav";

// Mobile off-canvas menu. Markup duplicated from Header.tsx desktop nav
// (Option A) with wrapper ids removed and mm-panel-*/mega-group-* ids
// suffixed `-m` to avoid duplicate ids in the DOM. Open/close wiring +
// scroll lock are added in Chunk 2.
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
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

  return (
    <div id="elementor-popup-modal-104913" className={`dbh-mobile-modal${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
      <div className="dbh-mobile-overlay" data-mobile-menu-close="" />
      <aside className="dbh-mobile-drawer">
        <div className="dbh-mobile-drawer__head">
          <Link href="/" className="dbh-mobile-logo">
            <Image src="/images/27be6d13936a8bc6dbcfb656bcd95b80.webp" alt="District Behavioral Health" width={840} height={259} />
          </Link>
          <button type="button" ref={closeBtnRef} className="dbh-mobile-close" data-mobile-menu-close="" aria-label="Close menu">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18M18 6L6 18" stroke="#006CAE" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
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
