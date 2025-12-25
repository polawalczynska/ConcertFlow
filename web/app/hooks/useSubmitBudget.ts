import { useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetApprovalApi } from "~/lib/api-client";
import type { SubmitBudgetForApprovalRequest } from "~/api";

export function useSubmitBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ concertId, request }: { concertId: number; request: SubmitBudgetForApprovalRequest }) => {
      await budgetApprovalApi.submitBudgetForApproval(concertId, request);
    },
    onSuccess: (_, variables) => {
      const { concertId } = variables;
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
      queryClient.invalidateQueries({ queryKey: ["budget-approvals"] });
      queryClient.invalidateQueries({ queryKey: ["budget-details", concertId] });
    },
  });
}

