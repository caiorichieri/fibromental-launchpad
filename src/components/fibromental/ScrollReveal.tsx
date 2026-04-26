import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".fade-in"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }
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
    return () => observer.disconnect();
  }, []);

  return null;
}
