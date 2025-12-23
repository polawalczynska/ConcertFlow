import type { BudgetApprovalDashboardResponse } from "~/api";
import { Badge } from "~/components/ui/Badge";
import { Button } from "~/components/ui/Button";
import { Eye } from "lucide-react";

interface BudgetCardFooterProps {
  budget: BudgetApprovalDashboardResponse;
}

const statusColors: Record<string, string> = {
  SUBMITTED: "bg-blue-100 text-blue-700",
  UNDER_REVIEW: "bg-yellow-100 text-yellow-700",
  REVISION_REQUESTED: "bg-orange-100 text-orange-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

export function BudgetCardFooter({ budget }: BudgetCardFooterProps) {
  return (
    <div className="mt-3 flex items-center justify-between">
      <Badge className={statusColors[budget.budgetStatus ?? "SUBMITTED"]}>
        {budget.budgetStatus?.replace("_", " ") ?? "SUBMITTED"}
      </Badge>
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

