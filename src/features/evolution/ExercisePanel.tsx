import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { WorkoutPlan, WorkoutSession } from "../../types";
import { formatDate, formatDateShort } from "../../utils/date";
import { calcularMetrica, METRICA_LABEL, METRICA_UNIDADE, type Metrica } from "../../utils/metrics";
import MetricSegmented from "./MetricSegmented";
import ChartTooltip from "./ChartTooltip";

interface ExercicioOpcao {
  id: string;
  nome: string;
}

interface Ponto {
  data: string;
  valor: number;
}

export default function ExercisePanel({
  plans,
  sessions,
}: {
  plans: WorkoutPlan[];
  sessions: WorkoutSession[];
}) {
  const exercicios = useMemo<ExercicioOpcao[]>(() => {
    const map = new Map<string, string>();
    for (const plan of plans) {
      for (const ex of plan.exercicios) {
        if (!map.has(ex.id)) map.set(ex.id, ex.nome);
      }
    }
    return Array.from(map, ([id, nome]) => ({ id, nome }));
  }, [plans]);

  const [exercicioIdEscolhido, setExercicioIdEscolhido] = useState("");
  const [metrica, setMetrica] = useState<Metrica>("cargaMaxima");

  const exercicioSelecionado = exercicioIdEscolhido || exercicios[0]?.id || "";
  const exercicioNome = exercicios.find((e) => e.id === exercicioSelecionado)?.nome ?? "";

  const pontos = useMemo<Ponto[]>(() => {
    if (!exercicioSelecionado) return [];
    const out: Ponto[] = [];
    for (const session of sessions) {
      const entry = session.entries.find((e) => e.exerciseId === exercicioSelecionado);
      if (!entry || entry.sets.length === 0) continue;
      out.push({ data: session.data, valor: calcularMetrica(metrica, entry.sets) });
    }
    return out;
  }, [sessions, exercicioSelecionado, metrica]);

  const historico = useMemo(() => [...pontos].reverse(), [pontos]);

  const eixoYLargura = useMemo(() => {
    const maior = pontos.reduce((acc, p) => Math.max(acc, p.valor), 0);
    const digitos = Math.round(maior).toString().length;
    return Math.max(32, 16 + digitos * 9);
  }, [pontos]);

  if (exercicios.length === 0) {
    return (
      <div className="empty-state">
        Cadastre um treino com exercícios para acompanhar a evolução.
      </div>
    );
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="exercicio">Exercício</label>
        <select
          id="exercicio"
          value={exercicioSelecionado}
          onChange={(e) => setExercicioIdEscolhido(e.target.value)}
        >
          {exercicios.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.nome}
            </option>
          ))}
        </select>
      </div>

      <MetricSegmented value={metrica} onChange={setMetrica} />

      <div className="card">
        <h2>
          {exercicioNome} — {METRICA_LABEL[metrica].toLowerCase()} por sessão ({METRICA_UNIDADE[metrica]})
        </h2>
        {pontos.length < 2 ? (
          <p className="muted">
            Registre pelo menos duas sessões com esse exercício para ver o gráfico.
          </p>
        ) : (
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={pontos} margin={{ top: 8, right: 12, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="var(--gridline)" vertical={false} />
                <XAxis
                  dataKey="data"
                  tickFormatter={formatDateShort}
                  stroke="var(--baseline)"
                  tick={{ fill: "var(--muted)", fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  stroke="var(--baseline)"
                  tick={{ fill: "var(--muted)", fontSize: 12 }}
                  tickLine={false}
                  width={eixoYLargura}
                />
                <Tooltip
                  content={<ChartTooltip unidade={METRICA_UNIDADE[metrica]} />}
                  cursor={{ stroke: "var(--baseline)" }}
                />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke="var(--series-1)"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2, stroke: "var(--surface-1)", fill: "var(--series-1)" }}
                  activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--surface-1)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {historico.length > 0 && (
        <>
          <h2>Histórico</h2>
          {historico.map((p, i) => (
            <div className="card" key={i} style={{ padding: "0.6rem 1rem" }}>
              <div className="row">
                <span>{formatDate(p.data)}</span>
                <span style={{ fontWeight: 600 }}>
                  {p.valor}
                  {METRICA_UNIDADE[metrica] === "kg" ? "kg" : ""}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
