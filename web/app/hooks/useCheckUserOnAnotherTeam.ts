import { useQuery } from "@tanstack/react-query";
import { teamApi } from "~/lib/api-client";
import { useUser } from "~/shared/hooks/domain";

export function useCheckUserOnAnotherTeam(userId: number | null | undefined) {
  const { data: currentUser } = useUser();
  const isCoordinator = currentUser?.role === "COORDINATOR";
  
  return useQuery<boolean>({
    queryKey: ["user-on-another-team", userId, currentUser?.id],
    queryFn: async () => {
      if (!userId || !currentUser?.id || !isCoordinator) return false;
      const response = await teamApi.checkIfUserOnAnotherTeam(userId);
      return response.data ?? false;
    },
    enabled: !!userId && !!currentUser?.id && isCoordinator === true,
    staleTime: 30 * 1000,
  });
}

