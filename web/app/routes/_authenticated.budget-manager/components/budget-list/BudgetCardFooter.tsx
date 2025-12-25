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
  PENDING: "bg-gray-100 text-gray-700",
};

const statusLabels: Record<string, string> = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  REVISION_REQUESTED: "Revision Requested",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  PENDING: "Pending",
};

export function BudgetCardFooter({ budget }: BudgetCardFooterProps) {
  const status = budget.budgetStatus ?? "SUBMITTED";
  return (
    <div className="mt-3 flex items-center justify-between">
      <Badge className={statusColors[status]}>
        {statusLabels[status] ?? status.replace(/_/g, " ")}
      </Badge>
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

