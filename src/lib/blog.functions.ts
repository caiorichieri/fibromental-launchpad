import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "../integrations/supabase/client.server";
import { articleFromBlogRow, mergeArticles } from "./articles";

const tokenSchema = z.object({ accessToken: z.string().min(20) });
const idTokenSchema = tokenSchema.extend({ id: z.string().uuid() });
const ADMIN_EMAIL = "info@fibromental.it";

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

const managedArticleSchema = articleSchema.extend({ accessToken: z.string().min(20) });
const updateArticleSchema = managedArticleSchema.extend({ id: z.string().uuid() });
const coverUploadSchema = tokenSchema.extend({
  fileName: z.string().min(3).max(180),
  contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  base64: z.string().min(100).max(7_000_000),
});

async function requireAdmin(accessToken: string) {
  const { data: userData, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !userData.user) throw new Error("Accedi per gestire le notizie.");
  if (userData.user.email?.toLowerCase() !== ADMIN_EMAIL) throw new Error("Accesso riservato all’amministratore FibroMental.");
  const { data: allowed } = await supabaseAdmin.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
  if (!allowed) throw new Error("Accesso riservato agli amministratori FibroMental.");
  return userData.user.id;
}

export const provisionSingleAdmin = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => tokenSchema.parse(input))
  .handler(async ({ data }) => {
    const { data: userData, error } = await supabaseAdmin.auth.getUser(data.accessToken);
    if (error || !userData.user) throw new Error("Accedi per gestire le notizie.");
    if (userData.user.email?.toLowerCase() !== ADMIN_EMAIL) throw new Error("Questo accesso è riservato a info@fibromental.it.");

    const { error: deleteError } = await supabaseAdmin.from("user_roles").delete().eq("role", "admin").neq("user_id", userData.user.id);
    if (deleteError) throw new Error("Non è stato possibile aggiornare gli accessi admin.");

    const { error: upsertError } = await supabaseAdmin.from("user_roles").upsert({ user_id: userData.user.id, role: "admin" }, { onConflict: "user_id,role" });
    if (upsertError) throw new Error("Non è stato possibile attivare l’amministratore.");
    return { success: true };
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

export const listManagedArticles = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => tokenSchema.parse(input))
  .handler(async ({ data }) => {
    await requireAdmin(data.accessToken);
    const { data: rows, error } = await supabaseAdmin.from("blog_articles").select("*").order("updated_at", { ascending: false });
    if (error) throw new Error("Non è stato possibile caricare gli articoli salvati.");
    return rows || [];
  });

export const claimInitialAdmin = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => tokenSchema.parse(input))
  .handler(async ({ data }) => {
    const { data: userData, error } = await supabaseAdmin.auth.getUser(data.accessToken);
    if (error || !userData.user) throw new Error("Accedi per attivare l’area notizie.");

    const { count, error: countError } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");

    if (countError) throw new Error("Non è stato possibile verificare gli amministratori.");
    if ((count || 0) > 0) throw new Error("L’amministratore è già stato configurato.");

    const { error: insertError } = await supabaseAdmin.from("user_roles").insert({ user_id: userData.user.id, role: "admin" });
    if (insertError) throw new Error("Non è stato possibile attivare l’amministratore.");
    return { success: true };
  });

export const createManagedArticle = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => managedArticleSchema.parse(input))
  .handler(async ({ data }) => {
    const userId = await requireAdmin(data.accessToken);

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
      created_by: userId,
      updated_by: userId,
    });

    if (error) throw new Error(error.code === "23505" ? "Esiste già una notizia con questo URL." : "Non è stato possibile salvare la notizia.");
    return { success: true };
  });

export const updateManagedArticle = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => updateArticleSchema.parse(input))
  .handler(async ({ data }) => {
    const userId = await requireAdmin(data.accessToken);

    const { error } = await supabaseAdmin
      .from("blog_articles")
      .update({
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
        updated_by: userId,
      })
      .eq("id", data.id);

    if (error) throw new Error(error.code === "23505" ? "Esiste già una notizia con questo URL." : "Non è stato possibile aggiornare la notizia.");
    return { success: true };
  });

export const publishManagedArticle = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => idTokenSchema.extend({ isPublished: z.boolean() }).parse(input))
  .handler(async ({ data }) => {
    const userId = await requireAdmin(data.accessToken);
    const { error } = await supabaseAdmin
      .from("blog_articles")
      .update({ is_published: data.isPublished, published_at: data.isPublished ? new Date().toISOString() : null, updated_by: userId })
      .eq("id", data.id);

    if (error) throw new Error("Non è stato possibile aggiornare la pubblicazione.");
    return { success: true };
  });

export const deleteManagedArticle = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => idTokenSchema.parse(input))
  .handler(async ({ data }) => {
    await requireAdmin(data.accessToken);
    const { error } = await supabaseAdmin.from("blog_articles").delete().eq("id", data.id);

    if (error) throw new Error("Non è stato possibile eliminare la notizia.");
    return { success: true };
  });

export const uploadBlogCover = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => coverUploadSchema.parse(input))
  .handler(async ({ data }) => {
    await requireAdmin(data.accessToken);
    const extension = data.contentType === "image/png" ? "png" : data.contentType === "image/webp" ? "webp" : "jpg";
    const safeName = data.fileName.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "cover";
    const path = `covers/${Date.now()}-${safeName}.${extension}`;
    const bytes = Uint8Array.from(atob(data.base64), (char) => char.charCodeAt(0));

    const { error } = await supabaseAdmin.storage.from("blog-covers").upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (error) throw new Error("Non è stato possibile caricare la copertina.");

    const { data: signed } = await supabaseAdmin.storage.from("blog-covers").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (!signed?.signedUrl) throw new Error("Copertina caricata, ma URL non generato.");
    return { url: signed.signedUrl };
  });