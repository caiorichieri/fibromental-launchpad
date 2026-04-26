import { Link, createFileRoute } from "@tanstack/react-router";
import { MetaCareBanner, SiteLayout } from "../components/fibromental/Layout";
import { YarnHand, YarnResearch } from "../components/fibromental/YarnVisuals";

export const Route = createFileRoute("/chi-siamo")({
  head: () => ({
    meta: [
      { title: "Chi siamo — MetaCare e FibroMental" },
      { name: "description", content: "FibroMental è un brand MetaCare S.r.l. dedicato a percorsi psicologici evidence-based per fibromialgia e dolore cronico." },
      { property: "og:title", content: "Chi siamo — MetaCare e FibroMental" },
      { property: "og:description", content: "Il team e la visione clinica dietro FibroMental." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <MetaCareBanner />
      <main>
        <section className="page-hero">
          <div className="page-hero-inner fade-in">
            <div className="pill-label">Chi siamo / MetaCare</div>
            <h1 className="display">Una rete clinica per ciò che spesso resta <em>invisibile.</em></h1>
            <p className="hero-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>FibroMental nasce dentro MetaCare S.r.l. per portare strumenti psicologici rigorosi, umani e integrati nel lavoro con fibromialgia e dolore cronico.</p>
          </div>
        </section>
        <section className="page-section white">
          <div className="section-inner">
            <div className="fade-in">
              <div className="pill-label">MetaCare</div>
              <h2 className="section-title">Clinica, ricerca e tecnologia con una direzione precisa.</h2>
              <p className="body-text">MetaCare lavora nell’area della salute mentale con percorsi psicologici e psicoterapeutici pensati per essere accessibili, strutturati e misurabili.</p>
              <p className="body-text">FibroMental è il brand dedicato alla fibromialgia: un protocollo che integra relazione terapeutica, tecniche evidence-based e, quando utile, ambienti immersivi in realtà virtuale.</p>
            </div>
            <div className="fade-in delay-1"><YarnResearch /></div>
          </div>
        </section>
        <section className="page-section cream">
          <div className="section-inner reverse">
            <div className="fade-in">
              <div className="pill-label">Metodo</div>
              <h2 className="section-title">Il protocollo non sostituisce la persona: si adatta a lei.</h2>
              <p className="body-text">Ogni percorso viene condotto da professionisti della salute mentale e costruito dentro una relazione terapeutica reale. Gli strumenti non sono un fine: servono a raggiungere il sistema nervoso in modi diversi.</p>
              <p className="body-text">Il nostro obiettivo è dare spazio a ciò che spesso non trova ascolto: dolore, stanchezza, perdita di fiducia nel corpo, fatica nel raccontarsi.</p>
              <Link to="/contatti" className="hero-cta">Contatta MetaCare <span className="arrow">→</span></Link>
            </div>
            <div className="fade-in delay-1"><YarnHand /></div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
