"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const INTERACTIVE = 'a, button, [role="button"], summary, label, select';

/**
 * Cursor personalizado no estilo do site:
 * - ponto azul que segue o mouse de imediato,
 * - anel que acompanha com atraso suave,
 * - em links/botões o anel cresce e ganha preenchimento azul,
 * - em elementos com data-cursor-label="Texto" o anel vira uma bolha com o texto.
 * Só ativa com mouse e sem preferência por movimento reduzido; caso contrário, o cursor nativo permanece.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!media.matches) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    type State = "default" | "link" | "label";
    let state: State = "default";
    let visible = false;

    const apply = (next: State, text = "") => {
      if (next === state && (next !== "label" || label.textContent === text)) return;
      state = next;
      const base = { duration: 0.35, ease: "power3.out", overwrite: "auto" as const };
      if (next === "link") {
        gsap.to(ring, { ...base, width: 58, height: 58, backgroundColor: "rgba(47, 92, 255, 0.16)", borderColor: "rgba(123, 152, 255, 0.9)" });
        gsap.to(dot, { ...base, scale: 0 });
        gsap.to(label, { ...base, opacity: 0 });
      } else if (next === "label") {
        label.textContent = text;
        gsap.to(ring, { ...base, width: 88, height: 88, backgroundColor: "rgba(47, 92, 255, 0.95)", borderColor: "rgba(47, 92, 255, 0)" });
        gsap.to(dot, { ...base, scale: 0 });
        gsap.to(label, { ...base, opacity: 1, delay: 0.05 });
      } else {
        gsap.to(ring, { ...base, width: 36, height: 36, backgroundColor: "rgba(47, 92, 255, 0)", borderColor: "rgba(123, 152, 255, 0.6)" });
        gsap.to(dot, { ...base, scale: 1 });
        gsap.to(label, { ...base, opacity: 0 });
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      if (!visible) {
        visible = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }

      last.x = e.clientX;
      last.y = e.clientY;
      updateState(e.target instanceof Element ? e.target : null);
    };

    const last = { x: -1, y: -1 };
    const updateState = (target: Element | null) => {
      const labelled = target?.closest<HTMLElement>("[data-cursor-label]");
      if (labelled) return apply("label", labelled.dataset.cursorLabel ?? "");
      if (target?.closest(INTERACTIVE)) return apply("link");
      apply("default");
    };
    // Ao rolar sem mover o mouse, o elemento sob o cursor muda: reavalia o estado.
    const onScroll = () => {
      if (visible && last.x >= 0) updateState(document.elementFromPoint(last.x, last.y));
    };

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.15, ease: "power2.out" });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      root.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] grid size-9 place-items-center rounded-full border border-accent-light/60 opacity-0"
      >
        <span
          ref={labelRef}
          className="whitespace-nowrap text-[0.7rem] font-medium uppercase tracking-[0.14em] text-white opacity-0"
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] size-1.5 rounded-full bg-accent-light opacity-0 shadow-[0_0_12px_rgb(123_152_255/0.9)]"
      />
    </>
  );
}
