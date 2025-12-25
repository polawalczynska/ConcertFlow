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
      queryClient.invalidateQueries({ queryKey: ["budget-approvals"] });
      queryClient.invalidateQueries({ queryKey: ["budget-details", concertId] });
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
    },
  });
}

