import type { BudgetItemResponse } from "~/api";
import { Badge } from "~/components/ui/Badge";

interface BudgetItemRowProps {
  item: BudgetItemResponse;
}

export function BudgetItemRow({ item }: BudgetItemRowProps) {
  return (
    <div className="grid grid-cols-4 gap-4 border-b border-border p-3 text-sm last:border-0">
      <div className="col-span-2">
        <p className="font-medium text-text-primary">{item.name}</p>
        {item.isMandatory && <Badge variant="outline" className="mt-1 text-xs">Mandatory</Badge>}
      </div>
      <div>
        <p className="text-text-secondary">Estimated</p>
        <p className="font-medium text-text-primary">
          ${item.estimatedAmount?.toLocaleString() ?? "0"}
        </p>
      </div>
      <div>
        <p className="text-text-secondary">Requested</p>
        <p className="font-semibold text-text-primary">
          ${item.requestedAmount?.toLocaleString() ?? "0"}
        </p>
      </div>
    </div>
  );
}

