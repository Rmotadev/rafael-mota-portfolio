import { Check, CheckCheck, Heart, Sparkles } from "lucide-react";
import type { ProjectVisual } from "@/data/projects";
import { cn } from "@/lib/cn";

/**
 * Ilustrações em código usadas quando o projeto não tem imagem.
 * São mockups abstratos que representam a ideia de cada projeto.
 */
export function ProjectVisualArt({ type }: { type: ProjectVisual }) {
  switch (type) {
    case "billing":
      return <BillingVisual />;
    case "finbot":
      return <FinbotVisual />;
    case "mario":
      return <MarioVisual />;
    case "shopping":
      return <ShoppingVisual />;
    case "wecare":
      return <WeCareVisual />;
    default:
      return <GenericVisual />;
  }
}

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div aria-hidden className={cn("relative h-full w-full overflow-hidden", className)}>
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
      {children}
    </div>
  );
}

function Bubble({
  children,
  side = "in",
  className,
}: {
  children: React.ReactNode;
  side?: "in" | "out";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.72rem] leading-snug sm:text-xs",
        side === "out"
          ? "ml-auto rounded-br-md bg-accent/90 text-white"
          : "rounded-bl-md border border-line bg-surface-2 text-fg/85",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ---------- 01 · Cobrança WhatsApp ---------- */
function BillingVisual() {
  const steps = ["Contato", "Cobrança", "Follow-up", "Pago"];
  return (
    <Frame>
      <div className="absolute -right-10 -top-10 size-56 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative flex h-full flex-col justify-center gap-5 p-5 sm:p-8">
        <div className="mx-auto w-full max-w-sm rounded-2xl border border-line bg-ink/80 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <span className="grid size-8 place-items-center rounded-full bg-accent/15 font-mono text-[0.65rem] text-accent-light">
              AG
            </span>
            <div className="leading-tight">
              <p className="text-xs font-medium">Agente de Cobrança</p>
              <p className="text-[0.65rem] text-accent-light">online</p>
            </div>
          </div>
          <div className="space-y-2.5 p-4">
            <Bubble>Olá! Sua mensalidade vence amanhã. Segue o link de pagamento 👇</Bubble>
            <Bubble className="flex items-center gap-2">
              <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.6rem]">ASAAS</span>
              Pix · Boleto · Cartão
            </Bubble>
            <Bubble side="out">Pago! ✅</Bubble>
            <div className="flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3 py-2 text-[0.7rem] text-accent-light">
              <CheckCheck size={14} /> Pagamento confirmado automaticamente
            </div>
          </div>
        </div>
        <ol className="mx-auto hidden w-full max-w-sm items-center justify-between sm:flex">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center last:flex-none">
              <span className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    "grid size-5 place-items-center rounded-full border text-[0.55rem]",
                    i === steps.length - 1
                      ? "border-accent bg-accent text-white"
                      : "border-line-strong bg-surface text-muted",
                  )}
                >
                  {i === steps.length - 1 ? <Check size={11} strokeWidth={3} /> : i + 1}
                </span>
                <span className="font-mono text-[0.58rem] uppercase tracking-wider text-subtle">{s}</span>
              </span>
              {i < steps.length - 1 && <span className="mx-1 mb-4 h-px flex-1 bg-line-strong" />}
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}

/* ---------- 02 · FinBot ---------- */
function FinbotVisual() {
  const bars = [
    { label: "Alim.", h: 72 },
    { label: "Transp.", h: 44 },
    { label: "Lazer", h: 30 },
    { label: "Casa", h: 88 },
    { label: "Saúde", h: 22 },
  ];
  return (
    <Frame>
      <div className="absolute -left-10 bottom-0 size-56 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="absolute -right-6 top-0 size-48 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative grid h-full grid-cols-1 items-center gap-4 p-5 sm:grid-cols-[1fr_1fr] sm:p-8">
        <div className="rounded-2xl border border-line bg-ink/80 p-4 backdrop-blur">
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-subtle">Resumo do mês</p>
          <p className="mt-1.5 text-lg font-semibold tracking-tight">Por categoria</p>
          <div className="mt-4 flex h-24 items-end gap-2">
            {bars.map((b, i) => (
              <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <div
                  className={cn("w-full rounded-md", i === 3 ? "bg-accent/80" : "bg-white/12")}
                  style={{ height: `${b.h}%` }}
                />
                <span className="font-mono text-[0.5rem] text-subtle">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden space-y-2.5 sm:block">
          <Bubble side="out">gastei 45 no mercado</Bubble>
          <Bubble>
            <span className="mb-1 flex items-center gap-1.5 text-accent-light">
              <Sparkles size={12} /> FinBot
            </span>
            Registrado em <b className="font-medium text-fg">Alimentação</b>. Quer ver o resumo da semana?
          </Bubble>
          <Bubble side="out">sim</Bubble>
          <div className="flex gap-1 pl-1">
            <span className="size-1.5 animate-pulse rounded-full bg-white/40" />
            <span className="size-1.5 animate-pulse rounded-full bg-white/40 [animation-delay:150ms]" />
            <span className="size-1.5 animate-pulse rounded-full bg-white/40 [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- 03 · Projeto Mario ---------- */
function MarioVisual() {
  return (
    <Frame className="bg-gradient-to-b from-sky-500/[0.07] to-transparent">
      <div className="absolute left-[12%] top-[18%] h-5 w-14 rounded-full bg-white/10" />
      <div className="absolute right-[18%] top-[26%] h-4 w-10 rounded-full bg-white/[0.07]" />
      <div className="absolute left-1/2 top-[34%] flex -translate-x-1/2 gap-1">
        <span className="size-7 rounded-[3px] border border-amber-300/40 bg-amber-300/15" />
        <span className="grid size-7 place-items-center rounded-[3px] border border-amber-300/60 bg-amber-300/25 font-mono text-xs font-bold text-amber-200">
          ?
        </span>
        <span className="size-7 rounded-[3px] border border-amber-300/40 bg-amber-300/15" />
      </div>
      <div className="absolute bottom-[22%] left-[20%] h-8 w-6 rounded-t-md bg-red-400/70" />
      <div className="absolute bottom-[22%] right-[16%] flex flex-col items-center">
        <span className="h-3 w-12 rounded-sm border border-emerald-300/50 bg-emerald-400/40" />
        <span className="h-10 w-9 border-x border-emerald-300/40 bg-emerald-400/25" />
      </div>
      <div className="absolute inset-x-0 bottom-0 grid h-[22%] grid-cols-[repeat(auto-fill,minmax(1.5rem,1fr))] border-t border-amber-200/20 bg-amber-900/20">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="border-b border-r border-amber-200/10" />
        ))}
      </div>
    </Frame>
  );
}

/* ---------- 04 · Easy Shopping ---------- */
function ShoppingVisual() {
  const Grid = ({ cols, n }: { cols: string; n: number }) => (
    <div className={cn("grid gap-1.5", cols)}>
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="space-y-1">
          <div className={cn("aspect-square rounded-[4px]", i === 1 ? "bg-accent/30" : "bg-white/10")} />
          <div className="h-1 w-3/4 rounded bg-white/15" />
        </div>
      ))}
    </div>
  );
  return (
    <Frame>
      <div className="relative flex h-full items-end justify-center gap-3 p-6 pb-8">
        <div className="w-[55%] rounded-lg border border-line-strong bg-ink/90 p-2">
          <div className="mb-2 flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="ml-auto h-1.5 w-8 rounded bg-white/10" />
          </div>
          <Grid cols="grid-cols-4" n={8} />
        </div>
        <div className="w-[24%] rounded-lg border border-line-strong bg-ink/90 p-1.5">
          <Grid cols="grid-cols-2" n={4} />
        </div>
        <div className="w-[13%] rounded-xl border border-line-strong bg-ink/90 p-1">
          <div className="mx-auto mb-1 h-0.5 w-3 rounded bg-white/20" />
          <Grid cols="grid-cols-1" n={2} />
        </div>
      </div>
    </Frame>
  );
}

/* ---------- 05 · WeCare ---------- */
function WeCareVisual() {
  return (
    <Frame>
      <div className="absolute right-0 top-0 size-40 rounded-full bg-rose-400/10 blur-3xl" />
      <div className="relative flex h-full items-center justify-center p-6">
        <div className="w-[82%] rounded-xl border border-line-strong bg-ink/90 p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-[0.6rem] font-medium">
              <Heart size={10} className="fill-rose-400/80 text-rose-400/80" /> WeCare
            </span>
            <span className="flex gap-1.5">
              <span className="h-1 w-5 rounded bg-white/15" />
              <span className="h-1 w-5 rounded bg-white/15" />
              <span className="h-1 w-5 rounded bg-white/15" />
            </span>
          </div>
          <div className="mt-3 grid grid-cols-[1.2fr_1fr] gap-3">
            <div className="space-y-1.5 pt-1">
              <div className="h-2 w-full rounded bg-white/25" />
              <div className="h-2 w-2/3 rounded bg-white/25" />
              <div className="h-1 w-full rounded bg-white/10" />
              <div className="h-1 w-4/5 rounded bg-white/10" />
              <div className="mt-2 h-3 w-12 rounded-full bg-rose-400/50" />
            </div>
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-rose-400/20 to-white/5" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md border border-line p-1.5">
                <div className="size-2.5 rounded-full bg-white/15" />
                <div className="mt-1.5 h-1 w-full rounded bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function GenericVisual() {
  return (
    <Frame>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-mono text-4xl text-white/10">{"</>"}</span>
      </div>
    </Frame>
  );
}
