import { useQuery } from "@tanstack/react-query";
import { userApi } from "~/lib/api-client";
import type { UserResponse } from "~/api";

export function useUser() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: async (): Promise<UserResponse> => {
      const response = await userApi.getCurrentUser();
      return response.data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}

