import { Button } from "~/components/ui/Button";
import { Check, AlertCircle } from "lucide-react";
import type { BudgetDetailResponse } from "~/api";

interface BudgetActionButtonsProps {
  budget: BudgetDetailResponse;
  onApprove: () => void;
  onRequestRevision: () => void;
}

export function BudgetActionButtons({
  budget,
  onApprove,
  onRequestRevision,
}: BudgetActionButtonsProps) {
  const isApproved = budget.budgetStatus === "APPROVED";
  const isRevisionRequested = budget.budgetStatus === "REVISION_REQUESTED";
  const isSubmitted = budget.budgetStatus === "SUBMITTED";

  if (isApproved) {
    return null;
  }

  if (isRevisionRequested) {
    return (
      <div className="flex gap-3">
        <Button onClick={onApprove} className="flex-1 bg-purple-main hover:bg-purple-main/90">
          <Check className="mr-2 h-4 w-4" />
          Approve Budget
        </Button>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-text-secondary italic">
            Revision requested - awaiting coordinator response
          </p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="flex gap-3">
        <Button onClick={onApprove} className="flex-1 bg-purple-main hover:bg-purple-main/90">
          <Check className="mr-2 h-4 w-4" />
          Approve Budget
        </Button>
        <Button onClick={onRequestRevision} variant="outline" className="flex-1">
          <AlertCircle className="mr-2 h-4 w-4" />
          Request Revision
        </Button>
      </div>
    );
  }

  return null;
}

