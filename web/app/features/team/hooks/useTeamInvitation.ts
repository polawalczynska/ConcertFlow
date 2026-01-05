import { useQuery } from "@tanstack/react-query";
import { teamApi } from "~/lib/api-client";
import type { TeamInvitationResponse } from "~/api";

export function useTeamInvitation(invitationId: number | null) {
  return useQuery<TeamInvitationResponse | null>({
    queryKey: ["team-invitation", invitationId],
    queryFn: async () => {
      if (!invitationId) return null;
      const response = await teamApi.getInvitation(invitationId);
      return response.data || null;
    },
    enabled: !!invitationId,
    staleTime: 30 * 1000,
  });
}

