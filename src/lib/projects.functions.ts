import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "../integrations/supabase/client.server";

const tokenSchema = z.object({ accessToken: z.string().min(20) });
const idTokenSchema = tokenSchema.extend({ id: z.string().uuid() });
const ADMIN_EMAIL = "info@fibromental.it";

const projectSchema = z.object({
  title: z.string().min(4).max(160),
  subtitle: z.string().max(200).optional().or(z.literal("")),
  summary: z.string().min(20).max(700),
  period: z.string().max(120).optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  imageAlt: z.string().max(220).optional().or(z.literal("")),
  linkUrl: z.string().max(400).optional().or(z.literal("")),
  linkLabel: z.string().max(80).optional().or(z.literal("")),
  sortOrder: z.number().int().min(0).max(999),
  isPublished: z.boolean(),
});

const managedProjectSchema = projectSchema.extend({ accessToken: z.string().min(20) });
const updateProjectSchema = managedProjectSchema.extend({ id: z.string().uuid() });
const imageUploadSchema = tokenSchema.extend({
  fileName: z.string().min(3).max(180),
  contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  base64: z.string().min(100).max(7_000_000),
});

async function requireAdmin(accessToken: string) {
  const { data: userData, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !userData.user) throw new Error("Accedi per gestire i progetti.");
  if (userData.user.email?.toLowerCase() !== ADMIN_EMAIL) throw new Error("Accesso riservato all’amministratore FibroMental.");
  const { data: allowed } = await supabaseAdmin.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
  if (!allowed) throw new Error("Accesso riservato agli amministratori FibroMental.");
  return userData.user.id;
}

function toRow(data: z.infer<typeof projectSchema>, userId: string) {
  return {
    title: data.title,
    subtitle: data.subtitle || null,
    summary: data.summary,
    period: data.period || null,
    image_url: data.imageUrl || null,
    image_alt: data.imageAlt || data.title,
    link_url: data.linkUrl || null,
    link_label: data.linkLabel || "Scopri di più",
    sort_order: data.sortOrder,
    is_published: data.isPublished,
    updated_by: userId,
  };
}

export const getPublishedProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error("Non è stato possibile caricare i progetti.");
  return data || [];
});

export const listManagedProjects = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => tokenSchema.parse(input))
  .handler(async ({ data }) => {
    await requireAdmin(data.accessToken);
    const { data: rows, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("updated_at", { ascending: false });
    if (error) throw new Error("Non è stato possibile caricare i progetti salvati.");
    return rows || [];
  });

export const createManagedProject = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => managedProjectSchema.parse(input))
  .handler(async ({ data }) => {
    const userId = await requireAdmin(data.accessToken);
    const { error } = await supabaseAdmin.from("projects").insert({ ...toRow(data, userId), created_by: userId });
    if (error) throw new Error("Non è stato possibile salvare il progetto.");
    return { success: true };
  });

export const updateManagedProject = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => updateProjectSchema.parse(input))
  .handler(async ({ data }) => {
    const userId = await requireAdmin(data.accessToken);
    const { error } = await supabaseAdmin.from("projects").update(toRow(data, userId)).eq("id", data.id);
    if (error) throw new Error("Non è stato possibile aggiornare il progetto.");
    return { success: true };
  });

export const publishManagedProject = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => idTokenSchema.extend({ isPublished: z.boolean() }).parse(input))
  .handler(async ({ data }) => {
    const userId = await requireAdmin(data.accessToken);
    const { error } = await supabaseAdmin
      .from("projects")
      .update({ is_published: data.isPublished, updated_by: userId })
      .eq("id", data.id);
    if (error) throw new Error("Non è stato possibile aggiornare la pubblicazione.");
    return { success: true };
  });

export const deleteManagedProject = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => idTokenSchema.parse(input))
  .handler(async ({ data }) => {
    await requireAdmin(data.accessToken);
    const { error } = await supabaseAdmin.from("projects").delete().eq("id", data.id);
    if (error) throw new Error("Non è stato possibile eliminare il progetto.");
    return { success: true };
  });

export const uploadProjectImage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => imageUploadSchema.parse(input))
  .handler(async ({ data }) => {
    await requireAdmin(data.accessToken);
    const extension = data.contentType === "image/png" ? "png" : data.contentType === "image/webp" ? "webp" : "jpg";
    const safeName = data.fileName.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "progetto";
    const path = `projects/${Date.now()}-${safeName}.${extension}`;
    const bytes = Uint8Array.from(atob(data.base64), (char) => char.charCodeAt(0));

    const { error } = await supabaseAdmin.storage.from("blog-covers").upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (error) throw new Error("Non è stato possibile caricare l’immagine.");

    const { data: publicData } = supabaseAdmin.storage.from("blog-covers").getPublicUrl(path);
    if (!publicData?.publicUrl) throw new Error("Immagine caricata, ma URL non generato.");
    return { url: publicData.publicUrl };
  });
