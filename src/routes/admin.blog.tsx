import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { SiteLayout } from "../components/fibromental/Layout";
import { supabase } from "../integrations/supabase/client";
import type { BlogArticleRow } from "../lib/articles";
import { claimInitialAdmin, createManagedArticle, listManagedArticles } from "../lib/blog.functions";

export const Route = createFileRoute("/admin/blog")({
  head: () => ({ meta: [{ title: "Gestione notizie — FibroMental" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminBlogPage,
});

type Status = { type: "success" | "error"; message: string } | null;

const initialForm = {
  slug: "",
  tag: "",
  title: "",
  excerpt: "",
  source: "",
  readTime: "5 min",
  coverImageUrl: "",
  coverAlt: "",
  paragraphs: "",
  isPublished: true,
};

function AdminBlogPage() {
  const router = useRouter();
  const claimAdmin = useServerFn(claimInitialAdmin);
  const loadArticles = useServerFn(listManagedArticles);
  const createArticle = useServerFn(createManagedArticle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [articles, setArticles] = useState<BlogArticleRow[]>([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>(null);
  const [busy, setBusy] = useState(false);

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
    setBusy(true);
    setStatus(null);
    let { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const signUpResult = await supabase.auth.signUp({ email, password });
      data = signUpResult.data;
      error = signUpResult.error;
    }
    setBusy(false);
    if (error || !data.session) {
      setStatus({ type: "error", message: "Accesso non riuscito. Se è il primo accesso, controlla l’email di conferma." });
      return;
    }
    setAccessToken(data.session.access_token);
    await refreshArticles(data.session.access_token);
  }

  async function handleClaimAdmin() {
    setBusy(true);
    setStatus(null);
    try {
      await claimAdmin({ data: { accessToken } });
      setStatus({ type: "success", message: "Area amministratore attivata per questo account." });
      await refreshArticles();
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Non è stato possibile attivare l’amministratore." });
    } finally {
      setBusy(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      await createArticle({ data: { ...form, accessToken, paragraphs: form.paragraphs.split("\n").map((item) => item.trim()).filter(Boolean) } });
      setForm(initialForm);
      setStatus({ type: "success", message: "Notizia salvata e disponibile nel blog." });
      await refreshArticles();
      router.invalidate();
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Non è stato possibile salvare la notizia." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <div className="page-hero-inner fade-in">
            <div className="pill-label">Area riservata</div>
            <h1 className="display">Aggiungi notizie.<br /><em>Senza codice.</em></h1>
            <p className="hero-sub" style={{ marginLeft: "auto", marginRight: "auto" }}>Crea articoli SEO con titolo, copertina, riassunto e contenuto.</p>
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
                <button className="admin-secondary" type="button" onClick={handleClaimAdmin} disabled={busy}>Attiva questo account come admin</button>
                <div className="form-field"><label>URL articolo</label><input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} placeholder="nuova-notizia-fibromialgia" required /></div>
                <div className="form-field"><label>Categoria</label><input value={form.tag} onChange={(event) => setForm({ ...form, tag: event.target.value })} required /></div>
                <div className="form-field"><label>Titolo</label><input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></div>
                <div className="form-field"><label>Riassunto SEO</label><textarea value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} required /></div>
                <div className="form-field"><label>Fonte</label><input value={form.source} onChange={(event) => setForm({ ...form, source: event.target.value })} /></div>
                <div className="form-field"><label>Tempo di lettura</label><input value={form.readTime} onChange={(event) => setForm({ ...form, readTime: event.target.value })} required /></div>
                <div className="form-field"><label>URL immagine copertina</label><input type="url" value={form.coverImageUrl} onChange={(event) => setForm({ ...form, coverImageUrl: event.target.value })} /></div>
                <div className="form-field"><label>Testo alternativo immagine</label><input value={form.coverAlt} onChange={(event) => setForm({ ...form, coverAlt: event.target.value })} /></div>
                <div className="form-field"><label>Testo articolo — un paragrafo per riga</label><textarea value={form.paragraphs} onChange={(event) => setForm({ ...form, paragraphs: event.target.value })} required /></div>
                <label className="admin-check"><input type="checkbox" checked={form.isPublished} onChange={(event) => setForm({ ...form, isPublished: event.target.checked })} /> Pubblica subito</label>
                {status && <div className={`status-box ${status.type === "success" ? "status-success" : "status-error"}`}>{status.message}</div>}
                <button className="form-button" disabled={busy}>{busy ? "Salvataggio…" : "Salva notizia →"}</button>
              </form>
              <aside className="form-panel admin-list">
                <h2 className="section-title">Notizie salvate</h2>
                {articles.length === 0 ? <p className="body-text">Nessuna notizia creata dal pannello.</p> : articles.map((article) => <div className="admin-list-item" key={article.id}><strong>{article.title}</strong><span>{article.is_published ? "Pubblicata" : "Bozza"} · /blog/{article.slug}</span></div>)}
              </aside>
            </div>
          )}
          {status && !accessToken && <div className={`status-box admin-status ${status.type === "success" ? "status-success" : "status-error"}`}>{status.message}</div>}
        </section>
      </main>
    </SiteLayout>
  );
}