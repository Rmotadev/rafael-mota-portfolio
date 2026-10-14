/**
 * ============================================================
 *  CONFIGURAÇÃO CENTRAL DO PORTFÓLIO
 * ============================================================
 *  Edite os valores abaixo para atualizar o site inteiro.
 *
 *  Placeholders: enquanto um valor estiver no formato "[ALGO]",
 *  o link correspondente fica oculto automaticamente no site,
 *  evitando links quebrados. Basta substituir pelo valor real.
 *
 *  Exemplos:
 *    github:   "https://github.com/seu-usuario"
 *    email:    "voce@email.com"
 *    whatsapp: "5551999999999"  (DDI + DDD + número, só dígitos)
 * ============================================================
 */

export const site = {
  name: "Rafael Mota",
  initials: "RM",
  role: "Desenvolvedor Web",
  roleLong: "Desenvolvedor Web",
  location: "Rio Grande do Sul, Brasil",

  /** Foto usada no hero e na seção Sobre (arquivo em /public). Vazio = monograma "RM". */
  photo: "/rafael.jpg" as string,

  title: "Rafael Mota | Desenvolvedor Web",
  description:
    "Portfólio de Rafael Mota, desenvolvedor web especializado em desenvolvimento web, automações e soluções digitais.",

  links: {
    linkedin: "https://www.linkedin.com/in/rafaelfmota",
    github: "https://github.com/Rmotadev",
    email: "rafaelmotadev@outlook.com",
    whatsapp: "5551982759010",
  },

  /** Mensagem padrão ao abrir o WhatsApp. */
  whatsappMessage: "Olá, Rafael! Vi seu portfólio e gostaria de conversar.",
} as const;

/** Retorna true quando o valor ainda é um placeholder (ex.: "[GITHUB]") ou está vazio. */
export function isPlaceholder(value?: string | null): boolean {
  if (!value) return true;
  return /^\[.*\]$/.test(value.trim());
}

/** Retorna o valor apenas se estiver preenchido; caso contrário, undefined. */
export function filled(value?: string | null): string | undefined {
  return isPlaceholder(value) ? undefined : (value as string);
}

export const contactLinks = {
  linkedin: filled(site.links.linkedin),
  github: filled(site.links.github),
  email: filled(site.links.email) ? `mailto:${site.links.email}` : undefined,
  whatsapp: filled(site.links.whatsapp)
    ? `https://wa.me/${site.links.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        site.whatsappMessage,
      )}`
    : undefined,
};

/** Melhor canal de contato direto disponível (WhatsApp > e-mail > LinkedIn). */
export const primaryContactHref =
  contactLinks.whatsapp ?? contactLinks.email ?? contactLinks.linkedin ?? "#contato";

export const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Resume", href: "#resume" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Contato", href: "#contato" },
] as const;
