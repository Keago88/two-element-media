import { TwinField } from "@/components/twin-mark";
import { Button } from "@/components/ui/button";
import { mailtoHref, whatsappHref } from "@/lib/site";

const ribbon = [
  "Content systems",
  "Social calendars",
  "Paid media",
  "Web & creative",
  "Photo direction",
  "Short-form film",
  "Cape Town SMEs",
];

export function Hero() {
  const whatsapp = whatsappHref();

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="twin-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] w-full max-w-[1120px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-10">
        <div>
          <p className="animate-enter font-heading text-xs font-semibold tracking-[0.32em] text-muted-foreground uppercase">
            Cape Town digital studio
          </p>
          <h1 className="font-heading animate-enter-delayed mt-6 text-5xl leading-[0.95] font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            Two elements.
            <br />
            One studio.
          </h1>
          <p className="animate-enter-late mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Two Element Media makes the work local businesses are judged on:
            content, social, paid media, and web. Sharp, consistent, and ready
            to ship — not a slide deck about “presence”.
          </p>
          <div className="animate-enter-late mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-none px-7 text-xs tracking-[0.22em] uppercase"
            >
              <a href="#contact">Start a brief</a>
            </Button>
            {whatsapp ? (
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-none border-white/25 bg-transparent px-7 text-xs tracking-[0.22em] uppercase"
              >
                <a href={whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp us
                </a>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-none border-white/25 bg-transparent px-7 text-xs tracking-[0.22em] uppercase"
              >
                <a href={mailtoHref()}>Email the studio</a>
              </Button>
            )}
          </div>
          <p className="animate-enter-late mt-6 text-xs tracking-[0.18em] text-muted-foreground uppercase">
            Working across the CBD, Atlantic Seaboard, and Southern Suburbs
          </p>
        </div>
        <div className="relative mx-auto aspect-[8/7] w-full max-w-lg text-white lg:max-w-none">
          <TwinField className="absolute inset-0" />
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="marquee-mask overflow-hidden py-4">
          <div className="animate-marquee flex w-max gap-10 text-xs tracking-[0.28em] text-muted-foreground uppercase">
            {[...ribbon, ...ribbon].map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-10">
                {item}
                <span aria-hidden="true" className="text-white/30">
                  △
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
