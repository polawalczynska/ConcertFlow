import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";

interface RevisionReasonFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function RevisionReasonField({ value, onChange }: RevisionReasonFieldProps) {
  return (
    <div>
      <Label htmlFor="revision-reason">
        Revision Reason <span className="text-red-500">*</span>
      </Label>
      <Textarea
        id="revision-reason"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Explain why this budget needs revision..."
        className="mt-1"
        rows={4}
      />
    </div>
  );
}

