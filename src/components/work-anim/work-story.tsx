"use client";

import { useLayoutEffect, useRef, type CSSProperties, type JSX } from "react";
import { AnimGrow } from "@/components/work-anim/anim-grow";
import { AnimMake } from "@/components/work-anim/anim-make";
import { AnimShip } from "@/components/work-anim/anim-ship";
import { WorkScrub } from "@/components/work-anim/work-scrub";
import { cn } from "@/lib/utils";
import { PIN_HEADER_PX, clamp01, pinProgress } from "@/lib/pin-progress";
import { studioAnimations } from "@/lib/site";

const frames = {
  make: AnimMake,
  ship: AnimShip,
  grow: AnimGrow,
} as const;

function remap(story: number, index: number) {
  return clamp01(story * 3 - index);
}

function crossfade(story: number, index: number) {
  const center = (index + 0.5) / 3;
  const dist = Math.abs(story - center);
  return clamp01(1 - dist / 0.28);
}

/**
 * Desktop: one pinned stage, three TEM chapters (Make / Ship / Grow).
 * Mobile / reduced-motion: stacked bands via WorkScrub.
 */
export function WorkStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const makeRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const growRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const layers = [makeRef.current, shipRef.current, growRef.current];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    let frame = 0;

    const apply = (story: number) => {
      track.style.setProperty("--story", story.toFixed(4));
      layers.forEach((node, index) => {
        if (!node) return;
        const local = remap(story, index);
        const opacity = crossfade(story, index);
        node.style.setProperty("--p", local.toFixed(4));
        node.style.opacity = opacity.toFixed(3);
      });
      const chapter = story < 1 / 3 ? 1 : story < 2 / 3 ? 2 : 3;
      if (indexRef.current) {
        indexRef.current.textContent = `0${chapter} / 03`;
      }
    };

    const measure = () => {
      frame = 0;
      if (reduceMotion.matches) {
        layers.forEach((node) => {
          if (!node) return;
          node.style.setProperty("--p", "0.62");
          node.style.opacity = "1";
        });
        if (indexRef.current) indexRef.current.textContent = "03 / 03";
        return;
      }
      if (!desktop.matches) {
        apply(0.18);
        return;
      }
      apply(pinProgress(track, PIN_HEADER_PX));
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
    <>
      <div className="md:hidden">
        {studioAnimations.map((item) => {
          const Frame = frames[item.id];
          return (
            <article key={item.id} className="border-b border-white/10">
              <WorkScrub className="relative flex items-center overflow-clip">
                <ChapterBody item={item} Frame={Frame} />
              </WorkScrub>
            </article>
          );
        })}
      </div>

      <div
        ref={trackRef}
        className="work-story work-scrub hidden md:block"
        data-work-story=""
        style={{ "--story": "0", "--p": "0.18" } as CSSProperties}
      >
        <div className="work-story-stage">
          <p
            ref={indexRef}
            className="font-heading pointer-events-none absolute top-6 right-5 z-20 text-xs tracking-[0.22em] text-muted-foreground uppercase sm:top-8 sm:right-8"
          >
            01 / 03
          </p>
          {studioAnimations.map((item, index) => {
            const Frame = frames[item.id];
            const ref = [makeRef, shipRef, growRef][index];
            return (
              <div
                key={item.id}
                ref={ref}
                className="work-story-chapter work-scrub"
                data-chapter={item.id}
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <ChapterBody item={item} Frame={Frame} swap={index === 1} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ChapterBody({
  item,
  Frame,
  swap = false,
}: {
  item: (typeof studioAnimations)[number];
  Frame: () => JSX.Element;
  swap?: boolean;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 z-0 flex w-full items-center justify-center sm:w-[58%] sm:pr-8 lg:pr-16",
          swap ? "sm:left-0 sm:justify-start sm:pr-0 sm:pl-8 lg:pl-16" : "right-0 sm:justify-end",
        )}
      >
        <Frame />
      </div>
      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-[1120px] px-5 py-20 sm:px-8 sm:py-24",
          swap && "sm:flex sm:justify-end",
        )}
      >
        <div className={swap ? "sm:max-w-md sm:text-right" : undefined}>
          <p className="font-heading text-xs tracking-[0.2em] text-foreground/75 uppercase">
            {item.label}
          </p>
          <h3 className="font-heading mt-6 text-6xl font-semibold tracking-tight text-balance sm:text-7xl md:text-8xl">
            {item.title}
          </h3>
          <p className="measure mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {item.caption}
          </p>
        </div>
      </div>
    </>
  );
}
