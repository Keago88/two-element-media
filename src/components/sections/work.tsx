import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { WorkStory } from "@/components/work-anim/work-story";
import { workIntro } from "@/lib/site";

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
            titleFactor={0.12}
          />
        </Reveal>
      </div>
      <div className="border-t border-white/10">
        <WorkStory />
      </div>
    </section>
  );
}
