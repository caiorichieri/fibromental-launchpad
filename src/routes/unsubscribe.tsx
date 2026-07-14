import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/unsubscribe")({
  component: UnsubscribePage,
});

function UnsubscribePage() {
  const [status, setStatus] = useState<"loading" | "ready" | "already" | "invalid" | "done" | "error">("loading");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token");
    setToken(t);
    if (!t) {
      setStatus("invalid");
      return;
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(t)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.valid) setStatus("ready");
        else if (d.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      })
      .catch(() => setStatus("error"));
  }, []);

  const confirm = async () => {
    if (!token) return;
    setStatus("loading");
    try {
      const r = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const d = await r.json();
      if (d.success) setStatus("done");
      else if (d.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center bg-card border border-border rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-foreground mb-3">FibroMental</h1>
        {status === "loading" && <p className="text-muted-foreground">Attendere…</p>}
        {status === "invalid" && (
          <p className="text-muted-foreground">Link non valido o scaduto.</p>
        )}
        {status === "error" && (
          <p className="text-destructive">Si è verificato un errore. Riprova più tardi.</p>
        )}
        {status === "already" && (
          <p className="text-muted-foreground">Sei già stato disiscritto dalle nostre email.</p>
        )}
        {status === "ready" && (
          <>
            <p className="text-muted-foreground mb-6">
              Confermi di non voler più ricevere email da FibroMental?
            </p>
            <button
              onClick={confirm}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Conferma disiscrizione
            </button>
          </>
        )}
        {status === "done" && (
          <p className="text-foreground">Disiscrizione completata. Non riceverai più le nostre email.</p>
        )}
      </div>
    </div>
  );
}