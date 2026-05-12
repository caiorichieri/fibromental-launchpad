import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".fade-in"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }
    // Reveal anything already in (or near) the viewport immediately so SSR
    // content is never stuck invisible on mobile / slow connections.
    const vh = window.innerHeight || 800;
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < vh * 1.1) item.classList.add("visible");
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    window.setTimeout(() => {
      document.querySelectorAll(".hero .fade-in").forEach((item) => item.classList.add("visible"));
    }, 100);
    // Safety net: if anything is still hidden after 2.5s, force-reveal it.
    const safety = window.setTimeout(() => {
      document.querySelectorAll(".fade-in").forEach((item) => item.classList.add("visible"));
    }, 2500);
    return () => { observer.disconnect(); window.clearTimeout(safety); };
  }, []);

  return null;
}
