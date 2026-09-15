// Catálogo padrão de exercícios/aparelhos de academia comercial completa.
// Não existe lista pública oficial de equipamentos da Ironberg (nenhuma
// fonte lista aparelho por aparelho) — isso cobre o que praticamente
// qualquer academia grande (Panatta/Life Fitness/Hammer Strength) tem.
// O campo continua aceitando texto livre para o que não estiver aqui.
export interface ExercicioCatalogo {
  nome: string;
  grupo: string;
}

export const CATALOGO_EXERCICIOS: ExercicioCatalogo[] = [
  // Peito
  { nome: "Supino reto (barra)", grupo: "Peito" },
  { nome: "Supino reto (máquina)", grupo: "Peito" },
  { nome: "Supino inclinado (barra)", grupo: "Peito" },
  { nome: "Supino inclinado (halteres)", grupo: "Peito" },
  { nome: "Supino declinado", grupo: "Peito" },
  { nome: "Crucifixo (halteres)", grupo: "Peito" },
  { nome: "Voador / Peck deck", grupo: "Peito" },
  { nome: "Cross-over (polia)", grupo: "Peito" },
  { nome: "Paralelas (mergulho)", grupo: "Peito" },

  // Costas
  { nome: "Puxador alto (pulldown) pegada aberta", grupo: "Costas" },
  { nome: "Puxador alto (pulldown) pegada fechada", grupo: "Costas" },
  { nome: "Barra fixa", grupo: "Costas" },
  { nome: "Remada baixa (cabo/triângulo)", grupo: "Costas" },
  { nome: "Remada curvada (barra)", grupo: "Costas" },
  { nome: "Remada cavalinho (T-bar row)", grupo: "Costas" },
  { nome: "Remada unilateral (halteres)", grupo: "Costas" },
  { nome: "Remada máquina (articulada)", grupo: "Costas" },
  { nome: "Pulldown reto (barra)", grupo: "Costas" },
  { nome: "Levantamento terra", grupo: "Costas" },
  { nome: "Hiperextensão lombar", grupo: "Costas" },

  // Ombro
  { nome: "Desenvolvimento (halteres)", grupo: "Ombro" },
  { nome: "Desenvolvimento (máquina)", grupo: "Ombro" },
  { nome: "Desenvolvimento militar (barra)", grupo: "Ombro" },
  { nome: "Elevação lateral (halteres)", grupo: "Ombro" },
  { nome: "Elevação lateral (cabo)", grupo: "Ombro" },
  { nome: "Elevação frontal", grupo: "Ombro" },
  { nome: "Remada alta (barra)", grupo: "Ombro" },
  { nome: "Encolhimento (trapézio)", grupo: "Ombro" },
  { nome: "Crucifixo inverso (máquina)", grupo: "Ombro" },

  // Bíceps
  { nome: "Rosca direta (barra)", grupo: "Bíceps" },
  { nome: "Rosca alternada (halteres)", grupo: "Bíceps" },
  { nome: "Rosca Scott", grupo: "Bíceps" },
  { nome: "Rosca martelo", grupo: "Bíceps" },
  { nome: "Rosca concentrada", grupo: "Bíceps" },
  { nome: "Rosca no cabo (polia)", grupo: "Bíceps" },

  // Tríceps
  { nome: "Tríceps pulley (barra)", grupo: "Tríceps" },
  { nome: "Tríceps pulley (corda)", grupo: "Tríceps" },
  { nome: "Tríceps testa", grupo: "Tríceps" },
  { nome: "Tríceps francês", grupo: "Tríceps" },
  { nome: "Tríceps coice (halteres)", grupo: "Tríceps" },
  { nome: "Mergulho no banco (dips)", grupo: "Tríceps" },

  // Pernas
  { nome: "Agachamento livre (barra)", grupo: "Pernas" },
  { nome: "Agachamento smith", grupo: "Pernas" },
  { nome: "Leg press 45°", grupo: "Pernas" },
  { nome: "Hack machine", grupo: "Pernas" },
  { nome: "Cadeira extensora", grupo: "Pernas" },
  { nome: "Cadeira flexora", grupo: "Pernas" },
  { nome: "Mesa flexora", grupo: "Pernas" },
  { nome: "Cadeira adutora", grupo: "Pernas" },
  { nome: "Cadeira abdutora", grupo: "Pernas" },
  { nome: "Afundo (passada)", grupo: "Pernas" },
  { nome: "Panturrilha em pé", grupo: "Pernas" },
  { nome: "Panturrilha sentado", grupo: "Pernas" },
  { nome: "Elevação pélvica (hip thrust)", grupo: "Pernas" },

  // Abdômen
  { nome: "Abdominal máquina", grupo: "Abdômen" },
  { nome: "Abdominal infra (elevação de pernas)", grupo: "Abdômen" },
  { nome: "Abdominal na polia alta", grupo: "Abdômen" },
  { nome: "Prancha", grupo: "Abdômen" },
  { nome: "Rotação de tronco (máquina)", grupo: "Abdômen" },

  // Cardio
  { nome: "Esteira", grupo: "Cardio" },
  { nome: "Bike ergométrica", grupo: "Cardio" },
  { nome: "Elíptico", grupo: "Cardio" },
  { nome: "Escada (stair climber)", grupo: "Cardio" },
  { nome: "Remo (rowing machine)", grupo: "Cardio" },
];
