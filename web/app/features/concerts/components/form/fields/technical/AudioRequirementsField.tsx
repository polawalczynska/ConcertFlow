import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";

interface AudioRequirementsFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function AudioRequirementsField({
  value,
  onChange,
  error,
}: AudioRequirementsFieldProps) {
  return (
    <div className="sm:col-span-3">
      <Label htmlFor="audioRequirements">Audio Requirements</Label>
      <Textarea
        id="audioRequirements"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="PA system configuration, mixing console details, input channels, etc."
        rows={4}
        className={`mt-1 ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

