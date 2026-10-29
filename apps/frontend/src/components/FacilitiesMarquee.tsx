"use client";
import { useEffect } from "react";

// Drives the dual-track image marquee on /our-facilities. Each belt in the markup
// contains 3 identical copies of its images, so scrolling by one copy's width and
// wrapping (modulo) gives a seamless infinite loop. Both belts share one offset and
// advance at the same speed, matching the original site's behavior.
//
// The belt is also draggable by mouse: press and drag horizontally to scrub the
// gallery, release to resume auto-scrolling. Touch is intentionally left alone so
// vertical page scrolling on mobile is unaffected.
const SPEED = 0.6; // px per frame
const COPIES = 3;

// Always-positive modulo so the belt stays seamless when dragged in either direction
// (JS `%` can return negatives, which would expose a gap when dragging backwards).
const wrap = (v: number, m: number) => ((v % m) + m) % m;

export default function FacilitiesMarquee() {
  useEffect(() => {
    const track = document.querySelector<HTMLElement>(".dual-track");
    const belts = Array.from(
      document.querySelectorAll<HTMLElement>(".dual-track .slide-belt")
    );
    if (!track || belts.length === 0) return;

    const copyWidth = new Map<HTMLElement, number>();
    const measure = () => {
      for (const belt of belts) copyWidth.set(belt, belt.scrollWidth / COPIES);
    };
    measure();

    // Image widths (width:auto) aren't known until they load; re-measure then.
    const imgs = belts.flatMap((b) => Array.from(b.querySelectorAll("img")));
    let pending = imgs.filter((i) => !i.complete).length;
    const onImg = () => {
      if (--pending <= 0) measure();
    };
    if (pending > 0) {
      for (const img of imgs) {
        if (!img.complete) img.addEventListener("load", onImg, { once: true });
      }
    }
    window.addEventListener("resize", measure);

    let offset = 0;
    let dragging = false;
    let startX = 0;
    let startOffset = 0;

    const apply = () => {
      for (const belt of belts) {
        const w = copyWidth.get(belt) ?? 0;
        if (w > 0) belt.style.transform = `translateX(-${wrap(offset, w)}px)`;
      }
    };

    let raf = 0;
    const loop = () => {
      if (!dragging) offset += SPEED; // auto-scroll pauses while the user drags
      apply();
      raf = requestAnimationFrame(loop);
    };

    // --- mouse drag ---
    // Mouse events only (not touch), so vertical page scrolling on touch devices is
    // unaffected. move/up are on window so a drag continues even if the cursor
    // leaves the belt.
    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return; // left button only
      dragging = true;
      startX = e.clientX;
      startOffset = offset;
      track.style.cursor = "grabbing";
      e.preventDefault();
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      // Drag right -> content follows the cursor right (offset decreases).
      offset = startOffset - (e.clientX - startX);
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      track.style.cursor = "grab";
    };
    const onDragStart = (e: Event) => e.preventDefault(); // block native image ghost-drag

    track.style.cursor = "grab";
    track.style.userSelect = "none";
    track.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    track.addEventListener("dragstart", onDragStart);

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      track.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      track.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
