import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ConcertResponse } from "~/api";
import { getAccessToken } from "~/lib/token-storage";

interface WindowWithEnv extends Window {
  ENV?: {
    API_BASE_URL?: string;
  };
}

const basePath = typeof window !== "undefined" 
  ? (window as unknown as WindowWithEnv).ENV?.API_BASE_URL || "http://localhost:8080"
  : "http://localhost:8080";

export function useAssignedConcerts(memberId: number | null) {
  return useQuery<ConcertResponse[]>({
    queryKey: ["assigned-concerts", memberId],
    queryFn: async () => {
      if (!memberId) return [];
      const token = getAccessToken();
      const response = await axios.get<ConcertResponse[]>(
        `${basePath}/api/team/members/${memberId}/concerts`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return response.data;
    },
    enabled: !!memberId,
    staleTime: 30 * 1000,
  });
}

