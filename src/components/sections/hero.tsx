import { Parallax } from "@/components/parallax";
import { TwinMark } from "@/components/twin-mark";
import { Button } from "@/components/ui/button";

const chips = ["Content", "Social", "Paid", "Web", "Cape Town SMEs"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <Parallax
        className="pointer-events-none absolute top-6 right-5 sm:top-8 sm:right-8"
        factor={0.2}
      >
        <TwinMark className="h-10 w-11 text-white/50" title="Two Element" />
      </Parallax>
      <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-[1120px] items-center px-5 py-24 sm:px-8 lg:py-32">
        <div className="max-w-4xl">
          <p className="animate-enter font-heading text-xs font-semibold tracking-[0.32em] text-muted-foreground uppercase">
            Cape Town digital / media studio
          </p>
          <h1 className="font-heading animate-enter-delayed mt-7 text-6xl leading-[0.92] font-semibold tracking-tight text-balance sm:text-7xl md:text-8xl lg:text-[6.75rem]">
            Two elements.
            <br />
            One studio.
          </h1>
          <p className="animate-enter-late measure mt-7 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Two Element Media makes what local businesses get judged on —
            content, social, paid media, and web. Sharp, consistent, ready to
            ship.
          </p>
          <div className="animate-enter-late mt-9">
            <Button
              asChild
              className="h-12 rounded-none px-7 text-xs tracking-[0.22em] uppercase"
            >
              <a href="#contact">Start a brief</a>
            </Button>
          </div>
          <p className="animate-enter-late mt-6 text-xs tracking-[0.18em] text-muted-foreground uppercase">
            Working across the CBD, Atlantic Seaboard, and Southern Suburbs
          </p>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1120px] flex-wrap items-center gap-2.5 px-5 py-5 sm:px-8">
          {chips.map((chip) => (
            <span
              key={chip}
              className="border border-white/15 px-3.5 py-1.5 text-[0.68rem] tracking-[0.22em] text-muted-foreground uppercase"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
