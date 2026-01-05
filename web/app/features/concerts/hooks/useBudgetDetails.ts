import { useQuery } from "@tanstack/react-query";
import { budgetApprovalApi } from "~/lib/api-client";
import { useUser } from "~/shared/hooks/domain/useUser";

export function useBudgetDetails(
  concertId: number | null,
  options?: { enabled?: boolean }
) {
  const { data: currentUser } = useUser();
  const budgetManagerId = currentUser?.id;

  return useQuery({
    queryKey: ["budget-details", concertId, budgetManagerId],
    queryFn: async () => {
      if (!concertId || !budgetManagerId) return null;
      const response = await budgetApprovalApi.getBudgetDetails(concertId, budgetManagerId);
      return response.data;
    },
    enabled: options?.enabled !== false && !!concertId && !!budgetManagerId,
    staleTime: 30 * 1000,
  });
}

