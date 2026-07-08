import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/fibromental/Layout";
import { YarnHand, YarnResearch } from "../components/fibromental/YarnVisuals";

const BIDOC_URL = "https://www.bidoc.it";
const WHATSAPP_URL =
  "https://wa.me/393313904736?text=Ciao%2C%20vorrei%20informazioni%20sul%20corso%20FibroMental%20per%20psicologi%20e%20psicoterapeuti.";

export const Route = createFileRoute("/corsi")({
  head: () => ({
    meta: [
      { title: "Formazione FibroMental — Corso clinico per psicologi e psicoterapeuti" },
      {
        name: "description",
        content:
          "Corso clinico riservato a psicologi e psicoterapeuti sulla fibromialgia: CBT, ACT, mindfulness clinica e realtà virtuale immersiva.",
      },
      { property: "og:title", content: "Formazione FibroMental — Corso clinico per psicologi e psicoterapeuti" },
      {
        property: "og:description",
        content:
          "Percorso formativo riservato a professionisti della salute mentale per comprendere la fibromialgia e acquisire strumenti concreti per la psicoterapia.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://fibromental.app/corsi" },
    ],
    links: [{ rel: "canonical", href: "https://fibromental.app/corsi" }],
  }),
  component: CorsiPage,
});

type LearnItem = { title: string; text: string };

const LEARN: LearnItem[] = [
  { title: "Che cos'è la fibromialgia", text: "Definizione, meccanismi, sintomi e principali manifestazioni cliniche." },
  { title: "Come vive la persona", text: "Dolore persistente, fatica, sonno, emozioni, relazioni, lavoro e qualità di vita." },
  { title: "Come accogliere e valutare", text: "Ascolto clinico, bisogni, risorse, obiettivi e priorità di intervento." },
  { title: "Come impostare il percorso", text: "Assessment, obiettivi terapeutici, pianificazione e monitoraggio." },
  { title: "Strumenti e interventi in terapia", text: "CBT, ACT, mindfulness clinica, psicoeducazione sul dolore e strategie psicoterapeutiche integrate." },
  { title: "Innovazione e realtà virtuale", text: "Quando e come integrare strumenti immersivi nel percorso terapeutico." },
];

const APPROACHES = [
  { label: "CBT", text: "Terapia cognitivo-comportamentale per il dolore cronico." },
  { label: "ACT", text: "Accettazione e flessibilità psicologica orientata ai valori." },
  { label: "Mindfulness clinica", text: "Presenza allenata, meno reattività al dolore." },
  { label: "Realtà virtuale immersiva", text: "Ambienti clinici immersivi integrati in seduta." },
];

function CorsiPage() {
  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <div className="page-hero-inner fade-in">
            <div className="pill-label">Formazione clinica · Riservato a professionisti</div>
            <div className="professionisti-badge">
              <span>Riservato a psicologi e psicoterapeuti</span>
            </div>
            <h1 className="display text-slate-700">
              Formazione <em>FibroMental</em> per psicologi e psicoterapeuti.
            </h1>
            <p className="hero-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>
              Un percorso formativo clinico per comprendere la fibromialgia, leggere l'esperienza della persona e acquisire
              strumenti concreti da portare in seduta — CBT, ACT, mindfulness clinica e realtà virtuale immersiva.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1.5rem" }}>
              <a href={BIDOC_URL} target="_blank" rel="noopener noreferrer" className="hero-cta">
                Iscriviti ora <span className="arrow">→</span>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                Chiedi info su WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="page-section white">
          <div className="section-inner">
            <div className="fade-in">
              <div className="pill-label">Il corso</div>
              <h2 className="section-title">Corso clinico per professionisti sulla fibromialgia.</h2>
              <p className="body-text">
                Molti pazienti con fibromialgia arrivano in terapia con dolore, stanchezza, insonnia, emozioni intense, senso di
                incomprensione e difficoltà nella vita quotidiana. Questo corso ti aiuta a leggere il quadro clinico e a
                impostare un lavoro terapeutico strutturato e personalizzato.
              </p>
              <p className="body-text">
                Il corso FibroMental ti aiuta a capire <strong>cosa sta accadendo</strong> e come impostare un{" "}
                <strong>lavoro clinico efficace</strong>, strutturato e personalizzato.
              </p>
              <ul className="body-text" style={{ paddingLeft: "1.2rem", lineHeight: 1.9 }}>
                <li>Materiali clinici, casi applicativi e strumenti operativi per le sedute</li>
                <li>Attestato di partecipazione FibroMental</li>
                <li>Corso riservato a psicologi e psicoterapeuti</li>
              </ul>
              <p className="body-text" style={{ fontSize: ".9rem", opacity: 0.75 }}>
                Iscrizioni, programa dettagliato e costi sono gestiti sulla piattaforma esterna dedicata.
              </p>
            </div>
            <div className="fade-in delay-1">
              <YarnHand />
            </div>
          </div>
        </section>

        <section className="page-section cream">
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="fade-in" style={{ textAlign: "center", marginBottom: "1rem" }}>
              <div className="pill-label">Il protocollo FibroMental integra</div>
              <h2 className="section-title" style={{ maxWidth: 640, margin: "0 auto" }}>
                Approcci selezionati dalla letteratura scientifica internazionale.
              </h2>
              <p className="body-text" style={{ margin: ".75rem auto 0", maxWidth: 620, fontSize: ".95rem" }}>
                Strumenti orientati alla pratica clinica sul dolore cronico e sulla fibromialgia.
              </p>
            </div>
            <div className="aree-grid">
              {APPROACHES.map((item, index) => (
                <div className={`area-card fade-in delay-${Math.min(index + 1, 4)}`} key={item.label}>
                  <h3>{item.label}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section white">
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="fade-in" style={{ textAlign: "center", marginBottom: "1rem" }}>
              <div className="pill-label">Cosa imparerai</div>
              <h2 className="section-title" style={{ maxWidth: 640, margin: "0 auto" }}>
                Sei aree di lavoro clinico.
              </h2>
            </div>
            <div className="aree-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {LEARN.map((item, index) => (
                <div className={`area-card fade-in delay-${Math.min(index + 1, 4)}`} key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section navy experience">
          <div className="section-inner reverse">
            <div className="fade-in">
              <div className="pill-label">Iscrizione</div>
              <h2 className="section-title">Iscriviti al corso riservato per professionisti</h2>
              <p className="body-text">
                Il corso è erogato attraverso una piattaforma esterna dedicata. Lì trovi programma completo, modalità e
                iscrizione — riservato a psicologi e psicoterapeuti.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
                <a href={BIDOC_URL} target="_blank" rel="noopener noreferrer" className="cta-button">
                  Iscriviti ora <span className="arrow">→</span>
                </a>
                <Link to="/contatti" className="hero-cta" style={{ background: "transparent", border: "2px solid currentColor" }}>
                  Contattaci <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            <div className="fade-in delay-1">
              <YarnResearch />
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
