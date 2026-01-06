import { useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetItemApi } from "~/lib/api-client";
import type { CreateBudgetItemRequest, UpdateBudgetItemRequest, BudgetItemResponse } from "~/api";

export function useCreateBudgetItem(concertId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateBudgetItemRequest): Promise<BudgetItemResponse> => {
      const response = await budgetItemApi.createBudgetItem(concertId, request);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget-details", concertId] });
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
    },
  });
}

export function useUpdateBudgetItem(concertId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      itemId,
      request,
    }: {
      itemId: number;
      request: UpdateBudgetItemRequest;
    }): Promise<BudgetItemResponse> => {
      const response = await budgetItemApi.updateBudgetItem(concertId, itemId, request);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget-details", concertId] });
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
    },
  });
}

export function useDeleteBudgetItem(concertId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: number): Promise<void> => {
      await budgetItemApi.deleteBudgetItem(concertId, itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget-details", concertId] });
      queryClient.invalidateQueries({ queryKey: ["concerts"] });
    },
  });
}

