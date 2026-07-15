"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { SwiperOptions } from "swiper/types";

const initialized = new WeakSet<Element>();

function toCount(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export default function Carousels() {
  const pathname = usePathname();
  useEffect(() => {
    let cancelled = false;
    const containers = Array.from(
      document.querySelectorAll(".swiper, .swiper-container")
    ).filter((el) => !initialized.has(el));
    if (containers.length === 0) return;
    (async () => {
      const [{ default: Swiper }, { Navigation, Pagination, Autoplay }] = await Promise.all([
        import("swiper"),
        import("swiper/modules"),
      ]);
      if (cancelled) return;
      for (const el of containers) {
        if (!(el instanceof HTMLElement) || initialized.has(el)) continue;
        initialized.add(el);
        const wrapper = el.querySelector(".swiper-wrapper");
        if (wrapper instanceof HTMLElement) {
          wrapper.style.transform = "";
          wrapper.style.transitionDuration = "";
        }
        const widget = el.closest("[data-settings]");
        let settings: Record<string, unknown> = {};
        try {
          settings = JSON.parse(widget?.getAttribute("data-settings") ?? "{}");
        } catch {
          settings = {};
        }
        const desktop = toCount(settings.slides_to_show, 1);
        const tablet = toCount(settings.slides_to_show_tablet, desktop);
        const mobile = toCount(settings.slides_to_show_mobile, 1);
        const options: SwiperOptions = {
          modules: [Navigation, Pagination, Autoplay],
          slidesPerView: mobile,
          breakpoints: {
            768: { slidesPerView: tablet },
            1025: { slidesPerView: desktop },
          },
          loop: settings.infinite === "yes" || settings.loop === "yes",
          speed: toCount(settings.speed, 500),
          autoplay:
            settings.autoplay === "yes"
              ? { delay: toCount(settings.autoplay_speed, 5000) }
              : false,
        };
        const scope = widget ?? el;
        const nextEl = scope.querySelector(".elementor-swiper-button-next, .swiper-button-next");
        const prevEl = scope.querySelector(".elementor-swiper-button-prev, .swiper-button-prev");
        if (nextEl instanceof HTMLElement && prevEl instanceof HTMLElement) {
          options.navigation = { nextEl, prevEl };
        }
        const paginationEl = scope.querySelector(".swiper-pagination");
        if (paginationEl instanceof HTMLElement) {
          options.pagination = { el: paginationEl, clickable: true };
        }
        new Swiper(el, options);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);
  return null;
}
