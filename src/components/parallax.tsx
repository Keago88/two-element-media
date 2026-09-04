"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Scroll lag. Use ~0.15–0.25 for the hero mark. */
  factor?: number;
  /** Cap translateY in px. Use 8–12 for the Sample stamp. */
  max?: number;
};

export function Parallax({
  children,
  className,
  factor = 0.2,
  max,
}: ParallaxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const layer = layerRef.current;
    if (!root || !layer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 767px)");
    let frame = 0;

    const rest = () => {
      layer.style.transform = "";
      layer.style.willChange = "";
    };

    const apply = () => {
      frame = 0;
      if (reduceMotion.matches || compact.matches) {
        rest();
        return;
      }

      const rect = root.getBoundingClientRect();
      let y = (rect.top + rect.height / 2 - window.innerHeight / 2) * factor;
      if (typeof max === "number") {
        y = Math.max(-max, Math.min(max, y));
      }

      layer.style.willChange = "transform";
      layer.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };

    const queue = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    reduceMotion.addEventListener("change", queue);
    compact.addEventListener("change", queue);

    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      reduceMotion.removeEventListener("change", queue);
      compact.removeEventListener("change", queue);
      if (frame) window.cancelAnimationFrame(frame);
      rest();
    };
  }, [factor, max]);

  return (
    <div ref={rootRef} className={cn(className)}>
      <div ref={layerRef}>{children}</div>
    </div>
  );
}
