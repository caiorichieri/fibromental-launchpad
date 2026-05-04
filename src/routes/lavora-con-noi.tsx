import { Link, createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL, SiteLayout } from "../components/fibromental/Layout";

export const Route = createFileRoute("/lavora-con-noi")({
  head: () => ({
    meta: [
      { title: "Lavora con noi — FibroMental" },
      { name: "description", content: "FibroMental cerca psicologi e psicoterapeuti interessati a collaborare su percorsi evidence-based per fibromialgia e dolore cronico." },
      { property: "og:title", content: "Lavora con noi — FibroMental" },
      { property: "og:description", content: "Una pagina per psicologi e psicoterapeuti che vogliono collaborare con FibroMental." },
    ],
  }),
  component: WorkWithUsPage,
});

function WorkWithUsPage() {
  return (
    <SiteLayout>
      <main>
        <section className="page-hero lavora-page-hero">
          <div className="page-hero-inner fade-in">
            <div className="pill-label">Lavora con noi</div>
            <h1 className="display text-slate-500">Sei psicologo o psicoterapeuta?<br /><em>Costruiamo insieme il percorso.</em></h1>
            <p className="hero-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>
              FibroMental accoglie professionisti interessati al trattamento psicologico della fibromialgia e del dolore cronico, con strumenti clinici strutturati e un lavoro in rete.
            </p>
          </div>
        </section>

        <section className="page-section white">
          <div className="work-grid">
            <div className="fade-in">
              <div className="pill-label">Il profilo</div>
              <h2 className="section-title">Cerchiamo professionisti con sensibilità clinica e desiderio di specializzarsi.</h2>
              <p className="body-text">Il progetto è rivolto a psicologi e psicoterapeuti che vogliono lavorare con persone che convivono con fibromialgia, dolore cronico, stanchezza persistente e disregolazione del sistema nervoso.</p>
              <p className="body-text">Non chiediamo solo competenze tecniche: cerchiamo attenzione alla relazione terapeutica, cura del linguaggio clinico e disponibilità a seguire un protocollo condiviso.</p>
            </div>
            <div className="work-panel fade-in delay-1">
              <h3>Cosa mettiamo a disposizione</h3>
              <ul className="lavora-list light">
                <li>Formazione sul protocollo FibroMental e sulle sue aree di intervento</li>
                <li>Materiali clinici, tracce di lavoro e strumenti per il percorso</li>
                <li>Accesso agli ambienti terapeutici digitali e alla piattaforma MetaCare</li>
                <li>Supervisione, confronto clinico e possibilità di collaborazione su progetti pilota</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="page-section gray-light">
          <div className="work-steps fade-in">
            <div className="pill-label">Come iniziare</div>
            <h2 className="section-title">Raccontaci chi sei e perché ti interessa FibroMental.</h2>
            <div className="steps-grid">
              <div><span>01</span><h3>Invia il tuo contatto</h3><p>Scrivici con una breve presentazione professionale e il tuo ambito di esperienza.</p></div>
              <div><span>02</span><h3>Primo confronto</h3><p>Valutiamo insieme obiettivi, disponibilità e possibili forme di collaborazione.</p></div>
              <div><span>03</span><h3>Formazione e rete</h3><p>Se il profilo è in linea, avviamo il percorso di introduzione al protocollo.</p></div>
            </div>
            <Link to="/contatti" className="cta-button">Candidati o chiedi informazioni <span className="arrow">→</span></Link>
            <p className="form-note">Puoi anche scrivere direttamente a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}