import { useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { db } from "../../db";
import { formatDate, formatDateShort } from "../../utils/date";

interface ExercicioOpcao {
  id: string;
  nome: string;
}

interface Ponto {
  data: string;
  carga: number;
}

export default function EvolutionPage() {
  const plans = useLiveQuery(() => db.plans.toArray(), []);
  const sessions = useLiveQuery(() => db.sessions.orderBy("data").toArray(), []);

  const exercicios = useMemo<ExercicioOpcao[]>(() => {
    if (!plans) return [];
    const map = new Map<string, string>();
    for (const plan of plans) {
      for (const ex of plan.exercicios) {
        if (!map.has(ex.id)) map.set(ex.id, ex.nome);
      }
    }
    return Array.from(map, ([id, nome]) => ({ id, nome }));
  }, [plans]);

  const [exercicioIdEscolhido, setExercicioIdEscolhido] = useState("");
  const exercicioSelecionado = exercicioIdEscolhido || exercicios[0]?.id || "";
  const exercicioNome = exercicios.find((e) => e.id === exercicioSelecionado)?.nome ?? "";

  const pontos = useMemo<Ponto[]>(() => {
    if (!sessions || !exercicioSelecionado) return [];
    const out: Ponto[] = [];
    for (const session of sessions) {
      const entry = session.entries.find((e) => e.exerciseId === exercicioSelecionado);
      if (!entry || entry.sets.length === 0) continue;
      const cargaMax = Math.max(...entry.sets.map((s) => s.carga));
      out.push({ data: session.data, carga: cargaMax });
    }
    return out;
  }, [sessions, exercicioSelecionado]);

  const historico = useMemo(() => [...pontos].reverse(), [pontos]);

  if (plans === undefined || sessions === undefined) return null;

  return (
    <div>
      <h1>Evolução</h1>

      {exercicios.length === 0 ? (
        <div className="empty-state">
          Cadastre um treino com exercícios para acompanhar a evolução.
        </div>
      ) : (
        <>
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

          <div className="card">
            <h2>{exercicioNome} — carga máxima por sessão (kg)</h2>
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
                      width={36}
                    />
                    <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--baseline)" }} />
                    <Line
                      type="monotone"
                      dataKey="carga"
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
                    <span style={{ fontWeight: 600 }}>{p.carga}kg</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: Ponto }>;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        padding: "0.5rem 0.75rem",
      }}
    >
      <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{point.carga}kg</div>
      <div className="muted">{formatDate(point.data)}</div>
    </div>
  );
}
