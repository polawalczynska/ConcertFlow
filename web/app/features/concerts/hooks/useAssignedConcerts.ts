import { useQuery } from "@tanstack/react-query";
import { teamApi } from "~/lib/api-client";
import type { ConcertResponse } from "~/api";

export function useAssignedConcerts(memberId: number | null) {
  return useQuery<ConcertResponse[]>({
    queryKey: ["assigned-concerts", memberId],
    queryFn: async () => {
      if (!memberId) return [];
      const response = await teamApi.getAssignedConcerts(memberId);
      return response.data;
    },
    enabled: !!memberId,
    staleTime: 30 * 1000,
  });
}

