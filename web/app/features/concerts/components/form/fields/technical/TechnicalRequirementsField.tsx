import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";

interface TechnicalRequirementsFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function TechnicalRequirementsField({
  value,
  onChange,
  error,
}: TechnicalRequirementsFieldProps) {
  return (
    <div className="sm:col-span-3">
      <Label htmlFor="technicalRequirements">Technical Requirements</Label>
      <Textarea
        id="technicalRequirements"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter detailed technical requirements (audio, lighting, power, safety, etc.)"
        rows={6}
        className={`mt-1 ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

