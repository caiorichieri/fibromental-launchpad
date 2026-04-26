import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "../integrations/supabase/auth-middleware";
import { supabaseAdmin } from "../integrations/supabase/client.server";
import { articleFromBlogRow, mergeArticles } from "./articles";

const articleSchema = z.object({
  slug: z.string().min(3).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  tag: z.string().min(2).max(120),
  title: z.string().min(8).max(160),
  excerpt: z.string().min(20).max(260),
  source: z.string().max(180).optional(),
  readTime: z.string().min(3).max(20),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  coverAlt: z.string().max(220).optional(),
  paragraphs: z.array(z.string().min(20).max(1800)).min(1).max(20),
  isPublished: z.boolean(),
});

export const getPublishedArticles = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("blog_articles")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) throw new Error("Non è stato possibile caricare le notizie.");
  return mergeArticles((data || []).map(articleFromBlogRow));
});

export const getPublishedArticleBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => z.object({ slug: z.string().min(1).max(140) }).parse(input))
  .handler(async ({ data }) => {
    const { data: row, error } = await supabaseAdmin
      .from("blog_articles")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) throw new Error("Non è stato possibile caricare la notizia.");
    return row ? articleFromBlogRow(row) : null;
  });

export const listManagedArticles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const { data, error } = await supabaseAdmin.from("blog_articles").select("*").order("updated_at", { ascending: false });
    if (error) throw new Error("Non è stato possibile caricare gli articoli salvati.");
    return data || [];
  });

export const createManagedArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => articleSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: allowed } = await supabaseAdmin.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!allowed) throw new Error("Accesso riservato agli amministratori FibroMental.");

    const { error } = await supabaseAdmin.from("blog_articles").insert({
      slug: data.slug,
      tag: data.tag,
      title: data.title,
      excerpt: data.excerpt,
      source: data.source || null,
      read_time: data.readTime,
      cover_image_url: data.coverImageUrl || null,
      cover_alt: data.coverAlt || data.title,
      paragraphs: data.paragraphs,
      is_published: data.isPublished,
      published_at: data.isPublished ? new Date().toISOString() : null,
      created_by: context.userId,
      updated_by: context.userId,
    });

    if (error) throw new Error(error.code === "23505" ? "Esiste già una notizia con questo URL." : "Non è stato possibile salvare la notizia.");
    return { success: true };
  });