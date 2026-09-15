"use client";

import { useEffect } from "react";
import { coverProgress } from "@/lib/pin-progress";

/** One scroll listener for the whole page; sections remain in normal flow. */
export function PageParallax() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section, .site-footer"),
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-heading, .service-card, .connection-grid > *, .work-beats > *, .steps article, .studio-grid > *, .contact-grid > *, .footer-top > *",
      ),
    );
    const workBeats = Array.from(
      document.querySelectorAll<HTMLElement>(".work-beat"),
    );
    const hero = document.querySelector<HTMLElement>(".hero");
    let frame = 0;
    let active = true;

    const render = () => {
      frame = 0;
      if (!active) return;
      const height = window.innerHeight;
      const compact = window.innerWidth < 768;
      // Read geometry before writing styles to avoid repeated layout work.
      const positions = sections.map((section) =>
        section.getBoundingClientRect(),
      );
      sections.forEach((section, index) => {
        const rect = positions[index];
        const progress = Math.max(
          -1,
          Math.min(
            1,
            (height / 2 - rect.top - rect.height / 2) /
              ((height + rect.height) / 2),
          ),
        );
        const amount = reduced.matches ? 0 : progress * (compact ? 0.38 : 1);
        section.style.setProperty("--depth", `${(amount * 118).toFixed(2)}px`);
        section.style.setProperty(
          "--depth-soft",
          `${(amount * 34).toFixed(2)}px`,
        );
        section.style.setProperty(
          "--depth-reverse",
          `${(amount * -58).toFixed(2)}px`,
        );
      });
      const pageRange = Math.max(
        document.documentElement.scrollHeight - height,
        1,
      );
      document.documentElement.style.setProperty(
        "--page-progress",
        `${Math.min(1, Math.max(0, window.scrollY / pageRange))}`,
      );
      workBeats.forEach((beat) => {
        beat.style.setProperty(
          "--p",
          reduced.matches ? "0.62" : coverProgress(beat).toFixed(4),
        );
      });
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    reduced.addEventListener("change", queue);
    document.documentElement.classList.add("motion-ready");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );
    revealTargets.forEach((target, index) => {
      target.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
      revealObserver.observe(target);
    });

    const onPointerMove = (event: PointerEvent) => {
      if (!hero || reduced.matches || window.innerWidth < 768) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      hero.style.setProperty("--pointer-x", `${(x * 28).toFixed(2)}px`);
      hero.style.setProperty("--pointer-y", `${(y * 20).toFixed(2)}px`);
      hero.style.setProperty("--pointer-image-x", `${(x * -16).toFixed(2)}px`);
      hero.style.setProperty("--pointer-image-y", `${(y * -10).toFixed(2)}px`);
      hero.style.setProperty("--pointer-rotate-y", `${(x * 2).toFixed(2)}deg`);
      hero.style.setProperty("--pointer-rotate-x", `${(y * -2).toFixed(2)}deg`);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    const observer = new ResizeObserver(queue);
    sections.forEach((section) => observer.observe(section));
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      revealObserver.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      window.removeEventListener("pointermove", onPointerMove);
      reduced.removeEventListener("change", queue);
      document.documentElement.classList.remove("motion-ready");
      document.documentElement.style.removeProperty("--page-progress");
      [
        "--pointer-x",
        "--pointer-y",
        "--pointer-image-x",
        "--pointer-image-y",
        "--pointer-rotate-y",
        "--pointer-rotate-x",
      ].forEach((key) => hero?.style.removeProperty(key));
      sections.forEach((section) => {
        ["--depth", "--depth-soft", "--depth-reverse"].forEach((key) =>
          section.style.removeProperty(key),
        );
      });
      workBeats.forEach((beat) => beat.style.removeProperty("--p"));
    };
  }, []);
  return null;
}
