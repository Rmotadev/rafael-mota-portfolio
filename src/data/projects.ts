/**
 * ============================================================
 *  PROJETOS
 * ============================================================
 *  Para adicionar um projeto, copie um objeto da lista e edite.
 *  Campos de link vazios ("") ficam ocultos automaticamente.
 *
 *  - image:     caminho em /public (ex.: "/projects/finbot.png").
 *               Sem imagem, o card usa a ilustração definida em `visual`.
 *  - visual:    ilustração padrão quando não há imagem.
 *  - featured:  true = card grande em destaque.
 * ============================================================
 */

export type ProjectFilter = "automacao-ia" | "frontend";

export type ProjectVisual = "billing" | "finbot" | "mario" | "shopping" | "wecare" | "generic";

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Grupo usado no filtro do portfólio. */
  filter: ProjectFilter;
  description: string;
  highlights: string[];
  stack: string[];
  image?: string;
  visual: ProjectVisual;
  featured?: boolean;
  links: {
    github: string;
    demo: string;
    caseStudy: string;
  };
};

export const projects: Project[] = [
  {
    slug: "agente-cobranca-whatsapp",
    name: "Agente de Cobrança WhatsApp",
    category: "Automação / Fintech",
    filter: "automacao-ia",
    description:
      "Sistema automatizado de cobrança recorrente via WhatsApp integrado ao Asaas, criando um fluxo completo de comunicação desde o primeiro contato até a confirmação do pagamento.",
    highlights: [
      "Cobrança automatizada",
      "WhatsApp",
      "Integração com Asaas",
      "Follow-up automático",
      "Confirmação de pagamento",
    ],
    stack: ["WhatsApp", "Asaas API", "Automação", "Integrações"],
    visual: "billing",
    featured: true,
    links: { github: "", demo: "", caseStudy: "" },
  },
  {
    slug: "finbot",
    name: "FinBot — Agente Financeiro",
    category: "IA / Finanças",
    filter: "automacao-ia",
    description:
      "Agente de inteligência artificial desenvolvido para auxiliar no controle financeiro pessoal diretamente pelo WhatsApp, utilizando memória de conversa e categorização automática.",
    highlights: [
      "Inteligência Artificial",
      "WhatsApp",
      "Memória de conversa",
      "Controle financeiro",
      "Categorização automática",
    ],
    stack: ["Inteligência Artificial", "WhatsApp", "Agentes de IA"],
    visual: "finbot",
    featured: true,
    links: { github: "", demo: "", caseStudy: "" },
  },
  {
    slug: "projeto-mario",
    name: "Projeto Mario",
    category: "Frontend",
    filter: "frontend",
    description:
      "Projeto web com HTML, CSS e JavaScript, combinando estruturação de layout, estilização e interatividade.",
    highlights: ["Interface web", "Estruturação de layout", "Interatividade"],
    stack: ["HTML", "CSS", "JavaScript"],
    visual: "mario",
    links: { github: "", demo: "", caseStudy: "" },
  },
  {
    slug: "easy-shopping",
    name: "Easy Shopping",
    category: "Responsive Design",
    filter: "frontend",
    description:
      "Interface responsiva que se adapta a diferentes tamanhos de tela e dispositivos.",
    highlights: ["Responsive Design", "Layout adaptável", "Múltiplos dispositivos"],
    stack: ["HTML", "CSS"],
    visual: "shopping",
    links: { github: "", demo: "", caseStudy: "" },
  },
  {
    slug: "wecare",
    name: "WeCare",
    category: "Frontend",
    filter: "frontend",
    description:
      "Projeto responsivo com foco em estruturação de páginas, estilização e adaptação para diferentes dispositivos.",
    highlights: ["Estruturação de páginas", "Estilização", "Responsive Design"],
    stack: ["HTML", "CSS"],
    visual: "wecare",
    links: { github: "", demo: "", caseStudy: "" },
  },
];
