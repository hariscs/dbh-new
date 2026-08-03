"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __ctm?: { main?: { runNow?: (el?: Element) => void } };
  }
}

const RETRY_INTERVAL_MS = 250;
const MAX_WAIT_MS = 30_000;

export default function CtmRouteSwap() {
  const pathname = usePathname();

  useEffect(() => {
    let waited = 0;
    let timer = 0;

    const swap = () => {
      const main = window.__ctm?.main;
      if (main?.runNow) {
        main.runNow(document.body);
        return;
      }
      waited += RETRY_INTERVAL_MS;
      if (waited >= MAX_WAIT_MS) return;
      timer = window.setTimeout(swap, RETRY_INTERVAL_MS);
    };

    swap();
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}