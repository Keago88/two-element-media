"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ParallaxMode = "hero" | "view";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Scroll lag. Hero mark ~0.32–0.4; in-page type ~0.1–0.22. */
  factor?: number;
  /** Cap translateY in px for view-tied layers. */
  max?: number;
  /**
   * `hero` — document scroll lag (first viewport).
   * `view` — element-relative, tied to cover range (default).
   */
  mode?: ParallaxMode;
};

type ParallaxNode = HTMLElement | SVGElement;

/** Ceiling for uncapped in-page factor motion (JS fallback). */
const PAGE_FACTOR_CAP = 48;

function scrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0;
}

function supportsScrollDriven(): boolean {
  return (
    typeof CSS !== "undefined" &&
    CSS.supports("animation-timeline", "scroll()") &&
    CSS.supports("animation-range", "0% 100%")
  );
}

function viewMaxPx(factor: number, max?: number) {
  if (typeof max === "number") return max;
  return Math.min(PAGE_FACTOR_CAP, Math.max(10, Math.round(Math.abs(factor) * 240)));
}

/**
 * Layered translateY on the visible child (mark / type / hairline).
 *
 * Primary path: CSS scroll-driven animations (`data-parallax="hero"|"view"`).
 * Fallback: rAF + scroll listeners when `animation-timeline` is unavailable.
 *
 * Disabled for prefers-reduced-motion and max-width 767px (CSS kill-switch + JS rest).
 */
export function Parallax({
  children,
  className,
  factor = 0.2,
  max,
  mode = "view",
}: ParallaxProps) {
  const [node, setNode] = useState<ParallaxNode | null>(null);
  const distance = viewMaxPx(factor, max);

  useLayoutEffect(() => {
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 767px)");
    let frame = 0;
    let originTop = 0;
    let originHeight = 0;

    const rest = () => {
      node.style.transform = "none";
      node.style.removeProperty("will-change");
    };

    if (supportsScrollDriven()) {
      const onChange = () => {
        if (reduceMotion.matches || compact.matches) rest();
      };
      reduceMotion.addEventListener("change", onChange);
      compact.addEventListener("change", onChange);
      return () => {
        reduceMotion.removeEventListener("change", onChange);
        compact.removeEventListener("change", onChange);
        rest();
      };
    }

    const captureOrigin = () => {
      const prev = node.style.transform;
      node.style.transform = "none";
      const rect = node.getBoundingClientRect();
      originTop = rect.top + scrollY();
      originHeight = rect.height;
      node.style.transform = prev;
    };

    const apply = () => {
      frame = 0;
      if (reduceMotion.matches || compact.matches) {
        rest();
        return;
      }

      const yScroll = scrollY();
      let y: number;

      if (mode === "hero") {
        y = yScroll * factor;
      } else if (typeof max === "number") {
        const center = originTop + originHeight / 2;
        const viewportCenter = yScroll + window.innerHeight / 2;
        const span = Math.max(window.innerHeight / 2, 1);
        const t = (viewportCenter - center) / span;
        y = Math.max(-max, Math.min(max, t * max));
      } else {
        const center = originTop + originHeight / 2;
        const viewportCenter = yScroll + window.innerHeight / 2;
        y = (viewportCenter - center) * factor;
        y = Math.max(-PAGE_FACTOR_CAP, Math.min(PAGE_FACTOR_CAP, y));
      }

      node.style.willChange = "transform";
      node.style.transform = `translateY(${y.toFixed(2)}px)`;
    };

    const queue = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    const onResize = () => {
      captureOrigin();
      queue();
    };

    captureOrigin();
    apply();
    window.addEventListener("scroll", queue, { passive: true });
    document.addEventListener("scroll", queue, { passive: true, capture: true });
    window.addEventListener("resize", onResize);
    reduceMotion.addEventListener("change", apply);
    compact.addEventListener("change", apply);

    return () => {
      window.removeEventListener("scroll", queue);
      document.removeEventListener("scroll", queue, { capture: true });
      window.removeEventListener("resize", onResize);
      reduceMotion.removeEventListener("change", apply);
      compact.removeEventListener("change", apply);
      if (frame) window.cancelAnimationFrame(frame);
      rest();
    };
  }, [node, factor, max, mode]);

  const child = Children.only(children);

  if (!isValidElement(child)) {
    return null;
  }

  const element = child as ReactElement<{
    className?: string;
    style?: CSSProperties;
  }>;

  const layerStyle = {
    ...element.props.style,
    "--parallax-factor": String(factor),
    "--parallax-max": `${distance}px`,
  } as CSSProperties;

  return cloneElement(element, {
    className: cn(element.props.className, className),
    "data-parallax": mode,
    style: layerStyle,
    ref: setNode,
  } as typeof element.props);
}
