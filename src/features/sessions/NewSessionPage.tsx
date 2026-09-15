import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import type { Exercise, SetEntry, WorkoutPlan } from "../../types";
import { useToast } from "../../Toast";
import Spinner from "../../Spinner";
import { IconX } from "../../icons";

type EmAndamento = Record<string, SetEntry[]>; // exerciseId -> sets

export default function NewSessionPage() {
  const [params] = useSearchParams();
  const planId = params.get("planId");

  const plans = useLiveQuery(() => db.plans.toArray(), []);

  if (!planId) {
    return <EscolherPlano plans={plans} />;
  }

  return <RegistrarSessao planId={planId} />;
}

function EscolherPlano({ plans }: { plans: WorkoutPlan[] | undefined }) {
  if (plans === undefined) return <Spinner />;

  return (
    <div>
      <h1>Registrar sessão</h1>
      {plans.length === 0 ? (
        <div className="empty-state">
          Cadastre um treino primeiro na aba "Treinos".
        </div>
      ) : (
        <>
          <p className="muted">Escolha o treino de hoje:</p>
          {plans.map((plan) => (
            <Link
              key={plan.id}
              to={`/sessao/nova?planId=${plan.id}`}
              className="card"
              style={{ display: "block", textDecoration: "none", color: "inherit" }}
            >
              <div style={{ fontWeight: 600 }}>{plan.nome}</div>
              <div className="muted">{plan.exercicios.length} exercício(s)</div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}

function RegistrarSessao({ planId }: { planId: string }) {
  const navigate = useNavigate();
  const showToast = useToast();
  const [plan, setPlan] = useState<WorkoutPlan | null | undefined>(undefined);
  const [sets, setSets] = useState<EmAndamento>({});
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    db.plans.get(planId).then((p) => setPlan(p ?? null));
  }, [planId]);

  const totalSeries = useMemo(
    () => Object.values(sets).reduce((acc, arr) => acc + arr.length, 0),
    [sets],
  );

  if (plan === undefined) return <Spinner />;
  if (plan === null) {
    return <div className="empty-state">Treino não encontrado.</div>;
  }

  function adicionarSerie(exerciseId: string, carga: number, reps: number) {
    setSets((prev) => ({
      ...prev,
      [exerciseId]: [...(prev[exerciseId] ?? []), { carga, reps }],
    }));
  }

  function removerSerie(exerciseId: string, index: number) {
    setSets((prev) => ({
      ...prev,
      [exerciseId]: (prev[exerciseId] ?? []).filter((_, i) => i !== index),
    }));
  }

  async function salvarSessao() {
    if (!plan) return;
    setSalvando(true);
    const entries = plan.exercicios
      .filter((ex) => (sets[ex.id] ?? []).length > 0)
      .map((ex) => ({
        exerciseId: ex.id,
        exerciseName: ex.nome,
        sets: sets[ex.id],
      }));

    if (entries.length === 0) {
      setSalvando(false);
      navigate("/");
      return;
    }

    await db.sessions.put({
      id: crypto.randomUUID(),
      data: new Date().toISOString(),
      planId: plan.id,
      planNome: plan.nome,
      entries,
    });
    showToast("Sessão salva");
    navigate("/");
  }

  return (
    <div>
      <h1>{plan.nome}</h1>
      {plan.exercicios.map((ex) => (
        <ExercicioCard
          key={ex.id}
          exercicio={ex}
          sets={sets[ex.id] ?? []}
          onAdicionar={(carga, reps) => adicionarSerie(ex.id, carga, reps)}
          onRemover={(i) => removerSerie(ex.id, i)}
        />
      ))}

      <button
        type="button"
        className="btn btn-primary btn-block"
        style={{ marginTop: "1rem" }}
        disabled={totalSeries === 0 || salvando}
        onClick={salvarSessao}
      >
        Salvar sessão ({totalSeries} série{totalSeries === 1 ? "" : "s"})
      </button>
    </div>
  );
}

function ExercicioCard({
  exercicio,
  sets,
  onAdicionar,
  onRemover,
}: {
  exercicio: Exercise;
  sets: SetEntry[];
  onAdicionar: (carga: number, reps: number) => void;
  onRemover: (index: number) => void;
}) {
  const [carga, setCarga] = useState("");
  const [reps, setReps] = useState("");

  function adicionar() {
    const cargaNum = Number(carga);
    const repsNum = Number(reps);
    if (!Number.isFinite(cargaNum) || !Number.isFinite(repsNum) || repsNum <= 0) return;
    onAdicionar(cargaNum, repsNum);
    setCarga("");
    setReps("");
  }

  return (
    <div className="card">
      <div style={{ fontWeight: 600 }}>{exercicio.nome}</div>
      <div className="muted">
        Alvo: {exercicio.seriesAlvo} séries de {exercicio.repsAlvoTexto}
      </div>

      {sets.length > 0 && (
        <div className="set-list">
          {sets.map((s, i) => (
            <div className="set-row" key={i}>
              <span>
                Série {i + 1}: {s.carga}kg × {s.reps}
              </span>
              <button
                type="button"
                className="icon-btn"
                onClick={() => onRemover(i)}
                aria-label="Remover série"
                style={{ minHeight: 28, minWidth: 28 }}
              >
                <IconX size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="add-set-row">
        <input
          inputMode="decimal"
          placeholder="Carga (kg)"
          value={carga}
          onChange={(e) => setCarga(e.target.value)}
        />
        <input
          inputMode="numeric"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <button type="button" className="icon-btn" onClick={adicionar} aria-label="Adicionar série">
          +
        </button>
      </div>
    </div>
  );
}
