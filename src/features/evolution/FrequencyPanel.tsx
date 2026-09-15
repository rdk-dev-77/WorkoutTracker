import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { WorkoutSession } from "../../types";
import { startOfWeek, startOfMonth, formatDateShort, formatMonthLabel } from "../../utils/date";

type Granularidade = "semana" | "mes";

interface Bucket {
  bucket: string;
  sessoes: number;
}

export default function FrequencyPanel({ sessions }: { sessions: WorkoutSession[] }) {
  const [granularidade, setGranularidade] = useState<Granularidade>("semana");

  const dados = useMemo<Bucket[]>(() => {
    const buckets = new Map<string, number>();
    for (const session of sessions) {
      const bucket =
        granularidade === "semana" ? startOfWeek(session.data) : startOfMonth(session.data);
      buckets.set(bucket, (buckets.get(bucket) ?? 0) + 1);
    }
    return Array.from(buckets, ([bucket, sessoes]) => ({ bucket, sessoes })).sort((a, b) =>
      a.bucket.localeCompare(b.bucket),
    );
  }, [sessions, granularidade]);

  const formatarLabel = granularidade === "semana" ? formatDateShort : formatMonthLabel;

  return (
    <div>
      <div className="segmented">
        <button
          type="button"
          className={
            granularidade === "semana" ? "segmented-item segmented-item-active" : "segmented-item"
          }
          onClick={() => setGranularidade("semana")}
        >
          Por semana
        </button>
        <button
          type="button"
          className={
            granularidade === "mes" ? "segmented-item segmented-item-active" : "segmented-item"
          }
          onClick={() => setGranularidade("mes")}
        >
          Por mês
        </button>
      </div>

      <div className="card">
        <h2>Sessões de treino</h2>
        {dados.length === 0 ? (
          <p className="muted">Registre sessões para ver sua frequência de treino.</p>
        ) : (
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={dados} margin={{ top: 8, right: 12, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="var(--gridline)" vertical={false} />
                <XAxis
                  dataKey="bucket"
                  tickFormatter={formatarLabel}
                  stroke="var(--baseline)"
                  tick={{ fill: "var(--muted)", fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  stroke="var(--baseline)"
                  tick={{ fill: "var(--muted)", fontSize: 12 }}
                  tickLine={false}
                  width={28}
                />
                <Tooltip
                  content={<FrequencyTooltip formatarLabel={formatarLabel} />}
                  cursor={{ fill: "var(--gridline)" }}
                />
                <Bar dataKey="sessoes" fill="var(--series-1)" radius={[4, 4, 0, 0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

function FrequencyTooltip({
  active,
  payload,
  formatarLabel,
}: {
  active?: boolean;
  payload?: Array<{ payload: Bucket }>;
  formatarLabel: (iso: string) => string;
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
      <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>
        {point.sessoes} {point.sessoes === 1 ? "sessão" : "sessões"}
      </div>
      <div className="muted">{formatarLabel(point.bucket)}</div>
    </div>
  );
}
