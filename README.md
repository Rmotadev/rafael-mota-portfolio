# Rafael Mota — Portfólio

Portfólio pessoal construído com **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion** e **Lucide Icons**.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Nome, links (LinkedIn, GitHub, e-mail, WhatsApp), SEO | `src/data/site.ts` |
| Projetos (adicionar/editar, imagens, links) | `src/data/projects.ts` |
| Skills, jornada, processo de trabalho, serviços | `src/data/content.ts` |
| Foto (hero e Sobre) | `public/rafael.jpg` |
| Efeitos (partículas, cursor, animações GSAP) | `src/components/fx/` |

### Placeholders de contato

Em `src/data/site.ts`, os valores `[GITHUB]`, `[EMAIL]` e `[WHATSAPP]` são placeholders.
Enquanto estiverem assim, os links correspondentes **ficam ocultos** no site (sem links quebrados).
Substitua pelo valor real e eles aparecem automaticamente:

```ts
github: "https://github.com/seu-usuario",
email: "voce@email.com",
whatsapp: "5551999999999", // DDI + DDD + número
```

O botão "Entrar em contato" usa o melhor canal disponível: e-mail → WhatsApp → LinkedIn.

### Projetos

Cada projeto aceita `image`, `name`, `description`, `stack`, `category`, `highlights` e `links`
(`github`, `demo`, `caseStudy`). Links vazios ficam ocultos. Sem `image`, o card usa uma
ilustração em código (`visual`). Para usar uma imagem real, coloque o arquivo em
`public/projects/` e defina `image: "/projects/nome.png"`.

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Importe na Vercel — nenhuma configuração extra é necessária.
3. (Opcional) Com domínio próprio, defina `NEXT_PUBLIC_SITE_URL` nas variáveis de ambiente.

Favicon, ícone Apple e imagem Open Graph são gerados automaticamente (`src/app/icon.tsx`,
`apple-icon.tsx`, `opengraph-image.tsx`).
