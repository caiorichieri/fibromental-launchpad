import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CONTACT_EMAIL, SiteLayout } from "../components/fibromental/Layout";

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: [
      { title: "Contatti FibroMental — scrivi a MetaCare" },
      { name: "description", content: "Contatta il team MetaCare per informazioni su FibroMental, app gratuita, collaborazioni o primo orientamento clinico." },
      { property: "og:title", content: "Contatti FibroMental" },
      { property: "og:description", content: "Scrivi a MetaCare per informazioni sul percorso FibroMental." },
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
            <h1 className="display">Scrivici.<br /><em>Ti risponde una persona.</em></h1>
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
