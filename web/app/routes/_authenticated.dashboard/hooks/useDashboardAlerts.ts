import { useMemo } from "react";
import type { ConcertResponse } from "~/api";

export interface Alert {
  id: number;
  type: "error" | "warning" | "success" | "info";
  title: string;
  message: string;
  time: string;
  action: string;
  actionUrl?: string;
}

export function useDashboardAlerts(concerts: ConcertResponse[]): Alert[] {
  return useMemo(() => {
    const alertList: Alert[] = [];

    const planningConcerts = concerts.filter((c) => c.status === "PLANNING");
    if (planningConcerts.length > 0) {
      const urgent = planningConcerts.filter((c) => {
        if (!c.date) return false;
        const concertDate = new Date(c.date);
        const now = new Date();
        const hoursUntil = (concertDate.getTime() - now.getTime()) / (1000 * 60 * 60);
        return hoursUntil < 24 && hoursUntil > 0;
      });

      if (urgent.length > 0) {
        alertList.push({
          id: 1,
          type: "error",
          title: "Urgent: Budget Approval Required",
          message: `${urgent[0].name} requires budget approval within 24 hours`,
          time: "2 hours ago",
          action: "Approve Now",
          actionUrl: `/concerts?status=PLANNING`,
        });
      }
    }

    const upcoming = concerts.filter((c) => {
      if (!c.date) return false;
      const concertDate = new Date(c.date);
      const now = new Date();
      const daysUntil = (concertDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return daysUntil <= 3 && daysUntil > 0;
    });

    if (upcoming.length > 0) {
      alertList.push({
        id: 2,
        type: "info",
        title: "Upcoming Concert Reminder",
        message: `${upcoming[0].name} is scheduled in ${Math.ceil(
          (new Date(upcoming[0].date!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        )} days - final check needed`,
        time: "1 day ago",
        action: "Review",
        actionUrl: `/concerts`,
      });
    }

    return alertList;
  }, [concerts]);
}

