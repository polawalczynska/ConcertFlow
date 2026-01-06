import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetApprovalApi } from "~/lib/api-client";
import { useUser } from "~/shared/hooks/domain";
import type { BudgetApprovalDashboardResponse, ApproveBudgetRequest, RequestBudgetRevisionRequest } from "~/api";

export function useBudgetApprovals() {
  const queryClient = useQueryClient();
  const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(null);
  const { data: currentUser } = useUser();

  const { data: budgetsPage, isLoading: budgetsLoading, error: budgetsError } = useQuery({
    queryKey: ["budget-approvals", "pending", currentUser?.id],
    queryFn: async () => {
      if (!currentUser?.id) {
        throw new Error("User not loaded");
      }
     
      const response = await budgetApprovalApi.getPendingBudgets(
        currentUser.id, 
        0,            
        100,           
        "date",        
        "asc"         
      );
      return response.data;
    },
    enabled: !!currentUser?.id,
  });

  const { data: budgetDetails, isLoading: detailsLoading, error: detailsError } = useQuery({
    queryKey: ["budget-details", selectedBudgetId, currentUser?.id],
    queryFn: async () => {
      if (!selectedBudgetId || !currentUser?.id) return null;
      
      const response = await budgetApprovalApi.getBudgetDetails(
        selectedBudgetId,
        currentUser.id
      );
      return response.data;
    },
    enabled: !!selectedBudgetId && !!currentUser?.id,
  });

  const budgets = useMemo(() => budgetsPage?.content ?? [], [budgetsPage?.content]);
  const selectedBudget = budgets.find((b) => b.concertId === selectedBudgetId);

  const approveMutation = useMutation({
    mutationFn: async (request: ApproveBudgetRequest) => {
      if (!selectedBudgetId) throw new Error("No budget selected");
      await budgetApprovalApi.approveBudget(selectedBudgetId, request);
    },
    onSuccess: () => {
      if (selectedBudgetId) {
        queryClient.invalidateQueries({ 
          predicate: (query) => {
            return query.queryKey[0] === "budget-details" && 
                   query.queryKey[1] === selectedBudgetId;
          }
        });
      }
      queryClient.invalidateQueries({ queryKey: ["budget-approvals"] });
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
    },
  });

  const requestRevisionMutation = useMutation({
    mutationFn: async (request: RequestBudgetRevisionRequest) => {
      if (!selectedBudgetId) throw new Error("No budget selected");
      await budgetApprovalApi.requestBudgetRevision(selectedBudgetId, request);
    },
    onSuccess: () => {
      if (selectedBudgetId) {
        queryClient.invalidateQueries({ 
          predicate: (query) => {
            return query.queryKey[0] === "budget-details" && 
                   query.queryKey[1] === selectedBudgetId;
          }
        });
      }
      queryClient.invalidateQueries({ queryKey: ["budget-approvals"] });
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
    },
  });

  const filterAndSortBudgets = (
    budgets: BudgetApprovalDashboardResponse[],
    searchQuery: string,
    statusFilter: string,
    sortBy: string
  ) => {
    const filtered = budgets.filter((budget) => {
      const matchesSearch =
        (budget.concertName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (budget.artistName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesStatus = statusFilter === "all" || budget.budgetStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      if (sortBy === "concertDate" && a.concertDate && b.concertDate) {
        return new Date(a.concertDate).getTime() - new Date(b.concertDate).getTime();
      }
      if (sortBy === "budgetAmount" && a.submittedBudget && b.submittedBudget) {
        return Number(b.submittedBudget) - Number(a.submittedBudget);
      }
      return 0;
    });

    return filtered;
  };

  return {
    budgets,
    filterAndSortBudgets,
    selectedBudgetId,
    setSelectedBudgetId,
    selectedBudget,
    budgetDetails,
    budgetsLoading,
    detailsLoading,
    budgetsError,
    detailsError,
    approveMutation,
    requestRevisionMutation,
  };
}
