import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "~/lib/api-client";
import type { InviteTeamMemberRequest } from "~/api";

export function useInviteTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: InviteTeamMemberRequest) => {
      const response = await teamApi.inviteTeamMember(request);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-invitations"] });
    },
  });
}

