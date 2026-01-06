import { useQuery } from "@tanstack/react-query";
import { userApi } from "~/lib/api-client";
import { FIVE_MINUTES_MS } from "~/shared/constants";
import { isAuthenticated } from "~/shared/utils/helpers/token-storage";
import type { UserResponse } from "~/api";

export function useUser() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: async (): Promise<UserResponse> => {
      const response = await userApi.getCurrentUser();
      return response.data;
    },
    enabled: isAuthenticated(),
    retry: 1,
    staleTime: FIVE_MINUTES_MS,
  });
}

