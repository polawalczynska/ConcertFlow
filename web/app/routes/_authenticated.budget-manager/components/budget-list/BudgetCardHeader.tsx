import type { BudgetApprovalDashboardResponse } from "~/api";

interface BudgetCardHeaderProps {
  budget: BudgetApprovalDashboardResponse;
  hasPreviousRejection: boolean;
}

export function BudgetCardHeader({ budget, hasPreviousRejection }: BudgetCardHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-text-primary">{budget.concertName}</h3>
          {hasPreviousRejection && <span className="h-2 w-2 rounded-full bg-yellow-500" />}
        </div>
        <p className="text-sm text-text-secondary">{budget.artistName}</p>
      </div>
    </div>
  );
}

