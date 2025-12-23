import type { BudgetDetailResponse } from "~/api";
import { BudgetHeader } from "./budget-detail/BudgetHeader";
import { BudgetSummaryCards } from "./budget-detail/BudgetSummaryCards";
import { BudgetLineItems } from "./budget-detail/BudgetLineItems";
import { ValidationResults } from "./budget-detail/ValidationResults";
import { BudgetActionButtons } from "./budget-detail/BudgetActionButtons";

interface BudgetDetailViewProps {
  budget: BudgetDetailResponse;
  onApprove: () => void;
  onReject: () => void;
  onRequestRevision: () => void;
}

export function BudgetDetailView({
  budget,
  onApprove,
  onReject,
  onRequestRevision,
}: BudgetDetailViewProps) {
  return (
    <div className="p-6">
      <BudgetHeader budget={budget} />
      <BudgetSummaryCards budget={budget} />
      <BudgetLineItems budget={budget} />
      <ValidationResults budget={budget} />
      <BudgetActionButtons
        onApprove={onApprove}
        onReject={onReject}
        onRequestRevision={onRequestRevision}
      />
    </div>
  );
}

