import { useQuery } from "@tanstack/react-query";
import { teamApi } from "~/lib/api-client";
import { useUser } from "~/hooks/useUser";
import type { TeamMemberResponse } from "~/api";

export function useTeamMembers() {
  const { data: user } = useUser();
  const isCoordinator = user?.role === "COORDINATOR";

  return useQuery<TeamMemberResponse[]>({
    queryKey: ["team-members"],
    queryFn: async () => {
      const response = await teamApi.getTeamMembers();
      return response.data;
    },
    enabled: isCoordinator === true,
    staleTime: 30 * 1000,
  });
}

