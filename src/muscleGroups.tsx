const GRUPO_COR_VAR: Record<string, string> = {
  Peito: "--grupo-peito",
  Costas: "--grupo-costas",
  Ombro: "--grupo-ombro",
  Bíceps: "--grupo-biceps",
  Tríceps: "--grupo-triceps",
  Pernas: "--grupo-pernas",
  Abdômen: "--grupo-abdomen",
  Cardio: "--grupo-cardio",
};

export function corDoGrupo(grupo?: string): string {
  if (!grupo) return "var(--muted)";
  const cssVar = GRUPO_COR_VAR[grupo];
  return cssVar ? `var(${cssVar})` : "var(--muted)";
}

// Indicador colorido por grupo muscular. Nunca usar sozinho — sempre ao
// lado do nome do grupo em texto (regra de acessibilidade: cor nunca é o
// único canal de identificação).
export function GroupDot({ grupo, size = 8 }: { grupo?: string; size?: number }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        background: corDoGrupo(grupo),
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
}

export function BrandBadge({ marca }: { marca?: string }) {
  if (!marca) return null;
  return <span className="brand-badge">{marca}</span>;
}
