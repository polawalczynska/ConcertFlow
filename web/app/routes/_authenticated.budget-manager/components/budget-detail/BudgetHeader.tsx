import type { BudgetDetailResponse } from "~/api";
import { Badge } from "~/components/ui/Badge";
import { parseLocalDateTime } from "~/lib/date-utils";
import { getStatusBadgeClasses, formatStatusLabel } from "~/lib/status-utils";

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
            {budget.concertDate 
              ? (() => {
                  const date = parseLocalDateTime(budget.concertDate);
                  return date ? date.toLocaleDateString() : "N/A";
                })()
              : "N/A"} • {budget.city}
          </p>
        </div>
        <Badge className={getStatusBadgeClasses(budget.budgetStatus)}>
          {formatStatusLabel(budget.budgetStatus)}
        </Badge>
      </div>
    </div>
  );
}

