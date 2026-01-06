import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";

interface BudgetItemAmountFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function BudgetItemAmountField({ value, onChange }: BudgetItemAmountFieldProps) {
  return (
    <div>
      <Label htmlFor="estimatedAmount">Estimated Amount ($) *</Label>
      <Input
        id="estimatedAmount"
        type="number"
        step="0.01"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0.00"
      />
    </div>
  );
}

