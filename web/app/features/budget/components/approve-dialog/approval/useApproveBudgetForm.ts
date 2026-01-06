import { useState, useEffect } from "react";
import type { BudgetDetailResponse, BudgetItemApproval } from "~/api";
import { BudgetItemApprovalDecisionEnum } from "~/api";

interface UseApproveBudgetFormProps {
  isOpen: boolean;
  requestedBudget?: number;
  budgetDetails: BudgetDetailResponse | null;
}

export function useApproveBudgetForm({
  isOpen,
  requestedBudget,
  budgetDetails,
}: UseApproveBudgetFormProps) {
  const [approvedBudget, setApprovedBudget] = useState<string>("");
  const [itemApprovedAmounts, setItemApprovedAmounts] = useState<Record<number, string>>({});

  useEffect(() => {
    if (isOpen && requestedBudget) {
      setApprovedBudget(requestedBudget.toString());
      const initialAmounts: Record<number, string> = {};
      budgetDetails?.budgetItems?.forEach((item) => {
        if (item.id && item.estimatedAmount) {
          initialAmounts[item.id] = item.estimatedAmount.toString();
        }
      });
      setItemApprovedAmounts(initialAmounts);
    } else if (!isOpen) {
      setApprovedBudget("");
      setItemApprovedAmounts({});
    }
  }, [isOpen, requestedBudget, budgetDetails]);

  const handleItemAmountChange = (itemId: number, amount: string) => {
    setItemApprovedAmounts((prev) => ({
      ...prev,
      [itemId]: amount,
    }));
  };

  const buildItemApprovals = (): BudgetItemApproval[] => {
    return (
      budgetDetails?.budgetItems
        ?.filter((item) => item.id != null)
        .map((item) => {
          const amountStr = itemApprovedAmounts[item.id!];
          let amount: number;
          if (amountStr && amountStr.trim() !== "") {
            const parsed = parseFloat(amountStr);
            amount = !isNaN(parsed) && parsed >= 0 ? parsed : (item.estimatedAmount ?? 0);
          } else {
            amount = item.estimatedAmount ?? 0;
          }
          return {
            itemId: item.id!,
            decision: BudgetItemApprovalDecisionEnum.Approved,
            approvedAmount: amount,
          };
        }) || []
    );
  };

  const canApprove = approvedBudget.trim() !== "" && parseFloat(approvedBudget) > 0;

  return {
    approvedBudget,
    setApprovedBudget,
    itemApprovedAmounts,
    handleItemAmountChange,
    buildItemApprovals,
    canApprove,
  };
}

