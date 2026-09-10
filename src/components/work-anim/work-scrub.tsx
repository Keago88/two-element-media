"use client";

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import {
  PIN_HEADER_PX,
  coverProgress,
  pinMotionActive,
  pinProgress,
} from "@/lib/pin-progress";

type WorkScrubProps = {
  children: ReactNode;
  className?: string;
};

const MID = 0.62;

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

      if (pinMotionActive()) {
        setP(pinProgress(node, PIN_HEADER_PX));
        return;
      }

      setP(coverProgress(node));
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
