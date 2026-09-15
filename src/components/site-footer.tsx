import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

class FooterSocial {
  static links = [
    ["Instagram", site.social.instagram],
    ["Facebook", site.social.facebook],
    ["Threads", site.social.threads],
    ["TikTok", site.social.tiktok],
  ] as const;
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <Logo />
          <p>
            Content. Social. Paid. Web.
            <br />
            The right elements for your next chapter.
            <br />
            {site.brandLine}
          </p>
          <div className="footer-social">
            {FooterSocial.links.map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer">
                {label} {site.socialHandle} <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Two Element Media</span>
          <span>Independent by nature. Cape Town by choice.</span>
          <div>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="#main">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
