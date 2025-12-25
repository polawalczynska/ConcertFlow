import { useQuery } from "@tanstack/react-query";
import { userApi } from "~/lib/api-client";
import type { UserResponse } from "~/api";

export function useBudgetManagers() {
  return useQuery({
    queryKey: ["budget-managers"],
    queryFn: async (): Promise<UserResponse[]> => {
      try {
        const response = await userApi.getBudgetManagers();
        return response.data || [];
      } catch (error) {
        console.error("Error fetching budget managers:", error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

