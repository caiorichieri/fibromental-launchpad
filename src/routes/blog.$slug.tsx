import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "../components/fibromental/Layout";
import { getArticle } from "../lib/articles";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    return { meta: [
      { title: article ? `${article.title} — FibroMental` : "Articolo FibroMental" },
      { name: "description", content: article?.excerpt ?? "Approfondimento FibroMental su fibromialgia e dolore cronico." },
      { property: "og:title", content: article ? `${article.title} — FibroMental` : "Articolo FibroMental" },
      { property: "og:description", content: article?.excerpt ?? "Approfondimento FibroMental su fibromialgia e dolore cronico." },
      { property: "og:type", content: "article" },
    ] };
  },
  notFoundComponent: ArticleNotFound,
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <article className="article-layout fade-in">
            <div className="article-meta">{article.tag} · {article.readTime}</div>
            <h1 className="display" style={{ fontSize: "clamp(2.35rem, 5vw, 4.2rem)" }}>{article.title}</h1>
            <p className="hero-sub">{article.excerpt}</p>
          </article>
        </section>
        <section className="article-content">
          <article className="article-layout fade-in">
            {article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <h2>Un percorso, non una scorciatoia</h2>
            <p>Ogni contenuto del blog ha finalità informative e non sostituisce una valutazione clinica. Se vuoi capire se FibroMental può essere adatto alla tua situazione, puoi contattarci per un primo orientamento.</p>
            <Link to="/contatti" className="hero-cta">Parla con MetaCare <span className="arrow">→</span></Link>
          </article>
        </section>
      </main>
    </SiteLayout>
  );
}

function ArticleNotFound() {
  return (
    <SiteLayout>
      <main className="page-hero">
        <div className="page-hero-inner">
          <h1 className="display">Articolo non trovato.</h1>
          <p className="hero-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>Il contenuto che cerchi non è disponibile.</p>
          <Link to="/blog" className="hero-cta">Torna al blog</Link>
        </div>
      </main>
    </SiteLayout>
  );
}
