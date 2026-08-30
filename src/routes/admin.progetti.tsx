import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { SiteLayout } from "../components/fibromental/Layout";
import { supabase } from "../integrations/supabase/client";
import {
  createManagedProject,
  deleteManagedProject,
  listManagedProjects,
  publishManagedProject,
  updateManagedProject,
  uploadProjectImage,
} from "../lib/projects.functions";

export const Route = createFileRoute("/admin/progetti")({
  head: () => ({ meta: [{ title: "Gestione progetti — FibroMental" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminProgettiPage,
});

type Status = { type: "success" | "error"; message: string } | null;
type ProjectRow = {
  id: string; title: string; subtitle: string | null; summary: string; period: string | null;
  image_url: string | null; image_alt: string; link_url: string | null; link_label: string;
  sort_order: number; is_published: boolean;
};
type ProjectForm = {
  title: string; subtitle: string; summary: string; period: string;
  imageUrl: string; imageAlt: string; linkUrl: string; linkLabel: string;
  sortOrder: number; isPublished: boolean;
};

const initialForm: ProjectForm = {
  title: "", subtitle: "", summary: "", period: "",
  imageUrl: "", imageAlt: "", linkUrl: "", linkLabel: "Scopri di più",
  sortOrder: 0, isPublished: true,
};
const ADMIN_EMAIL = "info@fibromental.it";

function rowToForm(project: ProjectRow): ProjectForm {
  return {
    title: project.title,
    subtitle: project.subtitle || "",
    summary: project.summary,
    period: project.period || "",
    imageUrl: project.image_url || "",
    imageAlt: project.image_alt || "",
    linkUrl: project.link_url || "",
    linkLabel: project.link_label || "Scopri di più",
    sortOrder: project.sort_order,
    isPublished: project.is_published,
  };
}

function AdminProgettiPage() {
  const router = useRouter();
  const loadProjects = useServerFn(listManagedProjects);
  const createProject = useServerFn(createManagedProject);
  const updateProject = useServerFn(updateManagedProject);
  const publishProject = useServerFn(publishManagedProject);
  const deleteProject = useServerFn(deleteManagedProject);
  const uploadImage = useServerFn(uploadProjectImage);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(initialForm);
  const [status, setStatus] = useState<Status>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session?.user.email?.toLowerCase() !== ADMIN_EMAIL) {
        setAccessToken("");
        setProjects([]);
        return;
      }
      const token = data.session?.access_token || "";
      setAccessToken(token);
      if (token) {
        try {
          setProjects(await loadProjects({ data: { accessToken: token } }));
        } catch (error) {
          setAccessToken("");
          setStatus({ type: "error", message: error instanceof Error ? error.message : "Accesso non autorizzato." });
        }
      }
    });
  }, []);

  async function refreshProjects(token = accessToken) {
    if (!token) return;
    setProjects(await loadProjects({ data: { accessToken: token } }));
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setStatus({ type: "error", message: "Accesso riservato all’amministratore FibroMental." });
      return;
    }
    setBusy(true);
    setStatus(null);
    const loginResult = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (loginResult.error || !loginResult.data.session) {
      setStatus({ type: "error", message: "Email o password non corretti." });
      return;
    }
    const token = loginResult.data.session.access_token;
    setAccessToken(token);
    try {
      await refreshProjects(token);
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Accesso non autorizzato." });
    }
  }

  async function handleImageUpload(file: File | null) {
    if (!file) return;
    setBusy(true);
    setStatus(null);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
        reader.onerror = () => reject(new Error("Lettura file non riuscita."));
        reader.readAsDataURL(file);
      });
      const { url } = await uploadImage({ data: { accessToken, fileName: file.name, contentType: file.type as "image/jpeg" | "image/png" | "image/webp", base64 } });
      setForm((current) => ({ ...current, imageUrl: url, imageAlt: current.imageAlt || current.title }));
      setStatus({ type: "success", message: "Immagine caricata." });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Upload non riuscito." });
    } finally {
      setBusy(false);
    }
  }

  async function runAction(successMessage: string, action: () => Promise<unknown>) {
    setBusy(true);
    setStatus(null);
    try {
      await action();
      setStatus({ type: "success", message: successMessage });
      await refreshProjects();
      router.invalidate();
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Operazione non riuscita." });
    } finally {
      setBusy(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = { ...form, accessToken };
    await runAction(editingId ? "Progetto aggiornato." : "Progetto salvato e visibile nella pagina Progetti.", () =>
      editingId ? updateProject({ data: { ...payload, id: editingId } }) : createProject({ data: payload }),
    );
    if (!editingId) setForm(initialForm);
  }

  async function handleDelete(project: ProjectRow) {
    const confirmed = window.confirm(`Eliminare definitivamente “${project.title}”?`);
    if (!confirmed) return;
    if (editingId === project.id) {
      setEditingId(null);
      setForm(initialForm);
    }
    await runAction("Progetto eliminato.", () => deleteProject({ data: { id: project.id, accessToken } }));
  }

  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <div className="page-hero-inner fade-in">
            <div className="pill-label">Area riservata</div>
            <h1 className="display text-slate-700">Gestione progetti.<br /><em>Senza codice.</em></h1>
            <p className="hero-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>
              Aggiungi nuovi progetti all’indice della pagina Progetti, con logo, periodo e link.
            </p>
            <div className="admin-form-top" style={{ justifyContent: "center", marginTop: "1.5rem" }}>
              <Link className="admin-secondary" to="/admin/blog">Gestione notizie</Link>
            </div>
          </div>
        </section>
        <section className="page-section gray-light">
          {!accessToken ? (
            <form className="form-panel admin-panel" onSubmit={handleLogin}>
              <div className="form-field"><label>Email</label><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
              <div className="form-field"><label>Password</label><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
              <button className="form-button" disabled={busy}>{busy ? "Accesso…" : "Entra"}</button>
            </form>
          ) : (
            <div className="admin-grid">
              <form className="form-panel form-grid" onSubmit={handleSubmit}>
                <div className="admin-form-top">
                  {editingId && <button className="admin-secondary" type="button" onClick={() => { setEditingId(null); setForm(initialForm); }}>Nuovo progetto</button>}
                </div>
                <div className="form-field"><label>Titolo</label><input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></div>
                <div className="form-field"><label>Sottotitolo</label><input value={form.subtitle} onChange={(event) => setForm({ ...form, subtitle: event.target.value })} /></div>
                <div className="form-field"><label>Descrizione breve</label><textarea value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} required /></div>
                <div className="admin-two-col">
                  <div className="form-field"><label>Periodo</label><input value={form.period} onChange={(event) => setForm({ ...form, period: event.target.value })} placeholder="maggio–agosto 2026" /></div>
                  <div className="form-field"><label>Ordine</label><input type="number" min={0} max={999} value={form.sortOrder} onChange={(event) => setForm({ ...form, sortOrder: Number(event.target.value) || 0 })} /></div>
                </div>
                <div className="form-field"><label>Carica logo o immagine</label><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleImageUpload(event.target.files?.[0] || null)} /></div>
                <div className="form-field"><label>URL immagine</label><input type="url" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} /></div>
                {form.imageUrl && <img className="admin-cover-preview" src={form.imageUrl} alt={form.imageAlt || form.title || "Anteprima immagine"} />}
                <div className="form-field"><label>Testo alternativo immagine</label><input value={form.imageAlt} onChange={(event) => setForm({ ...form, imageAlt: event.target.value })} /></div>
                <div className="admin-two-col">
                  <div className="form-field"><label>Link (interno o esterno)</label><input value={form.linkUrl} onChange={(event) => setForm({ ...form, linkUrl: event.target.value })} placeholder="/progetti/report-2026" /></div>
                  <div className="form-field"><label>Etichetta link</label><input value={form.linkLabel} onChange={(event) => setForm({ ...form, linkLabel: event.target.value })} /></div>
                </div>
                <label className="admin-check"><input type="checkbox" checked={form.isPublished} onChange={(event) => setForm({ ...form, isPublished: event.target.checked })} /> Pubblica</label>
                {status && <div className={`status-box ${status.type === "success" ? "status-success" : "status-error"}`}>{status.message}</div>}
                <button className="form-button" disabled={busy}>{busy ? "Salvataggio…" : editingId ? "Aggiorna progetto →" : "Salva progetto →"}</button>
              </form>
              <aside className="form-panel admin-list">
                <h2 className="section-title">Progetti salvati</h2>
                {projects.length === 0 ? <p className="body-text">Nessun progetto creato dal pannello.</p> : projects.map((project) => (
                  <div className={`admin-list-item ${editingId === project.id ? "active" : ""}`} key={project.id}>
                    <strong>{project.title}</strong><span>{project.is_published ? "Pubblicato" : "Bozza"} · ordine {project.sort_order}</span>
                    <div className="admin-actions">
                      <button type="button" onClick={() => { setEditingId(project.id); setForm(rowToForm(project)); setStatus(null); }}>Modifica</button>
                      <button type="button" onClick={() => runAction(project.is_published ? "Progetto messo in bozza." : "Progetto pubblicato.", () => publishProject({ data: { id: project.id, accessToken, isPublished: !project.is_published } }))}>{project.is_published ? "Bozza" : "Pubblica"}</button>
                      <button className="danger" type="button" onClick={() => handleDelete(project)} disabled={busy}>Elimina</button>
                    </div>
                  </div>
                ))}
              </aside>
            </div>
          )}
          {status && !accessToken && <div className={`status-box admin-status ${status.type === "success" ? "status-success" : "status-error"}`}>{status.message}</div>}
        </section>
      </main>
    </SiteLayout>
  );
}
