import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-white/10">
      <div className="section-y mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Studio"
            title="Media does the work people see. Labs stays in the wings."
            titleFactor={0.12}
          />
        </Reveal>
        <Reveal delayMs={80}>
          <div className="mt-16 max-w-3xl">
            <p className="measure text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">
              Content, production, social, paid media, and web for Cape Town
              SMEs. We sit close to the work: briefs in English, files on time,
              a monthly note that an owner can actually read.
            </p>
            <Parallax factor={0.06}>
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                Labs stays in the wings — product & tooling when a brief needs it.
              </p>
            </Parallax>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
