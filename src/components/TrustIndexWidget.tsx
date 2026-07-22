"use client";
import { useEffect, useRef, useState } from "react";

// TrustIndex widget preset stylesheet — loaded on demand alongside the widget
// script (not on initial page load) so it stays off the critical path.
const TRUSTINDEX_CSS =
  "https://cdn.trustindex.io/assets/widget-presetted-css/v2/80-light-background.css";

export function TrustIndexWidget({ widgetId }: { widgetId: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  // Shows a shimmer skeleton until the third-party widget renders its reviews.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const wrap = wrapRef.current;
    if (!host || !wrap || host.querySelector("script")) return;

    let fallback: ReturnType<typeof setTimeout> | undefined;

    const load = () => {
      if (host.querySelector("script")) return;
      // Inject the preset stylesheet once, together with the widget script.
      if (!document.querySelector(`link[rel="stylesheet"][href="${TRUSTINDEX_CSS}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = TRUSTINDEX_CSS;
        document.head.appendChild(link);
      }
      const script = document.createElement("script");
      script.src = `https://cdn.trustindex.io/loader.js?${widgetId}`;
      script.async = true;
      script.defer = true;
      host.appendChild(script);
      // Safety net: reveal the widget area even if content detection ever misses.
      fallback = setTimeout(() => setLoaded(true), 12000);
    };

    // The loader renders the reviews into `host` (as a sibling of the script it
    // injects). Watch for that content and drop the shimmer once it has height.
    const mo = new MutationObserver(() => {
      const contentHeight = Array.from(host.children)
        .filter((c) => c.tagName !== "SCRIPT")
        .reduce((sum, c) => sum + (c as HTMLElement).offsetHeight, 0);
      if (contentHeight > 40) {
        setLoaded(true);
        mo.disconnect();
        if (fallback) clearTimeout(fallback);
      }
    });
    mo.observe(host, { childList: true, subtree: true });

    // Defer loading the reviews widget (a ~100 KiB third party) until it's near the
    // viewport, so its script and network cost stay off the initial load / main thread.
    let observer: IntersectionObserver | undefined;
    if (!("IntersectionObserver" in window)) {
      load();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer!.disconnect();
            load();
          }
        },
        { rootMargin: "300px" }
      );
      observer.observe(wrap);
    }

    return () => {
      observer?.disconnect();
      mo.disconnect();
      if (fallback) clearTimeout(fallback);
    };
  }, [widgetId]);

  return (
    <div ref={wrapRef} className="dbh-ti-wrap">
      {!loaded && (
        <div className="dbh-ti-shimmer" aria-hidden="true">
          <div className="dbh-ti-shimmer__card" />
          <div className="dbh-ti-shimmer__card" />
          <div className="dbh-ti-shimmer__card" />
        </div>
      )}
      {/* Third-party loader owns this node's contents — React never renders into it. */}
      <div ref={hostRef} />
    </div>
  );
}
