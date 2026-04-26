import { Link } from "@tanstack/react-router";
import type { Article } from "../../lib/articles";

export function ArticleCard({ article, className = "" }: { article: Article; className?: string }) {
  return (
    <Link to="/blog/$slug" params={{ slug: article.slug }} className={`blog-card fade-in ${className}`}>
      <div className="blog-card-top" />
      <div className="blog-card-body">
        <div className="blog-tag">{article.tag}</div>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <div className="blog-card-source">{article.source}</div>
      </div>
    </Link>
  );
}
