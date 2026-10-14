"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { contactLinks } from "@/data/site";
import { FloatingCode } from "../fx/FloatingCode";
import { Magnetic } from "../fx/Magnetic";
import { BackgroundWords } from "../ui/BackgroundWords";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { ButtonLink } from "../ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

const headline: { text: string; serif?: boolean }[] = [
  { text: "Transformo" },
  { text: "ideias" },
  { text: "em" },
  { text: "experiências", serif: true },
  { text: "digitais.", serif: true },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

export function Hero() {
  return (
    <section
      id="inicio"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 outline-none sm:pt-32"
    >
      {/* Fundo: grid + glow + palavras */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-radial absolute inset-0" />
        <div className="animate-drift absolute -top-40 right-[-10%] h-[38rem] w-[38rem] rounded-full bg-accent/[0.14] blur-[130px]" />
        <div className="absolute bottom-0 left-[-10%] h-[24rem] w-[24rem] rounded-full bg-accent/[0.06] blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>
      <BackgroundWords
        className="-z-10"
        words={[
          { text: "HTML", className: "left-[6%] top-[20%] text-sm" },
          { text: "API", className: "left-[44%] top-[13%] text-xs hidden md:block" },
          { text: "JavaScript", className: "left-[40%] bottom-[12%] text-sm hidden lg:block" },
          { text: "AI", className: "left-[4%] bottom-[16%] text-sm hidden sm:block" },
        ]}
      />
      <FloatingCode
        className="-z-10"
        snippets={[
          { key: "const ", rest: "ideia = () => solução;", pos: "left-[48%] top-[12%]", depth: 0.4 },
          { key: "if ", rest: "(pago) confirmar();", pos: "bottom-[16%] left-[52%]", depth: 0.6 },
          { key: "await ", rest: "fetch('/api/whatsapp')", pos: "right-[7%] top-[46%]", depth: 0.75 },
          { key: "agent", rest: ".run({ memory: true })", pos: "right-[3%] top-[11%]", depth: 0.3 },
          { key: "npm ", rest: "run build ✓", pos: "bottom-[7%] right-[5%]", depth: 0.55 },
          { key: "<section ", rest: 'className="hero">', pos: "left-[2%] top-[13%] hidden xl:block", depth: 0.25 },
        ]}
      />

      <div className="container-x">
        <div className="max-w-5xl">
          <motion.div {...fadeUp(0.05)}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-fg/90">
              Olá, eu sou o Rafael <span aria-hidden>👋</span>
            </span>
          </motion.div>

          <h1
            id="hero-title"
            className="mt-7 max-w-[15ch] text-balance text-[2.9rem] font-medium leading-[1] tracking-[-0.035em] sm:text-7xl lg:text-[6rem] xl:text-[6.75rem]"
          >
            {headline.map((word, i) => (
              <span key={word.text} className="inline-block overflow-hidden pb-[0.1em] align-top">
                <motion.span
                  className={
                    word.serif
                      ? "inline-block font-serif text-[1.1em] font-normal italic tracking-[-0.01em] text-accent-light"
                      : "inline-block"
                  }
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: EASE, delay: 0.15 + i * 0.07 }}
                >
                  {word.text}
                </motion.span>
                {i < headline.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </h1>

          <motion.p
            {...fadeUp(0.55)}
            className="mt-8 flex items-start gap-3 text-lg font-medium leading-snug sm:text-xl"
          >
            <span aria-hidden className="mt-[0.65em] h-px w-6 shrink-0 bg-accent sm:w-10" />
            <span>
              Desenvolvedor Web <span className="text-muted">— sites, sistemas e automações com IA.</span>
            </span>
          </motion.p>

          <motion.p {...fadeUp(0.65)} className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Crio interfaces modernas, responsivas e funcionais, e soluções digitais que resolvem problemas reais — do
            layout à integração.
          </motion.p>

          <motion.div {...fadeUp(0.75)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <ButtonLink className="w-full sm:w-auto" href="#portfolio" size="lg">
                Ver meus projetos
                <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </ButtonLink>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <ButtonLink className="w-full sm:w-auto" href="#contato" size="lg" variant="secondary">
                Falar comigo
              </ButtonLink>
            </Magnetic>
          </motion.div>

          <motion.div {...fadeUp(0.85)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            {contactLinks.linkedin && (
              <a
                href={contactLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
              >
                <LinkedinIcon size={16} /> LinkedIn
              </a>
            )}
            {contactLinks.github && (
              <a
                href={contactLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
              >
                <GithubIcon size={16} /> GitHub
              </a>
            )}
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#sobre"
        aria-label="Rolar para a seção Sobre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-subtle transition-colors hover:text-fg lg:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown size={14} className="animate-float-slow" />
      </motion.a>
    </section>
  );
}
