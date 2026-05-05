import { createFileRoute, Link } from "@tanstack/react-router";
import { APP_URL, SiteLayout } from "../components/fibromental/Layout";
import phoneHero from "../assets/app-phone-hero.png";
import { ClipboardList, Map, BookOpen, CalendarDays, LineChart, Mail, UserCircle2, Smartphone } from "lucide-react";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "App FibroMental — Il tuo compagno digitale per la fibromialgia" },
      { name: "description", content: "Monitora sintomi, FIQR, mappa del dolore e diario quotidiano. L'app FibroMental è gratuita, sicura e installabile su qualsiasi dispositivo." },
      { property: "og:title", content: "App FibroMental — Monitora. Comprendi. Migliora." },
      { property: "og:description", content: "L'app gratuita per chi convive con la fibromialgia. FIQR, mappa del dolore, diario, grafici e riepilogo per il medico." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AppPage,
});

function AppPage() {
  return (
    <SiteLayout>
      <main>
        <section className="app-page-hero">
          <div className="app-page-hero-inner">
            <div className="fade-in">
              <div className="hero-tag">App FibroMental</div>
              <h1 className="display">Monitora. <em>Comprendi.</em><br />Migliora.</h1>
              <p className="hero-sub">Il tuo compagno digitale per la fibromialgia. Registra i sintomi, osserva l'andamento nel tempo, condividi i dati con il tuo medico — in un unico spazio sicuro e accessibile.</p>
              <div className="app-cta-row">
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="hero-cta">Installa l'app <span className="arrow">→</span></a>
              </div>
              <p className="app-free-note">Gratuita · Senza store · Funziona su qualsiasi dispositivo</p>
            </div>
            <div className="app-phone-wrap fade-in delay-1">
              <img src={phoneHero} alt="App FibroMental su smartphone" width={1024} height={1280} />
            </div>
          </div>
        </section>

        <div className="bridge-patologia fade-in">
          <p>La fibromialgia <strong>non si vede</strong>, ma si sente. FibroMental ti dà una voce per raccontarla — a te stesso, e al tuo medico.</p>
        </div>

        <section className="page-section white">
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="fade-in" style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div className="pill-label">Le funzionalità</div>
              <h2 className="section-title" style={{ maxWidth: 620, margin: "0 auto" }}>Tutto quello che serve per capire la tua condizione.</h2>
            </div>
            <div className="features-grid">
              {features.map((f, i) => (
                <div className={`feature-card fade-in delay-${Math.min(i % 4 + 1, 4)}`} key={f.title}>
                  <div className="feature-icon" aria-hidden><f.icon strokeWidth={1.5} /></div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section cream">
          <div className="section-inner">
            <div className="fade-in">
              <div className="pill-label">I benefici</div>
              <h2 className="section-title">Per te, e per il tuo medico.</h2>
              <p className="body-text">Non devi più ricordare come stavi settimane fa. I dati parlano per te — strutturati, oggettivi, condivisibili. Porta a ogni visita una storia chiara della tua condizione.</p>
            </div>
            <div className="benefits-stack fade-in delay-1">
              <div className="benefit-block">
                <h4>Per te</h4>
                <ul className="lavora-list light">
                  <li>Consapevolezza giorno dopo giorno</li>
                  <li>Interfaccia semplice, guidata, senza barriere</li>
                  <li>Memoria affidabile dei tuoi sintomi</li>
                  <li>Autonomia: monitora quando e dove vuoi</li>
                </ul>
              </div>
              <div className="benefit-block">
                <h4>Per il tuo medico</h4>
                <ul className="lavora-list light">
                  <li>Dati standardizzati FIQR</li>
                  <li>Visione longitudinale dei sintomi</li>
                  <li>Decisioni cliniche supportate da dati oggettivi</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section navy experience">
          <div className="section-inner centered">
            <div className="fade-in">
              <div className="pill-label">Sicurezza & Privacy</div>
              <h2 className="section-title">I tuoi dati sanitari sono solo tuoi.</h2>
              <div className="privacy-grid">
                <div className="privacy-item"><span aria-hidden>🔒</span><h4>Crittografia</h4><p>Password protette con bcrypt, comunicazioni HTTPS/TLS, token JWT con scadenza automatica.</p></div>
                <div className="privacy-item"><span aria-hidden>🛡️</span><h4>Mai condivisi</h4><p>I dati non vengono mai ceduti a terzi. Il riepilogo al medico parte solo col tuo consenso esplicito.</p></div>
                <div className="privacy-item"><span aria-hidden>📜</span><h4>Conforme GDPR</h4><p>Diritto di accesso, rettifica, cancellazione completa e portabilità in qualsiasi momento.</p></div>
                <div className="privacy-item"><span aria-hidden>🚫</span><h4>Nessun tracciamento</h4><p>Niente cookie pubblicitari, niente profilazione. Solo i cookie tecnici strettamente necessari.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="fade-in">
            <h2 className="display" style={{ maxWidth: 700, margin: "0 auto" }}>Inizia <em>oggi</em>.</h2>
            <p>Registrati gratuitamente e inizia a monitorare la tua fibromialgia. Bastano pochi minuti.</p>
            <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="cta-button">Installa l'app FibroMental <span className="arrow">→</span></a>
            <p style={{ marginTop: "1.5rem", fontSize: ".88rem" }}>Hai domande? <Link to="/contatti" style={{ color: "var(--orange-light)", textDecoration: "underline" }}>Scrivici</Link> — ti rispondiamo entro 24 ore.</p>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

const features = [
  { icon: ClipboardList, title: "Questionario FIQR", text: "Lo standard internazionale per la valutazione della fibromialgia. Funzionalità fisica, impatto globale e gravità dei sintomi in un punteggio strutturato." },
  { icon: Map, title: "Mappa del dolore", text: "Diagramma anatomico interattivo con vista frontale e posteriore. Per ogni regione: intensità, tipo di dolore e note." },
  { icon: BookOpen, title: "Diario quotidiano", text: "Umore, energia, sonno, rigidità e note libere. Un percorso guidato per riconoscere schemi e correlazioni." },
  { icon: CalendarDays, title: "Calendario settimanale", text: "Ogni giorno colorato — verde, arancione, rosso — in base al tuo stato. Uno sguardo per capire come stai davvero." },
  { icon: LineChart, title: "Andamento e grafici", text: "FIQR, regioni doloranti, umore, energia, sonno e rigidità — visualizza l'evoluzione nel tempo." },
  { icon: Mail, title: "Riepilogo al medico", text: "Condividi via email gli ultimi questionari, mappe e diari. Sempre col tuo consenso esplicito." },
  { icon: UserCircle2, title: "Profilo personale", text: "Gestisci dati, password e — se vuoi — elimina account e dati in modo permanente." },
  { icon: Smartphone, title: "Installabile (PWA)", text: "Installa FibroMental sul telefono come un'app nativa, senza passare dagli store. Funziona anche offline." },
];
