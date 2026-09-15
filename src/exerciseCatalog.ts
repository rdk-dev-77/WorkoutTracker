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
}

export const CATALOGO_EXERCICIOS: ExercicioCatalogo[] = [
  // Peito
  { nome: "Supino reto (barra)", grupo: "Peito" },
  { nome: "Supino reto (máquina)", grupo: "Peito" },
  { nome: "Supino reto (Hammer Strength Iso-Lateral)", grupo: "Peito" },
  { nome: "Supino (Hoist Chest Press)", grupo: "Peito" },
  { nome: "Supino inclinado (barra)", grupo: "Peito" },
  { nome: "Supino inclinado (halteres)", grupo: "Peito" },
  { nome: "Supino inclinado (Hammer Strength Iso-Lateral)", grupo: "Peito" },
  { nome: "Supino declinado", grupo: "Peito" },
  { nome: "Supino declinado (Hoist Decline Chest Press)", grupo: "Peito" },
  { nome: "Supino multifunção (Panatta Multi Press)", grupo: "Peito" },
  { nome: "Crucifixo (halteres)", grupo: "Peito" },
  { nome: "Voador / Peck deck", grupo: "Peito" },
  { nome: "Voador (Panatta Pectoral Machine)", grupo: "Peito" },
  { nome: "Cross-over (polia)", grupo: "Peito" },
  { nome: "Supino/Puxador combinado (Hammer Strength Chest/Back)", grupo: "Peito" },
  { nome: "Paralelas (mergulho)", grupo: "Peito" },

  // Costas
  { nome: "Puxador alto (pulldown) pegada aberta", grupo: "Costas" },
  { nome: "Puxador alto (pulldown) pegada fechada", grupo: "Costas" },
  { nome: "Puxador alto (Hoist Lat Pulldown)", grupo: "Costas" },
  { nome: "Puxador alto (Panatta Dual Lat Machine)", grupo: "Costas" },
  { nome: "Puxador alto (Hammer Strength Iso-Lateral Wide Pulldown)", grupo: "Costas" },
  { nome: "Pulldown / Pullover (Hammer Strength)", grupo: "Costas" },
  { nome: "Barra fixa", grupo: "Costas" },
  { nome: "Remada baixa (cabo/triângulo)", grupo: "Costas" },
  { nome: "Remada baixa (Hoist Seated Mid Row)", grupo: "Costas" },
  { nome: "Remada baixa (Panatta Lower Back Rowing Machine)", grupo: "Costas" },
  { nome: "Remada curvada (barra)", grupo: "Costas" },
  { nome: "Remada cavalinho (T-bar row)", grupo: "Costas" },
  { nome: "Remada unilateral (halteres)", grupo: "Costas" },
  { nome: "Remada articulada (Hammer Strength Iso-Lateral Row)", grupo: "Costas" },
  { nome: "Remada alta / High Row (Hammer Strength)", grupo: "Costas" },
  { nome: "Pulldown reto (barra)", grupo: "Costas" },
  { nome: "Levantamento terra", grupo: "Costas" },
  { nome: "Hiperextensão lombar", grupo: "Costas" },

  // Ombro
  { nome: "Desenvolvimento (halteres)", grupo: "Ombro" },
  { nome: "Desenvolvimento (máquina)", grupo: "Ombro" },
  { nome: "Desenvolvimento (Hoist Shoulder Press)", grupo: "Ombro" },
  { nome: "Desenvolvimento (Hammer Strength Shoulder Press)", grupo: "Ombro" },
  { nome: "Desenvolvimento (Panatta Deltoid Press)", grupo: "Ombro" },
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
  { nome: "Tríceps (Panatta Triceps Machine)", grupo: "Tríceps" },
  { nome: "Mergulho no banco (dips)", grupo: "Tríceps" },
  { nome: "Mergulho sentado (Hoist Seated Dip)", grupo: "Tríceps" },

  // Pernas
  { nome: "Agachamento livre (barra)", grupo: "Pernas" },
  { nome: "Agachamento smith", grupo: "Pernas" },
  { nome: "Leg press 45° (Panatta)", grupo: "Pernas" },
  { nome: "Leg press duplo eixo (Hoist Dual Action)", grupo: "Pernas" },
  { nome: "Leg press linear (Hammer Strength)", grupo: "Pernas" },
  { nome: "Hack machine", grupo: "Pernas" },
  { nome: "Hack squat / Dead Lift (Hoist)", grupo: "Pernas" },
  { nome: "Hack squat / V-Squat (Hammer Strength)", grupo: "Pernas" },
  { nome: "Agachamento pendular (Hammer Strength Pendulum Squat)", grupo: "Pernas" },
  { nome: "Agachamento no cinto (Hammer Strength Belt Squat)", grupo: "Pernas" },
  { nome: "Cadeira extensora", grupo: "Pernas" },
  { nome: "Cadeira extensora (Hammer Strength Leg Extension)", grupo: "Pernas" },
  { nome: "Cadeira flexora", grupo: "Pernas" },
  { nome: "Cadeira flexora (Panatta Convergent Leg Curl)", grupo: "Pernas" },
  { nome: "Mesa flexora", grupo: "Pernas" },
  { nome: "Mesa flexora (Hammer Strength Leg Curl)", grupo: "Pernas" },
  { nome: "Cadeira adutora", grupo: "Pernas" },
  { nome: "Cadeira adutora (Panatta)", grupo: "Pernas" },
  { nome: "Cadeira abdutora", grupo: "Pernas" },
  { nome: "Cadeira abdutora (Panatta)", grupo: "Pernas" },
  { nome: "Adutora/abdutora (Hammer Strength Inner/Outer Thigh)", grupo: "Pernas" },
  { nome: "Multi-hip (Hammer Strength)", grupo: "Pernas" },
  { nome: "Afundo (passada)", grupo: "Pernas" },
  { nome: "Panturrilha em pé", grupo: "Pernas" },
  { nome: "Panturrilha em pé (Hoist Standing Calf Raise)", grupo: "Pernas" },
  { nome: "Panturrilha sentado", grupo: "Pernas" },
  { nome: "Panturrilha sentado (Hoist Seated Calf Raise)", grupo: "Pernas" },
  { nome: "Elevação pélvica (hip thrust)", grupo: "Pernas" },
  { nome: "Elevação pélvica (Hammer Strength Glute Drive)", grupo: "Pernas" },

  // Abdômen
  { nome: "Abdominal máquina", grupo: "Abdômen" },
  { nome: "Abdominal (Hoist Abdominal Crunch)", grupo: "Abdômen" },
  { nome: "Abdominal superior (Panatta Upper Abdominal Machine)", grupo: "Abdômen" },
  { nome: "Abdominal convergente (Panatta Crunch)", grupo: "Abdômen" },
  { nome: "Abdominal infra (elevação de pernas)", grupo: "Abdômen" },
  { nome: "Abdominal na polia alta", grupo: "Abdômen" },
  { nome: "Prancha", grupo: "Abdômen" },
  { nome: "Rotação de tronco (Panatta Torsion Machine)", grupo: "Abdômen" },

  // Cardio
  { nome: "Esteira", grupo: "Cardio" },
  { nome: "Bike ergométrica", grupo: "Cardio" },
  { nome: "Elíptico", grupo: "Cardio" },
  { nome: "Escada (stair climber)", grupo: "Cardio" },
  { nome: "Remo (rowing machine)", grupo: "Cardio" },
];
