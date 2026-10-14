import { ArrowUpRight, Bot, Globe, LayoutTemplate, Monitor } from "lucide-react";
import { services } from "@/data/content";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";

const icons = { layout: LayoutTemplate, globe: Globe, monitor: Monitor, bot: Bot } as const;

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="relative bg-white/[0.015] py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow">
              <span className="text-accent-light">02</span> · Serviços
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="servicos-title"
              className="mt-5 max-w-xl text-balance text-[2.25rem] font-normal leading-[1.15] tracking-[-0.01em] sm:text-5xl"
            >
              Como posso <span className="text-accent-light">ajudar</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Para empresas, negócios e profissionais que precisam de presença digital, sistemas ou automações.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href="#contato"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-fg"
            >
              Tem um projeto em mente?
              <ArrowUpRight
                size={16}
                className="text-accent-light transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>
        </div>

        <Stagger className="space-y-5" stagger={0.08}>
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <StaggerItem
                as="article"
                key={service.title}
                className="card card-hover group flex gap-5 p-6 sm:gap-6 sm:p-8"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-md bg-accent text-white transition-transform duration-500 group-hover:-rotate-6">
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-medium uppercase tracking-[0.16em] sm:text-xl">{service.title}</h3>
                    <span className="text-sm text-subtle">0{i + 1}</span>
                  </div>
                  <p className="mt-2.5 text-pretty leading-relaxed text-muted">{service.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
