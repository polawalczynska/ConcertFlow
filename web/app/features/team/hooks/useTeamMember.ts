import { useQuery } from "@tanstack/react-query";
import { teamApi } from "~/lib/api-client";
import type { TeamMemberResponse } from "~/api";

export function useTeamMember(memberId: number | null) {
  return useQuery<TeamMemberResponse | null>({
    queryKey: ["team-member", memberId],
    queryFn: async () => {
      if (!memberId) return null;
      const response = await teamApi.getTeamMember(memberId);
      return response.data || null;
    },
    enabled: !!memberId,
    staleTime: 30 * 1000,
  });
}

