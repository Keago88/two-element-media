import Image from "next/image";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="footer-logo">
          <Image
            src="/images/two-element-official.png"
            alt="Two Element Media logo"
            width={3749}
            height={1959}
            sizes="180px"
          />
        </span>
        <span>
          TWO ELEMENT
          <br />
          MEDIA
        </span>
      </div>
      <p>
        Content. Social. Paid. Web.
        <br />
        Made in Cape Town.
      </p>
      <div className="footer-links">
        <a href={site.social.instagram} target="_blank" rel="noreferrer">
          Instagram ↗
        </a>
        <a href={site.social.facebook} target="_blank" rel="noreferrer">
          Facebook ↗
        </a>
        <a href={site.social.threads} target="_blank" rel="noreferrer">
          Threads ↗
        </a>
        <a href={site.social.tiktok} target="_blank" rel="noreferrer">
          TikTok ↗
        </a>
      </div>
      <div className="footer-legal">
        <span>© {new Date().getFullYear()} Two Element Media</span>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </div>
    </footer>
  );
}
