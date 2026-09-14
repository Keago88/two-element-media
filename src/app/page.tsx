import Image from "next/image";
import {
  ArrowUpRight,
  ArrowDown,
  Check,
  PenLine,
  PanelsTopLeft,
  Target,
  MessageSquare,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { site, mailtoHref } from "@/lib/site";

const services = [
  {
    n: "01",
    icon: PenLine,
    name: "Content",
    line: "Find the words. Make your point.",
    body: "Clear copy and considered visuals that make your business easy to understand—and hard to scroll past.",
    items: [
      "Website & campaign copy",
      "Articles & email content",
      "Static graphics & carousels",
    ],
  },
  {
    n: "02",
    icon: MessageSquare,
    name: "Social media",
    line: "Show up with something to say.",
    body: "A consistent presence with a plan behind every post. We take the weekly scramble off your plate.",
    items: [
      "Content planning & calendars",
      "Captions & scheduled publishing",
      "Community management",
    ],
  },
  {
    n: "03",
    icon: Target,
    name: "Paid media",
    line: "Put your budget to work.",
    body: "Focused Meta and Google campaigns that connect your offer with the right people. Clear reporting, useful next steps.",
    items: [
      "Campaign strategy & setup",
      "Audience & ad optimisation",
      "Performance reporting",
    ],
  },
  {
    n: "04",
    icon: PanelsTopLeft,
    name: "Web & creative",
    line: "Turn interest into enquiries.",
    body: "Fast, focused websites and landing pages that look the part and make the next step obvious.",
    items: [
      "Business websites & landing pages",
      "Mobile-first design",
      "Brand & campaign creative",
    ],
  },
];
const steps = [
  [
    "01",
    "Get clear.",
    "We get to know your business, your customers and what you want to change.",
  ],
  [
    "02",
    "Make a plan.",
    "You get a clear scope, deliverables and timeline before the work begins.",
  ],
  [
    "03",
    "Bring it to life.",
    "We write, design and build. You review everything in one place.",
  ],
  [
    "04",
    "Keep improving.",
    "We publish, measure and refine—with updates you can actually use.",
  ],
];
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string; service?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <section className="hero wrap" aria-labelledby="hero-heading">
        <div className="hero-top">
          <span className="eyebrow">Independent content & digital studio</span>
          <span className="location">Cape Town, South Africa ↗</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 id="hero-heading">
              Small business.
              <br />
              Bigger <span>presence.</span>
            </h1>
            <p>
              Good businesses deserve to be seen. We bring your content, social,
              paid media and website together—so more of the right people find
              you.
            </p>
            <div className="hero-actions">
              <a className="button blue" href="#contact">
                Let’s talk about your business <ArrowUpRight size={20} />
              </a>
              <a className="text-link" href="#services">
                Explore services <ArrowDown size={17} />
              </a>
            </div>
            <div className="hero-note">
              <span className="mini-rule" />
              Made for Cape Town SMEs. Built around your goals.
            </div>
          </div>
          <div className="hero-visual">
            <Image
              src="/cape-town.jpg"
              alt="Cape Town’s Atlantic coastline and Table Mountain"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 42vw"
            />
            <div className="image-shade" />
            <div className="photo-top">
              <span>
                LOCAL KNOWLEDGE.
                <br />
                FRESH PERSPECTIVE.
              </span>
              <span className="photo-plus">+</span>
            </div>
            <div className="photo-caption">
              <span>
                Rooted here.
                <br />
                <em>Ready to grow.</em>
              </span>
              <span className="photo-coordinates">
                33.9249° S<br />
                18.4241° E
              </span>
            </div>
            <span className="image-index">01 — THE MOTHER CITY</span>
          </div>
        </div>
        <div className="service-strip">
          <span>
            One studio.
            <br />
            <strong>All the right elements.</strong>
          </span>
          <a href="#content">
            Content <ArrowUpRight />
          </a>
          <a href="#social">
            Social <ArrowUpRight />
          </a>
          <a href="#paid">
            Paid <ArrowUpRight />
          </a>
          <a href="#web">
            Web <ArrowUpRight />
          </a>
        </div>
      </section>
      <section className="services-section section-pad" id="services">
        <div className="wrap">
          <div className="section-heading">
            <span className="eyebrow">01 / What we do</span>
            <h2>
              Your next stage.
              <br />
              Our four essentials.
            </h2>
            <p>
              Start with what your business needs.
              <br />
              Bring the rest together as you grow.
            </p>
          </div>
          <div className="service-grid">
            {services.map((s, i) => (
              <article
                className="service-card"
                id={["content", "social", "paid", "web"][i]}
                key={s.n}
              >
                <div className="card-top">
                  <s.icon strokeWidth={1.5} size={28} />
                  <span>{s.n}</span>
                </div>
                <h3>{s.name}</h3>
                <h4>{s.line}</h4>
                <p>{s.body}</p>
                <ul>
                  {s.items.map((item) => (
                    <li key={item}>
                      <Check size={15} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={`/?service=${encodeURIComponent(s.name === "Social media" ? "Social" : s.name)}#contact`}
                  className="service-link"
                >
                  Let’s talk {s.name.toLowerCase()} <ArrowUpRight size={20} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="connection section-pad" id="work">
        <div className="wrap connection-grid">
          <div>
            <span className="eyebrow">02 / The bigger picture</span>
            <h2>
              Good on their own.
              <br />
              <span>Better together.</span>
            </h2>
          </div>
          <div className="connection-copy">
            <p>
              Your social posts, ads and website should tell the same story. We
              connect the pieces so your customers get a clear message, wherever
              they find you.
            </p>
            <div className="deliverable">
              <span>One clear voice</span>
              <span>A consistent look</span>
              <span>An obvious next step</span>
            </div>
          </div>
        </div>
      </section>
      <section className="method section-pad" id="method">
        <div className="wrap">
          <div className="section-heading">
            <span className="eyebrow">03 / How we work</span>
            <h2>
              Less back-and-forth.
              <br />
              More moving forward.
            </h2>
            <p>
              A straightforward process.
              <br />
              You always know what happens next.
            </p>
          </div>
          <div className="steps">
            {steps.map(([n, title, body]) => (
              <article key={n}>
                <span className="step-number">{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="method-foot">
            <span>Clear scope. Considered work. Regular updates.</span>
            <a href="#contact" className="text-link">
              Start a conversation <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <section className="studio section-pad" id="about">
        <div className="wrap studio-grid">
          <div className="studio-title">
            <span className="eyebrow">04 / Meet your studio</span>
            <h2>
              From Cape Town.
              <br />
              For businesses
              <br />
              <em>going places.</em>
            </h2>
            <div className="studio-signature">
              TWO ELEMENT <span>MEDIA</span>
            </div>
          </div>
          <div className="studio-copy">
            <p className="large-copy">
              You’re building a business.
              <br />
              We help you show it to the world.
            </p>
            <p>
              Two Element Media is an independent content and digital studio for
              small and medium businesses in Cape Town. We bring clear thinking,
              thoughtful creative and practical delivery to your everyday
              marketing.
            </p>
            <p>
              From the CBD to the Atlantic Seaboard and Southern Suburbs, we
              work with business owners who want a stronger presence and a
              clearer plan.
            </p>
            <div className="studio-facts">
              <div>
                <strong>Built around you</strong>
                <span>Choose the services that fit your next step.</span>
              </div>
              <div>
                <strong>Plain-English updates</strong>
                <span>Know what’s happening and what comes next.</span>
              </div>
            </div>
            <p className="labs-note">
              Need custom software or tooling? Our development side, Two Element
              Labs, can join when the brief calls for it.
            </p>
          </div>
        </div>
      </section>
      <section className="contact section-pad" id="contact">
        <div className="wrap contact-grid">
          <div>
            <span className="eyebrow">05 / Let’s make a start</span>
            <h2>
              What’s next
              <br />
              for your business<span>?</span>
            </h2>
            <p>
              Tell us where you are and where you want to go. We’ll help you
              work out the right next step.
            </p>
            <a className="contact-email" href={mailtoHref()}>
              {site.email} <ArrowUpRight size={22} />
            </a>
            <div className="contact-details">
              <span>Cape Town, South Africa</span>
              <span>{site.hours}</span>
              <span>Usually back to you within one business day.</span>
            </div>
          </div>
          <div className="form-panel">
            <h3>A few details. A good conversation.</h3>
            <ContactForm
              initialSuccess={params.sent === "1"}
              initialError={params.error === "1"}
              initialService={params.service}
            />
            <p className="form-privacy">
              Your details are only used to respond to your enquiry.{" "}
              <a href="/privacy">Privacy policy</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
