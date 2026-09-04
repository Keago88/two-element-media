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

export function TwinField({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none relative select-none", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 640 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <polygon
          className="origin-center animate-twin-a"
          points="220,48 420,420 20,420"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <polygon
          className="origin-center animate-twin-b"
          points="400,110 620,510 180,510"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <polygon
          points="310,190 390,340 230,340"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
