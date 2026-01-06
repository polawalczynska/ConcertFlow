import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";

interface SafetyRequirementsFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function SafetyRequirementsField({
  value,
  onChange,
  error,
}: SafetyRequirementsFieldProps) {
  return (
    <div className="sm:col-span-3">
      <Label htmlFor="safetyRequirements">Safety Requirements</Label>
      <Textarea
        id="safetyRequirements"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Fire safety permits, electrical inspection, pyrotechnics license, medical staff, etc."
        rows={4}
        className={`mt-1 ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

