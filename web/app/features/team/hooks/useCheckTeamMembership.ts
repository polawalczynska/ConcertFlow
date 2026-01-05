import { useQuery } from "@tanstack/react-query";
import { useUser } from "~/shared/hooks/domain/useUser";
import { teamApi } from "~/lib/api-client";
import { THIRTY_SECONDS_MS } from "~/shared/constants";

export function useCheckTeamMembership() {
  const { data: currentUser } = useUser();
  
  return useQuery<boolean>({
    queryKey: ["team-membership", currentUser?.id],
    queryFn: async () => {
      if (!currentUser?.id) return false;
      const response = await teamApi.checkTeamMembership();
      return response.data;
    },
    enabled: !!currentUser?.id && currentUser?.role !== "COORDINATOR",
    staleTime: THIRTY_SECONDS_MS,
  });
}

