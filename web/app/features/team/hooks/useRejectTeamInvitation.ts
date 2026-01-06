import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "~/lib/api-client";
import type { TeamInvitationResponse } from "~/api";

export function useRejectTeamInvitation() {
  const queryClient = useQueryClient();

  return useMutation<TeamInvitationResponse, Error, number>({
    mutationFn: async (invitationId: number) => {
      const response = await teamApi.rejectInvitation(invitationId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-invitations"] });
    },
  });
}

