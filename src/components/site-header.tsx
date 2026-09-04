"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mailtoHref, nav, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const whatsapp = whatsappHref();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-white/10 bg-black/85 backdrop-blur-md"
          : "border-transparent bg-black/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1120px] items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
        <Logo />
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button
            asChild
            variant="outline"
            className="h-9 rounded-none border-white/25 bg-transparent px-4 text-xs tracking-[0.16em] uppercase"
          >
            <a href="#contact">Start a brief</a>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-none border-white/20 md:hidden"
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-white/10 bg-black text-white sm:max-w-sm"
          >
            <SheetHeader>
              <SheetTitle className="font-heading tracking-[0.28em]">
                TWO ELEMENT
              </SheetTitle>
              <SheetDescription>Cape Town studio menu</SheetDescription>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1 px-4" aria-label="Mobile">
              {nav.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="border-b border-white/10 py-4 font-heading text-2xl tracking-tight"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3 px-4">
              <SheetClose asChild>
                <Button asChild className="h-11 rounded-none">
                  <a href="#contact">Start a brief</a>
                </Button>
              </SheetClose>
              {whatsapp ? (
                <SheetClose asChild>
                  <Button asChild variant="outline" className="h-11 rounded-none">
                    <a href={whatsapp} target="_blank" rel="noreferrer">
                      WhatsApp
                    </a>
                  </Button>
                </SheetClose>
              ) : (
                <SheetClose asChild>
                  <Button asChild variant="outline" className="h-11 rounded-none">
                    <a href={mailtoHref()}>Email us</a>
                  </Button>
                </SheetClose>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
