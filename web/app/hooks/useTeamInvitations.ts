import { useQuery } from "@tanstack/react-query";
import { teamApi } from "~/lib/api-client";
import type { TeamInvitationResponse } from "~/api";

export function useTeamInvitations() {
  return useQuery<TeamInvitationResponse[]>({
    queryKey: ["team-invitations"],
    queryFn: async () => {
      const response = await teamApi.getPendingInvitations();
      return response.data;
    },
    staleTime: 30 * 1000,
  });
}

