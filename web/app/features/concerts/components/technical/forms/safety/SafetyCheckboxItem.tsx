import { Label } from "~/components/ui/Label";
import { Checkbox } from "~/components/ui/Checkbox";

interface SafetyCheckboxItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  required?: boolean;
  disabled?: boolean;
}

export function SafetyCheckboxItem({
  id,
  label,
  checked,
  onChange,
  required = false,
  disabled = false,
}: SafetyCheckboxItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      />
      <Label htmlFor={id} className="cursor-pointer">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
    </div>
  );
}

