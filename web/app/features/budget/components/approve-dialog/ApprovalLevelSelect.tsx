import { Label } from "~/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/Select";

interface ApprovalLevelSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function ApprovalLevelSelect({ value, onChange }: ApprovalLevelSelectProps) {
  return (
    <div>
      <Label>Approval Level Required</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mt-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Level 1 (Up to $25k)</SelectItem>
          <SelectItem value="2">Level 2 ($25k - $75k)</SelectItem>
          <SelectItem value="3">Level 3 (Over $75k)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

