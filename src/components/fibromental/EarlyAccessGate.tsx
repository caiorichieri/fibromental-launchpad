import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import fibroLogo from "../../assets/fibromental-logo-transparent.png";

const LAUNCH_DATE = new Date("2026-05-12T00:00:00+02:00");
const STORAGE_KEY = "fibromental_early_access_done_v2";

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

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

type Step = "welcome" | "intro" | "questions" | "consent" | "success";

function useCountdown(target: Date) {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return useMemo(() => {
    const diff = Math.max(0, target.getTime() - now);
    return {
      diff,
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [now, target]);
}

export function EarlyAccessGate() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() => QUESTIONS.map(() => ""));
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [consent, setConsent] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const countdown = useCountdown(LAUNCH_DATE);

  useEffect(() => {
    setMounted(true);
    try {
      if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) setDone(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const blocked = !done && countdown.diff > 0;
    document.body.style.overflow = blocked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mounted, done, countdown.diff]);

  if (!mounted || done || countdown.diff <= 0) return null;

  function startQuestions() {
    setError(null);
    if (!EMAIL_RE.test(email.trim())) { setError("Inserisci un indirizzo email valido."); return; }
    const ageNum = Number(age);
    if (!ageNum || ageNum < 10 || ageNum > 110) { setError("Inserisci un'età valida."); return; }
    if (!sex) { setError("Seleziona un'opzione per il sesso."); return; }
    setStep("questions");
    setQIndex(0);
  }

  function nextQuestion() {
    setError(null);
    if (!answers[qIndex]?.trim()) { setError("Per favore scrivi una breve risposta prima di continuare."); return; }
    if (qIndex < QUESTIONS.length - 1) setQIndex(qIndex + 1);
    else setStep("consent");
  }

  function prevQuestion() {
    setError(null);
    if (qIndex > 0) setQIndex(qIndex - 1);
    else setStep("intro");
  }

  async function submit() {
    setError(null);
    if (!consent || !privacy) { setError("Per ricevere l'accesso anticipato è necessario accettare il consenso e la privacy."); return; }
    setSubmitting(true);
    const payload = QUESTIONS.reduce<Record<string, string>>((acc, _, i) => {
      acc[`q${i + 1}`] = answers[i] || "";
      return acc;
    }, {});
    payload._age = age;
    payload._sex = sex;
    payload._newsletter = newsletter ? "yes" : "no";
    const { error: dbError } = await supabase
      .from("early_access_signups")
      .insert({ email: email.trim().toLowerCase(), answers: payload, consent: true });
    if (!dbError && newsletter) {
      await supabase.from("newsletter_subscribers")
        .insert({ email: email.trim().toLowerCase(), source: "early_access_gate" });
    }
    setSubmitting(false);
    if (dbError) { setError("Si è verificato un errore. Riprova."); return; }
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
    setStep("success");
  }

  const totalSteps = QUESTIONS.length + 2; // intro + questions + consent
  const currentStepNum =
    step === "intro" ? 1 :
    step === "questions" ? 2 + qIndex :
    step === "consent" ? totalSteps :
    totalSteps;
  const progress = Math.round((currentStepNum / totalSteps) * 100);

  return (
    <div className="ea-gate" role="dialog" aria-modal="true" aria-labelledby="ea-title">
      <div className="ea-wrap">
        <div className="ea-topbar">
          <img src={fibroLogo} alt="Logo FibroMental" className="ea-logo-top" />
          <div className="ea-countdown-big" aria-live="polite">
            <span className="ea-countdown-label">Lancio tra</span>
            <div className="ea-countdown-grid">
              <div><strong>{countdown.days}</strong><span>giorni</span></div>
              <div><strong>{String(countdown.hours).padStart(2,"0")}</strong><span>ore</span></div>
              <div><strong>{String(countdown.minutes).padStart(2,"0")}</strong><span>min</span></div>
              <div><strong>{String(countdown.seconds).padStart(2,"0")}</strong><span>sec</span></div>
            </div>
          </div>
        </div>

        <div className="ea-card">
        {step === "welcome" ? (
          <div className="ea-welcome">
            <img src={fibroLogo} alt="Logo FibroMental" className="ea-welcome-logo" />
            <h2 id="ea-title" className="ea-welcome-title">Ti Crediamo</h2>
            <p className="ea-welcome-date">12 maggio<br /><span>Giornata mondiale per la Fibromialgia</span></p>
            <button type="button" className="ea-btn" onClick={() => setStep("intro")}>Continua</button>
          </div>
        ) : step === "success" ? (
            <div className="ea-success">
              <h2 id="ea-title">Grazie ❤️</h2>
              <p>Le tue risposte sono state salvate in modo <strong>completamente anonimo</strong>. Hai ora accesso in anteprima al portale FibroMental.</p>
              <a href="https://app.fibromental.it" target="_blank" rel="noopener noreferrer" className="ea-btn ea-btn-success">
                Accedi al portale
              </a>
              <p className="ea-help" style={{ marginTop: "1rem" }}>
                Ti scriveremo anche a <strong>{email}</strong> il giorno del lancio ufficiale.
              </p>
            </div>
          ) : (
            <>
              <div className="ea-progress" aria-hidden="true">
                <div className="ea-progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <p className="ea-step-meta">Passo {currentStepNum} di {totalSteps}</p>

              {step === "intro" && (
                <div className="ea-step">
                  <h2 id="ea-title" className="ea-question">Garantisci l'accesso al portale prima del lancio</h2>
                  <p className="ea-help">Rispondi a un breve questionario e riceverai FibroMental in anteprima. Per iniziare, lasciaci alcune informazioni di base.</p>
                  <label className="ea-field">
                    <span>Email</span>
                    <input type="email" className="ea-input" placeholder="latuaemail@esempio.it"
                      value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
                  </label>
                  <div className="ea-row">
                    <label className="ea-field">
                      <span>Età</span>
                      <input type="number" className="ea-input" placeholder="Es. 42" min={10} max={110}
                        value={age} onChange={(e) => setAge(e.target.value)} />
                    </label>
                    <label className="ea-field">
                      <span>Sesso</span>
                      <select className="ea-input" value={sex} onChange={(e) => setSex(e.target.value)}>
                        <option value="">Seleziona…</option>
                        <option value="F">Femmina</option>
                        <option value="M">Maschio</option>
                        <option value="other">Altro</option>
                        <option value="na">Preferisco non rispondere</option>
                      </select>
                    </label>
                  </div>
                </div>
              )}

              {step === "questions" && (
                <div className="ea-step">
                  <h2 id="ea-title" className="ea-question">{QUESTIONS[qIndex]}</h2>
                  <textarea className="ea-textarea" placeholder="Scrivi qui la tua risposta…"
                    value={answers[qIndex]}
                    onChange={(e) => {
                      const v = e.target.value;
                      setAnswers((arr) => { const n = [...arr]; n[qIndex] = v; return n; });
                    }}
                    rows={5} maxLength={2000} autoFocus />
                </div>
              )}

              {step === "consent" && (
                <div className="ea-step">
                  <h2 id="ea-title" className="ea-question">Un ultimo passo: il tuo consenso</h2>
                  <p className="ea-help">
                    Le tue risposte sono trattate in modo <strong>completamente anonimo</strong> e usate solo in forma aggregata per migliorare FibroMental. La tua email viene conservata unicamente per inviarti l'accesso in anteprima al portale.
                  </p>
                  <label className="ea-consent">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                    <span>Acconsento a ricevere l'accesso in anteprima a FibroMental e le comunicazioni relative al lancio.</span>
                  </label>
                  <label className="ea-consent">
                    <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
                    <span>Ho letto e accetto la <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> e confermo che le mie risposte saranno trattate in forma anonima.</span>
                  </label>
                  <label className="ea-consent">
                    <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} />
                    <span>Voglio iscrivermi alla newsletter di FibroMental per ricevere contenuti utili sulla fibromialgia.</span>
                  </label>
                </div>
              )}

              {error && <p className="ea-error" role="alert">{error}</p>}

              <div className="ea-actions">
                {step === "intro" && (
                  <>
                    <span />
                    <button type="button" className="ea-btn" onClick={startQuestions}>Inizia il questionario</button>
                  </>
                )}
                {step === "questions" && (
                  <>
                    <button type="button" className="ea-btn-ghost" onClick={prevQuestion}>Indietro</button>
                    <button type="button" className="ea-btn" onClick={nextQuestion}>
                      {qIndex === QUESTIONS.length - 1 ? "Continua" : "Avanti"}
                    </button>
                  </>
                )}
                {step === "consent" && (
                  <>
                    <button type="button" className="ea-btn-ghost" onClick={() => { setStep("questions"); setQIndex(QUESTIONS.length - 1); }} disabled={submitting}>Indietro</button>
                    <button type="button" className="ea-btn" onClick={submit} disabled={submitting}>
                      {submitting ? "Invio…" : "Conferma e ricevi l'app"}
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
