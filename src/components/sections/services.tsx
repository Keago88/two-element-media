import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/site";

export function Services() {
  const featured = services.find((service) => service.id === "content");
  const rest = services.filter((service) => service.id !== "content");

  return (
    <section id="services" className="scroll-mt-24 border-b border-white/10">
      <div className="section-y mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Capabilities"
            title="Four kinds of work. One team."
            titleFactor={0.1}
            description="Pick what you need now. We do not sell a 12-product stack. If a brief needs software, Two Element Labs sits in — quietly."
          />
        </Reveal>
        <div className="mt-16 flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">
          {featured ? (
            <Reveal className="lg:w-[60%] lg:shrink-0">
              <article>
                <p className="font-heading text-xs tracking-[0.24em] text-muted-foreground uppercase">
                  {featured.kicker}
                </p>
                <Parallax factor={0.12}>
                  <h3 className="font-heading mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                    {featured.title}
                  </h3>
                </Parallax>
                <p className="measure mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {featured.body}
                </p>
                <a
                  href="#method"
                  className="mt-8 inline-flex text-xs tracking-[0.2em] text-foreground uppercase underline-offset-4 hover:underline"
                >
                  See how we make it
                </a>
              </article>
            </Reveal>
          ) : null}
          <div className="flex-1 divide-y divide-white/12 border-y border-white/12">
            {rest.map((service, index) => (
              <Reveal key={service.id} delayMs={index * 70}>
                <article className="py-6 sm:py-7">
                  <p className="font-heading text-[0.65rem] tracking-[0.24em] text-muted-foreground uppercase">
                    {service.kicker}
                  </p>
                  <Parallax max={8}>
                    <h3 className="font-heading mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                      {service.title}
                    </h3>
                  </Parallax>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
