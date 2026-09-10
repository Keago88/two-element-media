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
const HEADER_PX = 72;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function pinActive() {
  return (
    window.matchMedia("(min-width: 768px)").matches &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  );
}

/**
 * Sets --p from 0→1 while this band is in play.
 * Desktop + motion: progress maps to the sticky pin distance (full scrub on stage).
 * Mobile / reduced-motion: cover-range as the band crosses, or frozen mid-frame.
 */
export function WorkScrub({ children, className }: WorkScrubProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
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

      if (pinActive()) {
        const pinDist = Math.max(rect.height - (viewH - HEADER_PX), 1);
        const scrolled = HEADER_PX - rect.top;
        setP(clamp01(scrolled / pinDist));
        return;
      }

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
    desktop.addEventListener("change", queue);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", queue);
      document.removeEventListener("scroll", queue, { capture: true });
      window.removeEventListener("resize", queue);
      reduceMotion.removeEventListener("change", onReduceChange);
      desktop.removeEventListener("change", queue);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="work-scrub work-pin"
      data-work-scrub=""
      style={{ "--p": String(MID) } as CSSProperties}
    >
      <div className={cn("work-pin-stage", className)}>{children}</div>
    </div>
  );
}
