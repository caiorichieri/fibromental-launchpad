import { Link } from "@tanstack/react-router";
import fibroLogo from "../../assets/fibromental-logo-transparent.png";
import metacareLogo from "../../assets/metacare-logo-transparent.png";
import { ScrollReveal } from "./ScrollReveal";

export const CONTACT_EMAIL = "info@fibromental.it";
export const METACARE_AUTH_NUMBER = "[XXXX]";
export const METACARE_AUTH_DATE = "[XX/XX/XX]";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <ScrollReveal />
      <Header />
      {children}
      <MetaCareBanner />
      <Footer />
    </div>
  );
}

export function Header() {
  return (
    <nav className="site-nav" aria-label="Navigazione principale">
      <Link to="/" className="nav-logo" aria-label="FibroMental home">
        <img src={fibroLogo} alt="FibroMental" />
      </Link>
      <div className="nav-links" aria-hidden={false}>
        <Link to="/" className="nav-link" activeOptions={{ exact: true }}>Home</Link>
        <Link to="/blog" className="nav-link">Blog</Link>
        <Link to="/chi-siamo" className="nav-link">Chi siamo</Link>
        <Link to="/lavora-con-noi" className="nav-link">Lavora con noi</Link>
        <Link to="/contatti" className="nav-link">Contatti</Link>
      </div>
      <Link to="/contatti" className="nav-cta">Scrivici</Link>
    </nav>
  );
}

export function MetaCareBanner() {
  return (
    <div className="metacare-banner">
      <a href="https://www.metacare.it" target="_blank" rel="noopener noreferrer" className="mc-logo-btn" aria-label="MetaCare">
        <img src={metacareLogo} alt="MetaCare" />
      </a>
      <p>
        <strong>FibroMental</strong> è un brand di <strong>MetaCare S.r.l.</strong> — struttura sanitaria autorizzata all’erogazione di prestazioni di psicologia e psicoterapia (Prot. n° <span style={{ opacity: 0.5 }}>{METACARE_AUTH_NUMBER}</span> del <span style={{ opacity: 0.5 }}>{METACARE_AUTH_DATE}</span>)
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link to="/" className="footer-logo" aria-label="FibroMental home"><img src={fibroLogo} alt="FibroMental" /></Link>
        <p>© 2026 MetaCare S.r.l. · <a href="https://www.metacare.it" target="_blank" rel="noopener noreferrer">metacare.it</a></p>
        <a className="footer-credit" href="https://www.friulion.it" target="_blank" rel="noopener noreferrer">Sviluppato da Friuli On</a>
      </div>
    </footer>
  );
}
