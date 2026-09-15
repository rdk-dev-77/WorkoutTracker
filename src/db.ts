import Dexie, { type EntityTable } from "dexie";
import type { WorkoutPlan, WorkoutSession } from "./types";

export const db = new Dexie("WorkoutTrackerDB") as Dexie & {
  plans: EntityTable<WorkoutPlan, "id">;
  sessions: EntityTable<WorkoutSession, "id">;
};

db.version(1).stores({
  plans: "id, diaDaSemana",
  sessions: "id, data, planId",
});
