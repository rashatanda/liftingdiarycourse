"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export function DatePicker() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dateParam = searchParams.get("date");
  const selected = dateParam ? parseISO(dateParam) : new Date();

  function handleSelect(date: Date | undefined) {
    if (!date) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("date", format(date, "yyyy-MM-dd"));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={handleSelect}
      className="rounded-lg border bg-background p-3"
    />
  );
}
