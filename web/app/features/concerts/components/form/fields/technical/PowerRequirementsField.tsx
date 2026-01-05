import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";

interface PowerRequirementsFieldProps {
  value: number | null;
  onChange: (value: number | null) => void;
  error?: string;
}

export function PowerRequirementsField({
  value,
  onChange,
  error,
}: PowerRequirementsFieldProps) {
  return (
    <div>
      <Label htmlFor="powerRequirements">Power Requirements (kW)</Label>
      <Input
        id="powerRequirements"
        type="number"
        min="0"
        step="0.1"
        value={value ?? ""}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === "" ? null : parseFloat(val));
        }}
        placeholder="e.g., 95"
        className={`mt-1 ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

