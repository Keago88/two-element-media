"use client";

import { useLayoutEffect } from "react";

function supportsScrollDriven(): boolean {
  return (
    typeof CSS !== "undefined" &&
    CSS.supports("animation-timeline", "scroll()") &&
    CSS.supports("animation-range", "0% 100%")
  );
}

function scrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0;
}

/**
 * JS fallback for decorative depth layers when CSS scroll-driven
 * animations are unavailable. No-ops on Chromium/Safari, mobile, and
 * prefers-reduced-motion.
 */
export function DepthFallback() {
  useLayoutEffect(() => {
    if (supportsScrollDriven()) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 767px)");
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement | SVGElement>("[data-depth]"),
    );
    let frame = 0;

    const rest = () => {
      for (const node of nodes) {
        node.style.transform = "none";
        node.style.removeProperty("will-change");
      }
    };

    const apply = () => {
      frame = 0;
      if (reduceMotion.matches || compact.matches) {
        rest();
        return;
      }

      const y = scrollY();
      const vh = window.innerHeight || 1;

      for (const node of nodes) {
        const kind = node.dataset.depth;
        const t = Math.min(1, y / (vh * 0.7));
        let transform = "none";

        if (kind === "page-twin") {
          transform = `translate3d(${-8 - t * 10}%, ${-10 + t * 38}%, 0) scale(${1 + t * 0.12})`;
          node.style.opacity = String(0.02 + t * 0.05);
        } else if (kind === "hero-grid") {
          transform = `translate3d(0, ${t * -32}%, 0)`;
        } else if (kind === "hero-twin") {
          transform = `translate3d(${t * -8}%, ${t * 36}%, 0) scale(${1 + t * 0.1})`;
        } else if (kind === "hero-hairline") {
          transform = `translate3d(0, ${t * 42}%, 0)`;
          node.style.opacity = String(0.28 - t * 0.22);
        } else if (kind === "hero-scrim") {
          const s = Math.min(1, y / (vh * 0.55));
          transform = `translate3d(0, ${(1 - s) * 18}%, 0)`;
          node.style.opacity = String(0.08 + s * 0.84);
        }

        node.style.willChange = "transform";
        node.style.transform = transform;
      }
    };

    const queue = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    reduceMotion.addEventListener("change", apply);
    compact.addEventListener("change", apply);

    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      reduceMotion.removeEventListener("change", apply);
      compact.removeEventListener("change", apply);
      if (frame) window.cancelAnimationFrame(frame);
      rest();
    };
  }, []);

  return null;
}
