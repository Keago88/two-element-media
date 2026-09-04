import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-b border-white/10">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Capabilities"
            title="Four kinds of work. One team."
            description="Pick what you need now. We do not sell a 12-product stack. If a brief needs software, Two Element Labs sits in — quietly."
          />
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.id} delayMs={index * 80}>
              <article className="relative flex h-full flex-col border border-white/12 bg-white/[0.02] p-7 transition-colors hover:border-white/30 hover:bg-white/[0.04] sm:p-8">
                <p className="font-heading text-xs tracking-[0.24em] text-muted-foreground uppercase">
                  {service.kicker}
                </p>
                <h3 className="font-heading mt-8 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {service.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
