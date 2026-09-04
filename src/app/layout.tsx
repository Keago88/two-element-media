import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Syne } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Cape Town content & digital studio`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Cape Town digital agency",
    "content studio Cape Town",
    "social media SME",
    "paid media Cape Town",
    "Two Element Media",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: site.name,
    title: `${site.name} — Two elements. One studio.`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  email: site.email,
  url: site.url,
  areaServed: "Cape Town",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cape Town",
    addressCountry: "ZA",
  },
  sameAs: [site.social.facebook, site.social.instagram, site.social.threads],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-ZA"
      className={`dark ${geist.variable} ${syne.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
