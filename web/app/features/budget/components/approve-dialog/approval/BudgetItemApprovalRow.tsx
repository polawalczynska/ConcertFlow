import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";
import type { BudgetItemResponse } from "~/api";

interface BudgetItemApprovalRowProps {
  item: BudgetItemResponse;
  approvedAmount: string;
  onAmountChange: (itemId: number, amount: string) => void;
}

export function BudgetItemApprovalRow({
  item,
  approvedAmount,
  onAmountChange,
}: BudgetItemApprovalRowProps) {
  if (!item.id) return null;

  return (
    <div className="grid grid-cols-3 gap-4 border-b border-border pb-3 last:border-0">
      <div className="col-span-2">
        <p className="font-medium text-sm text-text-primary">{item.name}</p>
        {item.category && (
          <p className="text-xs text-text-secondary">{item.category}</p>
        )}
        {item.estimatedAmount && (
          <p className="text-xs text-text-secondary mt-1">
            Estimated: ${item.estimatedAmount.toLocaleString()}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor={`item-${item.id}`} className="text-xs">
          Approved Amount
        </Label>
        <Input
          id={`item-${item.id}`}
          type="number"
          step="0.01"
          min="0"
          value={approvedAmount}
          onChange={(e) => onAmountChange(item.id!, e.target.value)}
          placeholder="0.00"
          className="mt-1 text-sm"
        />
      </div>
    </div>
  );
}

