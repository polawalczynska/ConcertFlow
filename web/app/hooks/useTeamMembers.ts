import { useQuery } from "@tanstack/react-query";
import { teamApi } from "~/lib/api-client";
import { useUser } from "~/shared/hooks/domain";
import { useCheckTeamMembership } from "~/features/team/hooks";
import type { TeamMemberResponse } from "~/api";

export function useTeamMembers() {
  const { data: user } = useUser();
  const isCoordinator = user?.role === "COORDINATOR";
  const { data: isTeamMember = false } = useCheckTeamMembership();

  return useQuery<TeamMemberResponse[]>({
    queryKey: ["team-members"],
    queryFn: async () => {
      const response = await teamApi.getTeamMembers();
      return response.data;
    },
    enabled: isCoordinator === true || isTeamMember === true,
    staleTime: 30 * 1000,
  });
}

