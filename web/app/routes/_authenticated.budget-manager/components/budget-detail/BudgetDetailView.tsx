import type { BudgetDetailResponse } from "~/api";
import { BudgetHeader } from "./BudgetHeader";
import { BudgetSummaryCards } from "./BudgetSummaryCards";
import { BudgetLineItems } from "./BudgetLineItems";
import { ValidationResults } from "./ValidationResults";
import { BudgetActionButtons } from "./BudgetActionButtons";

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

