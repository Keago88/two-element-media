export const site = {
  name: "Two Element Media",
  shortName: "Two Element",
  tagline: "Cape Town content, media, and digital for local businesses.",
  description:
    "Two Element Media is a Cape Town studio for content, social, paid media, and web. Clear work for local businesses — without the fluff.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://127.0.0.1:43177"),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@twoelement.media",
  city: "Cape Town, South Africa",
  hours: "Mon–Fri, 09:00–17:00 SAST",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  socialHandle: "@twoemedia",
  social: {
    facebook: "https://www.facebook.com/twoemedia",
    instagram: "https://www.instagram.com/twoemedia",
    threads: "https://www.threads.net/@twoemedia",
  },
} as const;

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#method", label: "Method" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "Studio" },
  { href: "/#contact", label: "Contact" },
] as const;

export const services = [
  {
    id: "content",
    title: "Content",
    kicker: "Words. Stills. Film.",
    body: "Scripts, articles, photo direction, and short-form video that sound like the business.",
  },
  {
    id: "social",
    title: "Social",
    kicker: "Calendars that ship",
    body: "A weekly plan, captions, and community replies. We keep Instagram, Facebook, and Threads consistent so you are not starting from a blank phone every Monday.",
  },
  {
    id: "paid",
    title: "Paid media",
    kicker: "Budgets with a job",
    body: "Meta and Google campaigns sized for Cape Town SMEs. Clear offers, tight audiences. Weekly notes you can act on.",
  },
  {
    id: "web",
    title: "Web & creative",
    kicker: "Sites and systems",
    body: "Landing pages, brand marks, and campaign creative. Two Element Labs steps in only when a brief needs product or tooling underneath the marketing.",
  },
] as const;

export const steps = [
  {
    n: "01",
    title: "Brief",
    body: "A call or a form. What you sell, who it is for, and what has to move in the next 90 days. We write it back to you in plain language before anything is made.",
  },
  {
    n: "02",
    title: "Frame",
    body: "A short plan — clear scope, clear next step.",
  },
  {
    n: "03",
    title: "Make",
    body: "We write, shoot, design, and set up. You review in one place. Edits welcome; surprises are not.",
  },
  {
    n: "04",
    title: "Run",
    body: "Publish, boost, measure, adjust. A monthly note with what ran, what it did, and what we recommend next.",
  },
] as const;

export const workIntro = {
  title: "How the work moves.",
  description:
    "Three studio animations — craft, systems, and growth. Not client case studies.",
} as const;

export const studioAnimations = [
  {
    id: "make",
    title: "Make",
    caption: "Words, stills, and film locking into one mark.",
    label: "Studio animation",
  },
  {
    id: "ship",
    title: "Ship",
    caption: "Calendars and campaigns that actually leave the building.",
    label: "Studio animation",
  },
  {
    id: "grow",
    title: "Grow",
    caption: "The same system, compounding week to week.",
    label: "Studio animation",
  },
] as const;

export const serviceOptions = [
  "Content",
  "Social",
  "Paid media",
  "Web & creative",
  "Not sure yet",
] as const;

export function whatsappHref(message?: string) {
  const digits = site.whatsappNumber.replace(/\D/g, "");
  if (!digits) return null;
  const text = encodeURIComponent(
    message ??
      "Hi Two Element Media — I would like to talk about a brief for my business.",
  );
  return `https://wa.me/${digits}?text=${text}`;
}

export function mailtoHref() {
  const subject = encodeURIComponent("Brief for Two Element Media");
  const body = encodeURIComponent(
    "Name:\nBusiness:\nWhat you need:\n\nA few lines on the work.",
  );
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}
