import { Link } from "@tanstack/react-router";
import type { Article } from "../../lib/articles";

export function ArticleCard({ article, className = "" }: { article: Article; className?: string }) {
  return (
    <Link to="/blog/$slug" params={{ slug: article.slug }} className={`blog-card fade-in ${className}`}>
      <div className="blog-card-cover">
        <img src={article.coverImage} alt={article.coverAlt} width={1024} height={640} loading="lazy" />
      </div>
      <div className="blog-card-body">
        <div className="blog-tag">{article.tag}</div>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="blog-card-source">{article.readTime} · {article.source}</div>
      </div>
    </Link>
  );
}
