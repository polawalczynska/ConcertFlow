import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "~/lib/api-client";

export function useCancelTeamInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invitationId: number) => {
      await teamApi.cancelInvitation(invitationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-invitations"] });
    },
  });
}

