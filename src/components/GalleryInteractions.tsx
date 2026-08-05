"use client";
import { useEffect } from "react";

/**
 * Facility gallery ("Tour our rehab center …"): the "Show all photos" toggle and the
 * lightbox.
 *
 * The Elementor export shipped the markup (.g-wrap / .dmg-grid / .g-item / #dmg-lb) and
 * the CSS for the button and lightbox chrome, but none of the behaviour. The original
 * WordPress script keyed off `data-gallery`/`data-index` attributes and a PHP-populated
 * registry, neither of which survived the export — and in fact neither is present on the
 * live site either, which is why clicking a tile does nothing there.
 *
 * So this derives everything from the DOM instead: the image list is read from the tiles
 * themselves, and the index is the tile's position in its own gallery. That works for any
 * number of galleries per page and needs no markup changes.
 */
export default function GalleryInteractions() {
  useEffect(() => {
    let images: string[] = [];
    let current = 0;

    const lightbox = () => document.getElementById("dmg-lb");

    // The export omits the <img> the lightbox CSS targets, so create it on first use.
    function lightboxImage(): HTMLImageElement | null {
      const existing = document.getElementById("dmg-lb-img");
      if (existing instanceof HTMLImageElement) return existing;
      const wrap = document.getElementById("dmg-lb-img-wrap");
      if (!wrap) return null;
      const img = document.createElement("img");
      img.id = "dmg-lb-img";
      img.alt = "";
      wrap.appendChild(img);
      return img;
    }

    function tilesOf(wrap: Element): HTMLElement[] {
      return Array.from(wrap.querySelectorAll<HTMLElement>(".g-item"));
    }

    function srcOf(tile: Element): string {
      const img = tile.querySelector("img");
      // currentSrc resolves the srcset entry actually in use; fall back to src.
      return img ? img.currentSrc || img.src : "";
    }

    function show(index: number, animate: boolean) {
      const img = lightboxImage();
      if (!img) return;
      const counter = document.getElementById("dmg-lb-counter");
      const fill = document.getElementById("dmg-lb-bar-fill");
      if (animate) {
        img.classList.add("switching");
        window.setTimeout(() => {
          img.src = images[index];
          img.classList.remove("switching");
        }, 220);
      } else {
        img.src = images[index];
      }
      if (counter) counter.textContent = `${index + 1} / ${images.length}`;
      if (fill) fill.style.width = `${((index + 1) / images.length) * 100}%`;
    }

    function open(wrap: Element, index: number) {
      images = tilesOf(wrap).map(srcOf).filter(Boolean);
      if (!images.length) return;
      const lb = lightbox();
      if (!lb) return;
      current = index;
      lb.style.display = "flex";
      requestAnimationFrame(() => {
        lb.classList.add("open");
        window.setTimeout(() => lb.classList.add("ready"), 10);
      });
      show(current, false);
      document.body.style.overflow = "hidden";
    }

    function close() {
      const lb = lightbox();
      if (!lb) return;
      lb.classList.remove("ready");
      window.setTimeout(() => {
        lb.classList.remove("open");
        lb.style.display = "none";
      }, 350);
      document.body.style.overflow = "";
    }

    function navigate(direction: number) {
      if (!images.length) return;
      current = (current + direction + images.length) % images.length;
      show(current, true);
    }

    const isOpen = () => !!lightbox()?.classList.contains("open");

    function onClick(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const tile = target.closest(".g-item");
      if (tile) {
        const wrap = tile.closest(".g-wrap");
        if (wrap) {
          e.preventDefault();
          open(wrap, tilesOf(wrap).indexOf(tile as HTMLElement));
        }
        return;
      }

      if (target.closest("#dmg-lb-close")) return close();
      if (target.id === "dmg-lb") return close();
      if (target.closest("#dmg-lb-prev")) return navigate(-1);
      if (target.closest("#dmg-lb-next")) return navigate(1);

      const toggle = target.closest(".dmg-toggle");
      if (toggle instanceof HTMLElement) {
        const wrap = toggle.closest(".g-wrap");
        const grid = wrap?.querySelector(".dmg-grid");
        if (!wrap || !grid) return;
        const expanded = grid.classList.toggle("expanded");
        wrap.querySelector(".dmg-fade")?.classList.toggle("hidden", expanded);
        toggle.textContent = expanded ? "Show less ↑" : "Show all photos ↓";
        if (!expanded) {
          window.setTimeout(() => wrap.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
        }
      }
    }

    function onKey(e: KeyboardEvent) {
      if (!isOpen()) return;
      if (e.key === "ArrowRight") navigate(1);
      else if (e.key === "ArrowLeft") navigate(-1);
      else if (e.key === "Escape") close();
    }

    let touchStartX = 0;
    function onTouchStart(e: TouchEvent) {
      if (isOpen()) touchStartX = e.touches[0].clientX;
    }
    function onTouchEnd(e: TouchEvent) {
      if (!isOpen()) return;
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 50) navigate(delta > 0 ? 1 : -1);
    }

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
