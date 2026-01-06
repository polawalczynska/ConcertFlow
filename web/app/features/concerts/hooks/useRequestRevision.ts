import { useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetApprovalApi } from "~/lib/api-client";
import type { RequestBudgetRevisionRequest } from "~/api";

export function useRequestRevision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ concertId, request }: { concertId: number; request: RequestBudgetRevisionRequest }) => {
      await budgetApprovalApi.requestBudgetRevision(concertId, request);
    },
    onSuccess: (_, variables) => {
      const { concertId } = variables;
      queryClient.invalidateQueries({ 
        predicate: (query) => {
          return (query.queryKey[0] === "budget-details" || query.queryKey[0] === "budget-details-manager") && 
                 query.queryKey[1] === concertId;
        }
      });
      queryClient.invalidateQueries({ queryKey: ["budget-approvals"] });
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
    },
  });
}

