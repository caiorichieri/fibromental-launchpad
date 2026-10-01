import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { SiteLayout } from "../components/fibromental/Layout";
import { supabase } from "../integrations/supabase/client";
import { getCvLink, listApplications, updateApplicationStatus } from "../lib/applications.functions";

export const Route = createFileRoute("/admin/candidature")({
  head: () => ({ meta: [{ title: "Candidature psicologi — FibroMental" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminCandidaturePage,
});

const ADMIN_EMAIL = "info@fibromental.it";
const STATUSES = ["nuova", "in valutazione", "contattata", "archiviata"] as const;
type Row = {
  id: string; first_name: string; last_name: string; email: string; phone: string | null; city: string | null;
  qualification: string; albo_number: string | null; experience: string | null; message: string | null;
  cv_path: string | null; status: string; created_at: string;
};

function AdminCandidaturePage() {
  const load = useServerFn(listApplications);
  const cvLink = useServerFn(getCvLink);
  const setStatusFn = useServerFn(updateApplicationStatus);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function refresh(t: string) {
    try { setRows(await load({ data: { accessToken: t } })); }
    catch (e) { setToken(""); setMsg(e instanceof Error ? e.message : "Accesso non autorizzato."); }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session;
      if (s && s.user.email?.toLowerCase() === ADMIN_EMAIL) { setToken(s.access_token); refresh(s.access_token); }
    });
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const res = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (res.error || !res.data.session) return setMsg("Email o password non corretti.");
    setToken(res.data.session.access_token);
    refresh(res.data.session.access_token);
  }

  async function openCv(path: string) {
    try { const { url } = await cvLink({ data: { accessToken: token, path } }); window.open(url, "_blank", "noopener"); }
    catch (e) { setMsg(e instanceof Error ? e.message : "CV non disponibile."); }
  }

  async function changeStatus(id: string, status: (typeof STATUSES)[number]) {
    await setStatusFn({ data: { accessToken: token, id, status } });
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  }

  return (
    <SiteLayout>
      <main>
        <section className="page-hero">
          <div className="page-hero-inner fade-in">
            <div className="pill-label">Area riservata</div>
            <h1 className="display text-slate-700">Candidature<br /><em>psicologi.</em></h1>
            <div className="admin-form-top" style={{ justifyContent: "center", marginTop: "1.5rem" }}>
              <Link className="admin-secondary" to="/admin/blog">Gestione notizie</Link>
              <Link className="admin-secondary" to="/admin/progetti">Gestione progetti</Link>
            </div>
          </div>
        </section>
        <section className="page-section gray-light">
          {!token ? (
            <form className="form-panel admin-panel" onSubmit={login}>
              <div className="form-field"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
              <div className="form-field"><label>Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
              <button className="form-button" disabled={busy}>{busy ? "Accesso…" : "Entra"}</button>
            </form>
          ) : (
            <div className="form-panel" style={{ maxWidth: 960, margin: "0 auto" }}>
              <h2 className="section-title">{rows.length} candidature</h2>
              {rows.length === 0 && <p className="body-text">Nessuna candidatura ricevuta finora.</p>}
              {rows.map((r) => (
                <div className="admin-list-item" key={r.id}>
                  <strong>{r.first_name} {r.last_name} — {r.qualification}</strong>
                  <span>{new Date(r.created_at).toLocaleDateString("it-IT")} · <a href={`mailto:${r.email}`}>{r.email}</a>{r.phone ? ` · ${r.phone}` : ""}{r.city ? ` · ${r.city}` : ""}{r.albo_number ? ` · Albo ${r.albo_number}` : ""}</span>
                  {r.experience && <p className="body-text" style={{ fontSize: ".88rem", margin: 0 }}><b>Esperienza:</b> {r.experience}</p>}
                  {r.message && <p className="body-text" style={{ fontSize: ".88rem", margin: 0 }}><b>Motivazione:</b> {r.message}</p>}
                  <div className="admin-actions">
                    {r.cv_path && <button type="button" onClick={() => openCv(r.cv_path!)}>Apri CV</button>}
                    <select value={r.status} onChange={(e) => changeStatus(r.id, e.target.value as (typeof STATUSES)[number])}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
          {msg && <div className="status-box status-error admin-status">{msg}</div>}
        </section>
      </main>
    </SiteLayout>
  );
}
