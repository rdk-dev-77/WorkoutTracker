import { useMemo, useRef, useState } from "react";
import { CATALOGO_EXERCICIOS } from "../../exerciseCatalog";

function normalizar(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export default function ExercisePicker({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (nome: string) => void;
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

  function escolher(nome: string) {
    onChange(nome);
    setAberto(false);
    inputRef.current?.blur();
  }

  return (
    <div className="exercise-picker">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setAberto(true);
        }}
        onFocus={() => setAberto(true)}
        onBlur={() => setAberto(false)}
        placeholder={placeholder ?? "Nome do exercício"}
        autoComplete="off"
      />
      {aberto && sugestoes.length > 0 && (
        <div className="exercise-picker-list">
          {sugestoes.map((ex) => (
            <button
              type="button"
              key={ex.nome}
              className="exercise-picker-item"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => escolher(ex.nome)}
            >
              <span>{ex.nome}</span>
              <span className="muted">{ex.grupo}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
