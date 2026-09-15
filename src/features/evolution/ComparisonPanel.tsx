import { useMemo, useState } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import type { Exercise, WorkoutPlan, WorkoutSession } from "../../types";
import { calcularMetrica, METRICA_UNIDADE, type Metrica } from "../../utils/metrics";
import MetricSegmented from "./MetricSegmented";

interface Serie {
  exercicio: Exercise;
  pontos: { data: string; valor: number }[];
}

export default function ComparisonPanel({
  plans,
  sessions,
}: {
  plans: WorkoutPlan[];
  sessions: WorkoutSession[];
}) {
  const [planIdEscolhido, setPlanIdEscolhido] = useState("");
  const [metrica, setMetrica] = useState<Metrica>("cargaMaxima");

  const planSelecionado = plans.find((p) => p.id === planIdEscolhido) ?? plans[0];

  const series = useMemo<Serie[]>(() => {
    if (!planSelecionado) return [];
    return planSelecionado.exercicios.map((ex) => {
      const pontos = sessions
        .map((session) => {
          const entry = session.entries.find((e) => e.exerciseId === ex.id);
          if (!entry || entry.sets.length === 0) return null;
          return { data: session.data, valor: calcularMetrica(metrica, entry.sets) };
        })
        .filter((p): p is { data: string; valor: number } => p !== null);
      return { exercicio: ex, pontos };
    });
  }, [planSelecionado, sessions, metrica]);

  if (plans.length === 0) {
    return <div className="empty-state">Cadastre um treino para comparar exercícios.</div>;
  }

  return (
    <div>
      <div className="field">
        <label htmlFor="plano-comparar">Treino</label>
        <select
          id="plano-comparar"
          value={planSelecionado?.id ?? ""}
          onChange={(e) => setPlanIdEscolhido(e.target.value)}
        >
          {plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
      </div>

      <MetricSegmented value={metrica} onChange={setMetrica} />

      <div className="comparison-grid">
        {series.map(({ exercicio, pontos }) => (
          <MiniCard key={exercicio.id} nome={exercicio.nome} pontos={pontos} unidade={METRICA_UNIDADE[metrica]} />
        ))}
      </div>
    </div>
  );
}

function MiniCard({
  nome,
  pontos,
  unidade,
}: {
  nome: string;
  pontos: { data: string; valor: number }[];
  unidade: string;
}) {
  const ultimo = pontos.at(-1);
  const primeiro = pontos[0];
  const delta = ultimo && primeiro ? Math.round((ultimo.valor - primeiro.valor) * 10) / 10 : 0;

  return (
    <div className="card comparison-card">
      <div className="comparison-card-title">{nome}</div>
      {!ultimo ? (
        <p className="muted comparison-card-empty">Sem dados</p>
      ) : (
        <>
          <div className="comparison-card-value">
            {ultimo.valor}
            <span className="comparison-card-unit"> {unidade}</span>
          </div>
          {pontos.length >= 2 && (
            <div
              className={
                delta > 0 ? "comparison-delta comparison-delta-up" : delta < 0 ? "comparison-delta comparison-delta-down" : "comparison-delta"
              }
            >
              {delta > 0 ? "▲" : delta < 0 ? "▼" : "—"} {Math.abs(delta)}
            </div>
          )}
          {pontos.length >= 2 ? (
            <div style={{ width: "100%", height: 48 }}>
              <ResponsiveContainer>
                <LineChart data={pontos} margin={{ top: 4, right: 2, bottom: 0, left: 2 }}>
                  <Line
                    type="monotone"
                    dataKey="valor"
                    stroke="var(--series-1)"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="muted comparison-card-empty">Só 1 sessão ainda</p>
          )}
        </>
      )}
    </div>
  );
}
