import { useQuery } from "@tanstack/react-query";
import { userApi } from "~/lib/api-client";
import { FIVE_MINUTES_MS } from "~/shared/constants";
import { useUser } from "./useUser";
import { UserResponseRoleEnum } from "~/api";
import type { UserResponse } from "~/api";

export function useTechnicalManagers() {
  const { data: currentUser } = useUser();
  const isCoordinator = currentUser?.role === UserResponseRoleEnum.Coordinator;

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
    enabled: isCoordinator === true,
    staleTime: FIVE_MINUTES_MS,
    retry: 1,
  });
}

