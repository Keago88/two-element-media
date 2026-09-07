import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  title?: string;
};

export function BrandMark({
  className,
  title = "Two Element",
}: BrandMarkProps) {
  return (
    // Official raster mark — do not replace with an SVG recreation.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt={title}
      className={cn("h-auto w-auto shrink-0 object-contain", className)}
    />
  );
}
