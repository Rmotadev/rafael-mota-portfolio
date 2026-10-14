"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { contactLinks, navItems, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Destaca o item de navegação da seção visível
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Trava o scroll do body com o menu mobile aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-b border-line bg-ink/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent",
        )}
      >
        <nav aria-label="Principal" className="container-x flex h-16 items-center justify-between sm:h-[4.5rem]">
          <a
            href="#inicio"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-2.5"
            aria-label={`${site.name} — voltar ao início`}
          >
            <span className="text-[1.85rem] font-medium leading-none tracking-[-0.02em]">
              rafael<span className="text-accent-light transition-colors group-hover:text-white">.</span>
            </span>
          </a>

          <ul className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "true" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300",
                    active === item.href ? "text-fg" : "text-fg/70 hover:text-fg",
                  )}
                >
                  {active === item.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-x-3 -bottom-1 h-0.5 bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contato"
              className="group hidden min-h-11 items-center gap-1.5 rounded-md bg-accent px-5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#2550f0] active:scale-[0.97] sm:inline-flex"
            >
              Vamos conversar
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid size-11 place-items-center rounded-full border border-line-strong bg-white/[0.03] transition-colors hover:bg-white/[0.07] lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-ink/95 backdrop-blur-2xl sm:top-[4.5rem] lg:hidden"
          >
            <div aria-hidden className="bg-grid mask-fade-radial pointer-events-none absolute inset-0 opacity-50" />
            <div className="container-x relative flex min-h-full flex-col pb-10 pt-6">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.04 * i }}
                    className="border-b border-line"
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 text-[1.75rem] font-medium tracking-tight"
                    >
                      <span className={active === item.href ? "text-fg" : "text-fg/70"}>{item.label}</span>
                      <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
                className="mt-auto pt-10"
              >
                <a
                  href="#contato"
                  onClick={() => setOpen(false)}
                  className="flex min-h-13 w-full items-center justify-center gap-2 rounded-md bg-accent py-3.5 font-medium text-white"
                >
                  Vamos conversar <ArrowUpRight size={18} />
                </a>
                <div className="mt-5 flex items-center justify-center gap-3">
                  {contactLinks.linkedin && (
                    <a
                      href={contactLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="grid size-12 place-items-center rounded-full border border-line-strong text-muted hover:text-fg"
                    >
                      <LinkedinIcon />
                    </a>
                  )}
                  {contactLinks.github && (
                    <a
                      href={contactLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="grid size-12 place-items-center rounded-full border border-line-strong text-muted hover:text-fg"
                    >
                      <GithubIcon />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
