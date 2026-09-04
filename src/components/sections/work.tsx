import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cases } from "@/lib/site";

export function Work() {
  return (
    <section id="work" className="scroll-mt-24">
      <div className="section-y mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Work"
            title="How we talk about results."
            description="These three stories are sample case studies for Cape Town SMEs. They show tone and shape. Names and photos get replaced with real client work after a brief."
          />
        </Reveal>
      </div>
      <div className="border-t border-white/10">
        {cases.map((item) => (
          <article
            key={item.client}
            className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-white/10"
          >
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-end overflow-visible pr-4 sm:pr-10">
              <Parallax factor={0.12} max={10}>
                <span
                  aria-hidden="true"
                  className="font-heading select-none text-[18vw] leading-none font-semibold tracking-[0.08em] text-white/[0.07] uppercase"
                >
                  Sample
                </span>
              </Parallax>
            </div>
            <div className="relative mx-auto w-full max-w-[1120px] px-5 py-20 sm:px-8 sm:py-24">
              <Reveal>
                <p className="font-heading text-5xl font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl">
                  {item.client}
                </p>
                <p className="mt-4 text-sm tracking-[0.16em] text-muted-foreground uppercase">
                  {item.sector}
                </p>
                <h3 className="font-heading mt-10 max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl md:text-4xl">
                  {item.title}
                </h3>
                <p className="measure mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {item.outcome}
                </p>
                <p className="mt-8 font-heading text-xs tracking-[0.2em] text-foreground/80 uppercase">
                  {item.line}
                </p>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
