"use client";
import { useEffect, useRef } from "react";

export function TrustIndexWidget({ widgetId }: { widgetId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.querySelector("script")) return;
    const script = document.createElement("script");
    script.src = `https://cdn.trustindex.io/loader.js?${widgetId}`;
    script.async = true;
    script.defer = true;
    ref.current.appendChild(script);
  }, [widgetId]);
  return <div ref={ref} />;
}