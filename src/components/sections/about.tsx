import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TwinMark } from "@/components/twin-mark";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-white/10">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Studio"
            title="Media does the work people see. Labs stays in the wings."
          />
        </Reveal>
        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <Reveal>
            <article className="h-full border border-white/12 p-8">
              <p className="font-heading text-xs tracking-[0.24em] text-muted-foreground uppercase">
                Two Element Media
              </p>
              <h3 className="font-heading mt-4 text-2xl font-semibold tracking-tight">
                The agency
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Content, production, social, paid media, and web for Cape Town
                SMEs. We sit close to the work: briefs in English, files on
                time, a monthly note that a owner can actually read.
              </p>
            </article>
          </Reveal>
          <div className="hidden items-center justify-center px-4 lg:flex" aria-hidden="true">
            <TwinMark className="h-14 w-16 opacity-80" />
          </div>
          <Reveal delayMs={100}>
            <article className="h-full border border-white/12 bg-white/[0.03] p-8">
              <p className="font-heading text-xs tracking-[0.24em] text-muted-foreground uppercase">
                Two Element Labs
              </p>
              <h3 className="font-heading mt-4 text-2xl font-semibold tracking-tight">
                The sister desk
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Product and tooling when a campaign needs something built —
                a booking flow, a small app, a data job. Same people, different
                brief. This site is Media. Ask for Labs only if you need it.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
