import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "fm_newsletter_popup_v1";
const DELAY_MS = 12000;

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "dismissed:" + Date.now());
    setOpen(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value) || value.length > 255) {
      setStatus("error");
      setErrorMsg("Inserisci un'email valida.");
      return;
    }
    setStatus("loading");
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: value, source: "popup" });
    if (error) {
      if (error.code === "23505") {
        setStatus("success");
        localStorage.setItem(STORAGE_KEY, "subscribed:" + Date.now());
        return;
      }
      setStatus("error");
      setErrorMsg("Qualcosa è andato storto. Riprova.");
      return;
    }
    setStatus("success");
    localStorage.setItem(STORAGE_KEY, "subscribed:" + Date.now());
  };

  if (!open) return null;

  return (
    <div className="newsletter-overlay" role="dialog" aria-modal="true" aria-labelledby="nl-title">
      <div className="newsletter-card">
        <button type="button" className="newsletter-close" onClick={dismiss} aria-label="Chiudi">×</button>
        {status === "success" ? (
          <div className="newsletter-success">
            <div className="newsletter-badge">✓</div>
            <h3 id="nl-title">Grazie!</h3>
            <p>Sei iscritto alla newsletter di FibroMental. Ti scriveremo solo quando avremo qualcosa di utile da raccontarti.</p>
            <button type="button" className="newsletter-cta" onClick={() => setOpen(false)}>Chiudi</button>
          </div>
        ) : (
          <>
            <div className="newsletter-pill">Newsletter</div>
            <h3 id="nl-title">Storie, ricerca, comunità.</h3>
            <p>Una mail al mese — niente spam. Approfondimenti sulla fibromialgia, novità dell'app e voci di chi la vive ogni giorno.</p>
            <form onSubmit={submit} className="newsletter-form" noValidate>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="la-tua@email.it"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                maxLength={255}
                required
                aria-label="Email"
              />
              <button type="submit" className="newsletter-cta" disabled={status === "loading"}>
                {status === "loading" ? "..." : "Iscriviti"}
              </button>
            </form>
            {status === "error" && <p className="newsletter-error">{errorMsg}</p>}
            <button type="button" className="newsletter-skip" onClick={dismiss}>No grazie</button>
          </>
        )}
      </div>
    </div>
  );
}
