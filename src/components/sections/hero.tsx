import { BrandMark } from "@/components/brand-mark";
import { HeroDepth } from "@/components/depth-field";
import { Parallax } from "@/components/parallax";
import { Button } from "@/components/ui/button";

const chips = ["Content", "Social", "Paid", "Web", "Cape Town SMEs"];

export function Hero() {
  return (
    <section className="relative border-b border-white/10">
      <div className="hero-stage relative overflow-clip">
        <HeroDepth />
        <Parallax
          className="pointer-events-none absolute top-6 right-5 z-[2] sm:top-8 sm:right-8"
          factor={0.38}
          mode="hero"
        >
          <BrandMark className="h-20 w-auto opacity-45 sm:h-24" title="Two Element" />
        </Parallax>
        <div className="relative z-[3] mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-[1120px] items-center px-5 py-24 sm:px-8 lg:py-32">
          <div className="max-w-4xl">
            <div className="animate-enter">
              <Parallax factor={0.16} mode="hero">
                <p className="font-heading text-xs font-semibold tracking-[0.32em] text-muted-foreground uppercase">
                  Cape Town digital / media studio
                </p>
              </Parallax>
            </div>
            <div className="animate-enter-delayed">
              <Parallax factor={0.07} mode="hero">
                <h1 className="font-heading mt-7 text-6xl leading-[0.92] font-semibold tracking-tight text-balance sm:text-7xl md:text-8xl lg:text-[6.75rem]">
                  Two elements.
                  <br />
                  One studio.
                </h1>
              </Parallax>
            </div>
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
            <div className="animate-enter-late mt-6">
              <Parallax factor={0.12} mode="hero">
                <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                  Working across the CBD, Atlantic Seaboard, and Southern Suburbs
                </p>
              </Parallax>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-[3] border-t border-white/10">
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
