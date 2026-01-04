import { Button } from "~/components/ui/Button";
import { CheckCircle, XCircle } from "lucide-react";
import type { BudgetDetailResponse } from "~/api";

interface BudgetActionButtonsProps {
  budgetDetails: BudgetDetailResponse;
  onApprove: () => void;
  onRequestRevision?: () => void;
  isLoading?: boolean;
}

export function BudgetActionButtons({
  budgetDetails,
  onApprove,
  onRequestRevision,
  isLoading = false,
}: BudgetActionButtonsProps) {
  const isApproved = budgetDetails.budgetStatus === "APPROVED";
  const isRevisionRequested = budgetDetails.budgetStatus === "REVISION_REQUESTED";
  const isSubmitted = budgetDetails.budgetStatus === "SUBMITTED";
  const isUnderReview = budgetDetails.budgetStatus === "UNDER_REVIEW";
  const canTakeAction = isSubmitted || isUnderReview;

  if (isApproved) {
    return null;
  }

  if (isRevisionRequested) {
    return (
      <div className="flex gap-3 mt-4">
        <Button
          onClick={onApprove}
          disabled={isLoading}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Approve Budget
        </Button>
      </div>
    );
  }

  if (canTakeAction) {
    return (
      <div className="flex gap-3 mt-4">
        <Button
          onClick={onApprove}
          disabled={isLoading}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Approve Budget
        </Button>
        {onRequestRevision && (
          <Button
            onClick={onRequestRevision}
            disabled={isLoading}
            variant="outline"
            className="flex-1 text-orange-600 border-orange-300 hover:bg-orange-50"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Request Revision
          </Button>
        )}
      </div>
    );
  }

  return null;
}

