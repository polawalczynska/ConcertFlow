import { useMemo } from "react";
import type { ConcertResponse } from "~/api";

export interface RecentConcert {
  name: string;
  artist: string;
  status: string;
}

export interface StatusDistributionData {
  status: string;
  count: number;
  color: string;
}

export function useRecentConcerts(
  concerts: ConcertResponse[],
  artists: Array<{ id?: number; name?: string }>
): RecentConcert[] {
  return useMemo(() => {
    return concerts
      .filter((c) => c.createdAt)
      .sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 3)
      .map((c) => ({
        name: c.name || "Unnamed Concert",
        artist: artists.find((a) => a.id === c.artistId)?.name || "Unknown Artist",
        status: c.status || "PLANNING",
      }));
  }, [concerts, artists]);
}

export function useStatusDistribution(concerts: ConcertResponse[]): StatusDistributionData[] {
  return useMemo(() => {
    const statusCounts = {
      PLANNING: concerts.filter((c) => c.status === "PLANNING").length,
      APPROVED: concerts.filter((c) => c.status === "APPROVED").length,
      COMPLETED: concerts.filter((c) => c.status === "COMPLETED").length,
      CANCELLED: concerts.filter((c) => c.status === "CANCELLED").length,
    };

    return [
      { status: "Planning", count: statusCounts.PLANNING, color: "#FCD34D" },
      { status: "Approved", count: statusCounts.APPROVED, color: "#10B981" },
      { status: "Completed", count: statusCounts.COMPLETED, color: "#3B82F6" },
      { status: "Cancelled", count: statusCounts.CANCELLED, color: "#EF4444" },
    ];
  }, [concerts]);
}

