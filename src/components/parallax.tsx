"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Scroll lag. Use ~0.15–0.25 for the hero mark. */
  factor?: number;
  /** Cap translateY in px. Use 8–12 for the Sample stamp. */
  max?: number;
};

type ParallaxNode = HTMLElement | SVGElement;

function scrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0;
}

/**
 * Applies translateY directly on the child (TwinMark SVG / Sample stamp)
 * so DevTools shows the transform on the visible node — not a nested wrapper.
 *
 * Document origin is cached with transform temporarily cleared so measuring
 * the same node cannot feed back into the next frame.
 */
export function Parallax({
  children,
  className,
  factor = 0.2,
  max,
}: ParallaxProps) {
  const [node, setNode] = useState<ParallaxNode | null>(null);

  useLayoutEffect(() => {
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 767px)");
    let frame = 0;
    let originTop = 0;
    let originHeight = 0;

    const captureOrigin = () => {
      const prev = node.style.transform;
      node.style.transform = "none";
      const rect = node.getBoundingClientRect();
      originTop = rect.top + scrollY();
      originHeight = rect.height;
      node.style.transform = prev;
    };

    const rest = () => {
      node.style.transform = "none";
      node.style.removeProperty("will-change");
    };

    const apply = () => {
      frame = 0;
      if (reduceMotion.matches || compact.matches) {
        rest();
        return;
      }

      const yScroll = scrollY();
      let y: number;

      if (typeof max === "number") {
        const center = originTop + originHeight / 2;
        const viewportCenter = yScroll + window.innerHeight / 2;
        const span = Math.max(window.innerHeight / 2, 1);
        const t = (viewportCenter - center) / span;
        y = Math.max(-max, Math.min(max, t * max));
      } else {
        y = yScroll * factor;
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
  }, [node, factor, max]);

  const child = Children.only(children);

  if (!isValidElement(child)) {
    return null;
  }

  const element = child as ReactElement<{ className?: string }>;

  return cloneElement(element, {
    className: cn(element.props.className, className),
    "data-parallax": "",
    ref: setNode,
  } as typeof element.props);
}
