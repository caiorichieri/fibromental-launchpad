import { useEffect, useState } from "react";
import fibroLogo from "../../assets/fibromental-logo-transparent.png";

const STORAGE_KEY = "fibromental_welcome_12mag_v1";

export function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function close() {
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="ea-gate" role="dialog" aria-modal="true" aria-labelledby="wp-title" onClick={close}>
      <div className="ea-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
        <div className="ea-welcome">
          <img src={fibroLogo} alt="FibroMental" className="ea-welcome-logo" />
          <h2 id="wp-title" className="ea-welcome-title">Ti Crediamo</h2>
          <p className="ea-welcome-date">12 maggio<br /><span>Giornata mondiale per la Fibromialgia</span></p>
          <button type="button" className="ea-btn" onClick={close}>Continua</button>
        </div>
      </div>
    </div>
  );
}
