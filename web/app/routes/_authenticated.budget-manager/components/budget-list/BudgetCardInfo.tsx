import type { BudgetApprovalDashboardResponse } from "~/api";

interface BudgetCardInfoProps {
  budget: BudgetApprovalDashboardResponse;
}

export function BudgetCardInfo({ budget }: BudgetCardInfoProps) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
      <div>
        <p className="text-text-secondary">Concert Date</p>
        <p className="font-medium text-text-primary">
          {budget.concertDate ? new Date(budget.concertDate).toLocaleDateString() : "N/A"}
        </p>
        {(budget.daysUntilConcert ?? 0) < 7 && (
          <p className="text-red-600">{budget.daysUntilConcert} days left</p>
        )}
      </div>
      <div>
        <p className="text-text-secondary">Requested</p>
        <p className="font-semibold text-text-primary">
          ${budget.submittedBudget?.toLocaleString() ?? "0"}
        </p>
      </div>
    </div>
  );
}

