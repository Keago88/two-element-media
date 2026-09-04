import Link from "next/link";
import { TwinMark } from "@/components/twin-mark";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 text-foreground no-underline",
        className,
      )}
    >
      <TwinMark className="h-8 w-9 shrink-0 transition-transform duration-500 group-hover:translate-x-0.5" />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[0.7rem] font-semibold tracking-[0.32em]">
          TWO ELEMENT
        </span>
        {!compact ? (
          <span className="mt-1 text-[0.62rem] tracking-[0.28em] text-muted-foreground">
            MEDIA
          </span>
        ) : null}
      </span>
    </Link>
  );
}
