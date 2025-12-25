import type { BudgetDetailResponse } from "~/api";
import { Card, CardContent } from "~/components/ui/Card";

interface BudgetSummaryCardsProps {
  budget: BudgetDetailResponse;
}

export function BudgetSummaryCards({ budget }: BudgetSummaryCardsProps) {
  const isApproved = budget.budgetStatus === "APPROVED";
  const isSubmitted = budget.budgetStatus === "SUBMITTED";
  const isRevisionRequested = budget.budgetStatus === "REVISION_REQUESTED";

  return (
    <div className={`mb-6 grid gap-4 ${isApproved ? "grid-cols-3" : "grid-cols-2"}`}>
      <Card className="border-0 bg-bg-main shadow-sm">
        <CardContent className="p-4">
          <p className="text-xs text-text-secondary">Estimated Budget</p>
          <p className="mt-1 text-2xl font-bold text-text-primary">
            ${budget.estimatedBudget?.toLocaleString() ?? "0"}
          </p>
        </CardContent>
      </Card>
      <Card className="border-0 bg-blue-50 shadow-sm">
        <CardContent className="p-4">
          <p className="text-xs text-blue-700">Requested Budget</p>
          <p className="mt-1 text-2xl font-bold text-blue-700">
            ${budget.requestedBudget?.toLocaleString() ?? "0"}
          </p>
        </CardContent>
      </Card>
      {isApproved && budget.approvedBudget && (
        <Card className="border-0 bg-green-50 shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs text-green-700">Approved Budget</p>
            <p className="mt-1 text-2xl font-bold text-green-700">
              ${budget.approvedBudget.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

