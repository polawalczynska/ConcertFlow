import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAccessToken } from "~/lib/token-storage";

const getApiBaseUrl = () => {
  if (typeof window !== "undefined") {
    return (window as any).ENV?.API_BASE_URL || "http://localhost:8080";
  }
  return "http://localhost:8080";
};

export function useBudgetDetails(
  concertId: number | null,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["budget-details", concertId],
    queryFn: async () => {
      if (!concertId) return null;
      const token = getAccessToken();
      const response = await axios.get(
        `${getApiBaseUrl()}/api/budget/approval/concert/${concertId}/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    enabled: options?.enabled !== false && !!concertId,
    staleTime: 30 * 1000,
  });
}

