import { BrandMark } from "@/components/brand-mark";
import { Parallax } from "@/components/parallax";

/**
 * Hero far + mid planes. Official raster only — never a redrawn twin.
 * Mid strokes are hairlines, not a second mark.
 */
export function HeroDepth() {
  return (
    <div className="hero-depth" aria-hidden="true">
      <Parallax className="hero-depth-far" factor={0.8} max={420} mode="hero">
        <BrandMark className="hero-depth-far-mark" title="" />
      </Parallax>
      <div className="hero-depth-grid" data-depth="hero-grid" />
      <div className="hero-depth-hairline" data-depth="hero-strokes" />
    </div>
  );
}
