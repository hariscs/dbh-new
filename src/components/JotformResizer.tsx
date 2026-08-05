"use client";
import { useEffect } from "react";

// JotForm iframes are embedded with a hardcoded height. Each form (embedded with
// ?isIframeEmbed=1) posts a "setHeight:<height>:<formID>" message from *.jotform.com
// once its content is measured (on load, on content changes, and when the layout
// reflows). We validate the origin, parse the height, and resize the matching iframe
// so it fits its content instead of being clipped (scrollbar) or leaving empty space.
//
// JotForm's setHeight reports document.body's content height, which excludes the form
// body's own margin (~16px by default). Without a small buffer the iframe ends up a
// few px short of document.documentElement and shows a scrollbar.
const HEIGHT_BUFFER = 24;

// Embeds appear with either id="JotFormIFrame-<formID>" or the bare form id, so match
// on the src as well rather than on the id prefix alone.
const JOTFORM_IFRAMES = 'iframe[id^="JotFormIFrame-"], iframe[src*="form.jotform.com"]';

export default function JotformResizer() {
  useEffect(() => {
    // Remember each form's last reported height so we can re-apply it on window
    // resize (the reflow itself is also re-reported by JotForm, but this keeps the
    // iframe correct immediately and if a message is missed).
    const lastHeight = new WeakMap<HTMLIFrameElement, number>();

    function isJotformOrigin(origin: string): boolean {
      try {
        const host = new URL(origin).hostname;
        return host === "jotform.com" || host.endsWith(".jotform.com");
      } catch {
        return false;
      }
    }

    function findIframe(formId: string): HTMLIFrameElement | null {
      // Standard embed: id="JotFormIFrame-<formID>".
      const prefixed = document.getElementById(`JotFormIFrame-${formId}`);
      if (prefixed instanceof HTMLIFrameElement) return prefixed;

      // About half the embeds on this site carry the bare form id instead
      // (id="252953870854469"), with `name` set to the same value.
      const bare = document.getElementById(formId);
      if (bare instanceof HTMLIFrameElement) return bare;
      const byName = document.querySelector<HTMLIFrameElement>(`iframe[name="${formId}"]`);
      if (byName) return byName;

      // Last resort: the only JotForm iframe on the page, whichever id form it uses.
      const all = document.querySelectorAll<HTMLIFrameElement>(JOTFORM_IFRAMES);
      return all.length === 1 ? all[0] : null;
    }

    function applyHeight(iframe: HTMLIFrameElement, height: number) {
      lastHeight.set(iframe, height);
      iframe.style.height = `${height + HEIGHT_BUFFER}px`;
    }

    function onMessage(event: MessageEvent) {
      if (!isJotformOrigin(event.origin)) return;
      // The classic embed sends a colon-delimited string, e.g. "setHeight:915:2509...".
      if (typeof event.data !== "string") return;
      const args = event.data.split(":");
      if (args[0] !== "setHeight") return;

      const height = Number(args[1]);
      if (!Number.isFinite(height) || height <= 0) return;

      const iframe = findIframe(args[args.length - 1]);
      if (iframe) applyHeight(iframe, height);
    }

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        for (const iframe of document.querySelectorAll<HTMLIFrameElement>(JOTFORM_IFRAMES)) {
          const height = lastHeight.get(iframe);
          if (height) iframe.style.height = `${height + HEIGHT_BUFFER}px`;
        }
      }, 150);
    }

    window.addEventListener("message", onMessage);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return null;
}
