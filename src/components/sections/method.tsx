import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { steps } from "@/lib/site";

export function Method() {
  return (
    <section id="method" className="scroll-mt-24 border-b border-white/10">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Method"
            title="A brief, a frame, the work, then we keep it running."
            description="Four steps. You always know what happens next. No retainers that quietly go quiet."
          />
        </Reveal>
        <ol className="mt-16 grid gap-0 border-t border-white/12 md:grid-cols-4 md:border-t-0 md:border-l">
          {steps.map((step, index) => (
            <li
              key={step.n}
              className="border-b border-white/12 py-8 md:border-b-0 md:border-r md:px-6 md:py-2 first:md:pl-0 last:md:border-r-0 last:md:pr-0"
            >
              <Reveal delayMs={index * 90}>
                <p className="font-heading text-sm tracking-[0.28em] text-muted-foreground">
                  {step.n}
                </p>
                <h3 className="font-heading mt-4 text-2xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
