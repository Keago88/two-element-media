import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
export function Logo({
  className = "",
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`brand ${className}`}
      aria-label="Two Element Media home"
    >
      <span className="brand-icon">
        <BrandMark title="" />
      </span>
      <span>
        TWO ELEMENT<small>MEDIA</small>
      </span>
    </Link>
  );
}
