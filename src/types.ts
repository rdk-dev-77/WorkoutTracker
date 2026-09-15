export const DIAS_DA_SEMANA = [
  "domingo",
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
] as const;

export type DiaDaSemana = (typeof DIAS_DA_SEMANA)[number];

export const DIA_LABEL: Record<DiaDaSemana, string> = {
  domingo: "Domingo",
  segunda: "Segunda",
  terca: "Terça",
  quarta: "Quarta",
  quinta: "Quinta",
  sexta: "Sexta",
  sabado: "Sábado",
};

export interface Exercise {
  id: string;
  nome: string;
  seriesAlvo: number;
  repsAlvoTexto: string;
  marca?: string;
  grupo?: string;
}

export interface WorkoutPlan {
  id: string;
  nome: string;
  diaDaSemana: DiaDaSemana;
  exercicios: Exercise[];
}

export interface SetEntry {
  carga: number;
  reps: number;
}

export interface ExerciseEntry {
  exerciseId: string;
  exerciseName: string;
  sets: SetEntry[];
}

export interface WorkoutSession {
  id: string;
  data: string; // ISO 8601
  planId: string;
  planNome: string;
  entries: ExerciseEntry[];
}
