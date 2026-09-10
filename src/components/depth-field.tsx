import { BrandMark } from "@/components/brand-mark";

/** Far official raster + mid hairlines. Motion comes from --hero-p on the pin. */
export function HeroDepth() {
  return (
    <div className="hero-depth" aria-hidden="true">
      <BrandMark className="hero-depth-far hero-depth-far-mark" title="" />
      <div className="hero-depth-grid" />
      <div className="hero-depth-hairline" />
    </div>
  );
}
