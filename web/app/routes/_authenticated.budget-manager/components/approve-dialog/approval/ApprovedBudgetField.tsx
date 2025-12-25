import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";

interface ApprovedBudgetFieldProps {
  value: string;
  onChange: (value: string) => void;
  requestedBudget?: number;
}

export function ApprovedBudgetField({ value, onChange, requestedBudget }: ApprovedBudgetFieldProps) {
  return (
    <div>
      <Label htmlFor="approved-budget">
        Approved Budget <span className="text-red-500">*</span>
      </Label>
      <Input
        id="approved-budget"
        type="number"
        step="0.01"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter approved budget amount"
        className="mt-1"
      />
      {requestedBudget && (
        <p className="mt-1 text-xs text-text-secondary">
          Requested: ${requestedBudget.toLocaleString()}
        </p>
      )}
    </div>
  );
}

