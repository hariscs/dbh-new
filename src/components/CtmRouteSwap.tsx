"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __ctm?: { main?: { runNow?: (el?: Element) => void } };
  }
}

const MAX_ATTEMPTS = 20;
const RETRY_INTERVAL_MS = 250;

export default function CtmRouteSwap() {
  const pathname = usePathname();

  useEffect(() => {
    let attempts = 0;
    let timer = 0;

    const swap = () => {
      const main = window.__ctm?.main;
      if (main?.runNow) {
        main.runNow(document.body);
        return;
      }
      attempts += 1;
      if (attempts >= MAX_ATTEMPTS) return;
      timer = window.setTimeout(swap, RETRY_INTERVAL_MS);
    };

    swap();
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}