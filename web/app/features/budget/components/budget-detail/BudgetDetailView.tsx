import type { BudgetDetailResponse } from "~/api";
import { BudgetHeader } from "./BudgetHeader";
import { BudgetSummaryCards } from "./BudgetSummaryCards";
import { BudgetLineItems } from "./BudgetLineItems";
import { ValidationResults } from "./ValidationResults";
import { BudgetActionButtons } from "./BudgetActionButtons";
import { RevisionNotes } from "./RevisionNotes";

interface BudgetDetailViewProps {
  budget: BudgetDetailResponse;
  onApprove: () => void;
  onRequestRevision: () => void;
}

export function BudgetDetailView({
  budget,
  onApprove,
  onRequestRevision,
}: BudgetDetailViewProps) {
  return (
    <div className="p-6">
      <BudgetHeader budget={budget} />
      <BudgetSummaryCards budget={budget} />
      <RevisionNotes budget={budget} />
      <BudgetLineItems budget={budget} />
      <ValidationResults budget={budget} />
      <BudgetActionButtons
        budget={budget}
        onApprove={onApprove}
        onRequestRevision={onRequestRevision}
      />
    </div>
  );
}

