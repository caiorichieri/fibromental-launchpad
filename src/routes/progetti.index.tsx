import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/fibromental/Layout";
import cfuLogo from "../assets/cfu-italia-logo.png";
import swirlLogo from "../assets/progetti-swirl-logo.png";
import { getPublishedProjects } from "../lib/projects.functions";

export const Route = createFileRoute("/progetti/")({
  head: () => ({
    meta: [
      { title: "Progetti — FibroMental" },
      { name: "robots", content: "noindex,nofollow" },
      { name: "description", content: "I progetti FibroMental: percorsi psicologici, collaborazioni e report. Scopri le iniziative realizzate con le associazioni e i risultati raggiunti." },
      { property: "og:title", content: "Progetti — FibroMental" },
      { property: "og:description", content: "I progetti FibroMental: percorsi psicologici, collaborazioni e report conclusivi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async () => ({ projects: await getPublishedProjects() }),
  component: ProgettiIndexPage,
});

function ProgettiIndexPage() {
  const { projects } = Route.useLoaderData();

  return (
    <SiteLayout>
      <section className="page-hero">
        <div className="page-hero-inner fade-in" style={{ textAlign: "center" }}>
          <img src={swirlLogo} alt="Simbolo FibroMental" style={{ width: 180, height: "auto", margin: "0 auto 1.5rem", display: "block" }} />
          <span className="pill-label">Progetti · FibroMental</span>
          <h1 className="display">I nostri <em>progetti</em></h1>
          <p className="hero-sub" style={{ margin: "1.5rem auto 0", textAlign: "center" }}>
            Percorsi psicologici, collaborazioni con le associazioni e report conclusivi.
          </p>
        </div>
      </section>

      <section className="page-section white">
        <div className="progetti-grid fade-in">
          <article className="progetto-card">
            <div className="progetto-card-media">
              <img src={cfuLogo} alt="Logo CFU-Italia ODV" />
            </div>
            <div className="progetto-card-body">
              <span className="progetto-card-meta">8 partecipanti · maggio–agosto 2026</span>
              <h2>Percorso psicologico FibroMental 2026</h2>
              <p>
                Quattro sedute psicologiche individuali per otto persone con fibromialgia,
                realizzate in collaborazione con CFU-Italia ODV in Friuli Venezia Giulia.
                32 sedute completate, nessun abbandono.
              </p>
              <Link to="/progetti/report-2026" className="progetto-card-cta">Leggi il report →</Link>
            </div>
          </article>

          {projects.map((project) => (
            <article className="progetto-card" key={project.id}>
              {project.image_url && (
                <div className="progetto-card-media">
                  <img src={project.image_url} alt={project.image_alt || project.title} />
                </div>
              )}
              <div className="progetto-card-body">
                {project.period && <span className="progetto-card-meta">{project.period}</span>}
                <h2>{project.title}</h2>
                {project.subtitle && <p className="progetto-card-subtitle">{project.subtitle}</p>}
                <p>{project.summary}</p>
                {project.link_url && (
                  project.link_url.startsWith("http") ? (
                    <a className="progetto-card-cta" href={project.link_url} target="_blank" rel="noopener noreferrer">
                      {project.link_label || "Scopri di più"} →
                    </a>
                  ) : (
                    <a className="progetto-card-cta" href={project.link_url}>{project.link_label || "Scopri di più"} →</a>
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
