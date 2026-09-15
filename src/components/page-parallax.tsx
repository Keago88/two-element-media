"use client";

import { useEffect } from "react";

/** One scroll listener for the whole page; sections remain in normal flow. */
export function PageParallax() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(
      "main > section, .site-footer",
    ));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let active = true;

    const render = () => {
      frame = 0;
      if (!active) return;
      const height = window.innerHeight;
      const compact = window.innerWidth < 768;
      // Read geometry before writing styles to avoid repeated layout work.
      const positions = sections.map((section) => section.getBoundingClientRect());
      sections.forEach((section, index) => {
        const rect = positions[index];
        const progress = Math.max(-1, Math.min(1,
          (height / 2 - rect.top - rect.height / 2) / ((height + rect.height) / 2),
        ));
        const amount = reduced.matches ? 0 : progress * (compact ? 0.3 : 1);
        section.style.setProperty("--depth", `${(amount * 60).toFixed(2)}px`);
        section.style.setProperty("--depth-soft", `${(amount * 18).toFixed(2)}px`);
        section.style.setProperty("--depth-reverse", `${(amount * -28).toFixed(2)}px`);
      });
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    reduced.addEventListener("change", queue);
    const observer = new ResizeObserver(queue);
    sections.forEach((section) => observer.observe(section));
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      reduced.removeEventListener("change", queue);
      sections.forEach((section) => {
        ["--depth", "--depth-soft", "--depth-reverse"].forEach((key) => section.style.removeProperty(key));
      });
    };
  }, []);
  return null;
}
