import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { workouts, exercises } from "@/db/schema";
import { eq, and, gte, lt } from "drizzle-orm";

export async function getWorkoutsForDate(date: Date) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthenticated");

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  const rows = await db
    .select({
      workoutId: workouts.id,
      workoutName: workouts.name,
      exerciseId: exercises.id,
      exerciseName: exercises.name,
      exerciseOrder: exercises.order,
    })
    .from(workouts)
    .leftJoin(exercises, eq(exercises.workoutId, workouts.id))
    .where(
      and(
        eq(workouts.userId, userId),
        gte(workouts.date, dayStart),
        lt(workouts.date, dayEnd)
      )
    );

  // Group exercises under their workout
  const workoutMap = new Map<
    string,
    { id: string; name: string | null; exercises: { id: string; name: string; order: number | null }[] }
  >();

  for (const row of rows) {
    if (!workoutMap.has(row.workoutId)) {
      workoutMap.set(row.workoutId, {
        id: row.workoutId,
        name: row.workoutName,
        exercises: [],
      });
    }
    if (row.exerciseId) {
      workoutMap.get(row.workoutId)!.exercises.push({
        id: row.exerciseId,
        name: row.exerciseName,
        order: row.exerciseOrder,
      });
    }
  }

  return Array.from(workoutMap.values());
}
