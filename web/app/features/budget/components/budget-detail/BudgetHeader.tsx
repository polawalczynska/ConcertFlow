import type { BudgetDetailResponse } from "~/api";
import { Badge } from "~/components/ui/Badge";
import { formatDateOnly, getStatusBadgeClasses, formatStatusLabel } from "~/shared/utils";

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
            {formatDateOnly(budget.concertDate)} • {budget.city}
          </p>
        </div>
        <Badge className={getStatusBadgeClasses(budget.budgetStatus)}>
          {formatStatusLabel(budget.budgetStatus)}
        </Badge>
      </div>
    </div>
  );
}

