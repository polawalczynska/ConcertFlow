import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "~/lib/api-client";
import type { TechnicalManagerStatsResponse } from "~/api";
import { ONE_MINUTE_MS, FIVE_MINUTES_MS } from "~/shared/constants";

export function useTechnicalManagerStats() {
  return useQuery({
    queryKey: ["dashboard", "technical-manager", "stats"],
    queryFn: async (): Promise<TechnicalManagerStatsResponse> => {
      const response = await dashboardApi.getTechnicalManagerStats();
      return response.data;
    },
    staleTime: ONE_MINUTE_MS,
    refetchInterval: FIVE_MINUTES_MS,
  });
}

