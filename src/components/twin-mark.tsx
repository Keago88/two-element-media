import { cn } from "@/lib/utils";

type TwinMarkProps = {
  className?: string;
  title?: string;
};

export function TwinMark({ className, title = "Two Element" }: TwinMarkProps) {
  return (
    <svg
      viewBox="0 0 48 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-current", className)}
      role="img"
      aria-label={title}
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
}

