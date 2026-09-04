import Link from "next/link";
import { TwinMark } from "@/components/twin-mark";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-[1120px] flex-col items-start justify-center px-5 py-24 sm:px-8">
      <TwinMark className="h-12 w-14" />
      <p className="font-heading mt-8 text-xs tracking-[0.28em] text-muted-foreground uppercase">
        404
      </p>
      <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        That page is not on the map.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The URL does not match a studio page. Head back to the homepage, or
        send a brief if you were looking for us.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild className="h-11 rounded-none">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="outline" className="h-11 rounded-none">
          <Link href="/#contact">Contact</Link>
        </Button>
      </div>
    </div>
  );
}
