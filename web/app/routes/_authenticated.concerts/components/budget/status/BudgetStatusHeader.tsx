import { Badge } from "~/components/ui/Badge";
import { getStatusBadgeClasses, formatStatusLabel } from "~/shared/utils";
import type { BudgetDetailResponse } from "~/api";

interface BudgetStatusHeaderProps {
  budgetDetails: BudgetDetailResponse;
}

export function BudgetStatusHeader({ budgetDetails }: BudgetStatusHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Badge className={getStatusBadgeClasses(budgetDetails.budgetStatus)}>
        {formatStatusLabel(budgetDetails.budgetStatus)}
      </Badge>
      {budgetDetails.requestedBudget && (
        <div>
          <span className="text-sm text-text-secondary">Requested: </span>
          <span className="font-semibold">${budgetDetails.requestedBudget.toLocaleString()}</span>
        </div>
      )}
      {budgetDetails.budgetStatus === "APPROVED" && budgetDetails.approvedBudget && (
        <div>
          <span className="text-sm text-text-secondary">Approved: </span>
          <span className="font-semibold text-green-700">
            ${budgetDetails.approvedBudget.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}

