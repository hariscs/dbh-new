"use client";
import { useEffect } from "react";

export default function WidgetInteractions() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;

      if (!target.closest(".has-mega-menu")) {
        for (const openItem of document.querySelectorAll(".has-mega-menu.is-open")) {
          openItem.classList.remove("is-open");
          openItem.querySelector("a[aria-haspopup]")?.setAttribute("aria-expanded", "false");
        }
      }

      const actionLink = target.closest('a[href^="#elementor-action"]');
      if (actionLink) {
        e.preventDefault();
        return;
      }

      const popupLink = target.closest('a[href="#"][aria-haspopup]');
      if (popupLink) {
        e.preventDefault();
        const item = popupLink.closest(".has-mega-menu");
        if (item) {
          const open = !item.classList.contains("is-open");
          for (const other of document.querySelectorAll(".has-mega-menu.is-open")) {
            if (other !== item) {
              other.classList.remove("is-open");
              other.querySelector("a[aria-haspopup]")?.setAttribute("aria-expanded", "false");
            }
          }
          item.classList.toggle("is-open", open);
          popupLink.setAttribute("aria-expanded", String(open));
        }
        return;
      }

      const menuToggle = target.closest(".elementor-menu-toggle");
      if (menuToggle) {
        const active = menuToggle.classList.toggle("elementor-active");
        menuToggle.setAttribute("aria-expanded", String(active));
        const widget = menuToggle.closest(".elementor-widget-nav-menu") ?? menuToggle.parentElement;
        const dropdown = widget?.querySelector(".elementor-nav-menu--dropdown");
        if (dropdown instanceof HTMLElement) {
          dropdown.classList.toggle("elementor-active", active);
          dropdown.setAttribute("aria-hidden", String(!active));
          dropdown.style.display = active ? "block" : "none";
        }
        return;
      }

      const subLink = target.closest(".elementor-nav-menu--dropdown li.menu-item-has-children > a");
      if (subLink) {
        const href = subLink.getAttribute("href") ?? "";
        const onArrow = !!target.closest(".sub-arrow");
        if (onArrow || href === "" || href === "#") {
          e.preventDefault();
          const open = subLink.classList.toggle("elementor-active");
          const sub = subLink.parentElement?.querySelector(":scope > ul");
          if (sub instanceof HTMLElement) sub.style.display = open ? "block" : "none";
          return;
        }
      }

      const accTitle = target.closest(
        ".elementor-accordion .elementor-tab-title, .elementor-toggle .elementor-tab-title"
      );
      if (accTitle) {
        e.preventDefault();
        const wasActive = accTitle.classList.contains("elementor-active");
        const accordion = accTitle.closest(".elementor-accordion");
        if (accordion && !wasActive) {
          for (const t of accordion.querySelectorAll(".elementor-tab-title.elementor-active")) {
            t.classList.remove("elementor-active");
            t.setAttribute("aria-expanded", "false");
          }
          for (const c of accordion.querySelectorAll(".elementor-tab-content")) {
            if (c instanceof HTMLElement) c.style.display = "none";
          }
        }
        accTitle.classList.toggle("elementor-active", !wasActive);
        accTitle.setAttribute("aria-expanded", String(!wasActive));
        const content = accTitle.parentElement?.querySelector(".elementor-tab-content");
        if (content instanceof HTMLElement) content.style.display = wasActive ? "none" : "block";
        return;
      }

      const tabTitle = target.closest(".elementor-tabs .elementor-tab-title");
      if (tabTitle) {
        e.preventDefault();
        const tabs = tabTitle.closest(".elementor-tabs");
        const idx = tabTitle.getAttribute("data-tab");
        if (!tabs || !idx) return;
        for (const t of tabs.querySelectorAll(".elementor-tab-title")) {
          const on = t.getAttribute("data-tab") === idx;
          t.classList.toggle("elementor-active", on);
          t.setAttribute("aria-expanded", String(on));
        }
        for (const c of tabs.querySelectorAll(".elementor-tab-content")) {
          if (!(c instanceof HTMLElement)) continue;
          const on = c.getAttribute("data-tab") === idx;
          c.classList.toggle("elementor-active", on);
          c.style.display = on ? "block" : "none";
        }
        return;
      }

      const ariaTab = target.closest('[role="tab"][aria-controls]');
      if (ariaTab) {
        e.preventDefault();
        const nTabs = ariaTab.closest(".e-n-tabs");
        if (nTabs) nTabs.classList.add("e-activated");
        const tablist = ariaTab.closest('[role="tablist"]') ?? ariaTab.parentElement;
        const tabs = tablist
          ? Array.from(tablist.querySelectorAll('[role="tab"][aria-controls]'))
          : [ariaTab];
        for (const tab of tabs) {
          const selected = tab === ariaTab;
          tab.setAttribute("aria-selected", String(selected));
          tab.setAttribute("tabindex", selected ? "0" : "-1");
          tab.classList.toggle("is-active", selected);
          const panel = document.getElementById(tab.getAttribute("aria-controls") ?? "");
          if (panel) {
            panel.classList.toggle("e-active", selected);
            panel.classList.toggle("is-active", selected);
          }
        }
        return;
      }

      const lightboxLink = target.closest("a[data-elementor-open-lightbox]");
      if (lightboxLink) {
        const mode = lightboxLink.getAttribute("data-elementor-open-lightbox");
        const href = lightboxLink.getAttribute("href") ?? "";
        const isImage = /\.(png|jpe?g|gif|webp|avif|svg)(\?.*)?$/i.test(href);
        if (mode !== "no" && isImage) {
          e.preventDefault();
          const overlay = document.createElement("div");
          overlay.style.cssText =
            "position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;cursor:zoom-out";
          const img = document.createElement("img");
          img.src = href;
          img.alt = "";
          img.style.cssText = "max-width:90vw;max-height:90vh;object-fit:contain";
          overlay.appendChild(img);
          const onKey = (ev: KeyboardEvent) => {
            if (ev.key === "Escape") close();
          };
          const close = () => {
            overlay.remove();
            document.removeEventListener("keydown", onKey);
          };
          overlay.addEventListener("click", close);
          document.addEventListener("keydown", onKey);
          document.body.appendChild(overlay);
        }
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;
      for (const sub of document.querySelectorAll(
        ".elementor-nav-menu--main li.menu-item-has-children > ul"
      )) {
        if (!(sub instanceof HTMLElement)) continue;
        const li = sub.parentElement;
        if (!li) continue;
        if (li.contains(target)) {
          const nested = !!li.parentElement?.closest("li.menu-item-has-children");
          sub.style.display = "block";
          sub.style.position = "absolute";
          sub.style.zIndex = "9999";
          sub.style.top = nested ? "0" : "100%";
          sub.style.left = nested ? "100%" : "0";
        } else {
          sub.style.display = "none";
        }
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("mouseover", onMouseOver);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);
  return null;
}
