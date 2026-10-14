/**
 * Conteúdo textual das seções. Edite aqui para atualizar o site.
 */

export const skillGroups = [
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces modernas, semânticas e adaptáveis.",
    items: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
  },
  {
    id: "ferramentas",
    label: "Ferramentas",
    description: "Versionamento e colaboração no dia a dia.",
    items: ["Git", "GitHub"],
  },
  {
    id: "desenvolvimento",
    label: "Desenvolvimento",
    description: "Conectando sistemas e eliminando tarefas manuais.",
    items: ["APIs", "Integrações", "Automações", "Desenvolvimento Web"],
  },
  {
    id: "ia",
    label: "IA & Produtos",
    description: "Agentes inteligentes e produtos digitais.",
    items: ["Inteligência Artificial", "Agentes de IA", "Sistemas SaaS"],
  },
] as const;

export const journey = [
  {
    title: "Freelancer",
    subtitle: "Desenvolvimento Web",
    meta: "Rio Grande do Sul, Brasil",
    metaType: "location" as const,
    description:
      "Desenvolvimento de projetos digitais: sites, interfaces web, integrações e automações.",
    tags: [] as string[],
  },
  {
    title: "DevClub",
    subtitle: "Formação Full Stack",
    meta: "Desde 2025",
    metaType: "date" as const,
    description:
      "Formação em desenvolvimento web Full Stack, com foco em HTML, CSS, JavaScript e versionamento com Git e GitHub.",
    tags: ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Desenvolvimento Web"],
  },
];

export const workProcess = [
  {
    title: "Entendimento",
    description: "Entendo o problema, o público e o objetivo antes de escrever qualquer linha de código.",
  },
  {
    title: "Solução",
    description: "Defino a abordagem certa para cada caso: site, sistema web, integração ou automação.",
  },
  {
    title: "Desenvolvimento",
    description: "Construo com código limpo, interface responsiva e atenção à performance.",
  },
  {
    title: "Entrega",
    description: "Publico, testo e deixo tudo pronto para crescer junto com o negócio.",
  },
];

export const services = [
  {
    title: "Landing Pages",
    description: "Páginas modernas, rápidas, responsivas e focadas em conversão.",
    icon: "layout",
  },
  {
    title: "Sites",
    description: "Sites profissionais para empresas, negócios locais e profissionais.",
    icon: "globe",
  },
  {
    title: "Sistemas Web",
    description:
      "Interfaces e sistemas personalizados para transformar processos manuais em experiências digitais.",
    icon: "monitor",
  },
  {
    title: "Automação & IA",
    description: "Integrações, agentes inteligentes e automações para reduzir tarefas repetitivas.",
    icon: "bot",
  },
] as const;
