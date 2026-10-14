"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { BackToTop } from "./BackToTop";
import { CursorGlow } from "./CursorGlow";
import { CustomCursor } from "./CustomCursor";
import { ParticleField } from "./ParticleField";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Camada global de efeitos:
 * - partículas + luz do cursor,
 * - barra de progresso de rolagem,
 * - parallax em qualquer elemento com data-parallax="velocidade" (ex.: 0.15).
 */
export function FxLayer() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
    });

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.15;
        gsap.fromTo(
          el,
          { y: () => window.innerHeight * speed * 0.5 },
          {
            y: () => -window.innerHeight * speed * 0.5,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
          },
        );
      });
    });
    return () => mm.revert();
  });

  return (
    <>
      <ParticleField />
      <CursorGlow />
      <CustomCursor />
      <BackToTop />
      <div
        ref={barRef}
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-light"
      />
    </>
  );
}
