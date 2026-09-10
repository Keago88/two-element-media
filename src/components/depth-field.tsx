import type { SVGProps } from "react";

const twin = {
  left: "16,3 31,31 1,31",
  right: "32,9 47,37 17,37",
} as const;

function TwinOutline({
  className,
  ...rest
}: { className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <polygon
        points={twin.left}
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinejoin="miter"
      />
      <polygon
        points={twin.right}
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/** Fixed, whole-page background plane — slowest layer. */
export function PageDepth() {
  return (
    <div className="page-depth" aria-hidden="true">
      <TwinOutline className="page-depth-twin" data-depth="page-twin" />
    </div>
  );
}

/** Hero mid/background planes: grid, oversized twin, dissolve scrim. */
export function HeroDepth() {
  return (
    <div className="hero-depth" aria-hidden="true">
      <div className="hero-depth-grid" data-depth="hero-grid" />
      <TwinOutline className="hero-depth-twin" data-depth="hero-twin" />
      <div className="hero-depth-hairline" data-depth="hero-hairline" />
      <div className="hero-depth-scrim" data-depth="hero-scrim" />
    </div>
  );
}
