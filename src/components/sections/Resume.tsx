import {
  ArrowUpRight,
  Briefcase,
  Calendar,
  Code2,
  Compass,
  GraduationCap,
  Layers,
  Lightbulb,
  MapPin,
  Rocket,
  Search,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { journey, skillGroups, workProcess } from "@/data/content";
import { contactLinks } from "@/data/site";
import { cn } from "@/lib/cn";
import { LinkedinIcon } from "../ui/BrandIcons";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const journeyIcons = [Briefcase, GraduationCap];
const processIcons = [Search, Lightbulb, Code2, Rocket];
const skillIcons = { frontend: Code2, ferramentas: Wrench, desenvolvimento: Layers, ia: Compass } as const;

function ColumnTitle({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <Reveal>
      <h3 className="flex items-center gap-3 text-xl font-medium tracking-tight sm:text-2xl">
        <span className="grid size-10 place-items-center rounded-md bg-accent text-white">
          <Icon size={18} strokeWidth={1.75} />
        </span>
        {children}
      </h3>
    </Reveal>
  );
}

export function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="Resume"
          title={
            <span id="resume-title">
              Minha <span className="text-accent-light">trajetória</span>
            </span>
          }
          description="Experiência, processo de trabalho e as tecnologias que uso para criar soluções."
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-12">
          {/* Experiência & Formação */}
          <div id="experiencia">
            <ColumnTitle icon={Briefcase}>Experiência &amp; Formação</ColumnTitle>
            <ol className="relative mt-8">
              <span
                aria-hidden
                className="absolute bottom-6 left-[0.3125rem] top-6 w-px bg-gradient-to-b from-accent via-line-strong to-transparent"
              />
              {journey.map((item, i) => {
                const MetaIcon = item.metaType === "location" ? MapPin : Calendar;
                const Icon = journeyIcons[i % journeyIcons.length];
                return (
                  <Reveal as="li" key={item.title} delay={i * 0.08} className="relative pb-5 pl-8 last:pb-0">
                    <span aria-hidden className="absolute left-0 top-7 size-[0.6875rem] rounded-full border-2 border-accent bg-ink" />
                    <article className="card card-hover p-5 sm:p-7">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-soft px-3 py-1 text-xs font-medium text-accent-light">
                        <MetaIcon size={12} /> {item.meta}
                      </span>
                      <h4 className="mt-4 flex items-center gap-2 text-xl font-medium tracking-tight">
                        <Icon size={17} className="text-subtle" aria-hidden />
                        {item.title}
                      </h4>
                      <p className="mt-1 text-fg/80">{item.subtitle}</p>
                      <p className="mt-3 text-pretty leading-relaxed text-muted">{item.description}</p>
                      {item.tags.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Destaques">
                          {item.tags.map((t) => (
                            <li key={t} className="rounded-md border border-line bg-white/[0.02] px-3 py-1 text-xs text-fg/80">
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </Reveal>
                );
              })}
            </ol>
          </div>

          {/* Como eu trabalho */}
          <div id="processo">
            <ColumnTitle icon={Lightbulb}>Como eu trabalho</ColumnTitle>
            <Stagger as="ol" className="mt-8 overflow-hidden rounded-xl border border-line" stagger={0.06}>
              {workProcess.map((step, i) => {
                const Icon = processIcons[i];
                return (
                  <StaggerItem
                    as="li"
                    key={step.title}
                    className={cn(
                      "group flex gap-4 bg-white/[0.015] p-5 transition-colors duration-300 hover:bg-white/[0.04] sm:p-6",
                      i > 0 && "border-t border-line",
                    )}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-white/[0.03] text-accent-light transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h4 className="font-medium">{step.title}</h4>
                        <span className="text-sm text-subtle">0{i + 1}</span>
                      </div>
                      <p className="mt-1 text-pretty text-sm leading-relaxed text-muted">{step.description}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
            {contactLinks.linkedin && (
              <Reveal>
                <a
                  href={contactLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  <LinkedinIcon size={16} /> Ver perfil no LinkedIn
                  <ArrowUpRight
                    size={16}
                    className="text-accent-light transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </Reveal>
            )}
          </div>
        </div>

        {/* Skills */}
        <div id="skills" className="mt-20 sm:mt-24">
          <ColumnTitle icon={Code2}>Tecnologias &amp; Skills</ColumnTitle>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
            {skillGroups.map((group) => {
              const Icon = skillIcons[group.id];
              return (
                <StaggerItem
                  key={group.id}
                  as="article"
                  className="card card-hover group relative overflow-hidden p-6"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-accent/[0.12] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  />
                  <span className="grid size-10 place-items-center rounded-md border border-line bg-white/[0.03] text-accent-light">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <h4 className="mt-5 text-lg font-medium tracking-tight">{group.label}</h4>
                  <p className="mt-1.5 text-sm text-muted">{group.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border px-3 py-1 text-[0.8rem] transition-colors duration-300 border-line-strong bg-white/[0.03] text-fg/90 hover:border-accent hover:text-accent-light"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
