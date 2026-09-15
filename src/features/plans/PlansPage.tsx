import { useRef } from "react";
import { Link } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { DIAS_DA_SEMANA, DIA_LABEL } from "../../types";
import { exportBackup, importBackup } from "../../backup";

export default function PlansPage() {
  const plans = useLiveQuery(() => db.plans.toArray(), []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    await importBackup(file);
    alert("Backup importado.");
  }

  if (plans === undefined) {
    return null;
  }

  const porDia = DIAS_DA_SEMANA.map((dia) => ({
    dia,
    planos: plans.filter((p) => p.diaDaSemana === dia),
  })).filter((grupo) => grupo.planos.length > 0);

  return (
    <div>
      <div className="row" style={{ marginBottom: "1rem" }}>
        <h1>Treinos</h1>
        <Link to="/planos/novo" className="btn btn-primary">
          + Novo
        </Link>
      </div>

      {plans.length === 0 && (
        <div className="empty-state">
          Nenhum treino cadastrado ainda.
          <br />
          Toque em "+ Novo" para criar o primeiro.
        </div>
      )}

      {porDia.map(({ dia, planos }) => (
        <div key={dia}>
          <div className="day-heading">{DIA_LABEL[dia]}</div>
          {planos.map((plan) => (
            <div className="card" key={plan.id}>
              <div className="row">
                <div>
                  <div style={{ fontWeight: 600 }}>{plan.nome}</div>
                  <div className="muted">
                    {plan.exercicios.length} exercício(s)
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginTop: "0.75rem", gap: "0.5rem" }}>
                <Link
                  to={`/sessao/nova?planId=${plan.id}`}
                  className="btn btn-primary btn-block"
                >
                  Iniciar sessão
                </Link>
                <Link to={`/planos/${plan.id}/editar`} className="btn">
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="card" style={{ marginTop: "1.5rem" }}>
        <h2>Backup</h2>
        <p className="muted">
          Os dados ficam só neste dispositivo. Exporte de vez em quando para não
          perder o histórico.
        </p>
        <div className="row" style={{ gap: "0.5rem" }}>
          <button type="button" className="btn btn-block" onClick={() => exportBackup()}>
            Exportar
          </button>
          <button
            type="button"
            className="btn btn-block"
            onClick={() => fileInputRef.current?.click()}
          >
            Importar
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={onImportFile}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
