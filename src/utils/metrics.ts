import type { SetEntry } from "../types";

export type Metrica = "cargaMaxima" | "volumeTotal" | "oneRM";

export const METRICA_LABEL: Record<Metrica, string> = {
  cargaMaxima: "Carga máxima",
  volumeTotal: "Volume total",
  oneRM: "1RM estimado",
};

export const METRICA_UNIDADE: Record<Metrica, string> = {
  cargaMaxima: "kg",
  volumeTotal: "kg total",
  oneRM: "kg (est.)",
};

function cargaMaxima(sets: SetEntry[]): number {
  return Math.max(...sets.map((s) => s.carga));
}

function volumeTotal(sets: SetEntry[]): number {
  return sets.reduce((acc, s) => acc + s.carga * s.reps, 0);
}

// Fórmula de Epley: 1RM = carga * (1 + reps/30)
function oneRMEstimado(sets: SetEntry[]): number {
  return Math.max(...sets.map((s) => s.carga * (1 + s.reps / 30)));
}

export function calcularMetrica(metrica: Metrica, sets: SetEntry[]): number {
  if (sets.length === 0) return 0;
  const valor =
    metrica === "cargaMaxima"
      ? cargaMaxima(sets)
      : metrica === "volumeTotal"
        ? volumeTotal(sets)
        : oneRMEstimado(sets);
  return Math.round(valor * 10) / 10;
}
