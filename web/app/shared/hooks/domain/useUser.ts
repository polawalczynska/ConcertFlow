import { useQuery } from "@tanstack/react-query";
import { userApi } from "~/lib/api-client";
import { FIVE_MINUTES_MS } from "~/shared/constants";
import { isAuthenticated } from "~/shared/utils/helpers/token-storage";
import type { UserResponse } from "~/api";
import { AxiosError } from "axios";

export function useUser() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: async (): Promise<UserResponse> => {
      const response = await userApi.getCurrentUser();
      return response.data;
    },
    enabled: isAuthenticated(),
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status === 403) {
        return false;
      }
      return failureCount < 1;
    },
    staleTime: FIVE_MINUTES_MS,
  });
}

