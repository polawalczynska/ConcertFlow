import { useQuery } from "@tanstack/react-query";
import { teamApi } from "~/lib/api-client";
import type { TeamMemberResponse } from "~/api";

export function useTeamMembers() {
  return useQuery<TeamMemberResponse[]>({
    queryKey: ["team-members"],
    queryFn: async () => {
      const response = await teamApi.getTeamMembers();
      return response.data;
    },
    staleTime: 30 * 1000,
  });
}

