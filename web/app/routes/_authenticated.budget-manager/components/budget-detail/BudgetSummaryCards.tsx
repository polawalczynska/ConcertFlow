import type { BudgetDetailResponse } from "~/api";
import { Card, CardContent } from "~/components/ui/Card";

interface BudgetSummaryCardsProps {
  budget: BudgetDetailResponse;
}

export function BudgetSummaryCards({ budget }: BudgetSummaryCardsProps) {
  return (
    <div className="mb-6 grid grid-cols-3 gap-4">
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
      <Card className="border-0 bg-green-50 shadow-sm">
        <CardContent className="p-4">
          <p className="text-xs text-green-700">Approved Budget</p>
          <p className="mt-1 text-2xl font-bold text-green-700">
            ${budget.approvedBudget?.toLocaleString() ?? "0"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

