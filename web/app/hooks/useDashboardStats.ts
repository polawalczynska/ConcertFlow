import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "~/lib/api-client";
import type { CoordinatorStatsResponse } from "~/api";
import { ONE_MINUTE_MS, FIVE_MINUTES_MS } from "~/lib/constants/time";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async (): Promise<CoordinatorStatsResponse> => {
      const response = await dashboardApi.getCoordinatorStats();
      return response.data;
    },
    staleTime: ONE_MINUTE_MS,
    refetchInterval: FIVE_MINUTES_MS,
  });
}

