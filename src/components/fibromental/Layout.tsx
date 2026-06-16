import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import fibroLogo from "../../assets/fibromental-logo-transparent.png";
import metacareLogo from "../../assets/metacare-logo-transparent.png";
import { ScrollReveal } from "./ScrollReveal";

export const CONTACT_EMAIL = "info@fibromental.it";
export const METACARE_AUTH_NUMBER = "4710";
export const METACARE_AUTH_DATE = "13/01/2026";
export const APP_URL = "https://app.fibromental.it";

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
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { setOpen(false); }, [pathname]);
  return (
    <nav className="site-nav" aria-label="Navigazione principale">
      <Link to="/" className="nav-logo" aria-label="FibroMental home">
        <img src={fibroLogo} alt="FibroMental logo" />
      </Link>
      <div className={`nav-links${open ? " open" : ""}`}>
        <Link to="/" className="nav-link" activeOptions={{ exact: true }}>Home</Link>
        <Link to="/blog" className="nav-link">Blog</Link>
        <Link to="/chi-siamo" className="nav-link">Chi siamo</Link>
        <Link to="/lavora-con-noi" className="nav-link">Lavora con noi</Link>
        
        <Link to="/contatti" className="nav-link">Contatti</Link>
        <Link to="/admin/blog" className="nav-link">Area riservata</Link>
      </div>
      <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">Installa l'app</a>
      <button
        type="button"
        className={`nav-toggle${open ? " open" : ""}`}
        aria-label="Apri menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}

export function MetaCareBanner() {
  return (
    <div className="metacare-banner">
      <a href="https://www.metacare.it" target="_blank" rel="noopener noreferrer" className="mc-logo-btn" aria-label="MetaCare">
        <img src={metacareLogo} alt="MetaCare logo" />
      </a>
      <p>
        <strong>FibroMental</strong> è un brand di <strong>MetaCare S.r.l.</strong> — struttura sanitaria autorizzata all’erogazione di prestazioni di psicologia e psicoterapia (Prot. n° {METACARE_AUTH_NUMBER} del {METACARE_AUTH_DATE})
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link to="/" className="footer-logo" aria-label="FibroMental home"><img src={fibroLogo} alt="FibroMental logo" /></Link>
        <p>© 2026 MetaCare S.r.l. · <a href="https://www.metacare.it" target="_blank" rel="noopener noreferrer">metacare.it</a></p>
        <a className="footer-credit" href="https://www.friulion.it" target="_blank" rel="noopener noreferrer">Sviluppato da Friuli On</a>
      </div>
    </footer>
  );
}
