import { Suspense } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "./_components/DatePicker";
import { getWorkoutsForDate } from "@/data/getWorkouts";

interface DashboardPageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { date: dateParam } = await searchParams;
  const selectedDate = dateParam ? new Date(dateParam) : new Date();

  const workouts = await getWorkoutsForDate(selectedDate);

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="mb-8">
        <Suspense>
          <DatePicker selected={selectedDate} />
        </Suspense>
      </div>

      <h2 className="text-lg font-semibold mb-4">
        Workouts for {format(selectedDate, "do MMM yyyy")}
      </h2>

      {workouts.length === 0 ? (
        <p className="text-muted-foreground text-sm">No workouts logged for this date.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {workouts.map((workout) => (
            <Card key={workout.id}>
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-base">{workout.name ?? "Unnamed Workout"}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                {workout.exercises.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No exercises logged.</p>
                ) : (
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {workout.exercises
                      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                      .map((exercise) => (
                        <li key={exercise.id}>{exercise.name}</li>
                      ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
