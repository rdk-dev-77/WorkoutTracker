import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import ExercisePanel from "./ExercisePanel";
import FrequencyPanel from "./FrequencyPanel";
import ComparisonPanel from "./ComparisonPanel";

type Secao = "exercicio" | "frequencia" | "comparar";

export default function EvolutionPage() {
  const plans = useLiveQuery(() => db.plans.toArray(), []);
  const sessions = useLiveQuery(() => db.sessions.orderBy("data").toArray(), []);
  const [secao, setSecao] = useState<Secao>("exercicio");

  if (plans === undefined || sessions === undefined) return null;

  return (
    <div>
      <h1>Evolução</h1>

      <div className="segmented" style={{ marginBottom: "1rem" }}>
        <button
          type="button"
          className={secao === "exercicio" ? "segmented-item segmented-item-active" : "segmented-item"}
          onClick={() => setSecao("exercicio")}
        >
          Por exercício
        </button>
        <button
          type="button"
          className={secao === "frequencia" ? "segmented-item segmented-item-active" : "segmented-item"}
          onClick={() => setSecao("frequencia")}
        >
          Frequência
        </button>
        <button
          type="button"
          className={secao === "comparar" ? "segmented-item segmented-item-active" : "segmented-item"}
          onClick={() => setSecao("comparar")}
        >
          Comparar
        </button>
      </div>

      {secao === "exercicio" && <ExercisePanel plans={plans} sessions={sessions} />}
      {secao === "frequencia" && <FrequencyPanel sessions={sessions} />}
      {secao === "comparar" && <ComparisonPanel plans={plans} sessions={sessions} />}
    </div>
  );
}
