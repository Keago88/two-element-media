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
  /**
   * Lag vs scroll. Hero TwinMark ~0.2 (≈0.8× apparent, cap ~120px at 600px).
   * Page ladder: 0.12 quiet / 0.28 mid / 0.45 firm.
   */
  factor?: number;
  /** Cap translateY in px. Hero TwinMark 120; view layers stay modest. */
  max?: number;
  /**
   * `hero` — document scroll lag (first viewport).
   * `view` — element-relative cover range (default).
   */
  mode?: ParallaxMode;
};

type ParallaxNode = HTMLElement | SVGElement;

/** Quiet / mid / firm page ladder (Michelangelo). */
export const depthFactor = {
  quiet: 0.12,
  mid: 0.28,
  firm: 0.45,
} as const;

const PAGE_FACTOR_CAP = 40;
const HERO_RANGE_PX = 600;

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
  return Math.min(
    PAGE_FACTOR_CAP,
    Math.max(8, Math.round(Math.abs(factor) * 90)),
  );
}

function heroToPx(factor: number, max?: number) {
  const raw = Math.round(Math.abs(factor) * HERO_RANGE_PX);
  if (typeof max === "number") return Math.min(max, raw);
  return raw;
}

/**
 * translateY on the visible child. CSS scroll-driven when supported;
 * rAF fallback otherwise. Off for prefers-reduced-motion and max-width 767px.
 */
export function Parallax({
  children,
  className,
  factor = depthFactor.quiet,
  max,
  mode = "view",
}: ParallaxProps) {
  const [node, setNode] = useState<ParallaxNode | null>(null);
  const viewDistance = viewMaxPx(factor, max);
  const heroDistance = heroToPx(factor, max);

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
        y = Math.min(heroDistance, Math.max(0, yScroll * factor));
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

      node.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
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
  }, [node, factor, max, mode, heroDistance]);

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
    "--parallax-max":
      mode === "hero" ? `${heroDistance}px` : `${viewDistance}px`,
  } as CSSProperties;

  return cloneElement(element, {
    className: cn(element.props.className, className),
    "data-parallax": mode,
    style: layerStyle,
    ref: setNode,
  } as typeof element.props);
}
