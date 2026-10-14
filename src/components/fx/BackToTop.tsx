"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

const R = 22;
const CIRC = 2 * Math.PI * R;

/**
 * Botão fixo na lateral direita para voltar ao topo.
 * Aparece após rolar um pouco e mostra o progresso da página num anel azul.
 */
export function BackToTop() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    const btn = btnRef.current;
    const ring = ringRef.current;
    if (!btn || !ring) return;

    gsap.set(btn, { autoAlpha: 0, y: 16, scale: 0.85 });
    gsap.set(ring, { strokeDasharray: CIRC, strokeDashoffset: CIRC });

    // Anel de progresso
    gsap.to(ring, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
    });

    // Mostrar / esconder depois de 600px
    ScrollTrigger.create({
      start: 600,
      end: "max",
      onToggle: (self) =>
        gsap.to(btn, {
          autoAlpha: self.isActive ? 1 : 0,
          y: self.isActive ? 0 : 16,
          scale: self.isActive ? 1 : 0.85,
          duration: 0.4,
          ease: self.isActive ? "back.out(2)" : "power2.in",
          overwrite: "auto",
        }),
    });
  });

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      window.scrollTo({ top: 0 });
    } else {
      // O scroll-behavior: smooth do CSS brigaria com a animação do GSAP
      const root = document.documentElement;
      root.style.scrollBehavior = "auto";
      gsap.to(window, {
        scrollTo: 0,
        duration: 1.1,
        ease: "power3.inOut",
        onComplete: () => root.style.removeProperty("scroll-behavior"),
      });
    }
    document.getElementById("inicio")?.focus({ preventScroll: true });
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={toTop}
      aria-label="Voltar ao topo"
      className="group invisible fixed bottom-5 right-4 z-[80] grid size-14 place-items-center rounded-full border border-line-strong bg-ink/80 text-fg shadow-[0_10px_30px_-10px_rgba(47,92,255,0.6)] backdrop-blur-md transition-colors duration-300 hover:border-accent hover:bg-accent sm:bottom-8 sm:right-6"
    >
      <svg aria-hidden viewBox="0 0 56 56" className="absolute inset-0 size-full -rotate-90">
        <circle cx="28" cy="28" r={R} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="2" />
        <circle
          ref={ringRef}
          cx="28"
          cy="28"
          r={R}
          fill="none"
          stroke="url(#btt-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="btt-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2f5cff" />
            <stop offset="100%" stopColor="#7b98ff" />
          </linearGradient>
        </defs>
      </svg>
      <ArrowUp
        size={18}
        className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-white"
      />
    </button>
  );
}
