"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FALLBACK_PHONE, FALLBACK_TEL_HREF, type ResolvedPhone } from "@/lib/phone";

const SHOWN_KEY = "dbh-exit-popup-shown";
const ARM_DELAY_MS = 3000;
const DESKTOP_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 1025px)";
const EXCLUDED_PATHS = new Set(["/thank-you"]);
const HEADER_TEL_LINK = '.elementor-location-header .menu-cta a[href^="tel:"]';

// Storage that throws (blocked cookies, some private modes) counts as shown, so
// a visitor we cannot remember is never shown the popup on every exit.
function wasShownThisSession(): boolean {
  try {
    return sessionStorage.getItem(SHOWN_KEY) === "1";
  } catch {
    return true;
  }
}

function markShownThisSession() {
  try {
    sessionStorage.setItem(SHOWN_KEY, "1");
  } catch {}
}

// The header number varies by page and CallTrackingMetrics has already swapped
// it by the time a visitor leaves, so reading it here picks up the tracked number.
function readPagePhone(): ResolvedPhone {
  const telHref = document.querySelector(HEADER_TEL_LINK)?.getAttribute("href");
  const digits = telHref?.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  if (!telHref || digits?.length !== 10) return { phone: FALLBACK_PHONE, telHref: FALLBACK_TEL_HREF };
  return { phone: `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`, telHref };
}

export default function ExitIntentPopup() {
  const pathname = usePathname();
  const [phone, setPhone] = useState<ResolvedPhone | null>(null);
  const shownRef = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = phone !== null;

  useEffect(() => {
    const excluded = EXCLUDED_PATHS.has(pathname.replace(/\/$/, ""));
    if (excluded || shownRef.current || wasShownThisSession()) return;

    // A null relatedTarget means the cursor left the document, not just moved
    // between elements; clientY <= 0 narrows that to the top edge (tabs, URL bar).
    const onMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget !== null || event.clientY > 0) return;
      if (!window.matchMedia(DESKTOP_QUERY).matches) return;
      shownRef.current = true;
      markShownThisSession();
      document.removeEventListener("mouseout", onMouseOut);
      setPhone(readPagePhone());
    };
    const armTimer = window.setTimeout(() => document.addEventListener("mouseout", onMouseOut), ARM_DELAY_MS);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPhone(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open]);

  if (!phone) return null;

  return (
    <div
      className="dbh-exit-popup"
      onClick={(event) => {
        if (event.target === event.currentTarget) setPhone(null);
      }}
    >
      <div className="dbh-exit-popup__dialog" role="dialog" aria-modal="true" aria-labelledby="dbh-exit-popup-title">
        <div className="dbh-exit-popup__media">
          <Image src="/images/exit-intent-popup.webp" alt="" width={400} height={469} sizes="400px" className="dbh-exit-popup__photo" />
          <p className="dbh-exit-popup__badge">All Calls are 100% free and confidential</p>
        </div>
        <div className="dbh-exit-popup__content">
          <button ref={closeRef} type="button" className="dbh-exit-popup__close" aria-label="Close" onClick={() => setPhone(null)}>
            <svg viewBox="0 0 14 14" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <Image src="/images/exit-intent-popup-logo.webp" alt="District Behavioral Health" width={840} height={259} sizes="100px" className="dbh-exit-popup__logo" />
          <h2 id="dbh-exit-popup-title" className="dbh-exit-popup__title">
            Real Recovery from Substance Abuse &amp; Mental Health Starts Here
          </h2>
          <p className="dbh-exit-popup__text">
            Connect with our experienced clinicians to get a personalized substance abuse and mental health
            treatment plan designed for you.
          </p>
          <a className="dbh-exit-popup__call" href={phone.telHref}>
            {phone.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
