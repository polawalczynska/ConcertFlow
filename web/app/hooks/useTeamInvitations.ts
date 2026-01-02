import { useQuery } from "@tanstack/react-query";
import { teamApi } from "~/lib/api-client";
import { useUser } from "~/hooks/useUser";
import type { TeamInvitationResponse } from "~/api";

export function useTeamInvitations() {
  const { data: user } = useUser();
  const isCoordinator = user?.role === "COORDINATOR";

  return useQuery<TeamInvitationResponse[]>({
    queryKey: ["team-invitations"],
    queryFn: async () => {
      const response = await teamApi.getPendingInvitations();
      return response.data;
    },
    enabled: isCoordinator === true,
    staleTime: 30 * 1000,
  });
}

