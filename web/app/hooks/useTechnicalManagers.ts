import { useQuery } from "@tanstack/react-query";
import { userApi } from "~/lib/api-client";
import type { UserResponse } from "~/api";

export function useTechnicalManagers() {
  return useQuery({
    queryKey: ["technical-managers"],
    queryFn: async (): Promise<UserResponse[]> => {
      try {
        const response = await userApi.getBudgetManagers(); // Temporary - will need backend endpoint
        return [];
      } catch (error) {
        console.error("Error fetching technical managers:", error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

