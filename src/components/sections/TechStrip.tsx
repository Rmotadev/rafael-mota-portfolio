const words = ["HTML", "CSS", "JavaScript", "Frontend", "API", "Automation", "AI", "Web"];

/** Faixa contínua de tecnologias logo abaixo do hero. */
export function TechStrip() {
  return (
    <div aria-hidden className="overflow-hidden border-y border-line bg-ink-2 py-6">
      <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-14 pr-14">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-14 text-2xl font-medium uppercase tracking-[0.08em] text-white/25">
            {w}
            <span className="size-2 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
