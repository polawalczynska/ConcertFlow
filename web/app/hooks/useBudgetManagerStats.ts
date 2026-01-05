import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "~/lib/api-client";
import type { BudgetManagerStatsResponse } from "~/api";
import { ONE_MINUTE_MS, FIVE_MINUTES_MS } from "~/shared/constants";

export function useBudgetManagerStats() {
  return useQuery({
    queryKey: ["dashboard", "budget-manager", "stats"],
    queryFn: async (): Promise<BudgetManagerStatsResponse> => {
      const response = await dashboardApi.getBudgetManagerStats();
      return response.data;
    },
    staleTime: ONE_MINUTE_MS,
    refetchInterval: FIVE_MINUTES_MS,
  });
}

