import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "../integrations/supabase/client.server";

const ADMIN_EMAIL = "info@fibromental.it";
const BUCKET = "candidature-cv";

const applicationSchema = z.object({
  firstName: z.string().trim().min(2).max(80),
  lastName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  city: z.string().trim().max(100).optional().or(z.literal("")),
  qualification: z.enum(["Psicologo", "Psicoterapeuta", "Specializzando in psicoterapia"]),
  alboNumber: z.string().trim().max(60).optional().or(z.literal("")),
  experience: z.string().trim().max(1500).optional().or(z.literal("")),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
  consent: z.literal(true),
  cv: z
    .object({
      fileName: z.string().min(3).max(180),
      contentType: z.enum([
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]),
      base64: z.string().min(100).max(8_200_000),
    })
    .optional(),
});

// Invio pubblico della candidatura dal sito
export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    let cvPath: string | null = null;
    if (data.cv) {
      const ext = data.cv.fileName.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "pdf";
      cvPath = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
      const bytes = Buffer.from(data.cv.base64, "base64");
      if (bytes.length > 6 * 1024 * 1024) throw new Error("Il CV supera i 6 MB.");
      const { error } = await supabaseAdmin.storage.from(BUCKET).upload(cvPath, bytes, { contentType: data.cv.contentType });
      if (error) throw new Error("Caricamento del CV non riuscito. Riprova.");
    }
    const { error } = await supabaseAdmin.from("job_applications").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email.toLowerCase(),
      phone: data.phone || null,
      city: data.city || null,
      qualification: data.qualification,
      albo_number: data.alboNumber || null,
      experience: data.experience || null,
      message: data.message || null,
      cv_path: cvPath,
    });
    if (error) throw new Error("Invio non riuscito. Riprova tra poco.");
    return { ok: true };
  });

async function requireAdmin(accessToken: string) {
  const { data: userData, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !userData.user) throw new Error("Accedi per vedere le candidature.");
  if (userData.user.email?.toLowerCase() !== ADMIN_EMAIL) throw new Error("Accesso riservato all’amministratore FibroMental.");
  const { data: allowed } = await supabaseAdmin.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
  if (!allowed) throw new Error("Accesso riservato agli amministratori FibroMental.");
}

const tokenSchema = z.object({ accessToken: z.string().min(20) });

export const listApplications = createServerFn({ method: "POST" })
  .inputValidator((data) => tokenSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin(data.accessToken);
    const { data: rows, error } = await supabaseAdmin
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error("Impossibile caricare le candidature.");
    return rows ?? [];
  });

export const getCvLink = createServerFn({ method: "POST" })
  .inputValidator((data) => tokenSchema.extend({ path: z.string().min(5).max(200) }).parse(data))
  .handler(async ({ data }) => {
    await requireAdmin(data.accessToken);
    const { data: signed, error } = await supabaseAdmin.storage.from(BUCKET).createSignedUrl(data.path, 300);
    if (error || !signed) throw new Error("CV non disponibile.");
    return { url: signed.signedUrl };
  });

export const updateApplicationStatus = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    tokenSchema.extend({ id: z.string().uuid(), status: z.enum(["nuova", "in valutazione", "contattata", "archiviata"]) }).parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdmin(data.accessToken);
    const { error } = await supabaseAdmin.from("job_applications").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error("Aggiornamento non riuscito.");
    return { ok: true };
  });
