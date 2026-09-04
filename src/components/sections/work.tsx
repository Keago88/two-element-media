import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { AnimGrow } from "@/components/work-anim/anim-grow";
import { AnimMake } from "@/components/work-anim/anim-make";
import { AnimShip } from "@/components/work-anim/anim-ship";
import { WorkScrub } from "@/components/work-anim/work-scrub";
import { studioAnimations, workIntro } from "@/lib/site";

const frames = {
  make: AnimMake,
  ship: AnimShip,
  grow: AnimGrow,
} as const;

export function Work() {
  return (
    <section id="work" className="scroll-mt-24">
      <div className="section-y mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Work"
            title={workIntro.title}
            description={workIntro.description}
            titleFactor={0.1}
          />
        </Reveal>
      </div>
      <div className="border-t border-white/10">
        {studioAnimations.map((item) => {
          const Frame = frames[item.id];
          return (
            <article key={item.id} className="border-b border-white/10">
              <WorkScrub className="relative flex min-h-[100svh] items-center overflow-hidden">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 flex w-full items-center justify-center sm:w-[58%] sm:justify-end sm:pr-8 lg:pr-16"
                >
                  <Frame />
                </div>
                <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 py-20 sm:px-8 sm:py-24">
                  <p className="font-heading text-xs tracking-[0.2em] text-foreground/75 uppercase">
                    {item.label}
                  </p>
                  <Parallax factor={0.08}>
                    <h3 className="font-heading mt-6 text-6xl font-semibold tracking-tight text-balance sm:text-7xl md:text-8xl">
                      {item.title}
                    </h3>
                  </Parallax>
                  <p className="measure mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {item.caption}
                  </p>
                </div>
              </WorkScrub>
            </article>
          );
        })}
      </div>
    </section>
  );
}
