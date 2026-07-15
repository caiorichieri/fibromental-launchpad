import { useCallback, useState } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment, hasPaymentsConfigured } from "@/lib/stripe";
import { createCourseCheckout } from "@/lib/payments.functions";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  profession: string;
  consent: boolean;
};

const empty: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  profession: "",
  consent: false,
};

export function CourseSignupForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const paymentsReady = hasPaymentsConfigured();

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const target = e.target as HTMLInputElement;
      const value = target.type === "checkbox" ? target.checked : target.value;
      setForm((f) => ({ ...f, [key]: value as any }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setError("Compila tutti i campi obbligatori.");
      return;
    }
    if (!form.consent) {
      setError("Devi accettare l'informativa sulla privacy per procedere.");
      return;
    }
    if (!paymentsReady) {
      setError("I pagamenti non sono ancora attivi. Riprova a breve o contattaci.");
      return;
    }
    setLoading(true);
    try {
      const returnUrl = `${window.location.origin}/corso/return?session_id={CHECKOUT_SESSION_ID}`;
      const result = await createCourseCheckout({
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          profession: form.profession,
          orderNumber: "",
          returnUrl,
          environment: getStripeEnvironment(),
        },
      });
      if ("error" in result) throw new Error(result.error);
      if (!result.clientSecret) throw new Error("Sessione di pagamento non valida.");
      setClientSecret(result.clientSecret);
      setCheckoutOpen(true);
    } catch (err: any) {
      setError(err?.message ?? "Errore durante l'avvio del pagamento.");
    } finally {
      setLoading(false);
    }
  };

  const fetchClientSecret = useCallback(async () => {
    if (!clientSecret) throw new Error("Sessione non pronta");
    return clientSecret;
  }, [clientSecret]);

  if (checkoutOpen && clientSecret) {
    return (
      <div className="course-signup-card">
        <div style={{ marginBottom: "1rem" }}>
          <button
            type="button"
            onClick={() => {
              setCheckoutOpen(false);
              setClientSecret(null);
            }}
            className="signup-back"
          >
            ← Modifica dati
          </button>
        </div>
        <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    );
  }

  return (
    <form className="course-signup-card" onSubmit={onSubmit}>
      <div className="signup-price">
        <div>
          <span className="signup-price-label">Corso Clinico FibroMental</span>
          <span className="signup-price-sub">Riservato a professionisti</span>
        </div>
        <div className="signup-price-amount">€ 80,00</div>
      </div>

      <div className="signup-grid">
        <label className="signup-field">
          <span>Nome *</span>
          <input type="text" required value={form.firstName} onChange={onChange("firstName")} autoComplete="given-name" />
        </label>
        <label className="signup-field">
          <span>Cognome *</span>
          <input type="text" required value={form.lastName} onChange={onChange("lastName")} autoComplete="family-name" />
        </label>
        <label className="signup-field signup-field-wide">
          <span>Email *</span>
          <input type="email" required value={form.email} onChange={onChange("email")} autoComplete="email" />
        </label>
        <label className="signup-field">
          <span>Professione</span>
          <select value={form.profession} onChange={onChange("profession")}>
            <option value="">Seleziona…</option>
            <option value="Psicologo/a">Psicologo/a</option>
            <option value="Psicoterapeuta">Psicoterapeuta</option>
            <option value="Specializzando/a">Specializzando/a</option>
            <option value="Altro">Altro professionista</option>
          </select>
        </label>
      </div>

      <label className="signup-consent">
        <input type="checkbox" checked={form.consent} onChange={onChange("consent")} />
        <span>
          Ho letto e accetto l'informativa sulla privacy e acconsento al trattamento dei dati per la gestione
          dell'iscrizione al corso.
        </span>
      </label>

      {error ? <div className="signup-error">{error}</div> : null}

      <button type="submit" className="signup-submit" disabled={loading}>
        {loading ? "Attendere…" : "Procedi al pagamento sicuro"} <span className="arrow">→</span>
      </button>
      <p className="signup-note">
        Pagamento sicuro con carta. Riceverai email di conferma con i dettagli del corso.
      </p>
    </form>
  );
}