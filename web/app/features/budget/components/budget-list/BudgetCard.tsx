import type { BudgetApprovalDashboardResponse } from "~/api";
import { Card, CardContent } from "~/components/ui/Card";
import { BudgetCardHeader } from "./BudgetCardHeader";
import { BudgetCardInfo } from "./BudgetCardInfo";
import { BudgetCardFooter } from "./BudgetCardFooter";

interface BudgetCardProps {
  budget: BudgetApprovalDashboardResponse;
  isSelected: boolean;
  onClick: () => void;
}

export function BudgetCard({ budget, isSelected, onClick }: BudgetCardProps) {
  const isUrgent = (budget.daysUntilConcert ?? 0) <= 2;
  const hasPreviousRejection = budget.flags?.includes("PREVIOUSLY_REJECTED") ?? false;

  return (
    <Card
      className={`cursor-pointer border-2 transition-all hover:shadow-md ${
        isSelected ? "border-pink-main" : "border-transparent"
      } ${isUrgent ? "border-l-4 border-l-red-500" : ""}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <BudgetCardHeader budget={budget} hasPreviousRejection={hasPreviousRejection} />
            <BudgetCardInfo budget={budget} />
            <BudgetCardFooter budget={budget} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

