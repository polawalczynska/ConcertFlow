import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/Select";
import { Label } from "~/components/ui/Label";

interface PeriodSelectProps {
  value: "AM" | "PM";
  onChange: (value: "AM" | "PM") => void;
}

export function PeriodSelect({ value, onChange }: PeriodSelectProps) {
  return (
    <div className="flex-1">
      <Label htmlFor="period" className="text-xs font-medium text-text-secondary mb-2 block">
        Period
      </Label>
      <Select value={value} onValueChange={(val) => onChange(val as "AM" | "PM")}>
        <SelectTrigger id="period" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

