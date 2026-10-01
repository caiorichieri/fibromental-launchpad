import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitApplication } from "@/lib/applications.functions";

const QUALIFICATIONS = ["Psicologo", "Psicoterapeuta", "Specializzando in psicoterapia"] as const;
type Qualification = (typeof QUALIFICATIONS)[number];

const empty = {
  firstName: "", lastName: "", email: "", phone: "", city: "",
  qualification: "" as Qualification | "", alboNumber: "", experience: "", message: "", consent: false,
};

function readBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(new Error("Lettura del file non riuscita."));
    reader.readAsDataURL(file);
  });
}

export function ApplicationForm() {
  const send = useServerFn(submitApplication);
  const [form, setForm] = useState(empty);
  const [cv, setCv] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const set = (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const t = e.target as HTMLInputElement;
    setForm((f) => ({ ...f, [key]: t.type === "checkbox" ? t.checked : t.value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.qualification) return setError("Seleziona la tua qualifica.");
    if (!form.consent) return setError("Per inviare la candidatura serve il consenso al trattamento dei dati.");
    if (cv && cv.size > 6 * 1024 * 1024) return setError("Il CV non può superare i 6 MB.");
    setBusy(true);
    try {
      const cvPayload = cv
        ? { fileName: cv.name, contentType: cv.type as "application/pdf", base64: await readBase64(cv) }
        : undefined;
      await send({ data: { ...form, qualification: form.qualification, consent: true, cv: cvPayload } });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invio non riuscito.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="form-panel" style={{ textAlign: "center" }}>
        <h3 className="section-title">Grazie, candidatura ricevuta ✓</h3>
        <p className="body-text">Il nostro team la valuterà e ti ricontatterà via email.</p>
      </div>
    );
  }

  return (
    <form className="form-panel form-grid" onSubmit={onSubmit} style={{ textAlign: "left" }}>
      <div className="admin-two-col">
        <div className="form-field"><label>Nome *</label><input value={form.firstName} onChange={set("firstName")} required maxLength={80} /></div>
        <div className="form-field"><label>Cognome *</label><input value={form.lastName} onChange={set("lastName")} required maxLength={80} /></div>
      </div>
      <div className="admin-two-col">
        <div className="form-field"><label>Email *</label><input type="email" value={form.email} onChange={set("email")} required maxLength={255} /></div>
        <div className="form-field"><label>Telefono</label><input type="tel" value={form.phone} onChange={set("phone")} maxLength={40} /></div>
      </div>
      <div className="admin-two-col">
        <div className="form-field">
          <label>Qualifica *</label>
          <select value={form.qualification} onChange={set("qualification")} required>
            <option value="">Seleziona…</option>
            {QUALIFICATIONS.map((q) => <option key={q} value={q}>{q}</option>)}
          </select>
        </div>
        <div className="form-field"><label>N° iscrizione all'Albo e regione</label><input value={form.alboNumber} onChange={set("alboNumber")} maxLength={60} placeholder="es. 1234 – FVG" /></div>
      </div>
      <div className="form-field"><label>Città / zona in cui lavori</label><input value={form.city} onChange={set("city")} maxLength={100} /></div>
      <div className="form-field"><label>Esperienza con dolore cronico o fibromialgia</label><textarea value={form.experience} onChange={set("experience")} maxLength={1500} /></div>
      <div className="form-field"><label>Perché ti interessa FibroMental?</label><textarea value={form.message} onChange={set("message")} maxLength={3000} /></div>
      <div className="form-field">
        <label>Curriculum vitae (PDF o Word, max 6 MB)</label>
        <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => setCv(e.target.files?.[0] || null)} />
      </div>
      <label className="admin-check" style={{ alignItems: "flex-start" }}>
        <input type="checkbox" checked={form.consent} onChange={set("consent")} />
        <span>Acconsento al trattamento dei miei dati personali e del CV da parte di MetaCare S.r.l. al solo fine di valutare la candidatura (Reg. UE 2016/679).</span>
      </label>
      {error && <div className="status-box status-error">{error}</div>}
      <button className="form-button" disabled={busy}>{busy ? "Invio in corso…" : "Invia candidatura →"}</button>
    </form>
  );
}
