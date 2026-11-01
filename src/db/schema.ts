import { defineRelations } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const workouts = pgTable("workouts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull(),
  name: text("name"),
  date: timestamp("date").notNull(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const exercises = pgTable("exercises", {
  id: uuid("id").primaryKey().defaultRandom(),
  workoutId: uuid("workout_id")
    .notNull()
    .references(() => workouts.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  order: integer("order"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const sets = pgTable("sets", {
  id: uuid("id").primaryKey().defaultRandom(),
  exerciseId: uuid("exercise_id")
    .notNull()
    .references(() => exercises.id, { onDelete: "cascade" }),
  setNumber: integer("set_number").notNull(),
  reps: integer("reps"),
  weightKg: numeric("weight_kg", { precision: 6, scale: 2 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const relations = defineRelations(
  { workouts, exercises, sets },
  (r) => ({
    workouts: {
      exercises: r.many.exercises({ from: r.workouts.id, to: r.exercises.workoutId }),
    },
    exercises: {
      workout: r.one.workouts({ from: r.exercises.workoutId, to: r.workouts.id }),
      sets: r.many.sets({ from: r.exercises.id, to: r.sets.exerciseId }),
    },
    sets: {
      exercise: r.one.exercises({ from: r.sets.exerciseId, to: r.exercises.id }),
    },
  })
);
