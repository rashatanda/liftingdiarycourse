ALTER TABLE "workouts" ADD COLUMN "started_at" timestamp;--> statement-breakpoint
ALTER TABLE "workouts" ADD COLUMN "completed_at" timestamp;--> statement-breakpoint
ALTER TABLE "workouts" DROP COLUMN "notes";--> statement-breakpoint
ALTER TABLE "sets" DROP COLUMN "duration_seconds";--> statement-breakpoint
ALTER TABLE "sets" DROP COLUMN "notes";