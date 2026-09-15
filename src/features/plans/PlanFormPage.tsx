import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../db";
import { DIAS_DA_SEMANA, DIA_LABEL, type DiaDaSemana, type Exercise } from "../../types";
import ExercisePicker from "./ExercisePicker";

function novoExercicio(): Exercise {
  return { id: crypto.randomUUID(), nome: "", seriesAlvo: 3, repsAlvoTexto: "8-12" };
}

export default function PlanFormPage() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(planId);

  const [nome, setNome] = useState("");
  const [diaDaSemana, setDiaDaSemana] = useState<DiaDaSemana>("segunda");
  const [exercicios, setExercicios] = useState<Exercise[]>([novoExercicio()]);
  const [carregado, setCarregado] = useState(!editando);

  useEffect(() => {
    if (!planId) return;
    db.plans.get(planId).then((plan) => {
      if (plan) {
        setNome(plan.nome);
        setDiaDaSemana(plan.diaDaSemana);
        setExercicios(plan.exercicios.length > 0 ? plan.exercicios : [novoExercicio()]);
      }
      setCarregado(true);
    });
  }, [planId]);

  if (!carregado) return null;

  function atualizarExercicio(id: string, patch: Partial<Exercise>) {
    setExercicios((prev) => prev.map((ex) => (ex.id === id ? { ...ex, ...patch } : ex)));
  }

  function removerExercicio(id: string) {
    setExercicios((prev) => prev.filter((ex) => ex.id !== id));
  }

  async function salvar() {
    const exerciciosValidos = exercicios.filter((ex) => ex.nome.trim().length > 0);
    const plan = {
      id: planId ?? crypto.randomUUID(),
      nome: nome.trim() || "Treino sem nome",
      diaDaSemana,
      exercicios: exerciciosValidos,
    };
    await db.plans.put(plan);
    navigate("/");
  }

  async function excluir() {
    if (!planId) return;
    await db.plans.delete(planId);
    navigate("/");
  }

  return (
    <div>
      <h1>{editando ? "Editar treino" : "Novo treino"}</h1>

      <div className="field">
        <label htmlFor="nome">Nome do treino</label>
        <input
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Treino A - Peito e tríceps"
        />
      </div>

      <div className="field">
        <label htmlFor="dia">Dia da semana</label>
        <select
          id="dia"
          value={diaDaSemana}
          onChange={(e) => setDiaDaSemana(e.target.value as DiaDaSemana)}
        >
          {DIAS_DA_SEMANA.map((dia) => (
            <option key={dia} value={dia}>
              {DIA_LABEL[dia]}
            </option>
          ))}
        </select>
      </div>

      <h2>Exercícios</h2>
      {exercicios.map((ex) => (
        <div className="exercise-row" key={ex.id}>
          <ExercisePicker
            value={ex.nome}
            onChange={(nome) => atualizarExercicio(ex.id, { nome })}
          />
          <input
            type="number"
            min={1}
            value={ex.seriesAlvo}
            onChange={(e) =>
              atualizarExercicio(ex.id, { seriesAlvo: Number(e.target.value) || 1 })
            }
            title="Séries alvo"
          />
          <input
            value={ex.repsAlvoTexto}
            onChange={(e) => atualizarExercicio(ex.id, { repsAlvoTexto: e.target.value })}
            placeholder="Reps"
            title="Reps alvo"
          />
          <button
            type="button"
            className="icon-btn"
            onClick={() => removerExercicio(ex.id)}
            aria-label="Remover exercício"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn"
        onClick={() => setExercicios((prev) => [...prev, novoExercicio()])}
      >
        + Adicionar exercício
      </button>

      <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <button type="button" className="btn btn-primary btn-block" onClick={salvar}>
          Salvar treino
        </button>
        {editando && (
          <button type="button" className="btn btn-danger btn-block" onClick={excluir}>
            Excluir treino
          </button>
        )}
      </div>
    </div>
  );
}
