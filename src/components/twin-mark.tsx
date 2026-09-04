import { forwardRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type TwinMarkProps = {
  className?: string;
  title?: string;
  style?: CSSProperties;
  "data-parallax"?: string;
};

export const TwinMark = forwardRef<SVGSVGElement, TwinMarkProps>(
  function TwinMark(
    { className, title = "Two Element", style, ...rest },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 48 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("text-current", className)}
        style={style}
        role="img"
        aria-label={title}
        {...rest}
      >
        <title>{title}</title>
        <polygon
          points="16,3 31,31 1,31"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />
        <polygon
          points="32,9 47,37 17,37"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />
      </svg>
    );
  },
);
