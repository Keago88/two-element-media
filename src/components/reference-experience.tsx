"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { mailtoHref, site } from "@/lib/site";

const chapters = ["home", "about", "services", "contact"];
const names = ["Home", "The studio", "Our services", "Contact"];
const elements = [
  {
    title: "Content",
    value: "Content",
    body: "The right words. A recognisable look. Copy and design that make your business clear, consistent, and worth a second look.",
    items: "Website copy · Email content · Static graphics & carousels",
  },
  {
    title: "Social media",
    value: "Social",
    body: "A plan for your presence. We take care of calendars, captions, publishing, and community across Instagram, Facebook, Threads, and TikTok.",
    items: "Content calendars · Scheduled posts · Community management",
  },
  {
    title: "Paid media",
    value: "Paid media",
    body: "Put your offer in front of the right people. Focused Meta and Google campaigns with a clear budget, useful reporting, and room to improve.",
    items: "Campaign strategy · Audience targeting · Optimisation & reporting",
  },
  {
    title: "Web & creative",
    value: "Web & creative",
    body: "A good first impression. A clear next step. Fast, considered websites and landing pages that turn interest into enquiries.",
    items: "Business websites · Landing pages · Brand & campaign creative",
  },
];

export function ReferenceExperience({
  initialService,
  initialSuccess,
  initialError,
}: {
  initialService: string;
  initialSuccess: boolean;
  initialError: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [horizontal, setHorizontal] = useState(false);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(0);
  const [service, setService] = useState(initialService);
  const [briefOpen, setBriefOpen] = useState(
    Boolean(initialService || initialSuccess || initialError),
  );

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const panels = Array.from(el.querySelectorAll<HTMLElement>(".scene"));
    const wide = window.matchMedia(
      "(min-width: 951px) and (min-height: 650px)",
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isHorizontal = wide.matches && !reduced.matches;
    let frame = 0;
    let previous = -1;
    const paint = () => {
      frame = 0;
      const top = el.getBoundingClientRect().top + window.scrollY;
      let progress = 0;
      if (isHorizontal) {
        const distance = Math.max(1, el.offsetHeight - window.innerHeight);
        progress = Math.max(
          0,
          Math.min(3, ((window.scrollY - top) / distance) * 3),
        );
        el.style.setProperty("--travel", `${progress * el.clientWidth}px`);
        panels.forEach((panel, index) =>
          panel.style.setProperty(
            "--drift",
            `${Math.max(-1, Math.min(1, progress - index)) * 110}px`,
          ),
        );
      } else {
        const index = panels.reduce(
          (current, panel, i) =>
            panel.getBoundingClientRect().top <= window.innerHeight * 0.42
              ? i
              : current,
          0,
        );
        progress = index;
        el.style.setProperty("--travel", "0px");
        panels.forEach((panel) => panel.style.setProperty("--drift", "0px"));
      }
      const index = Math.round(progress);
      if (index !== previous) {
        previous = index;
        setActive(index);
      }
      document.documentElement.style.setProperty(
        "--reading-progress",
        String(
          isHorizontal
            ? progress / 3
            : Math.min(
                1,
                window.scrollY /
                  Math.max(
                    1,
                    document.documentElement.scrollHeight - innerHeight,
                  ),
              ),
        ),
      );
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const configure = () => {
      isHorizontal = wide.matches && !reduced.matches;
      setHorizontal(isHorizontal);
      el.dataset.horizontal = String(isHorizontal);
      queue();
    };
    const navigate = (id: string, smooth = true) => {
      const aliases: Record<string, string> = {
        content: "services",
        social: "services",
        paid: "services",
        web: "services",
        work: "services",
        method: "about",
        main: "home",
      };
      const target = aliases[id] ?? id;
      const index = chapters.indexOf(target);
      if (index < 0) return;
      const serviceIndex = ["content", "social", "paid", "web"].indexOf(id);
      if (serviceIndex >= 0) setExpanded(serviceIndex);
      const top = el.getBoundingClientRect().top + window.scrollY;
      const destination = isHorizontal
        ? top + (index * (el.offsetHeight - innerHeight)) / 3
        : panels[index].getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({
        top: Math.max(0, destination),
        behavior: smooth && !reduced.matches ? "smooth" : "instant",
      });
    };
    const click = (event: MouseEvent) => {
      const a = (event.target as Element).closest<HTMLAnchorElement>(
        "a[data-scene]",
      );
      if (
        !a ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      event.preventDefault();
      const id = a.dataset.scene ?? "home";
      history.replaceState(null, "", `/#${id}`);
      navigate(id);
    };
    const hash = () => navigate(location.hash.slice(1) || "home", false);
    configure();
    const initialFrame = requestAnimationFrame(() => {
      hash();
      paint();
    });
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", configure);
    window.addEventListener("hashchange", hash);
    document.addEventListener("click", click);
    wide.addEventListener("change", configure);
    reduced.addEventListener("change", configure);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", configure);
      window.removeEventListener("hashchange", hash);
      document.removeEventListener("click", click);
      wide.removeEventListener("change", configure);
      reduced.removeEventListener("change", configure);
      document.documentElement.style.removeProperty("--reading-progress");
    };
  }, []);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    if (briefOpen && !modal.open) modal.showModal();
    else if (!briefOpen && modal.open) modal.close();
    const oldOverflow = document.body.style.overflow;
    if (briefOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, [briefOpen]);

  const startBrief = (value = "") => {
    setService(value);
    setBriefOpen(true);
  };
  const accessibility = (index: number) => ({
    inert: horizontal && active !== index,
    "aria-hidden": horizontal && active !== index ? true : undefined,
  });

  return (
    <>
      <div ref={host} className="experience" data-horizontal={horizontal}>
        <div className="experience-viewport">
          <div className="scene-track">
            <section
              id="home"
              className="scene scene-home"
              aria-labelledby="home-title"
              {...accessibility(0)}
            >
              <div className="draft-grid" aria-hidden="true" />
              <div className="scene-meta home-meta">
                <span>[CPT — ZA]</span>
                <span>INDEPENDENT BY NATURE</span>
              </div>
              <nav className="hero-services" aria-label="Our four services">
                {elements.map((item, i) => (
                  <a
                    key={item.value}
                    href={`#${["content", "social", "paid", "web"][i]}`}
                    data-scene={["content", "social", "paid", "web"][i]}
                  >
                    <span>0{i + 1}</span>
                    {item.title}
                  </a>
                ))}
              </nav>
              <div className="hero-orange" aria-hidden="true" />
              <div className="hero-object stage-art">
                <Image
                  src="/images/digital-workstation.webp"
                  alt="Sculptural black and chrome workstation with blank orange screens"
                  width={1122}
                  height={1402}
                  priority
                  sizes="(max-width: 950px) 95vw, 68vw"
                />
              </div>
              <a
                href="#about"
                data-scene="about"
                className="studio-preview"
                aria-label="Meet Two Element Media"
              >
                <span className="cut-corner" />
                <Image
                  src="/images/content-sculpture.webp"
                  alt="Unbranded phone and sculptural folded paper"
                  width={1122}
                  height={1402}
                  priority
                  sizes="(max-width: 950px) 42vw, 26vw"
                />
                <span className="vertical-caption">THE STUDIO</span>
                <span className="square-arrow">
                  <ArrowRight />
                </span>
              </a>
              <p className="hero-intro">
                Good businesses deserve to be seen. Content, social, paid media,
                and websites for Cape Town businesses ready for their next
                chapter.
              </p>
              <h1 className="hero-title" id="home-title">
                SMALL BUSINESS.
                <br />
                BIG PRESENCE.
              </h1>
              <div className="hero-coordinate">
                [33.9249° S]
                <br />
                [18.4241° E]
              </div>
              <a href="#about" data-scene="about" className="scroll-cue">
                SCROLL TO EXPLORE <ArrowDown size={15} />
              </a>
            </section>

            <section
              id="about"
              className="scene scene-about"
              aria-labelledby="about-title"
              {...accessibility(1)}
            >
              <div className="draft-grid" aria-hidden="true" />
              <div className="scene-meta about-meta">[01 — OUR STUDIO]</div>
              <h2 id="about-title" className="about-title">
                LOCAL ROOTS.
                <br />
                BIGGER THINKING.
              </h2>
              <div className="about-art stage-art">
                <span className="cut-corner" />
                <Image
                  src="/images/content-sculpture.webp"
                  alt="Black phone with blank paper, rendered as a creative studio sculpture"
                  width={1122}
                  height={1402}
                  sizes="(max-width: 950px) 75vw, 40vw"
                />
                <a
                  href="#services"
                  data-scene="services"
                  className="square-arrow"
                  aria-label="Explore our services"
                >
                  <ArrowRight />
                </a>
              </div>
              <div className="about-copy">
                <p>
                  We’re Two Element Media. An independent content and digital
                  studio for small and medium businesses in Cape Town.
                </p>
                <p>
                  We connect what you say, how you look, and where you show up.
                  One clear direction. Creative work that earns its place in
                  your business.
                </p>
                <a href="#contact" data-scene="contact" className="inline-link">
                  Meet your next creative partner <ArrowUpRight size={17} />
                </a>
              </div>
              <div className="local-proof">
                <div className="cape-photo">
                  <Image
                    src="/cape-town.jpg"
                    alt="Cape Town, home of Two Element Media"
                    fill
                    sizes="(max-width:950px) 80vw, 23vw"
                  />
                </div>
                <span>[BASED HERE. BUILT AROUND YOU.]</span>
                <p>
                  From the CBD to the Atlantic Seaboard and Southern Suburbs.
                </p>
              </div>
              <div className="studio-principles">
                <div>
                  <span>01</span>
                  <p>
                    A clear scope
                    <br />
                    <strong>Before we start.</strong>
                  </p>
                </div>
                <div>
                  <span>02</span>
                  <p>
                    Considered work
                    <br />
                    <strong>Made for your business.</strong>
                  </p>
                </div>
                <div>
                  <span>03</span>
                  <p>
                    Plain-English updates
                    <br />
                    <strong>At every step.</strong>
                  </p>
                </div>
              </div>
            </section>

            <section
              id="services"
              className="scene scene-services"
              aria-labelledby="services-title"
              {...accessibility(2)}
            >
              <div className="draft-grid" aria-hidden="true" />
              <div className="scene-meta services-meta">[02 — WHAT WE DO]</div>
              <p className="services-intro">
                Four elements. One joined-up presence.
                <br />
                Start with what your business needs.
              </p>
              <div className="service-accordion">
                {elements.map((item, i) => (
                  <article
                    className={
                      expanded === i ? "service-row is-open" : "service-row"
                    }
                    key={item.value}
                  >
                    <h3>
                      <button
                        type="button"
                        aria-expanded={expanded === i}
                        aria-controls={`service-panel-${i}`}
                        onClick={() => setExpanded(expanded === i ? -1 : i)}
                      >
                        <span className="service-number">0{i + 1}</span>
                        <span>{item.title}</span>
                        {expanded === i ? (
                          <Minus size={19} />
                        ) : (
                          <Plus size={19} />
                        )}
                      </button>
                    </h3>
                    <div
                      id={`service-panel-${i}`}
                      hidden={expanded !== i}
                      className="service-description"
                    >
                      <p>{item.body}</p>
                      <small>{item.items}</small>
                      <button
                        type="button"
                        className="inline-link"
                        onClick={() => startBrief(item.value)}
                      >
                        Let’s talk {item.title.toLowerCase()}
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <div className="services-orange" aria-hidden="true" />
              <div className="services-art stage-art">
                <Image
                  src="/images/digital-workstation.webp"
                  alt="Precision-crafted digital workstation, with blank unbranded screens"
                  width={1122}
                  height={1402}
                  sizes="(max-width:950px) 80vw, 55vw"
                />
              </div>
              <h2 className="services-title" id="services-title">
                THE RIGHT
                <br />
                ELEMENTS.
              </h2>
              <div className="services-footnote">
                CONTENT / SOCIAL / PAID / WEB
              </div>
            </section>

            <section
              id="contact"
              className="scene scene-contact"
              aria-labelledby="contact-title"
              {...accessibility(3)}
            >
              <div className="draft-grid" aria-hidden="true" />
              <div className="contact-top">
                <span>[03 — YOUR NEXT CHAPTER]</span>
                <a href={mailtoHref()}>
                  {site.email}
                  <ArrowUpRight size={14} />
                </a>
                <span>
                  Cape Town, South Africa
                  <br />
                  {site.hours}
                </span>
              </div>
              <h2 id="contact-title" className="contact-title">
                GOT A PROJECT?
                <br />
                LET’S MAKE IT
                <br className="mobile-only" /> HAPPEN.
              </h2>
              <p className="contact-intro">
                Tell us where you are and where you want to go. We’ll help you
                work out the next step.
              </p>
              <div className="contact-art stage-art">
                <Image
                  src="/images/content-sculpture.webp"
                  alt="Sculptural arrangement of blank creative materials"
                  width={1226}
                  height={1283}
                  sizes="(max-width:950px) 80vw, 47vw"
                />
              </div>
              <button
                className="contact-banner"
                onClick={() => startBrief()}
                type="button"
              >
                <span className="contact-banner-note">
                  A GOOD CONVERSATION
                  <br />
                  IS A GOOD START.
                </span>
                <ArrowRight className="contact-arrow" strokeWidth={1.6} />
                <span className="contact-banner-title">
                  GET IN
                  <br />
                  TOUCH.
                </span>
              </button>
              <div className="contact-socials">
                {[
                  ["Instagram", site.social.instagram],
                  ["Facebook", site.social.facebook],
                  ["Threads", site.social.threads],
                  ["TikTok", site.social.tiktok],
                ].map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer">
                    {label}
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
              <div className="contact-legal">
                <span>© {new Date().getFullYear()} Two Element Media</span>
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
              </div>
            </section>
          </div>
          <div className="chapter-bar">
            <nav aria-label="Page chapters">
              {chapters.map((id, i) => (
                <a
                  href={`#${id}`}
                  data-scene={id}
                  key={id}
                  aria-label={names[i]}
                  aria-current={active === i ? "step" : undefined}
                  className={active === i ? "is-active" : ""}
                >
                  0{i + 1}
                </a>
              ))}
            </nav>
            <span className="chapter-name" aria-live="polite">
              {names[active]}
            </span>
            <div className="chapter-arrows">
              <a
                href={`#${chapters[Math.max(0, active - 1)]}`}
                data-scene={chapters[Math.max(0, active - 1)]}
                aria-label="Previous chapter"
                aria-disabled={active === 0}
              >
                <ArrowLeft size={18} />
              </a>
              <a
                href={`#${chapters[Math.min(3, active + 1)]}`}
                data-scene={chapters[Math.min(3, active + 1)]}
                aria-label="Next chapter"
                aria-disabled={active === 3}
              >
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="brief-dialog"
        aria-labelledby="brief-title"
        onClose={() => setBriefOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setBriefOpen(false);
        }}
      >
        <div className="brief-content">
          <button
            type="button"
            className="brief-close"
            onClick={() => setBriefOpen(false)}
            aria-label="Close brief form"
          >
            <X size={22} />
          </button>
          <span className="eyebrow">TWO ELEMENT MEDIA / START A BRIEF</span>
          <h2 id="brief-title">
            Let’s make
            <br />a start.
          </h2>
          <p className="brief-intro">
            A few details. A good conversation.
            <br />
            Usually back to you within one business day.
          </p>
          <ContactForm
            key={`${service}-${briefOpen}`}
            initialService={service}
            initialSuccess={initialSuccess}
            initialError={initialError}
          />
          <p className="form-privacy">
            Your details are only used to respond to your enquiry.{" "}
            <a href="/privacy">Privacy policy</a>
          </p>
        </div>
      </dialog>
    </>
  );
}
