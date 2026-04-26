import { createFileRoute } from "@tanstack/react-router";
import { ArticleCard } from "../components/fibromental/ArticleCard";
import { SiteLayout } from "../components/fibromental/Layout";
import { articles } from "../lib/articles";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog FibroMental — fibromialgia e sistema nervoso" },
      { name: "description", content: "Articoli FibroMental su fibromialgia, sensibilizzazione centrale, dolore cronico, CBT, ACT, mindfulness e realtà virtuale." },
      { property: "og:title", content: "Blog FibroMental" },
      { property: "og:description", content: "Approfondimenti scientifici sulla fibromialgia, in parole semplici." },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <div className="page-hero-inner fade-in">
            <div className="pill-label">Blog</div>
            <h1 className="display">Capire la fibromialgia.<br /><em>Dalla ricerca.</em></h1>
            <p className="hero-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>Sette percorsi di lettura per orientarsi tra dolore cronico, sistema nervoso e strumenti psicologici evidence-based.</p>
          </div>
        </section>
        <section className="page-section blog-section">
          <div className="blog-grid">
            {articles.map((article, index) => <ArticleCard key={article.slug} article={article} className={`delay-${Math.min(index % 4, 4)}`} />)}
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
