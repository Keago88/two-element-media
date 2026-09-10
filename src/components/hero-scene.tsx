"use client";

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { PIN_HEADER_PX, pinProgress } from "@/lib/pin-progress";

/**
 * Desktop pin track. Sets --hero-p 0→1 while the hero stage is stuck.
 * Mobile / reduced-motion: no extra height, --hero-p stays 0.
 */
export function HeroScene({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    let frame = 0;

    const setP = (value: number) => {
      node.style.setProperty("--hero-p", value.toFixed(4));
    };

    const measure = () => {
      frame = 0;
      if (reduceMotion.matches || !desktop.matches) {
        setP(0);
        return;
      }
      setP(pinProgress(node, PIN_HEADER_PX));
    };

    const queue = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    reduceMotion.addEventListener("change", measure);
    desktop.addEventListener("change", measure);

    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      reduceMotion.removeEventListener("change", measure);
      desktop.removeEventListener("change", measure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="hero-track"
      data-hero-scene=""
      style={{ "--hero-p": "0" } as CSSProperties}
    >
      <div className="hero-pin-stage">{children}</div>
    </div>
  );
}
