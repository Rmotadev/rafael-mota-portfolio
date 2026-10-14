import { Bot, Code2, Workflow } from "lucide-react";
import Image from "next/image";
import { site } from "@/data/site";

/** Card com a foto, usado no hero e na seção Sobre. */
export function ProfileCard({ priority = false }: { priority?: boolean }) {
  return (
    <div data-parallax="0.12" className="relative mx-auto w-full max-w-[22rem] sm:max-w-[25rem] lg:mr-0">
      {/* Camadas decorativas atrás da foto */}
      <div aria-hidden className="absolute -inset-10 rounded-full bg-accent/25 blur-[90px]" />
      <div
        aria-hidden
        className="absolute inset-0 hidden translate-x-6 translate-y-6 rounded-[2rem] border border-accent/50 sm:block"
      />
      <div
        aria-hidden
        className="absolute -right-6 -top-6 size-28 rounded-2xl bg-[radial-gradient(rgb(123_152_255/0.55)_1.2px,transparent_1.2px)] [background-size:12px_12px] sm:-right-10 sm:-top-10"
      />

      {/* Foto */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-ink-2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
        {site.photo ? (
          <Image
            src={site.photo}
            alt={`Foto de ${site.name}`}
            fill
            priority={priority}
            sizes="(min-width: 640px) 25rem, 90vw"
            className="object-cover object-[50%_35%]"
          />
        ) : (
          <div aria-hidden className="absolute inset-0 grid place-items-center bg-gradient-to-b from-[#16205a] to-ink text-[8rem] font-semibold tracking-[-0.06em]">
            RM<span className="text-accent-light">.</span>
          </div>
        )}
        {/* Leve tom azul + escurecimento inferior */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-accent/25 via-transparent to-transparent mix-blend-soft-light" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-xl font-medium leading-tight">{site.name}</p>
            <p className="mt-0.5 text-sm text-white/70">Desenvolvedor Web</p>
          </div>
          <p className="text-right text-xs leading-snug text-white/55">
            Rio Grande do Sul
            <br />
            Brasil
          </p>
        </div>
      </div>

      {/* Chips flutuantes */}
      <div className="glass animate-float-slow absolute -left-4 top-8 flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4 text-sm sm:-left-12">
        <span className="pulse-dot relative size-2 rounded-full bg-accent-light text-accent-light" />
        Disponível para projetos
      </div>
      <div
        aria-hidden
        className="glass animate-float-slow absolute -right-3 bottom-24 flex items-center gap-1.5 rounded-2xl p-2 [animation-delay:-4s] sm:-right-10"
      >
        {[Code2, Workflow, Bot].map((Icon, i) => (
          <span key={i} className="grid size-9 place-items-center rounded-xl bg-accent text-white">
            <Icon size={16} />
          </span>
        ))}
      </div>
    </div>
  );
}
