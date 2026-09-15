import { db } from "./db";
import type { WorkoutPlan, WorkoutSession } from "./types";

interface BackupPayload {
  version: 1;
  exportedAt: string;
  plans: WorkoutPlan[];
  sessions: WorkoutSession[];
}

export async function exportBackup(): Promise<void> {
  const [plans, sessions] = await Promise.all([db.plans.toArray(), db.sessions.toArray()]);
  const payload: BackupPayload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    plans,
    sessions,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `workouttracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importBackup(file: File): Promise<void> {
  const text = await file.text();
  const payload = JSON.parse(text) as Partial<BackupPayload>;
  await db.transaction("rw", db.plans, db.sessions, async () => {
    if (Array.isArray(payload.plans)) await db.plans.bulkPut(payload.plans);
    if (Array.isArray(payload.sessions)) await db.sessions.bulkPut(payload.sessions);
  });
}
