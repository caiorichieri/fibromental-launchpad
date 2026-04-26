import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { SiteLayout } from "../components/fibromental/Layout";
import { supabase } from "../integrations/supabase/client";
import type { BlogArticleRow } from "../lib/articles";
import { createManagedArticle, deleteManagedArticle, listManagedArticles, provisionSingleAdmin, publishManagedArticle, updateManagedArticle, uploadBlogCover } from "../lib/blog.functions";

export const Route = createFileRoute("/admin/blog")({
  head: () => ({ meta: [{ title: "Gestione notizie — FibroMental" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminBlogPage,
});

type Status = { type: "success" | "error"; message: string } | null;
type ArticleForm = {
  slug: string; tag: string; title: string; excerpt: string; source: string; readTime: string;
  coverImageUrl: string; coverAlt: string; paragraphs: string; isPublished: boolean;
};

const initialForm: ArticleForm = { slug: "", tag: "", title: "", excerpt: "", source: "", readTime: "5 min", coverImageUrl: "", coverAlt: "", paragraphs: "", isPublished: true };
const ADMIN_EMAIL = "info@fibromental.it";

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 120);
}

function rowToForm(article: BlogArticleRow): ArticleForm {
  return {
    slug: article.slug,
    tag: article.tag,
    title: article.title,
    excerpt: article.excerpt,
    source: article.source || "",
    readTime: article.read_time,
    coverImageUrl: article.cover_image_url || "",
    coverAlt: article.cover_alt || "",
    paragraphs: article.paragraphs.join("\n\n"),
    isPublished: article.is_published,
  };
}

function AdminBlogPage() {
  const router = useRouter();
  const provisionAdmin = useServerFn(provisionSingleAdmin);
  const loadArticles = useServerFn(listManagedArticles);
  const createArticle = useServerFn(createManagedArticle);
  const updateArticle = useServerFn(updateManagedArticle);
  const publishArticle = useServerFn(publishManagedArticle);
  const deleteArticle = useServerFn(deleteManagedArticle);
  const uploadCover = useServerFn(uploadBlogCover);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [articles, setArticles] = useState<BlogArticleRow[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ArticleForm>(initialForm);
  const [status, setStatus] = useState<Status>(null);
  const [busy, setBusy] = useState(false);
  const slugPreview = useMemo(() => slugify(form.slug || form.title), [form.slug, form.title]);
  const selectedArticle = articles.find((article) => article.id === editingId);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const token = data.session?.access_token || "";
      setAccessToken(token);
      if (token) refreshArticles(token);
    });
  }, []);

  async function refreshArticles(token = accessToken) {
    if (!token) return;
    const rows = await loadArticles({ data: { accessToken: token } });
    setArticles(rows);
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
      await provisionAdmin({ data: { accessToken: token } });
      await refreshArticles(token);
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Accesso non autorizzato." });
    }
  }

  async function handleCoverUpload(file: File | null) {
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
      const { url } = await uploadCover({ data: { accessToken, fileName: file.name, contentType: file.type as "image/jpeg" | "image/png" | "image/webp", base64 } });
      setForm((current) => ({ ...current, coverImageUrl: url, coverAlt: current.coverAlt || current.title }));
      setStatus({ type: "success", message: "Copertina caricata." });
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
      await refreshArticles();
      router.invalidate();
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Operazione non riuscita." });
    } finally {
      setBusy(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = { ...form, slug: slugPreview, accessToken, paragraphs: form.paragraphs.split("\n").map((item) => item.trim()).filter(Boolean) };
    await runAction(editingId ? "Notizia aggiornata." : "Notizia salvata e disponibile nel blog.", () => editingId ? updateArticle({ data: { ...payload, id: editingId } }) : createArticle({ data: payload }));
    if (!editingId) setForm(initialForm);
  }

  function startEdit(article: BlogArticleRow) {
    setEditingId(article.id);
    setForm(rowToForm(article));
    setStatus(null);
  }

  async function handleDelete(article: BlogArticleRow) {
    const confirmed = window.confirm(`Eliminare definitivamente “${article.title}”? Questa azione non può essere annullata.`);
    if (!confirmed) return;
    if (editingId === article.id) {
      setEditingId(null);
      setForm(initialForm);
    }
    await runAction("Notizia eliminata definitivamente.", () => deleteArticle({ data: { id: article.id, accessToken } }));
  }

  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <div className="page-hero-inner fade-in">
            <div className="pill-label">Area riservata</div>
            <h1 className="display">Gestione notizie.<br /><em>Senza codice.</em></h1>
            <p className="hero-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>Crea, modifica e pubblica articoli SEO con copertina e URL dedicato.</p>
          </div>
        </section>
        <section className="page-section gray-light">
          {!accessToken ? (
            <form className="form-panel admin-panel" onSubmit={handleLogin}>
              <div className="form-field"><label>Email</label><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
              <div className="form-field"><label>Password</label><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
              <button className="form-button" disabled={busy}>{busy ? "Accesso…" : "Entra o crea account"}</button>
            </form>
          ) : (
            <div className="admin-grid">
              <form className="form-panel form-grid" onSubmit={handleSubmit}>
                <div className="admin-form-top">
                  <button className="admin-secondary" type="button" onClick={handleClaimAdmin} disabled={busy}>Attiva admin</button>
                  {editingId && <button className="admin-secondary" type="button" onClick={() => { setEditingId(null); setForm(initialForm); }}>Nuova notizia</button>}
                </div>
                <div className="slug-preview">/blog/{slugPreview || "anteprima-url"}</div>
                <div className="form-field"><label>URL articolo</label><input value={form.slug} onChange={(event) => setForm({ ...form, slug: slugify(event.target.value) })} placeholder={slugify(form.title) || "nuova-notizia-fibromialgia"} /></div>
                <div className="form-field"><label>Categoria</label><input value={form.tag} onChange={(event) => setForm({ ...form, tag: event.target.value })} required /></div>
                <div className="form-field"><label>Titolo</label><input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value, slug: form.slug || slugify(event.target.value), coverAlt: form.coverAlt || event.target.value })} required /></div>
                <div className="form-field"><label>Riassunto SEO</label><textarea value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} required /></div>
                <div className="admin-two-col"><div className="form-field"><label>Fonte</label><input value={form.source} onChange={(event) => setForm({ ...form, source: event.target.value })} /></div><div className="form-field"><label>Tempo di lettura</label><input value={form.readTime} onChange={(event) => setForm({ ...form, readTime: event.target.value })} required /></div></div>
                <div className="form-field"><label>Carica immagine copertina</label><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleCoverUpload(event.target.files?.[0] || null)} /></div>
                <div className="form-field"><label>URL immagine copertina</label><input type="url" value={form.coverImageUrl} onChange={(event) => setForm({ ...form, coverImageUrl: event.target.value })} /></div>
                {form.coverImageUrl && <img className="admin-cover-preview" src={form.coverImageUrl} alt={form.coverAlt || form.title || "Anteprima copertina"} />}
                <div className="form-field"><label>Testo alternativo immagine</label><input value={form.coverAlt} onChange={(event) => setForm({ ...form, coverAlt: event.target.value })} /></div>
                <div className="form-field"><label>Testo articolo — un paragrafo per riga</label><textarea value={form.paragraphs} onChange={(event) => setForm({ ...form, paragraphs: event.target.value })} required /></div>
                <label className="admin-check"><input type="checkbox" checked={form.isPublished} onChange={(event) => setForm({ ...form, isPublished: event.target.checked })} /> Pubblica</label>
                {status && <div className={`status-box ${status.type === "success" ? "status-success" : "status-error"}`}>{status.message}</div>}
                <button className="form-button" disabled={busy}>{busy ? "Salvataggio…" : editingId ? "Aggiorna notizia →" : "Salva notizia →"}</button>
              </form>
              <aside className="form-panel admin-list">
                <h2 className="section-title">Notizie salvate</h2>
                {articles.length === 0 ? <p className="body-text">Nessuna notizia creata dal pannello.</p> : articles.map((article) => (
                  <div className={`admin-list-item ${selectedArticle?.id === article.id ? "active" : ""}`} key={article.id}>
                    <strong>{article.title}</strong><span>{article.is_published ? "Pubblicata" : "Bozza"} · /blog/{article.slug}</span>
                    <div className="admin-actions"><button type="button" onClick={() => startEdit(article)}>Modifica</button><button type="button" onClick={() => runAction(article.is_published ? "Notizia messa in bozza." : "Notizia pubblicata.", () => publishArticle({ data: { id: article.id, accessToken, isPublished: !article.is_published } }))}>{article.is_published ? "Bozza" : "Pubblica"}</button><button className="danger" type="button" onClick={() => handleDelete(article)} disabled={busy}>Elimina</button></div>
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