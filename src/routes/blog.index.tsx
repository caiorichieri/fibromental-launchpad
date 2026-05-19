import { createFileRoute } from "@tanstack/react-router";
import { ArticleCard } from "../components/fibromental/ArticleCard";
import { SiteLayout } from "../components/fibromental/Layout";
import type { Article } from "../lib/articles";
import { getPublishedArticles } from "../lib/blog.functions";

export const Route = createFileRoute("/blog/")({
  loader: () => getPublishedArticles(),
  head: () => ({
    meta: [
      { title: "Blog FibroMental — fibromialgia e sistema nervoso" },
      { name: "description", content: "Articoli FibroMental su fibromialgia, sensibilizzazione centrale, dolore cronico, CBT, ACT, mindfulness e realtà virtuale." },
      { property: "og:title", content: "Blog FibroMental" },
      { property: "og:description", content: "Approfondimenti scientifici sulla fibromialgia, in parole semplici." },
      { property: "og:url", content: "https://fibromental.app/blog" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://fibromental.app/blog" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Blog FibroMental",
          description: "Approfondimenti scientifici sulla fibromialgia, in parole semplici.",
          url: "https://fibromental.app/blog",
          isPartOf: { "@id": "https://fibromental.app/#website" },
        }),
      },
    ],
  }),
  errorComponent: BlogError,
  component: BlogPage,
});

function BlogPage() {
  const articles = Route.useLoaderData();
  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <div className="page-hero-inner fade-in">
            <div className="pill-label">Blog</div>
            <h1 className="display text-slate-700">Capire la fibromialgia.<br /><em>Dalla ricerca.</em></h1>
            <p className="hero-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>Sette percorsi di lettura per orientarsi tra dolore cronico, sistema nervoso e strumenti psicologici evidence-based.</p>
          </div>
        </section>
        <section className="page-section blog-section">
          <h2 className="section-title" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 2rem" }}>Tutti gli articoli</h2>
          <div className="blog-grid">
            {articles.map((article: Article, index: number) => <ArticleCard key={article.slug} article={article} className={`delay-${Math.min(index % 4, 4)}`} />)}
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

function BlogError() {
  return (
    <SiteLayout>
      <main className="page-hero">
        <div className="page-hero-inner">
          <h1 className="display text-slate-700">Blog temporaneamente non disponibile.</h1>
          <p className="hero-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>Riprova tra poco o contattaci per ricevere informazioni.</p>
        </div>
      </main>
    </SiteLayout>
  );
}
