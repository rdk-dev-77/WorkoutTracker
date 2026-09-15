// Catálogo padrão de exercícios/aparelhos de academia comercial completa,
// incluindo variações de máquinas específicas da Panatta, Hammer Strength
// e Hoist (as marcas mais comuns em academias grandes, inclusive a Ironberg).
// Não existe lista pública oficial de equipamentos da Ironberg (nenhuma
// fonte lista aparelho por aparelho) — os nomes de marca aqui vêm dos
// catálogos públicos de cada fabricante, não de uma inspeção real da
// unidade. O campo continua aceitando texto livre para o que não estiver
// aqui.
export interface ExercicioCatalogo {
  nome: string;
  grupo: string;
  marca?: string;
}

export const CATALOGO_EXERCICIOS: ExercicioCatalogo[] = [
  // Peito
  { nome: "Supino reto (barra)", grupo: "Peito" },
  { nome: "Supino reto (máquina)", grupo: "Peito" },
  { nome: "Supino reto (Iso-Lateral)", grupo: "Peito", marca: "Hammer Strength" },
  { nome: "Supino (Chest Press)", grupo: "Peito", marca: "Hoist" },
  { nome: "Supino inclinado (barra)", grupo: "Peito" },
  { nome: "Supino inclinado (halteres)", grupo: "Peito" },
  { nome: "Supino inclinado (Iso-Lateral)", grupo: "Peito", marca: "Hammer Strength" },
  { nome: "Supino declinado", grupo: "Peito" },
  { nome: "Supino declinado (Chest Press)", grupo: "Peito", marca: "Hoist" },
  { nome: "Supino multifunção (Multi Press)", grupo: "Peito", marca: "Panatta" },
  { nome: "Crucifixo (halteres)", grupo: "Peito" },
  { nome: "Voador / Peck deck", grupo: "Peito" },
  { nome: "Voador (Pectoral Machine)", grupo: "Peito", marca: "Panatta" },
  { nome: "Cross-over (polia)", grupo: "Peito" },
  { nome: "Supino/Puxador combinado (Chest/Back)", grupo: "Peito", marca: "Hammer Strength" },
  { nome: "Paralelas (mergulho)", grupo: "Peito" },

  // Costas
  { nome: "Puxador alto (pulldown) pegada aberta", grupo: "Costas" },
  { nome: "Puxador alto (pulldown) pegada fechada", grupo: "Costas" },
  { nome: "Puxador alto (Lat Pulldown)", grupo: "Costas", marca: "Hoist" },
  { nome: "Puxador alto (Dual Lat Machine)", grupo: "Costas", marca: "Panatta" },
  { nome: "Puxador alto (Iso-Lateral Wide Pulldown)", grupo: "Costas", marca: "Hammer Strength" },
  { nome: "Pulldown / Pullover", grupo: "Costas", marca: "Hammer Strength" },
  { nome: "Barra fixa", grupo: "Costas" },
  { nome: "Remada baixa (cabo/triângulo)", grupo: "Costas" },
  { nome: "Remada baixa (Seated Mid Row)", grupo: "Costas", marca: "Hoist" },
  { nome: "Remada baixa (Lower Back Rowing Machine)", grupo: "Costas", marca: "Panatta" },
  { nome: "Remada curvada (barra)", grupo: "Costas" },
  { nome: "Remada cavalinho (T-bar row)", grupo: "Costas" },
  { nome: "Remada unilateral (halteres)", grupo: "Costas" },
  { nome: "Remada articulada (Iso-Lateral Row)", grupo: "Costas", marca: "Hammer Strength" },
  { nome: "Remada alta / High Row", grupo: "Costas", marca: "Hammer Strength" },
  { nome: "Pulldown reto (barra)", grupo: "Costas" },
  { nome: "Levantamento terra", grupo: "Costas" },
  { nome: "Hiperextensão lombar", grupo: "Costas" },

  // Ombro
  { nome: "Desenvolvimento (halteres)", grupo: "Ombro" },
  { nome: "Desenvolvimento (máquina)", grupo: "Ombro" },
  { nome: "Desenvolvimento (Shoulder Press)", grupo: "Ombro", marca: "Hoist" },
  { nome: "Desenvolvimento (Shoulder Press)", grupo: "Ombro", marca: "Hammer Strength" },
  { nome: "Desenvolvimento (Deltoid Press)", grupo: "Ombro", marca: "Panatta" },
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
  { nome: "Tríceps (Triceps Machine)", grupo: "Tríceps", marca: "Panatta" },
  { nome: "Mergulho no banco (dips)", grupo: "Tríceps" },
  { nome: "Mergulho sentado (Seated Dip)", grupo: "Tríceps", marca: "Hoist" },

  // Pernas
  { nome: "Agachamento livre (barra)", grupo: "Pernas" },
  { nome: "Agachamento smith", grupo: "Pernas" },
  { nome: "Leg press 45°", grupo: "Pernas", marca: "Panatta" },
  { nome: "Leg press duplo eixo", grupo: "Pernas", marca: "Hoist" },
  { nome: "Leg press linear", grupo: "Pernas", marca: "Hammer Strength" },
  { nome: "Hack machine", grupo: "Pernas" },
  { nome: "Hack squat / Dead Lift", grupo: "Pernas", marca: "Hoist" },
  { nome: "Hack squat / V-Squat", grupo: "Pernas", marca: "Hammer Strength" },
  { nome: "Agachamento pendular (Pendulum Squat)", grupo: "Pernas", marca: "Hammer Strength" },
  { nome: "Agachamento no cinto (Belt Squat)", grupo: "Pernas", marca: "Hammer Strength" },
  { nome: "Cadeira extensora", grupo: "Pernas" },
  { nome: "Cadeira extensora (Leg Extension)", grupo: "Pernas", marca: "Hammer Strength" },
  { nome: "Cadeira flexora", grupo: "Pernas" },
  { nome: "Cadeira flexora (Convergent Leg Curl)", grupo: "Pernas", marca: "Panatta" },
  { nome: "Mesa flexora", grupo: "Pernas" },
  { nome: "Mesa flexora (Leg Curl)", grupo: "Pernas", marca: "Hammer Strength" },
  { nome: "Cadeira adutora", grupo: "Pernas" },
  { nome: "Cadeira adutora", grupo: "Pernas", marca: "Panatta" },
  { nome: "Cadeira abdutora", grupo: "Pernas" },
  { nome: "Cadeira abdutora", grupo: "Pernas", marca: "Panatta" },
  { nome: "Adutora/abdutora (Inner/Outer Thigh)", grupo: "Pernas", marca: "Hammer Strength" },
  { nome: "Multi-hip", grupo: "Pernas", marca: "Hammer Strength" },
  { nome: "Afundo (passada)", grupo: "Pernas" },
  { nome: "Panturrilha em pé", grupo: "Pernas" },
  { nome: "Panturrilha em pé (Standing Calf Raise)", grupo: "Pernas", marca: "Hoist" },
  { nome: "Panturrilha sentado", grupo: "Pernas" },
  { nome: "Panturrilha sentado (Seated Calf Raise)", grupo: "Pernas", marca: "Hoist" },
  { nome: "Elevação pélvica (hip thrust)", grupo: "Pernas" },
  { nome: "Elevação pélvica (Glute Drive)", grupo: "Pernas", marca: "Hammer Strength" },

  // Abdômen
  { nome: "Abdominal máquina", grupo: "Abdômen" },
  { nome: "Abdominal (Abdominal Crunch)", grupo: "Abdômen", marca: "Hoist" },
  { nome: "Abdominal superior (Upper Abdominal Machine)", grupo: "Abdômen", marca: "Panatta" },
  { nome: "Abdominal convergente (Crunch)", grupo: "Abdômen", marca: "Panatta" },
  { nome: "Abdominal infra (elevação de pernas)", grupo: "Abdômen" },
  { nome: "Abdominal na polia alta", grupo: "Abdômen" },
  { nome: "Prancha", grupo: "Abdômen" },
  { nome: "Rotação de tronco (Torsion Machine)", grupo: "Abdômen", marca: "Panatta" },

  // Cardio
  { nome: "Esteira", grupo: "Cardio" },
  { nome: "Bike ergométrica", grupo: "Cardio" },
  { nome: "Elíptico", grupo: "Cardio" },
  { nome: "Escada (stair climber)", grupo: "Cardio" },
  { nome: "Remo (rowing machine)", grupo: "Cardio" },
];
