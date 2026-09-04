"use client";

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type WorkScrubProps = {
  children: ReactNode;
  className?: string;
};

const MID = 0.62;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/**
 * Sets --p from 0→1 while this band crosses the viewport.
 * Reverse on scroll back. Frozen mid-frame when reduced-motion is on.
 */
export function WorkScrub({ children, className }: WorkScrubProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const setP = (value: number) => {
      node.style.setProperty("--p", value.toFixed(4));
    };

    const rest = () => {
      setP(MID);
    };

    const measure = () => {
      frame = 0;
      if (reduceMotion.matches) {
        rest();
        return;
      }

      const rect = node.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const total = viewH + rect.height;
      const traveled = viewH - rect.top;
      setP(clamp01(traveled / Math.max(total, 1)));
    };

    const queue = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    const onReduceChange = () => {
      if (reduceMotion.matches) rest();
      else measure();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) measure();
      },
      { rootMargin: "40% 0px" },
    );

    if (reduceMotion.matches) rest();
    else measure();

    io.observe(node);
    window.addEventListener("scroll", queue, { passive: true });
    document.addEventListener("scroll", queue, { passive: true, capture: true });
    window.addEventListener("resize", queue);
    reduceMotion.addEventListener("change", onReduceChange);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", queue);
      document.removeEventListener("scroll", queue, { capture: true });
      window.removeEventListener("resize", queue);
      reduceMotion.removeEventListener("change", onReduceChange);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("work-scrub", className)}
      data-work-scrub=""
      style={{ "--p": String(MID) } as CSSProperties}
    >
      {children}
    </div>
  );
}
