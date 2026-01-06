import { Checkbox } from "~/components/ui/Checkbox";
import { Label } from "~/components/ui/Label";
import type { BudgetItemResponse } from "~/api";
import { RevisionItemDetails } from "./RevisionItemDetails";

interface RevisionItemRowProps {
  item: BudgetItemResponse;
  isSelected: boolean;
  onToggle: (itemId: number) => void;
  changeReason: string;
  onChangeReasonChange: (itemId: number, reason: string) => void;
  suggestedAmount: string;
  onSuggestedAmountChange: (itemId: number, amount: string) => void;
  notes: string;
  onNotesChange: (itemId: number, notes: string) => void;
}

export function RevisionItemRow({
  item,
  isSelected,
  onToggle,
  changeReason,
  onChangeReasonChange,
  suggestedAmount,
  onSuggestedAmountChange,
  notes,
  onNotesChange,
}: RevisionItemRowProps) {
  if (!item.id) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <Checkbox
          id={`item-${item.id}`}
          checked={isSelected}
          onCheckedChange={() => onToggle(item.id!)}
          className="mt-1"
        />
        <div className="flex-1">
          <Label
            htmlFor={`item-${item.id}`}
            className="cursor-pointer font-medium text-sm"
          >
            {item.name}
            {item.category && (
              <span className="text-text-secondary font-normal ml-2">
                ({item.category})
              </span>
            )}
          </Label>
          {item.estimatedAmount && (
            <p className="text-xs text-text-secondary mt-0.5">
              ${item.estimatedAmount.toLocaleString()}
            </p>
          )}
        </div>
      </div>
      {isSelected && (
        <RevisionItemDetails
          itemId={item.id}
          changeReason={changeReason}
          onChangeReasonChange={(reason) => onChangeReasonChange(item.id!, reason)}
          suggestedAmount={suggestedAmount}
          onSuggestedAmountChange={(amount) => onSuggestedAmountChange(item.id!, amount)}
          currentAmount={item.estimatedAmount}
          notes={notes}
          onNotesChange={(notes) => onNotesChange(item.id!, notes)}
        />
      )}
    </div>
  );
}

