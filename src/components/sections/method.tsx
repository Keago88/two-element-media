import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { steps } from "@/lib/site";

export function Method() {
  return (
    <section id="method" className="scroll-mt-24 border-b border-white/10">
      <div className="section-y mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Method"
            title="A brief, a frame, the work, then we keep it running."
            description="Four steps. You always know what happens next. No retainers that quietly go quiet."
          />
        </Reveal>
        <ol className="relative mt-20 max-w-3xl border-l border-white/15">
          {steps.map((step, index) => (
            <li key={step.n} className="relative py-14 pl-8 sm:py-20 sm:pl-14">
              <Reveal delayMs={index * 60}>
                <p className="font-heading text-6xl font-semibold tracking-tight text-white/20 sm:text-7xl">
                  {step.n}
                </p>
                <h3 className="font-heading mt-6 text-3xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="measure mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
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
