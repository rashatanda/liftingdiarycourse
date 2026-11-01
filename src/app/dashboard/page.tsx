"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Placeholder workout data — replace with real data fetching later
const PLACEHOLDER_WORKOUTS = [
  { id: 1, name: "Bench Press", sets: 4, reps: 8, weight: "80kg" },
  { id: 2, name: "Squat", sets: 5, reps: 5, weight: "100kg" },
  { id: 3, name: "Deadlift", sets: 3, reps: 5, weight: "120kg" },
];

export default function DashboardPage() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Date Picker */}
      <div className="mb-8">
        <Popover>
          <PopoverTrigger className="flex w-full items-center justify-start gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
            <CalendarIcon className="h-4 w-4" />
            {date ? format(date, "do MMM yyyy") : "Select a date"}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date ?? undefined}
              onSelect={(d) => d && setDate(d)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Workout List */}
      <h2 className="text-lg font-semibold mb-4">
        Workouts for {date ? format(date, "do MMM yyyy") : "—"}
      </h2>

      {PLACEHOLDER_WORKOUTS.length === 0 ? (
        <p className="text-muted-foreground text-sm">No workouts logged for this date.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {PLACEHOLDER_WORKOUTS.map((workout) => (
            <Card key={workout.id}>
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-base">{workout.name}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-sm text-muted-foreground">
                  {workout.sets} sets × {workout.reps} reps — {workout.weight}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
