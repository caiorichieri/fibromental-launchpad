import { createFileRoute } from "@tanstack/react-router";
import { articles } from "../lib/articles";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const routes = ["", "blog", "contatti", "chi-siamo", ...articles.map((article) => `blog/${article.slug}`)];
        const urls = routes.map((route) => `<url><loc>${origin}/${route}</loc></url>`).join("\n");
        return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
