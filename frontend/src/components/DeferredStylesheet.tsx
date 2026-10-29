"use client";
import { useEffect } from "react";

export default function DeferredStylesheet({ href }: { href: string }) {
  useEffect(() => {
    if (document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [href]);
  return null;
}