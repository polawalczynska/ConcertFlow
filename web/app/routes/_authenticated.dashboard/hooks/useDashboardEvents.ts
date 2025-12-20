import { useMemo } from "react";
import type { ConcertResponse } from "~/api";

export interface UpcomingEvent {
  id: number;
  name: string;
  date: string;
  daysUntil: number;
  status: "On Track" | "Needs Attention";
}

export function useDashboardEvents(concerts: ConcertResponse[]): UpcomingEvent[] {
  return useMemo(() => {
    const now = new Date();
    const futureConcerts = concerts
      .filter((c) => {
        if (!c.date) return false;
        const concertDate = new Date(c.date);
        return concertDate > now && c.status !== "CANCELLED";
      })
      .sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      })
      .slice(0, 3)
      .map((c) => {
        if (!c.date) return null;
        const concertDate = new Date(c.date);
        const daysUntil = Math.ceil((concertDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return {
          id: c.id || 0,
          name: c.name || "Unnamed Concert",
          date: c.date,
          daysUntil,
          status: daysUntil <= 7 ? ("Needs Attention" as const) : ("On Track" as const),
        };
      })
      .filter((e): e is NonNullable<typeof e> => e !== null);

    return futureConcerts;
  }, [concerts]);
}

