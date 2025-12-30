import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";

interface LightingRequirementsFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function LightingRequirementsField({
  value,
  onChange,
  error,
}: LightingRequirementsFieldProps) {
  return (
    <div className="sm:col-span-3">
      <Label htmlFor="lightingRequirements">Lighting Requirements</Label>
      <Textarea
        id="lightingRequirements"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Total fixtures, DMX universes, lighting design details, etc."
        rows={4}
        className={`mt-1 ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

