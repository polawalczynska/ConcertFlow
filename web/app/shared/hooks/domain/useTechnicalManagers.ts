import { useQuery } from "@tanstack/react-query";
import { userApi } from "~/lib/api-client";
import { FIVE_MINUTES_MS } from "~/shared/constants";
import type { UserResponse } from "~/api";

export function useTechnicalManagers() {
  return useQuery({
    queryKey: ["technical-managers"],
    queryFn: async (): Promise<UserResponse[]> => {
      try {
        const response = await userApi.getTechnicalManagers();
        return response.data || [];
      } catch {
        return [];
      }
    },
    staleTime: FIVE_MINUTES_MS,
    retry: 1,
  });
}

