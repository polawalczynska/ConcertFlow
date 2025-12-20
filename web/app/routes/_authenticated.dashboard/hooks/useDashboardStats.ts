import { useMemo } from "react";
import type { ConcertResponse } from "~/api";

export function useDashboardStats(concerts: ConcertResponse[]) {
  return useMemo(() => {
    const totalConcerts = concerts.length;
    const plannedConcerts = concerts.filter((c) => c.status === "PLANNING").length;
    const approvedConcerts = concerts.filter((c) => c.status === "APPROVED").length;
    const completedConcerts = concerts.filter((c) => c.status === "COMPLETED").length;
    const cancelledConcerts = concerts.filter((c) => c.status === "CANCELLED").length;

    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingConcerts = concerts.filter((c) => {
      if (!c.date) return false;
      const concertDate = new Date(c.date);
      return concertDate >= now && concertDate <= sevenDaysFromNow;
    }).length;

    return {
      totalConcerts,
      plannedConcerts,
      approvedConcerts,
      completedConcerts,
      cancelledConcerts,
      upcomingConcerts,
    };
  }, [concerts]);
}

