import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "../components/fibromental/Layout";
import { getArticle } from "../lib/articles";
import { getPublishedArticleBySlug } from "../lib/blog.functions";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const article = (await getPublishedArticleBySlug({ data: { slug: params.slug } })) || getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    const url = article ? `https://fibromental.app/blog/${article.slug}` : "https://fibromental.app/blog";
    return { meta: [
      { title: article ? `${article.title} — FibroMental` : "Articolo FibroMental" },
      { name: "description", content: article?.excerpt ?? "Approfondimento FibroMental su fibromialgia e dolore cronico." },
      { property: "og:title", content: article ? `${article.title} — FibroMental` : "Articolo FibroMental" },
      { property: "og:description", content: article?.excerpt ?? "Approfondimento FibroMental su fibromialgia e dolore cronico." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      ...(article ? [
        { property: "og:image", content: article.coverImage },
        { name: "twitter:image", content: article.coverImage },
        { name: "twitter:card", content: "summary_large_image" },
      ] : []),
    ],
    links: article ? [{ rel: "canonical", href: url }] : [],
    scripts: article ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        image: article.coverImage,
        url,
        author: { "@type": "Organization", name: "MetaCare S.r.l." },
        publisher: {
          "@type": "Organization",
          name: "MetaCare S.r.l.",
          logo: { "@type": "ImageObject", url: "https://fibromental.app/favicon.ico" },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      }),
    }] : [],
    };
  },
  errorComponent: ArticleError,
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
            <h1 className="display text-slate-700" style={{ fontSize: "clamp(2.35rem, 5vw, 4.2rem)" }}>{article.title}</h1>
            <p className="hero-sub">{article.excerpt}</p>
            <figure className="article-cover">
              <img src={article.coverImage} alt={article.coverAlt} width={1024} height={640} />
            </figure>
          </article>
        </section>
        <section className="article-content">
          <article className="article-layout fade-in">
            {article.paragraphs.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}
            <a
              href="https://wa.me/393313904736?text=Ciao%2C%20scrivo%20dal%20sito%20FibroMental%20e%20vorrei%20prenotare%20una%20seduta."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prenota una seduta su WhatsApp"
              className="blog-cta-pill"
            >
              <span className="hero-circle-cta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.02 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.02 0C5.495 0 .184 5.31.18 11.836c0 2.086.546 4.122 1.582 5.918L.057 24l6.404-1.68a11.87 11.87 0 005.559 1.413h.005c6.522 0 11.833-5.31 11.836-11.836a11.77 11.77 0 00-3.428-8.41z"/>
                </svg>
              </span>
              <span className="hero-circle-cta-text">
                <span className="hero-circle-cta-eyebrow">Scrivici su WhatsApp</span>
                <span className="hero-circle-cta-title">Prenota una Seduta</span>
              </span>
              <span className="hero-circle-cta-arrow" aria-hidden="true">→</span>
            </a>
            <h2>Un percorso, non una scorciatoia</h2>
            <p>Ogni contenuto del blog ha finalità informative e non sostituisce una valutazione clinica. Se vuoi capire se FibroMental può essere adatto alla tua situazione, puoi contattarci per un primo orientamento.</p>
          </article>
        </section>
      </main>
    </SiteLayout>
  );
}

function ArticleError() {
  return (
    <SiteLayout>
      <main className="page-hero">
        <div className="page-hero-inner">
          <h1 className="display text-slate-700">Articolo temporaneamente non disponibile.</h1>
          <p className="hero-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>Riprova tra poco o torna al blog.</p>
          <Link to="/blog" className="hero-cta">Torna al blog</Link>
        </div>
      </main>
    </SiteLayout>
  );
}

function ArticleNotFound() {
  return (
    <SiteLayout>
      <main className="page-hero">
        <div className="page-hero-inner">
          <h1 className="display text-slate-700">Articolo non trovato.</h1>
          <p className="hero-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>Il contenuto che cerchi non è disponibile.</p>
          <Link to="/blog" className="hero-cta">Torna al blog</Link>
        </div>
      </main>
    </SiteLayout>
  );
}
