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
 * JS fallback for hero mid-plane strokes when CSS scroll timelines
 * are unavailable. No-ops on supporting browsers, mobile, reduced-motion.
 */
export function DepthFallback() {
  useLayoutEffect(() => {
    if (supportsScrollDriven()) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 767px)");
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-depth]"),
    );
    let frame = 0;

    const rest = () => {
      for (const node of nodes) {
        node.style.transform = "none";
      }
    };

    const apply = () => {
      frame = 0;
      if (reduceMotion.matches || compact.matches) {
        rest();
        return;
      }

      const t = Math.min(1, scrollY() / 600);
      for (const node of nodes) {
        const kind = node.dataset.depth;
        if (kind === "hero-grid") {
          node.style.transform = `translate3d(0, ${t * -10}%, 0)`;
        } else if (kind === "hero-strokes") {
          node.style.transform = `translate3d(0, ${t * 28}%, 0)`;
        }
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
