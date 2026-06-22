import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CONTACT_EMAIL, SiteLayout } from "../components/fibromental/Layout";

const WHATSAPP_NUMBER = "393451124503";
const WHATSAPP_MESSAGE = encodeURIComponent("Ciao, vorrei ricevere informazioni su FibroMental.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: [
      { title: "Contatti FibroMental — scrivi a MetaCare" },
      { name: "description", content: "Contatta il team MetaCare per informazioni su FibroMental, app gratuita, collaborazioni o primo orientamento clinico." },
      { property: "og:title", content: "Contatti FibroMental" },
      { property: "og:description", content: "Scrivi a MetaCare per informazioni sul percorso FibroMental." },
      { property: "og:url", content: "https://fibromental.app/contatti" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://fibromental.app/contatti" },
    ],
  }),
  component: ContactPage,
});

type Status = { type: "success" | "error"; message: string } | null;

function ContactPage() {
  const [status, setStatus] = useState<Status>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topic = String(data.get("topic") || "Informazioni FibroMental").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10 || message.length > 1500) {
      setStatus({ type: "error", message: "Controlla nome, email e messaggio: il messaggio deve contenere almeno 10 caratteri." });
      return;
    }

    setIsSubmitting(true);
    const endpoint = (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined) || `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
    try {
      data.set("_subject", topic || "Contatto FibroMental");
      data.set("_template", "table");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!response.ok) throw new Error("Invio non riuscito");
      form.reset();
      setStatus({ type: "success", message: "Messaggio inviato. Ti risponderemo appena possibile." });
    } catch {
      setStatus({ type: "error", message: `Non siamo riusciti a inviare il messaggio. Puoi scrivere direttamente a ${CONTACT_EMAIL}.` });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <div className="page-hero-inner fade-in">
            <div className="pill-label">Contatti</div>
            <h1 className="display text-slate-700">Scrivici.<br /><em>Ti risponde una persona.</em></h1>
            <p className="hero-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>Per informazioni sul percorso, sull’app gratuita, su una collaborazione o su come iniziare.</p>
          </div>
        </section>
        <section className="page-section gray-light">
          <div className="contact-grid">
            <aside className="contact-card fade-in">
              <div className="pill-label">MetaCare</div>
              <h2 className="section-title">Un primo contatto gratuito.</h2>
              <p className="body-text">Raccontaci in poche righe cosa ti porta qui. Un professionista ti risponderà direttamente e potrà orientarti sul percorso più adatto.</p>
              <p className="body-text">Email diretta: <a className="progetto-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
              <a className="whatsapp-button" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Contatta FibroMental su WhatsApp">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.02 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.02 0C5.495 0 .184 5.31.18 11.836c0 2.086.546 4.122 1.582 5.918L.057 24l6.404-1.68a11.87 11.87 0 005.559 1.413h.005c6.522 0 11.833-5.31 11.836-11.836a11.77 11.77 0 00-3.428-8.41z"/></svg>
                Scrivici su WhatsApp <span className="arrow">→</span>
              </a>
            </aside>
            <form className="form-panel form-grid fade-in delay-1" onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label htmlFor="name">Nome e cognome</label>
                <input id="name" name="name" type="text" maxLength={100} autoComplete="name" required />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" maxLength={255} autoComplete="email" required />
              </div>
              <div className="form-field">
                <label htmlFor="topic">Motivo del contatto</label>
                <select id="topic" name="topic" defaultValue="Informazioni sul percorso FibroMental">
                  <option>Informazioni sul percorso FibroMental</option>
                  <option>Accesso app FibroMental gratuita</option>
                  <option>Collaborazione con associazione o struttura</option>
                  <option>Candidatura terapeuta</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="message">Messaggio</label>
                <textarea id="message" name="message" maxLength={1500} required />
              </div>
              <p className="form-note">Il messaggio viene inviato all’indirizzo FibroMental: {CONTACT_EMAIL}.</p>
              {status && <div className={`status-box ${status.type === "success" ? "status-success" : "status-error"}`}>{status.message}</div>}
              <button className="form-button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Invio in corso…" : "Invia messaggio →"}</button>
            </form>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
