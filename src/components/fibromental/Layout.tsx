import { Link } from "@tanstack/react-router";
import { ScrollReveal } from "./ScrollReveal";

export const CONTACT_EMAIL = "info@metacare.it";
export const METACARE_AUTH_NUMBER = "[XXXX]";
export const METACARE_AUTH_DATE = "[XX/XX/XX]";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <ScrollReveal />
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export function Header() {
  return (
    <nav className="site-nav" aria-label="Navigazione principale">
      <Link to="/" className="nav-logo" aria-label="FibroMental home">
        Fibro<span>Mental</span>
      </Link>
      <div className="nav-links" aria-hidden={false}>
        <Link to="/" className="nav-link" activeOptions={{ exact: true }}>Home</Link>
        <Link to="/blog" className="nav-link">Blog</Link>
        <Link to="/chi-siamo" className="nav-link">Chi siamo</Link>
        <Link to="/contatti" className="nav-link">Contatti</Link>
      </div>
      <Link to="/contatti" className="nav-cta">Scrivici</Link>
    </nav>
  );
}

export function MetaCareBanner() {
  return (
    <div className="metacare-banner">
      <p>
        <strong>FibroMental</strong> è un brand di <strong>MetaCare S.r.l.</strong> — struttura sanitaria autorizzata all’erogazione di prestazioni di psicologia e psicoterapia (Prot. n° <span style={{ opacity: 0.5 }}>{METACARE_AUTH_NUMBER}</span> del <span style={{ opacity: 0.5 }}>{METACARE_AUTH_DATE}</span>)
      </p>
      <a href="https://www.metacare.it" target="_blank" rel="noopener noreferrer" className="mc-logo-btn">logo MetaCare</a>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          <span>FibroMental</span> è un brand di <strong style={{ color: "rgba(255,255,255,.55)", fontWeight: 500 }}>MetaCare S.r.l.</strong> — struttura sanitaria autorizzata all’erogazione di prestazioni di psicologia e psicoterapia (Prot. n° {METACARE_AUTH_NUMBER} del {METACARE_AUTH_DATE})
        </p>
        <p style={{ fontSize: ".75rem", color: "rgba(255,255,255,.2)" }}>© 2026 MetaCare S.r.l. · <a href="https://www.metacare.it" target="_blank" rel="noopener noreferrer">metacare.it</a></p>
      </div>
    </footer>
  );
}
