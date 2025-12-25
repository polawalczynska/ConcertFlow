import type { BudgetDetailResponse } from "~/api";
import { Badge } from "~/components/ui/Badge";

interface BudgetHeaderProps {
  budget: BudgetDetailResponse;
}

export function BudgetHeader({ budget }: BudgetHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">{budget.concertName}</h2>
          <p className="text-text-secondary">{budget.artistName} • {budget.venue}</p>
          <p className="text-sm text-text-secondary">
            {budget.concertDate ? new Date(budget.concertDate).toLocaleDateString() : "N/A"} • {budget.city}
          </p>
        </div>
        <Badge>
          {budget.budgetStatus === "SUBMITTED" && "Submitted"}
          {budget.budgetStatus === "REVISION_REQUESTED" && "Revision Requested"}
          {budget.budgetStatus === "APPROVED" && "Approved"}
          {!budget.budgetStatus && "Unknown"}
        </Badge>
      </div>
    </div>
  );
}

