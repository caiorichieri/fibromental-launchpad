import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import fibroLogo from "../../assets/fibromental-logo-transparent.png";

const LAUNCH_DATE = new Date("2026-05-12T00:00:00+02:00");
const STORAGE_KEY = "fibromental_early_access_done_v1";

const QUESTIONS: string[] = [
  "Descrivi la situazione in cui ti trovi in questo momento — anche con una sola frase. Non c'è risposta giusta o sbagliata.",
  "Se dovessi descrivere come ti senti fisicamente in questo periodo — con un'immagine, una parola, o anche solo una sensazione — cosa diresti?",
  "A volte fare un primo passo verso qualcosa di personale non è facile. C'è qualcosa che rende difficile parlare di quello che stai vivendo, o chiedere supporto?",
  "C'è stato un momento, anche recente, in cui le cose erano un po' diverse? Come era diverso?",
  "Se domani mattina ti svegliassi e qualcosa fosse cambiato — anche una cosa piccola — cosa sarebbe diverso?",
  "Quando hai provato a parlare della fibromialgia — con medici, familiari, amici — come è andata di solito? Come ti sei sentita dopo quelle conversazioni?",
  "E nei momenti più difficili, hai sentito di essere ascoltata e capita davvero, oppure no?",
  "Come descriveresti il tuo rapporto con il dolore in questo periodo? È qualcosa contro cui lotti ancora, qualcosa che cerchi di ignorare, qualcosa che hai imparato ad accettare — o qualcos'altro?",
  "La fibromialgia ha cambiato il modo in cui ti vedi — in quello che pensi di poter ancora fare, nei tuoi ruoli, nell'immagine che hai di te stessa?",
];

function useCountdown(target: Date) {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return useMemo(() => {
    const diff = Math.max(0, target.getTime() - now);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { diff, days, hours, minutes, seconds };
  }, [now, target]);
}

export function EarlyAccessGate() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() => QUESTIONS.map(() => ""));
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const countdown = useCountdown(LAUNCH_DATE);

  useEffect(() => {
    setMounted(true);
    try {
      if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) {
        setDone(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const blocked = !done && countdown.diff > 0;
    document.body.style.overflow = blocked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mounted, done, countdown.diff]);

  if (!mounted) return null;
  if (done) return null;
  if (countdown.diff <= 0) return null;

  const isLast = step === QUESTIONS.length;
  const totalSteps = QUESTIONS.length + 1;
  const progress = Math.round(((step) / totalSteps) * 100);

  function next() {
    setError(null);
    if (!isLast) {
      if (!answers[step]?.trim()) {
        setError("Per favore scrivi una breve risposta prima di continuare.");
        return;
      }
      setStep((s) => s + 1);
    }
  }

  function prev() {
    setError(null);
    if (step > 0) setStep((s) => s - 1);
  }

  async function submit() {
    setError(null);
    const emailOk = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email.trim());
    if (!emailOk) { setError("Inserisci un indirizzo email valido."); return; }
    if (!consent) { setError("Per ricevere l'app in anteprima è necessario il consenso."); return; }
    setSubmitting(true);
    const payload = QUESTIONS.reduce<Record<string, string>>((acc, q, i) => {
      acc[`q${i + 1}`] = answers[i] || "";
      return acc;
    }, {});
    const { error: dbError } = await supabase
      .from("early_access_signups")
      .insert({ email: email.trim().toLowerCase(), answers: payload, consent });
    setSubmitting(false);
    if (dbError) { setError("Si è verificato un errore. Riprova."); return; }
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
    setSuccess(true);
  }

  return (
    <div className="ea-gate" role="dialog" aria-modal="true" aria-labelledby="ea-title">
      <div className="ea-card">
        <div className="ea-head">
          <img src={fibroLogo} alt="FibroMental" className="ea-logo" />
          <div className="ea-countdown" aria-live="polite">
            <span className="ea-countdown-label">Lancio tra</span>
            <div className="ea-countdown-grid">
              <div><strong>{countdown.days}</strong><span>giorni</span></div>
              <div><strong>{String(countdown.hours).padStart(2,"0")}</strong><span>ore</span></div>
              <div><strong>{String(countdown.minutes).padStart(2,"0")}</strong><span>min</span></div>
              <div><strong>{String(countdown.seconds).padStart(2,"0")}</strong><span>sec</span></div>
            </div>
          </div>
        </div>

        {success ? (
          <div className="ea-success">
            <h2 id="ea-title">Grazie ❤️</h2>
            <p>Le tue risposte sono state salvate. Ti scriveremo a <strong>{email}</strong> il giorno del lancio per darti accesso in anteprima a FibroMental.</p>
          </div>
        ) : (
          <>
            <div className="ea-progress" aria-hidden="true">
              <div className="ea-progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <p className="ea-step-meta">Passo {step + 1} di {totalSteps}</p>

            {!isLast ? (
              <div className="ea-step">
                <h2 id="ea-title" className="ea-question">{QUESTIONS[step]}</h2>
                <textarea
                  className="ea-textarea"
                  placeholder="Scrivi qui la tua risposta…"
                  value={answers[step]}
                  onChange={(e) => {
                    const v = e.target.value;
                    setAnswers((arr) => { const n = [...arr]; n[step] = v; return n; });
                  }}
                  rows={5}
                  maxLength={2000}
                  autoFocus
                />
              </div>
            ) : (
              <div className="ea-step">
                <h2 id="ea-title" className="ea-question">Lascia la tua email per ricevere FibroMental in anteprima</h2>
                <p className="ea-help">Ti avviseremo per primo il giorno del lancio. Niente spam.</p>
                <input
                  type="email"
                  className="ea-input"
                  placeholder="latuaemail@esempio.it"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
                <label className="ea-consent">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                  <span>Acconsento a ricevere FibroMental in anteprima e comunicazioni relative al lancio.</span>
                </label>
              </div>
            )}

            {error && <p className="ea-error" role="alert">{error}</p>}

            <div className="ea-actions">
              <button type="button" className="ea-btn-ghost" onClick={prev} disabled={step === 0 || submitting}>Indietro</button>
              {!isLast ? (
                <button type="button" className="ea-btn" onClick={next}>Continua</button>
              ) : (
                <button type="button" className="ea-btn" onClick={submit} disabled={submitting}>
                  {submitting ? "Invio…" : "Ricevi l'app in anteprima"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}