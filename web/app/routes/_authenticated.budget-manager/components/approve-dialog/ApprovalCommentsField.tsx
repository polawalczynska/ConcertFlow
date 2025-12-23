import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";

interface ApprovalCommentsFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function ApprovalCommentsField({ value, onChange }: ApprovalCommentsFieldProps) {
  return (
    <div>
      <Label>Approval Comments</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add comments about this approval..."
        className="mt-1"
        rows={4}
      />
    </div>
  );
}

