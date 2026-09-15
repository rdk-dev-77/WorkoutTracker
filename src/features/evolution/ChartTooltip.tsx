import { formatDate } from "../../utils/date";

interface Ponto {
  data: string;
  valor: number;
}

export default function ChartTooltip({
  active,
  payload,
  unidade,
}: {
  active?: boolean;
  payload?: Array<{ payload: Ponto }>;
  unidade: string;
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
        {point.valor} {unidade}
      </div>
      <div className="muted">{formatDate(point.data)}</div>
    </div>
  );
}
