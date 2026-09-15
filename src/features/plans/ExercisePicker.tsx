import { useMemo, useRef, useState } from "react";
import { CATALOGO_EXERCICIOS, type ExercicioCatalogo } from "../../exerciseCatalog";
import { GroupDot, BrandBadge } from "../../muscleGroups";

function normalizar(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export interface ExercicioEscolhido {
  nome: string;
  marca?: string;
  grupo?: string;
}

export default function ExercisePicker({
  value,
  marca,
  grupo,
  onChange,
  placeholder,
}: {
  value: string;
  marca?: string;
  grupo?: string;
  onChange: (escolhido: ExercicioEscolhido) => void;
  placeholder?: string;
}) {
  const [aberto, setAberto] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sugestoes = useMemo(() => {
    const termo = normalizar(value.trim());
    const lista = termo
      ? CATALOGO_EXERCICIOS.filter((ex) => normalizar(ex.nome).includes(termo))
      : CATALOGO_EXERCICIOS;
    return lista.slice(0, 8);
  }, [value]);

  function escolher(ex: ExercicioCatalogo) {
    onChange({ nome: ex.nome, marca: ex.marca, grupo: ex.grupo });
    setAberto(false);
    inputRef.current?.blur();
  }

  return (
    <div className="exercise-picker">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => {
          onChange({ nome: e.target.value, marca: undefined, grupo: undefined });
          setAberto(true);
        }}
        onFocus={() => setAberto(true)}
        onBlur={() => setAberto(false)}
        placeholder={placeholder ?? "Nome do exercício"}
        autoComplete="off"
      />
      {(marca || grupo) && !aberto && (
        <div className="exercise-picker-meta">
          <GroupDot grupo={grupo} size={7} />
          {grupo && <span className="muted">{grupo}</span>}
          <BrandBadge marca={marca} />
        </div>
      )}
      {aberto && sugestoes.length > 0 && (
        <div className="exercise-picker-list">
          {sugestoes.map((ex, i) => (
            <button
              type="button"
              key={`${ex.nome}-${ex.marca ?? "generico"}-${i}`}
              className="exercise-picker-item"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => escolher(ex)}
            >
              <span>{ex.nome}</span>
              <span className="exercise-picker-item-meta">
                <GroupDot grupo={ex.grupo} size={7} />
                <span className="muted">{ex.grupo}</span>
                <BrandBadge marca={ex.marca} />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
