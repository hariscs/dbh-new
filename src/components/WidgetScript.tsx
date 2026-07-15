"use client";
import { useEffect, useRef } from "react";

export default function WidgetScript({ src, async: isAsync, defer: isDefer }: { src: string; async?: boolean; defer?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const script = document.createElement("script");
    script.src = src;
    if (isAsync) script.async = true;
    if (isDefer) script.defer = true;
    script.onload = () => window.dispatchEvent(new CustomEvent("widgetScriptLoaded", { detail: src }));
    ref.current.appendChild(script);
    return () => { script.remove(); };
  }, [src]);
  return <div ref={ref} />;
}