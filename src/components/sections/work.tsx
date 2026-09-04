import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { cases } from "@/lib/site";

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 border-b border-white/10">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Work"
            title="How we talk about results."
            description="These three stories are sample case studies for Cape Town SMEs. They show tone and shape. Names, numbers, and photos get replaced with real client work after a brief."
          />
        </Reveal>
        <div className="mt-14 divide-y divide-white/12 border-y border-white/12">
          {cases.map((item, index) => (
            <Reveal key={item.client} delayMs={index * 70}>
              <article className="grid gap-6 py-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-12">
                <div>
                  <Badge
                    variant="outline"
                    className="rounded-none border-white/30 tracking-[0.18em] uppercase"
                  >
                    Sample
                  </Badge>
                  <p className="font-heading mt-5 text-xl font-semibold tracking-tight">
                    {item.client}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.sector}
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.outcome}
                  </p>
                  <p className="mt-5 font-heading text-xs tracking-[0.2em] text-foreground uppercase">
                    {item.metric}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
