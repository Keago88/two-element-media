import { AnimGrow } from "@/components/work-anim/anim-grow";
import { AnimMake } from "@/components/work-anim/anim-make";
import { AnimShip } from "@/components/work-anim/anim-ship";
import { IndexLabel, studioAnimations } from "@/lib/site";

class WorkBeat {
  static frames = {
    make: AnimMake,
    ship: AnimShip,
    grow: AnimGrow,
  } as const;
}

export function WorkBeats() {
  return (
    <div className="work-beats">
      {studioAnimations.map((item, index) => {
        const Frame = WorkBeat.frames[item.id];
        return (
          <article
            key={item.id}
            className="work-beat"
            style={{ ["--p" as string]: "0.62" }}
          >
            <span className="step-number">{IndexLabel.of(index)}</span>
            <div className="work-beat-frame" aria-hidden="true">
              <Frame />
            </div>
            <h3>{item.title}</h3>
            <p>{item.caption}</p>
          </article>
        );
      })}
    </div>
  );
}
