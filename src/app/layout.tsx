import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Serif, Jost } from "next/font/google";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.links.linkedin }],
  creator: site.name,
  keywords: [
    "Rafael Mota",
    "Desenvolvedor Web",
    "Desenvolvimento Web",
    "Automação",
    "Inteligência Artificial",
    "Freelancer",
    "Portfólio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.description,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressRegion: "Rio Grande do Sul", addressCountry: "BR" },
  email: `mailto:${site.links.email}`,
  sameAs: [site.links.linkedin, site.links.github],
  knowsAbout: ["HTML", "CSS", "JavaScript", "Desenvolvimento Web", "Automação", "Inteligência Artificial"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${jost.variable} ${geistMono.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Pular para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
