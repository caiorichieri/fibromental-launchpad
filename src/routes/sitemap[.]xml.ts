import { createFileRoute } from "@tanstack/react-router";
import { articles } from "../lib/articles";
import { supabaseAdmin } from "../integrations/supabase/client.server";

const BASE_URL = "https://fibromental.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { data } = await supabaseAdmin.from("blog_articles").select("slug").eq("is_published", true);
        const dynamicSlugs = (data || []).map((article) => article.slug);
        const staticSlugs = articles.map((article) => article.slug).filter((slug) => !dynamicSlugs.includes(slug));
        const routes = ["", "blog", "chi-siamo", "lavora-con-noi", "contatti", ...dynamicSlugs.map((slug) => `blog/${slug}`), ...staticSlugs.map((slug) => `blog/${slug}`)];
        const urls = routes.map((route) => `<url><loc>${BASE_URL}/${route}</loc></url>`).join("\n");
        return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
