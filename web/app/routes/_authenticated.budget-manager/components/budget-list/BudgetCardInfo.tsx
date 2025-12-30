import type { BudgetApprovalDashboardResponse } from "~/api";
import { parseLocalDateTime } from "~/lib/date-utils";

interface BudgetCardInfoProps {
  budget: BudgetApprovalDashboardResponse;
}

export function BudgetCardInfo({ budget }: BudgetCardInfoProps) {
  const isApproved = budget.budgetStatus === "APPROVED";
  const isRevisionRequested = budget.budgetStatus === "REVISION_REQUESTED";

  return (
    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
      <div>
        <p className="text-text-secondary">Concert Date</p>
        <p className="font-medium text-text-primary">
          {budget.concertDate 
            ? (() => {
                const date = parseLocalDateTime(budget.concertDate);
                return date ? date.toLocaleDateString() : "N/A";
              })()
            : "N/A"}
        </p>
        {(budget.daysUntilConcert ?? 0) < 7 && (
          <p className="text-red-600">{budget.daysUntilConcert} days left</p>
        )}
        {isRevisionRequested && budget.submittedAt && (() => {
          const date = parseLocalDateTime(budget.submittedAt);
          if (!date) return null;
          return (
            <p className="text-orange-600 mt-1">
              Submitted: {date.toLocaleDateString()}
            </p>
          );
        })()}
      </div>
      <div>
        <p className="text-text-secondary">Requested</p>
        <p className="font-semibold text-text-primary">
          ${budget.submittedBudget?.toLocaleString() ?? "0"}
        </p>
        {isApproved && budget.approvedBudget && (
          <p className="text-green-700 font-semibold mt-1">
            Approved: ${budget.approvedBudget.toLocaleString()}
          </p>
        )}
        {isRevisionRequested && budget.estimatedBudget && (
          <p className="text-text-secondary mt-1">
            Estimated: ${budget.estimatedBudget.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}

