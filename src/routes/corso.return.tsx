import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/fibromental/Layout";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/corso/return")({
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  component: CorsoReturn,
  head: () => ({
    meta: [
      { title: "Iscrizione confermata — Corso FibroMental" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function CorsoReturn() {
  const { session_id } = Route.useSearch();
  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <div className="page-hero-inner fade-in" style={{ maxWidth: 640 }}>
            <div className="pill-label">Iscrizione</div>
            <h1 className="display text-slate-700">Grazie! Iscrizione confermata ✓</h1>
            <p className="hero-sub">
              Il pagamento è andato a buon fine. Ti abbiamo appena inviato un'email di conferma con tutti i
              dettagli del corso. Se non la trovi, controlla anche nello spam.
            </p>
            {session_id ? (
              <p style={{ fontSize: ".85rem", opacity: 0.6, marginTop: "1rem" }}>
                Ricevuta: <code>{session_id}</code>
              </p>
            ) : null}
            <div style={{ marginTop: "2rem" }}>
              <Link to="/" className="hero-cta">
                Torna alla home <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}