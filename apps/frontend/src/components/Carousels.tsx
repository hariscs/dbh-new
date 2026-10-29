"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { SwiperOptions } from "swiper/types";

const initialized = new WeakSet<Element>();

type SwiperCtor = (typeof import("swiper"))["default"];
type SwiperModules = typeof import("swiper/modules");

// Load Swiper lazily and only once, shared across every carousel on the page.
let swiperPromise: Promise<{ Swiper: SwiperCtor; modules: SwiperModules }> | null = null;
function loadSwiper() {
  if (!swiperPromise) {
    swiperPromise = Promise.all([import("swiper"), import("swiper/modules")]).then(
      ([core, modules]) => ({ Swiper: core.default, modules })
    );
  }
  return swiperPromise;
}

function toCount(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

// Elementor's image_spacing_custom ({ size, unit }) maps to Swiper's spaceBetween,
// which renders as margin-right between slides. Falls back when tablet/mobile are blank.
function toGap(value: unknown, fallback: number): number {
  const size = (value as { size?: unknown } | null | undefined)?.size;
  // Elementor leaves tablet/mobile blank ("") to inherit the desktop value —
  // note Number("") is 0, not NaN, so guard the empty/missing case explicitly.
  if (size === "" || size == null) return fallback;
  const n = Number(size);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function initCarousel(el: HTMLElement, Swiper: SwiperCtor, modules: SwiperModules) {
  const { Navigation, Pagination, Autoplay } = modules;
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

  const slideCount = wrapper
    ? Array.from(wrapper.children).filter((c) => c.classList.contains("swiper-slide")).length
    : 0;
  const wantsLoop = settings.infinite === "yes" || settings.loop === "yes";
  const gap = toGap(settings.image_spacing_custom, 0);
  const gapTablet = toGap(settings.image_spacing_custom_tablet, gap);
  const gapMobile = toGap(settings.image_spacing_custom_mobile, gap);
  const options: SwiperOptions = {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: mobile,
    spaceBetween: gapMobile,
    breakpoints: {
      768: { slidesPerView: tablet, spaceBetween: gapTablet },
      1025: { slidesPerView: desktop, spaceBetween: gap },
    },
    loop: wantsLoop && slideCount >= Math.max(desktop, tablet, mobile) * 2,
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

export default function Carousels() {
  const pathname = usePathname();
  useEffect(() => {
    const containers = Array.from(
      document.querySelectorAll<HTMLElement>(".swiper, .swiper-container")
    ).filter((el) => !initialized.has(el));
    if (containers.length === 0) return;

    let cancelled = false;

    const init = async (el: HTMLElement) => {
      if (cancelled || initialized.has(el)) return;
      initialized.add(el);
      const { Swiper, modules } = await loadSwiper();
      if (cancelled) return;
      initCarousel(el, Swiper, modules);
    };

    // Defer each carousel until it's near the viewport, so Swiper's code and setup
    // stay off the initial load / main thread (keeps TBT down). Off-screen carousels
    // never pay their cost until scrolled to.
    if (!("IntersectionObserver" in window)) {
      containers.forEach(init);
      return () => {
        cancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            obs.unobserve(entry.target);
            init(entry.target as HTMLElement);
          }
        }
      },
      { rootMargin: "200px" }
    );
    containers.forEach((el) => observer.observe(el));

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [pathname]);
  return null;
}
