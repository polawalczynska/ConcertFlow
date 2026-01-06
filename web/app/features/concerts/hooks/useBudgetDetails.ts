import { useQuery } from "@tanstack/react-query";
import { budgetApprovalApi } from "~/lib/api-client";
import { useUser } from "~/shared/hooks/domain/useUser";
import { THIRTY_SECONDS_MS } from "~/shared/constants";

export function useBudgetDetails(
  concertId: number | null,
  options?: { enabled?: boolean }
) {
  const { data: currentUser } = useUser();
  const isCoordinator = currentUser?.role === "COORDINATOR";
  const budgetManagerId = currentUser?.id;

  return useQuery({
    queryKey: ["budget-details", concertId, currentUser?.role, budgetManagerId],
    queryFn: async () => {
      if (!concertId || !currentUser?.id) return null;
      
      if (isCoordinator) {
        const response = await budgetApprovalApi.getBudgetDetailsForCoordinator(concertId);
        return response.data;
      } else if (budgetManagerId) {
        const response = await budgetApprovalApi.getBudgetDetails(concertId, budgetManagerId);
        return response.data;
      }
      return null;
    },
    enabled: options?.enabled !== false && !!concertId && !!currentUser?.id,
    staleTime: THIRTY_SECONDS_MS,
  });
}

