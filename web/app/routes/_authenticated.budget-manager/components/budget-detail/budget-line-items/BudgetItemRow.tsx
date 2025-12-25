import type { BudgetItemResponse } from "~/api";
import { Badge } from "~/components/ui/Badge";

interface BudgetItemRowProps {
  item: BudgetItemResponse;
}

export function BudgetItemRow({ item }: BudgetItemRowProps) {
  const amount = item.estimatedAmount ?? item.requestedAmount ?? 0;

  return (
    <div className="grid grid-cols-3 gap-4 border-b border-border p-3 text-sm last:border-0">
      <div className="col-span-2">
        <p className="font-medium text-text-primary">{item.name}</p>
        {item.isMandatory && <Badge variant="outline" className="mt-1 text-xs">Mandatory</Badge>}
      </div>
      <div className="text-right">
        <p className="text-text-secondary text-xs mb-1">Amount</p>
        <p className="font-semibold text-text-primary">
          ${amount.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

