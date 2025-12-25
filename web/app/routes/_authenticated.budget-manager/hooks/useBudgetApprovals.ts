import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetApprovalApi } from "~/lib/api-client";
import { useUser } from "~/hooks/useUser";
import type { BudgetApprovalDashboardResponse, ApproveBudgetRequest, RejectBudgetRequest } from "~/api";

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
        currentUser.id // budgetManagerId (second parameter, required)
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
      queryClient.invalidateQueries({ queryKey: ["budget-approvals"] });
      queryClient.invalidateQueries({ queryKey: ["budget-details", selectedBudgetId] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (request: RejectBudgetRequest) => {
      if (!selectedBudgetId) throw new Error("No budget selected");
      await budgetApprovalApi.rejectBudget(selectedBudgetId, request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget-approvals"] });
      queryClient.invalidateQueries({ queryKey: ["budget-details", selectedBudgetId] });
    },
  });

  const filterAndSortBudgets = (
    budgets: BudgetApprovalDashboardResponse[],
    searchQuery: string,
    statusFilter: string,
    priorityFilter: string,
    sortBy: string
  ) => {
    const filtered = budgets.filter((budget) => {
      const matchesSearch =
        (budget.concertName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (budget.artistName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesStatus = statusFilter === "all" || budget.budgetStatus === statusFilter;
      const matchesPriority = priorityFilter === "all" || budget.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });

    filtered.sort((a, b) => {
      if (sortBy === "concertDate" && a.concertDate && b.concertDate) {
        return new Date(a.concertDate).getTime() - new Date(b.concertDate).getTime();
      }
      if (sortBy === "budgetAmount" && a.submittedBudget && b.submittedBudget) {
        return Number(b.submittedBudget) - Number(a.submittedBudget);
      }
      if (sortBy === "priority") {
        const priorityOrder: Record<string, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 };
        return (priorityOrder[a.priority ?? "LOW"] ?? 2) - (priorityOrder[b.priority ?? "LOW"] ?? 2);
      }
      return 0;
    });

    return filtered;
  };

  const stats = useMemo(() => ({
    pending: budgets.filter((b) => b.budgetStatus === "SUBMITTED").length,
    urgent: budgets.filter((b) => b.priority === "HIGH").length,
    total: budgets.length,
    underReview: budgets.filter((b) => b.budgetStatus === "UNDER_REVIEW").length,
  }), [budgets]);

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
    rejectMutation,
    stats,
  };
}
