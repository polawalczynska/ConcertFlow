import { Button } from "~/components/ui/Button";
import { Check, AlertCircle, Clock } from "lucide-react";
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
  const isUnderReview = budget.budgetStatus === "UNDER_REVIEW";
  const canTakeAction = isSubmitted || isUnderReview;

  if (isApproved) {
    return null;
  }

  if (isRevisionRequested) {
    return (
      <div className="space-y-3">
        <Button onClick={onApprove} className="w-full bg-purple-main hover:bg-purple-main/90">
          <Check className="mr-2 h-4 w-4" />
          Approve Budget
        </Button>
        <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <Clock className="h-4 w-4 text-amber-600 flex-shrink-0" />
          <p className="text-sm font-medium text-amber-900">
            Revision requested - awaiting coordinator response
          </p>
        </div>
      </div>
    );
  }

  if (canTakeAction) {
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

