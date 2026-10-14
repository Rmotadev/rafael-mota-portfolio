"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { cn } from "@/lib/cn";

export type Snippet = {
  /** Primeira parte destacada em azul (palavra-chave). */
  key: string;
  rest: string;
  /** Posição em classes Tailwind (top/left/right/bottom). */
  pos: string;
  /** Profundidade do parallax: 0.2 (fundo) a 1 (frente). */
  depth: number;
};

/**
 * Trechos de código flutuando. Cada um:
 * - flutua sozinho (GSAP yoyo),
 * - acompanha o cursor com parallax conforme a profundidade,
 * - acende quando o cursor se aproxima.
 * Desativado em telas pequenas, toque e movimento reduzido.
 */
export function FloatingCode({ snippets, className }: { snippets: Snippet[]; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-snippet]", el);

        // Entrada + flutuação contínua
        gsap.from(items, { opacity: 0, y: 30, duration: 1.2, stagger: 0.12, ease: "power3.out", delay: 0.8 });
        items.forEach((item) => {
          const chip = item.querySelector<HTMLElement>("[data-chip]");
          gsap.to(chip, {
            y: gsap.utils.random(-18, 18),
            x: gsap.utils.random(-10, 10),
            rotation: gsap.utils.random(-4, 4),
            duration: gsap.utils.random(4, 7),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

        // Parallax + proximidade do cursor
        const movers = items.map((item) => ({
          item,
          depth: Number(item.dataset.depth ?? 0.5),
          xTo: gsap.quickTo(item, "x", { duration: 1, ease: "power3" }),
          yTo: gsap.quickTo(item, "y", { duration: 1, ease: "power3" }),
          glow: gsap.quickTo(item, "--glow", { duration: 0.4, ease: "power2" }),
        }));

        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          for (const m of movers) {
            m.xTo(-nx * 60 * m.depth);
            m.yTo(-ny * 40 * m.depth);
            const r = m.item.getBoundingClientRect();
            const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
            m.glow(gsap.utils.clamp(0, 1, 1 - d / 260));
          }
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className={cn("pointer-events-none absolute inset-0 hidden md:block", className)}>
      {snippets.map((s) => (
        <div
          key={s.key + s.rest}
          data-snippet
          data-depth={s.depth}
          className={cn("absolute [--glow:0]", s.pos)}
          style={{ opacity: 0.55 + s.depth * 0.35 }}
        >
          <div
            data-chip
            className="whitespace-nowrap rounded-lg border px-3 py-1.5 font-mono text-[0.72rem] backdrop-blur-sm transition-none"
            style={{
              borderColor: "rgb(123 152 255 / calc(0.12 + var(--glow) * 0.5))",
              background: "rgb(15 15 17 / calc(0.45 + var(--glow) * 0.3))",
              boxShadow: "0 0 calc(var(--glow) * 32px) rgb(47 92 255 / calc(var(--glow) * 0.55))",
              color: "rgb(237 237 235 / calc(0.55 + var(--glow) * 0.45))",
              transform: `scale(${0.85 + s.depth * 0.2})`,
            }}
          >
            <span className="text-accent-light">{s.key}</span>
            {s.rest}
          </div>
        </div>
      ))}
    </div>
  );
}
