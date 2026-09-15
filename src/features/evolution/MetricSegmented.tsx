import { METRICA_LABEL, type Metrica } from "../../utils/metrics";

const METRICAS: Metrica[] = ["cargaMaxima", "volumeTotal", "oneRM"];

export default function MetricSegmented({
  value,
  onChange,
}: {
  value: Metrica;
  onChange: (m: Metrica) => void;
}) {
  return (
    <div className="segmented">
      {METRICAS.map((m) => (
        <button
          key={m}
          type="button"
          className={m === value ? "segmented-item segmented-item-active" : "segmented-item"}
          onClick={() => onChange(m)}
        >
          {METRICA_LABEL[m]}
        </button>
      ))}
    </div>
  );
}
