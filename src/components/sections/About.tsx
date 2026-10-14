import { Bot, Code2, Globe, Workflow } from "lucide-react";
import { contactLinks, site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";
import { ProfileCard } from "../ui/ProfileCard";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";

const focusAreas = [
  { label: "Frontend", icon: Code2 },
  { label: "Automação", icon: Workflow },
  { label: "IA", icon: Bot },
  { label: "Desenvolvimento Web", icon: Globe },
];

const socialClass =
  "grid size-11 place-items-center rounded-md border border-line-strong text-fg/80 transition-colors hover:border-accent hover:bg-accent hover:text-white";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative w-full">
          <ProfileCard />
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">
              <span className="text-accent-light">01</span> · Sobre — {site.name}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="sobre-title"
              className="mt-5 text-balance text-[2.1rem] font-normal leading-[1.15] tracking-[-0.01em] sm:text-[2.75rem]"
            >
              Soluções digitais com <span className="text-accent-light">utilidade real.</span>
            </h2>
          </Reveal>

          <div className="mt-7 space-y-5 text-pretty text-base leading-relaxed text-muted sm:text-[1.05rem]">
            <Reveal delay={0.1}>
              <p>
                Sou <span className="text-fg">Rafael Mota</span>, <span className="text-fg">desenvolvedor web</span> no Rio Grande do Sul.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p>
                Crio interfaces modernas e responsivas com <span className="text-fg">HTML</span>,{" "}
                <span className="text-fg">CSS</span> e <span className="text-fg">JavaScript</span>, e desenvolvo
                integrações, automações e agentes de inteligência artificial que transformam processos manuais em
                soluções digitais.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p>
                Trabalho do layout à integração: sites, landing pages, sistemas web e fluxos automatizados pensados
                para o problema de cada projeto.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="border-l-2 border-accent pl-5 text-fg/90">
                Meu foco é construir soluções que tenham utilidade real, boa experiência de usuário e código bem
                estruturado.
              </p>
            </Reveal>
          </div>

          <Stagger as="ul" className="mt-8 flex flex-wrap gap-2" stagger={0.06}>
            {focusAreas.map(({ label, icon: Icon }) => (
              <StaggerItem
                as="li"
                key={label}
                className="inline-flex items-center gap-2 rounded-md border border-line-strong bg-white/[0.03] px-4 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-accent"
              >
                <Icon size={16} className="text-accent-light" strokeWidth={1.75} aria-hidden />
                {label}
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-8 flex gap-2">
            {contactLinks.linkedin && (
              <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialClass}>
                <LinkedinIcon size={16} />
              </a>
            )}
            {contactLinks.github && (
              <a href={contactLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={socialClass}>
                <GithubIcon size={16} />
              </a>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
