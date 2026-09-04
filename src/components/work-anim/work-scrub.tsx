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
    let listening = false;

    const setP = (value: number) => {
      node.style.setProperty("--p", value.toFixed(4));
    };

    const rest = () => {
      setP(MID);
      node.style.removeProperty("will-change");
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

    const start = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("scroll", queue, { passive: true });
      document.addEventListener("scroll", queue, { passive: true, capture: true });
      measure();
    };

    const stop = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", queue);
      document.removeEventListener("scroll", queue, { capture: true });
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      node.style.removeProperty("will-change");
    };

    const onReduceChange = () => {
      if (reduceMotion.matches) {
        stop();
        rest();
        return;
      }
      measure();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduceMotion.matches) {
          rest();
          return;
        }
        if (entry.isIntersecting) start();
        else stop();
      },
      { rootMargin: "15% 0px" },
    );

    if (reduceMotion.matches) {
      rest();
    } else {
      measure();
    }

    io.observe(node);
    window.addEventListener("resize", queue);
    reduceMotion.addEventListener("change", onReduceChange);

    return () => {
      io.disconnect();
      stop();
      window.removeEventListener("resize", queue);
      reduceMotion.removeEventListener("change", onReduceChange);
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
