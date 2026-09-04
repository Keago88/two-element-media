import Link from "next/link";
import { Logo } from "@/components/logo";
import { Parallax } from "@/components/parallax";
import { TwinMark } from "@/components/twin-mark";
import { site } from "@/lib/site";

const footerNav = [
  { href: "/#services", label: "Services" },
  { href: "/#method", label: "Method" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "Studio" },
  { href: "/#contact", label: "Contact" },
];

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid w-full max-w-[1120px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A Cape Town studio for content, social, paid media, and web. Twin
            triangles, two desks: Media for the work customers see, Labs when a
            brief needs product underneath.
          </p>
        </div>
        <div>
          <p className="font-heading text-xs tracking-[0.24em] text-muted-foreground uppercase">
            Site
          </p>
          <ul className="mt-4 space-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/90 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-heading text-xs tracking-[0.24em] text-muted-foreground uppercase">
            Connect
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={site.social.instagram}
                className="hover:text-white"
                rel="noreferrer"
                target="_blank"
              >
                Instagram {site.socialHandle}
              </a>
            </li>
            <li>
              <a
                href={site.social.facebook}
                className="hover:text-white"
                rel="noreferrer"
                target="_blank"
              >
                Facebook {site.socialHandle}
              </a>
            </li>
            <li>
              <a
                href={site.social.threads}
                className="hover:text-white"
                rel="noreferrer"
                target="_blank"
              >
                Threads {site.socialHandle}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-4 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="inline-flex items-center gap-2">
            <Parallax factor={0.05} max={6}>
              <TwinMark className="h-4 w-5" />
            </Parallax>
            <span>
              © {new Date().getFullYear()} Two Element Media · {site.city}
            </span>
          </p>
          <ul className="flex gap-5">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
