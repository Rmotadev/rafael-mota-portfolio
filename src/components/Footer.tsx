import { contactLinks, site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { label: "LinkedIn", href: contactLinks.linkedin, external: true },
    { label: "GitHub", href: contactLinks.github, external: true },
    { label: "Contato", href: "#contato", external: false },
  ].filter((l): l is typeof l & { href: string } => Boolean(l.href));

  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-10 py-12 sm:py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <a href="#inicio" className="inline-flex items-center gap-2.5">
            <span className="text-[1.85rem] font-medium leading-none tracking-[-0.02em]">
              rafael<span className="text-accent-light">.</span>
            </span>
          </a>
          <p className="mt-3 text-sm text-muted">
            <span className="text-fg">{site.name}</span> · Desenvolvedor Web
          </p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-muted transition-colors hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-xs text-subtle sm:flex-row sm:justify-between">
        <p>Projetado e desenvolvido por {site.name}.</p>
        <p>
          © {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
