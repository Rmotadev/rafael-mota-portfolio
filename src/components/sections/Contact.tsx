import { ArrowUpRight, Mail } from "lucide-react";
import { contactLinks, primaryContactHref, site } from "@/data/site";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "../ui/BrandIcons";
import { FloatingCode } from "../fx/FloatingCode";
import { Magnetic } from "../fx/Magnetic";
import { ButtonLink } from "../ui/Button";
import { Reveal, Stagger, StaggerItem } from "../ui/Reveal";

const channels = [
  { label: "WhatsApp", value: "(51) 98275-9010", href: contactLinks.whatsapp, icon: WhatsappIcon },
  { label: "E-mail", value: site.links.email, href: contactLinks.email, icon: Mail },
  { label: "LinkedIn", value: "in/rafaelfmota", href: contactLinks.linkedin, icon: LinkedinIcon },
  { label: "GitHub", value: "@Rmotadev", href: contactLinks.github, icon: GithubIcon },
].filter((c): c is typeof c & { href: string } => Boolean(c.href));

export function Contact() {
  const primaryIsExternal = primaryContactHref.startsWith("http");
  return (
    <section id="contato" aria-labelledby="contato-title" className="relative px-3 py-16 sm:px-6 sm:py-24">
      <div className="relative isolate mx-auto max-w-[80rem] overflow-hidden rounded-[2rem] border border-line bg-surface px-5 py-20 sm:px-10 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid mask-fade-radial absolute inset-0 opacity-70" />
          <div className="animate-drift absolute -bottom-40 left-1/2 h-[30rem] w-[44rem] max-w-[140%] -translate-x-1/2 rounded-full bg-accent/[0.09] blur-[120px]" />
        </div>
        <FloatingCode
          className="-z-10"
          snippets={[
            { key: "send", rest: "(mensagem) → 💬", pos: "left-[5%] top-[14%]", depth: 0.6 },
            { key: "git ", rest: 'push origin "novo-projeto"', pos: "right-[4%] top-[22%]", depth: 0.4 },
            { key: "deploy", rest: "() // pronto ✓", pos: "bottom-[12%] left-[7%]", depth: 0.75 },
          ]}
        />

        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2.5">
              <span className="pulse-dot relative size-2 rounded-full bg-accent text-accent-light" />
              Disponível para novos projetos
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="contato-title"
              className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl lg:text-[5.25rem]"
            >
              Vamos construir algo <span className="text-accent-light">juntos?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Estou aberto a oportunidades, projetos freelancer e boas ideias. Se você procura um desenvolvedor
              comprometido em transformar ideias em soluções digitais, vamos conversar.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Magnetic className="w-full sm:w-auto">
                <ButtonLink className="w-full sm:w-auto" href={primaryContactHref} external={primaryIsExternal} size="lg">
                  Entrar em contato <ArrowUpRight size={18} />
                </ButtonLink>
              </Magnetic>
              {contactLinks.linkedin && (
                <ButtonLink href={contactLinks.linkedin} external size="lg" variant="secondary">
                  <LinkedinIcon size={16} /> LinkedIn
                </ButtonLink>
              )}
            </div>
          </Reveal>
        </div>

        {channels.length > 1 && (
          <Stagger
            as="ul"
            className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-2"
            stagger={0.06}
          >
            {channels.map(({ label, value, href, icon: Icon }) => {
              const external = href.startsWith("http");
              return (
                <StaggerItem as="li" key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="glass group flex min-h-16 items-center gap-4 rounded-2xl px-5 py-4 transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.05]"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line text-muted transition-colors group-hover:text-accent-light">
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0 flex-1 text-left">
                      <span className="block text-sm font-medium">{label}</span>
                      <span className="block truncate text-xs text-subtle">{value}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                    />
                  </a>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </div>
    </section>
  );
}
