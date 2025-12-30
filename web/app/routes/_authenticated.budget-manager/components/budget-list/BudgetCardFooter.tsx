import type { BudgetApprovalDashboardResponse } from "~/api";
import { Badge } from "~/components/ui/Badge";
import { Button } from "~/components/ui/Button";
import { Eye } from "lucide-react";
import { getStatusBadgeClasses, formatStatusLabel } from "~/lib/status-utils";

interface BudgetCardFooterProps {
  budget: BudgetApprovalDashboardResponse;
}

export function BudgetCardFooter({ budget }: BudgetCardFooterProps) {
  const status = budget.budgetStatus ?? "SUBMITTED";
  return (
    <div className="mt-3 flex items-center justify-between">
      <Badge className={getStatusBadgeClasses(status)}>
        {formatStatusLabel(status)}
      </Badge>
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

