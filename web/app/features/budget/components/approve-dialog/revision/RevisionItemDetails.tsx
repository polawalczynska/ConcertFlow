import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";
import { Input } from "~/components/ui/Input";

interface RevisionItemDetailsProps {
  itemId: number;
  changeReason: string;
  onChangeReasonChange: (reason: string) => void;
  suggestedAmount: string;
  onSuggestedAmountChange: (amount: string) => void;
  currentAmount?: number;
  notes: string;
  onNotesChange: (notes: string) => void;
}

export function RevisionItemDetails({
  itemId,
  changeReason,
  onChangeReasonChange,
  suggestedAmount,
  onSuggestedAmountChange,
  currentAmount,
  notes,
  onNotesChange,
}: RevisionItemDetailsProps) {
  return (
    <div className="ml-8 space-y-3 border-l-2 border-blue-200 pl-4">
      <div>
        <Label htmlFor={`reason-${itemId}`} className="text-xs">
          Change Reason <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id={`reason-${itemId}`}
          value={changeReason}
          onChange={(e) => onChangeReasonChange(e.target.value)}
          placeholder="Explain what needs to be changed for this item..."
          className="mt-1 text-sm"
          rows={2}
        />
      </div>
      <div>
        <Label htmlFor={`suggested-${itemId}`} className="text-xs">
          Suggested Amount (Optional)
        </Label>
        <Input
          id={`suggested-${itemId}`}
          type="number"
          step="0.01"
          min="0"
          value={suggestedAmount}
          onChange={(e) => onSuggestedAmountChange(e.target.value)}
          placeholder="Enter suggested amount..."
          className="mt-1 text-sm"
        />
        {currentAmount && (
          <p className="mt-1 text-xs text-text-secondary">
            Current: ${currentAmount.toLocaleString()}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor={`notes-${itemId}`} className="text-xs">
          Additional Notes (Optional)
        </Label>
        <Textarea
          id={`notes-${itemId}`}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Add any additional notes or suggestions..."
          className="mt-1 text-sm"
          rows={2}
        />
      </div>
    </div>
  );
}

