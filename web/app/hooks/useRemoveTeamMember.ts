import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamApi } from "~/lib/api-client";

export function useRemoveTeamMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberId: number) => {
      await teamApi.removeTeamMember(memberId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
  });
}

