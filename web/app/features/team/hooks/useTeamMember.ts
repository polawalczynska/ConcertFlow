import { useQuery } from "@tanstack/react-query";
import { teamApi } from "~/lib/api-client";
import { THIRTY_SECONDS_MS } from "~/shared/constants";
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
    staleTime: THIRTY_SECONDS_MS,
  });
}

