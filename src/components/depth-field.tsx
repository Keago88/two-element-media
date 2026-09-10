import { BrandMark } from "@/components/brand-mark";

/** Far official raster + mid grid / drafting plate. Motion from --hero-p. */
export function HeroDepth() {
  return (
    <div className="hero-depth" aria-hidden="true">
      <BrandMark className="hero-depth-far hero-depth-far-mark" title="" />
      <div className="hero-depth-grid" />
      <div className="hero-depth-hairline" />
      <div className="hero-blueprint">
        <span data-corner="tl" />
        <span data-corner="tr" />
        <span data-corner="bl" />
        <span data-corner="br" />
      </div>
    </div>
  );
}
