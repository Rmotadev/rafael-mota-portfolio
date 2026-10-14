"use client";

import { ArrowUpRight, FileText, Plus, X } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects, type Project, type ProjectFilter } from "@/data/projects";
import { filled } from "@/data/site";
import { cn } from "@/lib/cn";
import { ProjectVisualArt } from "../visuals/ProjectVisuals";
import { GithubIcon } from "../ui/BrandIcons";
import { buttonClasses } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

type FilterId = "todos" | ProjectFilter;

const filters: { id: FilterId; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "automacao-ia", label: "Automação & IA" },
  { id: "frontend", label: "Frontend" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<FilterId>("todos");
  const visible = projects.filter((p) => filter === "todos" || p.filter === filter);
  const featured = visible.filter((p) => p.featured);
  const others = visible.filter((p) => !p.featured);
  const indexOf = (p: Project) => projects.indexOf(p);

  return (
    <section id="portfolio" aria-labelledby="projetos-title" className="relative bg-white/[0.015] py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Portfólio"
          title={
            <span id="projetos-title">
              Projetos <span className="text-accent-light">selecionados</span>
            </span>
          }
          description="Projetos onde transformo tecnologia e ideias em soluções reais."
        />

        <Reveal className="mt-10">
          <div role="group" aria-label="Filtrar projetos" className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const count = f.id === "todos" ? projects.length : projects.filter((p) => p.filter === f.id).length;
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={active}
                  className={cn(
                    "relative isolate inline-flex min-h-11 items-center gap-2 rounded-md border px-5 text-sm font-medium transition-colors duration-300",
                    active ? "border-accent text-white" : "border-line-strong text-muted hover:border-white/25 hover:text-fg",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-[5px] bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {f.label}
                  <span className={cn("text-xs", active ? "text-white/70" : "text-subtle")}>
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 space-y-5 sm:space-y-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {featured.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <FeaturedCard project={project} index={indexOf(project)} reverse={i % 2 === 1} onDetails={setSelected} />
              </motion.div>
            ))}
          </AnimatePresence>

          {others.length > 0 && (
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {others.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                  >
                    <CompactCard project={project} index={indexOf(project)} onDetails={setSelected} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

const num = (i: number) => String(i + 1).padStart(2, "0");

function Media({
  project,
  className,
  sizes,
  onClick,
}: {
  project: Project;
  className?: string;
  sizes: string;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      {...(onClick
        ? {
            type: "button" as const,
            onClick,
            "aria-haspopup": "dialog" as const,
            "aria-label": `Abrir detalhes do projeto ${project.name}`,
            "data-cursor-label": "Detalhes",
          }
        : {})}
      className={cn("relative block w-full overflow-hidden bg-ink-2 text-left", className)}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={`Prévia do projeto ${project.name}`}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <ProjectVisualArt type={project.visual} />
        </div>
      )}
    </Comp>
  );
}

function ProjectActions({
  project,
  onDetails,
  compact,
}: {
  project: Project;
  onDetails: (p: Project) => void;
  compact?: boolean;
}) {
  const demo = filled(project.links.demo);
  const github = filled(project.links.github);
  const viewHref = demo ?? github;
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {viewHref && (
        <a
          href={viewHref}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("primary", "md")}
          aria-label={`Ver projeto ${project.name}`}
        >
          Ver projeto <ArrowUpRight size={16} />
        </a>
      )}
      <button
        type="button"
        onClick={() => onDetails(project)}
        className={buttonClasses(viewHref ? "secondary" : compact ? "secondary" : "primary", "md")}
        aria-haspopup="dialog"
        aria-label={`Detalhes do projeto ${project.name}`}
      >
        Detalhes <Plus size={16} className="transition-transform duration-300 group-hover/btn:rotate-90" />
      </button>
    </div>
  );
}

function FeaturedCard({
  project,
  index,
  reverse,
  onDetails,
}: {
  project: Project;
  index: number;
  reverse?: boolean;
  onDetails: (p: Project) => void;
}) {
  return (
    <article className="card group grid overflow-hidden lg:grid-cols-2">
      <Media
        project={project}
        sizes="(min-width: 1024px) 50vw, 100vw"
        onClick={() => onDetails(project)}
        className={cn(
          "aspect-[5/4] border-b border-line sm:aspect-[16/10] lg:aspect-auto lg:min-h-[30rem] lg:border-b-0",
          reverse ? "lg:order-2 lg:border-l" : "lg:border-r",
        )}
      />
      <div className="relative flex flex-col p-6 sm:p-10">
        <span
          aria-hidden
          className="pointer-events-none absolute right-5 top-2 select-none font-mono text-[5.5rem] font-semibold leading-none tracking-tighter text-white/[0.04] sm:right-8 sm:text-[8rem]"
        >
          {num(index)}
        </span>
        <p className="eyebrow">
          <span className="text-accent-light">{num(index)}</span> — {project.category}
        </p>
        <h3 className="mt-4 text-balance text-2xl font-semibold tracking-[-0.03em] sm:text-[2.1rem] sm:leading-tight">
          {project.name}
        </h3>
        <p className="mt-4 text-pretty leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2.5 text-sm text-fg/85">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <ProjectActions project={project} onDetails={onDetails} />
        </div>
      </div>
    </article>
  );
}

function CompactCard({
  project,
  index,
  onDetails,
}: {
  project: Project;
  index: number;
  onDetails: (p: Project) => void;
}) {
  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Media
        project={project}
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        onClick={() => onDetails(project)}
        className="aspect-[16/10] border-b border-line"
      />
      <div className="relative flex flex-1 flex-col p-6">
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1 select-none font-mono text-6xl font-semibold leading-none tracking-tighter text-white/[0.04]"
        >
          {num(index)}
        </span>
        <p className="eyebrow">
          <span className="text-accent-light">{num(index)}</span> — {project.category}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tecnologias">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] text-muted">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <ProjectActions project={project} onDetails={onDetails} compact />
        </div>
      </div>
    </article>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  const index = project ? projects.findIndex((p) => p.slug === project.slug) : 0;
  const demo = filled(project?.links.demo);
  const github = filled(project?.links.github);
  const caseStudy = filled(project?.links.caseStudy);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="project-dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-3xl border border-line-strong bg-surface p-0 text-fg backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-[dialog-in_0.4s_cubic-bezier(0.16,1,0.3,1)]"
    >
      {project && (
        <div className="max-h-[85svh] overflow-y-auto">
          <Media project={project} sizes="672px" className="aspect-[16/9] border-b border-line" />
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">
                  <span className="text-accent-light">{num(index)}</span> — {project.category}
                </p>
                <h3 id="project-dialog-title" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {project.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar detalhes"
                className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:text-fg"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-5 text-pretty leading-relaxed text-muted">{project.description}</p>

            <div className="mt-7 grid gap-7 sm:grid-cols-2">
              <div>
                <h4 className="eyebrow">Destaques</h4>
                <ul className="mt-3 space-y-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-sm">
                      <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="eyebrow">Stack</h4>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <li key={s} className="rounded-full border border-line-strong px-3 py-1 text-sm text-fg/85">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {(demo || github || caseStudy) && (
              <div className="mt-8 flex flex-wrap gap-2.5 border-t border-line pt-6">
                {demo && (
                  <a href={demo} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary")}>
                    Ver demo <ArrowUpRight size={16} />
                  </a>
                )}
                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer" className={buttonClasses("secondary")}>
                    <GithubIcon size={16} /> Código
                  </a>
                )}
                {caseStudy && (
                  <a href={caseStudy} target="_blank" rel="noopener noreferrer" className={buttonClasses("secondary")}>
                    <FileText size={16} /> Case study
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
