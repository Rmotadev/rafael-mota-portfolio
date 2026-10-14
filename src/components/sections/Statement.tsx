"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { FloatingCode } from "../fx/FloatingCode";
import { Reveal } from "../ui/Reveal";

const sentence = "Não quero apenas escrever código. Quero criar soluções que façam sentido.";
const emphasis = new Set(["soluções", "sentido."]);

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = sentence.split(" ");

  return (
    <section aria-label="Manifesto" className="relative overflow-hidden py-28 sm:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" />
        <div data-parallax="0.4" className="absolute left-1/2 top-1/2 h-72 w-[48rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.05] blur-[100px]" />
      </div>
      <FloatingCode
        snippets={[
          { key: "if ", rest: "(problema) resolver();", pos: "right-[3%] top-[12%]", depth: 0.5 },
          { key: "return ", rest: "<Solucao />;", pos: "bottom-[10%] right-[8%]", depth: 0.8 },
          { key: "// ", rest: "código com propósito", pos: "bottom-[14%] left-[3%]", depth: 0.35 },
        ]}
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-accent" />
              Manifesto
            </p>
          </Reveal>
          <div ref={ref}>
            <p className="mt-8 text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              <span className="sr-only">{sentence}</span>
              <span aria-hidden>
                {words.map((word, i) => (
                  <Word
                    key={i}
                    progress={scrollYProgress}
                    range={[i / words.length, (i + 1) / words.length]}
                    serif={emphasis.has(word)}
                  >
                    {word}
                  </Word>
                ))}
              </span>
            </p>
          </div>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              Cada projeto é pensado para resolver um problema real, com clareza, função e cuidado nos detalhes.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  serif,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  serif?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span
        style={{ opacity }}
        className={serif ? "text-accent-light" : undefined}
      >
        {children}
      </motion.span>{" "}
    </>
  );
}
