"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

/**
 * Luz azul suave que segue o cursor + "spotlight" nos cards (.card).
 * Só ativa em dispositivos com mouse e sem preferência por movimento reduzido.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    gsap.set(glow, { xPercent: -50, yPercent: -50, opacity: 0 });
    const xTo = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3" });
    let visible = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      xTo(e.clientX);
      yTo(e.clientY);
      if (!visible) {
        visible = true;
        gsap.to(glow, { opacity: 1, duration: 0.6 });
      }

      // Spotlight nos cards: posição do cursor relativa ao card
      const card = e.target instanceof Element ? e.target.closest<HTMLElement>(".card") : null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    const onLeave = () => {
      visible = false;
      gsap.to(glow, { opacity: 0, duration: 0.4 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] size-[34rem] rounded-full opacity-0 mix-blend-screen [background:radial-gradient(circle,rgb(47_92_255/0.14),transparent_62%)]"
    />
  );
}
