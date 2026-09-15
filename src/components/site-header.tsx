"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const links = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#method", label: "Our approach" },
  { href: "/#about", label: "The studio" },
];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Logo />
        <nav aria-label="Primary" className="desktop-nav">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/#contact" className="button dark header-cta">
          Let’s talk <ArrowUpRight size={17} />
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="menu-toggle" aria-label="Open menu">
            <Menu />
          </SheetTrigger>
          <SheetContent className="mobile-sheet">
            <SheetHeader>
              <SheetTitle>Two Element Media</SheetTitle>
              <SheetDescription>Your next step starts here.</SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile">
              {[...links, { href: "/#contact", label: "Let’s talk" }].map(
                (l) => (
                  <SheetClose asChild key={l.href}>
                    <Link href={l.href}>
                      {l.label}
                      <ArrowUpRight />
                    </Link>
                  </SheetClose>
                ),
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
