import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";
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
          </p>
          <div className="footer-social">
            <a href={site.social.instagram} target="_blank" rel="noreferrer">
              Instagram <ArrowUpRight size={16} />
            </a>
            <a href={site.social.facebook} target="_blank" rel="noreferrer">
              Facebook <ArrowUpRight size={16} />
            </a>
            <a href={site.social.threads} target="_blank" rel="noreferrer">
              Threads <ArrowUpRight size={16} />
            </a>
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
