import { cn } from "@/lib/cn";

type Word = { text: string; className: string };

/**
 * Palavras decorativas de fundo, quase invisíveis.
 * Ficam atrás do conteúdo e são ignoradas por leitores de tela.
 */
export function BackgroundWords({ words, className }: { words: Word[]; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 select-none overflow-hidden", className)}>
      {words.map((w) => (
        <span
          key={w.text + w.className}
          className={cn(
            "absolute font-mono font-medium uppercase tracking-[0.2em] text-white/[0.035]",
            w.className,
          )}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}
